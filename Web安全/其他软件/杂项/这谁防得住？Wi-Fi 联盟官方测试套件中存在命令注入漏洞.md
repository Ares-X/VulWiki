---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  这谁防得住？Wi-Fi 联盟官方测试套件中存在命令注入漏洞   
 数世咨询   2024-10-30 16:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Y9btpvDIDqq2iapicRLibUerLjfFtibvYgO8VAq9ewTicIfuB5mGYZ6gkwv9WiaHXfpX225LtDia4ib8FNjNp0kHEcrNqA/640?wx_fmt=png&from=appmsg "")  
  
  
计算机应急响应小组 (CERT) 协调中心 (CERT/CC) 研究人员发现Wi-Fi联盟测试套件中存在命令注入漏洞，该漏洞的编号为CVE-2024-41992，Wi-Fi 联盟的易受攻击代码已发现部署在 Arcadyan（智易科技）   
FMIMG  
51AX000J  
   
路由器上。  
  
**01**  
**WiFi测试套件漏洞影响**  
  
  
CERT/CC  
在周三发布的公告中  
表示  
：  
 “  
该漏洞允许未经身份验证的本地攻击者通过发送特制的数据包来利用  
 Wi-Fi   
测试套件，从而能够在受影响的路由器上以  
 root   
权限执行任意命令。  
”  
  
Wi-Fi 测试套件是Wi-Fi 联盟开发的集成平台，可自动测试 Wi-Fi 组件或设备。虽然该工具包的开源组件是公开的，但完整套件仅供其成员使用。  
  
**02**  
**WiFi测试套件漏洞被发现**  
  
  
SSD Secure Disclosure（漏洞报告公司）于 2024 年 8 月发布了该漏洞的详细信息，称这是一个命令注入案例，可能使威胁行为者能够以 root 权限执行命令。该漏洞最初于 2024 年 4 月报告给 Wi-Fi 联盟。  
  
一位独立研究员，其网名为“fj016”，发现并报告了这些安全漏洞，这位研究员还提供了该漏洞的概念验证 (PoC) 漏洞利用程序。  
  
CERT/CC 指出，Wi-Fi 测试套件不适用于生产环境，但已在商业路由器部署中发现。  
  
报告称：“成功利用此漏洞的攻击者可以完全控制受影响的设备。”  
  
“通过此访问权限，攻击者可以修改系统设置，破坏关键网络服务或完全重置设备。这些操作可能导致服务中断，网络数据泄露，并可能导致所有依赖受影响网络的用户失去服务。”  
  
由于智易科技股份有限公司未发布补丁，建议其他已包含 Wi-Fi 测试套件的供应商将其从生产设备中完全删除或将其更新至 9.0 或更高版本，以降低被利用的风险。  
  
* 本文为闫志坤编译，原文地址：https://thehackernews.com/2024/10/researchers-discover-command-injection.html                       注：图片均来源于网络，无法联系到版权持有者。如有侵权，请与后台联系，做删除处理。  
  
— 【 THE END 】—  
  
🎉 大家期盼很久的#  
**数字安全交流群**  
来了！快来加入我们的粉丝群吧！  
  
🎁 **多种报告，产业趋势、技术趋势**  
  
这里汇聚了行业内的精英，共同探讨最新产业趋势、技术趋势等热门话题。我们还有准备了专属福利，只为回馈最忠实的您！  
  
👉   
扫码立即加入，精彩不容错过！  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Y9btpvDIDqqPJv9p5ibKIhJXQjWHJmSlibSdib80Llfp8mlV0ibf7m47jyaVeGoFeorddtIuxS5liafTJRKHeSdLnaQ/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
😄  
嘻嘻，我们群里见！  
  
  
更多推荐  
****  
  
  
[](http://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247514213&idx=1&sn=fa2d0412dbbce05ec48a9df909b7cfd3&chksm=c144cad8f63343ce0f383fc9d885c2c7ddcb3f3871270abea4c274775307858d350f60db3b54&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247513359&idx=1&sn=2f3bd51b24862de02cca6078688bafeb&chksm=c144c7b2f6334ea415adac810ce4803cdb3cd5e5ba194ff394b7278ebbb48cc830c8d405427a&token=824343009&lang=zh_CN&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247520738&idx=1&sn=f5660b24e2b5dc8b58b68b60bb20ba76&chksm=c144e35ff6336a495bbcd1c10e70325946e9336571babc4758819d55ee1b730498c12c2cd6d4&scene=21#wechat_redirect)  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
