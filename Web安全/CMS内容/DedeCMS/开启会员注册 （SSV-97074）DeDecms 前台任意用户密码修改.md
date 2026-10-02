---
source: "hatch 补库批 20260928"
product: "DedeCMS"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "SSV-97074"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "开启会员注册 （SSV-97074）DeDecms 前台任意用户密码修改"
prerequisites: "来源所述条件，未列明部分仍待核：Member function enabled; target security question0 and empty answer; ten-minute request throttle; PHP legacy comparison behavior; version unstated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-820b6b4f2498c54dde0c3e48"
entity_id: "ve-820b6b4f2498c54dde0c3e48"
schema_version: "1"
---

## 核对与使用边界

- 编号说明：保留原文明确使用的 SSV 条目编号作为文章主引用标识，SSV 与 CVE/CNVD 为不同编号体系；来源归属仍未独立核验。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Member function enabled; target security question0 and empty answer; ten-minute request throttle; PHP legacy comparison behavior; version unstated

- **证据待核（1）**：Detailed00/000/0.0 comparison explanation adds missing mechanics to70/71。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（2）**：Generic PHP comparison examples are version-dependent and chained comparisons not runnable PHP as shown。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：Impact section empty and all image links have trailing duplicated path fragments。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（4）**：No direct source URL despite SSV identifier; member-only limitation correct。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# （SSV-97074）DeDecms 前台任意用户密码修改

一、漏洞简介
------------

无CVE， SSV-97074，提交时间：20180110

在用户密码重置功能处，php存在弱类型比较，导致如果用户没有设置密保问题的情况下可以绕过验证密保问题，直接修改密码(管理员账户默认不设置密保问题)。值得注意的是修改的密码是member表中的密码，即使修改了管理员密码也是member表中的管理员密码，仍是无法进入管理

二、漏洞影响
------------

三、复现过程
------------

### 代码分析

php弱类型比较问题很常见，在不同类型比较时，如果使用的是==，php会将其中一个数据进行强制转换为另一个，比如'123a'就会被强制转换成123。这样就出现了弱类型比较问题，当然如果使用===判断比较就不会出现问题了。常见比较如下

    '' == 0 == false '123' == 123             //'123'强制转换为123 
    'abc' == 0　        //intval('abc')==0 
    '123a' == 123            //intval('123a')==123 
    '0x01' == 1             //被识别为十六进制
    '0e123456789' == '0e987654321'　　//被识别为科学计数法 
    [false] == [0] == [NULL] == [''] 
    NULL == false == 0 
    true == 1

dedecms的/member/resetpassword.php就是用来处理用户密码重置的问题，问题出在75行开始处理验证密保问题处。

    else if($dopost == "safequestion")
    {
        $mid = preg_replace("#[^0-9]#", "", $id);
        $sql = "SELECT safequestion,safeanswer,userid,email FROM #@__member WHERE mid = '$mid'";
        $row = $db->GetOne($sql);
        if(empty($safequestion)) $safequestion = '';
     
        if(empty($safeanswer)) $safeanswer = '';
     
        if($row['safequestion'] == $safequestion && $row['safeanswer'] == $safeanswer)
        {
            sn($mid, $row['userid'], $row['email'], 'N');
            exit();
        }
        else
        {
            ShowMsg("对不起，您的安全问题或答案回答错误","-1");
            exit();
        }
     
    }

