---
verification_source: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/scanner/http/telerik_report_server_auth_bypass.rb"
source_url: "https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/scanner/http/telerik_report_server_auth_bypass.rb"
fixed_version: "仅CVE-2024-4358：10.1.24.514；CVE-2024-1800首修版本另核"
source: "gelusus/wxvl 公众号漏洞文库"
title: "速修复！Progress Telerik 中存在严重的认证绕过漏洞"
product: "Progress Telerik Report Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-4358; CVE-2024-1800"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2024-4358; CVE-2024-1800"
prerequisites: "4358：IIS上的Telerik Report Server<=10.0.24.305，初始化完成后Startup/Register仍可达；1800需要认证且是独立漏洞"
source_status: "recorded"
side_effects: "4358模块默认EXPLOIT创建持久管理员账号并保存本地凭据，无删除账号步骤；302判据不是实际登录证据"
id: "vw-a8359493855eba8b56ee5530"
entity_id: "ve-a8359493855eba8b56ee5530"
schema_version: "1"
---

# 速修复！Progress Telerik 中存在严重的认证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：4358 StartupController.Register在完成初始化后仍开放；1800原需低权限用户，组合由新建管理员满足
- 证据范围：两CVE都是本篇主链，时间与修补版本应分开保存，不与6327同为反序列化就合并。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 产品端对端加密属性无来源，不是核心产品定义
- PoC公开却没有研究者/ZDI/仓库直链，仅二次新闻
- 原文MOVEit事件月份和9600人数等背景统计需核，不能作本漏洞事实证据
- 未发现4358利用只当时声明，修复建议10.1.24.514仅针对当时两漏洞不是长期安全最新版
- 广告/重复推荐文章可清理

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Bill Toulas  代码卫士   2024-06-04 17:34  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**研究员发布 PoC 利用脚本，演示了Progress Telerik Report Server 中的一个认证绕过漏洞CVE-2024-4358（CVSS评分9.8）。**  
  
Telerik Report Server 是一个受 API 驱动的端对端加密报告管理解决方案，供组织机构梳理报告的创建、分享、存储、发行和调度。网络安全研究员 Sina Kheirkha 在 Soroush Dalili的帮助下开发出exp 并发布技术详情，说明了如何组合利用该认证绕过和反序列化漏洞在目标上执行代码的复杂过程。  
  
  
**创建恶意管理员账号**  
  
  
  
CVE-2024-4358可被用于在无需检查的情况下创建管理员账号。Kheirkhah 表示自己在 Progress 在4月25日发布需要“低权限”用户利用的一个反序列化漏洞后发现了该认证绕过漏洞。  
  
他进一步分析后发现 “StartupController”中的“Register”方法可在无需认证的情况下访问，从而在初始设置完成之后还可创建管理员账号。之后厂商在5月15日通过更新（Telerik Report Server 2024 Q2 10.1.24.514）修复了该漏洞，之后在5月31日与ZDI团队发布了安全通告。  
  
实现RCE所需的第二个漏洞是CVE-2024-1800（CVSS 8.8），它是一个反序列化漏洞，可使远程认证攻击者在易受攻击服务器上执行任意代码。该漏洞在早些时候由一名匿名研究员报送，而Progress 在2024年3月7日通过 Telerik® Report Server 2024 Q1 10.0.24.305发布了安.全更新。  
  
攻击者可向 Telerik Report Server 的自定义反序列化器发送具有 “ResourceDictionary” 元素的特殊构造的XML payload。该反序列化器通过复杂机制将XML元素解析到 .NET 类型。该特殊元素之后利用 “ObjectDataProvider”类在服务器上执行任意命令。尽管该反序列化漏洞的利用较为复杂，但由于PoC和利用脚本已发布，因此攻击者可较轻松实施。  
  
因此，组织机构必须尽快应用更新，即更新到10.1.24.514或后续版本，修复这两个漏洞。  
  
Progress 还建议，尽管并未有CVE-2024-4358遭利用的报告，但系统管理员应当查看 Report Server的用户列表中是否存在无法识别的任何新增Local 用户被添加到  '{host}/Users/Index'。  
  
Progress Software 中的严重漏洞一般都不会被高级别网络犯罪分子忽略，因为该厂商的产品应用于全球大量组织机构中。例如，Clop 勒索团伙在2023年3月利用 MOVEit Transfer 平台中的一个0day，成为历史上规模最大的勒索事件，受害者超过2770名且间接影响全球9600名人员。  
  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[速修复Progress Flowmon中的这个CVSS满分漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519358&idx=2&sn=398290f1e1cbf32a9f72ff26e3d708c4&chksm=ea94bd14dde334025bccac4bf83cd4b90113971ba22d26184385ccc5d530c62314ca6d06d349&scene=21#wechat_redirect)  
  
  
[Veeam：Backup Enterprise Manager 中存在严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519550&idx=2&sn=6b4de50a6ef98b37be097aae6daafa64&chksm=ea94bc54dde33542e89c9b2f5b6a2105c6c926040276e43b5afbb6b233fffe948a2df38e1334&scene=21#wechat_redirect)  
  
  
[QNAP提醒注意NAS设备中严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519033&idx=2&sn=59f095fb0e0636ab2257aaf9cc7d7e27&chksm=ea94ba53dde333458f33894831a44c39ac69f925de1b9e7262ba526c9c4ebe0f113e84a4f2e5&scene=21#wechat_redirect)  
  
  
[速修复！Fortra GoAnywhere MFT 中存在严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518740&idx=1&sn=f97575a3c85c3e1d61c6ede1e31c0f1d&chksm=ea94bb7edde33268c42b5b9a74eb3ee30ceb5c34a906ff95500378175e985f1b8e0554fbcf3d&scene=21#wechat_redirect)  
  
  
[VMware 披露严重的VCD Appliance认证绕过漏洞，无补丁](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518139&idx=2&sn=4951a6280d077d8cd04309f6629182e3&chksm=ea94b6d1dde33fc71b53f7879454b257d922f83689acde6d310a195b1857f38098ca7685fcca&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/exploit-for-critical-progress-telerik-auth-bypass-released-patch-now/  
  
  
题图：  
Pexels  
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


## 2026-10-03 公开验证资料补充

[固定公开源码](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/scanner/http/telerik_report_server_auth_bypass.rb) 本次已完整静态阅读；未检查框架及载荷的全部传递依赖。

该辅助模块的默认动作是 EXPLOIT。`create_account` 向 Startup/Register 发送完整注册字段，创建管理员，并检查302到Report/Index；它还把新凭据保存到本地工作区，没有删除账号的步骤。CHECK 动作只识别登录页版本，不能当实际绕过证明。

[厂商CNA](https://cveawg.mitre.org/api/cve/CVE-2024-4358) 将受影响环境限定为 IIS 上的 Telerik Report Server 2024Q1（10.0.24.305）及以前，修复为10.1.24.514。该账号创建满足另一条已认证漏洞的前置条件，但4358本身不是反序列化执行链。引用模块完整可追溯，未执行注册、登录或安装框架。

302重定向到Report/Index是模块预期的账号创建判据；源码将新凭据的登录状态记录为UNTRIED，没有证明实际登录成功。10.1.24.514在此只作为CVE-2024-4358修复号，不能默认也是CVE-2024-1800的首次修复版本。
