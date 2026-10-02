---
source: "hatch 补库批 20260928"
product: "ThinkPHP / 两类RCE矩阵"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.x 命令执行漏洞说明"
prerequisites: "来源所述条件，未列明部分仍待核：列5.0.0–5.0.23表但压成一段，控制器范围错误写5.0.23--5.1.31"
side_effects: "未执行；本文需注意的操作影响：debug矩阵遗漏captcha绕过分支；仅需debug/否的表不能覆盖完整版路由条件"
source_status: "unknown"
id: "vw-10b7a2c086a314d58d25f2ce"
entity_id: "ve-10b7a2c086a314d58d25f2ce"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：列5.0.0–5.0.23表但压成一段，控制器范围错误写5.0.23--5.1.31

代码与实验材料：只有路由流程、类清单和版本表，无验证请求/结果

来源证据范围：无原始链接

- **事实待核（1）**：把两个分支修复版本写成受影响连续区间；依据：控制器段5.0.23--5.1.31与专文的此前版本相反。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：通用性断言与表格及实证冲突；依据：开头称5.0.1可用于5.0.3等，表却早期版本否；结尾承认未逐方法找仍声称所有列出类payload通用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：Windows类加载结论过度；依据：未给具体大小写/路径/版本原因，固定Composer生成类也不是跨部署不变量。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（4）**：debug矩阵遗漏captcha绕过分支；依据：仅需debug/否的表不能覆盖完整版路由条件。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.x 命令执行漏洞说明

**先简单说明一下吧，5.x我们这里罗列了目前碰到的全部tp系列的对应版本漏洞，我在这里简要说明一下，不看别后悔**

> tp框架系列中，5.0.x 跟 5.1.x 中，各个系列里的poc是几乎为通用的
>
> 比如
> 5.0.1中某个poc在5.0.3中也是可以用的，也就是说当我们碰到5.0.8的时候，可以尝试用5.0.1
> 或 5.0.5等 5.0.x 系列的poc去尝试使用，
>
> 5.1.x 系列同理

执行流程：
----------

首先发起请求-\>开始路由检测-\>获取pathinfo信息-\>路由匹配-\>开始路由解析-\>获得模块、控制器、操作方法调度信息-\>开始路由调度-\>解析模块和类名-\>组建命名空间\>查找并加载类-\>实例化控制器并调用操作方法-\>构建响应对象-\>响应输出-\>日志保存-\>程序运行结束

漏洞原因：
----------

路由控制不严谨，默认不开启强制路由，从而可以任意调用Thinkphp的类库

主要有俩种方法，**1.Request中的变量覆盖导致RCE
2.路由控制不严谨导致的RCE**

Request中的变量覆盖导致RCE
--------------------------

版本名 是否可被攻击 攻击条件5.0.0 否 无5.0.1 否 无5.0.2 否 无5.0.3 否 无5.0.4 否 无5.0.5 否 无5.0.6 否 无5.0.7 否 无5.0.8 是 无需开启debug5.0.9 是 无需开启debug5.0.10 是 无需开启debug5.0.11 是 无需开启debug5.0.12 是 无需开启debug5.0.13 是 需开启debug5.0.14 是 需开启debug5.0.15 是 需开启debug5.0.16 是 需开启debug5.0.17 是 需开启debug5.0.18 是 需开启debug5.0.19 是 需开启debug5.0.20 否 无5.0.21 是 需开启debug5.0.22 是 需开启debug5.0.23 是 需开启debug

路由控制不严谨导致的RCE
-----------------------

> 5.0.23\--5.1.31版本

补充
----

> 由于受windows系统的影响，会导致部分payload在windows主机无法使用
>
> 并且由于windows自动加载类加载不到想要的类文件，所以能够下手的就是在框架加载的时候已经加载的类。

**5.1是下面这些：**

    think\Loader 
    Composer\Autoload\ComposerStaticInit289837ff5d5ea8a00f5cc97a07c04561
    think\Error 
    think\Container
    think\App 
    think\Env 
    think\Config 
    think\Hook 
    think\Facade
    think\facade\Env
    env
    think\Db
    think\Lang 
    think\Request 
    think\Log 
    think\log\driver\File
    think\facade\Route
    route
    think\Route 
    think\route\Rule
    think\route\RuleGroup
    think\route\Domain
    think\route\RuleItem
    think\route\RuleName
    think\route\Dispatch
    think\route\dispatch\Url
    think\route\dispatch\Module
    think\Middleware
    think\Cookie
    think\View
    think\view\driver\Think
    think\Template
    think\template\driver\File
    think\Session
    think\Debug
    think\Cache
    think\cache\Driver
    think\cache\driver\File

**5.0 的有：**

    think\Route
    think\Config
    think\Error
    think\App
    think\Request
    think\Hook
    think\Env
    think\Lang
    think\Log
    think\Loader

**两个版本公有的是：**

    think\Route 
    think\Loader 
    think\Error 
    think\App 
    think\Env 
    think\Config 
    think\Hook 
    think\Lang 
    think\Request 
    think\Log

本想找出两个版本共有的利用类和方法，但由于类文件大多被重写了，所以没耐住性子一一去找（菜）

所以，payload为上述类的利用方法，是可以兼容windows和linux多个平台的，兼容多个平台有什么用呢？插件批量可以减少误判等，一条payload通用，一把梭多好。
