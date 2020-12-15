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



进行备份时未对数据库表名做验证，导致任意代码执行。

### 漏洞复现

1、查看代码e/admin/ebak/phome.php接收备份数据库传递的参数,然后传递给Ebak_DoEbak函数中。

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMDQ4NDAzLTEwOTc2NDUxNjgucG5n.jpg)

2、跟进Ebak_DoEbak函数所在的位置,可以看到将数据库表名传递给变量$tablename。

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMTA0NjY0LTc4NzI3NjExLnBuZw==.jpg)

3、继续浏览代码,可以看到如下代码,遍历表名并赋值给$b_table、$d_table,使用RepPostVar函数对表名进行处理,其中$d_table拼接成$tb数组时没有对键值名添加双引号。

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMTE4MDYxLTEzNDU5NDk4MTkucG5n.jpg)

4、在生成config.php文件的过程中,对于$d_table没有进行处理,直接拼接到生成文件的字符串中,导致任意代码执行漏洞。

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMTMyOTAyLTQyOTc5MDE1My5wbmc=.jpg)

5、访问后台

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMTQ3MDkzLTI4NjM3MzI2Ny5wbmc=.jpg)

6、按下图依次点击,要备份的数据表选一个就好

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMjAzNTI5LTE4MjE1MjI1NTUucG5n.jpg)

7、点击”开始备份”,burp抓包,修改tablename参数的值

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMjE3MzQwLTM3OTI5NDcxMC5wbmc=.jpg)

8、可以看到响应的数据包,成功备份

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMjMxOTk0LTExMzYzNTUzOTEucG5n.jpg)

9.查看备份的文件

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMjQ4NjE3LTU5NTExNDE1OS5wbmc=.jpg)

10.访问备份目录下的config.php,可以看到成功执行phpinfo

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMzAzOTUwLTg2NTc1OTUzMS5wbmc=.jpg)

11、这时查看config.php文件

　　![img](.resource/EmpireCMS%207.5%20%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/media/L3Byb3h5L2h0dHBzL2ltZzIwMTguY25ibG9ncy5jb20vYmxvZy8xNTkyMTE0LzIwMTkwOC8xNTkyMTE0LTIwMTkwODE3MTgyMzE3OTc0LTIwMDgwNDcxNzIucG5n.jpg)

参考链接
--------

> https://www.shuzhiduo.com/A/pRdBPopGJn/
