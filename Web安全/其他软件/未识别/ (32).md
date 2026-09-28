---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】D-Link 多款老旧 DSL 网关路由器被曝命令注入 0day，已遭野外利用  
 安全圈   2026-01-07 11:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
出口管制  
  
  
安全公司 VulnCheck 与 Shadowserver 基金会发现，攻击者正在利用一个编号为 CVE-2026-0625 的命令注入漏洞，对早已停保的 D-Link DSL 路由器发起攻击。该漏洞位于 dnscfg.cgi 接口，因 CGI 库输入过滤不当，允许未认证攻击者通过 DNS 配置参数注入并执行任意 Shell 命令，实现远程代码执行。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljCiaBs266N3yUHtjyakZzFbpLMnzpeRPbcLSLll48QGr6lnjC0ECzRYfyVicvoH85jEEibOsv8Ag41A/640?wx_fmt=png&from=appmsg "")  
  
时间线  
- 12 月 15 日：Shadowserver 蜜罐捕获到首次利用尝试；VulnCheck 随后向 D-Link 报告。  
  
- 利用手法尚未公开披露，VulnCheck 表示“目前未见公开 PoC”。  
  
已确认受影响型号（均 2020 年起 EoL，不再提供补丁）  
- DSL-526B ≤ 2.01  
  
- DSL-2640B ≤ 1.07  
  
- DSL-2740R < 1.17  
  
- DSL-2780B ≤ 1.01.14  
  
D-Link 仍在排查其他固件版本，但由于历代固件实现差异大，暂无远程型号识别方案，只能通过固件提取确认。  
  
利用场景 大多数家庭路由默认仅在内网开放 CGI 管理接口，因此实际利用需：  
1. 受害者浏览器访问恶意网页（CSRF/JS 攻击）；  
  
1. 设备被手动开启远程管理并暴露于公网。  
  
缓解措施  
- 立即停用并更换仍在运行的上述 EoL 设备；  
  
- 若暂时无法替换，应关闭远程管理、降低为仅本地访问，并置于隔离或访客网段；  
  
- 保持固件为官方最后可用版本，启用最强安全策略。  
D-Link 提醒：停保产品不再获得任何固件更新、漏洞补丁或技术支持。  
  
 END   
  
  
阅读推荐  
  
  
[【安全圈】百度网盘出 Bug 开屏页显示小说内容，百度回应不是安全问题是苹果商店更新提醒功能显示错](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652073585&idx=1&sn=0a3f98f5c7dcbd74e3877c0b769585cd&scene=21#wechat_redirect)  
  
  
  
[【安全圈】俄罗斯关联黑客滥用 Viber 攻击乌克兰军方和政府机构](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652073585&idx=2&sn=f5a6587ade873e9799a66d967838f87b&scene=21#wechat_redirect)  
  
  
  
[【安全圈】WhatsApp 漏洞泄露用户元数据，包含设备操作系统信息](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652073585&idx=3&sn=cc23d3a13250549d9a85b4399df1b886&scene=21#wechat_redirect)  
  
  
  
[【安全圈】威胁行为者声称泄露 NordVPN Salesforce 数据库及源代码](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652073585&idx=4&sn=ce36b82edc5a856930b413e719701e26&scene=21#wechat_redirect)  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
