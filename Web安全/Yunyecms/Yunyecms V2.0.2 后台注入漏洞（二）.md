Yunyecms V2.0.2 后台注入漏洞（二）
==================================

一、漏洞简介
------------

云业CMS内容管理系统是由云业信息科技开发的一款专门用于中小企业网站建设的PHP开源CMS，可用来快速建设一个品牌官网(PC，手机，微信都能访问)，后台功能强大，安全稳定，操作简单。

二、漏洞影响
------------

yunyecms 2.0.2

三、复现过程
------------

漏洞出现在在后台文件de`***.php中，`de`***_add`函数对GET和POST参数先进行了是否empty判断，最终将传入的几个参数传给了edit\_admin\_department。

![](./.resource/YunyecmsV2.0.2后台注入漏洞(二)/media/rId24.png)

跟入edit\_admin\_department，对参数依次进行了处理，但是发现只有`$departmentname,$olddepartmentname`进行了usafestr安全过滤，漏网的`$id`拼接到了sql语句中执行。

![](./.resource/YunyecmsV2.0.2后台注入漏洞(二)/media/rId25.png)

最终导致了SQL注入。

![](./.resource/YunyecmsV2.0.2后台注入漏洞(二)/media/rId26.png)
