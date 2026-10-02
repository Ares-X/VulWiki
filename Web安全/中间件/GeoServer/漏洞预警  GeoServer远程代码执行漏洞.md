---
cve: "CVE-2024-36404"
source: "gelusus/wxvl 公众号漏洞文库"
original_title: "漏洞预警 | GeoServer远程代码执行漏洞"
title: "GeoTools 表达式注入漏洞通告（CVE-2024-36404）"
product: "GeoTools"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-36404"
referenced_identifiers: ""
identifier_role: "primary"
fixed_versions: "28.6；29.6；30.4；31.2"
verification_source: "https://github.com/geotools/geotools/security/advisories/GHSA-w3pj-wh35-fq8w"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-c211195aa042857b77c6b3f0"
entity_id: "ve-c211195aa042857b77c6b3f0"
schema_version: "1"
---

# GeoTools 表达式注入漏洞通告（CVE-2024-36404）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

CVE-2024-36404 是 GeoTools 组件问题，组件版本与 GeoServer 2.x 产品版本不能混用。GeoServer CVE-2024-36401 是不同产品层级的关联，不是可互换编号。

- 证据范围：36404为组件层编号，与GeoServer36401关联但不能机械改号/当同一产品版本；文章把GeoTools31/30/29版本写成GeoServer GeoTools混合产品。

### 已有来源支持的更正

- 确认36404为GeoTools组件，修复除29.6/30.4/31.2还包括28.6；原文漏28分支。与GeoServer36401为不同产品层级对应，保留关联。

### 本次正文校订

- 修正题名；原文件路径保持不变，以保留已有链接和资源定位。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 产品/依赖身份需分开，GeoServer本身使用2.x版本
- 多个<版本缺分支下界，修复只给GeoServer主页而非GeoTools维护版本
- 没有PoC链接或请求，不支持正文已公开的具体来源
- /geoserver/wfs不是所有GeoTools消费应用入口，须区分组件与部署

### 核验来源

- https://github.com/geotools/geotools/security/advisories/GHSA-w3pj-wh35-fq8w

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2024-12-31 00:03  
  
**0x00 漏洞编号**  
- # CVE-2024-36404  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GeoServer是一个用Java编写的开源服务器，它允许用户共享、处理和编辑地理空间数据。为了互操作性而设计，它使用开源标准发布来自任何主要空间数据源的数据。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWd1a3VRIeVBRap94GX4e5Smoro5Q6WzIBM9gzltID0XJbfoJyUshz5xFNMgQKkjk03e0maUSWSMg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-36404**  
  
**漏洞类型：**  
远程代码执行  
  
**影响：**  
执行任意命令  
  
**简述：**  
GeoServer的/geoserver/wfs接口存在远程代码执行漏洞，如果应用程序使用某些GeoTools功能来评估用户输入提供的XPath表达式，则未经身份验证的攻击者可以通过该漏洞远程执行任意代码，从而控制目标服务器。  
  
**0x04 影响版本**  
- GeoServer GeoTools < 31.2  
  
- GeoServer GeoTools < 30.4  
  
- GeoServer GeoTools < 29.6  
  
**0x05 POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://geoserver.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
