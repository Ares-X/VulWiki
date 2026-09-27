---
cve: "CVE-2024-53197"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CISA将Linux内核漏洞列入已知被利用漏洞目录   
 FreeBuf   2025-04-11 11:02  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
美国网络安全和基础设施安全局（CISA）近日将两个Linux内核漏洞（编号分别为CVE-2024-53197和CVE-2024-53150）列入其已知被利用漏洞（KEV）目录。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibfHJsFO5icMuraoNACD1HJWZuibMNWGdyTaaibeOBXCVnlQ4MDdQ1oUnw3KaXk67HfpTgHB7lDC2M3g/640?wx_fmt=jpeg&from=appmsg "")  
  
  
**01**  
  
  
  
**漏洞技术细节分析**  
  
  
CVE-2024-53197漏洞（CVSS评分为7.8）存在于Linux内核的ALSA USB音频驱动中，主要影响Extigy和Mbox设备。该漏洞源于对USB配置数据的错误处理，可能导致内存越界访问。具体而言，问题涉及连接USB设备提供的bNumConfigurations字段。如果该值设置高于内存中分配的配置空间，后续内核操作与该数据交互时可能访问超出预定范围的内存，存在内存损坏或系统不稳定的风险。目前该漏洞已通过在使用前验证配置计数得到修复，确保内核不会访问分配区域之外的内存。  
  
  
CVE-2024-53150漏洞（CVSS评分同为7.8）同样存在于Linux内核的ALSA USB音频驱动中。该驱动在遍历过程中未能验证USB音频时钟描述符中的bLength  
字段。这一疏漏使得恶意或配置错误的USB设备可以提供bLength  
短于预期的描述符，可能导致越界读取。  
  
  
**02**  
  
  
  
**联邦机构修复要求**  
  
  
根据《降低已知被利用漏洞重大风险的第22-01号约束性操作指令》（BOD 22-01），联邦民事行政部门（FCEB）机构必须在规定期限内修复这些已识别的漏洞，以保护其网络免受利用目录中漏洞的攻击。CISA要求联邦机构在2025年4月30日前修复这些漏洞。  
  
  
**03**  
  
  
  
**专家建议**  
  
  
网络安全专家同时建议私营机构也应当审查该漏洞目录，并及时修复其基础设施中的相关漏洞。  
  
  
本周，CISA还将Gladinet CentreStack和ZTA Microsoft Windows通用日志文件系统（CLFS）驱动漏洞（编号分别为CVE-2025-30406和CVE-2025-29824）列入了已知被利用漏洞目录。  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR39ibFdyjP3Qp8CEJxFWljbW1y91mvSZuxibf3Q3g2rJ32FNzoYfx4yaBmWbfwcRaNicuMo3AxIck2bCw/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1 "")  
  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651317737&idx=1&sn=99fed7dcc16d21127eb031fd187b35f5&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651317886&idx=1&sn=50bb777ea9b038b842812efd1d390806&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651317886&idx=2&sn=d71ff253383c30e9a56386b7e7ef8f45&scene=21#wechat_redirect)  
  
  
  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR39ibFdyjP3Qp8CEJxFWljbW1uEIoRxNoqa17tBBrodHPbOERbZXdjFvNZC5uz0HtCfKbKx3o3XarGQ/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  
  
  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icFibibPIGEfXsibI0C3or4BS5KDnCKUfVLVQGsc9BiaQTUsrwzfcianumzeLVcmibOmm2FzUqef2V6WPQQ/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38mFMbqsUOVbBDicib7jSu7FfibBxO3LTiafGpMPic7a01jnxbnwOtajXvq5j2piaII2Knau7Av5Kxvp2wA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1 "")  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
