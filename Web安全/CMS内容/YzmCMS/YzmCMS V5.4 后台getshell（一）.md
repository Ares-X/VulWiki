---
source: "hatch 补库批 20260928"
product: "YzmCMS5.4"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version: "YzmCMS 5.4，作者改缓存 mode2 为 mode1 的非默认实验"
title: "YzmCMS V5.4 后台getshell（一）"
prerequisites: "来源所述条件，未列明部分仍待核：admincustomconfig;filecachemode1 nondefault(manuallychanged frommode2);writableexecutablecache"
side_effects: "未执行；本文需注意的操作影响：明确更正：实验先把默认缓存 mode2 人为改为 mode1，因此结论只覆盖非默认文件缓存配置；不能写成默认安装无条件 getshell。"
source_status: "unknown"
id: "vw-ebca3f05fa67cb2dd45bae5d"
entity_id: "ve-ebca3f05fa67cb2dd45bae5d"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：实验先把默认缓存 mode2 人为改为 mode1，因此结论只覆盖非默认文件缓存配置；不能写成默认安装无条件 getshell。
- 保留原文被过滤的失败入口与 mode1 成功路径差异；还需要管理员自定义配置、缓存可写且可执行。截图路径跨入其他版本/漏洞目录，只标需视觉核对，不直接判错图。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：admincustomconfig;filecachemode1 nondefault(manuallychanged frommode2);writableexecutablecache

- **适用与权限边界（1）**：作者手动改mode1后成功，不能写默认安装直接可利用；这一非默认前提必须标题/元数据突出。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：核心_fileputcontents只图，补丁换行如何阻止PHP执行未文本解释。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：大量图指3.6RCE和5.7SQLi目录，需视觉核是否错配。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：部分setcache入口被过滤而失败是有价值负结果，不应全部泛化。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（5）**：独立于645默认配置写backreference方法，勿合并消掉差异；缺修复版本。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YzmCMS V5.4 后台getshell（一）

一、漏洞简介
------------

二、漏洞影响
------------

YzmCMS V5.4

三、复现过程
------------

### 漏洞分析

发现的第一个问题出现在缓存文件写入函数处，文件为`yzmphp/core/class/cache_file.class.php`，函数名为`_fileputcontents`

![](./.resource/YzmCMSv3.6远程命令执行/media/rId25.png)/media/rId25.png)

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

![](./.resource/YzmCMSv3.6远程命令执行/media/rId27.png)/media/rId27.png)

然后添加配置，写入代码即可。

![](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId28.png)/media/rId28.png)

![](./.resource/YzmCMSv3.6远程命令执行/media/rId29.png)/media/rId29.png)

添加以后去查看缓存文件夹`cache/chche_file`，可以看到`configs.cache.php`

直接在浏览器打开

![](./.resource/YzmCMSV5.7用户模块时间盲注/media/rId30.png)/media/rId30.png)

参考链接
--------

> https://xz.aliyun.com/t/7231\#toc-5
