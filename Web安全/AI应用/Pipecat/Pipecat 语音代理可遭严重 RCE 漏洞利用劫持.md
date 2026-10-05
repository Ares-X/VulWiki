---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Pipecat 语音代理可遭严重 RCE 漏洞利用劫持"
product: "Pipecat"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-1cd3ae821687a9d1a3935a43"
entity_id: "ve-1cd3ae821687a9d1a3935a43"
schema_version: "1"
---

# Pipecat 语音代理可遭严重 RCE 漏洞利用劫持

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 正文CVE-2025-62373未进metadata
- 显式启用LivekitFrameSerializer与网络入口前提应标明
- 修复0.0.94需GHSA核验
- 只有二手securityonline来源
- 无具体验证步骤
- 大段广告/公众号模板/空白清理

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

DDoS
                    DDoS  代码卫士   2026-04-28 10:12  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**用于构建语音及对话代理的热门开源 Python 框架Pipecat 中存在一个严重漏洞CVE-2025-62373，CVSS 评分高达9.8分，可导致远程代码执行（RCE）后果。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞出在一个已弃用且无文档记录的组件LivekitFrameSerializer 上，为面向网络的应用中不安全的反序列化操作敲响了警钟。该漏洞的核心在于 Python 的 pickle 模块。该模块虽然功能强大，但序列化与反序列化的方式也以不安全著称。LivekitFrameSerializer 原本用于转换音频帧以实现与 LiveKit 的集成。然而，其 deserialize() 方法被指会直接将来自 WebSocket 客户端的不可信数据，未经任何校验便传入 pickle.loads() 函数中。  
  
技术摘要解释称该类的 deserialize() 方法对从 WebSocket 客户端接收到的数据直接使用了 Python 的 pickle.loads()，未进行任何验证或清理。这意味着恶意 WebSocket 客户端可以发送特殊构造的 pickle 载荷，从而在 Pipecat 服务器上执行任意代码。  
  
由于 pickle 能够实例化任何 Python 对象，并在反序列化过程中执行代码，攻击者可构造恶意的二进制对象。一旦该对象被“反序列化”，攻击者就能以 Pipecat 服务所拥有的权限，完全控制宿主系统。  
  
虽然 LivekitFrameSerializer 并未默认启用，但任何为支持 LiveKit 而显式选择使用该组件的开发者，都面临着极高的风险。位于同一网络，或是服务暴露于公共互联网中的情况下，攻击者只需发送一条恶意消息，即可实现完整的远程代码执行，从而能够：  
  
- 执行任意操作系统命令  
  
- 安装恶意软件或勒索软件  
  
- 横向渗透至组织网络内的其他敏感系统  
  
  
  
Pipecat 维护者已在 0.0.94 版本中正式修复了该漏洞。有漏洞的类已被弃用，取而代之的是更安全的 LiveKit Transport 方法。  
  
建议开发者：  
  
- 立即升级：迁移至 Pipecat 0.0.94 或更高版本，以完全消除风险。  
  
- 消除不安全反序列化：彻底停止使用 LivekitFrameSerializer。  
  
- 采用安全格式：使用 JSON、Protocol Buffers 或 MessagePack 等在解析时不会执行代码的标准化格式。  
  
- 网络加固：尽可能将服务绑定到本地回环地址（127.0.0.1），并对所有 WebSocket 连接实施强认证与授权机制。  
  
  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Anthropic MCP 设计漏洞可导致 RCE，威胁 AI 供应链安全](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525820&idx=1&sn=43dddbdd81acc2370c91e72867508c0f&scene=21#wechat_redirect)  
  
  
[Axios 严重漏洞可导致 RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525768&idx=2&sn=b8967ced3022f4f88a311a652e635650&scene=21#wechat_redirect)  
  
  
[Marimo 高危预认证 RCE 漏洞已遭活跃利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525746&idx=2&sn=777605c08e8d6f2e0dbad63e8f408da4&scene=21#wechat_redirect)  
  
  
[开源平台 Flowise 中的满分 RCE 漏洞已遭在野利用](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525680&idx=1&sn=5dbab9da81c7d42eda6c2082c7f2ac03&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/pipecat-rce-vulnerability-cve-2025-62373-pickle-deserialization/  
  
  
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
