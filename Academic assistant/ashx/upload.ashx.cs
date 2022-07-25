
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace WebApplication3
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {

                //接收提交过来的meth参数
                string meth = context.Request.Params["meth"].ToString();

                switch (meth)
                {
                    case "govresearch":
                        govresearch(context);
                        break;
                    case "govresearchupdate":
                        govresearchupdate(context);
                        break;
                    case "research":
                        research(context);
                        break;
                    case "researchupdate":
                        researchupdate(context);
                        break;
                    case "paper":
                        paper(context);
                        break;
                    case "paperupdate":
                        paperupdate(context);
                        break;
                        case "software":
                        software(context);
                        break;
                    case "softwareupdate":
                        softwareupdate(context);
                        break;
                        case "patent":
                        patent(context);
                        break;
                    case "patentupdate":
                        patentupdate(context);
                        break;
                    case "award":
                        award(context);
                        break;
                    case "awardupdate":
                        awardupdate(context);
                        break;
                    case "stuaward":
                        stuaward(context);
                        break;    
                    case "stuawardupdate":
                        stuawardupdate(context);
                        break;
                    case "book":
                        book(context);
                        break;
                    case "bookupdate":
                        bookupdate(context);
                        break;
                    case "report":
                        report(context);
                        break;  
                    case "reportupdate":
                        reportupdate(context);
                        break;    
                    case "certificate":
                        certificate(context);
                        break;    
                    case "certificateupdate":
                        certificateupdate(context);
                        break;
                    case "others":
                        others(context);
                        break;
                    case "othersupdate":
                        othersupdate(context);
                        break;
                    default:
                        context.Response.ContentType = "text/plain";
                        Stream sr = context.Request.InputStream;
                        byte[] bt = new byte[sr.Length];
                        HttpPostedFile file = context.Request.Files["file"];
                        string timestamp = context.Request["timestamp"];
                        string savepath = context.Request["savepath"];//获取文件保存的路径
                        sr.Read(bt, 0, bt.Length);
                        savepath = context.Server.MapPath(savepath) + "\\" + timestamp + ".pdf";

                        FileStream fs = new FileStream(savepath, FileMode.Create);
                        fs.Write(bt, 0, bt.Length);
                        fs.Close();
                        sr.Close();
                        break;
                }
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "text/plain";
                context.Response.Write(ex.Message);
            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        private void govresearch(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string Subjectname = GetParams(context, "Subjectname");
            string Fundname = GetParams(context, "Fundname");
            string Subjecttype = GetParams(context, "Subjecttype");
            string Grantingunit = GetParams(context, "Grantingunit");
            string Subjectlevel = GetParams(context, "Subjectlevel");
            string subjectnumber = GetParams(context, "subjectnumber");
            string Receiptofexpenses = GetParams(context, "Receiptofexpenses");
            string ranking = GetParams(context, "ranking");
            string Startingtime = GetParams(context, "Startingtime");
            string deadline = GetParams(context, "deadline");
            string subjectstatus = GetParams(context, "subjectstatus");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "insert into govresearch(userid,paperid,Subjectname,Fundname,Subjecttype,Grantingunit,Subjectlevel,subjectnumber,Receiptofexpenses,ranking,Startingtime,deadline,subjectstatus,Remarks,draft) values('" + userid + "','" + paperid + "','" + Subjectname + "','" + Fundname + "','" + Subjecttype + "','" + Grantingunit + "','" + Subjectlevel + "','" + subjectnumber + "','" + Receiptofexpenses + "','" + ranking + "','" + Startingtime + "','" + deadline + "','" + subjectstatus + "','" + Remarks + "','" + draft + "')";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");


        }
        //将context.Request.Params封装成一个方法
        private string GetParams(HttpContext context, string str)
        {
            string str_params = context.Request.Params[str].ToString();
            return str_params;
        }
        private void govresearchupdate(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string Subjectname = GetParams(context, "Subjectname");
            string Fundname = GetParams(context, "Fundname");
            string Subjecttype = GetParams(context, "Subjecttype");
            string Grantingunit = GetParams(context, "Grantingunit");
            string Subjectlevel = GetParams(context, "Subjectlevel");
            string subjectnumber = GetParams(context, "subjectnumber");
            string Receiptofexpenses = GetParams(context, "Receiptofexpenses");
            string ranking = GetParams(context, "ranking");
            string Startingtime = GetParams(context, "Startingtime");
            string deadline = GetParams(context, "deadline");
            string subjectstatus = GetParams(context, "subjectstatus");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "update govresearch set Subjectname='" + Subjectname + "',Fundname='" + Fundname + "',Subjecttype='" + Subjecttype + "',Grantingunit='" + Grantingunit + "',Subjectlevel='" + Subjectlevel + "',subjectnumber='" + subjectnumber + "',Receiptofexpenses='" + Receiptofexpenses + "',ranking='" + ranking + "',Startingtime='" + Startingtime + "',deadline='" + deadline + "',subjectstatus='" + subjectstatus + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");

        }
        private void research(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string Subjectname = GetParams(context, "Subjectname");
            string contractsource = GetParams(context, "contractsource");
            string ContractNumber = GetParams(context, "ContractNumber");
            string ranking = GetParams(context, "ranking");
            string Receiptofexpenses = GetParams(context, "Receiptofexpenses");
            string Startingtime = GetParams(context, "Startingtime");
            string deadline = GetParams(context, "deadline");
            string subjectstatus = GetParams(context, "subjectstatus");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "insert into research(userid,paperid,Subjectname,contractsource,ContractNumber,ranking,Receiptofexpenses,Startingtime,deadline,subjectstatus,Remarks,draft) values('" + userid + "','" + paperid + "','" + Subjectname + "','" + contractsource + "','" + ContractNumber + "','" + ranking + "','" + Receiptofexpenses + "','" + Startingtime + "','" + deadline + "','" + subjectstatus + "','" + Remarks + "','" + draft + "')";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");
        }
        private void researchupdate(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string Subjectname = GetParams(context, "Subjectname");
            string contractsource = GetParams(context, "contractsource");
            string ContractNumber = GetParams(context, "ContractNumber");
            string ranking = GetParams(context, "ranking");
            string Receiptofexpenses = GetParams(context, "Receiptofexpenses");
            string Startingtime = GetParams(context, "Startingtime");
            string deadline = GetParams(context, "deadline");
            string subjectstatus = GetParams(context, "subjectstatus");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "update research set Subjectname='" + Subjectname + "',contractsource='" + contractsource + "',ContractNumber='" + ContractNumber + "',ranking='" + ranking + "',Receiptofexpenses='" + Receiptofexpenses + "',Startingtime='" + Startingtime + "',deadline='" + deadline + "',subjectstatus='" + subjectstatus + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");

        }
        private void paper(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string papername = GetParams(context, "papername");
            string thesistype = GetParams(context, "thesistype");
            string Thesisarea = GetParams(context, "Thesisarea");
            string ranking = GetParams(context, "ranking");
            string CorrespondingAuthor = GetParams(context, "CorrespondingAuthor");
            string Publicationname = GetParams(context, "Publicationname");
            string Indexsearch = GetParams(context, "Indexsearch");
            string Startingtime = GetParams(context, "Startingtime");
            string DOInumber = GetParams(context, "DOInumber");
            string Citations = GetParams(context, "Citations");
            string Keywords = GetParams(context, "Keywords");
            string Startandendpages = GetParams(context, "Startandendpages");
            string Impactfactor = GetParams(context, "Impactfactor");
            string rollnumber = GetParams(context, "rollnumber");
            string Issue = GetParams(context, "Issue");
            string ISSNnumber = GetParams(context, "ISSNnumber");
            string CNnumber = GetParams(context, "CNnumber");
            string Abstract = GetParams(context, "Abstract");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "insert into paper(userid,paperid,papername,thesistype,Thesisarea,ranking,CorrespondingAuthor,Publicationname,Indexsearch,Startingtime,DOInumber,Citations,Keywords,Startandendpages,Impactfactor,rollnumber,Issue,ISSNnumber,CNnumber,Abstract,Remarks,draft) values('" + userid + "','" + paperid + "','" + papername + "','" + thesistype + "','" + Thesisarea + "','" + ranking + "','" + CorrespondingAuthor + "','" + Publicationname + "','" + Indexsearch + "','" + Startingtime + "','" + DOInumber + "','" + Citations + "','" + Keywords + "','" + Startandendpages + "','" + Impactfactor + "','" + rollnumber + "','" + Issue + "','" + ISSNnumber + "','" + CNnumber + "','" + Abstract + "','" + Remarks + "','" + draft + "')";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");
        }
        private void paperupdate(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string papername = GetParams(context, "papername");
            string thesistype = GetParams(context, "thesistype");
            string Thesisarea = GetParams(context, "Thesisarea");
            string ranking = GetParams(context, "ranking");
            string CorrespondingAuthor = GetParams(context, "CorrespondingAuthor");
            string Publicationname = GetParams(context, "Publicationname");
            string Indexsearch = GetParams(context, "Indexsearch");
            string Startingtime = GetParams(context, "Startingtime");
            string DOInumber = GetParams(context, "DOInumber");
            string Citations = GetParams(context, "Citations");
            string Keywords = GetParams(context, "Keywords");
            string Startandendpages = GetParams(context, "Startandendpages");
            string Impactfactor = GetParams(context, "Impactfactor");
            string rollnumber = GetParams(context, "rollnumber");
            string Issue = GetParams(context, "Issue");
            string ISSNnumber = GetParams(context, "ISSNnumber");
            string CNnumber = GetParams(context, "CNnumber");
            string Abstract = GetParams(context, "Abstract");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "update paper set papername='" + papername + "',thesistype='" + thesistype + "',Thesisarea='" + Thesisarea + "',ranking='" + ranking + "',CorrespondingAuthor='" + CorrespondingAuthor + "',Publicationname='" + Publicationname + "',Indexsearch='" + Indexsearch + "',Startingtime='" + Startingtime + "',DOInumber='" + DOInumber + "',Citations='" + Citations + "',Keywords='" + Keywords + "',Startandendpages='" + Startandendpages + "',Impactfactor='" + Impactfactor + "',rollnumber='" + rollnumber + "',Issue='" + Issue + "',ISSNnumber='" + ISSNnumber + "',CNnumber='" + CNnumber + "',Abstract='" + Abstract + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");

        }
        private void software(HttpContext context)
        {
            string userid = GetParams(context, "userid");
            string paperid = GetParams(context, "paperid");
            string Copyrightname = GetParams(context, "Copyrightname");
            string CertificateNo = GetParams(context, "CertificateNo");
            string ranking = GetParams(context, "ranking");
            string Developmentcompletiontime = GetParams(context, "Developmentcompletiontime");
            string Gettime = GetParams(context, "Gettime");
            string licensenumber = GetParams(context, "licensenumber");
            string Copyrighttype = GetParams(context, "Copyrighttype");
            string copyrightowner = GetParams(context, "copyrightowner");
            string Remarks = GetParams(context, "Remarks");
            string draft = GetParams(context, "draft");
            //根据web.config中的connectionStrings获取数据库连接
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            //插入数据
            string sql = "insert into software(userid,paperid,Copyrightname,CertificateNo,ranking,Developmentcompletiontime,Gettime,licensenumber,Copyrighttype,copyrightowner,Remarks,draft) values('" + userid + "','" + paperid + "','" + Copyrightname + "','" + CertificateNo + "','" + ranking + "','" + Developmentcompletiontime + "','" + Gettime + "','" + licensenumber + "','" + Copyrighttype + "','" + copyrightowner + "','" + Remarks + "','" + draft + "')";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.ContentType = "text/plain";
            context.Response.Write("{\"msg\":\"上传成功!\"}");

    }
    private void softwareupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string Copyrightname = GetParams(context, "Copyrightname");
        string CertificateNo = GetParams(context, "CertificateNo");
        string ranking = GetParams(context, "ranking");
        string Developmentcompletiontime = GetParams(context, "Developmentcompletiontime");
        string Gettime = GetParams(context, "Gettime");
        string licensenumber = GetParams(context, "licensenumber");
        string Copyrighttype = GetParams(context, "Copyrighttype");
        string copyrightowner = GetParams(context, "copyrightowner");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update software set Copyrightname='" + Copyrightname + "',CertificateNo='" + CertificateNo + "',ranking='" + ranking + "',Developmentcompletiontime='" + Developmentcompletiontime + "',Gettime='" + Gettime + "',licensenumber='" + licensenumber + "',Copyrighttype='" + Copyrighttype + "',copyrightowner='" + copyrightowner + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void patent(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string patentname = GetParams(context, "patentname");
        string Patenttype= GetParams(context, "Patenttype");
        string Patentstatus= GetParams(context, "Patentstatus");
        string Patentnumber= GetParams(context, "Patentnumber");
        string Patentee= GetParams(context, "Patentee");
        string Authorizationannouncementdate= GetParams(context, "Authorizationannouncementdate");
        string Applicationnumber= GetParams(context, "Applicationnumber");
        string Patentfilingdate= GetParams(context, "Patentfilingdate");
        string ranking= GetParams(context, "ranking");
        string Remarks= GetParams(context, "Remarks");
        string draft= GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into patent(userid,paperid,patentname,Patenttype,Patentstatus,Patentnumber,Patentee,Authorizationannouncementdate,Applicationnumber,Patentfilingdate,ranking,Remarks,draft) values('" + userid + "','" + paperid + "','" + patentname + "','" + Patenttype + "','" + Patentstatus + "','" + Patentnumber + "','" + Patentee + "','" + Authorizationannouncementdate + "','" + Applicationnumber + "','" + Patentfilingdate + "','" + ranking + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void patentupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string patentname = GetParams(context, "patentname");
        string Patenttype = GetParams(context, "Patenttype");
        string Patentstatus = GetParams(context, "Patentstatus");
        string Patentnumber = GetParams(context, "Patentnumber");
        string Patentee = GetParams(context, "Patentee");
        string Authorizationannouncementdate = GetParams(context, "Authorizationannouncementdate");
        string Applicationnumber = GetParams(context, "Applicationnumber");
        string Patentfilingdate = GetParams(context, "Patentfilingdate");
        string ranking = GetParams(context, "ranking");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update patent set patentname='" + patentname + "',Patenttype='" + Patenttype + "',Patentstatus='" + Patentstatus + "',Patentnumber='" + Patentnumber + "',Patentee='" + Patentee + "',Authorizationannouncementdate='" + Authorizationannouncementdate + "',Applicationnumber='" + Applicationnumber + "',Patentfilingdate='" + Patentfilingdate + "',ranking='" + ranking + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void award(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string Honoraryname = GetParams(context, "Honoraryname");
        string ranking = GetParams(context, "ranking");
        string Awards= GetParams(context, "Awards");
        string level= GetParams(context, "level");
        string Grantingunit= GetParams(context, "Grantingunit");
        string winningtime= GetParams(context, "winningtime");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into award(userid,paperid,Honoraryname,ranking,Awards,level,Grantingunit,winningtime,Remarks,draft) values('" + userid + "','" + paperid + "','" + Honoraryname + "','" + ranking + "','" + Awards + "','" + level + "','" + Grantingunit + "','" + winningtime + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void awardupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string Honoraryname = GetParams(context, "Honoraryname");
        string ranking = GetParams(context, "ranking");
        string Awards = GetParams(context, "Awards");
        string level = GetParams(context, "level");
        string Grantingunit = GetParams(context, "Grantingunit");
        string winningtime = GetParams(context, "winningtime");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update award set Honoraryname='" + Honoraryname + "',ranking='" + ranking + "',Awards='" + Awards + "',level='" + level + "',Grantingunit='" + Grantingunit + "',winningtime='" + winningtime + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void stuaward(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string gamename = GetParams(context, "gamename");
        string Awardwinningstudents = GetParams(context, "Awardwinningstudents");
        string ranking = GetParams(context, "ranking");
        string Awards = GetParams(context, "Awards");
        string Remarks = GetParams(context, "Remarks");
        string level = GetParams(context, "level");
        string Grantingunit = GetParams(context, "Grantingunit");
        string winningtime = GetParams(context, "winningtime");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into stuaward(userid,paperid,gamename,Awardwinningstudents,ranking,Awards,level,Grantingunit,winningtime,Remarks,draft) values('" + userid + "','" + paperid + "','" + gamename + "','" + Awardwinningstudents + "','" + ranking + "','" + Awards + "','" + level + "','" + Grantingunit + "','" + winningtime + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void stuawardupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string gamename = GetParams(context, "gamename");
        string Awardwinningstudents = GetParams(context, "Awardwinningstudents");
        string ranking = GetParams(context, "ranking");
        string Awards = GetParams(context, "Awards");
        string Remarks = GetParams(context, "Remarks");
        string level = GetParams(context, "level");
        string Grantingunit = GetParams(context, "Grantingunit");
        string winningtime = GetParams(context, "winningtime");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update stuaward set gamename='" + gamename + "',Awardwinningstudents='" + Awardwinningstudents + "',ranking='" + ranking + "',Awards='" + Awards + "',level='" + level + "',Grantingunit='" + Grantingunit + "',winningtime='" + winningtime + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void book(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string bookname = GetParams(context, "bookname");
        string Publicationnumber = GetParams(context, "Publicationnumber");
        string identity = GetParams(context, "identity");
        string ranking = GetParams(context, "ranking");
        string publishinghouse = GetParams(context, "publishinghouse");
        string booktype = GetParams(context, "booktype");
        string wordcount = GetParams(context, "wordcount");
        string publisherplace = GetParams(context, "publisherplace");
        string Publisheddate = GetParams(context, "Publisheddate");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into book(userid,paperid,bookname,Publicationnumber,[identity],ranking,publishinghouse,booktype,wordcount,publisherplace,Publisheddate,Remarks,draft) values('" + userid + "','" + paperid + "','" + bookname + "','" + Publicationnumber + "','" + identity + "','" + ranking + "','" + publishinghouse + "','" + booktype + "','" + wordcount + "','" + publisherplace + "','" + Publisheddate + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void bookupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string bookname = GetParams(context, "bookname");
        string Publicationnumber = GetParams(context, "Publicationnumber");
        string identity = GetParams(context, "identity");
        string ranking = GetParams(context, "ranking");
        string publishinghouse = GetParams(context, "publishinghouse");
        string booktype = GetParams(context, "booktype");
        string wordcount = GetParams(context, "wordcount");
        string publisherplace = GetParams(context, "publisherplace");
        string Publisheddate = GetParams(context, "Publisheddate");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update book set bookname='" + bookname + "',Publicationnumber='" + Publicationnumber + "',[identity]='" + identity + "',ranking='" + ranking + "',publishinghouse='" + publishinghouse + "',booktype='" + booktype + "',wordcount='" + wordcount + "',publisherplace='" + publisherplace + "',Publisheddate='" + Publisheddate + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void report(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string news=GetParams(context, "news");
        string medianame = GetParams(context, "medianame");
        string medialevel = GetParams(context, "medialevel");
        string reportingtime = GetParams(context, "reportingtime");
        string Layout = GetParams(context, "Layout");
        string onlinelink = GetParams(context, "onlinelink");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into report(userid,paperid,news,medianame,medialevel,reportingtime,Layout,onlinelink,Remarks,draft) values('" + userid + "','" + paperid + "','" + news + "','" + medianame + "','" + medialevel + "','" + reportingtime + "','" + Layout + "','" + onlinelink + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void reportupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string news = GetParams(context, "news");
        string medianame = GetParams(context, "medianame");
        string medialevel = GetParams(context, "medialevel");
        string reportingtime = GetParams(context, "reportingtime");
        string Layout = GetParams(context, "Layout");
        string onlinelink = GetParams(context, "onlinelink");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update report set news='" + news + "',medianame='" + medianame + "',medialevel='" + medialevel + "',reportingtime='" + reportingtime + "',Layout='" + Layout + "',onlinelink='" + onlinelink + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void certificate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string filetitle = GetParams(context, "filetitle");
        string Certificatetype = GetParams(context, "Certificatetype");
        string Gettime = GetParams(context, "Gettime");
        string CertificateNo = GetParams(context, "CertificateNo");
        string grantingagency = GetParams(context, "grantingagency");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into certificate(userid,paperid,filetitle,Certificatetype,Gettime,CertificateNo,grantingagency,Remarks,draft) values('" + userid + "','" + paperid + "','" + filetitle + "','" + Certificatetype + "','" + Gettime + "','" + CertificateNo + "','" + grantingagency + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void certificateupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string filetitle = GetParams(context, "filetitle");
        string Certificatetype = GetParams(context, "Certificatetype");
        string Gettime = GetParams(context, "Gettime");
        string CertificateNo = GetParams(context, "CertificateNo");
        string grantingagency = GetParams(context, "grantingagency");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update certificate set filetitle='" + filetitle + "',Certificatetype='" + Certificatetype + "',Gettime='" + Gettime + "',CertificateNo='" + CertificateNo + "',grantingagency='" + grantingagency + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void others(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string Achievementname = GetParams(context, "Achievementname");
        string ranking = GetParams(context, "ranking");
        string Gettime = GetParams(context, "Gettime");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "insert into others(userid,paperid,Achievementname,ranking,Gettime,Remarks,draft) values('" + userid + "','" + paperid + "','" + Achievementname + "','" + ranking + "','" + Gettime + "','" + Remarks + "','" + draft + "')";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
    private void othersupdate(HttpContext context)
    {
        string userid = GetParams(context, "userid");
        string paperid = GetParams(context, "paperid");
        string Achievementname = GetParams(context, "Achievementname");
        string ranking = GetParams(context, "ranking");
        string Gettime = GetParams(context, "Gettime");
        string Remarks = GetParams(context, "Remarks");
        string draft = GetParams(context, "draft");
        //根据web.config中的connectionStrings获取数据库连接
        string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
        SqlConnection conn = new SqlConnection(connectionString);
        conn.Open();
        //插入数据
        string sql = "update others set Achievementname='" + Achievementname + "',ranking='" + ranking + "',Gettime='" + Gettime + "',Remarks='" + Remarks + "',draft='" + draft + "' where paperid='" + paperid + "'";
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.ExecuteNonQuery();
        conn.Close();
        context.Response.ContentType = "text/plain";
        context.Response.Write("{\"msg\":\"上传成功!\"}");
    }
}
}