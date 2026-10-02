---
cve: "CVE-2024-51978"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-2521ccc0ef40a309083c846c"
entity_id: "ve-2521ccc0ef40a309083c846c"
schema_version: "1"
title: "Brother、富士等多型打印机曝严重漏洞，核心问题无法通过固件修复"
product: "Brother及Fujifilm/Ricoh/Toshiba/Konica打印扫描设备"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-51977; CVE-2024-51978; CVE-2024-51979; CVE-2024-51980; CVE-2024-51981; CVE-2024-51982; CVE-2024-51983; CVE-2024-51984"
referenced_identifiers: ""
prerequisites: "51978需序列号且默认管理密码未改；其他各有认证/端口差异"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Brother/Brother%E3%80%81%E5%AF%8C%E5%A3%AB%E7%AD%89%E5%A4%9A%E5%9E%8B%E6%89%93%E5%8D%B0%E6%9C%BA%E6%9B%9D%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%EF%BC%8C%E6%A0%B8%E5%BF%83%E9%97%AE%E9%A2%98%E6%97%A0%E6%B3%95%E9%80%9A%E8%BF%87%E5%9B%BA%E4%BB%B6%E4%BF%AE%E5%A4%8D.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Brother、富士等多型打印机曝严重漏洞，核心问题无法通过固件修复  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Brother及Fujifilm/Ricoh/Toshiba/Konica打印扫描设备
- 本文讨论：CVE-2024-51977–51984，51978为默认密码生成核心
- 版本、权限与配置前提：51978需序列号且默认管理密码未改；其他各有认证/端口差异
- 资料类型：八漏洞多OEM披露综述；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 开头6月26披露与时间线6月25冲突；把695型号说成Brother自身但全文689Brother/748总计，统计分母混淆
- 元数据只51978；七厂商公告仅名称没有直链，影响列表指向CVE却未逐项链接
- 51979受控PC足以潜在RCE与完整未认证利用链应区分

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 型号级修复和原研究RCE成熟度、准确披露日期待Rapid7/厂商核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 CyberOk   2025-06-28 03:47  
  
安全公司Rapid7于2025年6月26日公开披露了影响Brother、富士、理光、东芝和柯尼卡美能达五家制造商共748款打印机、扫描仪和标签机的八个安全漏洞，其中Brother设备受影响最广，涉及689种型号。此次披露的核心是一个被评定为“严重”级别（CVSS 9.8）的漏洞（CVE-2024-51978）。该漏洞存在于Brother设备的默认口令生成机制中，允许攻击者利用设备的序列号（可通过其他方式或漏洞获取）计算出设备的默认管理员口令。特别值得注意的是，Brother表示此漏洞无法通过固件更新完全修复，需要改变制造流程才能根除，影响其695种型号设备。  
  
此外，Rapid7还发现了另外七个漏洞，包括可能导致设备序列号泄露、结合管理员权限可实现远程代码执行的缓冲区溢出漏洞、可能被用于内部网络探测的服务器端请求伪造（SSRF）漏洞、可导致设备瘫痪的拒绝服务（DoS）漏洞，以及能泄露设备配置的外部服务（如LDAP/FTP）明文凭证的漏洞。攻击者可能组合利用这些漏洞，在企业网络中获取初始访问权限、横向移动、窃取敏感数据或中断服务。虽然目前尚未观测到实际攻击，但鉴于受影响的设备数量庞大（全球可能达数百万台），且漏洞利用难度各异，安全风险极高。  
  
对于无法固件修复的核心漏洞CVE-2024-51978，Brother及安全研究人员强调，用户必须立即更改设备的默认管理员口令。同时，Brother已发布固件更新以修复其余七个漏洞，强烈建议用户尽快安装。其他受影响的制造商（富士、理光、东芝、柯尼卡美能达）也发布了安全公告，同样要求用户更新密码并升级固件。此次漏洞披露是Rapid7自2024年5月首次联系Brother起，通过日本JPCERT/CC协调，历经近一年协作（至2025年6月）完成的结果。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/0KRmt3K30icVhzT8rFMgL2eXAv5rR69miahzdx6ibTrvCIr61snNfNRfibibIAHwICepic2Urk9397mNvZcE0srHbibibA/640?wx_fmt=webp&from=appmsg "")  
  
情况概述  
  
2025 年 6 月 25 日更新：更新统计数据以反映柯尼卡美能达公司另外 6 款受影响的型号。  
  
Rapid7对兄弟工业株式会社 的多功能打印机 (MFP) 进行了零日研究项目 。研究发现了 8 个新漏洞。经确认，这些漏洞的部分或全部影响兄弟系列打印机、扫描仪和标签机设备的 689 种型号。此外，富士胶片商业创新公司的 46 种打印机型号、理光公司的 5 种打印机型号、东芝泰格公司的 2 种打印机型号以及柯尼卡美能达公司的 6 种打印机型号受到这些漏洞的部分或全部影响。总计 有 5 家供应商的 748 种型号受到影响。过去十三个月来，Rapid7 和 JPCERT/CC一直与兄弟公司合作，协调披露这些漏洞。  
  
