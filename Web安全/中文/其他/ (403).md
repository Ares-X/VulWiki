---
cve: "CVE-2022-29072"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】7-zip命令执行   
夜影实验室  锦行科技   2022-04-19 14:27  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruAbASEsHM2hqhmqd8MFMz3u4KxE1hstqY7NTPOuA8icJTkn66fYibhqRxyMibA2D9wySmMcQkJMLboOQ/640?wx_fmt=gif "")  
  
  
**漏洞名称：**7-Zip 命令执行  
  
**影响范围：**v21.07  
  
**漏洞编号：**CVE-2022-29072  
  
**漏洞类型：**命令执行或提升权限  
  
**利用条件：**无  
  
**综合评价：**  
  
<利用难度>：低  
  
<威胁等级>：  
**高危**  
 **能获取服务器权限**  
  
  
**#1**  
**漏洞描述**  
  
  
Windows平台 7-Zip（v21.07） 允许将扩展名为 .7z 的文件被拖到HELP>contents时，可造成权限提升和命令执行。  
  
7-zip 软件中包含的零日漏洞是基于 7z.dll 的错误配置和堆溢出。7-zip软件安装后，HELP>contents内容中的帮助文件通过Windows HTML Helper文件工作，但是命令注入后，7zFM.exe进程下出现了一个子进程。  
  
  
**#2 解决方案**  
  
  
**第一种方法**：如果 7-zip 没有更新，删除 7-zip.chm 文件就足以关闭漏洞。  
  
**第二种方法：**7-zip 程序应该只有读取和运行权限。（适用于所有用户）。  
  
  
**#3 参考资料**  
  
  
https://github.com/kagancapar/CVE-2022-29072  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruD6rSnJpSL57NHjuX79JSjjyYviaibNeS3xmGzPfoict6VdnvyuYEq6JdjQqre3WkicWWU7hjpicS2ByibQ/640?wx_fmt=gif "")  
  
**推 荐 阅 读**  
  
  
  
  
[【漏洞预警】 S2-062 Struts2 OGNL表达式注入漏洞](http://mp.weixin.qq.com/s?__biz=MzIxNTQxMjQyNg==&mid=2247489497&idx=1&sn=5706f3c1d1208ecde33fd1edd1b49d8f&chksm=9799ec7ca0ee656ab9ac058de0608b5fd2dbd9528248368652be2f458939327d22ff0d08e385&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警】Spring框架远程命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzIxNTQxMjQyNg==&mid=2247489477&idx=1&sn=ca2a69af7986f151193882f916f96fcd&chksm=9799ec60a0ee657676e1ea35b948b49f6c191fe938370e657a2d76b7c5b21f511450996c3961&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/2CRGGNuQruBy67pKAiadAicicia5vPm2xla4zAiccf9wQm5dGGTWiaic61UXVZWCtnV8Vx2RNh2p2eHFnaSTJEhZ7LRxQ/640?wx_fmt=gif "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
