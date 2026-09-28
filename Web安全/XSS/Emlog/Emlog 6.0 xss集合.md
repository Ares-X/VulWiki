Emlog 6.0 xss集合
=================

一、漏洞简介
------------

二、漏洞影响
------------

Emlog 6.0

三、复现过程
------------

### Uploadify SWF XSS

Emlog使用了 uploadify.swf 的方式上传文件，文件路径
/include/lib/js/uploadify/uploadify.swf

payload

    http://www.0-sec.org/include/lib/js/uploadify/uploadify.swf?uploadifyID=00%22%29%29;}catch%28e%29{alert%281%29;}//%28%22&movieName=%22])}catch(e){if(!window.x){window.x=1;alert(document.cookie)}}//&.swf

效果，可无视浏览器filter：

![](./.resource/Emlog6.0xss集合/media/rId25.png)

### 反射xss

此处的XSS主要发生在cookie上，因为某些页面如
admin/admin\_log,admin/sort.php,admin/link.php页面需要在表单中添加了hidden属性的token值，而这个token值直接从用户的cookie中取得，导致了一个反射型XSS

拦截抓包修改cookie中的token值如下：

![](./.resource/Emlog6.0xss集合/media/rId27.png)

效果：

![](./.resource/Emlog6.0xss集合/media/rId28.png)

### 侧边栏存储性XSS

为了同样是为了支持HTML代码的输出，没有转义对应的脚本代码标签，导致了存储性的XSS存在

![](./.resource/Emlog6.0xss集合/media/rId30.png)