最严重的发现是 身份验证绕过漏洞 CVE-2024-51978。远程未经身份验证的攻击者可以通过多种方式之一泄露目标设备的序列号，进而生成目标设备的默认管理员密码。这是因为发现了 Brother 设备使用的默认密码生成程序。此过程将序列号转换为默认密码。受影响的设备在制造过程中根据每个设备的唯一序列号设置了默认密码。Brother 表示，此漏洞无法在固件中完全修复，并要求更改所有受影响型号的制造工艺。 只有通过这种新制造工艺生产的受影响型号才能完全修复 CVE-2024-51978。对于所有通过旧制造工艺生产的受影响型号，Brother 都提供了一种解决方法。  
  
这 8 个漏洞的概述如下：  
  
<table><thead><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><th style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">常见漏洞</span></font></font></p></th><th style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">描述</span></font></font></p></th><th style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">受影响的服务</span></font></font></p></th><th style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVSS</span></font></font></p></th></tr></thead><tbody><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51977</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可能会泄露敏感信息。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">HTTP（端口 80）、HTTPS（端口 443）、IPP（端口 631）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">5.3（中等）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51978</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可以生成设备的默认管理员密码。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">HTTP（端口 80）、HTTPS（端口 443）、IPP（端口 631）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">9.8（严重）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51979</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">经过身份验证的攻击者可以触发基于堆栈的缓冲区溢出。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">HTTP（端口 80）、HTTPS（端口 443）、IPP（端口 631）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">7.2（高）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51980</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可以强制设备打开 TCP 连接。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">通过 HTTP 的 Web 服务（端口 80）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">5.3（中等）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51981</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可以强制设备执行任意 HTTP 请求。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">通过 HTTP 的 Web 服务（端口 80）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">5.3（中等）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51982</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可能会导致设备崩溃。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">PJL（端口 9100）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">7.5（高）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51983</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">未经身份验证的攻击者可能会导致设备崩溃。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">通过 HTTP 的 Web 服务（端口 80）</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">7.5（高）</span></font></font></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-style: solid;border-color: rgb(229, 231, 235);border-image: initial;"><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">CVE-2024-51984</span></font></font></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">经过身份验证的攻击者可以泄露已配置的外部服务的密码。</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><p style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">LDAP、FTP</span></font></font></p></td><td style="box-sizing: border-box;border: 1px solid rgb(156, 163, 175);"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);" data-mpa-action-id="mccijtij16ql"><font style="box-sizing: border-box;border: 0px solid rgb(226, 232, 240);"><span leaf="">6.8（中等）</span></font></font></td></tr></tbody></table>  
  
**影响分析**  
  
信息泄露漏洞**CVE-2024-51977**  
允许远程未认证攻击者泄露目标设备的序列号以及其他若干敏感信息。掌握目标设备的序列号是利用认证绕过漏洞**CVE-2024-51978**  
的前提条件。  
  
认证绕过漏洞**CVE-2024-51978**  
允许远程未认证攻击者生成目标设备的默认管理员密码。该默认密码在制造过程中通过将设备的唯一序列号转换而得。**CVE-2024-51977**  
允许攻击者通过设备的HTTP、HTTPS和IPP服务泄露序列号。不过，即使攻击者无法利用**CVE-2024-51977**  
，仍可通过PJL（打印机作业语言）或SNMP（简单网络管理协议）查询远程获取设备序列号。如果目标设备的管理员密码尚未更改，仍为默认密码，远程未认证攻击者即可利用该密码重新配置目标设备，或访问仅限认证用户使用的功能。  
  
漏洞**CVE-2024-51979**  
允许已认证攻击者触发堆栈溢出漏洞，并进而控制多个CPU寄存器，包括程序计数器（Program Counter, PC）。该漏洞被认为足以构成远程代码执行（RCE）的可利用条件。如果远程未认证攻击者能够将认证绕过漏洞**CVE-2024-51978**  
与堆栈溢出漏洞**CVE-2024-51979**  
成功组合利用，则最终影响将是**未认证远程代码执行**  
。  
  
两个服务器端请求伪造（SSRF）漏洞**CVE-2024-51980**  
和**CVE-2024-51981**  
允许未认证攻击者通过目标设备发起网络连接。具体影响取决于攻击者与目标设备在网络中的位置。例如，如果打印机的Web界面暴露在某一网络段上，则外部网络中的远程攻击者可能借此连接到内部网络中的资源。  
  
