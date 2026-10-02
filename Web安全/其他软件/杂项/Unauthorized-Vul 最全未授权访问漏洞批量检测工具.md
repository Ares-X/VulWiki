---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Unauthorized-Vul 最全未授权访问漏洞批量检测工具"
product: "Unauthorized-Vul"
record_type: "vulnerability"
document_type: "工具推广"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "自称40多组件批量检测，无工具版本/作者repo/测试证据"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Unauthorized-Vul%20%E6%9C%80%E5%85%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E%E6%89%B9%E9%87%8F%E6%A3%80%E6%B5%8B%E5%B7%A5%E5%85%B7.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-6cb767fbf40f8daf3b20cd39"
entity_id: "ve-6cb767fbf40f8daf3b20cd39"
schema_version: "1"
---

# Unauthorized-Vul 最全未授权访问漏洞批量检测工具

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Unauthorized-Vul
- 文献类型：工具推广
- 版本、权限及部署边界：自称40多组件批量检测，无工具版本/作者repo/测试证据
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 不是具体漏洞条目，40多组件不应全生成漏洞实体；最全无比较依据
2. 使用方式仅截图未视检，下载仅第三方网盘无源码/校验和/发行出处，不做可信工具背书
3. 20万NucleiPoC是另外资源广告，不能计本工具功能或验证漏洞数

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://pan.quark.cn/s/fdac0c5eb0e2>
- 原文参考链接（未重新核验）：<https://pan.quark.cn/s/02110b52f458>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 风铃Sec   2025-07-08 16:09  
  
##### 声明：相关工具仅用于授权测试，用户滥用造成的一切后果和作者无关 请遵守法律法规！【文末获取工具】  
  
**0x01 工具介绍**  
  
  
Unauthorized-Vul是一款由python语言编写，为安全从业人员设计的一个未授权访问漏洞批量检测工具。它集成了常见的40多种未授权访问漏洞，包括但不限于ollama、swagger、springboot、docker、k8s、ftp和数据库相关的组件相关的未授权访问漏洞。并且支持多线程，批量扫描。它号称是最全的未授权访问漏洞批量检测工具有兴趣的师傅可以试试。  
  
**0x02 工具使用**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qGTEdaLg0HnSwsGTaCJayGiaPkDmUFmwiciaw8vNAicuKXic5Z01gqML6zyP5IlXLnzeEIcMG3gues9csozAXdzNjqg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qGTEdaLg0HnSwsGTaCJayGiaPkDmUFmwicXMSNDYfHDvnBLpB8iclAv9bklFU8fuDP6GcNDiawkWUzGrO335ib4wOLw/640?wx_fmt=png&from=appmsg "")  
  
**0x03 工具下载**  
  
夸克网盘「Unauthorized_VUl」  
  
链接：  
https://pan.quark.cn/s/fdac0c5eb0e2  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qGTEdaLg0HnSwsGTaCJayGiaPkDmUFmwic06tdqpLbN1DhNF294lrJDGUdK7KpecJ5AOG21YGSCQ7klia7v66uszA/640?wx_fmt=png&from=appmsg "")  
  
0x04 每日资源分享【 Nuclei Poc 20w+  
】  
  
夸克网盘「Nuclei Poc【20w+】」  
  
链接：  
https://pan.quark.cn/s/02110b52f458  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/qGTEdaLg0HmtJdLjMFJbREfWeqjvGCQ3iaiaXiaua6Mylo4iaxvesxLRib9B4cPlgVFVBTBtzXV59mjKyuS2GbQrP5g/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=wxpic "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
