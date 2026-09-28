---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  研究员披露WinRAR中的ANSI转义序列注入漏洞   
看雪学苑  看雪学苑   2024-05-28 17:59  
  
近日，安全研究员Siddharth Dushantha发现WinRAR这款流行文件压缩软件中存在ANSI转义序列注入漏洞，可能被利用来欺骗用户或是导致系统崩溃。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8Gia7p0Adib7Vc2ajS825U9iaquhJDfDL3Q0TVb2gtxOAodRUjXhOCQXJDj2GeVRYZZ06wrUCF6o807w/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞（Linux、Unix系统：CVE-2024-33899；Windows系统：CVE-2024-36052）影响早于WinRAR 7.00的版本，允许攻击者使用ANSI转义序列伪造屏幕输出。问题源于WinRAR在ZIP存档中未对文件名进行适当验证和清理。当使用WinRAR提取特制ZIP存档时，该应用程序无法正确处理转义序列。相反，它会将其解释为控制字符，允许攻击者操纵显示的文件名，并有可能欺骗用户运行恶意文件。除此之外，特定的ANSI序列也可以在系统上触发本地拒绝服务，使终端无法使用。  
> ANSI转义序列是一种用于控制终端文本格式和外观的特殊代码。大多数序列以ASCII转义符（ESC，\x1B）开头，后跟方括号（[），并嵌入到文本中，通常是用于创建引人注目的命令行界面。  
  
  
  
  
由于文件扩展名的处理不当，当用户尝试从WinRAR内部打开看似无害的文件时，便会触发这一漏洞。WinRAR的ShellExecute函数接收到不正确的参数并执行隐藏的恶意脚本，如批处理文件（.bat）或命令脚本（.cmd）。然后，该脚本便可以在受害者设备上安装恶意软件，同时显示虚假文件以避免引起怀疑。  
  
  
此漏洞已在7.00及更高版本的WinRAR中得到了修复，建议用户及时进行更新以保护自己免受潜在的攻击。  
  
  
  
编辑：左右里  
  
资讯来源：sdushantha.github.io、cybersecuritynews  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球在看**  
  
****  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/1UG7KPNHN8FxuBNT7e2ZEfQZgBuH2GkFjvK4tzErD5Q56kwaEL0N099icLfx1ZvVvqzcRG3oMtIXqUz5T9HYKicA/640?wx_fmt=gif "")  
  
戳  
“阅读原文  
”  
一起来充电吧！  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