可以看到，这段代码先是从数据库取出相关用户的密保问题及密保答案，在对用户输入做了一些处理后，进行了关键性的判断if(\$row\[\'safequestion\'\]
== \$safequestion && \$row\[\'safeanswer\'\] == \$safeanswer)
，就在这里用了弱类型判断==。

首先我们知道，如果没有设置密保的话safequestion从数据库取出默认为'0'，safeanswer为空。根据empty函数特性，'0'会被判断为空，会进入重新将\$safequestion赋值为''。而\'0\'
!= \'\'
，所以我们需要一个输入即不使empty为空，且弱类型等于'0'的字符串。\'00\'、\'000\'、\'0.0\'以上这些都是可以的。

接下来safeanswer既然本来就为空，那么不输入正好也就相等了。跟踪sn函数

    function sn($mid,$userid,$mailto, $send = 'Y')
    {
        global $db;
        $tptim= (60*10);
        $dtime = time();
        $sql = "SELECT * FROM #@__pwd_tmp WHERE mid = '$mid'";
        $row = $db->GetOne($sql);
        if(!is_array($row))
        {
            //发送新邮件；
            newmail($mid,$userid,$mailto,'INSERT',$send);
        }
        //10分钟后可以再次发送新验证码；
        elseif($dtime - $tptim > $row['mailtime'])
        {
            newmail($mid,$userid,$mailto,'UPDATE',$send);
        }
        //重新发送新的验证码确认邮件；
        else
        {
            return ShowMsg('对不起，请10分钟后再重新申请', 'login.php');
        }
    }

跟踪newmail

    function newmail($mid, $userid, $mailto, $type, $send)
    {
        global $db,$cfg_adminemail,$cfg_webname,$cfg_basehost,$cfg_memberurl;
        $mailtime = time();
        $randval = random(8);
        $mailtitle = $cfg_webname.":密码修改";
        $mailto = $mailto;
        $headers = "From: ".$cfg_adminemail."\r\nReply-To: $cfg_adminemail";
        $mailbody = "亲爱的".$userid."：\r\n您好！感谢您使用".$cfg_webname."网。\r\n".$cfg_webname."应您的要求，重新设置密码：（注：如果您没有提出申请，请检查您的信息是否泄漏。）\r\n本次临时登陆密码为：".$randval." 请于三天内登陆下面网址确认修改。\r\n".$cfg_basehost.$cfg_memberurl."/resetpassword.php?dopost=getpasswd&id=".$mid;
        if($type == 'INSERT')
        {
            $key = md5($randval);
            $sql = "INSERT INTO `#@__pwd_tmp` (`mid` ,`membername` ,`pwd` ,`mailtime`)VALUES ('$mid', '$userid',  '$key', '$mailtime');";
            if($db->ExecuteNoneQuery($sql))
            {
                if($send == 'Y')
                {
                    sendmail($mailto,$mailtitle,$mailbody,$headers);
                    return ShowMsg('EMAIL修改验证码已经发送到原来的邮箱请查收', 'login.php','','5000');
                } else if ($send == 'N')
                {
                    return ShowMsg('稍后跳转到修改页', $cfg_basehost.$cfg_memberurl."/resetpassword.php?dopost=getpasswd&amp;id=".$mid."&amp;key=".$randval);
                }
            }
            else
            {
                return ShowMsg('对不起修改失败，请联系管理员', 'login.php');
            }
        }

可见在sn函数中将send参数设置了'N'，其实就是生成了暂时密码并插入了数据库中，并进行跳转：

    else if ($send == 'N')
    {
        return ShowMsg('稍后跳转到修改页', $cfg_basehost.$cfg_memberurl."/resetpassword.php?dopost=getpasswd&amp;id=".$mid."&amp;key=".$randval);
    }

### 复现

在找回密码处，点击通过安全问题取回。

![](./.resource/开启会员注册SSV-97074DeDecms前台任意用户密码修改/media/rId26.png)DeDecms前台任意用户密码修改/media/rId26.png)

填写信息并抓包，修改id和userid为想要重置密码的对象，再加上以上分析内容，发包即可得到修改密码url

![](./.resource/开启会员注册SSV-97074DeDecms前台任意用户密码修改/media/rId27.png)DeDecms前台任意用户密码修改/media/rId27.png)

进入该url，修改密码。

![](./.resource/开启会员注册SSV-97074DeDecms前台任意用户密码修改/media/rId28.png)DeDecms前台任意用户密码修改/media/rId28.png)
