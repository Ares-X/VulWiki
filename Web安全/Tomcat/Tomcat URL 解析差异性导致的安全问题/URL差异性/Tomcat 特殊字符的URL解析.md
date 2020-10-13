### Tomcat 特殊字符的URL解析

新建一个Java Web项目，index.jsp如下：

    <%
    out.println("getRequestURL(): " + request.getRequestURL() + "<br>");
    out.println("getRequestURI(): " + request.getRequestURI() + "<br>");
    out.println("getContextPath(): " + request.getContextPath() + "<br>");
    out.println("getServletPath(): " + request.getServletPath() + "<br>");
    out.println("getPathInfo(): " + request.getPathInfo() + "<br>");
    %>

#### 正常访问

Tomcat运行之后，正常访问`http://localhost:8080/urltest/index.jsp`，页面输出如下：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId22.png)

#### 插入 ./ 访问

尝试插入多个`./`访问即`http://localhost:8080/urltest/./././index.jsp`，页面输出如下：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId24.png)

可以看到，插入多个`./`也能正常访问。

接着尝试这种形式`http://localhost:8080/urltest/.a/.bb/.ccc/index.jsp`，发现是返回404，未找到该资源访问：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId25.png)

#### 插入 ../ 访问

尝试插入`../`访问即`http://localhost:8080/urltest/../index.jsp`，页面输出如下：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId27.png)

可以是返回的404，这是因为实际访问的是`http://localhost:8080/index.jsp`，这个目录文件当然不存在。

换种跨目录的形式就OK了`http://localhost:8080/urltest/noexist/../index.jsp`：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId28.png)

#### 插入 ;/ 访问

尝试插入多个`;/`访问即`http://localhost:8080/urltest/;/;/;/index.jsp`，页面输出如下：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId30.png)

可以看到，插入多个`;`也能正常访问。

在`;`号后面加上字符串也是能正常访问的，如`http://localhost:8080/urltest/;a/;bb/;ccc/index.jsp`：

![](/Users/aresx/Documents/VulWiki/.resource/Tomcat特殊字符的URL解析/media/rId31.png)

#### 插入其他特殊字符访问

尝试插入如下这些特殊字符进行访问，页面均返回400或404，无法访问：

    ` ~ ! @ # $ % ^ & * ( ) - _ = + [ ] { } \ | : ' " < > ?

#### 小结

由前面的尝试知道，Tomcat中的URL解析是支持嵌入`./`、`../`、`;xx/`等特殊字符的。此外，getRequestURL()和getRequestURI()这两个函数解析提取的URL内容是包含我们嵌入的特殊字符的，当使用不当时会存在安全问题如绕过认证。
