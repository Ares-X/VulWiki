---
cve: "CVE-2026-23870"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Next.js及React Server Components"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-23870; CVE-2026-44572; CVE-2026-44573; CVE-2026-44574; CVE-2026-44575; CVE-2026-44576; CVE-2026-44577; CVE-2026-44578; CVE-2026-44579; CVE-2026-44580; CVE-2026-44581; CVE-2026-44582"
referenced_identifiers: "CVE-2026-23869"
identifier_role: "primary"
identifier_status: "unknown"
title: "12个CVE扎堆引爆：安全研究员一次性披露Next.js-React全版本高危漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Next15.5.16/16.2.5及Turbopack16.2.6、React19.0.6/19.1.7/19.2.6为文中修复，未逐CVE映射影响分支"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0e122e6413600bbef76dff32"
entity_id: "ve-0e122e6413600bbef76dff32"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Next15.5.16/16.2.5及Turbopack16.2.6、React19.0.6/19.1.7/19.2.6为文中修复，未逐CVE映射影响分支

代码与实验材料：仅指向dwisiswant0/next-16.2.4-pocs，没有本地证据；未确认仓库材料

来源证据范围：声称官方GHSA、Cloudflare、NVD但只链接PoC仓库，需逐条来源核验

- **结论使用边界（1）**：托管影响前后矛盾；依据：44578段明确Vercel不受影响，速查表Vercel列却写SSRF/Cache DoS不免疫且行对象是自托管。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：全版本/几乎全部生产部署夸大适用面；依据：各项分别要求App Router、i18n、PPR等特定功能，不是所有React客户端应用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：评级与风险修辞混合；依据：导语3个高危而正文6个高危；High被称接近Critical但无向量或独立依据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（4）**：关键断言没有直接依据；依据：所有12个已收录、任何托管WAF均无法安全拦截、PoC前只有理论风险等均泛化或无直接链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  12个CVE扎堆引爆：安全研究员一次性披露Next.js/React全版本高危漏洞  
Jack Stone
                    Jack Stone  黑白之道   2026-05-10 00:20  
  
