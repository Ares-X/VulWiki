YzmCMS V5.4 后台getshell（一）
==============================

一、漏洞简介
------------

二、漏洞影响
------------

YzmCMS V5.4

三、复现过程
------------

### 漏洞分析

发现的第一个问题出现在缓存文件写入函数处，文件为`yzmphp/core/class/cache_file.class.php`，函数名为`_fileputcontents`

![](./.resource/YzmCMSV5.4后台getshell(一)/media/rId25.png)

可以看到，补丁在原先的`$contents`前拼接了一段`\n`，而如果要进入序列化的代码，需要`$this->config['mode']`为1，然后就是正常的写入文件。

调用这个函数的是同类下的`set`函数

    public function set($id, $data, $cachelife = 0){
            $cache  = array();
            $cache['contents'] = $data;
            $cache['expire']   = $cachelife === 0 ? 0 : SYS_TIME + $cachelife;
            $cache['mtime']    = SYS_TIME;

            if(!is_dir($this->config['cache_dir'])) {
                @mkdir($this->config['cache_dir'], 0777, true);
            }

            $file = $this->_file($id);

            return $this->_fileputcontents($file, $cache);
        }

而这个类`cache_file`在`cache_factory`中被实例化。

在文件`yzmphp/core/class/cache_factory.class.php`中可以看到

    public static function get_instance() {
            if(self::$instances==null){
                self::$instances = new self();
                switch(C('cache_type')) {
                    case 'file' :
                        yzm_base::load_sys_class('cache_file','',0);
                        self::$class = 'cache_file';
                        self::$config = C('file_config');
                        break;
                    case 'redis' : 
                        yzm_base::load_sys_class('cache_redis','',0);
                        self::$class = 'cache_redis';
                        self::$config = C('redis_config');
                        break;
                    case 'memcache' : 
                        yzm_base::load_sys_class('cache_memcache','',0);
                        self::$class = 'cache_memcache';
                        self::$config = C('memcache_config');
                        break;
                    default :
                        yzm_base::load_sys_class('cache_file','',0);
                        self::$class = 'cache_file';
                        self::$config = C('file_config');
                }
            }

            return self::$instances;
        }

这三个类提供了相同的功能，使用者可以通过配置来选择其中的某一个类，默认配置下便是`cache_file`类。

而系统中通过`cache_factory`类来实例化缓存类的函数是在`yzmphp/core/function/global.func.php`中的`setcache`

    function setcache($name, $data, $timeout=0) {
        yzm_base::load_sys_class('cache_factory','',0);
        $cache = cache_factory::get_instance()->get_cache_instances();
        return $cache->set($name, $data, $timeout);
    }

所以传给`setcache`的第一个参数将作为文件名的一部分(后缀为php)，第二个参数将成为文件内容的一部分。缓存配置相同的情况下，文件名路径不变，只要传递的内容可控就可以写入代码从而getshell。

而对`setcache`的调用有多处，其中有一些是不能用的，因为会过滤尖括号，比如`wechat`和`urlrule`模块，最后我通过用户自定义配置成功写入代码。

在文件`commom/function/system.func.php`中有

    function get_config($key = ''){
        if(!$configs = getcache('configs')){
            $data = D('config')->where(array('status'=>1))->select();
            $configs = array();
            foreach($data as $val){
                $configs[$val['name']] = $val['value'];
            }
            setcache('configs', $configs);
        }
        if(!$key){
            return $configs;
        }else{
            return array_key_exists($key, $configs) ? $configs[$key] : '';
        }   
    }

`setcache`的第二个参数是从数据库中`config`表读取的，因此找到一个写入该表的接口，再使得`get_config`函数被调用即可。调用`get_config`比较简单，因为这个函数是用于获取配置的，很多地方都用到了，只要刷新页面即可。所以重点是找到可用的写入接口。

在文件`application/admin/controller/system_manage.class.php`中就有一个可用的接口

    public function user_config_add() {
            if(isset($_POST['dosubmit'])){
                $config = D('config');
                $res = $config->where(array('name' => $_POST['name']))->find();
                if($res) return_json(array('status'=>0,'message'=>'配置名称已存在！'));
                if(empty($_POST['value']))  return_json(array('status'=>0,'message'=>'配置值不能为空！'));

                $_POST['type'] = 99;
                if(in_array($_POST['fieldtype'], array('select','radio'))){
                    $_POST['setting'] = array2string(explode('|', rtrim($_POST['setting'], '|')));
                }else{
                    $_POST['setting'] = '';
                }

                if($config->insert($_POST)){
                    delcache('configs');
                    return_json(array('status'=>1,'message'=>L('operation_success')));
                }else{
                    return_json(array('status'=>0,'message'=>L('data_not_modified')));
                }           
            }
            include $this->admin_tpl('user_config_add');
        }

可以看到post过来的值被直接insert到了`config`表(如果insert的第二个参数为true则会进行过滤)，所以这个接口就可以用于写入代码。

### 漏洞复现

因为安装以后的默认配置中的`file_config`的`mode`为2，所以在我们发现的第一个函数`_fileputcontents`中是不会进入序列化代码的阶段，在进行写入以前，我们需要手动修改配置文件`common/config/config.php`

    //缓存类型为file缓存时的配置项
        'file_config'        => array (
            'cache_dir'      => YZMPHP_PATH.'cache/chche_file/',    //缓存文件目录
            'suffix'         => '.cache.php',  //缓存文件后缀
            'mode'           => '1',           //缓存格式：mode 1 为serialize序列化, mode 2 为保存为可执行文件array
        ),

将该处的`mode`改为`1`保存即可

然后使用`yzmcms/yzmcms`登陆后台，来到系统管理的自定义配置处

![](./.resource/YzmCMSV5.4后台getshell(一)/media/rId27.png)

然后添加配置，写入代码即可。

![](./.resource/YzmCMSV5.4后台getshell(一)/media/rId28.png)

![](./.resource/YzmCMSV5.4后台getshell(一)/media/rId29.png)

添加以后去查看缓存文件夹`cache/chche_file`，可以看到`configs.cache.php`

直接在浏览器打开

![](./.resource/YzmCMSV5.4后台getshell(一)/media/rId30.png)

参考链接
--------

> https://xz.aliyun.com/t/7231\#toc-5
