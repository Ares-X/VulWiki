---
source: "wy876 漏洞文库"
title: "妈妈宝盒/月子会所ERP部署 Page目录列表线索"
product: "妈妈宝盒/月子会所ERP部署"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，Web服务器配置"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ybopp6ucfh9lsdrz"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP%E7%AE%A1%E7%90%86%E4%BA%91%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa: "product=\"妈妈宝盒-ERP\""
id: "vw-81ea50ec11aa2053f2dda08f"
entity_id: "ve-81ea50ec11aa2053f2dda08f"
schema_version: "1"
---

# 妈妈宝盒/月子会所ERP部署 Page目录列表线索

## 条目说明

- 对象与具体问题：妈妈宝盒/月子会所ERP部署；Page目录列表线索
- 版本、配置及部署条件：无版本，Web服务器配置
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅/Page/ URL无../或可控路径，标题目录遍历更可能目录列出，应分类待证
- 无目录列表响应/敏感内容/鉴权对照
- 部署配置风险不能扩展全产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
月子会ERP管理云平台是由武汉金同方科技有限公司研发团队结合行业月子中心相关企业需求开发的一套综合性管理软件，管控月子中心经营过程中各个环节。武汉金同方科技月子会ERP管理云平台存在目录遍历漏洞，攻击者可利用该漏洞获取敏感信息。

## 二、影响版本
+ 月子会所ERP管理云平台

## 三、资产测绘
+ fofa`product="妈妈宝盒-ERP"`
+ 登录页面


## 四、漏洞复现
```plain
http://xx.xx.xx.xx/Page/
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ybopp6ucfh9lsdrz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
