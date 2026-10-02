---
source: "MrWQ/vulnerability-paper"
title: "用友NC BshServlet暴露远程代码执行"
product: "用友NC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列具体版"
prerequisites: "未明确，路由开放声称"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/FvqC1I_G14AEQNztU0zn8A"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B%20NC%20bsh-servlet-BshServlet%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"1085941792\""
fofa_unverified: "icon_hash="
id: "vw-e36aac3451ca81b1978572a9"
entity_id: "ve-e36aac3451ca81b1978572a9"
schema_version: "1"
---

# 用友NC BshServlet暴露远程代码执行

## 条目说明

- 对象与具体问题：用友NC；BshServlet暴露RCE
- 版本、配置及部署条件：未列具体版
- 认证与权限前提：未明确，路由开放声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA icon_hash=截断，元数据影响太泛
- 同源补丁和NC6.5可关联但不盲目扩全NC

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/FvqC1I_G14AEQNztU0zn8A)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**用友 NC bsh.servlet.BshServlet 存在远程命令执行漏洞，通过 BeanShell 执行远程命令获取服务器权限**

**二:  漏洞影响🐇**

**用友 NC**

**三:  漏洞复现🐋**

```
FOFA: icon_hash="1085941792"
```

**访问页面如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4lnhQIaJmttclv4dRBhmx5OXia3OuCBZ8K5Vgfdh8T5Q5RJvwsYAv7QJlGHFV8tLCLGyV7nzR8PFg/640?wx_fmt=png)

**漏洞 Url 为**

```
/servlet/~ic/bsh.servlet.BshServlet
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4lnhQIaJmttclv4dRBhmx53yfqX114sCTNAicMiafQvRnsibyJOviaDp4fFONZj6elbcPQgFhsOVlNAw/640?wx_fmt=png)

 ****四:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

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

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
