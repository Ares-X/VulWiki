WordPress Plugin - Search Meter 2.13.2 CSV Injection
====================================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

-   首先在搜索框里输入paylaod

```{=html}
<!-- -->
```
-   =cmd|' /C notepad'!'A1'

```{=html}
<!-- -->
```
-   然后访问
    http://www.0-sec.org/wordpress/wp-admin/index.php?page=search-meter%2Fadmin.php
    并且到处csv文件

-   之后，我们在Excel中打开文件，并使用逗号作为分隔符从外部文件导入数据

-   这时候payload就会被执行了
