---
source: "wy876 漏洞文库"
title: "子辰视讯酒店智慧营销IPTV userlogin username SQL注入声称"
product: "子辰视讯酒店智慧营销IPTV"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "正常登录请求含PHPSESSID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bkkb8ze783s6xqap"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%AD%90%E8%BE%B0%E8%A7%86%E8%AE%AF/%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%AD%90%E8%BE%B0%E8%A7%86%E8%AE%AF%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E9%85%92%E5%BA%97%E6%99%BA%E6%85%A7%E8%90%A5%E9%94%80IPTV%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8sql%E6%B3%A8%E5%85%A5.md"
fofa_unverified: "web.title:"
id: "vw-d1ecb09814a4ec83808af62b"
entity_id: "ve-d1ecb09814a4ec83808af62b"
schema_version: "1"
---

# 子辰视讯酒店智慧营销IPTV userlogin username SQL注入声称

## 条目说明

- 对象与具体问题：子辰视讯酒店智慧营销IPTV；userlogin username SQL注入声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：正常登录请求含PHPSESSID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅admin/admin正常请求和空sqlmap小节，无注入payload/响应/结果，不能证明SQLi
- Origin/Referer残留公网IP需占位化；Hunter web.title冒号语法需核，元数据残缺
- 补源码和参数差异，不能把弱密码请求当注入证据
- 标题公司全称冗长，规范厂商+产品+入口

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
深圳市子辰视讯科技有限公司酒店智慧营销IPTV系统存在sql注入。

## 二、影响版本
+ 酒店智慧营销IPTV系统

## 三、资产测绘
+ hunter`web.title:"登录 - 酒店智慧营销IPTV系统"`
+ 特征


## 四、漏洞复现
漏洞位置：

```plain
/xsiptva/cniptv/userlogin.php
```


登录界面存在sql注入，username参数sql注入漏洞

```http
POST /xsiptva/cniptv/userlogin.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Origin: http://1.69.37.165:8880
Connection: close
Referer: http://1.69.37.165:8880/xsiptva/cniptv/userlogin.php
Cookie: PHPSESSID=8************************4
Upgrade-Insecure-Requests: 1

username=admin&password=admin
```

> 请求长度说明：原资料 Content-Length 为 29；静态长度已移除，应由客户端根据最终请求体的字节数生成。

sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bkkb8ze783s6xqap>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
