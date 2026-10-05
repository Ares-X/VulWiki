---
source: "gelusus/wxvl 公众号漏洞文库"
title: "用友NC expertschedule pkevalset SQL 注入线索"
product: "用友NC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8BNC%20pkevalset%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-807d6053285630310d711d6d"
entity_id: "ve-807d6053285630310d711d6d"
schema_version: "1"
---

# 用友NC expertschedule pkevalset SQL 注入线索

## 条目说明

- 对象与具体问题：用友NC；expertschedule pkevalset SQLi线索
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有正常URL和sqlmap口号，实际载荷与结果全在未视检图片
- 大量dddd付费圈广告远超漏洞内容，删除营销和购买指引

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

安全艺术
                    安全艺术  安全艺术   2026-01-19 04:01  
  
```
GET /ebvp/expeval/expertschedule;1.jpg?pkevalset=1
```  
  
![](../../.resource/remote/17e742857be75f02ef6a6150b8ba83f821a26ebefbf8c82a1952246d3a1a7706.png "")  
  
然后直接sqlmap一把梭就行  
  
![](../../.resource/remote/607ec9fa1488660629b01b0443abd65ffdde39baedb8c823a8d874f2514bfaab.png "")  
  
安艺圈上线，感兴趣的师傅可以了解下哈  
  
圈主介绍：  
  
十年安全行业工作经验，多年攻防渗透和SRC挖掘经验，分享漏洞利用思路、工具和案例等，dddd实战版优化来源于近两年攻防实战，多次护网中斩获上万分记录。  
  
知识库所有内容全部由圈主独自维护，严禁用于任何未授权扫描测试哈。  
## 1. dddd维护  
  
**选择这个工具的最重要的原因就是支持先识别指纹，然后根据指纹去扫描对应POC，扫描效率很高。**  
### 1.1. 指纹POC  
  
集成指纹、POC和workflow和POC优化（纯体力活，误报太多，陆陆续续维护2年了），目前指纹数据: 11219 条，漏洞POC: 4710 条，workflow：3504条，目前应该是市面上集成力度最大的了。  
  
![](../../.resource/remote/7526e55141e94876ef18d8ab1595302ebf9fc8ac4ffebe393cc29e6d92af9c22.png "")  
  
![](../../.resource/remote/75255c68b1f9f1086ae2ca99b0c9349fa11636082c0b225fa4b1d6fe911d2ed4.png "")  
  
![](../../.resource/remote/ce9bbfdf836ac39f88bf97c14d5c309910b84bf5b0c6923eb068afd6b4d41f19.png "")  
### 1.2. 目录扫描  
  
这块主要是针对SRC挖掘和HVV项目中碰到的比较多的需要路径信息的指纹进行补充的，新增了很多发现频率非常高的springboot相关的接口信息，并通过指纹信息精准匹配，基本扫到就可以进一步利用。  
  
![](../../.resource/remote/2df11c0c237d46d2cf4f809ed95ea8b346f7303c399bc28231038119f1cdab94.jpg "")  
### 1.3. 指纹高亮  
  
这是来自师傅们提的需求，网站指纹识别输出，原版是统一输出的，没有任何区别，改版后新增了重点指纹（SRC和HVV漏洞高爆发点）高亮显示。  
  
![](../../.resource/remote/2df11c0c237d46d2cf4f809ed95ea8b346f7303c399bc28231038119f1cdab94.jpg "")  
### 1.4. 蜜罐排除  
  
思路很简单，指纹识别超过10个默认是蜜罐，不进行任何扫描。  
  
![](../../.resource/remote/a1591bcb8e96160fe919c284701531453b4dec572823579de9500f285ec77f0a.jpg "")  
  
其它死锁等bug修复。  
  
![](../../.resource/remote/e898e2662e8f85029a05d805f791dfbb965e88bbf832fabf3567f97760eb1022.jpg "")  
## 2. 知识库维护  
### 2.1. JAVA代码审计  
  
自费999元跟班上课学习记录从0到1完整版。  
  
![](../../.resource/remote/007ccf3fec42586566c7b6f02e1ddbc226b396d66721212d0b1257e883944c98.png "")  
  
![](../../.resource/remote/404737507ba40fda6c04008871cec4e3709dccf22a5f86785f673b19952676c2.png "")  
  
![](../../.resource/remote/6cc1f418e3ba7be4c72e7f7ffe23c8117705a6a3a9db3bddf372379c8572f71a.png "")  
### 2.2. Nday漏洞POC  
  
各种渠道收集整理的POC，公开的和非公开的等等。  
  
![](../../.resource/remote/a9639e5aa558d78cb8adb53dcb8790ab02e31ba4932dc709b2730efc80e4a737.png "")  
### 2.3. dddd更新记录  
  
![](../../.resource/remote/53a71b23b3473a7d1cdf354241fed7d98df30f4621827c19d92e07e358e6ef85.png "")  
  
![](../../.resource/remote/7b894115947555f8350e69ccf3bb34d87795ac27c1177686c86e760921318e72.png "")  
  
