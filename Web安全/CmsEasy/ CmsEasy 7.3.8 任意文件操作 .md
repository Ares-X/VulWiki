CmsEasy 7.3.8 任意文件操作
==========================

一、漏洞简介
------------

二、漏洞影响
------------

CmsEasy 7.3.8

三、复现过程
------------

"无需代码，自由拖拽布局，适应所有设备"是这个系统宣传的特色，后台自然地存在自定义网站模板功能，这种功能中如果处理不当很可能造成文件任意读、写或者删除的脆弱性问题，需要着重注意。

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId24.png)

观察模板编辑功能，存在对模板的html文件的读取操作，对应到HTTP请求可以明显看到可控参数

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId25.png)

看到功能不急着看代码，首先想到黑盒测试一下，手动修改id参数后观察发现可以这个接口果然没有做好限制和过滤，可以读取任意传参文件

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId26.png)

观察接口URL中的参数，猜测除了fetch之外应该还有保存和删除的功能，但是功能接口的接收参数就不知道了，因此需要去看源码以进行下一步操作

##### 定位到接口的功能函数文件后，发现经过了加密混淆处理。。。

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId28.png)

经过一番操作后，最终得到了文件删除的接口函数大致内容，很明显地存在文件删除路径可控问题

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId29.png)

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId30.png)

![](/Users/aresx/Documents/VulWiki/.resource/CmsEasy7.3.8任意文件操作/media/rId31.png)

同理，文件写也存在问题，这里就不详细列出了，感兴趣的朋友可以再看看

参考链接
--------

> https://xz.aliyun.com/t/7273
