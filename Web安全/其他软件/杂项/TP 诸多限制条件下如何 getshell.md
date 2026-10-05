---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "TP 诸多限制条件下如何 getshell"
product: "2020N1CTF Easy_tp5/定制ThinkPHP5.0.0"
record_type: "analysis"
document_type: "CTF题解"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "PHP7、定制函数禁用/文件包含限制、open_basedir、仅public可写；方法4明确不适用于原题禁用error_log"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/TP%20%E8%AF%B8%E5%A4%9A%E9%99%90%E5%88%B6%E6%9D%A1%E4%BB%B6%E4%B8%8B%E5%A6%82%E4%BD%95%20getshell.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/LaTNNjwDT1VzN6uA0Gq0-Q"
id: "vw-dfe96b2cf5f92b62f32c0f47"
entity_id: "ve-dfe96b2cf5f92b62f32c0f47"
schema_version: "1"
---

# TP 诸多限制条件下如何 getshell

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：2020N1CTF Easy_tp5/定制ThinkPHP5.0.0
- 文献类型：CTF题解
- 版本、权限及部署边界：PHP7、定制函数禁用/文件包含限制、open_basedir、仅public可写；方法4明确不适用于原题禁用error_log
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 必须分类CTF定制环境，不把绕过滤器的方法直接记为所有ThinkPHP产品漏洞；源码和题目包未连
2. error_reporting无论参数都返回0错误，其返回旧错误级别；弱比较/静态调用非静态方法是PHP版本相关行为不可外推PHP8
3. 方法5先说无$this才可静态调用又使用self::path->$this，需解释调用上下文绑定而非普遍规则
4. 方法1–5关键限制、代码、HTTP payload几乎仅图片，未视检，无法凭文字复现；应回源提取代码
5. 保留Windows非法文件名字/不同Linux目录行为和方法4额外前提等互补证据，不机械合并5条路线

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/LaTNNjwDT1VzN6uA0Gq0-Q>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/LaTNNjwDT1VzN6uA0Gq0-Q)

这是 **酒仙桥六号部队** 的第 **123** 篇文章。

全文共计 3172 个字，预计阅读时长 9 分钟。

**前言**

先说说 2020_n1CTF 的 web 题 Easy_tp5 复现问题。

这个题在保留 thinkphp 的 RCE 点的同时，并且 RCE 中 ban 掉许多危险函数，只能允许单参数的函数执行。对于现在在网络中流传的文件包含的点也增加了限制。

**smile yyds!**

先说一下这个题限制条件：

*   thinkphp 版本：5.0.0
    
*   php 版本：7
    
*   对于包含文件增加了限制
    

![](../../.resource/remote/8c1b2eada6592d4b4fc64ad89889d2f85efa52f6a0c7dd99c91eea1c23255603.png)

*   ban 掉所有的单参数危险函数
    

![](../../.resource/remote/6e07e2f680c0fd5f32b64d795f589172e68a6de02d92247eb036b1dcb24ac615.png)

*   设置 open_basedir 为 web 目录
    

![](../../.resource/remote/26f0aa44122edf3a172cc6a29c8ede75d4761842c5b3fcf18c8b24a650cf5bc7.png)

*   设置仅在 public 目录下可写
    

![](../../.resource/remote/2cce36043a7379a09b42ab83c2fce38462e820c7e98f7c2b43db729f35acecda.png)

在 TP5.0.0 的中，目前公布的只是存在利用 Request 类其中变量被覆盖导致 RCE。如果 ban 掉单参数可利用函数那么只能用文件包含，但是文件包含做了限制不能包含 log 文件，所以只能从别的方面入手。

这些限制都太大了，所以需要想办法去上传一个 shell 来完成后续绕 disable_function。

首先 TP5.0.0 目前只存在通过覆盖 Request 中的某些变量导致 RCE，其余细节不再赘述，我们看看大概代码执行点在哪里。

![](../../.resource/remote/78d6c6c61a88bb63af224360e730ed69bd65574a1b2c9172ecdcbef5c576cf5b.jpg)

call_user_func 是代码执行点，我们基本上所有 PHP 自带的可利用函数基本被 ban 掉，所以我们需要从自写的函数调用来入手，首先我们需要看下这个点。可回调函数不仅仅指的是简单函数，还可以是一些对象的方法，包括静态方法。

![](../../.resource/remote/a0ee355df54db5884d500b3ee6be69ba25a836abe131a95551fea87ef5fc8226.png)

**方法一 thinkphp\library\think\Build::module**

我们可以这样通过调用这个类的静态方法 module，来实现写文件的操作。

![](../../.resource/remote/2054d93e6862bd13db7bb1daf89ea6be25bc329ed40e4af7a48e26d3d6497b89.png)

