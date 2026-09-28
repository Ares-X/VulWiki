---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Ivanti 提醒注意已遭利用的两个 EPMM 漏洞  
Lawrence Abrams
                    Lawrence Abrams  代码卫士   2026-01-30 09:36  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Ivanti****披露了位于移动终端管理器 (EPMM) 中的两个严重漏洞CVE-2026-1281和CVE-2026-1340，它们已遭在野利用。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
这两个漏洞都是代码注入漏洞，CVSS评分均为9.8，可导致远程攻击者无需身份验证就能在易受攻击设备上执行任意代码。Ivanti 公司提醒称，“在披露时发现数量有限的客户解决方案遭利用”。Ivanti 已发布RPM脚本，缓解受影响 EPMM 版本中的漏洞：  
  
- 对于EPMM版本12.5.0.x、12.6.0.x和12.7.0.x，应使用 RPM 12.x.0.x。  
  
- 对于EPMM版本12.5.1.0和12.6.1.0，应使用RPM 12.x.1.x。  
  
  
  
Ivanti 公司表示，应用这些补丁无需停机且不会对功能造成影响，因此强烈建议尽快安装。不过该公司提醒称热修复方案无法通过版本更新，因此在永久性补丁推出前升级的设备必须重新应用补丁。  
  
这两个漏洞将在 EPMM 12.8.0.0 中永久修复，该版本将在2026年第一季度发布。Ivanti 公司表示成功利用这两个漏洞可导致攻击者在 EPMM 设备上执行任意代码，导致攻击者访问存储在平台上的大量信息如管理员和用户姓名、用户名、邮件地址；关于移动管理设备的信息如电话号码、IP地址、已安装应用；以及设备标识符如 IMEI和MAC地址。  
  
如启用位置追踪功能，则攻击者还可访问设备位置数据如 GPS 坐标和最近的塔台位置。Ivanti 公司提醒称攻击者还可使用 EPMM API 或 web 控制台修改设备配置如认证设置。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ53CAkHp6vGb3PQDm605nl0xkWQDvUXZciaveynQXZia8s4XdicVGh55HhKZZgCbQvGicJDPhQqXalKg/640?wx_fmt=gif&from=appmsg "")  
  
**已遭活跃利用的 0day 漏洞**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ53CAkHp6vGb3PQDm605nl0xkWQDvUXZciaveynQXZia8s4XdicVGh55HhKZZgCbQvGicJDPhQqXalKg/640?wx_fmt=gif&from=appmsg "")  
  
  
  
Ivanti 公司发布安全公告提到，这两个0day漏洞已遭利用，但由于受影响的客户数量少，因此并没有可靠的入侵指标。不过，该公司已发布检测利用和利用后行为的技术指南供管理员使用。  
  
Ivanti 公司表示，这两个漏洞可通过“内部应用程序分发” 和 “Android 文件传输配置”功能触发，利用尝试或成功利用会出现在在 Apache 访问日志 /var/log/httpd/https-access_log中。  
  
为了帮助防御人员识别可疑活动，Ivanti 公司提供了可用于查找访问日志中利用活动的正则表达式：  
  
^(?!127\.0\.0\.1:\d+ .*$).*?\/mifs\/c\/(aft|app)store\/fob\/.*?404  
  
该表达式将列出匹配针对易受攻击端点的、返回 404 HTTP 响应代码的外部请求（非本地主机流量）的日志条目。Ivanti 公司提到，这些端点的合法请求一般会返回 HTTP 200 响应。而不管成功与否的利用尝试都会返回404错误，因此这些条目成为设备已被针对的强烈指标。  
  
不过，Ivanti 公司提醒称，一旦设备遭攻陷，攻击者可修改或删除日志以隐藏其活动。如果存在设备外日志，则应该审计这些日志。如果怀疑设备遭攻陷，Ivanti 公司不建议管理员清理系统，而是在利用发生前或从已知非恶意的备份中恢复 EPMM，或者重建该设备并将设备迁移到一个新系统。  
  
恢复系统后，Ivanti 公司建议执行如下操作：  
  
- 重置任何本地 EPMM 账户的密码。  
  
- 重置 LDAP 的密码以及/或执行查询的 KDC 服务账户。  
  
- 撤销和替换用于EPMM 的公共证书。  
  
- 为配置了 EPMM 解决方案的其它内部或外部服务账户重置密码。  
  
  
  
虽然这两个漏洞仅影响 EPMM，但 Ivanti 公司建议同时审计 Sentry 日志。Ivanti 公司在分析指南中提到，“虽然 EPMM 可被限制到隔离区中，对企业其它网络的访问权限很少或没有，但 Sentry 专为从移动设备将特定的流量类型隧道传输到内部网络资产而设定。如果怀疑 EPMM 设备受影响，则建议查看 Sentry 可访问、以实施侦查或横向移动的系统。”  
  
美国网络安全和基础设施安全局 (CISA) 已将 CVE-2025-1281 纳入 KEV 清单，说明该漏洞已遭活跃利用。CISA 要求联邦民事机构在2026年2月1日前应用厂商缓解措施或停止使用易受攻击系统。目前尚不清楚CISA为何未将另外一个漏洞纳入KEV的原因。去年9月份，CISA 发布关于牵涉利用 Ivanti 另外两个 0day 漏洞的恶意软件包分析文章，这两个漏洞已于2025年5月修复，但此前也曾用于 0day 攻击活动中。  
  
  
****  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
[Ivanti Workspace Control硬编码密钥漏洞暴露 SQL 凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523260&idx=2&sn=ea145b27a636bc95e9cf0045e0f89d03&scene=21#wechat_redirect)  
  
  
[Ivanti 修复已用于代码执行攻击中的两个 EPMM 0day 漏洞，与开源库有关](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247523008&idx=1&sn=12a019a9d94970b49208b306f026f931&scene=21#wechat_redirect)  
  
  
[Ivanti 修复 Connect Secure & Policy Secure 中的三个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522224&idx=1&sn=671c73813c868c4819c48a9b54ab1b8c&scene=21#wechat_redirect)  
  
  
[Ivanti修复Endpoint Manager中的多个严重漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522089&idx=1&sn=a04239b89ce2032e8e28b49d05782135&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/ivanti-warns-of-two-epmm-flaws-exploited-in-zero-day-attacks/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