对于两个拒绝服务（DoS）漏洞**CVE-2024-51982**  
和**CVE-2024-51983**  
，任何具有网络访问权限的未认证攻击者都可以反复使目标设备崩溃，造成该设备**完全不可用**  
。  
  
凭据回传漏洞**CVE-2024-51984**  
允许远程已认证攻击者获取多个已配置外部服务（如LDAP或FTP）的明文凭据。成功利用此漏洞可使攻击者获得额外凭据，进一步在网络环境中进行横向移动。例如，若获取到FTP外部服务的凭据，攻击者可能访问和泄露该FTP服务上存储的敏感文件。  
  
在对来自**5家厂商的748款受影响型号**  
进行漏洞映射后，我们可以通过下方图表看到各个CVE所影响型号的分布。例如，有**695个型号受到认证绕过漏洞CVE-2024-51978的影响**  
，而**208个型号受到拒绝服务漏洞CVE-2024-51982的影响**  
。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/0KRmt3K30icVhzT8rFMgL2eXAv5rR69miaavkicdg8qicc1rRrTWSx9bH48Uu0Sf1eDB1OYdfQyPic6PCXO1ZHSPdWg/640?wx_fmt=png&from=appmsg "")  
  
作为此次披露的CVE编号授权机构（CNA），**Rapid7**  
已在所有8个CVE记录中填充了每一个已知受影响型号的信息。由于数据量庞大，该博客中未复制完整列表，建议安全从业人员直接查阅各CVE记录作为关于受影响型号的权威信息来源。  
  
补救措施  
  
厂商已通过固件更新修复包括CVE-2024-51977、CVE-2024-51979、CVE-2024-51980、CVE-2024-51981、CVE-2024-51982、CVE-2024-51983和CVE-2024-51984在内的七项漏洞。用户应尽快从官方渠道下载并安装针对受影响型号发布的最新固件，以消除这些可通过固件方式修复的安全缺陷。  
  
对于认证绕过漏洞CVE-2024-51978，厂商指出固件无法完全解决，但已在安全公告中提供了临时应急解决方案。受影响设备用户需同时应用固件更新和该应急补丁或配置调整，才能全面缓解所有八项漏洞。详情请参阅以下厂商公告：Brother激光与喷墨打印机、Brother文档扫描仪、Brother标签打印机、FUJIFILM Business Innovation、Ricoh、Toshiba Tec Corporation及Konica Minolta, Inc.。  
  
漏洞披露时间线  
  
2024年5月3日：Rapid7与Brother建立首次联系。  
  
2024年5月10日：Brother确认收到漏洞披露文档。  
  
2024年6月4日：Rapid7针对Brother提出的若干技术问题提供了进一步说明。  
  
2024年7月5日：Brother表示今后所有沟通将通过JPCERT/CC进行。  
  
2024年7月24日：JPCERT/CC完成初步对接并分配案例编号。  
  
2024年7月26日：JPCERT/CC建议将披露日期定为2025年5月。  
  
2024年8月28日：JPCERT/CC确认披露进度，并将公开披露时间定为2025年6月。  
  
2024年10月10日：Rapid7发现MFC-L9570CDW固件更新已修复部分已识别问题。  
  
2024年10月18日：Rapid7联系JPCERT/CC，寻求对固件发布及协调披露时间表的澄清。  
  
2024年11月1日：JPCERT/CC确认所有受影响型号的披露时间仍为2025年6月。  
  
2024年11月5日：Rapid7将担任CVE编号授权机构（CNA），并向JPCERT/CC提供8个保留的CVE编号。  
  
2024年11月19日：JPCERT/CC向Rapid7提供受影响型号清单。  
  
2025年3月5日：Brother请求Rapid7验证7个漏洞的修复情况。  
  
2025年3月21日：Rapid7验证修复效果，并向Brother提交详细报告。  
  
2025年5月20日：Rapid7与Brother商定协调披露日期，并建议为2025年6月25日。  
  
2025年5月22日：JPCERT/CC确认将于2025年6月25日进行协调公开披露。  
  
2025年6月2日：JPCERT/CC向Rapid7提供更新后的受影响型号清单。  
  
2025年6月20日：JPCERT/CC向Rapid7提供即将发布的厂商公告链接。  
  
2025年6月25日：本次漏洞披露正式进行。  
  
2025年6月25日：JPCERT/CC向Rapid7提供6款柯尼卡美能达（Konica Minolta, Inc.）受影响型号的详细信息。  
  
  
参考资源  
  
1、  
https://www.rapid7.com/blog/post/multiple-brother-devices-multiple-vulnerabilities-fixed/  
  
2、  
https://www.darkreading.com/endpoint-security/millions-brother-printers-critical-unpatchable-bug  
  
3、  
https://www.securityweek.com/new-vulnerabilities-expose-millions-of-brother-printers-to-hacking/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
