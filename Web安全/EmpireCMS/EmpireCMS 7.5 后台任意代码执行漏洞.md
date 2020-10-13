EmpireCMS 7.5 后台任意代码执行漏洞
==================================

一、漏洞简介
------------

二、漏洞影响
------------

EmpireCMS 7.5

三、复现过程
------------

### 漏洞分析

漏洞代码发生在后台数据备份处代码/e/admin/ebak/ChangeTable.php
44行附近，通过审计发现执行备份时，对表名的处理程序是value=""
通过php短标签形式直接赋值给tablename\[\]。

1.jpg

进行备份时未对数据库表名做验证，导致任意代码执行。

### 漏洞复现

按下图依次点击,要备份的数据表选一个就好

2.png

点击"开始备份",burp抓包,修改tablename参数的值

3.png

可以看到响应的数据包,成功备份

4.png

查看备份的文件5.png

访问备份目录下的config.php,可以看到成功执行phpinfo

6.png

这时查看config.php文件

7.png

参考链接
--------

> https://www.shuzhiduo.com/A/pRdBPopGJn/
