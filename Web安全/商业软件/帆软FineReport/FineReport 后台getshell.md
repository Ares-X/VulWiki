---
source: "hatch 补库批 20260928"
title: "FineReport 后台插件上传+备份重命名写入Web根"
product: "FineReport"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "v8.0；插件安装/备份权限和目录布局"
prerequisites: "后台管理员"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B8%86%E8%BD%AFFineReport/FineReport%20%E5%90%8E%E5%8F%B0getshell.md"
id: "vw-38d976ee8f45c59f6a42b516"
entity_id: "ve-38d976ee8f45c59f6a42b516"
schema_version: "1"
---

# FineReport 后台插件上传+备份重命名写入Web根

## 条目说明

- 对象与具体问题：FineReport；后台插件上传+备份重命名写入Web根
- 版本、配置及部署条件：v8.0；插件安装/备份权限和目录布局
- 认证与权限前提：后台管理员
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 这是两个功能组合，文件重定向实为重命名/移动遍历，应规范类型
- 没有HTTP参数包/完整源码，2.png–5.png都是裸文件名，关键证据转存丢失
- WEB-INF内tmp不可直接访问条件写明有价值；frbak基目录需实验版本限定
- 缺补丁、恢复/清理；上传插件本身权限和超预期文件移动边界需要区分

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

FineReport v8.0

三、复现过程
------------

123漏洞代码位于fr-platform-8.0.jar包中的com.fr.fs.plugin.op.web.action.InstallFromDiskAction2.png这对应的其实是后台的插件上传功能，但是这里面比较另类的这里的插件包名固定为"temp.zip"，其中上传目录为\"tmp\"目录，但是我们需要将zip包解压缩获取到我们所上传的shell文件，所以查看全局代码的解压缩功能，找到一个能够配合上的函数，代码位于com.fr.fs.plugin.op.web.action.UpdateFromDiskAction3.png这里在插件管理模块需要更新本地插件，由于会将更新插件和原始插件进行比较，所以当上传一个新的插件时会触发installPluginFromUnzipperDir函数4.png这个函数里面会将zip包中的文件给提取到当前目录中，从而将我们上传的jsp
shell传到目标服务器中，但是由于所有的环境变量都是在WEB-INF目录下，所以tmp目录下的文件从外部访问是访问不到的，所以下面还需要找一个文件重定向的漏洞将jsp文件给移出来

#### 文件重定向漏洞

漏洞代码位于com.fr.fs.web.service.ServerConfigManualBackupAction中5.png这里代码比较简单点，传入"edit\_backup"，进入到条件语句当中，然后传入原始文件名和新的文件名，但是这里需要注意的这里将默认目录名设置为"frbak"目录，因此在进行目录穿越的时候需要在本地进行调试。

最后利用文件重命名漏洞将shell文件移动网站根目录，成功GETSHELL\~

参考链接
--------

> http://foreversong.cn/archives/1378
