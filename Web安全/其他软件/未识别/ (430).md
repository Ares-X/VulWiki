---
cve: "CVE-2026-2025"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【1 day 在野】WordPressMailMint-CVE-2026-2025-信息泄露 附Payload  
阿伟
                    阿伟  船山信安   2026-04-10 04:20  
  
**免责声明**  
  
由于传播、利用本公众号船山信安所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号  
船山信安  
及作者不为此承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉。谢谢！  
  
**一、漏洞描述**  
  
**WordPress MailMint 插件是一款集成邮件营销、用户订阅、邮件发送、数据统计与客户线索管理于一体的 WordPress 生态营销管理插件。该插件存在 CVE-2026-2025 信息泄露漏洞，未对接口访问权限及请求参数进行严格校验与权限控制，攻击者可构造恶意请求直接获取系统敏感数据，甚至可利用漏洞实现服务器权限控制，造成数据泄露、服务器被入侵等安全风险。**  
  
**二、影响版本**  
  
**WordPress Mint Mail <1.19.5**  
  
**三、360Quake 语法**  
  
**body="/wp-content/plugins/mail-mint/"**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/dscLuiaicVquMPciaXf9IRkgjny4Eiajp8KCzw63XttT004tcWtrIKibNia8Ko2wTrhRyIW01LoIMIq8mpWEVV72Cc8Kb2ebjszzmdthx4KdYTBDw/640?wx_fmt=png&from=appmsg "")  
  
**四、漏洞复现**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/dscLuiaicVquNh7CwTYczODaVLSXrZ4Uh6Tu6VK8BJPyNUqWDDbXtshyGXfI4xRU3Wjm6n4nXoBuD1rGn6MSBJ7xn5NgHkoPobv5mk4rMvWrY/640?wx_fmt=png&from=appmsg "")  
  
**五、修复建议**  
  
**升级插件至官方最新安全版本并应用对应安全补丁、完善接口身份认证与权限校验机制、对用户请求及接口调用进行严格权限控制与参数校验、启用安全防护策略并开展全面安全审计、从源头消除安全隐患。**  
  
**六、payload获取**  
  
**后台回复20260410获取Payload**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
