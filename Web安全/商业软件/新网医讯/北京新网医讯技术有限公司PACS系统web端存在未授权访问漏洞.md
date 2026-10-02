---
source: "wy876 漏洞文库"
title: "新网医讯PACS Web ClinicList直接访问授权缺失声称"
product: "新网医讯PACS Web"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wgez6o568rpccb1f"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF/%E5%8C%97%E4%BA%AC%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8PACS%E7%B3%BB%E7%BB%9Fweb%E7%AB%AF%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
id: "vw-e58045a68921528c5c77e06d"
entity_id: "ve-e58045a68921528c5c77e06d"
schema_version: "1"
---

# 新网医讯PACS Web ClinicList直接访问授权缺失声称

## 条目说明

- 对象与具体问题：新网医讯PACS Web；ClinicList直接访问授权缺失声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有页面URL，无无会话响应或患者数据/管理功能证据，能打开页面不等于后台权限
- 与登录SQLi独立访问控制问题，保留关联不硬合并
- 补真正角色边界/修复版本，患者信息只给最小示例

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
北京新网医讯技术有限公司，公司成立于2000年3月，注册于北京中关村科技园，为国家高新技术企业和中关村高新技术企业（简称为“双高企业”），公司作为软件企业，成为北京软件和信息服务业协会会员。公司专业从事PACS(图像存储与传输系统)和RIS（放射科信息管理系统）的研究、开发工作。北京新网医讯技术有限公司PACS系统web端存在未授权访问漏洞，攻击者可通过该漏洞绕过身份认证进入系统后台。

## 二、影响版本
+ 北京新网医讯技术有限公司PACS系统web端

## 三、特征


## 四、漏洞复现
访问如下url可绕过身份认证直接进入系统后台

```plain
/ClinicList.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wgez6o568rpccb1f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
