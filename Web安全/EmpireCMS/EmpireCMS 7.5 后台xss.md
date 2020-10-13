EmpireCMS 7.5 后台xss
=====================

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
