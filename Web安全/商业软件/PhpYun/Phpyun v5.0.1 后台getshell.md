---
source: "hatch 补库批 20260928"
title: "PHPYun 后台模板生成文件执行"
product: "PHPYun"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "5.0.1；后台写模板和生成功能权限"
prerequisites: "后台"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/PhpYun/Phpyun%20v5.0.1%20%E5%90%8E%E5%8F%B0getshell.md"
id: "vw-8db694a39bedeb016a51261c"
entity_id: "ve-8db694a39bedeb016a51261c"
schema_version: "1"
---

# PHPYun 后台模板生成文件执行

## 条目说明

- 对象与具体问题：PHPYun；后台模板生成文件执行
- 版本、配置及部署条件：5.0.1；后台写模板和生成功能权限
- 认证与权限前提：后台
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- include样例闭合标记用全角问号，代码不可按原样解析；info.txt内容未提供
- 关键生成入口、参数、过滤逻辑只有截图，文本不足核对
- 多图引用4.5/3.1/4.2不同文章资源疑串图，需核实；不要因Git树存在就认图正确
- ()被大写描述不合理，可能指关键字转大写，需原文/截图核；简介空

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

Phpyun v5.0.1

三、复现过程
------------

安装好本地环境,看了下系统功能,等等测试,最后查看前台index.php源码。

![](./.resource/Phpyunv5.0.1后台getshell/media/rId24.png)

后台直接写入被过滤掉了。

![](./.resource/Phpyunv4.5后台getshell/media/rId25.png)

又去翻了下后台功能,发下有个生成功能,并且没有后缀限制。

![](./.resource/Phpyunv4.5后台getshell/media/rId26.png)

生存成功,但是发现()被大写,使用经典的include包含,随意找了一个模板下的info.txt文件,写入执行代码。

    <?php include'app/template/info.txt';？>

![](./.resource/Phpyunv3.1xml注入漏洞/media/rId27.png)

成功执行代码 代码分析：

![](./.resource/Phpyunv4.5后台getshell/media/rId28.png)

对post的数据没有任何验证,直接代入

![](./.resource/Phpyunv4.2部分4.34.5系统重装漏洞/media/rId29.png)

参考链接
--------

> <https://www.t00ls.net/thread-55040-1-1.html>
