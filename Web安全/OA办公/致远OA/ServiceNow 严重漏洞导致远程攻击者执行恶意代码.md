---
source: "gelusus/wxvl 公众号漏洞文库"
title: "ServiceNow AI Platform 沙箱逃逸未认证代码执行通告"
product: "ServiceNow AI Platform"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-6875"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Brazil EA/GA、Australia Patch2、Zurich7b/9、Yokohama12HF1b/13修复声称；托管/自托管"
prerequisites: "声称未认证但具体触发受限未公开"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/ServiceNow%20%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E6%94%BB%E5%87%BB%E8%80%85%E6%89%A7%E8%A1%8C%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81.md"
id: "vw-a509c951c157fca1f2c8e13a"
entity_id: "ve-a509c951c157fca1f2c8e13a"
schema_version: "1"
---

# ServiceNow AI Platform 沙箱逃逸未认证代码执行通告

## 条目说明

- 对象与具体问题：ServiceNow AI Platform；沙箱逃逸未认证代码执行通告
- 版本、配置及部署条件：Brazil EA/GA、Australia Patch2、Zurich7b/9、Yokohama12HF1b/13修复声称；托管/自托管
- 认证与权限前提：声称未认证但具体触发受限未公开
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错分致远OA；主CVE2026-6875及KB2930717/KB2930740应结构化
- 产品系列/补丁的条件保留，不应统一成单数版本范围
- 只链接二次新闻未给ServiceNow公告可点击链接，需权威核验
- 公开技术细节受限，无PoC是通告属性；未在野截至2026-07-13而非当前保证

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

Abinaya
                    Abinaya  代码卫士   2026-07-14 09:41  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**ServiceNow****披露并修复了位于****AI****平台中的一个严重的沙箱逃逸漏洞（****CVE-2026-6875****），可导致未经身份认证的攻击者在受影响的****ServiceNow****环境中执行代码。该漏洞影响托管和自托管****ServiceNow****部署版本。**  
  
ServiceNow   
被企业广泛用于  
IT  
服务管理、工作流自动化、客户运营、安全运营和内部业务流程。  
ServiceNow   
公司表示，该漏洞可导致攻击者规避平台限制条件并在特定情况下绕过平台预设的限制并执行代码。由于利用无需进行身份认证，因此该漏洞可导致尚未收到安全更新的  
 ServiceNow   
实例遭暴露。  
  
成功的远程代码执行攻击可使攻击者破坏工作流、访问敏感数据、修改记录或将受陷环境作为进一步实施攻击活动的入口点。  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
**漏洞补丁和更新**  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
  
  
该漏洞位于  
 ServiceNow AI   
平台中。不过  
ServiceNow   
公司并未发布关于漏洞底层根因的技术详情。该公司在  
2026  
年  
7  
月  
13  
日发布安全公告，仅将技术详情告知数量有限的客户，以便客户能够在攻击者开发出可靠利用前打补丁。  
  
ServiceNow   
已将安全更新部署到所托管的实例中。该公司还为自托管客户和合作伙伴提供了相关更新。自行管理  
ServiceNow  
环境的组织应审查当前的系列版本，并尽快安装相应的补丁或升级到已修复的版本。该问题已在  
Brazil Early Access  
和  
Brazil General Availability  
版本中修复。对于  
Australia  
版本，该漏洞已在  
Australia Patch 2  
中得到解决。  
Zurich  
客户应安装  
Zurich Patch 7b  
或  
Zurich Patch 9  
。  
Yokohama  
用户可通过  
Yokohama Patch 12 Hot Fix 1b  
或  
Yokohama Patch 13  
获得保护。  
ServiceNow  
表示，目前尚未发现  
CVE-2026-6875  
遭在野利用的情况。  
  
然而，公开披露严重的未经身份验证的远程代码执行漏洞，很快会引起安全研究人员和恶意攻击者的关注。因此，即使尚未发现可疑活动，各组织机构也应将该问题视为紧急事项。管理员应确认  
ServiceNow  
实例是由  
ServiceNow  
托管还是部署在自托管环境中。托管客户应验证平台更新是否已应用。同时，自托管管理员应查阅  
ServiceNow  
的安全维护指南和补丁状态。安全团队还应在更新后监控管理活动、异常集成、意外的工作流变更以及可疑的  
API  
行为。  
  
用户可通过  
CVE.org  
获取  
CVE  
记录，补丁和维护的更多信息可在  
ServiceNow  
公告  
KB2930717  
和  
KB2930740  
中查阅。及时修复仍是防范潜在漏洞利用的最有效防御措施。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Langflow 严重漏洞可导致未认证远程代码执行后果](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526389&idx=2&sn=a692a0a18f59def9c6fa164c8ac2ccec&scene=21#wechat_redirect)  
  
  
[Libssh2 严重漏洞可导致攻击者执行远程代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526367&idx=1&sn=75309fe9323e5ed5c44c05f759fa40d9&scene=21#wechat_redirect)  
  
  
[Fortra 访问管理器漏洞可导致远程命令注入攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526330&idx=2&sn=634ff7aee7d1db205f90e279a8c74f64&scene=21#wechat_redirect)  
  
  
[Comet Backup 服务器严重漏洞可导致客户数据被远程泄露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526149&idx=2&sn=58f20be37a8c71d4f0e7d16aa1e8f1b5&scene=21#wechat_redirect)  
  
  
[NGINX 新漏洞可导致远程攻击者触发恶意代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526088&idx=3&sn=353fe1e4d9d79dec6b4cce44a35da5fe&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/servicenow-remote-malicious-code/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
