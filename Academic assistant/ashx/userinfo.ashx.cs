using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Text;
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
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="sendTo">收件人地址</param>
        /// <param name="sendCC">抄送人地址（多人）</param>
        /// <param name="fromEmail">发件人邮箱</param>
        /// <param name="fromName">发件人名称</param>
        /// <param name="title">邮件标题</param>
        /// <param name="body">邮件内容（支持html格式）</param>
        public static void SendEmail(String sendTo, string sendCC, String fromEmail, String fromName, String title, String body)
        {
            MailMessage msg = new MailMessage();
            String[] sendCCArr = null;
            //设置收件人地址
            msg.To.Add(sendTo); //收件人地址 
            //设置抄送人地址
            if (sendCC != null)
            {
                sendCCArr = sendCC.Split(';');
                if (sendCCArr.Length > 0)
                {
                    foreach (String cc in sendCCArr)
                    {
                        msg.CC.Add(cc);
                    }
                }
            }
            //设置发件人邮箱及名称
            msg.From = new MailAddress(fromEmail, fromName);

            msg.Subject = title;//邮件标题 
            msg.SubjectEncoding = Encoding.UTF8; //标题格式为UTF8 

            msg.Body = body;//邮件内容
            msg.BodyEncoding = Encoding.UTF8; //内容格式为UTF8 
            msg.IsBodyHtml = true;//设置邮件格式为html格式

            //string filePath = @"E:\导出数据.xls";//添加附件
            //msg.Attachments.Add(new Attachment(filePath));

            SmtpClient client = new SmtpClient();

            //发送邮箱信息
            client.Host = "smtp.qq.com"; //SMTP服务器地址 
            client.Port = 587; //SMTP端口，QQ邮箱填写587 

            client.EnableSsl = true; //启用SSL加密 （使用除QQ邮箱之外的最好关闭）

            //发件人邮箱账号，授权码
            //授权码获取请自行百度
            client.Credentials = new System.Net.NetworkCredential(fromEmail, "你自己的授权码");

            try
            {
                client.Send(msg); //发送邮件
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// 邮箱格式校验
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        private bool EmailFormat(string address)
        {
            Regex r = new Regex("^\\s*([A-Za-z0-9_-]+(\\.\\w+)*@(\\w+\\.)+\\w{2,5})\\s*$");
            if (r.IsMatch(address))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        //对象转换为Json字符串 
        public static string ToJson(object jsonObject)
        {
            object objectValue = string.Empty;
            string jsonString = "{";
            if (jsonObject == null)
            {
                return jsonString + "}";
            }
            PropertyInfo[] propertyInfo = jsonObject.GetType().GetProperties();
            for (int i = 0; i < propertyInfo.Length; i++)
            {
                try
                {
                    objectValue = propertyInfo[i].GetGetMethod().Invoke(jsonObject, BindingFlags.InvokeMethod, null, new object[] { }, null);
                    string value = string.Empty;
                    if (objectValue is DateTime || objectValue is Guid || objectValue is TimeSpan)
                    {
                        value = "'" + objectValue.ToString() + "'";
                    }
                    else if (objectValue is string)
                    {
                        value = "'" + ToJson(objectValue.ToString()) + "'";
                    }
                    else if (objectValue is IEnumerable)
                    {
                        value = ToJson((IEnumerable)objectValue);
                    }
                    else
                    {
                        value = ToJson(objectValue.ToString());
                    }
                    jsonString += "\"" + ToJson(propertyInfo[i].Name) + "\":" + value + ",";
                }
                catch (Exception ex)
                {
                    string s = ex.Message;
                }
            }
            jsonString.Remove(jsonString.Length - 1);
            return jsonString + "}";
        }

        //对象集合转换Json
        public static string ToJson(IEnumerable array)
        {
            if (array == null) return "";
            string jsonString = "[";
            foreach (object item in array)
            {
                jsonString += ToJson(item) + ",";
            }
            jsonString.Remove(jsonString.Length - 1);
            return jsonString + "]";
        }
        //普通集合转换Json
        public static string ToArrayString(IEnumerable array)
        {
            if (array == null) return "";
            string jsonString = "[";
            foreach (object item in array)
            {
                jsonString = ToJson(item.ToString()) + ",";
            }
            jsonString.Remove(jsonString.Length - 1, jsonString.Length);
            return jsonString + "]";
        }
        //Datatable转换为Json 
        public static string ToJson(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0) return "[{}]";
            StringBuilder jsonString = new StringBuilder();

            jsonString.Append("[");
            DataRowCollection drc = dt.Rows;
            for (int i = 0; i < drc.Count; i++)
            {
                jsonString.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    string strKey = dt.Columns[j].ColumnName;
                    string strValue = drc[i][j].ToString();
                    Type type = dt.Columns[j].DataType;
                    jsonString.Append("\"" + strKey + "\":");
                    strValue = StringFormat(strValue, type);
                    if (j < dt.Columns.Count - 1)
                        jsonString.Append(strValue + ",");
                    else
                        jsonString.Append(strValue);
                }
                jsonString.Append("},");
            }
            jsonString.Remove(jsonString.Length - 1, 1);
            jsonString.Append("]");
            return jsonString.ToString();
        }
        //DataTable转成Json 
        public static string ToJson(DataTable dt, string jsonName)
        {
            if (string.IsNullOrEmpty(jsonName))
                jsonName = dt.TableName;
            StringBuilder sb = new StringBuilder();
            sb.Append("{\"" + jsonName + "\":[");
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    sb.Append("{");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        Type type = dt.Rows[i][j].GetType();
                        sb.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + StringFormat(dt.Rows[i][j].ToString(), type));
                        if (j < dt.Columns.Count - 1)
                        {
                            sb.Append(",");
                        }
                    }
                    sb.Append("}");
                    if (i < dt.Rows.Count - 1)
                    {
                        sb.Append(",");
                    }
                }
            }
            sb.Append("]}");
            return sb.ToString();
        }

        //DataReader转换为Json 
        public static string ToJson(DbDataReader dataReader)
        {
            StringBuilder jsonString = new StringBuilder();
            jsonString.Append("[");
            while (dataReader.Read())
            {
                jsonString.Append("{");
                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    Type type = dataReader.GetFieldType(i);
                    string strKey = dataReader.GetName(i);
                    string strValue = dataReader[i].ToString();
                    jsonString.Append("\"" + strKey + "\":");
                    strValue = StringFormat(strValue, type);
                    if (i < dataReader.FieldCount - 1)
                    {
                        jsonString.Append(strValue + ",");
                    }
                    else
                    {
                        jsonString.Append(strValue);
                    }
                }
                jsonString.Append("},");
            }
            dataReader.Close();
            jsonString.Remove(jsonString.Length - 1, 1);
            jsonString.Append("]");
            return jsonString.ToString();
        }

        //DataSet转换为Json 
        public static string ToJson(DataSet dataSet)
        {
            string jsonString = "{";
            foreach (DataTable table in dataSet.Tables)
            {
                jsonString += "\"" + table.TableName + "\":" + ToJson(table) + ",";
            }
            jsonString = jsonString.TrimEnd(',');
            return jsonString + "}";
        }
        //ArrayList转化为json
        public static string ArryListToJson(ArrayList alist, string jsonName)
        {
            string json = string.Empty;
            string strSubList = "\"" + jsonName + "\":" + "[{";
            for (int i = 0; i < alist.Count; i++)
            {
                Hashtable ht1 = (Hashtable)alist[i];
                foreach (DictionaryEntry de in ht1)
                {
                    if (de.Value is ArrayList)
                    {
                        strSubList += ArryListToJson((ArrayList)de.Value, de.Key.ToString());
                        strSubList += "]";
                    }
                    else
                    {
                        strSubList += "\"" + de.Key + "\":" + "\"" + de.Value + "\",";
                    }
                }
                strSubList = strSubList.Remove(strSubList.Length - 1);
                strSubList += "},{";
            }
            if (strSubList.Length >= 2)
            {
                json = strSubList.Remove(strSubList.Length - 2);
            }
            json += "]";
            return json;
        }
        //Hashtable To Json
        public static string HashtableToJson(Hashtable hr)
        {
            string json = "{";
            foreach (DictionaryEntry row in hr)
            {
                try
                {
                    string key = "\"" + row.Key + "\":";
                    string value = string.Empty;

                    if (row.Value is ArrayList)
                    {
                        key = string.Empty;
                        value = ArryListToJson((ArrayList)row.Value, row.Key.ToString());
                        value += ",";
                    }
                    else
                    {
                        value = "\"" + (row.Value == null ? "" : row.Value.ToString()) + "\",";
                    }
                    json += key + value;
                }
                catch (Exception ex)
                {
                    string mess = ex.Message;
                }
            }
            json = json.Remove(json.Length - 1);
            json = json + "}";
            return json;
        }
        //转换字符格式
        private static string StringFormat(string str, Type type)
        {
            if (string.IsNullOrEmpty(str)) return "\"\"";
            if (type == typeof(string))
            {
                str = "\"" + ConvertStrToSpecificationStrs(str) + "\"";
            }
            else if (type == typeof(DateTime))
            {
                str = "\"" + str + "\"";
            }
            else if (type == typeof(bool))
            {
                str = str.ToLower();
            }
            return str;
        }
        //json转换为datatable
        public static DataTable JsonToDataTable(string json)
        {
            DataTable table = new DataTable();
            //JsonStr为Json字符串
            JArray array = JsonConvert.DeserializeObject(json) as JArray;//反序列化为数组
            if (array.Count > 0)
            {
                StringBuilder columns = new StringBuilder();
                JObject objColumns = array[0] as JObject;
                //构造表头
                foreach (JToken jkon in objColumns.AsEnumerable<JToken>())
                {
                    string name = ((JProperty)(jkon)).Name;
                    columns.Append(name + ",");
                    table.Columns.Add(name);
                }
                //向表中添加数据
                for (int i = 0; i < array.Count; i++)
                {
                    DataRow row = table.NewRow();
                    JObject obj = array[i] as JObject;
                    foreach (JToken jkon in obj.AsEnumerable<JToken>())
                    {

                        string name = ((JProperty)(jkon)).Name;
                        string value = ((JProperty)(jkon)).Value.ToString();
                        row[name] = value;
                    }
                    table.Rows.Add(row);
                }
            }
            return table;
        }
        //转换字符格式
        public static string ConvertStrToSpecificationStrs(string str)
        {
            if (string.IsNullOrEmpty(str)) return "";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < str.Length; i++)
            {
                char cStr = str.ToCharArray()[i];

                switch (cStr)
                {
                    case '\"':
                        sb.Append("\\\""); break;
                    case '\\':
                        sb.Append("\\\\"); break;
                    case '/':
                        sb.Append("\\/"); break;
                    case '\b':
                        sb.Append("\\b"); break;
                    case '\f':
                        sb.Append("\\f"); break;
                    case '\n':
                        sb.Append("\\n"); break;
                    case '\r':
                        sb.Append("\\r"); break;
                    case '\t':
                        sb.Append("\\t"); break;
                    default:
                        sb.Append(cStr); break;
                }
            }
            return sb.ToString();
        }

    }
}