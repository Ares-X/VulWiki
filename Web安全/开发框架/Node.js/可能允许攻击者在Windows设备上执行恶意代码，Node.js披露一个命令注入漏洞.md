---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  可能允许攻击者在Windows设备上执行恶意代码，Node.js披露一个命令注入漏洞   
看雪学苑  看雪学苑   2024-04-17 17:59  
  
Node.js项目近日披露，其在Windows平台上的多个活跃版本存在一个高危漏洞。据悉，即使“shell”选项被禁用，此漏洞仍可能允许攻击者在受影响的设备上执行恶意代码，这给构建在Node.js上的应用和服务带来了严重风险。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/1UG7KPNHN8EgYVUmkuuWqVcU7uXia92gMrhkWOiaRGxX6tW1AicF2mHnSCMOnsfnlOqrvsRJlS5vfSHYFGXIfLv2Q/640?wx_fmt=jpeg&from=appmsg "")  
  
  
该漏洞（CVE-2024-27980）由安全研究员Ryotak发现并报告，源于Node.js通过‘child_process.spawn’或‘child_process.spawnSync’函数执行代码时处理.bat文件的方式。攻击者可以将恶意命令注入到特制的命令行参数中，绕过‘shell’选项被禁用时理应存在的安全机制。成功利用此漏洞可能允使攻击者在受影响系统上远程执行任意命令。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8EgYVUmkuuWqVcU7uXia92gM47b4fyEiaKOdQb9E9cGaeeacEFHxdjJtLnTv3xEQtkCpwux2ib23Ej0A/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞的影响广泛，波及所有在Windows上使用18.x、20.x、21.x版本的Node.js用户。Node.js项目对此迅速反应，已由Ben Noordhuis进行修复，并对受影响版本发布了相应的安全更新。Node.js项目表示此漏洞可被利用，攻击者可能获取对被攻击系统的重要控制（如安装恶意软件、窃取数据或干扰运营）。因此迅速采取行动至关重要，建议用户立即进行升级，以保护其应用和基础设施免受潜在利用的风险。  
  
  
应对措施：  
  
① 立即更新Windows系统上的Node.js到可用的修补版本。关注官方Node.js项目渠道以获取最新讯息。  
  
② 若使用‘child_process.spawn’或相关函数，请审查输入处理，确保命令行参数不会被篡改，考虑采取额外的验证和清理措施。  
  
  
  
编辑：左右里  
  
资讯来源：github、cybersecuritynews  
  
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
