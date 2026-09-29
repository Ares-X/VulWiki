---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】红队发现关键漏洞，可远程控制ATM机   
 安全圈   2023-08-16 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
2023年年初，Synack Red Team (SRT) 成员 Neil Graves、Jorian van den Hout 和 Malcolm Stagg 发现了CVE-2023-33871、CVE-2023-38257、CVE-2023-35763 和 CVE-2023-35189 漏洞 。  
  
  
2023年7月，总部位于法国的软件公司 Iagona 在其 ScrutisWeb 网络应用程序的 2.1.38 版本中修补了这些漏洞。  
  
  
一直以来，Synack 红队（SRT）全球安全研究人员经常会在 Synack 客户的基础架构和网络服务器中发现漏洞，在某些 Synack 目标上，SRT 成员可以相互协作，最大限度地发挥广泛的技能组合。  
  
  
在最近与 Synack 客户的一次合作中，SRT 某团队发现了 ScrutisWeb 中存在的软件缺陷，ScrutisWeb 是一种用于监控银行和零售 ATM 机群的安全解决方案。  
  
  
ScrutisWeb的开发商Iagona表示，ScrutisWeb可通过任何浏览器访问，帮助全球各组织监控自动取款机，并在出现问题时缩短响应时间。ATM 机群可包括支票存款机等敏感设备以及连锁餐厅的支付终端。  
  
  
ScrutisWeb 具有一系列功能：  
  
- 重新启动或关闭一个终端或整个机群  
  
- 检索银行服务信息  
  
- 监控（ATM）银行卡读卡器  
  
- 发送和接收文件（至 ATM）  
  
- 远程修改数据（在自动取款机上）  
  
**目标枚举**  
  
  
  
Synack 客户在此次合作中有超过 1,000 个唯一 IP 地址需要评估。  
在初步侦查期间，安全研究人员注意到有一个网络服务器向访问者发送了一个超大的 23MB JavaScript 文件。  
该文件中包含一个允许客户端下载服务器 webroot 中完整路径的函数：  
  
```
this.window.location.href = "/Download.aspx?folder=" + name；
```  
  
（向右滑动，查看更多）  
  
  
安全研究人员发现，提供"/"的文件夹名称会导致 ScrutisWeb 压缩整个网络根，并将其作为下载文件发送到浏览器。于是他们按照设计的功能使用该功能下载了网络根目录。在检查 Download.aspx 时发现它调用了 "Scrutis.Front.dll "库，该库似乎负责处理大部分用户功能。  
  
  
**CVE-2023-33871：绝对路径遍历**  
  
  
  
安全研究人员还注意到 "Download.aspx "的参数为 "文件 "或 "文件夹"。  
同时，他们还很快就找到了真正有趣的部分，即处理单个文件下载的字符串：  
  
```
str = !path1.Contains(":") ? this.Server.MapPath(path1) : path1.Contains(":")；
```  
  
（向右滑动，查看更多）  
  
  
这段代码查看的是作为 URL 的 "file "参数传递给该方法的 "path1 "变量。如果参数中不包含冒号，网络服务器将返回与网络根相关的文件，例如，"https://example.com/Download.aspx?file=thisfile.txt "将下载位于 "https://example.com/thisfile.txt "的文件。但是，如果参数中包含冒号，网络服务器就会返回与系统相关的文件，例如 "https://www.example.com/Download.aspx?file=c:\file.txt" 将下载服务器上位于 "c:\file.txt "的文件。成功！我们可以从服务器上下载配置、日志和数据库。  
  
  
**CVE-2023-35189：远程代码执行**  
  
  
  
安全研究人员进一步检查 Scrutis.Front.dll 后，发现了 AddFile() 方法。  
AddFile() 接受多部分表单 POST 请求，并将上传的文件存储到网络目录"/Files/telechar/"中。  
  
  
这意味着未经身份验证的用户可以上传任何文件，然后通过网络浏览器再次查看。其中一个问题是，最终存放上传文件的目录已被配置为允许解释和执行上传的脚本。我们创建了一个运行简单命令 "ipconfig /all "的概念验证（poc.asp），并将其上传到服务器。随后，他们访问了 "https://[redacted]/poc.asp "网站，服务器执行了系统命令 "ipconfig /all "并返回了响应，成功命令注入。  
  
  
通常，人们会认为 RCE 是漏洞利用链的高潮。在这种情况下，通过利用其余漏洞获取 ATM 控制器的用户访问权限，可以实现更大的恶意价值。可以在 Scrutis.Front.dll 中找到每个有漏洞的调用，并在未经身份验证的情况下使用。  
  
  
**CVE-2023-38257：不安全的直接对象引用**  
  
  
  
