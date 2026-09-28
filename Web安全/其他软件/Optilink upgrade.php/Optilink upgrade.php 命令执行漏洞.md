---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Optilink upgrade.php 命令执行漏洞  
Superhero  Nday Poc   2025-07-03 02:44  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCkYN4sZibCVo6EFo0N9b7Kib4I4N6j6Y10tynLOdgov9ibUmaNwW5yeoCbQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCkhic5lbbPcpxTLtLccZ04WhwDotW7g2b3zBgZeS5uvFH4dxf0tj0Rutw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/Melo944GVOJECe5vg2C5YWgpyo1D5bCk524CiapZejYicic1Hf8LPt8qR893A3IP38J3NMmskDZjyqNkShewpibEfA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
内容仅用于学习交流自查使用，由于传播、利用本公众号所提供的  
POC  
信息及  
POC对应脚本  
而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号Nday Poc及作者不为此承担任何责任，一旦造成后果请自行承担！  
  
  
**01**  
  
**漏洞概述**  
  
  
Optilink upgrade.php 接口存在远程命令执行漏洞。攻击者可以通过漏洞执行任意命令从而获取服务器权限，可能导致内网进一步被攻击。  
  
**02******  
  
**搜索引擎**  
  
  
FOFA:  
```
body="/html/css/dxtdata.css"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcy1H0KXoSkCH6Tuzk2eNQJia7iaAJRQRnhFzYZOW6QBOpDDnUqwL8GCQRA/640?wx_fmt=png&from=appmsg "")  
  
  
**03******  
  
**漏洞复现**  
  
写文件  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcyF0HuRjQ4p82PVhLyu56vpp5iaYLdHwn8HAhKu82Rvzic0sngicYpiayl8A/640?wx_fmt=png&from=appmsg "")  
  
读文件  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcyJ56JlTdIxKiaF3SDatuMACqHnoFndmib4rw8njVdt1G5Kj1zTvkaEjgQ/640?wx_fmt=png&from=appmsg "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcyqnwKNAaMIuCLXWaQEJQdFuwtziaicgvicRj2Tou0yJLBssianfdzgY9Uvg/640?wx_fmt=png&from=appmsg "")  
  
afrog  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcyLX6ianccD4Br8iaP2tibKAYTMHyWtfyJicU8L8kXyDcor2PJkrSvn2JqUg/640?wx_fmt=png&from=appmsg "")  
  
xray  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKjEE6TBckrtsu4FDibkTFcyeaR84sFaQlCjgCUdDqoK8v5fKcH6a2MSeA4n9r9VCWM1jzsmNhT22w/640?wx_fmt=png&from=appmsg "")  
  
  
**05******  
  
**修复建议**  
  
  
1、关闭互联网暴露面或接口设置访问权限  
  
2、升级至安全版本  
  
  
**06******  
  
**内部圈子介绍**  
  
  
【Nday漏洞实战圈】🛠️   
  
专注公开1day/Nday漏洞复现  
 · 工具链适配支持  
  
 ✧━━━━━━━━━━━━━━━━✧   
  
🔍 资源内容  
  
 ▫️ 整合全网公开  
1day/Nday  
漏洞POC详情  
  
 ▫️ 适配Xray/Afrog/Nuclei检测脚本  
  
 ▫️ 支持内置与自定义POC目录混合扫描   
  
🔄 更新计划   
  
▫️ 每周新增7-10个实用POC（来源公开平台）   
  
▫️ 所有脚本经过基础测试，降低调试成本   
  
🎯 适用场景   
  
▫️ 企业漏洞自查 ▫️ 渗透测试 ▫️ 红蓝对抗   
▫️ 安全运维  
  
✧━━━━━━━━━━━━━━━━✧   
  
⚠️ 声明：仅限合法授权测试，严禁违规使用！  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wnJTy44dqwKE6HlialDOuZmZiaaGBhUxs0uPw8ia9QiaUFicEkckcjkG3czx12xRkRFM5XicUmvmKVpC5WzpOCeR93Yg/640?wx_fmt=png&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
