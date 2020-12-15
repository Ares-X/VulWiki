EmpireCMS 7.5 配置文件写入漏洞
==============================

一、漏洞简介
------------

该漏洞是由于安装程序时没有对用户的输入做严格过滤,导致用户输入的可控参数被写入配置文件,造成任意代码执行漏洞。

二、漏洞影响
------------

EmpireCMS 7.5

三、复现过程
------------

### 漏洞分析

1、漏洞出现位置如下图,phome_表前缀没有被严格过滤导致攻击者构造恶意的代码

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/c7beff56f6faabdad2bee689227611e9b6c.png)

2、定位漏洞出现的位置,发现在/e/install/index.php,下图可以看到表名前缀phome_,将获取表名前缀交给了mydbtbpre参数。

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/9f060721d9ed93cf1ad2820e2dbf21d7554.png)

3、全文搜索,$mydbtbpre,然后跟进参数传递,发现将用户前端输入的表前缀替换掉后带入了sql语句进行表的创建,期间并没有对前端传入的数据做严格的过滤

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/fdd7d9f6ce951861d03919c638077917b37.png)

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/b116de83cb3b8b512c8afa8eae97e2e340b.png)

4、创建表的同时将配置数据和可以由用户控制的表前缀一起写入到config.php配置文件

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/be582ea8422c6a7d59506beff33c19074eb.png)

5、通过对整个install过程的代码分析,可以发现没有对用户数据进行过滤,导致配置文件代码写入。

5.1、burp对漏洞存在页面进行抓包,修改phome参数的值,构造payload,payload如下:

‘;phpinfo();//

5.2、在burp中的phome参数的值中输入特殊构造的payload

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/b188b7ef4bc35fe99964f64c9253eb3ef8c.png)

6、查看config.php配置文件,发现成功写入配置文件

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/13dc7505eb0f3d38971a0ad5aa482ed6c06.png)

7、再次访问安装结束的页面, http://192.168.10.171/empirecms/e/install/index.php?enews=moddata&f=4&ok=1&defaultdata=1

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/f6d307b9cdf4c99e5c11f2c0984a1d03045.png)

8、构造特殊的payload getshell

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/fab62a4019dd772b64fe034ee6bfe35fa58.png)

9、菜刀连接,成功getshell

　　![img](.resource/EmpireCMS%207.5%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E/media/1592114-20190817185808239-1484058557.png)

 

参考链接
--------

> http://qclover.cn/2018/10/10/EmpireCMS\_V7.5%E7%9A%84%E4%B8%80%E6%AC%A1%E5%AE%A1%E8%AE%A1.html
