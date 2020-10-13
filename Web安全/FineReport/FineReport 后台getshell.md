FineReport 后台getshell
=======================

一、漏洞简介
------------

二、漏洞影响
------------

FineReport v8.0

三、复现过程
------------

123漏洞代码位于fr-platform-8.0.jar包中的com.fr.fs.plugin.op.web.action.InstallFromDiskAction2.png这对应的其实是后台的插件上传功能，但是这里面比较另类的这里的插件包名固定为"temp.zip"，其中上传目录为\"tmp\"目录，但是我们需要将zip包解压缩获取到我们所上传的shell文件，所以查看全局代码的解压缩功能，找到一个能够配合上的函数，代码位于com.fr.fs.plugin.op.web.action.UpdateFromDiskAction3.png这里在插件管理模块需要更新本地插件，由于会将更新插件和原始插件进行比较，所以当上传一个新的插件时会触发installPluginFromUnzipperDir函数4.png这个函数里面会将zip包中的文件给提取到当前目录中，从而将我们上传的jsp
shell传到目标服务器中，但是由于所有的环境变量都是在WEB-INF目录下，所以tmp目录下的文件从外部访问是访问不到的，所以下面还需要找一个文件重定向的漏洞将jsp文件给移出来

### 文件重定向漏洞

漏洞代码位于com.fr.fs.web.service.ServerConfigManualBackupAction中5.png这里代码比较简单点，传入"edit\_backup"，进入到条件语句当中，然后传入原始文件名和新的文件名，但是这里需要注意的这里将默认目录名设置为"frbak"目录，因此在进行目录穿越的时候需要在本地进行调试。

最后利用文件重命名漏洞将shell文件移动网站根目录，成功GETSHELL\~

参考链接
--------

> http://foreversong.cn/archives/1378