> **导语**  
：2026年5月8日，安全研究员 dwisiswant0 在 GitHub 公开发布 Next.js v16.2.4 安全 PoC 合集，一次性涵盖 12 个已修复 CVE（涵盖 CVE-2026-23870、CVE-2026-44574 至 CVE-2026-44582），其中 3 个高危漏洞（SSRF、认证绕过、DoS）可直接影响几乎所有生产环境部署。补丁已就绪，但大量系统仍未升级。  
  
  
![12个CVE漏洞概念图](https://mmbiz.qpic.cn/mmbiz_png/nGzNudUIJ6PLIbiapo2YV2kVBm2BGm3MZHg1vZ3UFWqCOvxibKtQgpHddIqWUFlbpo6h6FCMW3rrUYdsO1LyQLMKnqDFFrm7cYhKtJibKwKA98/640?wx_fmt=png "12个CVE漏洞概念图")  
## 事件时间线  
  
2026年5月7日，Vercel 核心维护者 Tim Neutkens 通过 GitHub 安全公告系列（GHSA 编号范围：GHSA-8h8q-6873-q5fj 至 GHSA-3g8h-86w9-wvmq）发布了 Next.js 安全补丁，修复版本为 15.5.16 和 16.2.5，覆盖 Next.js 13.x 至 16.x 全分支。  
  
2026年5月8日，安全研究员 **dwisiswant0**  
 在 GitHub 发布 next-16.2.4-pocs[1]  
 仓库，将上述 12 个漏洞的反向工程 PoC 材料全部公开。该仓库由 ProjectDiscovery 的 Neo 工具辅助完成逆向分析，每个 CVE 对应独立目录，包含漏洞描述、补丁差异、可运行利用脚本及最小复现应用。  
  
**补丁修复版本一览：**  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">受影响组件</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">修复版本</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Next.js 15.x 分支</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">15.5.16</span></strong></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Next.js 16.x 分支</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">16.2.5</span></strong><section><span leaf="">（Turbopack 用户须升级至 16.2.6）</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">react-server-dom-webpack</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">19.0.6 / 19.1.7 / 19.2.6</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">react-server-dom-parcel</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">19.0.6 / 19.1.7 / 19.2.6</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">react-server-dom-turbopack</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">19.0.6 / 19.1.7 / 19.2.6</span></section></td></tr></tbody></table>  
5月8日，Netlify、CyberPress、GBHackers、Cryptika Cybersecurity 等多家安全媒体同步跟进报道，确认 Vercel 托管部署对部分漏洞免疫，但自托管环境暴露面广泛。  
## 12个CVE全貌：严重性分布  
  
本次披露的 12 个漏洞可按严重性分为三个等级：  
### 高危（High）：6个  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">CVE ID</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">GHSA</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">漏洞类型</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">受影响场景</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44574</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-492v-c6pp-mqqv</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">中间件绕过</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">App Router 动态路由</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44575</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-267c-6grr-h53f</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">中间件绕过</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">App Router .rsc / segment-prefetch</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44573</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-36qx-fr4f-26g5</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">中间件绕过</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Pages Router + i18n</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44578</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-c4j6-fc7j-m34r</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">SSRF（严重）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">自托管 WebSocket 升级</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-23870</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-8h8q-6873-q5fj</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">DoS（反序列化）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">App Router Server Function</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44579</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-mg66-mrh9-m8jx</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">DoS（死锁）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Cache Components Partial Prerendering</span></section></td></tr></tbody></table>### 中危（Moderate）：4个  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">CVE ID</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">GHSA</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">漏洞类型</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44581</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-ffhc-5mcf-pf4q</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CSP Nonce 解析边缘 XSS</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44580</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-gx5p-jg67-6x7h</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">beforeInteractive XSS</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44577</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-h64f-5h5j-jqjh</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">图片优化解压炸弹</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44576</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-wfc6-r584-vfw7</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">RSC 与 HTML 缓存混淆</span></section></td></tr></tbody></table>### 低危（Low）：2个  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">CVE ID</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">GHSA</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">漏洞类型</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44582</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-vfv6-92ff-j949</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">RSC 缓存破坏哈希弱化</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2026-44572</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">GHSA-3g8h-86w9-wvmq</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">redirect 缓存投毒</span></section></td></tr></tbody></table>  
![Next.js漏洞全景影响图](https://mmbiz.qpic.cn/sz_mmbiz_png/nGzNudUIJ6OkqJ8BiaibIicOtFibML1p8WFfuJOowf13gZXavEEelvbf4NesOibJ9uxAovSOOUy5Baad4zg3ZBAZ2t4autfA1Ir4ZYia5cdd0G3Bw/640?wx_fmt=png "Next.js漏洞全景影响图")  
  
值得注意的是，CVE-2026-44578 在评级上虽为 High，但其攻击面（无需认证、可探测内网资源）在实际威胁评估中接近 Critical 级别。  
## 三大核心风险详解  
### SSRF 漏洞：CVE-2026-44578  
  
这是本批漏洞中单项风险最高的一个。攻击者通过操控 WebSocket 升级请求，可强制自托管 Next.js 服务器以自身身份向任意地址发起请求。在云原生部署场景下，攻击者可以：  
- 探测 AWS/GCP/Azure 实例元数据端点（169.254.169.254  
）  
  
- 访问内部微服务和管理界面  
  
- 绕过防火墙规则横向移动  
  
**Vercel 托管部署不受此漏洞影响**  
，但所有自托管 Node.js 部署须立即评估。  
### DoS 双重威胁：CVE-2026-23870 & CVE-2026-44579  
  
CVE-2026-23870 是一个"修复之后再修复"的典型案例。dwisiswant0 的 PoC 仓库文档明确记载：**用于修复 CVE-2026-23869 的版本（19.0.5 / 19.1.6 / 19.2.5）自身即为 CVE-2026-23870 的漏洞版本**  
。  
  
这意味着已完成上一轮 DoS 补丁升级的组织，若不跟进本次升级，仍然暴露。  
  
CVE-2026-44579 则瞄准 Cache Components 的 Partial Prerendering 特性，恶意 POST 请求可触发请求体死锁，导致服务连接耗尽。Vercel 建议在边缘层拦截所有包含 Next-Resume  
 请求头的入站请求作为临时缓解。  
### 中间件绕过三连击：CVE-2026-44574 / CVE-2026-44575 / CVE-2026-44573  
  
三组不同的绕过技术覆盖了 Next.js 几乎所有的路由架构：  
- **CVE-2026-44574**  
：通过注入动态路由参数，使中间件匹配规则对真实请求路径失明  
  
- **CVE-2026-44575**  
：利用 .rsc 和 segment-prefetch URL 格式绕过 App Router 中间件检查  
  
- **CVE-2026-44573**  
：针对 Pages Router + i18n 配置，locale-less 数据请求可绕过认证获取 SSR JSON  
  
Cloudflare WAF 更新日志明确指出：**这三个中间件绕过漏洞无法通过任何托管 WAF 规则安全拦截**  
。  
## PoC 公开意味着什么  
  
dwisiswant0 的 PoC 仓库是本次事件的重要转折点。在 PoC 公开前，漏洞仅有理论风险；PoC 公开后，任何具备基本技术能力的攻击者都可以在数分钟内完成复现。  
  
该仓库的公开工作坊链接（Neo by ProjectDiscovery）使漏洞利用门槛进一步降低。GitHub Advisory Database 和 NVD 已同步收录所有 12 个 CVE，扫描工具和自动化攻击框架将在数天内集成相关检测规则。  
## 受影响范围速查  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">部署类型</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">暴露等级</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">Vercel 托管是否免疫</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Next.js 15.x / 16.x 自托管</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">🔴 高危</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">部分免疫（SSRF/Cache DoS 不免疫）</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Next.js 13.x / 14.x 自托管</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">🔴 高危</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">部分免疫</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Vercel 托管（App Router）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">🟡 中危</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">多数漏洞免疫</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">React Server Components 包（RSC）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">🔴 高危</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">不适用</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">React 客户端侧应用</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">🟢 低危</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">不适用</span></section></td></tr></tbody></table>## 即时止损动作  
1. **立即升级**  
：Next.js 至 15.5.16 / 16.2.5（Turbopack 用户 16.2.6）；RSC 包至 19.0.6 / 19.1.7 / 19.2.6  
  
1. **边缘缓解**  
：在反向代理层拦截含 Next-Resume  
 头的入站请求  
  
1. **SSRF 缓解**  
：阻断未授权 WebSocket 升级请求，剥离内部响应头  
  
1. **WAF 不可替代**  
：Cloudflare 已确认网络层规则无法全面拦截，**代码级修复是唯一可靠路径**  
  
## 长线修复计划  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">优先级</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">行动项</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">截止建议</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">P0</span></strong></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Next.js + RSC 包全量升级</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">24小时内</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">P0</span></strong></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">确认 lockfile 中无遗留 vulnerable 版本</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">24小时内</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">P1</span></strong></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">审查 SSRF 暴露面，限制自托管 Node.js 出站访问</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">72小时内</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">P1</span></strong></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">将认证逻辑下沉至路由层，不依赖中间件</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">本迭代</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><strong style="color: rgb(72, 112, 172);"><span leaf="">P2</span></strong></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">监控 GitHub Advisory 后续披露（目前已有至少4轮迭代）</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">持续</span></section></td></tr></tbody></table>  
**重要提示**  
：React Server Components 自 2025年12月至今已出现至少4轮安全公告迭代，每轮 DoS 补丁后均有新攻击向量被发现。本次事件表明，**补丁不能一劳永逸，组织应建立针对 RSC 相关 CVE 的持续监控机制**  
。  
  
若您所在行业涉及 GDPR、等保2.0 或 PCI-DSS，从漏洞披露到 PoC 公开的时间窗口极短（约24小时），监管报告义务窗口期内发生的数据泄露将面临合规追责风险。  
# 图片版权 华盟网  
### 引用链接  
  
[1]  
next-16.2.4-pocs: https://github.com/dwisiswant0/next-16.2.4-pocs  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
