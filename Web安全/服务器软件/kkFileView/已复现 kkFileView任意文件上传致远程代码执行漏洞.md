---
source: "gelusus/wxvl 公众号漏洞文库"
title: "【已复现】kkFileView任意文件上传致远程代码执行漏洞"
product: "kkFileView压缩包预览"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "4.2.0–4.4.0-beta、前台上传处理压缩包、目标路径可写并后续执行"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-903b03d22dfff829fe9e69b5"
entity_id: "ve-903b03d22dfff829fe9e69b5"
schema_version: "1"
---

# 【已复现】kkFileView任意文件上传致远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：4.2.0–4.4.0-beta、前台上传处理压缩包、目标路径可写并后续执行
- 证据范围：独有4.2.0文件名处理变更与修复commit，核心机制有用；复现章节空白

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响/解决方案/复现/产品支持全部黏成一段，结构需恢复
- 已复现标题没有正文证据/截图；不能视作可复现条目
- 未发布正式修复只适用于2024-04-17当时；4月16月笔误
- 开发分支最新代码不等同稳定发布升级方案

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

长亭应急  黑伞安全   2024-04-17 17:50  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/FOh11C4BDicTDoBJh7aQJm2oibMRkWvoayyxLm0DtPjJZNlvX4icjkMoQUB4vnBODWABsicHibwxibUGEEalicAqrfGQw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
kkFileView是一个开源的在线文件预览解决方案，支持多种文件格式。  
  
  
2024年4月，互联网上披露kkFileView远程代码执行漏洞情报，攻击者可利用该漏洞上传恶意文件，获取操作系统权限。该漏洞利用简单，建议受影响的客户尽快修复漏洞。  
  
  
**漏洞描述**  
  
   
Description   
  
  
  
**0****1**  
  
漏洞成因在v4.2.0版本的更新中，由于前台上传功能在处理压缩包时，从仅获取文件名改为获取文件名及其目录，导致出现了Zip Slip漏洞。这使得攻击者可上传包含恶意代码的压缩包并覆盖系统文件，随后通过调用这些被覆盖的文件实现远程代码执行。漏洞影响这一漏洞的成功利用将会导致严重的安全后果。攻击者通过上传特制的ZIP文件，可以执行服务器上的任意代码，从而获得服务器的进一步控制权。最严重的情况下，这可能导致服务器的完全接管，敏感数据泄露，甚至将服务器转化为发起其他攻击的跳板。影响版本 Affected Version 02已知影响版本：4.2.0 <= kkFileView <= v4.4.0-beta目前官方暂未发布正式修复版本，但已在开发分支中修复，预计下个正式版本会合并修复代码，建议使用POC自查或版本自查解决方案 Solution 03临时缓解方案1. 建议开启 file.upload.disable=true 参数，禁用首页的文件上传功能，关闭演示入口来规避问题。2. 如非必要，不要将该系统放置在公网上。或通过网络ACL策略限制访问来源，例如只允许来自特定IP地址或地址段的访问请求。升级修复方案该问题已在项目的开发分支中得到修复，但尚未在官方发布版本中更新。用户可以通过从官方GitHub页面下载开发分支的最新代码来临时解决此问题，等待修复被包含在即将发布的正式版本中。建议持续关注官方的版本更新通知，以便及时获得修复。漏洞复现 Reproduction 04产品支持 Support05云图：默认支持该产品的指纹识别，同时支持该漏洞的PoC原理检测。洞鉴：将由新的引擎版本支持该漏洞的原理检测，将于2024.4.18前发布。雷池：预期4月17日17时前发布虚拟补丁，支持检测该漏洞的利用行为。全悉：默认支持检测该漏洞的利用行为。  
**时间线**  
  
 Timeline   
  
  
  
**06**  
4月16月 长亭科技监测到漏洞情报4月17日 官方修复漏洞4月17日 长亭安全应急响应中心发布通告  
参考资料：  
  
[1].https://github.com/kekingcn/kkFileView  
  
[2].https://github.com/kekingcn/kkFileView/commit/421a2760d58ccaba4426b5e104938ca06cc49778  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
