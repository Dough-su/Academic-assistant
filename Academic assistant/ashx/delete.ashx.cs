using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Academic_assistant.ashx
{
    /// <summary>
    /// delete 的摘要说明
    /// </summary>
    public class delete : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string meth = context.Request.Params["meth"].ToString();
            switch (meth){
                case "del":
                del(context);
                    break;
                case "restore":
                restore(context);
                    break;    
                case "torecycle":
                torecycle(context);
                    break;
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
        //将context.Request.Params封装成一个方法
        private string GetParams(HttpContext context, string str)
        {
            string str_params = context.Request.Params[str].ToString();
            return str_params;
        }
        private void del(HttpContext context)
        {
            string paperid = GetParams(context, "paperid");
            string table = GetParams(context, "tabname");
            string userid = GetParams(context, "userid");
             string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "delete from " + table + " where paperid='" + paperid + "' and userid='" + userid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.Write("success");
        }
        private void restore(HttpContext context)
        {
            string paperid = GetParams(context, "paperid");
            string table = GetParams(context, "tabname");
            string userid = GetParams(context, "userid");
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "update " + table + " set recycle=NULL where paperid='" + paperid + "' and userid='" + userid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.Write("success");
        }
        private void torecycle(HttpContext context)
        {
            string paperid = GetParams(context, "paperid");
            string table = GetParams(context, "tabname");
            string userid = GetParams(context, "userid");
            string connectionString = ConfigurationManager.ConnectionStrings["mssql"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string sql = "update " + table + " set recycle=1 where paperid='" + paperid + "' and userid='" + userid + "'";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
            context.Response.Write("success");
        }
    }
}