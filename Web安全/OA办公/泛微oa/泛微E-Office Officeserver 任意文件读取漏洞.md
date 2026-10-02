---
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Office%20officeserver.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
title: "泛微e-office officeserver.php LOADFILE路径读取"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；服务可读目标文件必须存在"
prerequisites: "来源无cookie，部署鉴权需核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Office%20Officeserver%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-EOffice\""
id: "vw-9e57673e6abd9078bd551fdc"
entity_id: "ve-9e57673e6abd9078bd551fdc"
schema_version: "1"
source_url: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Office%20officeserver.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
---

# 泛微e-office officeserver.php LOADFILE路径读取

## 条目说明

- 对象与具体问题：泛微e-office；officeserver.php LOADFILE路径读取
- 版本、配置及部署条件：版本未知；服务可读目标文件必须存在
- 认证与权限前提：来源无cookie，部署鉴权需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确LOADFILE读取与其他Java OfficeServer/PHP上传不是同一漏洞
- 完整路径请求、INI结果证据标准和三份固定commit来源
- 标题Officeserver宜改为实际officeserver.php；版本/补丁未知保留

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Office 的 `/iweboffice/officeserver.php` 文件下载功能接收 `FILENAME`。公开资料使用 `OPTION=LOADFILE` 与相对路径读取程序目录之外的数据库配置文件，表明下载路径可能缺乏有效限制。

### 影响范围与前提

产品：泛微 E-Office；具体版本和补丁范围未知。读取范围受服务进程权限约束，且目标文件必须存在。公开请求未携带 Cookie，具体部署的认证要求仍需核对。

### 公开验证资料

```http
GET /iweboffice/officeserver.php?OPTION=LOADFILE&FILENAME=../mysql_config.ini HTTP/1.1
Host: oa.example.com
```

确认时应核对响应是否为目标配置文件的实际内容，例如具有相应 INI 结构及 `datauser`、`datapassword` 键值，而非错误页或 DBSTEP 协议头。HTTP 200 或 `DBSTEP` 单独出现不足以证明读取成功。

此条只记录 `LOADFILE` 读取流程；没有把 Java 类 `weaver.common.OfficeServer`、其他 PHP 上传入口或未核实的 `SAVEFILE`、`GETFILE`、`LOADTEMPLATE` 行为混为同一漏洞。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Office%20officeserver.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-officeserver-lfi.yaml)
- [公开资料 3](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo6.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
