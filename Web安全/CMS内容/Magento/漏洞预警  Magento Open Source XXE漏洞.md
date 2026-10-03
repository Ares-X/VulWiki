---
verification_source: "https://helpx.adobe.com/security/products/magento/apsb24-40.html; https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/gather/magento_xxe_cve_2024_34102.rb"
fixed_version: "Adobe各release-line：2.4.7-p1；2.4.6-p6；2.4.5-p8；2.4.4-p9；Commerce扩展支持2.4.3-ext-8/2.4.2-ext-8；ACSD-60241另列独立补丁"
source_url: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/gather/magento_xxe_cve_2024_34102.rb"
cve: "CVE-2024-34102"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Adobe Commerce + Magento Open Source"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-34102"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  Magento Open Source XXE漏洞"
prerequisites: "受影响Adobe Commerce/Magento Open Source的guest-carts估运费入口可达；XML外部实体解析及目标访问外部DTD/回收HTTP服务条件满足"
side_effects: "本地HTTP监听；目标访问外部DTD并外传Base64文件内容；可选STORE_LOOT保存副本；400随机字段不证明读取成功"
source_status: "recorded"
id: "vw-a776fa1b59acbb7c3cc82508"
entity_id: "ve-a776fa1b59acbb7c3cc82508"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文章称未认证XML外部实体；RCE链的额外条件未列

- **事实待核（1）**：每个分支写&lt;=上界但无下界，扁平比较会混入已修复不同分支，应结构化分支。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：XXE到任意命令/代码执行没有链说明，作为潜在影响不能当直达PoC。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：修复只Adobe主页没有安全公告/具体版本，缺请求源码及独立披露链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | Magento Open Source XXE漏洞   
浅安  浅安安全   2024-06-22 08:30  
  
**0x00 漏洞编号**  
- # CVE-2024-34102  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Adobe Magento Open Source是Adobe公司的一套开源的PHP电子商务系统，Magento Open Source提供所有基本的商务功能，可用于从头开始建立独特的线上商店。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXaqpBYiaDTgZPe9XeqSxh7yOLFz89okSbeNCBvI3EH8Uib9OBmh9gZnjOuukml79kZ7pXrfwQsicNnw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-34102**  
  
**漏洞类型：**  
XXE  
  
**影响：**  
执行任意命令  
  
**简述：**  
Adobe Commerce和Magento Open Sourc多个受影响版本中存在XML外部实体引用限制不当，未经身份验证的威胁者可发送引用外部实体的恶意设计的XML文档来利用该漏洞，成功利用可能导致任意代码执行。  
###   
  
**0x04 影响版本**  
- Adobe Commerce <= 2.4.7  
  
- Adobe Commerce <= 2.4.6-p5  
  
- Adobe Commerce <= 2.4.5-p7  
  
- Adobe Commerce <= 2.4.4-p8  
  
- Adobe Commerce <= 2.4.3-ext-7  
  
- Adobe Commerce <= 2.4.2-ext-7  
  
- Adobe Commerce <= 2.4.1-ext-7  
  
- Adobe Commerce <= 2.4.0-ext-7  
  
- Adobe Commerce <= 2.3.7-p4-ext-7  
  
- Magento Open Source <= 2.4.7  
  
- Magento Open Source <= 2.4.6-p5  
  
- Magento Open Source <= 2.4.5-p7  
  
- Magento Open Source <= 2.4.4-p8  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.adobe.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）


## 2026-10-03 公开验证资料补充

[固定公开源码](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/gather/magento_xxe_cve_2024_34102.rb) 本次已完整静态阅读；未检查框架及载荷的全部传递依赖。

完整模块给出 guest-carts 的 estimate-shipping-methods JSON 请求、sourceData XML、外部 DTD 与回收文件内容的 HTTP 处理逻辑。文件经 php://filter 做Base64编码后传到操作者控制的服务；回连收到文件才是文件读取证据，错误响应中的随机字段仅用于确认请求路径。它会启动本地HTTP服务，目标会访问外部DTD并外传文件，可选保存到loot；这不是无副作用版本检测。

源码描述把2.4.7-p1也列入受影响，check中的跨分支OR比较亦可能误判。[Adobe APSB24-40](https://helpx.adobe.com/security/products/magento/apsb24-40.html) 实际列2.4.7-p1、2.4.6-p6、2.4.5-p8、2.4.4-p9以及Commerce扩展支持的2.4.3-ext-8/2.4.2-ext-8为修复；另有ACSD-60241独立补丁。读取到配置不等于模块已经实现RCE。原文的更老ext版本已从厂商现表移除，不能继续凭旧汇编扩大范围。

具体而言，HTTP400中的随机fieldName只支持请求触及相应错误路径，不能作文件读取成功依据。模块的版本比较和2.4.7-p1描述错误均只在此校订；保留原源码。ACSD-60241是另行列出的独立补丁，不能将旧文已移出当前厂商矩阵的ext版本继续作为现行适用事实。
