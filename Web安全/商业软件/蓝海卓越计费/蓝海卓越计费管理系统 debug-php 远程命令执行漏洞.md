---
source: "MrWQ/vulnerability-paper"
title: "蓝海卓越计费管理系统 debug.php命令调试页面暴露"
product: "蓝海卓越计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，调试页访问控制未知"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/CVe7GSRzCKcYXj5Pj8W5SA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20debug-php%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-5b903adb4a65afcbe3faeb55"
entity_id: "ve-5b903adb4a65afcbe3faeb55"
schema_version: "1"
---

# 蓝海卓越计费管理系统 debug.php命令调试页面暴露

## 条目说明

- 对象与具体问题：蓝海卓越计费管理系统；debug.php命令调试页面暴露
- 版本、配置及部署条件：版本未知，调试页访问控制未知
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同527入口；源码、操作、证明全为未视检图，527有可读HTTP可互补
- POC指向仓库主页非具体不可变脚本，缺修复/版本
- 文库广告大量，保留作者/转载许可信息但清理宣传与重复图片

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/CVe7GSRzCKcYXj5Pj8W5SA)

![](../../.resource/remote/565dff06de2c0571aa8634353d3ee48f34e22060ed81ae34dbacca97a9237278.gif)

**![](../../.resource/remote/62ec45fc20ac500854a811a22154a8a90a49ed2e322f774d1e88a948bb94d039.png)**

**一****：漏洞描述🐑**

**蓝海卓越计费管理系统 debug.php 存在命令调试页面，导致攻击者可以远程命令执行**

**二:  漏洞影响🐇**

**蓝海卓越计费管理系统**

**三:  漏洞复现🐋**

```
title=="蓝海卓越计费管理系统"
```

**登录页面如下**

![](../../.resource/remote/0949981733059529b7e2f1679a9a36ab2191a4197fd9b87b4fc05e39b51cc624.png)

**漏洞代码**

![](../../.resource/remote/7f18015a403e85ab57e459170951c25076bf30afb12748119df751ed7eea9a86.png)

**访问 debug.php 页面 远程调试命令执行**  

![](../../.resource/remote/534ae71baf61ea78f504b680710451d049ce2d41228a0c1aa7fe0a8586b2dbf5.png)

 ****四:  漏洞 POC🦉****

```
https://github.com/PeiQi0/PeiQi-WIKI-POC
```

![](../../.resource/remote/496d9aaa9523d65e9bb903fbf7d1e6545816aeafe39cf535b100c59fa5908856.png)

 ****五:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](../../.resource/remote/b429b9cbd75e2cfd9120725a6fe2e76b51d832d671e09e333c40dae5e398356c.png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](../../.resource/remote/ccb7bc5ce7b30b8f99bdeba963cbbbc47267f787b2b78c5fe58adfbaa5f5a97c.png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