我们先看看这个该怎么走，我们看到这个 mkdir 是在 application 创建目录，但是由于权限问题肯定无法创建。根据 TP 报错即退出的机制从而中断执行。那么我们可以通过`../public/test`来创建目录。

我们会进入到 buildhello 函数中。

![](../../.resource/remote/e507537c03a2591b6bd29507fa2742355380f1a0916c487855fdd5b3b5f5bec2.jpg)

走完流程发现我们可以在 public 创建了一个 test 模块，同样看到`test/controller/Index.php`中我们所写的`../public/test`保存了下来那么我们就绕过，但是执行完之后会发现一些语法错误导致代码不能执行。

![](../../.resource/remote/59ac5c0435830fa94a514ce96aff7d543b0a2cfb14450a579f3b7ada88204cec.jpg)

由于这部分内容可控那我们就把他变得符合语法执行，我们可以这么做`test;eval($_POST[a]);#/../../public/test;`，这样就符合语法。

![](../../.resource/remote/6794118909be1521e09089c006d6afe3c024d2c8e1b1a578832460bf1598df3b.png)

但是还有一个问题需要解决，就是我们这样的 payload 会设置一个不存在目录从而可以符合语法并且加入 eval 函数。但是现在还存在一个跨越不存在目录的问题。

![](../../.resource/remote/9c746bfee99b8a9ce45ad22ac1d99af8d4615d69f64d8c1893f10ab1cf056775.png)

*   linux 环境
    

![](../../.resource/remote/a94bf14353816bdca34d7d63572c1ca9b25ce7c67d7845a822244e6c81d67511.png)

*   win 环境
    

![](../../.resource/remote/1b83d4967c4274de405c1b56bed269194f44164e6feed3ddada5add8d5d8dfdc.jpg)

在 Linux 中不能创建不存在的目录，但是在 win 下就可以。但是报错是 warning，并不会中断执行，并且在 bindhello 函数中我们会看到：  

![](../../.resource/remote/d32c556fa646440e959291e0bee8c05c8c8008d1a5e89a67c15fea314e85049a.jpg)

其中 mkdir 函数存在 recursive 参数为 true，允许递归创建多级嵌套的目录。这样就可以使 mkdir 中使用不存在的目录就可以进行绕过。但是现在有个问题：前面的 mkdir 中的 warning 报错被 TP 捕获到直接会退出无法执行后面的内容，那么我们就需要使用一些办法进行抑制报错。我们经常做题会用到一个函数`error_reporting`，我们可以使用`error_reporting(0)`抑制报错。

我们再回到代码执行点，我们发现 call_user_func 函数执行完的值会执行循环再次回到 call_user_func() 中当回调函数的参数进行使用。因此需要考虑一下怎么调整才能让我们执行并且抑制报错。

1. 如果我们将`error_reporting`放在前面执行，无论参数是什么都会返回 0 从而导致后面执行代码不可控。

2. 如果我们将`think\Build::module`放前面，那么 thinkphp 报错也不能执行成功。

但是如果我们放入一个中间值，在第一次执行能够成功创建目录，并且`error_reporting`还能成功执行，这时候就需要用到 PHP 弱类型比较，**PHP 中 0 == null，0 == 非数字开头的字符串。**

payload 如下可示：

![](../../.resource/remote/f1e1054e4c5995744cace669091892ef5f04912e27796bf1e537625eb687c689.png)

![](../../.resource/remote/6b48ce2870473813a37f05ced840f4250d9fb5e6ffd8562de6c1a5476897820e.png)

**方法二 使用注释符绕过语法产生的错误**

payload 如下：

![](../../.resource/remote/890d662facd9d29e40d4b45cfbfcf1e6545bcf303ba17fe191e97cdc26e53f06.jpg)

这样就会使用注释符注释掉后面的语法错误，然后使用`?>`包裹住，后面跟上自己用的 payload 即可。但是这样会产生一个问题，无法在 win 环境下使用，win 下文件夹中不能带这些字符`/ \ : * ? " < > |`

**方法三 文件包含 & php 伪协议**

这种操作就是，我们通过之前的`think\Build::module`写文件进去，写入的内容是我们 rot13 编码过的。然后通过`think\__include_file`调用我们写入文件的内容，因为这个过滤不够完全，可以让我们包含我们所写的内容。

![](../../.resource/remote/87b9504309cdef3faa75d0d428685ba86c23b63613ec499becd90dc5f583a5df.jpg)

![](../../.resource/remote/3584f0abbd1f15c6fb99065d02587aa2ad8e8bbb8149d84457dec440ddf8bbca.png)

**方法四 覆盖日志路径写入**

