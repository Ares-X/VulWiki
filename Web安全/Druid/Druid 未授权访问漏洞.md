Druid 未授权访问漏洞
====================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

##### 当开发者配置不当时就可能造成未授权访问下面给出常见Druid未授权访问路径

    /druid/websession.html
    /system/druid/websession.html
    /webpage/system/druid/websession.html(jeecg)

##### 当遇到需要登录的Druid是可能存在弱口令的，下面给出Druid常见登录口路径。

    /druid/login.html
    /system/druid/login.html
    /webpage/system/druid/login.html

##### 以上路径可能不止存在于根目录，遇到过在二级目录下的，我们扫路径时可能就关注根目录这个点可以注意一下

### Druid的一些利用方式

#### 通过泄露的Session登录后台

1.png

##### 直接在/druid/websession.html页面ctrl+a复制整个页面内容到EmEditor

2.png

##### 删除红框部分，点击制表符

3.png

##### 这样就可以直接复制了，也可以通过其他方式处理，个人比较喜欢这个方式

4.png

##### 然后再到URI监控处找一条看起来像登录后台才能访问的路径（可用home等关键词快速定位）

5.png

6.png

##### 此处设置爆破，将刚才得到的Session值填入，因为此处的session值存在一些特殊符号需要关闭burp默认的url编码

7.png

##### 200即为有效session，用改cookie的插件改成有效的就能进入后台测试

8.png

#### 通过URI监控测试未授权越权

##### 由于有的Druid可能Session监控处没有东西，可以通过URI监控测试未授权越权

9.png

参考链接
--------

> https://www.cnblogs.com/cwkiller/p/12483223.html
