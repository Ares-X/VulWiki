---
cve: "CVE-2024-24989"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】 Nginx 0day 漏洞来袭   
原创 一个不正经的黑客  一个不正经的黑客   2024-02-15 20:45  
  
# [漏洞预警] Nginx 0day 漏洞来袭  
### Details   
  
漏洞已经被分配CVE编号:  
  
**CVE-2024-24989**, **CVE-2024-24990**  
  
NGINX，作为无数高流量网站背后的工作核心，已发布了紧急补丁（版本1.25.4），以解决其实验性HTTP/3实现中潜伏的两个关键漏洞（CVE-2024-24989，CVE-2024-24990）。虽然这种更新更快的协议提升了网络性能，但其领先性质也引入了潜在的安全风险。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/cxf9lzscpMpBoWP6aeqt9iaicY0VhNmNpic4Q1ib7PawBic207hJBNJgSX9AXj7DSs80uJMwJpFJmGYVSPrTNvUF0Ng/640?wx_fmt=png&from=appmsg "")  
  
  
如果未修复，这些漏洞将为威胁行为者打开大门，导致以下情况发生：  
1. 服务器崩溃：对易受攻击的NGINX服务器发送恶意设计的QUIC会话可能触发工作进程崩溃，导致广泛的拒绝服务（DoS）。  
  
1. 进一步利用：尽管确切的范围仍在调查中，但CVE-2024-24990暗示了可能超出简单崩溃的更深入的妥协。  
  
1. CVE-2024-24989和CVE-2024-24990的CVSS评分均为7.5。“该漏洞允许远程未经身份验证的攻击者在NGINX系统上引发拒绝服务（DoS）”，F5警告道。  
  
受影响人群：  
  
如果您的NGINX配置符合以下条件，则您受到这些漏洞的影响：  
1. NGINX版本介于1.25.0和1.25.3之间。  
  
1. 您已明确使用ngx_http_v3_module编译了NGINX（这不是默认设置）。  
  
1. 在配置文件中的“listen”指令中启用了“quic”选项。  
  
立即采取行动：  
1. 立即升级：如果您的系统容易受到攻击，请勿拖延。升级到NGINX版本1.25.4以应用必要的补丁。  
  
1. 没有临时解决方案：  
  
遗憾的是，没有简单的解决方案或临时修复方法。禁用HTTP/3是减轻这些特定缺陷的唯一可靠方法。  
  
展望未来：  
  
F5，NGINX背后的公司，建议在目前在生产环境中极度谨慎使用HTTP/3。虽然该协议承诺更快的速度和韧性，但在其早期采用阶段可能存在安全问题。  
  
这一事件强调了在采用前沿网络技术时进行严格测试和威胁建模的重要性。  
  
如需深入了解HTTP/3安全性或详细的配置说明，请查阅官方NGINX安全通告中的相关链接。  
  
https://nginx.org/en/docs/http/ngx_http_v3_module.html  
  
![](https://mmbiz.qpic.cn/mmbiz_png/cxf9lzscpMpBoWP6aeqt9iaicY0VhNmNpic3rgNUPC1Xs5o3Ov1icDeS7hpXGUqEia4c0v0ibGLBQicxRLqshBiciaibicvzA/640?wx_fmt=png&from=appmsg "")  
  
### More   
  
https://securityonline.info/nginx-releases-urgent-patch-for-http-3-vulnerabilities-cve-2024-24989-cve-2024-24990/?expand_article=1  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/EsXmWiaiaQNAVtR37TRVGvpWc0EEgQeOmhib2fmYmibxkcIt2ibEaQ7YnpyZtCypqjYCup2D8R6bT82G8PiafEH8PYbg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  
往期推荐  
  
  
  
[热烈庆祝 BTC 破5W$+，币圈冲呀！](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502609&idx=1&sn=35b8bb1e94fe3d232ae6bce19d5b12f6&chksm=c0ce3068f7b9b97ee25e18036a57f2ccabd62d6427f22c228832e49db10b05ed80d904224b6e&scene=21#wechat_redirect)  
  
  
[红红火火过大年，黑客祝您新春快乐](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502527&idx=1&sn=7b5f092eb0e642f0c3ffa7a8b79edfdb&chksm=c0ce31c6f7b9b8d0aeabc732216e00264bb8fa4e04df7c7ec2d65b6013f9e5d56b9fefd2f94b&scene=21#wechat_redirect)  
  
  
[男人，为什么要努力搞钱？速进](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502475&idx=1&sn=eab3affe623918d9392b92e43b6e3f34&chksm=c0ce31f2f7b9b8e49b1b29c8eea2bcf0ede87106dc8e30159efe202912dc27395744983ecc84&scene=21#wechat_redirect)  
  
  
[【惊现】CVE-2024-21626 Docker容器逃逸漏洞](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502469&idx=1&sn=b33895acdcdc5de82986d6aea50b33f3&chksm=c0ce31fcf7b9b8ead24337aa7750d6cbf72294017fe68b22b3b8f2c8898bf07df326476fc580&scene=21#wechat_redirect)  
  
  
[安全已死！你还活着。](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502423&idx=1&sn=ec7be84f26ba271199684436b0565db9&chksm=c0ce312ef7b9b838c6377cddb6263bd110cb885e8938289659c0a0700d877d707119bb4176f1&scene=21#wechat_redirect)  
  
  
[CVE-2024-23897 Jenkins 任意文件读取一键利用](https://mp.weixin.qq.com/s?__biz=MzkwODI1ODgzOA==&mid=2247502340&idx=1&sn=a13cd3300307c764fc45d1d8608d6e73&chksm=c0ce317df7b9b86bb41713ce239520672bc9b5535e7ea06984bb53e38248e65475a9dd336aa8&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/jqgzXJtPb2QJoLIRGd7RoRePyZatMKU0fQ97HibQvDiaEMGOZZ2Tibn5CAdfwIffrpML72UE0k0r9H2p1U3KtbZWg/640?wx_fmt=png "")  
  
THE GOD OF WEALTH  
  
点个  
在看你最好看  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
