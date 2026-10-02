---
source: "hatch 补库批 20260928"
product: "ThinkPHP / session File驱动"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp < 6.0.2 session id未作过滤导致getshell"
prerequisites: "来源所述条件，未列明部分仍待核：<6.0.2，比较6.0.1/6.0.2；需开启session、File存储、可控内容、web可达与解析"
side_effects: "未执行；本文需注意的操作影响：“php后缀即可getshell”缺关键条件；只有可控PHP内容且缓存路径HTTP可达并可执行才成立，默认public根不当然覆盖runtime"
source_status: "unknown"
id: "vw-3b09a5bd3bab0dcfc3dc2925"
entity_id: "ve-3b09a5bd3bab0dcfc3dc2925"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;6.0.2，比较6.0.1/6.0.2；需开启session、File存储、可控内容、web可达与解析

代码与实验材料：完整save/write/getFileName及自建testsession2，URL name为空，内容仅图片

来源证据范围：先知7109

- **操作与副作用边界（1）**：“php后缀即可getshell”缺关键条件；依据：只有可控PHP内容且缓存路径HTTP可达并可执行才成立，默认public根不当然覆盖runtime。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（2）**：未明确启用SessionInit；依据：源码跟踪middleware但复现未说明默认关闭需要显式开启。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：载荷与结果依图片；依据：文字URL name=空，未提供真实内容或response，标题边界无下限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp \< 6.0.2 session id未作过滤导致getshell

一、漏洞简介
------------

二、漏洞影响
------------

Thinkphp \< 6.0.2

三、复现过程
------------

### 漏洞分析

通过diff
github上面的6.0.1和6.0.2的代码可以发现，6.0.1在设置`session id`时未对值进行`ctype_alnum()`校验，从而导致可以传入任意字符。

![](./.resource/Thinkphp6.0.2sessionid未作过滤导致getshell/media/rId25.png)

传入任意字符会有什么危害？一般来说程序可能会以session
id作为文件名来创建对应的session文件，但是到目前为止这只是猜测。看一下保存session是怎么写的。

    public function save(): void
    {
        $this->clearFlashData();

        $sessionId = $this->getId();

        if (!empty($this->data)) {
            $data = $this->serialize($this->data);

            $this->handler->write($sessionId, $data);
        } else {
            $this->handler->delete($sessionId);
        }

        $this->init = false;
    }

先获取sessionid，然后作为第一个参数传入`$this->handler->write()`。`$this->handler`在构造函数中被初始化

    public function __construct($name, SessionHandlerInterface $handler, array $serialize = null)
    {
        $this->name    = $name;
        $this->handler = $handler;

        if (!empty($serialize)) {
            $this->serialize = $serialize;
        }

        $this->setId();
    }

可以看出`$handler`的类型是`SessionHandlerInterface`，全局发现这是一个接口，实现这个接口的类有两个，一个是`File`，一个是`Cache`。这里以`File`类为例，我们跟进它的`write()`方法

    public function write(string $sessID, string $sessData): bool
    {
        $filename = $this->getFileName($sessID, true);
        $data     = $sessData;

        if ($this->config['data_compress'] && function_exists('gzcompress')) {
            //数据压缩
            $data = gzcompress($data, 3);
        }

        return $this->writeFile($filename, $data);
    }

这里先通过第一个参数（也就是session
id）来构造`$filename`，然后判断是否需要对session数据进行压缩，默认是不需要的，最后return时调用`$this->writeFile()`。先看看文件名是如何构造的，跟进`$this->getFileName()`

    protected function getFileName(string $name, bool $auto = false): string
    {
        if ($this->config['prefix']) {
            $name = $this->config['prefix'] . DIRECTORY_SEPARATOR . 'sess_' . $name;
        } else {
            $name = 'sess_' . $name;
        }

        $filename = $this->config['path'] . $name;
        ...
        return $filename;
    }

这里直接将第一个参数拼接到路径的最后。跟进之前的`$this->writeFile()`方法

    protected function writeFile($path, $content): bool
    {
        return (bool) file_put_contents($path, $content, LOCK_EX);
    }

刺激了，这里直接保存了文件。纵观全局，由于程序未对session
id进行危险字符判断，只要将session
id写为类似于`xxxx.php`的格式，即可导致session保存成`.php`文件，从而getshell。

### 漏洞复现

通过全局搜索`setId`发现在`think/middleware/SessionInit.php:handle():L59`发生了调用。

    public function handle($request, Closure $next)
    {
        // Session初始化
        $varSessionId = $this->app->config->get('session.var_session_id');
        $cookieName   = $this->session->getName();

        if ($varSessionId && $request->request($varSessionId)) {
            $sessionId = $request->request($varSessionId);
        } else {
            $sessionId = $request->cookie($cookieName);
        }

        if ($sessionId) {
            $this->session->setId($sessionId);
        }
        ...

由于`session.var_session_id`默认是空，这里的`$sessionId`的值由`$request->cookie($cookieName)`获得，`$cookieName`经过跟进后发现默认是PHPSESSID。

![](./.resource/Thinkphp6.0.2sessionid未作过滤导致getshell/media/rId27.png)

因此我们只要设置Cookie中的PHPSESSID的值为1234567890123456789012345678.php即可。

我们在index控制器中添加如下action

    public function testsession2(){
        $username = Request::get('name');
        Session::set('username', $username);
        return 'hi';
    }

用于获取name参数，并将之设置到session中。

访问url：`http://127.0.0.1/tp6/public/index.php/index/testsession2?name=`

![](./.resource/Thinkphp6.0.2sessionid未作过滤导致getshell/media/rId28.png)

访问session文件，一般位于项目根目录下的`./runtime/session/`文件夹下，也就是`/runtime/session/sess_1234567890123456789012345678.php`

![](./.resource/Thinkphp6.0.2sessionid未作过滤导致getshell/media/rId29.png)

参考链接
--------

> <https://xz.aliyun.com/t/7109>
