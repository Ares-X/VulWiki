---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Log4j SQL注入漏洞   
夜影实验室  锦行科技   2022-04-25 15:04  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruCV8nvZkwfFAoxs0Vzayiaia1ZB7QyTIIzhGvyhibO21sBmDPuQicBGzfAgJKVCnPYc7zlLOaDlibLiawaw/640?wx_fmt=gif "")  
  
  
**漏洞名称：**  
  
Apache Log4j SQL注入漏洞  
  
**影响范围：**  
  
Log4j v1.x  
  
**漏洞编号：**  
  
CVE-2022-23305  
  
**漏洞类型：**  
  
SQL注入  
  
**利用条件：**  
  
无  
  
**综合评价：**  
  
<利用难度>：低  
  
<威胁等级>：  
**高危**  
  
  
**#1**  
**漏洞描述**  
  
  
Apache Log4j是美国阿帕奇（Apache）基金会的一款基于Java的开源日志记录工具。  
  
Apache Log4j 存在SQL注入漏洞，该漏洞源于 Log4j 1.2.x 中的 JDBCAppender 接受 SQL 语句作为配置参数，其中要插入的值是来自 PatternLayout 的转换器。消息转换器 \\%m 可能总是包含在内。这允许攻击者通过将精心制作的字符串输入到记录的应用程序的输入字段或标题中来操纵 SQL，从而允许执行意外的 SQL 查询。请注意，此问题仅在专门配置为使用 JDBCAppender（不是默认设置）时才会影响 Log4j 1.x。从 2.0-beta8 版本开始，重新引入了 JDBCAppender，适当支持参数化 SQL 查询，并进一步自定义写入日志的列。Apache Log4j 1.2 已于 2015 年 8 月结束生命周期。用户应升级到 Log4j 2，因为它解决了以前版本中的许多其他问题。  
  
  
**#2 解决方案**  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
https://lists.apache.org/thread/pt6lh3pbsvxqlwlp4c5l798dv2hkc85y  
  
  
**#3 参考资料**  
  
  
https://security.netapp.com/advisory/ntap-20220217-0007/  
  
https://lists.apache.org/thread/pt6lh3pbsvxqlwlp4c5l798dv2hkc85y  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruD6rSnJpSL57NHjuX79JSjjyYviaibNeS3xmGzPfoict6VdnvyuYEq6JdjQqre3WkicWWU7hjpicS2ByibQ/640?wx_fmt=gif "")  
  
**推 荐 阅 读**  
  
  
  
  
[【漏洞预警】WSO2 API Manager安全漏洞](http://mp.weixin.qq.com/s?__biz=MzIxNTQxMjQyNg==&mid=2247489524&idx=1&sn=4d2a9c15924b23024fbdb266eb516e76&chksm=9799ec51a0ee6547bd28b8a6f7f367bb30df3172dbe322f57a88953a315c85975783cfc10a64&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警】Jira身份验证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzIxNTQxMjQyNg==&mid=2247489524&idx=2&sn=ab3f381c65ad078a6ed23ed15a647ec2&chksm=9799ec51a0ee654791261b6d1a91d50d580214c5f09f16a15c998f1df64c82656097f88747a8&scene=21#wechat_redirect)  
  
  
  
[服务能力再获认可！锦行科技圆满完成2021广交会网络安全保障工作！](http://mp.weixin.qq.com/s?__biz=MzIxNTQxMjQyNg==&mid=2247489512&idx=1&sn=387d768af67dd62361de49bcce63a93f&chksm=9799ec4da0ee655b9323d469ca2002712c0e6b79e63d95d8bb9fe1073b445372dc005fe7083a&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruBy67pKAiadAicicia5vPm2xla4zAiccf9wQm5dGGTWiaic61UXVZWCtnV8Vx2RNh2p2eHFnaSTJEhZ7LRxQ/640?wx_fmt=gif "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
