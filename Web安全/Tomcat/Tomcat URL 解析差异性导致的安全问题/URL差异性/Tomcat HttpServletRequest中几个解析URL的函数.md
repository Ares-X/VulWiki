### Tomcat HttpServletRequest中几个解析URL的函数

在Servlet处理URL请求的路径时，HTTPServletRequest有如下几个常用的函数：

-   request.getRequestURL()：返回全路径；
-   request.getRequestURI()：返回除去Host（域名或IP）部分的路径；
-   request.getContextPath()：返回工程名部分，如果工程映射为`/`，则返回为空；
-   request.getServletPath()：返回除去Host和工程名部分的路径；
-   request.getPathInfo()：仅返回传递到Servlet的路径，如果没有传递额外的路径信息，则此返回Null；

网上的一个小结，Servlet的匹配路径为`/test%3F/*`，并且Web应用是部署在`/app`下，此时请求的URL为`http://30thh.loc:8480/app/test%3F/a%3F+b;jsessionid=s%3F+ID?p+1=c+d&p+2=e+f#a`，各个函数解析如下表：

  函数               URL解码   解析结构
  ------------------ --------- ---------------------------------------------------------------
  getRequestURL()    no        `http://30thh.loc:8480/app/test%3F/a%3F+b;jsessionid=s%3F+ID`
  getRequestURI()    no        `/app/test%3F/a%3F+b;jsessionid=s%3F+ID`
  getContextPath()   no        `/app`
  getServletPath()   yes       `/test?`
  getPathInfo()      yes       `/a?+b`
