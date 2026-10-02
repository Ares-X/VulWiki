---
source: "hatch 补库批 20260928"
product: "MKCMS6.2"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MKCMS v6.2 备份文件路径可猜解"
prerequisites: "来源所述条件，未列明部分仍待核：管理员先生成备份；backupdata公开可读，数据库名已知/默认movie"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2ddd23de6a6b5a366f9b1bde"
entity_id: "ve-2ddd23de6a6b5a366f9b1bde"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员先生成备份；backupdata公开可读，数据库名已知/默认movie

- **结论使用边界（1）**：代码支持按DATA_NAME命名，但仅路径可猜不等于备份必定存在。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：缺HTTP返回证据与访问限制，数据库名安装可变；应区分后台生成与前台读取。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MKCMS v6.2 备份文件路径可猜解

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

/backupdata/movie.sql

    /admin/cms_backup.php
    <?php
    $filename="../backupdata/".DATA_NAME.".sql"; //存放路径，默认存放到项目最外层
    $fp = fopen($filename,'w');
    fputs($fp,$mysql);
    fclose($fp);
    alert_href('备份成功!','cms_data.php');
    ?>

全局搜`DATA_NAME`变量，是安装时候设置的数据库名

![](./.resource/MKCMSv6.2备份文件路径可猜解/media/rId24.png)

默认的`DATA_NAME`值是`movie`

![](./.resource/MKCMSv6.2备份文件路径可猜解/media/rId25.png)

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
