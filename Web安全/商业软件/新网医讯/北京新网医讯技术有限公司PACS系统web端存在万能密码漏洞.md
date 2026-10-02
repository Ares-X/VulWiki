---
source: "wy876 漏洞文库"
title: "新网医讯PACS Web SQL万能密码导致登录绕过声称"
product: "新网医讯PACS Web"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，数据库/查询结构未知"
prerequisites: "登录前输入"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kxcuo6orgybzgrau"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF/%E5%8C%97%E4%BA%AC%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8PACS%E7%B3%BB%E7%BB%9Fweb%E7%AB%AF%E5%AD%98%E5%9C%A8%E4%B8%87%E8%83%BD%E5%AF%86%E7%A0%81%E6%BC%8F%E6%B4%9E.md"
id: "vw-013b7a5c80dab870d98c2701"
entity_id: "ve-013b7a5c80dab870d98c2701"
schema_version: "1"
---

# 新网医讯PACS Web SQL万能密码导致登录绕过声称

## 条目说明

- 对象与具体问题：新网医讯PACS Web；SQL万能密码导致登录绕过声称
- 版本、配置及部署条件：版本未知，数据库/查询结构未知
- 认证与权限前提：登录前输入
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 属于SQL注入认证绕过变体不是通用密码，标题应规范
- 用户名admin假设与OR选择首账号权限未证，不能直接说后台全权
- 缺修复/原始研究来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
北京新网医讯技术有限公司，公司成立于2000年3月，注册于北京中关村科技园，为国家高新技术企业和中关村高新技术企业（简称为“双高企业”），公司作为软件企业，成为北京软件和信息服务业协会会员。公司专业从事PACS(图像存储与传输系统)和RIS（放射科信息管理系统）的研究、开发工作。北京新网医讯技术有限公司PACS系统web端存在万能密码漏洞，攻击者可通过该漏洞绕过身份认证进入系统后台。

## 二、影响版本
+ 北京新网医讯技术有限公司PACS系统web端

## 三、特征/


## 四、漏洞复现
```plain
用户名：admin' or '1'='1' --+   
密码：任意
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kxcuo6orgybzgrau>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
