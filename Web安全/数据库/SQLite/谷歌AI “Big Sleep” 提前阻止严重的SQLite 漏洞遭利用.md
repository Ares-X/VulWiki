---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌AI “Big Sleep” 提前阻止严重的SQLite 漏洞遭利用  
Ravie Lakshmanan  代码卫士   2025-07-18 10:35  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**本周二，谷歌披露称其基于LLM的漏洞发现框架 Big Sleep，赶在黑客在野利用之前发现了SQLite 开源数据库引擎中的一个高危内存损坏漏洞CVE-2025-6965（CVSS评分7.2）。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMRuqupibSSLZFWiacExROLJicCraFnJRQzIf3t7Wf5NqYic6z6saibAzuu4xz2WzZZ2BmxKwgqIGovwung/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞影响SQLite 3.50.2之前的所有版本。Big Sleep 是由谷歌在去年发布的一款AI代理，是DeepMind 和 Google Project Zero 团队协作成果的一部分。SQLite 项目维护人员在一份安全通告中提到，“攻击者如果能够在应用程序中注入任意SQL语句，则可能导致整数溢出，进而导致读取数据末尾越界。”  
  
谷歌提到，CVE-2025-6965是一个严重漏洞，“仅有威胁人员知晓，存在遭利用的风险”，但并未透露这些威胁人员的身份。谷歌和Alphabet 的全球事务总裁 Kent Walker提到，“通过组合威胁情报和 Big Sleep，谷歌实际能够预测一个漏洞是否将被利用，而我们能够提前阻止。我们认为这是AI代理用于直接阻止在野利用漏洞行为的首个案例。”  
  
谷歌还提到，“GTIG 能够识别出表明威胁人员正在利用的0day，但无法立即确定具体的漏洞的工件。有限的指标也一并被传送给零日倡议的谷歌其它团队成员，他们利用 Big Sleep 隔离攻击者正准备在攻击中利用的漏洞。”  
  
2024年10月，Big Sleep 发现了 SQLite 中的另外一个漏洞。它是一个栈缓冲区下溢漏洞，本可用于导致崩溃或任意代码执行后果。与此同时，谷歌还发布白皮书以构建安全的AI代理，确保它们具有定义明确的人类控制器，它们的能力得到仔细限制以免造成恶意操作和敏感数据泄露，以及它们的措施是可观察的以及透明的。  
  
谷歌公司的研究员 Santiago (Sal) Díaz、Christoph Kern 和 Kara Olive 表示，“传统的系统安全方法（如通过典型的软件执行代理操作的限制）缺乏用途广泛的代理所需的上下文感知能力，并可能过度限制了实用性。相反，完全基于推理的安全方法（仅依靠AI模型的判断）是不充分的，因为当前的 LLMs 仍然易受操纵如提示注入等，而且无法提供足够健壮的保障。”  
  
为了缓解与代理安全相关的主要风险，谷歌表示已采取混合的纵深防御方式，结合传统的、确定的控制和动态的、基于推理的防护措施。这一理念是为了围绕代理的运行环境创建健壮边界，从而大幅缓解有害后果的风险，特别是因提示注入导致的恶意操作。  
  
谷歌表示，“这种纵深防御方式依赖于强制实施的边界，这些边界围绕AI代理的操作环境，以阻止潜在的最糟糕场景，即使代理的内部推理流程遭攻陷或遭复杂攻击或意外输入的干扰或误导时，这些边界也可当作防御措施。这种多层方式表明单纯基于规则的系统或单纯基于AI的判断都不足以解决问题。”  
  
****  
开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[从Naptime到Big Sleep：通过大语言模型捕获真实代码中的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521381&idx=1&sn=dda99ba77206503fe0e0b1c0e5a0a35b&scene=21#wechat_redirect)  
  
  
[Microsoft 365 Copilot 中存在零点击AI数据泄露漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523270&idx=1&sn=34d30246787005440f76867606c6259c&scene=21#wechat_redirect)  
  
  
[看我如何通过 OpenAI o3 挖到 Linux 内核远程 0day](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523149&idx=1&sn=0298267a08369cc3ea9bdbdec81eb788&scene=21#wechat_redirect)  
  
  
[GitLab Duo 漏洞可导致攻击者通过隐藏的提示劫持AI响应](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523124&idx=2&sn=11426f6aaac01c747218a552ac6e5129&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/07/google-ai-big-sleep-stops-exploitation.html  
  
  
题图：  
Pixabay Licen  
se  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
