---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "JieLink+智能终端操作平台 DeleteIpPool SQL注入漏洞"
product: "JieLink+智能终端管理Web平台"
record_type: "vulnerability"
document_type: "截图主导SQL注入简报"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "声称DeleteIpPool无需认证；版本、参数、数据库权限未给"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/JieLink/JieLink%2B%E6%99%BA%E8%83%BD%E7%BB%88%E7%AB%AF%E6%93%8D%E4%BD%9C%E5%B9%B3%E5%8F%B0%20DeleteIpPool%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-c3a011104c4a03fde130e024"
entity_id: "ve-c3a011104c4a03fde130e024"
schema_version: "1"
---

# JieLink+智能终端操作平台 DeleteIpPool SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：JieLink+智能终端管理Web平台
- 文献类型：截图主导SQL注入简报
- 版本、权限及部署边界：声称DeleteIpPool无需认证；版本、参数、数据库权限未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 只有截图复现/sqlmap及检测工具图，关键请求和差异/结果不在正文，无法文本确认SQL注入
2. 高数据库权限下写木马是条件后果，不能当该接口已经证明系统接管；Delete接口也须标测试可能修改数据
3. 没有厂商、版本、修复公告/原公开来源，升级安全版无可执行版本目标
4. quake语法title=与favicon冒号混用需按平台核对；固定favicon只是资产线索
5. 应归Web管理平台而非桌面；付费圈与装饰图片占主体，清理重复营销

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

Superhero  Nday Poc   2025-07-06 03:11  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCkYN4sZibCVo6EFo0N9b7Kib4I4N6j6Y10tynLOdgov9ibUmaNwW5yeoCbQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCkhic5lbbPcpxTLtLccZ04WhwDotW7g2b3zBgZeS5uvFH4dxf0tj0Rutw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCk524CiapZejYicic1Hf8LPt8qR893A3IP38J3NMmskDZjyqNkShewpibEfA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
内容仅用于学习交流自查使用，由于传播、利用本公众号所提供的  
POC  
信息及  
POC对应脚本  
而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号Nday Poc及作者不为此承担任何责任，一旦造成后果请自行承担！  
  
  
**01**  
  
**漏洞概述**  
  
  
由于JieLink+ 智能终端操作平台 DeleteIpPool接口处未对用户的输入进行过滤和校验，未经身份验证的攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。  
  
**02******  
  
**搜索引擎**  
  
  
360quake:  
```
title="JieLink" AND (favicon: "2f809c4759399cae458a29f24490a114")
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9E4sb3ocydrJP5fRzMTf2jkdVsjCKFGqibb8rVUbDwBk3B6yHmyjb1MgA/640?wx_fmt=png&from=appmsg "")  
  
  
**03******  
  
**漏洞复现**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9Eu0xwlKxd3cBoGHJ6pxdIv0e3J8D0ibqicqzOnRGq8LsT7GbKxCFd8ZAQ/640?wx_fmt=png&from=appmsg "")  
  
sqlmap验证  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9EA4m7zBpOamxibVb1qYxat5MHQor5o6NnCn5IzKl6dOAjiaIxIIG34gow/640?wx_fmt=png&from=appmsg "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9E5ttHMwcCsAW3BK6EOBsgzOeGyOXjXnCchAlRhiaibV0DbD9AibyJxrsow/640?wx_fmt=png&from=appmsg "")  
  
afrog  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9EH89Mp5mFm4h7PcOY6DQrAiaSoQoiaW9I42UjtXpY7UxGFhQMXQyTLjbQ/640?wx_fmt=png&from=appmsg "")  
  
xray  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9EIu1avBKWwKB05qic5k2mLTk1oXkN666czp1V3F9zJdATfMJKiaNV6fNA/640?wx_fmt=png&from=appmsg "")  
  
  
**05******  
  
**修复建议**  
  
  
1、关闭互联网暴露面或接口设置访问权限  
  
2、升级至安全版本  
  
  
**06******  
  
**内部圈子介绍**  
  
  
【Nday漏洞实战圈】🛠️   
  
专注公开1day/Nday漏洞复现  
 · 工具链适配支持  
  
 ✧━━━━━━━━━━━━━━━━✧   
  
🔍 资源内容  
  
 ▫️ 整合全网公开  
1day/Nday  
漏洞POC详情  
  
 ▫️ 适配Xray/Afrog/Nuclei检测脚本  
  
 ▫️ 支持内置与自定义POC目录混合扫描   
  
🔄 更新计划   
  
▫️ 每周新增7-10个实用POC（来源公开平台）   
  
▫️ 所有脚本经过基础测试，降低调试成本   
  
🎯 适用场景   
  
▫️ 企业漏洞自查 ▫️ 渗透测试 ▫️ 红蓝对抗   
▫️ 安全运维  
  
✧━━━━━━━━━━━━━━━━✧   
  
⚠️ 声明：仅限合法授权测试，严禁违规使用！  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwLtcG9Ik9geJ487AW19XX9EwDbgrktvywgiaJFXrosvDicyudia3Ekrnn5YVfcDIE1CqJFH9GXm5Eozg/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
