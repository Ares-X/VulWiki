FineReport 任意文件读取漏洞
===========================

一、漏洞简介
------------

二、漏洞影响
------------

FineReport v8.0FineReport v9.0

三、复现过程
------------

漏洞代码位于fr-chart-8.0.jar文件的com.fr.chart.web.ChartGetFileContentAction中

1.png这里由ActionNoSessionCMD类扩展而来，跟进这个类其实就是对用户权限做一个简单的认证，实际上帆软报表在具体函数里会自定义认证模式，所以这个类可以略过。2.png这里通过request将文件名传进来，同时这里使用了cjkDecode函数来解密文件名，但跟进这个函数就会发现对我们所传入的文件名没有任何影响，继续跟进接着使用invalidResourcePath函数来验证文件名是否存在

  1234   public static boolean invalidResourcePath(String paramString) { return (StringUtils.isEmpty(paramString) \|\| paramString.indexOf(false) != -1) ? true : (paramString.startsWith(\"http\") ? ((paramString.indexOf(\"127.0.0.1\") != -1 \|\| paramString.indexOf(\"localhost\") != -1)) : ((paramString.indexOf(\"..\") != -1 && paramString.split(\"\\Q..\\E\").length \> 3))); }
  ------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         

初步看来应该是为了防止ssrf？但对这个任意文件读取漏洞而言依旧没有任何影响。

最后使用了readResource函数来去读文件流，将其显示浏览器当中，这里其实在初步审的时候其实是有一点问题的，那就是文件的默认路径，这里必须要跟进这个FRContext类中去看看如何初始化文件默认路径，由于跟的过程比较复杂，最终发现默认是访问resources目录下的文件3.png这里面较为关键的是privilege.xml，因为其中存储的就是超级管理员的账号和加密密码，在官网补丁中推荐的修补建议是加大密码强度，但实际情况是这里面的解密函数已经内置在jar包里，并且使用了硬编码的方式，所以如果能够拿到加密字符串，等同于拿到了管理员账号和密码4.png至此利用任意文件读取漏洞可以拿到管理员的账号和密码，从而进入到后台。

### poc

    http://www.0-sec.org:8080/WebReport/ReportServer?op=fs_remote_design&cmd=design_list_file&file_path=..&currentUserName=admin&currentUserId=1&isWebReport=true

5.png

参考链接
--------

> https://www.freesion.com/article/1056237571/
