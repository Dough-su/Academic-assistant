
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Net.Mime;
using System.Runtime.Remoting.Contexts;
using System.Text.RegularExpressions;
using System.Web;

namespace liveweb.ashx
{
    /// <summary>
    /// userinfo 的摘要说明
    /// </summary>
    public class userinfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            context.Response.ContentType = "text/plain";
            string useremail = context.Request.Params["useremail"];
            string userpwd = "";
            switch (context.Request.Params["meth"])
            {
                case "login":
                      userpwd = context.Request.Params["userpwd"];
                    //查询数据库中是否存在该用户
                    if(isuser(useremail,context)==1)                
                    if (isExist(useremail, userpwd, context) == 1)
                        //查询账户状态是否被封禁
                        if (isBan(useremail, context) == 1)
                        {
                            SendEmail( useremail, "学术自助系统","verify");

                            context.Response.Write("已发送验证码到您的邮箱，请查收");
                        }

                    break;
                    case "auth":
                        string authcode = context.Request.Params["code"];
                        //当验证码不为6位，则返回错误信息
                        if (authcode.Length != 6)
                        {
                            context.Response.Write("验证码错误");
                        }

                        else
                        {
                            if (isAuth(useremail, authcode, context) == 1){
                                 listuserinfo(useremail, context);
                                }
                            
                        }
                        
                    break;

                // case "register":
                //     register(context, useremail, userpwd);
                //     break;
                // case "getuserinfo":
                //     getuserinfo(context, useremail);
                //     break;
                // case "updateuserinfo":
                //     updateuserinfo(context, useremail);
                //     break;
                default:
                    break;
            }





        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        /// <summary>   
        ///替换模板中的字段值   
        /// </summary>   
        public string ReplaceText(String userName, string verifycode, string html)
        {

            string path = string.Empty;

            path = HttpContext.Current.Server.MapPath("..\\Email\\" + html);

            if (path == string.Empty)
            {
                return string.Empty;
            }
            System.IO.StreamReader sr = new System.IO.StreamReader(path);
            string str = string.Empty;
            str = sr.ReadToEnd();
            str = str.Replace("$USER_NAME$", userName);
            str = str.Replace("$verifycode$", verifycode);

            return str;
        }
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="sendTo">收件人地址</param>
        /// <param name="fromName">发件人名称</param>
        /// <param name="title">邮件标题</param>
        /// <param name="body">邮件内容（支持html格式）</param>
        public void SendEmail(String sendTo, String title, String Types)
        
        {
            MailMessage mailMsg = new MailMessage();
            mailMsg.From = new MailAddress("muse@academics.works", title);
            mailMsg.To.Add(new MailAddress(sendTo));//收信人地址
            string strbody="";
            switch (Types)
            {
                //两步验证
                case "verify":
                    mailMsg.Subject = "学术自助系统验证码";
                    //生成六位验证码
                    string verifycode = "";
                    Random rd = new Random();
                    for (int i = 0; i < 6; i++)
                    {
                        verifycode += rd.Next(10).ToString();
                    }
                    //将验证码写入数据库的verify字段
                    toverify(sendTo, verifycode);
                     strbody = ReplaceText(sendTo, verifycode, "two-steps.html");

                    break;
                //欢迎邮件
                case "welcome":
                    mailMsg.Subject = "欢迎来到学术自助系统";
                    break;
                //注册验证
                case "register":
                    mailMsg.Subject = "学术自助系统注册验证链接";
                    break;
                //重置密码
                case "reset":
                    mailMsg.Subject = "学术自助系统重置密码";
                    break;
                default:
                    mailMsg.Subject = "测试邮件";
                    break;
            }

            // 邮件正文内容
            string html = strbody;
            mailMsg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));
            //邮件推送的SMTP地址和端口
            SmtpClient smtpClient = new SmtpClient("smtpdm.aliyun.com", 80);
            //C#官方文档介绍说明不支持隐式TLS方式，即465端口，需要使用25或者80端口(ECS不支持25端口)，另外需增加一行 smtpClient.EnableSsl = true; 故使用SMTP加密方式需要修改如下：
            //SmtpClient smtpClient = new SmtpClient("smtpdm.aliyun.com", 80);
            //smtpClient.EnableSsl = true;
            // 使用SMTP用户名和密码进行验证
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("muse@academics.works", "SU56656488xin");
            smtpClient.Credentials = credentials;
            smtpClient.Send(mailMsg);
        }
        public int isExist(string usermail, string userpwd, HttpContext context)
        {
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "select * from userinfo where usermail='" + usermail + "' and userpwd='" + userpwd + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return 1;
            }
            else
            {
                context.Response.Write("密码错误");
                return 0;
            }
        }
        public int isBan(string usermail, HttpContext context)
        {


            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "select * from userinfo where usermail='" + usermail + "' and status='1'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                context.Response.Write("账户已被封禁");
                return 0;
            }
            else
            {

                return 1;
            }
        }
        public int toverify(string usermail, string verifycode)
        {
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "update userinfo set verify='" + verifycode + "' where usermail='" + usermail + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            int i = cmd.ExecuteNonQuery();
            return i;
        }
        public int isuser(string usermail, HttpContext context)
        {
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "select * from userinfo where usermail='" + usermail + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return 1;
            }
            else
            {
                context.Response.Write("用户不存在");
                return 0;
            }
        }
        public int isAuth(string usermail, string code,HttpContext context)
        {
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "select * from userinfo where usermail='" + usermail + "' and verify='" + code + "'";
         
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return 1;
            }
            else
            {
                context.Response.Write("验证码错误");
                return 0;
            }
        }
        public int listuserinfo(string usermail, HttpContext context)
        {
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "select * from userinfo where usermail='" + usermail + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            //输出userid字段
            if (reader.Read())
            {
                context.Response.Write(reader["userid"].ToString());
                return 1;
            }
            else
            {
                return 0;
            }

        }
    }
}