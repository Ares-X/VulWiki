---
source: "wy876 漏洞文库"
title: "O2OA 默认凭证风险"
product: "O2OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本/首次安装配置限制"
prerequisites: "默认管理员登录"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gug1y1s89hg9zp3m"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/O2OA/%E5%85%B0%E5%BE%B7%E7%BD%91%E7%BB%9CO2OA%E5%AD%98%E5%9C%A8%E9%BB%98%E8%AE%A4%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
id: "vw-e140219a049361259a6e5932"
entity_id: "ve-e140219a049361259a6e5932"
schema_version: "1"
---

# O2OA 默认凭证风险

## 条目说明

- 对象与具体问题：O2OA；默认凭证风险
- 版本、配置及部署条件：无版本/首次安装配置限制
- 认证与权限前提：默认管理员登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅给xadmin/o2，缺登录端点、结果、版本、强制改密行为
- 应作为默认配置/弱口令条目而非暗示所有版本漏洞
- 可关联invoke/open风险链但非同漏洞

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
O2OA是一个基于J2EE分布式架构，集成移动办公、智能办公，支持私有化部署，自适应负载能力的，能够很大程度上节约企业软件开发成本的基于AGPL协议开放源代码的企业信息化系统需求定制开发平台解决方案。O2OA 存在默认口令漏洞

## 二、影响版本
+ O2OA 

## 三、资产测绘
```plain
app="兰德网络-O2OA"
```


## 四、漏洞复现
```http
xadmin/o2
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gug1y1s89hg9zp3m>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
