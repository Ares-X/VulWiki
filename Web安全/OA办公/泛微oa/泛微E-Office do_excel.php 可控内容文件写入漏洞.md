---
cve: ""
fofa: "app=\"泛微-EOffice\""
version: "未知"
source: "https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo2.go"
---

# 泛微E-Office do_excel.php 可控内容文件写入漏洞

## 漏洞描述

泛微 E-Office 的费用导出接口 `/general/charge/charge_list/do_excel.php` 接收 `html` 表单字段。公开扫描代码随后从同目录的 `excel.php` 读到该内容，用于验证可控内容被写入固定文件。

## 影响范围与前提

产品：泛微 E-Office；受影响版本与补丁范围未知。该验证使用固定输出文件，可能覆盖已有内容，只适用于允许写入且已确认文件用途的隔离环境。是否可执行 PHP 还取决于服务端解析配置。

## 公开验证资料

公开 `Wo02scancore` 中已有完整的纯文本验证流程：

```http
POST /general/charge/charge_list/do_excel.php HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded

html=test
```

```http
GET /general/charge/charge_list/excel.php HTTP/1.1
Host: oa.example.com
```

应比较写入前后的内容，确认 `test` 来自此次表单且实际持久化。`test` 本身是通用字符串，单独命中可能误报。该请求只证明固定路径的内容写入，不能据此声称任意文件路径可控或已经执行系统命令。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo2.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
