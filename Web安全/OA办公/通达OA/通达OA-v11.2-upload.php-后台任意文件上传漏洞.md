---
source: "Threekiii/Vulnerability-Wiki"
title: "通达OA 后台附件目录配置+Windows后缀上传"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "11.2 Windows；附件存储可设Webroot"
prerequisites: "需要登录且可管理附件存储目录"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA-v11.2-upload.php-%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-f2dc39b3c3274288570d0bd8"
entity_id: "ve-f2dc39b3c3274288570d0bd8"
schema_version: "1"
---

# 通达OA 后台附件目录配置+Windows后缀上传

## 条目说明

- 对象与具体问题：通达OA；后台附件目录配置+Windows后缀上传
- 版本、配置及部署条件：11.2 Windows；附件存储可设Webroot
- 认证与权限前提：需要登录且可管理附件存储目录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题仅upload.php未给完整路由，关键请求/响应只有图
- 不能简化任意用户登录即可RCE，需管理目录权限和可执行位置
- 日期2012及随机前缀为样例，不是固定路径；无修复依据

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

通达OA v11.2后台存在文件上传漏洞，允许通过绕过黑名单的方法来上传恶意文件，导致服务器被攻击

### 漏洞影响

```
通达OA v11.2
```

### 环境搭建

[通达OA v11.2下载链接](https://cdndown.tongda2000.com/oa/2019/TDOA11.2.exe)

下载后按步骤安装即可

### 漏洞复现

该漏洞存在于后台，需要通过登录后才能进行使用

登录后点击 **菜单 -> 系统管理 -> 附件管理**

![image-20220209105402262](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091054355.png)

点击添加附录存储管理添加如下(存储目录为 webroot 目录，默认为 **D:/MYOA/webroot/**)

![image-20220209105417083](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091054194.png)

点击 **组织 -> 系统管理员 -> 上传附件**

![image-20220209105436655](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091054718.png)

抓包使用 windows 的绕过方法 **shell.php -> shell.php.**

![image-20220209105510484](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091055562.png)

2012 为目录

1717872192 为拼接的文件名

最后的shell名字为 1717872192.shell.php

![image-20220209105530593](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091055671.png)

访问木马文件

![image-20220209105545405](./.resource/通达OA-v11.2-upload.php-后台任意文件上传漏洞/media/202202091055475.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
