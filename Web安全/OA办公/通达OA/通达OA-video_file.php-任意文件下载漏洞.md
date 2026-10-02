---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oa-Download%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.yaml"
title: "通达OA video_file路径遍历下载"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "来源V2017"
prerequisites: "无Cookie不等于全部署无需鉴权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA-video_file.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-18547be9cc17560fa690cca3"
entity_id: "ve-18547be9cc17560fa690cca3"
schema_version: "1"
---

# 通达OA video_file路径遍历下载

## 条目说明

- 对象与具体问题：通达OA；video_file路径遍历下载
- 版本、配置及部署条件：来源V2017
- 认证与权限前提：无Cookie不等于全部署无需鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定提交、版本与认证不确定性、响应判据清楚
- 仍缺根因/修复build/文件权限范围
- 配置样例含敏感信息，应优先隔离测试文件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

通达 OA 的 `/general/mytable/intel_view/video_file.php` 接口被公开 PoC 列为路径遍历下载入口。请求通过 `MEDIA_DIR` 与 `MEDIA_NAME` 指向应用数据库配置文件，若服务端未限制解析后的路径边界，可能泄露服务器可读文件。

### 影响范围

来源标注 V2017；其他版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /general/mytable/intel_view/video_file.php?MEDIA_DIR=../../../inc/&MEDIA_NAME=oa_config.php HTTP/1.1
Host: example.invalid
```

来源要求 200 状态码和 `MYSQL_DB`。应核对响应确为配置文件内容，排除登录页、错误页及仅包含变量名的模板。该请求未附带 Cookie，但不能据此推断所有部署均无需认证。本文仅核对公开源码，未读取目标配置或进行本地复现。

### 修复建议

向通达获取适用更新。对下载接口执行身份与文件权限检查，并在路径规范化后限制访问目录，禁止上级目录跳转。

### 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oa-Download%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.yaml)
