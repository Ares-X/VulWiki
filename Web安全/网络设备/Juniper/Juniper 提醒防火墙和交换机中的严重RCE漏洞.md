---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-2ee7f1880a4341fa5626f92f"
entity_id: "ve-2ee7f1880a4341fa5626f92f"
schema_version: "1"
title: "Juniper 提醒注意防火墙和交换机中的严重RCE漏洞"
product: "Juniper SRX/EX J-Web"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-21591"
referenced_identifiers: "CVE-2023-36844; CVE-2023-36845; CVE-2023-36846; CVE-2023-36847"
prerequisites: "预认证内存破坏RCE/DoS，管理J-Web可达；完整修复分支表"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Juniper/Juniper%20%E6%8F%90%E9%86%92%E9%98%B2%E7%81%AB%E5%A2%99%E5%92%8C%E4%BA%A4%E6%8D%A2%E6%9C%BA%E4%B8%AD%E7%9A%84%E4%B8%A5%E9%87%8DRCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Juniper 提醒注意防火墙和交换机中的严重RCE漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Juniper SRX/EX J-Web
- 本文讨论：CVE-2024-21591
- 版本、权限与配置前提：预认证内存破坏RCE/DoS，管理J-Web可达；完整修复分支表
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 旧四漏洞链被描述为四个都组合利用，需要核验不同平台配对而非强制四洞
- 8200/9000为暴露数不是已确认21591漏洞数
- 无官方公告直链，年份需从2024新闻推回2023事件

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 旧链CVE配对与当前公告范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Sergiu Gatlan  代码卫士   2024-01-15 17:33  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Juniper Networks 公司发布安全更新，修复了位于 SRX 系列防火墙和EX系列交换机中的一个严重的预认证RCE漏洞 CVE-2024-21591。**  
  
  
该漏洞位于设备的 J-Web 配置接口中，可被未认证攻击者获得根权限或针对未修复设备发动拒绝服务攻击。在上周三的安全公告中，Juniper 公司提到，“该漏洞是因为使用一个不安全的函数造成的，可导致攻击者覆写任意内存。”Juniper 公司还提到安全事件响应团队未发现该漏洞已遭在野利用。  
  
易受该漏洞攻击的 Junos OS 版本如下：  
  
- 20.4R3-S9之前的Junos OS 版本  
  
- 21.2R3-S7之前的Junos OS 21.2版本  
  
- 21.3R3-S5之前的Junos OS 21.3 版本  
  
- 21.4R3-S5之前的Junos OS 21.4 版本  
  
- 22.1R3-S4之前的Junos OS 22.1版本  
  
- 22.2R3-S3之前的Junos OS 22.2版本  
  
- 22.3R3-S2之前的Junos OS 22.3版本  
  
- 22.4R2-S2, 22.4R3之前的Junos OS 22.4版本  
  
  
  
该漏洞已在 Junos OS 20.4R3-S9、21.2R3-S7、21.3R3-S5、21.4R3-S5、22.1R3-S4、22.2R3-S3、22.3R3-S2、22.4R2-S2、22.4R3、23.2R1-S1、23.2R2和23.4R1版本中修复。  
  
建议管理员立即应用这些安全更新或将JunOS 升级至最新版本，或者至少禁用 J-Web 几口删除该攻击向量。  
  
另外一个临时缓解措施是，将 J-Web 访问权限仅限于可信的网络主机，等待补丁部署。  
  
非盈利性互联网安全组织机构 Shadowserver 指出，超过8200台 Juniper 设备已将 J-Web 接口暴露在网络，多数源自韩国（Shodan 显示超过9000台）。  
  
11月，CISA 提醒称 Juniper预认证RCE漏洞已遭在野利用。该exploit 组合利用了四个漏洞CVE-2023-36844、CVE-2023-36845、CVE-2023-36846和CVE-2023-36847，影响该公司的 SRX 防火墙和 EX 交换机。  
  
8月25日，ShadowServer 检测到首次利用尝试，而在此之前的一个月，Juniper 发布补丁且该就在watchTower Labs 发布 PoC 利用后不久。9月份，漏洞情报公司 VulnCheck 发现数千台 Juniper 设备仍然易受该利用链攻击。CISA在11月17日将这四个漏洞列入必修清单，将其标记为“恶意网络人员常用的攻击向量，对联邦企业具有重大风险”。去年6月，CISA 还发布BOD，要求联邦机构在两周的漏洞窗口期内，修复被暴露的或配置不当的网络设备（如 Juniper 防火墙和交换机）。  
  
****  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CISA 提醒注意已遭活跃利用的 Juniper 预认证 RCE 利用链](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247518122&idx=1&sn=d6b5a20e45ee8897ed249a7bdde21ebb&chksm=ea94b6c0dde33fd6d3d93c996ad772d6f9f1d4744294db1c793f9f4cd69798f6515ac436fa3c&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复Junos OS中的30多个漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517894&idx=2&sn=dfa23961cb9b4c490ab70b8e96d111c7&chksm=ea94b7acdde33ebaab16086f440a9e1bced5c6e4ff4629c4650ec7c2900ac81edeec34946ada&scene=21#wechat_redirect)  
  
  
[上万台 Juniper 设备易受未认证RCE漏洞攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517693&idx=3&sn=cf7aebe9fc74cea2001da86238add0cb&chksm=ea94b497dde33d81e53986ae709bb0281448e059268e057b632beb1f3589b7d6b28b9dc32158&scene=21#wechat_redirect)  
  
  
[速修复！Juniper Junos OS 漏洞使设备易受攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517407&idx=1&sn=05e2d2e97807df0ba39c7ef3ac5d51bf&chksm=ea94b5b5dde33ca35b8400aefa41a5828e3b415b6b156f9d119ed338b388bad433656c88fedf&scene=21#wechat_redirect)  
  
  
[Juniper Networks 修复多个严重的第三方组件漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516252&idx=2&sn=546ab537a158f4562912d5ce5c76c6ac&chksm=ea94b136dde338205c6567186607ee7781fff2af825518c69732f7f401efd9705272298cb50f&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/juniper-warns-of-critical-rce-bug-in-its-firewalls-and-switches/  
  
  
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
