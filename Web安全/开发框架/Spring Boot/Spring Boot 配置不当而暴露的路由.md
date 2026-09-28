Spring Boot 配置不当而暴露的路由
================================

一、漏洞简介
------------

主要是因为程序员开发时没有意识到暴露路由可能会造成安全风险，或者没有按照标准流程开发，忘记上线时需要修改/切换生产环境的配置

二、漏洞影响
------------

三、复现过程
------------

### 路由知识

-   Spring Boot 1.x 版本默认内置路由的根路径以 `/` 开始，2.x 则统一以
    `/actuator` 开始
-   有些程序员会自定义 `/manage`、`/management` 或 **项目相关名称**
    为根路径
-   默认内置路由名字，如 `/env` 有时候也会被程序员修改，如修改成
    `/appenv`

```{=html}
<!-- -->
```
    trace
    health
    loggers
    metrics
    autoconfig
    heapdump
    threaddump
    env
    info
    dump
    configprops
    mappings
    auditevents
    beans
    jolokia
    cloudfoundryapplication
    hystrix.stream
    actuator
    actuator/auditevents
    actuator/beans
    actuator/health
    actuator/conditions
    actuator/configprops
    actuator/env
    actuator/info
    actuator/loggers
    actuator/heapdump
    actuator/threaddump
    actuator/metrics
    actuator/scheduledtasks
    actuator/httptrace
    actuator/mappings
    actuator/jolokia
    actuator/hystrix.stream

其中对寻找漏洞比较重要接口的有：

-   `/env`、`/actuator/env`

```{=html}
<!-- -->
```
-   GET 请求 `/env`
    会泄露环境变量信息，或者配置中的一些用户名，当程序员的属性名命名不规范
    (例如 password 写成 psasword、pwd) 时，会泄露密码明文；

    同时有一定概率可以通过 POST 请求 `/env` 接口设置一些属性，触发相关
    RCE 漏洞。

```{=html}
<!-- -->
```
-   `/jolokia`

```{=html}
<!-- -->
```
-   通过 `/jolokia/list` 接口寻找可以利用的 MBean，触发相关 RCE 漏洞；

```{=html}
<!-- -->
```
-   `/trace`

```{=html}
<!-- -->
```
-   一些 http 请求包访问跟踪信息，有可能发现有效的 cookie 信息
