---
cve: "CVE-2021-24284"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Kaswara Modern WPBakery Page Builder Addons"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2021-24284"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "针对WordPress插件漏洞的攻击数量激增"
prerequisites: "来源所述条件，未列明部分仍待核：affected plugin/version unspecified; exposed arbitrary ZIP upload; PHPexecution"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-54f69fa9af0387d18cfacb06"
entity_id: "ve-54f69fa9af0387d18cfacb06"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：affected plugin/version unspecified; exposed arbitrary ZIP upload; PHPexecution

- **结论使用边界（1）**：应以Kaswara附加插件为主体，不能误归WPBakery或WordPress核心。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：未修补/停止维护及每日443868尝试等应固定2022-07时点，不作为当前状态。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：4000–8000安装与Wordfence1000受保护样本不同口径，不能同当漏洞站点数。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：有新闻原文但无Wordfence原始报告，TDS归属是活动关联非漏洞机制证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  针对WordPress插件漏洞的攻击数量激增   
 网络安全应急技术国家工程中心   2022-07-20 15:24  
  
来自Wordfence的研究人员对近期高频率出现的针对WordPress Page Builder插件的网络攻击发出警告，这些攻击都是试图利用WordPress插件中一个名为Kaswara Modern WPBakery Page Builder Addons的未修补漏洞。  
  
该漏洞被追踪为CVE-2021-24284，在CVSS漏洞评分系统中被评为10.0，**此项漏洞与未经授权的任意文件上传有关，可被滥用以获得代码执行，最终使得攻击者能够夺取受影响WordPress网站的控制权。**  
  
尽管该漏洞早在2021年4月由WordPress安全公司就已经进行了披露，但至今为止该漏洞仍未得到解决。更为糟糕的是，该插件已经停止更新，WordPress也不再积极维护该插件。  
  
Wordfence表示有超过1000个安装了该插件的网站正在受该公司的保护，而自本月开始该公司平均每天阻止了443,868次攻击尝试。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icRuS6hacDibIlHxIjhG8AjUloaLguqPboM3GmibIRvALtlh8KGTXCGDE5ZCGMP4bjdl2zVU5HxLF1Q/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
【图：WordPress Page Builder插件漏洞】  
  
这些攻击来自10215个IP地址，其中大部分的攻击企图被缩小到10个IP地址。这些攻击涉及上传一个包含恶意PHP文件的ZIP档案，允许攻击者向受感染的网站上传流氓文件。  
  
该攻击的目的似乎是在其他合法的JavaScript文件中插入代码，并将网站访问者重定向到恶意网站。值得注意的是，Avast和Sucuri已经分别以Parrot TDS和NDSW的名义跟踪了这些攻击。  
  
据不完全统计，**约有4000到8000个网站安装了该插件**，因此建议使用WordPress插件的用户删除该插件，并寻找其他的插件进行替代，以防止此次针对WordPress插件的网络攻击。  
  
**消息来源：**  
  
https://thehackernews.com/2022/07/experts-notice-sudden-surge-in.html  
  
  
  
原文来源  
：FreeBuf  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176njVOPvfib4X3jQ6GIHLtX8SSDvbpmcpr4uu3X7ELG7PDjdaLVeq4Er02ZoicTPvxrC6KCVH3bssUVw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
