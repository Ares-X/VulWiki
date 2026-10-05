---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-3909;CVE-2026-3910"
identifier_role: "primary"
primary_identifiers: "CVE-2026-3909;CVE-2026-3910"
referenced_identifiers: "CVE-2026-2441"
identifier_status: "unknown"
title: "谷歌修复了两个在攻击中被利用的Chrome零日漏洞"
product: "Chrome Skia/V8"
record_type: "advisory"
document_type: "两零日在野利用更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称Windows/Linux146.0.7680.75、macOS .76；攻击具体细节未披露"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/%E8%B0%B7%E6%AD%8C%E4%BF%AE%E5%A4%8D%E4%BA%86%E4%B8%A4%E4%B8%AA%E5%9C%A8%E6%94%BB%E5%87%BB%E4%B8%AD%E8%A2%AB%E5%88%A9%E7%94%A8%E7%9A%84Chrome%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-674565a003253386880c0286"
entity_id: "ve-674565a003253386880c0286"
schema_version: "1"
---

# 谷歌修复了两个在攻击中被利用的Chrome零日漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Chrome Skia/V8
- 文献类型：两零日在野利用更新新闻
- 版本、权限及部署边界：文称Windows/Linux146.0.7680.75、macOS .76；攻击具体细节未披露
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 两主CVE元数据空，2441仅年度背景；2025八个和2026第二三计数须时间限定
2. Google发现与用户报告后两天翻译主语不清；在网络存在利用程序不应脱离原公告解释为普通公开PoC
3. 仅凭Skia OOB写/V8不恰当实现无法确定完整RCE或沙箱逃逸链，未知前置条件应列待核验
4. 声明点击阅读原文但Markdown未保留链接，BleepingComputer/Google仅名字不可追溯

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 Ots安全   2026-03-15 04:03  
  
**威胁简报**  
  
  
**恶意软件**  
  
  
**漏洞攻击**  
  
![](../../.resource/remote/f074c8dce012990c3b5ef3339f16d861f4959f637a8e9ea575d48de16e4ea8f4.jpg "")  
  
  
谷歌发布了紧急安全更新，以修复Chrome浏览器中两个在零日攻击中被利用的高危漏洞。  
  
谷歌在周四发布的一份安全公告中表示：“谷歌已经意识到 CVE-2026-3909 和 CVE-2026-3910 的漏洞利用程序已经存在于网络上。”  
  
第一个零日漏洞（CVE-2026-3909）源于Skia 中的越界写入漏洞，Skia 是一个开源的 2D 图形库，负责渲染网页内容和用户界面元素，攻击者可以利用该漏洞使网页浏览器崩溃，甚至执行代码。  
  
第二个漏洞（CVE-2026-3910）被描述为 V8 JavaScript 和 WebAssembly 引擎中不恰当的实现漏洞。  
  
Google 发现了这两个安全漏洞，并在用户报告后的两天内对其进行了修复，针对稳定桌面频道的用户推出了新版本，并向 Windows (146.0.7680.75)、macOS (146.0.7680.76) 和 Linux 系统 (146.0.7680.75) 推出了新版本。  
  
虽然谷歌表示，此次带外更新可能需要几天或几周的时间才能推送给所有用户，但 BleepingComputer 今天早些时候检查更新时，该更新已立即可用。  
  
如果您不想手动更新浏览器，也可以设置浏览器自动检查更新并在下次启动时安装。  
  
尽管谷歌发现了攻击者正在利用这一零日漏洞进行攻击的证据，但该公司并未透露有关这些事件的更多细节。  
  
“在大多数用户都获得修复程序之前，我们可能会限制对错误详情和链接的访问。如果错误存在于其他项目同样依赖但尚未修复的第三方库中，我们也将继续保留这些限制，”声明中指出。  
  
这是自 2026 年初以来修复的第二个和第三个被积极利用的 Chrome 零日漏洞。第一个漏洞被追踪为 CVE-2026-2441，被描述为 CSSFontFeatureValuesMap（Chrome 对 CSS 字体特征值的实现）中的迭代器失效错误，已于 2 月中旬得到解决。  
  
去年，谷歌修复了总共8 个在实际环境中被利用的零日漏洞，其中许多漏洞是由谷歌威胁分析小组 (TAG) 报告的，该小组由安全研究人员组成，以追踪和识别间谍软件攻击中被利用的零日漏洞而闻名。  
  
周四，谷歌还透露，到 2025 年，它已向 747 位通过其漏洞奖励计划 (VRP) 报告安全漏洞的安全研究人员支付了超过 1700 万美元。  
  
**END**  
  
  
![](../../.resource/remote/1f17faf71551225e041e505881a367a59f7a24d3aa6362c013322aaeb7efe4d9.jpg "")  
  
  
公众号内容都来自国外平台-所有文章可通过点击阅读原文到达原文地址或参考地址  
  
排版 编辑 | Ots 小安   
  
采集 翻译 | Ots Ai牛马  
  
公众号 |   
AnQuan7 (Ots安全)  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
