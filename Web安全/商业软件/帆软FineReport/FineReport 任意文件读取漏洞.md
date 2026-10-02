---
source: "hatch 补库批 20260928"
title: "FineReport get_geo_json文件读取分析与design_list_file混接"
product: "FineReport"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "正文v8.0/v9.0粘连，精确范围未知"
prerequisites: "ActionNoSessionCMD并不自行证明无认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B8%86%E8%BD%AFFineReport/FineReport%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-ed733aa29b24878f5e319714"
entity_id: "ve-ed733aa29b24878f5e319714"
schema_version: "1"
---

# FineReport get_geo_json文件读取分析与design_list_file混接

## 条目说明

- 对象与具体问题：FineReport；get_geo_json文件读取分析与design_list_file混接
- 版本、配置及部署条件：正文v8.0/v9.0粘连，精确范围未知
- 认证与权限前提：ActionNoSessionCMD并不自行证明无认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 源码分析ChartGetFileContentAction resourcepath，却PoC是fs_remote_design/design_list_file/file_path目录列举，两个机制不对应
- 1.png至5.png只是裸文本，原图丢转存不能按有效图片引用
- invalidResourcePath伪代码paramString.indexOf(false)不符合String重载，代码表格/转义损坏
- cjkDecode不宜叫密码解密，路径校验不等于存在性校验；硬编码密码算法需明确证据
- 简介空/原始公告无，不能套329 CNVD到此错配PoC

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

FineReport v8.0FineReport v9.0

三、复现过程
------------

漏洞代码位于fr-chart-8.0.jar文件的com.fr.chart.web.ChartGetFileContentAction中

1.png这里由ActionNoSessionCMD类扩展而来，跟进这个类其实就是对用户权限做一个简单的认证，实际上帆软报表在具体函数里会自定义认证模式，所以这个类可以略过。2.png这里通过request将文件名传进来，同时这里使用了cjkDecode函数来解密文件名，但跟进这个函数就会发现对我们所传入的文件名没有任何影响，继续跟进接着使用invalidResourcePath函数来验证文件名是否存在

  1234   public static boolean invalidResourcePath(String paramString) { return (StringUtils.isEmpty(paramString) \|\| paramString.indexOf(false) != -1) ? true : (paramString.startsWith(\"http\") ? ((paramString.indexOf(\"127.0.0.1\") != -1 \|\| paramString.indexOf(\"localhost\") != -1)) : ((paramString.indexOf(\"..\") != -1 && paramString.split(\"\\Q..\\E\").length \> 3))); }
  ------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         

初步看来应该是为了防止ssrf？但对这个任意文件读取漏洞而言依旧没有任何影响。

最后使用了readResource函数来去读文件流，将其显示浏览器当中，这里其实在初步审的时候其实是有一点问题的，那就是文件的默认路径，这里必须要跟进这个FRContext类中去看看如何初始化文件默认路径，由于跟的过程比较复杂，最终发现默认是访问resources目录下的文件3.png这里面较为关键的是privilege.xml，因为其中存储的就是超级管理员的账号和加密密码，在官网补丁中推荐的修补建议是加大密码强度，但实际情况是这里面的解密函数已经内置在jar包里，并且使用了硬编码的方式，所以如果能够拿到加密字符串，等同于拿到了管理员账号和密码4.png至此利用任意文件读取漏洞可以拿到管理员的账号和密码，从而进入到后台。

#### poc

    http://www.0-sec.org:8080/WebReport/ReportServer?op=fs_remote_design&cmd=design_list_file&file_path=..&currentUserName=admin&currentUserId=1&isWebReport=true

5.png

参考链接
--------

> https://www.freesion.com/article/1056237571/
