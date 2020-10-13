WordPress Plugin - Baidu xss漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 漏洞分析

Page Builder
bySiteOrigin插件内置一款实时编辑器，用户可以在观察实时更改的同时更新内容，这使得页面的编辑和设计或发布过程更加流畅。

![1.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId24.png)

本次漏洞就是出现在该插件内置的实时编辑器中。

在编辑文章活页面时点击实时编辑器按钮即可使用此工具

![2.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId25.png)

在实时编辑器中可以实时预览编辑文章、添加小工具、修改页面布局等情况

![3.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId26.png)

以添加小工具功能为例，我们可以添加一个自定义HTML模块

![4.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId27.png)

在这个模块中添加一些内容

![5.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId28.png)

完成编辑后，用户的编辑效果可以实时呈现在编辑器浏览页面中

![6.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId29.png)

实时编辑器仅提供用户对草稿的编辑与预览。如果需要保存与发布，还需要点击Save
Draft按钮

在了解了Page Builder by
SiteOrigin插件的功能之后，再看一下后台是如何实现与如何产生漏洞的

当用户点击实时编辑器按钮后，会进入上文描述的实时编辑器页面

此时用户可以对页面进行一些编辑操作，当用户编辑完成后点击已完成按钮后，会向后台发送如下请求：

![7.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId30.png)

url中p参数代表目前编辑的文章id，siteorigin\_panels\_live\_editor=true代表目前正开启使用实时编辑器，live\_editor\_panels\_data参数值为修改后的页面数据

可以跟进插件后台看一下代码

![8.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId31.png)

程序通过is\_live\_editor来判断是否使用实时编辑器

我们接下来看一下is\_live\_editor函数

![9.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId32.png)

is\_live\_editor函数的作用是检查用户是否在前端的实时编辑器中，当用户提交的请求url中siteorigin\_panels\_live\_editor不为空时，则判断用户正在使用实时编辑器

接着，程序调用SiteOrigin\_Panels\_Live\_Editor::single()函数包含实时编辑器文件

![10.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId33.png)

![11.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId34.png)

在SiteOrigin\_Panels\_Live\_Editor类的构造方法中，通过add\_action函数将post\_metadata函数挂载到get\_post\_metadata
hook上

![12.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId35.png)

get\_{\$meta\_type}\_metadata
hook用以处理动态部分\$meta\_type指定的元数据类型并获取元数据，这里是用来获取挂载的post\_metadata函数返回的元数据

接下来看一下post\_metadata函数

![13.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId36.png)

在post\_metadata函数中，对访问实时编辑器的用户身份、提交的跟新信息等进行校验，通过校验的数据可以进行后续处理并返回元数据。但post\_metadata函数并没有通过校验csrf
token来保护提交数据的来源合法性。这将导致csrf漏洞的产生。

在通过一系列的校验后，程序将live\_editor\_panels\_data参数提交的页面信息进行加工并进行渲染工作。程序使用add\_filter('the\_content',
string \$content )实现页面内容加工工作,然后再将其打印到屏幕上

![14.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId37.png)

这里用来加工页面信息的函数是generate\_post\_content

![15.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId38.png)

最终，live\_editor\_panels\_data参数中提交的新的页面信息将会被打印到屏幕上

需要特别注意的是，此插件实施编辑器中有如下代码

![16.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId39.png)

![17.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId40.png)

实时编辑器通过header( 'X-XSS-Protection:
0');设置X-XSS-Protection响应头以关闭浏览器XSS保护。可见这个插件的实时编辑器页面中允许xss的触发

### 漏洞复现

构造实时编辑提交页面修改的数据包

![18.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId42.png)

将其中的content字段改为xss payload

![19.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId43.png)

生成csrf poc

![20.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId44.png)

当管理员访问该poc页面时，xss触发

![21.png](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-Baiduxss漏洞/media/rId45.png)

通过xss漏洞，可以构造payload进行进一步的攻击，例如添加一个管理员账号。

参考链接
--------

> https://kumamon.fun/WordPress-Page-Buider/
