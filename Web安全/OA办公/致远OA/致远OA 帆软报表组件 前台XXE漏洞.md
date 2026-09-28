致远OA 帆软报表组件 前台XXE漏洞
===============================

一、漏洞简介
------------

二、漏洞影响
------------

致远A6-V5 V6.1致远A6-V5 V6.1SP1致远A8-V5 V6.1SP1致远A8-V5 V6.1SP2

三、复现过程
------------

### 漏洞分析

分析 xml 文件

    /A8/ApacheJetspeed/webapps/seeyonreport/WEB-INF/web.xml

找到并分析对url: `/seeyonreport/SeeyonReportServiceServlet` 的请求处理类
`com.seeyon.ctp.seeyonreport.service.SeeyonReportServiceServlet`

    <servlet>
        <servlet-name>SeeyonReportServiceServlet</servlet-name>
        <servlet-class>com.seeyon.ctp.seeyonreport.service.SeeyonReportServiceServlet</servlet-class>
        <load-on-startup>2</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>SeeyonReportServiceServlet</servlet-name>
        <url-pattern>/SeeyonReportServiceServlet</url-pattern>
    </servlet-mapping>

跟入 `Servlet` 的 `doPost` 方法中

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

找到 `case SELECT`流程

    case SELECT:
        this.execSelect(request, response);
        break;

跟入 `this.execSelect` 函数，如下：

    public void execSelect(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter pw = response.getWriter();
        String dataSetName = request.getParameter("dataSetName");
        List<String> tableDataNames = SeeyonReportCommonUtil.getTemplateServerTableDataNames(dataSetName);
        Collections.sort(tableDataNames);
        String json = JSONHelper.list2json(tableDataNames);
        pw.write(json);
        pw.close();
    }

获取了下 `dataSetName` 请求参数的值，传入
`SeeyonReportCommonUtil.getTemplateServerTableDataNames()`
函数，继续跟进：

    public static List<String> getTemplateServerTableDataNames(String cptName) {
        List<String> tableDataNames = getTemplateTableDataNames(cptName);
        List<String> serverDataSet = new ArrayList();
        List<String> allDataSet = getTemplateAllTableDataNames(cptName);
        Iterator iter = allDataSet.iterator();

        while(iter.hasNext()) {
            String name = (String)iter.next();
            if (!tableDataNames.contains(name)) {
                serverDataSet.add(name);
            }
        }

        return serverDataSet;
    }

参数值先进入了 `getTemplateTableDataNames` ，然后又传入了
`getTemplateAllTableDataNames` 函数。

看一下后面的 `getTemplateAllTableDataNames` 函数（部分代码省略）：

    public static List<String> getTemplateAllTableDataNames(String cptName) {
        List<Element> rEles = getWorkBookElement(WorkBook.Report, cptName);
        List<String> serverDataSet = new ArrayList();
        if (!rEles.isEmpty()) {
            Iterator var3 = rEles.iterator();
            while(var3.hasNext()) {
                ……
                    }
        }
        return serverDataSet;
    }

发现开始的请求参数 `dataSetName` 的值被当做 `cptName`，传入
`getWorkBookElement(WorkBook.Report, cptName)`函数中，继续跟进：

    public static List<Element> getWorkBookElement(WorkBook wb, String cptName) {
        Env env = FRContext.getCurrentEnv();
        List eles = null;

        try {
            SAXReader reader = new SAXReader();
            boolean isExist = env.isTemplateExist(cptName);
            if (isExist) {
                String reportPath = StableUtils.pathJoin(new String[]{env.getPath(), "reportlets", cptName});
                File file = new File(reportPath);
                Document document = reader.read(file);
                Element root = document.getRootElement();
                List<Element> childElements = root.elements();
                if (!childElements.isEmpty()) {
                    Iterator var11 = childElements.iterator();

                    while(var11.hasNext()) {
                        Element el = (Element)var11.next();
                        if (el.getName().equals(wb.name())) {
                            eles = el.elements();
                            break;
                        }
                    }
                }
            }
        } catch (Exception var13) {
            LOG.error(var13);
        }

        return eles;
    }

可以发现 `cptName` 貌似被拼接到了路径中，进入 `StableUtils.pathJoin`
也没发现对特殊字符的过滤，到这里其实已经可以通过 `../` 跳目录，控制
`reportPath` 值，传入一个我们指定的文件路径：

    String reportPath = StableUtils.pathJoin(new String[]{env.getPath(), "reportlets", cptName})

再结合 xxe 的示范级写法：

    SAXReader reader = new SAXReader();
    File file = new File(reportPath);
    Document document = reader.read(file);

只要传入一个带有 `XXE` 载荷的本地文件路径，就可以触发 `XXE` 漏洞了。

正好，2019 年HW行动期间爆出来一个 帆软报表v8.0
Getshell漏洞，里面就有一个 未授权插件上传，文件内容可控并且路径固定：

    /A8/ApacheJetspeed/webapps/seeyonreport/WEB-INF/cache/temp.zip

当然，如果有其他可以控制上传文件内容的方法，也可以。

### 漏洞复现

1.  通过未授权插件上传，将 XXE 载荷保存到固定路径文件：

```{=html}
<!-- -->
```
    /A8/ApacheJetspeed/webapps/seeyonreport/WEB-INF/cache/temp.zip

2.  通过 `/seeyonreport/SeeyonReportServiceServlet` 接口，跳目录后，使用
    `SAXReade` 读取 `temp.zip` 文件即可。

### 参考链接

> https://landgrey.me/blog/8/
