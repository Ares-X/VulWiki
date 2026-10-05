---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "IM即时通讯系统 preview.php 任意文件上传漏洞"
product: "IM即时通讯系统Web端preview.php"
record_type: "vulnerability"
document_type: "截图主导漏洞简报"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "声称未认证上传，版本/厂商/服务端解析和保存路径未给"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/IM/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF%E7%B3%BB%E7%BB%9F%20preview.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-72e898a74fac6bf3f61f207c"
entity_id: "ve-72e898a74fac6bf3f61f207c"
schema_version: "1"
---

# IM即时通讯系统 preview.php 任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：IM即时通讯系统Web端preview.php
- 文献类型：截图主导漏洞简报
- 版本、权限及部署边界：声称未认证上传，版本/厂商/服务端解析和保存路径未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. IM是泛称，需厂商和产品身份；实际PHP Web服务非桌面IM客户端
2. 关键上传请求、参数、返回路径、执行验证及Nuclei/Afrog模板全部仅截图，正文无可复核PoC文本，图片未视检
3. 从上传到任意代码/整个服务器控制需扩展名、Web可访问与解析权限链，未提供
4. FOFA第二个裸字符串匹配字段不明确，特征只能资产线索不是受影响证明
5. 没有原始公开来源/受影响和安全版本，正文大段付费圈推广且声称脚本测试无证据

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

Superhero
                    Superhero  Nday Poc   2026-01-27 03:05  
  
![图片](../../.resource/remote/a186c4f5d9d52347540c4cbb93e8961b5ba9c0dd7f4fd061d48211661876676f.webp "")  
  
![图片](../../.resource/remote/77be41dad9935140a4007bdfffbddf41fc1a986a3fecd8c99e21852085b04197.webp "")  
  
![图片](../../.resource/remote/44ad08ffbb51946186bc46c860da341a77d976872c15eb51f56d078afe49905c.webp "")  
  
内容仅用于学习交流自查使用，由于传播、利用本公众号所提供的  
POC  
信息及  
POC对应脚本  
而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号Nday Poc及作者不为此承担任何责任，一旦造成后果请自行承担！  
  
  
**01**  
  
**漏洞概述**  
  
  
IM 即时通讯系统 preview.php 接口存在任意文件上传漏洞，未经身份验证的攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。  
**02******  
  
**搜索引擎**  
  
  
fofa:  
```
body="/superloginAction.html" || "im.smiaoshen.com"
```  
  
![](../../.resource/remote/6667e1686f027b148d83ae7b1539c47ad202231aced58aca265103dd6c9b483a.png "")  
  
  
**03******  
  
**漏洞复现**  
  
![](../../.resource/remote/c8012d495a24be69c16995f0d0ba89da39e64af0cce14a18f890e76c33cd6bcc.png "")  
  
![](../../.resource/remote/8b74a577a92caf45cf7aebf3772bfa7b1e2cd3b0ac73baae104feac56d8c9695.png "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](../../.resource/remote/f490a1103e3cd05151180431d6a30a5e0c6138a26f0d577d0e2831032ef5ea88.png "")  
  
afrog  
  
![](../../.resource/remote/7480e75bf11b81acc579fadbaeeaeada15069afcae107a6fc31fb6e7e142a5fe.png "")  
  
  
**05******  
  
**修复建议**  
  
  
1、关闭互联网暴露面或接口设置访问权限  
  
2、升级至安全版本  
  
  
**06******  
  
**内部圈子介绍**  
  
### 【Nday漏洞实战圈】🛠️  
  
专注公开1day/Nday漏洞复现 · 工具链适配支持  
  
✧━━━━━━━━━━━━━━━━✧  
  
🔍 **资源内容**  
  
▫️ 整合全网公开1day/Nday漏洞POC详情  
  
▫️ 适配Afrog/Nuclei检测脚本  
  
▫️ 支持内置与自定义POC目录混合扫描  
  
🔄 **更新计划**  
  
▫️ 每周新增7-10个实用POC（来源公开平台）  
  
▫️ 所有脚本经过基础测试，降低调试成本  
  
🎯 **适用场景**  
  
▫️ 企业漏洞自查 ▫️ 渗透测试 ▫️ 红蓝对抗 ▫️ 安全运维  
  
✧━━━━━━━━━━━━━━━━✧  
  
⚠️ **重要声明**  
  
▫️  
仅限合法授权测试，严禁违规使用  
  
**▫️虚拟资源服务，购买后不接受任何形式退款**  
  
▫️  
付款  
前请评估需求，慎重考虑  
  
![图片](../../.resource/remote/b4c7fba8cda6176a6bc46689efdbeffb0b476edeec7da4cf98a7e42fd371526b.webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
