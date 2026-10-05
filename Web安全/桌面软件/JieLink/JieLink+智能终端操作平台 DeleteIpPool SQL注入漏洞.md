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
  
  
由于JieLink+ 智能终端操作平台 DeleteIpPool接口处未对用户的输入进行过滤和校验，未经身份验证的攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。  
  
**02******  
  
**搜索引擎**  
  
  
360quake:  
```
title="JieLink" AND (favicon: "2f809c4759399cae458a29f24490a114")
```  
  
![](../../.resource/remote/7adc4fda99f01c33e5c1b971d21512f11384daa6e226bfe36cbd2d7bd02f21e1.png "")  
  
  
**03******  
  
**漏洞复现**  
  
![](../../.resource/remote/ce11245e5d79f3ce7043c963ad5f3e4c215ba5a16adf9f6aaabee49caef22d04.png "")  
  
sqlmap验证  
  
![](../../.resource/remote/1cfb8c1cc203fc2d6e02329e39d555306c561a8f15f5950cceff3a9856da81d0.png "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](../../.resource/remote/577d1141135ef4f18bb62ff826ab7d3d18313f89beb7db6d97a180cd04a066c8.png "")  
  
afrog  
  
![](../../.resource/remote/ba25edd213b9674bb0cd646f4b47af55ddd4d57632f858e2cfc983c300f3fbff.png "")  
  
xray  
  
![](../../.resource/remote/1b965208f8566540e08fe48e71ad58736180f683943d12c50ef566aa07cbe0b2.png "")  
  
  
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
  
![图片](../../.resource/remote/ca791b5634b95100d63d916c35251347a5778c59d3c54fa82150874b5188e034.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