因为题目将 error_log 函数 ban 掉了，所以这个非预期解是在不 ban 掉 error_log 函数的情况下所实现的。

payload 具体如下：

![](../../.resource/remote/1b0d5d0a437fe042083eeb17a037a758eeff4afbe656be5bec8117ea94770016.png)

1. 通过`json_decode`使得我们传入的`{"type":"File", "path":"/var/www/html/null/public/logs"}`转换成内置类 stdClass 的一个对象。

2. 再通过`get_object_vars`将其转换成数组传入到`think\Log::init`中。

3. 在其中会 new 了一个`\think\log\driver\File`，并且传入的参数是我们的`'path'=>/var/www/html/null/public/logs`，那么会触发类中的__construct，将其默认的 path 给覆盖掉。

![](../../.resource/remote/3f918a9f2a76caf6987e3ee6cd6a5c40e9a31e4636d71761555db72667a000d3.jpg)

![](../../.resource/remote/757fc587d76b6266675fd8cdb9f1efe52e7ff9afb9fbb80b0c229daa24690744.jpg)

4. 最后因为我们触发漏洞点的特殊性，肯定会报错使得报错信息可以被计入到 log 文件里。

![](../../.resource/remote/a801649a9b04461d47fecf10947cc153d2129fb972d9eefaa6a03f98270bead7.png)

![](../../.resource/remote/c102f89e95b8ea24bac9765380bc354a84f8d401d79761ca00f26692b7926695.png)

5. 之后再通过`think\Lang::load`包含。

![](../../.resource/remote/e279a5098afec1fc94f7a9910af268523f2a5f8678a01b6f7728ae006cf19d75.png)

![](../../.resource/remote/c877c813e88458cfef5d6f8e68a756f7a1405d0588b2749bd7b600ea8b846cf6.jpg)

![](../../.resource/remote/263753615a59dfffc5183ee6a9530cc691c0c2050030535eaa9d71672f4ce453.jpg)

**方法五  :: 竟然可以调用非静态方法**

下面是个简单的例子。

```
<?php

class A{

    public function test1($a){
        echo "test1".$a;
    }
    static function test2($a){
        echo "test2".$a;
    }
    public function test3($a){
        $this->b = $a;
        echo "test3".$this->b;
    }
}

call_user_func("A::test1","x");
echo "</br>";
call_user_func("A::test2","x");
echo "</br>";
call_user_func("A::test3","x");
echo "</br>";
//$xxx=new A();
//call_user_func(array($xxx,'test3'),"x");
```

我们看看会怎么执行。

![](../../.resource/remote/3705a2dc025ae68827f6ec157353b0217fe523ba6fca9c368200db1ceb493327.jpg)

会发现使用:: 调用了 public 类的方法并且能够成功执行，但是会报错。并且:: 仅仅适合在方法中没有写`$this`的情况，因为`$this`指代的是这个对象，找不到对象自然会报错。那么我们看一下下面的 payload 就会一眼明白，payload 其实用了跟上面预期解抑制错误的另一种方法，然后抑制报错让 TP 不会遇错停止执行。

这个题解的 payload 如下：

![](../../.resource/remote/dda6ad4cee075575592708ae94e0c1011fc12fc016da1778d14e44be335cc9ac.jpg)

1. 因为 PHP 本身的错误处理被 thinkphp 所替代进行处理，所以上面就是将 thinkphp 所替代错误进行处理的方法给覆盖掉导致没有办法正常执行。

2. 调用`self::path`方法，可以抛弃掉我们上一个执行的返回值，并且返回我们所输入的`path`。为什么会返回 path，path 为什么是我们输入的值，这个就是之前提到的代码执行点他是覆盖了 Request 类的参数，所以方法返回的是`$this->path`，这个我们可以控制。

![](../../.resource/remote/932c844f062c882f9272ba7ed19ab9802a4bc366dbc2287d5fbcf5ae9e781932.jpg)

3. 之后调用 base64_decode，返回值就是我们 base64 解码的内容。

4. 解码后的返回值就会进入`\think\view\driver\Php::Display`中，然后进入 eval 执行代码。

![](../../.resource/remote/5437f3f1a1796599da244b68b414a23e71675309288c067eed4fd80532db6d9c.jpg)

![](../../.resource/remote/a8e2cccc79a86a6b1a5e6d386c8a1f35b7e6b08524d9bf6800a4b8edff916fdc.jpg)

![](../../.resource/remote/e21415430c3451f1bbf196969cc7a0d8bac704eb69fb391cca738e01544978ab.png)

![](../../.resource/remote/2059465b7bd80a6250b182c6ef4fc0e145e0d8d74a1683e56d48f6f2e33a8c75.png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
