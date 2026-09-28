---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】多个僵尸网络利用一年前的 TP-Link 漏洞进行路由器攻击   
 安全圈   2024-04-20 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
漏洞攻击  
  
  
目前发现至少有六种不同的僵尸网络恶意软件正在利用去年命令注入安全问题影响的 TP-Link Archer AX21 (AX1800) 路由器。该缺陷编号为 CVE-2023-1389，是可通过 TP-Link Archer AX21 Web 管理界面访问的区域设置 API 中的高严重性未经身份验证的命令注入问题。  
  
研究人员于 2023 年 1 月发现了该问题，并通过零日计划 (ZDI) 向供应商报告。TP-Link 于 2023 年 3 月通过发布固件安全更新解决了该问题，在安全公告公开后不久，概念验证漏洞利用代码就出现了。  
  
随后，网络安全团队就多个僵尸网络发出警告，包括三个 Mirai 变体（1、2、3）和一个名为“ Condi ”的僵尸网络，其目标是未打补丁的设备。  
  
本周，Fortinet 再次发出警告，称其观察到利用该漏洞的恶意活动激增，并指出该漏洞源自六次僵尸网络操作。  
  
Fortinet 的遥测数据显示，从 2024 年 3 月开始，利用 CVE-2023-1389 的每日感染尝试通常超过 40000 次，最高可达 50000 次。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCanDewS5hb0bFtnR6vbclLcBAGcNSH7xwU8VgqUp2mXjJcpYFickU5Lg/640?wx_fmt=jpeg&from=appmsg "")  
  
有关 CVE-2023-1389的活动图  
  
针对这个漏洞的多起攻击，重点关注 Moobot、Miori、基于 Golang 的代理AGoent和 Gafgyt 变体等僵尸网络。每个僵尸网络都利用不同的方法和脚本来利用漏洞，建立对受感染设备的控制，并命令它们参与分布式拒绝服务 (DDoS) 攻击等恶意活动。  
  
**AGoent**：下载并执行从远程服务器获取并运行 ELF 文件的脚本，然后擦除文件以隐藏痕迹。  
  
**Gafgyt变体**：通过下载脚本来执行 Linux 二进制文件并维护与 C&C 服务器的持久连接，专门从事 DDoS 攻击。  
  
**Moobot**：以发起 DDoS 攻击而闻名，它获取并执行脚本来下载 ELF 文件，根据架构执行它们，然后删除痕迹。  
  
**Miori**：利用 HTTP 和 TFTP 下载 ELF 文件，执行它们，并使用硬编码凭据进行暴力攻击。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCRT7wsB8Xl5OwMibalHWW0nBX7zsrLXqRdMqBkVghArfTQNcXoSNrewQ/640?wx_fmt=jpeg&from=appmsg "")  
  
Miori 用于暴力破解帐户的凭据列表  
  
**Mirai变体**：下载一个脚本，随后获取使用 UPX 压缩的 ELF 文件 ，监视和终止数据包分析工具以避免检测。  
  
**Condi**：使用下载程序脚本来提高感染率，防止设备重新启动以保持持久性，并扫描并终止特定进程以避免检测。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCZTicakHTUGBHyH7EY3xOBqecp59dI7MnXA8BNBMJLKMhhhz6gibQEo2Q/640?wx_fmt=png&from=appmsg "")  
  
Condi DDoS 攻击模式  
  
Fortinet 表示，尽管供应商去年发布了安全更新，但仍有大量用户在继续使用过时的固件。建议 TP-Link Archer AX21 (AX1800) 路由器用户遵循供应商的固件升级说明进行安全更新，并将默认的管理员密码更改为较长的密码，并在不需要时禁用对管理面板的网络访问。  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztC6kw54ABoHq2r0wppicnrOgBhpicbXktqaoeVH5IuaNGs3o54tibOd4H9Q/640?wx_fmt=jpeg "")  
[【安全圈】黑客组织利用 Carbanak 后门“瞄准”美国汽车行业](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058349&idx=1&sn=ebd2dc1fd4007da9d61881e41f75daa1&chksm=f36e1eadc41997bbe06c2c4fc0a4a32f0bf17b84cbb177ec7448b622480793f313e147b04121&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCzhBj4Ow2934YuhXiaM3dkRWX0y8CRYZunVv4EnV8fPdtUQmxrmkqxkA/640?wx_fmt=jpeg "")  
[【安全圈】巴西游戏开发公司 Asantee Games 泄露了超过 1400 万玩家数据](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058349&idx=2&sn=a4e02fd4fa3273b372e9b4fe9b82dbaa&chksm=f36e1eadc41997bb63a876813ffecc9c528052db583722d53368804adf71a6bc858afe22a466&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCFF7IrmB5ZlqheOpS4bK38I6Fp0qjAmGSOzHu8TeoMK7882KibzWcCFQ/640?wx_fmt=jpeg "")  
[【安全圈】黑客挖矿赚取 100 万美元后被抓！两家知名云服务商遭诈骗 350 万美元](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058349&idx=3&sn=cf7118f283b12ffc3f63e15898dd4cd3&chksm=f36e1eadc41997bb47f1123920445e07fc350a76cef5b88fdd5acd7b75d3e1c17c3a68acda44&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGyljKXaHAiabApRD9oHyND5ztCL0t2yACrjwmia3O5Yoia22e8tE4xD459iaI5R3UByqxu0HJK4bfl3icuPQ/640?wx_fmt=jpeg "")  
[【安全圈】“我们会受到攻击”：巴黎奥运会面临网络安全挑战](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652058349&idx=4&sn=3ec275f71b3a2e4939d7715186e448ca&chksm=f36e1eadc41997bbabf5314a15b904c8cb8dcfa99ed1a57ad509a7532ea408d691df31cf880f&scene=21#wechat_redirect)  
  
  
  
  
  
  
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
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
