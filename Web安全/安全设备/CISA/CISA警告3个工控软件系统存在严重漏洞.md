---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-9f59d5df62744b525a5610f7"
entity_id: "ve-9f59d5df62744b525a5610f7"
schema_version: "1"
title: "CISA警告3个工控软件系统存在严重漏洞"
product: "ETIC RAS、Nokia ASIK AirScale、Delta DIALink"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "ETIC≤4.5.0修复4.7.3；ASIK474021A.101/.102；DIALink修复1.5.0.0Beta4"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/CISA/CISA%E8%AD%A6%E5%91%8A3%E4%B8%AA%E5%B7%A5%E6%8E%A7%E8%BD%AF%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  CISA警告3个工控软件系统存在严重漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ETIC RAS、Nokia ASIK AirScale、Delta DIALink
- 本文讨论：ETIC3703/41607/40981；Nokia2482/2483/2484；Delta2969（均2022）
- 版本、权限与配置前提：ETIC≤4.5.0修复4.7.3；ASIK474021A.101/.102；DIALink修复1.5.0.0Beta4
- 资料类型：三厂商多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CISA误作产品分类，七CVE应分三产品实体
- 省略Nokia本地/物理访问及其他漏洞鉴权条件，泛称远控易误导
- CISA三公告均无直链，修复矩阵不完整

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 七项CVE权限、影响版本与厂商公告待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 关键基础设施安全应急响应中心   2022-11-07 15:37  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iaz5iaQYxGogtmNfR7YdBmqP64HNLiagwzpwV6XdriaYRkibF37R7w6suqokKVnb6Owria5ZvcTnTlZWwXybI3G8zxNg/640?wx_fmt=png "")  
  
近日，美国网络安全和基础设施安全局（CISA）发布了三份工业控制系统（ICS）公告，涉及ETIC电信、诺基亚和Delta工业自动化的软件中的多个漏洞。其中最突出的是影响ETIC电信公司远程访问服务器（RAS）的一组三个缺陷，它 "可能允许攻击者获得敏感信息，并控制有漏洞的设备和其他连接的机器"，CISA说。  
  
这包括CVE-2022-3703（CVSS评分：9.0），这是一个关键的缺陷，源于RAS网络门户无法验证固件的真实性，从而有可能塞进一个流氓包，授予对手后门权限。  
  
另外两个缺陷与RAS API中的目录穿越错误（CVE-2022-41607，CVSS评分：8.6）和一个文件上传问题（CVE-2022-40981，CVSS评分：8.3）有关，可被利用来读取任意文件和上传恶意文件，从而破坏设备。  
  
以色列工业网络安全公司OTORIO被认为是发现和报告了这些缺陷。ETIC Telecom RAS 4.5.0及之前的所有版本都存在漏洞，法国公司在4.7.3版本中解决了这些问题。  
  
CISA的第二个公告涉及诺基亚ASIK AirScale 5G通用系统模块的三个缺陷（CVE-2022-2482、CVE-2022-2483和CVE-2022-2484），这可能为任意代码执行和安全启动功能的停止铺平道路。所有的缺陷在CVSS严重性等级中被评为8.4级。CISA指出，成功利用这些漏洞可能导致执行恶意内核，运行任意的恶意程序，或运行修改过的诺基亚程序。  
  
据说这家芬兰电信巨头已经公布了影响ASIK 474021A.101和ASIK 474021A.102版本的缺陷的缓解说明。该机构建议用户直接与诺基亚联系，以获得进一步信息。  
  
最后，该网络安全机构还警告说，一个路径穿越漏洞（CVE-2022-2969，CVSS评分：8.1）影响了台达工业自动化公司的DIALink产品，可被利用来在目标设备上植入恶意代码。  
  
该漏洞已在1.5.0.0 Beta 4版本中得到解决，CISA表示可以直接联系台达工业自动化或通过台达现场应用工程（FAEs）获得该版本。  
  
  
  
原文来源  
：E  
安全  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaz5iaQYxGogucKMiatGyfBHlfj74r3CyPxEBrV0oOOuHICibgHwtoIGayOIcmJCIsAn02z2yibtfQylib07asMqYAEw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
