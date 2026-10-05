---
cve: "CVE-2024-6409"
source: "gelusus/wxvl 公众号漏洞文库"
title: "OpenSSH 易受RCE新漏洞影响"
product: "OpenSSH privsep子进程/发行版补丁"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-6409"
referenced_identifiers: "CVE-2024-6387"
identifier_role: "primary"
prerequisites: "受影响OpenSSH/下游配置、认证宽限期信号竞争；代码执行身份为降权privsep用户"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-21f45c823607b7c7aa014b44"
entity_id: "ve-21f45c823607b7c7aa014b44"
schema_version: "1"
---

# OpenSSH 易受RCE新漏洞影响

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响OpenSSH/下游配置、认证宽限期信号竞争；代码执行身份为降权privsep用户
- 证据范围：明确与6387不同且降权身份，值得保留独立条目；仅RHEL9影响说法需官方分发矩阵核对

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺具体OpenSSH包/修复版本及发行版公告
- 末尾6387在野利用不是本6409状态，需明确日期与原始证据
- 入宫客户端/信号句柄等翻译错误

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

THN  代码卫士   2024-07-10 17:40  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**OpenSSH 安全网络套件的多个版本易受一个新漏洞（CVE-2024-6409）的影响，可触发远程代码执行 (RCE)。**  
  
  
  
CVE-2024-6409（CVSS评分7.0）与CVE-2024-6387（即RegreSSHion）不同，与信号处理中因一个竞争条件在privsep子进程中的代码执行有关，仅影响 Red Hat Enterprise Linux 9。  
  
安全研究员 Alexander Peslyak 发现并报送了该漏洞，他在审计CVE-2024-6387的过程中发现了CVE-2024-6409。他提到，“它与CVE-2024-6387最主要的区别在于竞争条件和RCE是在privsep子进程中触发的，后者以消减后的权限而非父服务器进程运行。所以当下的影响更低。然而，在具体场景下这些漏洞的利用可能有所区别，可能会导致其中一个对攻击者更具吸引力，而且如果仅有其中一个被修复或缓解，则另外一个变得更为相关。”  
  
值得注意的是，该信号句柄条件竞争漏洞与CVE-2024-6387一样，入宫客户端并未在 LoginGraceTime 秒内认证（默认120秒），则OpenSSH 守护进程的SIGALRM 句柄会被异步调用，从而调用多种并非异步信号安全的多种函数。  
  
该漏洞的描述是“该问题导致它易受 cleanup_exit() 函数上一个信号句柄竞争条件的影响，在 SSHD 服务器的非权限子中引入和CVE-2024-6387一样的漏洞。成功攻击后，在最糟糕的场景下，攻击者可能能够在运行 sshd 服务器的非权限用户中执行RCE。  
  
目前已发现针对CVE-2024-6387的在野利用。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[堪比 Log4Shell：数百万台 OpenSSH 服务器易受 regreSSHion 远程攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519949&idx=1&sn=c2f44f54f4920efad56874aada444bc2&chksm=ea94bfa7dde336b1cbb8ba0a2984f58e65499be25dd7790f20f76ed57c06f723e6a39508289f&scene=21#wechat_redirect)  
  
  
[OpenSSH 修复预认证双重释放漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515493&idx=1&sn=10c488e3633714016c305152a77ee339&chksm=ea948c0fdde30519fa2326d3c95a03a3c9b258d96a075135025c424e125bae3c9e907d74b6c1&scene=21#wechat_redirect)  
  
  
[OpenSSH 后门来一打！保证你没见过!](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247488712&idx=1&sn=d68bb7652919d3c237e635d24db38da0&chksm=ea9725a2dde0acb455b7b44610e2474c13f26bf50f049ed634104185bc39b667825e4dad654c&scene=21#wechat_redirect)  
  
  
[OpenSSH修复可读取内存的服务器漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485812&idx=4&sn=effbd4cb10e00460c4ab9127c43082c9&chksm=ea97381edde0b108600a4821bb6a39f8be9e398efc41375d4ce70baeb74c8ad14de5bce6c724&scene=21#wechat_redirect)  
  
  
[OpenSSH <=6.8 X11安全bug](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485928&idx=2&sn=ed1317370c4df4beade387d0053e31d5&chksm=ea973882dde0b1944e6fa0f571d991aca7d03301312867df0b6439ceb21eb97898090b012322&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/07/new-openssh-vulnerability-discovered.html  
  
  
题图：  
Pexels  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
