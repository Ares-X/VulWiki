---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Burp未授权漏洞自动检测插件 -- Unauthorized_Scan（1月27日更新）  
sh2493770457
                    sh2493770457  Web安全工具库   2026-01-29 16:00  
  
===================================  
  
**免责声明**  
  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。工具来自网络，  
安全性自测  
，  
大家都要把工具当做病毒对待，在虚拟机运行。  
如有侵权请联系删除。个人微信：  
ivu123ivu  
  
  
**0x01 工具介绍**  
  
这是一个Burp Suite扩展工具，用于自动检测Web应用程序中的未授权访问漏洞。  
  
```
主动扫描和被动扫描模式：支持在Burp主动扫描中使用，也可以被动监控所有流量
自定义认证头：可配置需要移除的认证头列表
可调整的检测阈值：可设置响应长度差异阈值，灵活适应不同应用场景
详细的调试信息：提供完整的请求处理日志，便于排查问题
强大的错误处理：包含请求重试机制，确保检测过程稳定可靠
丰富的结果展示：直观查看检测结果及详细信息
导出功能：支持将检测结果导出为Markdown或文本文件，以及导出API接口为JSON格式
流量记录：记录所有经过的流量，便于后续分析
```  
  
**0x02 安装与使用**  
  
运行界面  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8H1dCzib3UibvhzSBtiawRxJIG37ibibkiblK6VKbeVDHyype3OBRONrNF8NppMVBO83u9XziarAr829waM5f0CELo7zg/640?wx_fmt=png&from=appmsg "")  
  
  
网盘下载链接（一定要在虚拟机运行）：  
  
链接：https://pan.quark.cn/s/1e860a3aab1f  
<table><tbody><tr><td data-colwidth="287"><section><span leaf=""><img class="rich_pages wxw-img" data-aistatus="1" data-imgfileid="100034284" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/8H1dCzib3UibvhzSBtiawRxJIG37ibibkiblK6gPicXtS0q86LlBeFibxMxtm3cf5Q7PXTW86EwyDTiawSVFMyjDYYz2Zfw/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" type="inline"/></span></section></td><td data-colwidth="287"><section><span leaf=""><img class="rich_pages wxw-img" data-aistatus="0" data-imgfileid="100033627" data-ratio="1.2469635627530364" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/8H1dCzib3UibsC4yYFwgTnJrN0q57DearHJhaWSE6XQllpkUviaibg5MqTYgdUQYDNt8ysfV2v6o4jsN34pmq3DAOg/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="1235" type="inline"/></span></section></td></tr></tbody></table>  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
