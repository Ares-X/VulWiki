Metinfo 6.1.2 SQL注入
=====================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 漏洞分析

漏洞文件：/var/www/html/metinfo6.1.2/app/system/message/web/message.class.php
漏洞函数：add 37-51行

    public function add($info) {
              global $_M;
              if(!$_M[form][id]){
         $message=DB::get_one("select * from {$_M[table][column]} where module= 7 and lang ='{$_M[form][lang]}'");
         $_M[form][id]=$message[id];
              }
              $met_fd_ok=DB::get_one("select * from {$_M[table][config]} where lang ='{$_M[form][lang]}' and  name= 'met_fd_ok' and columnid = {$_M[form][id]}");
      $_M[config][met_fd_ok]= $met_fd_ok[value];
              if(!$_M[config][met_fd_ok])okinfo('javascript:history.back();',"{$_M[word][Feedback5]}");
              if($_M[config][met_memberlogin_code]){
                      if(!load::sys_class('pin', 'new')->check_pin($_M['form']['code'])){

                                               okinfo(-1, $_M['word']['membercode']);
                      }
          }

漏洞触发点：

    $met_fd_ok=DB::get_one("select * from {$_M[table][config]} where lang ='{$_M[form][lang]}' and  name= 'met_fd_ok' and columnid = {$_M[form][id]}");

由于无单引号过滤导致sql注入，这个时候尝试注入发现关键词全被替换了，无法注入。于是查看\_\_controler函数发现调用了父类的初始化函数。

class feedback extends web

跟进web类，没有对用户传入的数据进行过滤等操作，却初始化了common类

class web extends common

查看Common类的初始化函数发现了问题所在

    public function __construct() {
               global $_M;//全局数组$_M
               ob_start();//开启缓存
               $this->load_mysql();//数据库连接
               $this->load_form();//表单过滤
               $this->load_lang();//加载语言配置
               $this->load_config_global();//加载全站配置数据
               $this->load_url_site();
               $this->load_config_lang();//加载当前语言配置数据
               $this->load_url();//加载url数据
       }

跟踪 \$this→load\_form() 函数

    protected function load_form() {
               global $_M;
               $_M['form'] =array();
               isset($_REQUEST['GLOBALS']) && exit('Access Error');
               foreach($_COOKIE as $_key => $_value) {
                       $_key{0} != '_' && $_M['form'][$_key] = daddslashes($_value);
               }
               foreach($_POST as $_key => $_value) {
                       $_key{0} != '_' && $_M['form'][$_key] = daddslashes($_value);
               }
               foreach($_GET as $_key => $_value) {
                       $_key{0} != '_' && $_M['form'][$_key] = daddslashes($_value);
               }
               if(is_numeric($_M['form']['lang'])){//伪静态兼容
                       $_M['form']['page'] = $_M['form']['lang'];
                       $_M['form']['lang'] = '';
               }
               if($_M['form']['metid'] == 'list'){
                       $_M['form']['list'] = 1;
                       $_M['form']['metid'] = $_M['form']['page'];
                       $_M['form']['page'] = 1;
               }
               if(!preg_match('/^[0-9A-Za-z]+$/', $_M['form']['lang']) && $_M['form']['lang']){
                       echo "No data in the database,please reinstall.";
                       die();
               }
       }

把COOKIE、POST、GET 传入 daddslashes函数进行过滤

    function daddslashes($string, $force = 0) {
            !defined('MAGIC_QUOTES_GPC') && define('MAGIC_QUOTES_GPC',         get_magic_quotes_gpc());
            if(!MAGIC_QUOTES_GPC || $force) {
                    if(is_array($string)) {
                            foreach($string as $key => $val) {
                                    $string[$key] = daddslashes($val, $force);
                            }
                    } else {
                            if(!defined('IN_ADMIN')){
                                    $string = trim(addslashes(sqlinsert($string)));
                            }else{
                                    $string = trim(addslashes($string));
                            }
                    }
            }
            return $string;
    }

这里判断是否开启了get\_magic\_quotes\_gpc() 如果没开启或者 \$force !=0
就进入过滤。 然而最重要的环节在这里

        if(!defined('IN_ADMIN')){
                                   $string = trim(addslashes(sqlinsert($string)));
                           }else{
                                   $string = trim(addslashes($string));
                           }

判断 IN\_ADMIN 常量是否已经定义了，如果没定义就使用\$string =
trim(addslashes(sqlinsert(\$string)));来过滤我们的值

而如果定义了就使用\$string = trim(addslashes(\$string));来过滤。

刚刚我们进行sql注入测试失败而且语句被过滤了，
addslashes只过滤特殊字符，所以我们肯定是被
sqlinsert函数给过滤了。导致我们无法sql注入。至于sqlinsert函数我就不贴出来了，我们要做的是饶过这个函数，而不是饶过他这个规则。

defined(\'IN\_ADMIN\')
我们需要找这个常量在哪里定义的。其实写这句话有点多余，看过我之前几篇Metinfo漏洞的话应该就会发现问题了。我写过一个关于/admin/index.php文件任意调用带do方法的问题。

然后我们打开这个文件看一下。

    <?php
    define('IN_ADMIN', true);
    $M_MODULE='admin';
    if(@$_GET['m'])$M_MODULE=$_GET['m'];
    if(@!$_GET['n'])$_GET['n']="index";
    if(@!$_GET['c'])$_GET['c']="index";
    if(@!$_GET['a'])$_GET['a']="doindex";
    @define('M_NAME', $_GET['n']);
    @define('M_MODULE', $M_MODULE);
    @define('M_CLASS', $_GET['c']);
    @define('M_ACTION', $_GET['a']);
    require_once '../app/system/entrance.php';
    ?>

没错这个常量就是在这个文件定义的。而且他可以调用任意带do方法。不过问题又来了，漏洞函数是add并且不带do，那就找调用白，于是找到
domessage这个函数。

domessage方法 18-24

    public function domessage() {
                  global $_M;
                  if($_M['form']['action'] == 'add'){
                          $this->check_field();
                          $this→add($_M['form']);

这里在调用 add方法之前先调用了
check\_field方法，我们要做的就是保证程序能够顺利执行到add方法，研究了一会发现只需要正常留言，把它传递的参数拷下来就ok了。
然后顺利执行到了add方法，成功的进行了sql注入。

    payload：

    http:/0-sec.org/metinfo6//admin/index.php?m=web&n=message&c=message&a=domessage&action=add&lang=cn¶137=1¶186=1¶138=1¶139=1¶140=1&id=42

这里说一下这个id=42，这个值42是不能修改的，目的是让他返回验证码错误，饶过了第一层判断。

        if(!$_M[config][met_fd_ok])okinfo('javascript:history.back();',"{$_M[word][Feedback5]}");
        if($_M[config][met_memberlogin_code]){
                if(!load::sys_class('pin', 'new')->check_pin($_M['form']['code'])){

                                         okinfo(-1, $_M['word']['membercode']);
                }
    }

至于为什么让他饶过第一层判断返回验证码错误，这样的话我们可以布尔盲注，否则只能进行时间注入。这里不多解释，自己研究一下。

![](/Users/aresx/Documents/VulWiki/.resource/Metinfo6.1.2SQL注入/media/rId25.png)

![](/Users/aresx/Documents/VulWiki/.resource/Metinfo6.1.2SQL注入/media/rId26.png)

### 解决方法

    修改文件：metinfo6.1.2/app/system/message/web/message.class.php
    修改内容：
            $met_fd_ok=DB::get_one("select * from {$_M[table][config]} where lang ='{$_M[form][lang]}' and  name= 'met_fd_ok' and columnid = {$_M[form][id]}");
    修改为：
            $met_fd_ok=DB::get_one("select * from {$_M[table][config]} where lang ='{$_M[form][lang]}' and  name= 'met_fd_ok' and columnid = ‘{$_M[form][id]}’");
    这样就解决了。

### 漏洞验证脚本

https://github.com/ianxtianxt/Metinfo-6.1.2-SQL-inj
