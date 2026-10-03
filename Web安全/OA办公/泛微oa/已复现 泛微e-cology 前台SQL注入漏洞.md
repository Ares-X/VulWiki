---
source: "gelusus/wxvl 公众号漏洞文库"
title: "泛微e-cology 2025年7月多处前台SQL注入修复通告"
product: "泛微e-cology"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "影响版本代码块空白；修复写v10.76"
prerequisites: "明确无需权限/默认配置/无交互"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E5%B7%B2%E5%A4%8D%E7%8E%B0%20%E6%B3%9B%E5%BE%AEe-cology%20%E5%89%8D%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-25b34ce33c5c3208c0b6d7b5"
entity_id: "ve-25b34ce33c5c3208c0b6d7b5"
schema_version: "1"
---

# 泛微e-cology 2025年7月多处前台SQL注入修复通告

## 条目说明

- 对象与具体问题：泛微e-cology；2025年7月多处前台SQL注入修复通告
- 版本、配置及部署条件：影响版本代码块空白；修复写v10.76
- 认证与权限前提：明确无需权限/默认配置/无交互
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 影响版本缺失，不能从修复版本自动推断全部版本受影响
- 整段修复/复现/产品支持粘连，复现正文缺失
- 正文称多处SQL注入，不应直接等同QVD单条；保留为补丁级汇总并核对原长亭公告

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

长亭科技  天驿安全   2025-07-10 08:03  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/FOh11C4BDicSXB81WckHL3UaDia8f7YSQADP0N5LceRr3X7gVmZX2MLQcN6Q1exGyhiaIlwMJscH8YQEPBXBuWwuw/640?wx_fmt=png&from=appmsg "")  
  
  
泛微e-cology是一款由泛微网络科技开发的协同管理平台，支持人力资源、财务、行政等多功能管理和移动办公。  
  
  
2025年7月，泛微官方更新安全补丁，修复了多处SQL注入漏洞。经分析，攻击者可利用此漏洞获取服务器敏感信息，如结合其他后台漏洞可导致代码执行，最终造成服务器沦陷，建议受影响的用户尽快修复漏洞  
。  
  
  
**漏洞描述**  
  
Description  
  
  
  
**0****1**  
  
**漏洞成因**  
  
E-cology系统在构建SQL语句时直接拼接用户可控参数，且未对输入进行充分过滤，这导致了SQL注入漏洞。当系统处理用户提交的恶意参数时，攻击者可利用该漏洞向数据库中注入任意SQL命令。  
  
### 漏洞影响  
  
攻击者可利用此漏洞获取敏感信息，进一步利用可能获取目标系统权限。  
  
  
**处置优先级：高**  
  
漏洞类型：  
SQL注入  
  
**漏洞危害等级：**  
高  
  
**触发方式：**  
网络远程  
  
**权限认证要求：**  
无需权限  
  
**系统配置要求：**  
默认配置  
  
**用户交互要求：**  
无需用户交互  
  
**利用成熟度：**  
POC/EXP 未公开  
  
**修复复杂度：**  
低，  
官方提供补丁修复方案  
  
  
  
  
  
**影响版本**  
  
Affects  
  
  
  
**02**  
(原资料此处为空，未提供请求或代码。)
  
**解决方案**  
  
Solution  
  
  
  
**03**  
  
###   
  
### 临时缓解方案限制访问来源地址，如非必要，不要将系统开放在互联网上  
  
### 升级修复方案官方已发布安全补丁，建议受影响的用户联系厂商升级至 v10.76补丁漏洞复现Reproduction04产品支持Support05云图：默认支持该产品的指纹识别，同时支持该漏洞的PoC原理检测洞鉴：预计2025年7月9日以自定义POC形式支持检测雷池：默认支持检测全悉：预计2025年7月9日发布更新包支持检测  
  
  
  
**时间线**  
  
Timeline  
  
  
  
**06**  
  
2025年7月 泛微官方发布安全补丁  
  
2025年7月9日 长亭安全应急响应中心发布通告  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
