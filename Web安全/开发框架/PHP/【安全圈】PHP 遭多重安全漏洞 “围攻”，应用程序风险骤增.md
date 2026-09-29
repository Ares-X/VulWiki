---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】PHP 遭多重安全漏洞 “围攻”，应用程序风险骤增   
 安全圈   2025-03-18 19:02  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
![CVE-2024-1874 PHP Vulnerabilities](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljJ8ibSlAvEEWEHwFwpUn3XxV4JuaDna1oB9w50G1ibpZvicPzqFuRX7fgHIlcnsWywlSSEXDul2QdEg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
PHP 编程语言中被发现存在一系列安全漏洞，这可能使 Web 应用程序面临一系列攻击风险。这些漏洞影响到 PHP 的 HTTP 流包装器的多个方面，带来从信息泄露到拒绝服务等各种风险。  
  
一个被追踪为 CVE – 2025 – 1861 的关键问题，涉及 HTTP 流包装器对重定向位置的截断。“当前，由于位置缓冲区大小限制为 1024 字节，导致位置值的大小受限”，这与 RFC 9110 建议的 8000 字节相差甚远。这种限制可能导致 URI 中关键信息的遗漏，甚至重定向到非预期的资源。在严重情况下，“如果截断的 URL 导致错误，甚至可能导致远程站点的拒绝服务”。  
  
另一个重大漏洞 CVE – 2025 – 1734，关乎 HTTP 流包装器处理无效名称头的方式。该问题的产生是因为没有冒号的头会无错误返回，并且头名称中（冒号前）包含空格的头也不会被标记为无效。当应用程序解析响应头时，这可能引发问题。安全公告警告称：“在这种情况下，某种形式的请求走私是可能的。”  
  
CVE – 2025 – 1217 凸显了 HTTP 流包装器头解析器中的一个缺陷，即折叠头未得到正确处理。解析器错误地将以空白字符开头的头行解释为新的头，而不是前一个头的延续。这可能导致错误的 MIME 类型报告以及响应解析错误，尤其是在重定向后，可能使应用程序错误地解释响应。  
  
libxml 流也存在一个漏洞 CVE – 2025 – 1219，在请求重定向资源时会使用错误的内容类型头。当 HTTP 流包装器跟随重定向时，它不会清除捕获的头列表，导致多个请求的头存储在一起。然后，php_libxml_input_buffer_create_filename () 函数会扫描这个合并的头数组，并可能使用不属于最终响应的内容类型头，这可能导致错误的解析和安全绕过。  
  
最后，CVE – 2025 – 1736 描述了 HTTP 流包装器头检查中的一个漏洞。头检查没有正确验证 \r 的存在，如果头值中仅使用 \n，可能会导致异常行为。例如，如果用户在未经适当检查的情况下提供此值，若在授权头前注入换行符，可能会禁止发送授权头。安全公告指出：“这可能会影响结果，潜在地导致拒绝服务或一些意外问题。” 这个问题对其他头，如用户代理头也有影响。  
  
这些漏洞影响 PHP 8.1.32、8.2.28、8.3.18 和 8.4.5 之前的版本。目前已提供补丁版本：8.1.32、8.2.28、8.3.19 和 8.4.5。强烈建议 PHP 开发者更新到这些补丁版本，以降低这些安全漏洞带来的风险。  
  
  
  END    
  
  
阅读推荐  
  
  
[【安全圈】 DeepSeek R1 可被操纵用来创建恶意软件](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652068535&idx=1&sn=63954c2e32a50239182fa1bc7bb4f4d9&scene=21#wechat_redirect)  
  
  
  
[【安全圈】AI 成为网络犯罪分子高速执行攻击的强大工具](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652068535&idx=2&sn=298c1acc1123e932ed63aac7d0f0abcc&scene=21#wechat_redirect)  
  
  
  
[【安全圈】100 多家汽车经销商遭 ClickFix 网页攻击，导致 SectopRAT 恶意软件安装](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652068535&idx=3&sn=d89cd6c7f38d627e8162a9e0f4f0e90d&scene=21#wechat_redirect)  
  
  
  
[](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652068401&idx=1&sn=5600b75d725f6e90a4cbfddf6a7e10cc&scene=21#wechat_redirect)  
[【安全圈】315晚会曝光偷信息“黑洞”，平台一天处理百亿条数据](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652068519&idx=1&sn=caf7880c3563cbc8019913736627788b&scene=21#wechat_redirect)  
  
  
  
  
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
