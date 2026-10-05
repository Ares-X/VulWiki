---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Jenkins core与LoadNinja插件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-33001; CVE-2026-33002; CVE-2026-33003; CVE-2026-33004"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Jenkins 严重漏洞导致CI-CD服务器易受RCE攻击"
prerequisites: "来源所述条件，未列明部分仍待核：core<=2.554/LTS<=2.541.2，固定2.555/2.541.3；LoadNinja<=2.1固定2.2"
side_effects: "未执行；本文需注意的操作影响：归档到RCE链细节不准确；写JENKINS_HOME/init/groovy.d/directory路径，需核实际init.groovy.d目录和触发重启/加载条件；写文件不是即时必然RCE"
source_status: "unknown"
id: "vw-46e1de9f81f56593ebfac145"
entity_id: "ve-46e1de9f81f56593ebfac145"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：core&lt;=2.554/LTS&lt;=2.541.2，固定2.555/2.541.3；LoadNinja&lt;=2.1固定2.2

代码与实验材料：无PoC；33001需Item/Configure或agent控制，33002需受害浏览器DNS重绑定且匿名权限决定命令效果，插件需Extended Read

来源证据范围：SecurityOnline译文，无Jenkins官方公告直接URL

- **操作与副作用边界（1）**：归档到RCE链细节不准确；依据：写JENKINS_HOME/init/groovy.d/directory路径，需核实际init.groovy.d目录和触发重启/加载条件；写文件不是即时必然RCE。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：四漏洞组件/效果需单独映射；依据：33003/33004分别存储与界面泄密被合并，33002范围沿用core但未独立确认；匿名命令不等于普遍管理员执行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Jenkins 严重漏洞导致CI/CD服务器易受RCE攻击  
Ddos
                    Ddos  代码卫士   2026-03-20 10:08  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Jenkins****项目发布安全公告，修复了可导致系统遭完全攻陷的两个严重漏洞CVE-2026-33001和CVE-2026-33002。这两个漏洞对于 DevOps 团队而言风险极大，可导致攻击者直接在软件开发生命周期的关键阶段注入恶意代码。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
最直接的威胁是高危的任意文件创建漏洞CVE-2026-33001，影响 Jenkins 2.554和之前版本以及 LTS 2.541.2和之前版本。这些版本在提取 .tar 或 .tar.gz 文档时未能安全处理这些符号链接，从而导致构造的文档能够将文件写入文件系统上的任意位置，仅受运行 Jenkins 的用户文件系统访问权限限制。  
  
该漏洞对于在控制器上提取的文档影响严重。攻击者可通过“将恶意脚本写入 JENKINS_HOME/init/groovy.d/directory”或者部署恶意插件的方式实现远程代码执行 (RCE) 后果。该利用能够由任何具有 “Item/Configure” 权限或者能够控制智能体进程的人员控制，因此尤为危险。  
  
第二个高危漏洞CVE-2026-33002主要针对通过 WebSockets 访问时的 Jenkins 命令行界面。研究人员发现 Jenkins 使用不安全的 HTTP 请求标头来验证这些链接的来源，导致DNS 重绑攻击风险。通过诱骗受害者访问使用 DNS 重绑定的恶意网站来解析 Jenkins 控制器的 IP 地址，攻击者可从不受信任来源建立与 CLI 端点的 WebSocket 连接并以匿名用户身份执行 CLI 命令。如果该匿名用户身份被授权权限，或者该服务器使用了“任何人都可做任何事”的策略，则攻击者可利用 Groovy 脚本命令执行任意代码。  
  
除了这些核心修复方案外，Jenkins 还修复了 LoadNinja 插件（v2.1及之前版本）中的敏感数据泄露漏洞CVE-2026-33003和CVE-2026-33004。该插件“在 job config.xml 文件中存储了 LoadNinja API 未加密密钥”并未能在 web 接口进行掩码处理，可被具有 “Item/Extended Read” 权限的任何用户捕获。  
  
Jenkins 督促管理员立即升级实例，并发布如下补丁：  
  
- Jenkins Weekly: 更新至 2.555 版本。  
  
- Jenkins LTS: 更新至2.541.3 版本。  
  
- LoadNinja Plugin: 更新至 2.2版本。  
  
  
  
如无法立即更新修复 CLI 漏洞，则管理员应当“为 Jenkins 控制器设置认证机制并删除匿名用户的权限”。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Jenkins 修复CSRF和开放重定向等多个漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522429&idx=2&sn=de12997404efb67be58ceb4d9f00b64c&scene=21#wechat_redirect)  
  
  
[CISA：严重的 Jenkins 漏洞已被用于勒索攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520541&idx=2&sn=c8001046f4088bb94fd3ffcd7e6926b0&scene=21#wechat_redirect)  
  
  
[Jenkins 出现严重漏洞，可导致代码执行攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515862&idx=2&sn=559cb44fa0529b875f5361b1112c5b60&scene=21#wechat_redirect)  
  
  
[Jenkins 披露插件中未修复的XSS、CSRF等18个0day漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513380&idx=3&sn=643da5e5ad5ec30250e2a3e9dca17e51&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/pipeline-poison-critical-jenkins-vulnerabilities-rce-cve-2026-33001/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
