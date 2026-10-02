---
source: "gelusus/wxvl 公众号漏洞文库"
product: "ManageEngine Password Manager Pro / PAM360 / Access Manager Plus"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2022-47523"
referenced_identifiers: "CVE-2022-35405; CVE-2020-10189"
identifier_role: "primary"
identifier_status: "unknown"
title: "Zoho：立即修复这个严重的ManageEngine漏洞！"
prerequisites: "来源所述条件，未列明部分仍待核：没有各产品受影响/修复build，只称最新"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-67816536dd495bc6e4d1130b"
entity_id: "ve-67816536dd495bc6e4d1130b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：没有各产品受影响/修复build，只称最新

代码与实验材料：无PoC，属于2023-01-05历史通告

来源证据范围：BleepingComputer原文，缺官方多产品公告

- **事实待核（1）**：修复无法落地到产品build；依据：三种产品无版本矩阵，仅最新build；不能用厂商名替代产品实体。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：时间线错误；依据：2023年1月文章写“今年9月份”发生的35405事件，应核实指2022年。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：主CVE未元数据，旧漏洞仅背景；依据：frontmatter无47523；35405和推荐10189应为引用，不应自动认同一漏洞在野状态。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Zoho：立即修复这个严重的ManageEngine漏洞！   
Sergiu Gatlan  代码卫士   2023-01-05 18:13  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**Zoho 督促客户修复影响多款ManageEngine产品的一个严重漏洞。本周一，Zoho 公司提醒称，“该安全公告是为了告知大家，我们检测到了一个严重的安全漏洞。”**  
  
  
  
该漏洞的编号是CVE-2022-47523，是位于Password Manager Pro 安全密码管理器PAM360特权权限管理软件和Access Manager Plus特权会话管理解决方案中的一个SQL注入漏洞。该漏洞如遭成功利用，可导致攻击者对后台数据库具有未认证访问权限，并导致他们执行自定义查询，访问数据库表条目。  
  
Zoho 公司指出，“我们在内部框架中发现一个SQL注入漏洞（CVE-2022-47523），可导致所有用户获得对后台数据库的未认证访问权限。”该公司还提到，“鉴于该漏洞的严重性，强烈建议客户立即升级至PAM360、Password Manager Pro和Access Manager Plus的最新build版本。”  
  
Zoho 公司表示，上个月通过逃逸特殊字符和增加恰当验证的方式修复了该漏洞。要更新安装，需要受陷下载产品最新版本。接着是根据每个产品Upgrade Pack页面上的可用升级指令，部署最新build。  
  
今年9月份，CISA提醒称另外一个ManageEngine 严重漏洞（CVE-2022-35405）已遭在野利用，用于获得运行PAM360、Access Manger Plus和Password Manager Pro的未修复服务器上的远程代码执行权限。  
  
美国联邦民事行政部门 (FCEB)机构有三个月的时间修复这些易受攻击的系统并确保网络不受利用尝试困扰。  
  
Zoho ManageEngine 服务器近年来一直遭受攻击，例如，Desktop Central 实例被黑，自2020年7月起，受陷组织机构网络的访问权限就在黑客论坛上出售。在2021年8月至10月期间，国家黑客组织被指攻击ManageEngine服务器。为了应对大规模的攻击情况，FBI和CISA联合发布两份安全公告，提醒注意国家黑客组织利用ManageEngine 漏洞在关键基础设施组织机构网络中安装后门。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[CISA提醒修复Zoho ManageEngine RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514082&idx=2&sn=a353a69d6d2c5a3f065ae133b67f4256&chksm=ea948688dde30f9e50183652d6391b23fd17af36c96c1ebcf3a7f40b0034288e9a22f16cbcd8&scene=21#wechat_redirect)  
  
  
[Zoho：尽快修复已遭利用的 ManageEngine 严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509574&idx=1&sn=4087ce0dae2fc5f7466509361bc75784&chksm=ea94972cdde31e3a15e2a7fe2d009f93789638cd6b891a8e91b22cbee7676592795119f0ebd8&scene=21#wechat_redirect)  
  
  
[FireEye红队失窃工具大揭秘之：分析复现Zoho ManageEngine RCE (CVE-2020-10189)](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499078&idx=1&sn=2d07caa663bb17250a5d4d858c1fcd71&chksm=ea94cc2cdde3453a3afe795878114bb9cd5177d68024846d7b633a0fa8ad80611e92c4931ecd&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/zoho-urges-admins-to-patch-critical-manageengine-bug-immediately/  
  
  
题图：  
Pexels License  
  
‍  
  
  
  
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
