---
source: "wy876 漏洞文库"
title: "成都信通网易PACS Show_Jcbg_Ysz姓名反射XSS声称"
product: "成都信通网易PACS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，浏览器/CSP条件"
prerequisites: "是否需登录未知；需访问查询结果"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qno6ghgn37fbk4dg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%88%90%E9%83%BD%E4%BF%A1%E9%80%9A%E7%BD%91%E6%98%93%E5%8C%BB%E7%96%97%E7%A7%91%E6%8A%80%E5%8F%91%E5%B1%95%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%88%90%E9%83%BD%E4%BF%A1%E9%80%9A%E7%BD%91%E6%98%93%E5%8C%BB%E7%96%97%E7%A7%91%E6%8A%80%E5%8F%91%E5%B1%95%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8PACS%28%E5%8C%BB%E5%AD%A6%E5%BD%B1%E5%83%8F%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%29%E5%AD%98%E5%9C%A8XSS%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%BC%8F%E6%B4%9E.md"
id: "vw-b1e5f6afd998955d79e0f5c6"
entity_id: "ve-b1e5f6afd998955d79e0f5c6"
schema_version: "1"
---

# 成都信通网易PACS Show_Jcbg_Ysz姓名反射XSS声称

## 条目说明

- 对象与具体问题：成都信通网易PACS；Show_Jcbg_Ysz姓名反射XSS声称
- 版本、配置及部署条件：版本未知，浏览器/CSP条件
- 认证与权限前提：是否需登录未知；需访问查询结果
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有payload与UI位置，但无实际字段名/HTTP/HTML输出上下文，成功触发后为空
- 查询当次触发更像反射型，应确认是否持久存储再分类
- 不应把公开查询和XSS合并一个发现
- 补编码/响应/版本与修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
成都信通网易医疗科技发展有限公司总部位于四川成都高新区天府软件园，在国内医疗软件行业中率先采用Java技术，融入国际国内标准，整体设计，持续研发，先后形成了“智慧云医院信息平台”、“医共体信息平台”、“互联网医院平台”、“医养融合信息平台”等新一代一系列自主知识产权产品，全面覆盖了单体医院业务、区域医疗、医共体、“互联网+健康”等信息化建设领域。成都信通网易医疗科技发展有限公司PACS(医学影像信息管理系统)存在XSS跨站脚本漏洞。

## 二、影响版本
+ 成都信通网易医疗科技发展有限公司PACS(医学影像信息管理系统)

## 三、特征


## 四、漏洞复现
漏洞位置

```plain
/JcbgForYsz/Show_Jcbg_Ysz.asp
```

1. 在姓名处插入如下payload：`test"><script>alert("XSS")</script>`


2. 点击查询，成功触发：


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qno6ghgn37fbk4dg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
