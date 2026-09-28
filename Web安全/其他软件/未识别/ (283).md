---
cve: "CVE-2025-47176"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Outlook 高危漏洞曝光：无需用户操作即可远程执行代码，微软紧急应对 CVE-2025-47176  
 安全圈   2025-06-11 11:02  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
outlook  
  
  
微软邮件客户端 Outlook 曝出重大安全漏洞，编号为 CVE-2025-47176，公布于 2025 年 6 月 10 日，CVSS 评分为 7.8，危害级别“重要”。该漏洞允许攻击者在目标系统上远程执行任意代码，尽管从技术上看它属于“本地漏洞”，但一旦被触发就不再需要用户任何操作，影响极为严重。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliaBY7c5bgHuHgyQ5TBHbO76PfaiciafVsTGTGH8XwYLYheLCZwFbCA2zABnF0Hb3Jz3YJaxIIDWWEiag/640?wx_fmt=png&from=appmsg "")  
  
漏洞的本质是路径遍历问题，攻击者可利用 …/…//  
 等目录穿越序列绕过路径限制，在已认证用户权限下执行本地恶意代码。由于无需管理员权限即可触发，这显著扩大了攻击面。微软指出，虽然攻击手段基于本地操作，但“远程代码执行”描述的是攻击者位置远程，而非执行过程，因此仍视为 RCE（远程代码执行）漏洞。  
  
此次漏洞影响了 Microsoft Outlook 的三个核心安全属性：保密性、完整性与可用性，三者在 CVSS 评估中均被标为“高”。成功利用该漏洞的攻击者可访问敏感数据、修改系统配置，甚至使设备瘫痪。  
  
该漏洞由 Morphisec 安全研究人员 Shmuel Uzan、Michael Gorelik 与 Arnold Osipov 联合发现并通过协调披露流程上报微软。攻击机制依赖于目录遍历技术，这是攻击者实现任意代码执行的常用手段。  
  
值得注意的是，微软已确认此次漏洞不涉及“预览窗格”，因此无法通过 Outlook 的邮件预览功能进行被动触发。不过，漏洞的交互需求为“无用户交互”，意味着一旦达到初始条件，用户无需任何进一步动作，攻击即可完成。  
  
目前，微软尚未发布 Microsoft 365 对应版本的安全更新，仅表示补丁将“尽快”推出，并承诺届时会更新 CVE 页面告知用户。由于尚无修复补丁，微软建议组织采取临时防护措施：  
- 严密监控 Outlook 应用行为；  
  
- 加强访问控制策略；  
  
- 为未来补丁的快速部署做好准备。  
  
虽然目前暂无活跃利用的迹象，但鉴于其权限要求低、影响范围广，CVE-2025-47176 被认为是所有使用 Microsoft Outlook 的企业和机构必须立刻关注的重要安全问题。  
  
  
  END    
  
  
阅读推荐  
  
  
[【安全圈】台湾当局豢养五大黑客组织频繁攻击大陆，技术粗陋被专家斥为“三流水准”](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070106&idx=1&sn=783480ff095d05ff3e829f44520efd42&scene=21#wechat_redirect)  
  
  
  
[【安全圈】德国重罚沃达丰5100万美元：数据隐私和安全双双失守！](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070106&idx=2&sn=be4e3b2f754cb7fc6af9f682f86893e7&scene=21#wechat_redirect)  
  
  
  
[【安全圈】印度联合日本执法部门突袭19个技术支持诈骗中心，六名嫌疑人落网](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070106&idx=3&sn=48444e46199051821c98552b1f37c81d&scene=21#wechat_redirect)  
  
  
  
[【安全圈】npm发现系统级后门包，可一键抹除服务器数据](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070106&idx=4&sn=43dbc77f9c39dad483ab22e752d5e647&scene=21#wechat_redirect)  
  
  
  
  
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
