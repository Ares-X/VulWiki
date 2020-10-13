JBoss JMX Console未授权访问Getshell
===================================

一、漏洞简介
------------

二、漏洞影响
------------

全版本

三、复现过程
------------

先输入[http://172.26.1.167:8080/jmx](http://172.26.1.167:8080/jmx-console/)-console/[null-console/](http://172.26.1.167:8080/jmx-console/)进入到页面

-   先点击[jboss.system](http://172.26.1.167:8080/jmx-console/HtmlAdaptor?action=displayMBeans&filter=jboss.system),然后点击[service=MainDeployer](http://172.26.1.167:8080/jmx-console/HtmlAdaptor?action=inspectMBean&name=jboss.system%3Aservice%3DMainDeployer)

![](/Users/aresx/Documents/VulWiki/.resource/JBossJMXConsole未授权访问Getshell/media/rId27.png)

> 创建一个war包

先准备好一个jsp的木马,然后打开cmd创建,输入命令:jar -cvf
zfsn.war(你要创建war的名字，可随意填) zfsn. jsp

![](/Users/aresx/Documents/VulWiki/.resource/JBossJMXConsole未授权访问Getshell/media/rId28.png)

我们找到methodIndex为17 or
19的deploy，把远程的war包填入进去，进行远程war包的部署

![](/Users/aresx/Documents/VulWiki/.resource/JBossJMXConsole未授权访问Getshell/media/rId29.png)

部署完成之后,我们的木马地址为<http://172.26.1.167/zfsn/zfsn.jsp>

![](/Users/aresx/Documents/VulWiki/.resource/JBossJMXConsole未授权访问Getshell/media/rId31.png)
