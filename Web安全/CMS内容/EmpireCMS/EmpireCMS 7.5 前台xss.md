EmpireCMS 7.5 前台xss
=====================

一、漏洞简介
------------

该漏洞是由于javascript获取url的参数,没有经过任何过滤,直接当作a标签和img标签的href属性和src属性输出。

利用条件：需要开启会员空间功能

二、漏洞影响
------------

EmpireCMS 7.5

三、复现过程
------------

需要开启会员空间功能(默认关闭),登录后台开启会员空间功能。

1.png

漏洞出现的位置在/e/ViewImg/index.html,浏览代码,发现如下代码存在漏洞

分析代码:通过Request函数获取地址栏的url参数,并作为img和a标签的src属性和href属性,然后经过document.write输出到页面。2.png

跟进Request函数

分析代码:通过window.location获取当前url地址,根据传入的url参数,获取当前参数的起始位置和结束位置。

例如,地址是:`index.html?url=javascript:alert(document.cookie)`,经过Request函数处理就变成`javascript:alert(document.cookie)`

3.png

url地址经过Request函数处理之后,然后把url地址中的参数和值部分直接拼接当作a标签的href属性的值和img标签的src标签的值。

4.png

通过上面的分析,可以发现代码没有对url的参数做过滤就直接拼接成a和img标签的属性的值,因此可以构造payload:?
?url=javascript:alert(/xss/)

浏览器访问`http://www.0-sec.org/e/ViewImg/index.html?url=javascript:alert(/xss/)`

5.png

点击图片便可触发

6.png
