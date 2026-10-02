---
source: "hatch 补库批 20260928"
product: "EmpireCMS7.5 AdminPage"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EmpireCMS 7.5 后台xss"
prerequisites: "来源所述条件，未列明部分仍待核：后台登录及随机ehash令牌；浏览器允许iframe javascript URL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-47b66cd31f92243c0fe6a3d2"
entity_id: "ve-47b66cd31f92243c0fe6a3d2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台登录及随机ehash令牌；浏览器允许iframe javascript URL

- **证据待核（1）**：根因是URL协议校验不足，不是没有恶意关键词过滤；htmlspecialchars/addslashes不能替代URL白名单。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（2）**：完整攻击还需取得/满足受害会话ehash，不能直接用演示固定令牌。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **证据待核（3）**：源码图全部数字占位，无法检索；来源为转载站。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EmpireCMS 7.5 后台xss

一、漏洞简介
------------

该漏洞是由于代码只使用htmlspecialchars进行实体编码过滤,而且参数用的是ENT\_QUOTES(编码双引号和单引号),还有addslashes函数处理,但是没有对任何恶意关键字进行过滤,从而导致攻击者使用别的关键字进行攻击。

二、漏洞影响
------------

EmpireCMS 7.5

三、复现过程
------------

### 漏洞分析

漏洞出现的页面在/e/admin/openpage/AdminPage.php,浏览漏洞页面代码,发现使用hRepPostStr函数对leftfile、title、mainfile参数进行处理

1.png

跟进hRepPostStr函数,发现htmlspecialchars进行实体编码过滤,而且参数用的是ENT\_QUOTES(编码双引号和单引号)

2.png

继续浏览代码,发现使用CkPostStrChar函数对参数进行处理

3.png

跟进CkPostStrChar函数,处理编码字符4.png

继续浏览代码,发现又使用了AddAddsData函数对参数进行处理

5.png

跟进AddAddsData函数,分析代码:如果没有开启magic\_quotes\_gpc函数,就使用addslashes函数对参数中的特殊字符进行转义处理

6.png

继续浏览代码,发现在网页输出时,
\$leftfile、\$mainfile参数的输出位置是iframe标签的src里面,由于代码没有对别的恶意字符进行处理,此时可以构造javascript:alert(/xss/),iframe标签可以执行javascript代码,此时就会触发XSS代码。

7.png

### 漏洞复现

浏览器访问构造的payload`http://www.0-sec.org/e/admin/openpage/AdminPage.php?mainfile=javascript:alert(/xss/)`,提示非法来源

此时发现别的页面url地址中都会存在hash参数,例如ehash\_f9Tj7=ZMhwowHjtSwqyRuiOylK,这个参数是随机生成的,如果缺少这个参数,会提示非法来源

再次构造payload,浏览器访问,成功触发XSS

    http://www.0-sec.org/e/admin/openpage/AdminPage.php?ehash_f9Tj7=ZMhwowHjtSwqyRuiOylK&mainfile=javascript:alert(/xss/)
    http://www.0-sec.org/e/admin/openpage/AdminPage.php?ehash_f9Tj7=ZMhwowHjtSwqyRuiOylK&mainfile=javascript:alert(document.cookie)

参考链接
--------

> https://www.shuzhiduo.com/A/ZOJPejMP5v/
