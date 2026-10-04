---
source: "hatch 补库批 20260928"
product: "ECShop 4.0.7"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Ecshop 4.0.7 从反序列化到类型混淆漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台订单页有效会话；PHP5.6.x与GMP类型混淆条件、已加载cls_template；不是search.php直接前台利用"
side_effects: "未执行；本文需注意的操作影响：GMP如何覆盖smarty对象与触发__wakeup的关键序列化构造未给出；概述未列GMP扩展，最终效果仅1.png文字占位"
source_status: "unknown"
id: "vw-7f9843b83176214313838188"
entity_id: "ve-7f9843b83176214313838188"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台订单页有效会话；PHP5.6.x与GMP类型混淆条件、已加载cls_template；不是search.php直接前台利用

- **结论使用边界（1）**：正文明确search.php反序列化早于初始化而无法使用目标类，不能写成无鉴权前台RCE。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（2）**：GMP如何覆盖smarty对象与触发__wakeup的关键序列化构造未给出；概述未列GMP扩展，最终效果仅1.png文字占位。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：仅微信来源，缺PHP精确补丁范围/对应类型混淆编号。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Ecshop 从反序列化到类型混淆漏洞

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

> **图片待核**：原归档在此处仅保留文件名 `1.png`，没有可对应的图片引用。

参考链接
--------

> https://mp.weixin.qq.com/s/KD0fKbSA9SUGY1lGas1xSA
