Druid 未授权访问漏洞
====================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

##### 当开发者配置不当时就可能造成未授权访问下面给出常见Druid未授权访问路径

```
/druid/websession.html
/system/druid/websession.html
/webpage/system/druid/websession.html(jeecg)
```

##### 当遇到需要登录的Druid是可能存在弱口下面给出Druid常见登录口路径。

```
/druid/login.html
/system/druid/login.html
/webpage/system/druid/login.html
```

##### 以上路径可能不止存在于根目录，遇到过在二级目录下的，我们扫路径时可能就关注根目录这个点可以注意一下

### Druid的一些利用方式

#### 通过泄露的Session登录后台

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221646741-1716693311.png)

##### 直接在/druid/websession.html页面ctrl+a复制整个页面内容到EmEditor

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221702214-881726766.png)

##### 删除红框部分，点击制表符

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221725822-28099053.png)

##### 这样就可以直接复制了，也可以通过其他方式处理，个人比较喜欢这个方式

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221746335-429682884.png)

##### 然后再到URI监控处找一条看起来像登录后台才能访问的路径（可用home等关键词快速定位）

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221759548-1259126549.png)

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221808876-1543169768.png)

##### 此处设置爆破，将刚才得到的Session值填入，因为此处的session值存在一些特殊符号需要关闭burp默认的url编码

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221822177-1051493895.png)

##### 200即为有效session，用改cookie的插件改成有效的就能进入后台测试

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221833384-1662569192.png)

#### 通过URI监控测试未授权越权

##### 由于有的Druid可能Session监控处没有东西，可以通过URI监控测试未授权越权

![img](.resource/Druid%20%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E/media/858505-20200312221919319-295843477.png)

##### 具体案例现在手上没有，之前众测挖到过通过session爆破，有效的只是一个普通账号，回过来看URI监控找到了任意用户密码重置，越权查看任意用户信息，越权添加管理员等.参考链接

> https://www.cnblogs.com/cwkiller/p/12483223.html