![](../../.resource/remote/65f7e0d550ace91086892e6065f2b8eaa672236688a499723bf95a926f5807c4.png "")  
  
![](../../.resource/remote/fd040611c363c90f27488c6785b60e6c3af29f8a33752ba63f1264170fe3a0e2.png "")  
  
![](../../.resource/remote/2b2439a523691567c275fd37a1a3841364f52db18daf7e57e31dee9077a584df.png "")  
  
![](../../.resource/remote/cbb32a646ef9a92a716ddcf0de622fd710ba11cb3fc6c37fbf4eccdae43fca0c.png "")  
### 2.4. SRC实战记录  
  
个人SRC实战案例，案例来源猎聘、蔚来汽车、WPS、自如、龙湖、货拉拉、讯飞等SRC。  
  
![](../../.resource/remote/a4a8d5f03a074f1260f91d9654c164ab36f941e94b9d7d1efaf953d5e55521a9.png "")  
  
![](../../.resource/remote/cb4cf881fc485572bcb6553604b163519f528f2fe0dc778c4e6bbd44ce6241fc.png "")  
  
![](../../.resource/remote/b39d22705cc67da78152220d97bdb960f01e58abc9e4137e4775a018f4ce6351.png "")  
  
![](../../.resource/remote/45c50de8f6d5a5a728daf91264a7b3f7d5ce75a3267d1f605c7f8125e3145887.png "")  
  
![](../../.resource/remote/833126c07588e17eb51a6b9a230498026c595020883283e19d54d40eb23d777e.png "")  
  
![](../../.resource/remote/960b6b4a1c6822d7d2571e8c270c48eaa21dc36c142c01780c8e508bd33bd6f2.png "")  
### 2.5. 漏洞利用手册  
  
高频漏洞深入利用方式整理总结，附带工具和案例。  
  
![](../../.resource/remote/a9fc3616f6fbdb23e77dcbc7f3f6f6501c3992d61346cf0d290cb3a659465b4a.png "")  
  
![](../../.resource/remote/f4fbbb7c52a7fe5c1c12cbebe2c8ef58fe83cb19ae687c45c1968b4819c4c3a4.png "")  
  
![](../../.resource/remote/b95f184517046d1eb7a449e40b05a93ea934c6768835300e0284e6f5b08a969c.png "")  
  
![](../../.resource/remote/3f50d650a1845c23f395243183b0d671fc00c66a8f3496f403a9f8dce6e0ba1e.png "")  
  
![](../../.resource/remote/cd9b57e0fb978c0fc7d01144f1be9a9eab403d4f2e41d71a85abf1e1d402abf5.png "")  
  
![](../../.resource/remote/5e1c93f6b09fa1c0a1c6459bc393ff4f851e8bb7e571c0ceaf35f9702f93053c.png "")  
### 2.6. 实战技巧总结  
  
SRC、CNVD和HVV快速挖洞思路整理，附带实战案例。  
  
![](../../.resource/remote/e965dd39619e195f9611d06a64b621140bb9c6c2869d7280f04c25fdf9e7b256.png "")  
  
![](../../.resource/remote/c1ca242898b4385fb2a850aec97a61e27ffc473bfea048d910259454da706275.png "")  
  
![](../../.resource/remote/980e1c7f8433697b6bfaba31e68f5004c51ada6df9a27b1aad4d9f81e831b667.png "")  
  
![](../../.resource/remote/a3c0de91cf37e06f64de5ef8e19e4566ad9a464ef02ceea1bbd0b3780e1fd3ce.png "")  
### 2.7. 工具插件字典  
  
![](../../.resource/remote/f1dd8181b3df02a4b41e18b5e69b17cef949e1f7e68d2d86922dda73227b104f.png "")  
## 3. 加入安艺圈  
### 3.1. 微信用户  
  
安艺圈目前提供如下服务：  
  
•套餐一：dddd实战优化版：一年200（dddd**每人限1个激活码，激活前请选好常用电脑**  
）；  
  
•套餐二：dddd实战优化版+安艺圈知识库：一年500。  
  
有意向的师傅可以加微信购买哈，**加好友需要****备注dddd或者进圈****，否则不允通过哈。**  
  
![](../../.resource/remote/f1e44312fcafbed524e3cdfb003caaace51d5663c5cc102bd101256333424b3a.jpg "")  
### 3.2. 纷传老用户  
  
登录纷传小程序或者APP中，点击"设置"进入设置界面进行截图，将设置截图和dddd运行截图通过微信发给我获取激活码。（dddd**每人限1个激活码，激活前请选好常用电脑**  
）  
  
![](../../.resource/remote/9dd66d7e84175338bd9b11b7e4f768daea5329f8d36b8b030f20f5fc72ea6019.png "")  
![](../../.resource/remote/5bb8ad67cbd5703173ebee99811c11e7741ce2eb14c59bca121f07468579ac90.png "")  
  
![](../../.resource/remote/e888c8db2a77dee674a9c7560ed4cfe4ffb15fc495b5bdee38484d47be28f103.png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
