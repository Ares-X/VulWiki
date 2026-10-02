---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-39717"
identifier_role: "primary"
primary_identifiers: "CVE-2024-39717"
referenced_identifiers: ""
identifier_status: "unknown"
title: "“伏特台风”黑客利用Versa零日漏洞攻击美国服务商"
product: "Versa Director"
record_type: "advisory"
document_type: "攻击归因新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "管理员可上传图标；文列21.2.3/22.1.2/22.1.3→22.1.4，网络暴露/既有权限入口缺"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E2%80%9C%E4%BC%8F%E7%89%B9%E5%8F%B0%E9%A3%8E%E2%80%9D%E9%BB%91%E5%AE%A2%E5%88%A9%E7%94%A8Versa%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E%E6%94%BB%E5%87%BB%E7%BE%8E%E5%9B%BD%E6%9C%8D%E5%8A%A1%E5%95%86.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-59b769c2beb1906e96181148"
entity_id: "ve-59b769c2beb1906e96181148"
schema_version: "1"
---

# “伏特台风”黑客利用Versa零日漏洞攻击美国服务商

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Versa Director
- 文献类型：攻击归因新闻
- 版本、权限及部署边界：管理员可上传图标；文列21.2.3/22.1.2/22.1.3→22.1.4，网络暴露/既有权限入口缺
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 管理员权限前提前置，不能因零日标题记为匿名远程入侵；VersaMem是后植入恶意软件非漏洞本体
2. 前述国家组织归因与末尾百科断言勒索组织互相冲突且均无可点击原证据，应分别标来源说法/置信度，不下确定归因
3. 4美国+1其他公司、样本新加坡上传与先测试地区推断区分；VirusTotal零命中不证明不可检测
4. 仅来源名称无厂商/BlackLotus/新闻URL，需恢复原链接和各build补丁状态；补CVE元数据、删宣传

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 关键基础设施安全应急响应中心   2024-08-29 15:27  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iaz5iaQYxGogs6TibDytX0iaBjw9aSGGiaPiasKSibvgPpn8dMjqnOQNOZR47yALCsnkO58HWYlsmPDsCPQAa8DlwQLEQ/640?wx_fmt=png&from=appmsg "")  
  
8月27日，外媒BleepingComputer报道，黑客组织Volt Typhoon（伏特台风）利用Versa Director零日漏洞上传自定义Webshell，窃取凭据并破坏美国公司网络。  
  
本周周一8月26日，Versa公司宣布他们修复了一个被追踪为CVE-2024-39717的高风险漏洞。这个漏洞被未具名的民族国家黑客组织至少利用过一次。  
  
该漏洞存在于上传自定义图标Versa Director GUI的功能中。漏洞允许具有管理员权限的威胁行为者上传伪装成PNG图像的恶意Java文件，然后远程执行这些文件。  
  
Versa表示Director版本21.2.3、22.1.2和22.1.3受到该漏洞的影响。升级到最新版本22.1.4将修复漏洞，管理员应查看供应商的系统强化要求和防火墙指南。  
  
在最近的事件中，Volt Typhoon利用Versa Director中的漏洞上传了一个名为 VersaMem的复杂、定制的Webshell。  
  
此WebShell用于拦截和收集凭据，以及在受感染的服务器上执行任意恶意代码，同时避免被发现。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/QmbJGbR2j6zggdhuQFn2ibDcvfdhOPR3UOJxuaTsrclF7St4Q2FZiaB4JicbBdCwZVgoc69MlLHHDpxFpOBydahYg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Versa Directo上的Volt Typhoon攻击流程  
  
来源：Lumen的Black Lotus Labs  
  
据报道，Volt Typhoon最新活动目标包括4家美国公司和1家非美国公司，他们属于互联网服务提供商、托管服务提供商和信息技术领域企业。  
  
Lumen的Black Lotus Labs研究人员在6月初发现了Versa零日漏洞。  
最初版本是从新加坡上传到  
VirusTotal  
病毒库的。  
这个上传时间大约比在美国最早发现Versa Director服务器漏洞事件早了五天。  
  
“我们怀疑威胁行为者可能在对美国目标发起攻击之前，先在其他地区测试了他们的攻击手段。  
“该公司补充道。  
当前恶意软件版本在VirusTotal上没有被检测出来。  
  
关于伏特台风，百度百科内容：  
“伏特台风”（Volt Typhoon），由微软公司根据其黑客组织命名规则命名而来，真实面目是国际勒索软件组织，来自“伏特台风”的恶意程序样本并未表现出明确的国家背景黑客组织行为特征，而是与“暗黑力量”勒索病毒等网络犯罪团伙的关联程度明显。  
  
  
  
  
原文来源：E安全  
  
“投稿联系方式：sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaz5iaQYxGogvC8qicuLNlkT5ibJnwu1leQiabRVqFk4Sb3q1fqrDhicLBNAqVY4REuTetY1zBYuUdic0nVhZR4FHpAfg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