安全  
研究人员发现 GetUserDetails 方法原型是将单个整数作为 HTTP   
POST 请求的输入。  
  
```
[HttpPost］public UIUser GetUserDetails([FromBody] int idUser)
```  
  
（向右滑动，查看更多）  
  
  
同时， idUser 参数似乎是一个从数字 1 开始的连续整数值。通过向该函数发送数字为 1 的 POST，服务返回了用户 "administrateur "的信息，包括加密密码。  
  
  
**CVE-2023-35763 硬编码加密密钥**  
  
  
  
由于密码显然已加密，安全研究人员决定尝试逆向工程加密机制。在方法名称中搜索 "crypt "一词，显示了一个解密函数，该函数将密码文本作为输入，并返回一个明文 UTF8 字符串。该函数中有一行披露了明文字符串，该字符串被用作加密/解密用户密码的加密密钥：  
  
```
public static string Decrypt(string cipherString, bool useHashing)
{
...
numArray = cryptoServiceProvider.ComputeHash(Encoding.UTF8.GetBytes("ENCRYPTIONKEY"))；
...
return Encoding.UTF8.GetString(bytes)；
}
```  
  
（向右滑动，查看更多）  
  
  
安全研究人员编写了一个简单的 python 脚本，它可以获取使用 CVE-2023-38257 发现的加密密码，并将密码解密为明文。至此已经可以以管理员身份登录 ScrutisWeb了。  
  
  
**影 响**  
  
  
  
CVE-2023-38257 和 CVE-2023-35763 这两个漏洞让以管理员身份登录 ScrutisWeb 管理控制台成为可能。  
恶意行为者可以监控机群中各个自动取款机的活动。  
控制台还允许将 ATM 降为管理模式、上传文件、重新启动和完全关闭。  
需要进行进一步检查，以确定是否可以将定制软件上载到个别自动取款机上，以执行银行卡外渗、Swift 转账重定向或其他恶意活动。  
不过，此类额外测试不在评估范围之内。  
  
  
CVE-2023-35189 还可用于清除 ScrutisWeb 上的日志，并删除恶意行为者曾在那里活动的证据。从客户端基础架构中的这一立足点可能会发生额外的漏洞利用，使其成为恶意行为者面向互联网的支点。  
  
## 修复漏洞：尽快更新至 ScrutisWeb 2.1.38 版本  
  
  
值得一提的是，Iagona 非常重视安全问题，在及时向研究人员通报进展的同时，还迅速解决了四个发现的问题。  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgdKibeDibwor3bmBFGNEhOS6hcmM4AlbkhRQql8JAib6tJhgfrAwHVA3QmU0EbbkFwjt2w78b0g7NDQ/640?wx_fmt=jpeg "")  
[【安全圈】福特被曝WiFi出现安全漏洞，官方回应仍可安全驾驶](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652042010&idx=1&sn=58f9a157c83a3a6800c908a5ad8c57bd&chksm=f36fdf5ac418564c13d708db922cf8c810dead3ca95ec792e9a62aa33923c1582ccb4d14fded&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgdKibeDibwor3bmBFGNEhOS6JlfeRCvqzq6hu0ayFyEzsZjEBkx0qmkX0g2GpsCibUIsyOdOt0wfzBg/640?wx_fmt=png "")  
[【安全圈】大量用户反映被扣双倍月租！电信客服：系统升级所致](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652042010&idx=2&sn=035f4b2e898307fb5520f9699387dd0f&chksm=f36fdf5ac418564ce1437d649bbf5f27a215f06f76c2abb533c3237ed8b61d63bf08aab610a8&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgdKibeDibwor3bmBFGNEhOS6H4e4t6No0ytn0DiaFs25lAPBHFEjH7ZTnH3IYxamRWFenNpxmzy0OQA/640?wx_fmt=png "")  
[【安全圈】退休干部网络招募“敢死队”，目前涉案人员已抓捕归案](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652042010&idx=3&sn=9f1e26ffb7d72277353c553d7153bd2c&chksm=f36fdf5ac418564c999a76cbb9d0befed46af31cb8392a4e0f34992a710cc555448e21953d3f&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgdKibeDibwor3bmBFGNEhOS6ZAsok5BtzTkCNIicicmIgX5YtKRHfnwpwGf3icboy3z6G2iaNsdSzotOTQ/640?wx_fmt=png "")  
[【安全圈】微软曝欧德神思软件出现15个漏洞，可被利用窃取数据、关停电厂](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652042010&idx=4&sn=548f202952486fef79828e0ab511b217&chksm=f36fdf5ac418564cf43af7405fefd393fa7813420c0cf75c823d57bbe9362f33a2ea9b826277&scene=21#wechat_redirect)  
  
  
  
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
