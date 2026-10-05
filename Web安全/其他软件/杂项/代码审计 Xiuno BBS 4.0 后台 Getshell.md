---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "代码审计 Xiuno BBS 4.0 后台 Getshell"
product: "Xiuno BBS yb_qiniu插件"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "管理员安装配置权限前提；最新4.04为当时状态且插件版本缺失"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1%20Xiuno%20BBS%204.0%20%E5%90%8E%E5%8F%B0%20Getshell.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://tieba.baidu.com/p/6335255457"
id: "vw-6b7f23a81ad274afd5d632c7"
entity_id: "ve-6b7f23a81ad274afd5d632c7"
schema_version: "1"
---

# 代码审计 Xiuno BBS 4.0 后台 Getshell

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Xiuno BBS yb_qiniu插件
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：管理员安装配置权限前提；最新4.04为当时状态且插件版本缺失
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 漏洞在需额外安装的七牛插件非Xiuno核心默认
2. 管理员安装配置权限前提
3. 标题代码审计但无写配置源码，截图示例只phpinfo
4. 最新4.04为当时状态且插件版本缺失
5. 百度跳转链接不适合作为本地PoC URL
6. 贴吧评论/折叠UI/招揽入侵广告完全混入需清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://tieba.baidu.com/p/6335255457>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [tieba.baidu.com](https://tieba.baidu.com/p/6335255457)  ![](../../.resource/remote/d6332e36edc9d5824d5e8f416c6f813ad81afece07e56173cef5b0996771038b.jpg) 述心事 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 前言  
这只是最基础的审计 写给新手看的 大牛略过.  
Xiuno BBS 4.0 是一款轻论坛产品，前端基于 BootStrap 4.0、JQuery 3，后端基于 PHP/7 MySQL XCache/Yac/Redis/Memcached…  
自适应手机、平板、PC，有着非常方便的插件机制，不仅仅是一个轻论坛，还是一个良好的二次开发平台。  
本想把前台的洞也发出来 但是利用方法有点偏激 所以只写后台 漏洞影响至最新 4.04 版本  
正文  
进入后台 - 插件 - 下载七牛云存储 下载安装完成 如下图  
![](../../.resource/remote/1698443f741a592a954aea4826184fd01cad3f1167f6d7a6a3d74ee3c5856609.jpg)  
随后 随便在一个配置里面插入 ',phpinfo(),//  
![](../../.resource/remote/2c0b44967be443476fdf6909eadc34f2de5ac73d0d2fea65fa145c55ba5345e5.jpg)  
随即访问  
[http://127.0.0.1//plugin/yb_qiniu/config.php](http://jump.bdimg.com/safecheck/index?url=x+Z5mMbGPAuCJCoZ31dwW/9CofsaX5eYOAv3k8AYmsS8oV+3HJDiO5nfgkn1ZhunPF4xANXDJm1bgiBqBFBQVPQy+yY5nLDx8ABfLdFOQyeyZG5qiFoc/kV9rUiyZGcj0jYg0V0HCkiDq+boZdLIfXY9qHh6BM0y)  
![](../../.resource/remote/d40ef626f1e9c7e89fb3976978241196b6cc32e20dee9a57de6310702bb17c9b.jpg)  
热爱安全的人进群一起交流 : 170399510  
个人博客：[https://www.safeinfo.me](http://jump.bdimg.com/safecheck/index?url=rN3wPs8te/pL4AOY0zAwh0Y7aNbhkQyyUvOEAWYx0K/YWDardTxEjQ2Ge3/si5ZpddvTT9Uwngo6visWv5P2z/LchlNxeoxeWNSuxPkLHGTKq8EYKcRO9DA8Zu4mdgY0)![](../../.resource/remote/d6332e36edc9d5824d5e8f416c6f813ad81afece07e56173cef5b0996771038b.jpg)述心事 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 这吧怎么人这么少了![](../../.resource/remote/5e35fb45daf25533a443fc4facbb4e9842814f3636edfeec410d3ca1f6f521a7.jpg)飞飞不帅 9 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 插件漏洞，取得 getshell 后可以尝试利用，和之前的 asp 后台代码注入一样。继续加油，![](../../.resource/remote/561062b7cd916bbf98bd06f0d5d0312fee4c77fd11150f09eb72f00422a5be14.jpg)他好像条狗 T 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 标题写的代码审计，*** 好歹也贴一下写配置文件的代码啊。。。这种帖还给加精了？![](../../.resource/remote/30ec9a1a156c95de365ae49e4deb0cf73c214c9c64deb4b68e7726f4997a9986.jpg)贴吧用户_06PK3KV 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 我惊了，![](../../.resource/remote/30ec9a1a156c95de365ae49e4deb0cf73c214c9c64deb4b68e7726f4997a9986.jpg)渡劫 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 搜不到群啊![](../../.resource/remote/3e46576f159ba41c7f3c256284d5de11c5efdeab3411e196eda137fed98f8b24.jpg)中流砥柱 89 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 牛逼![](../../.resource/remote/5e35fb45daf25533a443fc4facbb4e9842814f3636edfeec410d3ca1f6f521a7.jpg)lin5518212 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 找人拿站一个单子最低几十万，定金勿扰。加 q1143919606![](../../.resource/remote/30ec9a1a156c95de365ae49e4deb0cf73c214c9c64deb4b68e7726f4997a9986.jpg)念秋叶 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 群没了…![](../../.resource/remote/30ec9a1a156c95de365ae49e4deb0cf73c214c9c64deb4b68e7726f4997a9986.jpg)时光大柠檬 该楼层疑似违规已被系统折叠 [隐藏此楼](###)[查看此楼](###) 楼主您好 请问您还在吗

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
