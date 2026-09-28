---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌修复了两个在攻击中被利用的Chrome零日漏洞  
 Ots安全   2026-03-15 04:03  
  
**威胁简报**  
  
  
**恶意软件**  
  
  
**漏洞攻击**  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/zNsFJyIuL0FZ4JhcVfv826mc5OzkCoh5M9JGoMiau3jIvESesIa0ACKeAnzxHtTAlOUpG3P5RjGJejwMLCciaGCiajmyk4cupw5eCZhXrw82Ao/640?wx_fmt=webp&from=appmsg "")  
  
  
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
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/zNsFJyIuL0FyMhz3P4Em0hibfUWQJEYxa2ibwibvaM93L9bzsgVnUicibWx6f6TG7S0Myd6SjRibI7F1t50DUzbpQay0t05YwzmZ3ZFXiavTVyzFzw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
公众号内容都来自国外平台-所有文章可通过点击阅读原文到达原文地址或参考地址  
  
排版 编辑 | Ots 小安   
  
采集 翻译 | Ots Ai牛马  
  
公众号 |   
AnQuan7 (Ots安全)  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
