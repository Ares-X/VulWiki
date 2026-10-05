---
source: "gelusus/wxvl 公众号漏洞文库"
title: "MiroFish 7058命令注入与7059路径遍历通告"
product: "MiroFish"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-7058;CVE-2026-7059"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "0.1.2声明"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/MiroFish/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20MiroFish%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E5%92%8C%E8%B7%AF%E5%BE%84%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
id: "vw-02c7287affd08199b4381043"
entity_id: "ve-02c7287affd08199b4381043"
schema_version: "1"
---

# MiroFish 7058命令注入与7059路径遍历通告

## 条目说明

- 对象与具体问题：MiroFish；7058命令注入与7059路径遍历通告
- 版本、配置及部署条件：0.1.2声明
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 分漏洞实体
- 已公开PoC却无入口/参数/链接，GitHub主页不等于补丁
- 缺具体安全版本/鉴权与链路，不能从通告扩展无条件控制服务器

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

浅安
                    浅安  浅安安全   2026-05-19 23:50  
  
**0x00 漏洞编号**  
- # CVE-2026-7058  
  
- # CVE-2026-7059  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
MiroFish是一款基于多智能体技术的新一代AI预测引擎。  
  
![](../../.resource/remote/12354934cc7c174d48704ec5c5ab858b45c4475477bba31d623a6d7bf7efc523.png "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-7058**  
  
**漏洞类型：**  
命令注入  
  
**影响：**  
执行任意代码  
  
**简述：**  
MiroFish存在命令注入漏洞，攻击者可通过该漏洞执行任意命令，进而控制服务器。  
  
**CVE-2026-7059**  
  
**漏洞类型：**  
路径遍历  
  
**影响：**  
获取敏感信息  
  
**简述：**  
MiroFish存在路径遍历漏洞，攻击者通过该漏洞可遍历及读取服务器文件内容，进而获取敏感信息。  
  
**0x04 影响版本**  
- MiroFish 0.1.2  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/666ghj/MiroFish  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
