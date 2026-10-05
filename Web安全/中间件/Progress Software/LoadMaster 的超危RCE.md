---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Progress 紧急修复影响 LoadMaster 的超危RCE漏洞"
product: "Progress Kemp LoadMaster/MT Hypervisor"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-7591"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2024-7591"
prerequisites: "管理接口网络可达、受影响软件/未装专用addon补丁"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b03350a2bd634f519f55b914"
entity_id: "ve-b03350a2bd634f519f55b914"
schema_version: "1"
---

# Progress 紧急修复影响 LoadMaster 的超危RCE漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：管理接口网络可达、受影响软件/未装专用addon补丁
- 证据范围：正确强调管理接口且补丁非普通升级版本，新闻自述尚未在野应标2024-09时点；非所有数据面HTTP入口。

### 本次正文校订

- 修正正文中的 加载均衡 → 负载均衡 转录错误，资源路径保持原样。
- 修正正文中的 Mult-Tenant → Multi-Tenant 转录错误，资源路径保持原样。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺厂商addon下载/安装说明与免费版适用性原文
- LTS/LTSF受影响仅泛称没分支具体版本
- 全部未利用/暂无目标版本是历史状态不能当当前修复建议
- 加载均衡应负载均衡、Mult-Tenant拼写；广告推荐占多数

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Bill Toulas  代码卫士   2024-09-09 17:46  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Progress Software 公司紧急修复了影响 LoadMaster 和 LoadMaster Multi-Tenant (MT)  Hypervisor产品的CVSS满分漏洞 (CVE-2024-7591)，它可导致攻击者在设备上远程执行命令。**  
  
  
该漏洞被归类为输入验证不当漏洞，可导致未认证的远程攻击者使用特殊构造的 HTTP 请求访问 LoadMaster的管理接口。然而，缺乏用户输入清理还可导致攻击者在易受攻击的端点上执行任意系统命令。  
  
该安全公告提到，“未认证的远程攻击者如能访问LoadMaster的管理接口来发布特殊构造的HTTP请求，将导致执行任意系统命令。”该漏洞目前已修复。  
  
LoadMaster 是一款由大型组织机构使用的应用交付控制器 (ADC) 和负载均衡解决方案，用于优化应用性能、管理网络流量并确保服务高可用性。LoadMaster MT Hypervisor是位多租户环境设计的 LoadMaster 版本，可允许在同样的硬件上运行多个虚拟网络功能。  
  
CVE-2024-7591影响 LoadMaster 7.2.60.0及之前版本、MT Hypervisor 7.1.35.11及之前版本。Long-Term Support（LTS）和Long-Term Support with Feature (LTSF) 分支也受影响。  
  
为修复该漏洞，Progress 发布可在任何易受攻击版本（包括老版本）上安装的附件程序包，因此目前尚不存在升级至的目标版本。不过，该补丁并不适用于 LoadMaster 免费版本。  
  
Progress Software 公司表示，截止到公告发布之时，并未收到任何关于该漏洞遭活跃利用的报告。尽管如此，建议所有的 LoadMaster 用户采取恰当措施确保自己的环境不受影响，包括安装该附件包以及执行厂商推荐的安全加固措施。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Progress 提醒注意Telerik Report Server中的严重RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520228&idx=1&sn=d9e2734ebb4a13c747b20000c240d7bd&chksm=ea94be8edde33798e81c133dacfe538263083021026fe777545f067b211569e604c359b9c639&scene=21#wechat_redirect)  
  
  
[速修复！Progress Telerik 中存在严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519654&idx=1&sn=22b4f342e957ddb68acf5d7dabc14f7b&chksm=ea94bcccdde335da0a488c11021c8d947834829e062cbd4a5917bc946b3037f54a151014c361&scene=21#wechat_redirect)  
  
  
[速修复Progress Flowmon中的这个CVSS满分漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519358&idx=2&sn=398290f1e1cbf32a9f72ff26e3d708c4&chksm=ea94bd14dde334025bccac4bf83cd4b90113971ba22d26184385ccc5d530c62314ca6d06d349&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/progress-loadmaster-vulnerable-to-10-10-severity-rce-flaw/  
  
  
题图：  
Pixabay  
 License  
  
****  
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
