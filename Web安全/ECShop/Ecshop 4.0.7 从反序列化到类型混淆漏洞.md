Ecshop 从反序列化到类型混淆漏洞
===============================

一、漏洞简介
------------

### 漏洞利用条件

•php 5.6.x

•反序列化入口点

•可以触发\_\_wakeup的触发点（在php \< 5.6.11以下，可以使用内置类）

二、漏洞影响
------------

Ecshop 4.0.7

三、复现过程
------------

首先我们需要找到一个反序列化入口点，这里我们可以全局搜索`unserialize`，挨个看一下我们可以找到两个可控的反序列化入口。

其中一个是search.php line 45

    ...
    {
        $string = base64_decode(trim($_GET['encode']));

        if ($string !== false)
        {
            $string = unserialize($string);
            if ($string !== false)
    ...

这是一个前台的入口，但可惜的是引入初始化文件在反序列化之后，这也就导致我们没办法找到可以覆盖类变量属性的目标，也就没办法进一步利用。

还有一个是`admin/order.php` line 229

        /* 取得上一个、下一个订单号 */
        if (!empty($_COOKIE['ECSCP']['lastfilter']))
        {
            $filter = unserialize(urldecode($_COOKIE['ECSCP']['lastfilter']));

           ...

后台的表单页的这个功能就满足我们的要求了，不但可控，还可以用urlencode来绕过ecshop对全局变量的过滤。

这样一来我们就找到了一个可控并且合适的反序列化入口点。

### 寻找合适的类属性利用链

在寻找利用链之前，我们可以用

    get_declared_classes()

来确定在反序列化时，已经声明定义过的类。

在我本地环境下，除了PHP内置类以外我一共找到13个类

      [129]=>
      string(3) "ECS"
      [130]=>
      string(9) "ecs_error"
      [131]=>
      string(8) "exchange"
      [132]=>
      string(9) "cls_mysql"
      [133]=>
      string(11) "cls_session"
      [134]=>
      string(12) "cls_template"
      [135]=>
      string(11) "certificate"
      [136]=>
      string(6) "oauth2"
      [137]=>
      string(15) "oauth2_response"
      [138]=>
      string(14) "oauth2_request"
      [139]=>
      string(9) "transport"
      [140]=>
      string(6) "matrix"
      [141]=>
      string(16) "leancloud_client"

从代码中也可以看到在文件头引入了多个库文件

    require(dirname(__FILE__) . '/includes/init.php');
    require_once(ROOT_PATH . 'includes/lib_order.php');
    require_once(ROOT_PATH . 'includes/lib_goods.php');
    require_once(ROOT_PATH . 'includes/cls_matrix.php');
    include_once(ROOT_PATH . 'includes/cls_certificate.php');
    require('leancloud_push.php');

这里我们主要关注init.php，因为在这个文件中声明了ecshop的大部分通用类。

在逐个看这里面的类变量时，我们可以敏锐的看到一个特殊的变量，由于ecshop的后台结构特殊，页面内容大多都是由模板编译而成，而这个模板类恰好也在init.php中声明

    require(ROOT_PATH . 'includes/cls_template.php');
    $smarty = new cls_template;

回到order.php中我们寻找与`$smarty`相关的方法，不难发现，主要集中在两个方法中

    ...
        $smarty->assign('shipping', $shipping);

        $smarty->display('print.htm');
    ...

而这里我们主要把视角集中在display方法上。

粗略的浏览下display方法的逻辑大致是

    请求相应的模板文件
    -->
    经过一系列判断，将相应的模板文件做相应的编译
    -->
    输出编译后的文件地址

比较重要的代码会在`make_compiled`这个函数中被定义

    function make_compiled($filename)
        {
            $name = $this->compile_dir . '/' . basename($filename) . '.php';

            ...

            if ($this->force_compile || $filestat['mtime'] > $expires)
            {
                $this->_current_file = $filename;
                $source = $this->fetch_str(file_get_contents($filename));

                if (file_put_contents($name, $source, LOCK_EX) === false)
                {
                    trigger_error('can\'t write:' . $name);
                }

                $source = $this->_eval($source);
            }

            return $source;
        }

当流程走到这一步的时候，我们需要先找到我们的目标是什么？

重新审视`cls_template.php`的代码，我们可以发现涉及到代码执行的只有几个函数。

       function get_para($val, $type = 1) // 处理insert外部函数/需要include运行的函数的调用数据
        {
            $pa = $this->str_trim($val);
            foreach ($pa AS $value)
            {
                if (strrpos($value, '='))
                {
                    list($a, $b) = explode('=', str_replace(array(' ', '"', "'", '"'), '', $value));
                    if ($b{0} == '$')
                    {
                        if ($type)
                        {
                            eval('$para[\'' . $a . '\']=' . $this->get_val(substr($b, 1)) . ';');
                        }
                        else
                        {
                            $para[$a] = $this->get_val(substr($b, 1));
                        }
                    }
                    else
                    {
                        $para[$a] = $b;
                    }
                }
            }

            return $para;
        }

get\_para只在select中调用，但是没找到能触发select的地方。

然后是pop\_vars

        function pop_vars()
        {
            $key = array_pop($this->_temp_key);
            $val = array_pop($this->_temp_val);

            if (!empty($key))
            {
                eval($key);
            }
        }

恰好配合GMP我们可以控制`$this->_temp_key`变量，所以我们只要能在上面的流程中找到任意地方调用这个方法，我们就可以配合变量覆盖构造一个代码执行。

在回看刚才的代码流程时，我们从编译后的PHP文件中找到了这样的代码

order\_info.htm.php

      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

在遍历完表单之后，正好会触发`pop_vars`。

这样一来，只要我们控制覆盖`cls_template`变量的`_temp_key`属性，我们就可以完成一次getshell

### 最终利用效果

1.png

参考链接
--------

> https://mp.weixin.qq.com/s/KD0fKbSA9SUGY1lGas1xSA
