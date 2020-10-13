通过jmx攻击Tomcat
=================

一、漏洞简介
------------

### 利用条件

-   `/manager`应用程序不限于本地主机
-   jmx可访问（没有身份验证）
-   tomcat用户数据库可写

二、漏洞影响
------------

三、复现过程
------------

我们通过`jconsole`连接到服务器，可以执行一些特定于Tomcat的方法让我们进入。

![1.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId25.png)

如果UserDatabase标记为`writable = true`，则`readonly = false`：

![2.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId26.png)

在UserDatabase节点下，我们可以创建新用户。我们将用户名密码新建为`tomcat`：

![3.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId27.png)

确保我们也在服务器上创建了manager-gui角色，因此我们得到了完全授权：

![4.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId28.png)

移动到`Users` 树中的节点，我们可以将创建的用户与创建的角色相关联：

![5.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId29.png)

保存配置后：

![6.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId30.png)

我们可以在`/manager/html`端点上输入我们的凭据：![7.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId31.png)

成功登陆进去！

![8.png](/Users/aresx/Documents/VulWiki/.resource/通过jmx攻击Tomcat/media/rId32.png)
