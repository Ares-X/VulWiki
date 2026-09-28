Spring Boot 路由地址及接口调用详情泄漏
======================================

一、漏洞简介
------------

开发环境切换为线上生产环境时，相关人员没有更改配置文件或忘记切换配置环境，导致此漏洞

二、漏洞影响
------------

三、复现过程
------------

直接访问以下几个路由，验证漏洞是否存在：

    /api-docs
    /v2/api-docs
    /swagger-ui.html

一些可能会遇到的接口路由变形：

    /api.html
    /sw/swagger-ui.html
    /api/swagger-ui.html
    /template/swagger-ui.html
    /spring-security-rest/api/swagger-ui.html
    /spring-security-oauth-resource/swagger-ui.html

除此之外，下面的路由有时也会包含(或推测出)一些接口地址信息，但是无法获得参数相关信息：

    /mappings
    /actuator/mappings
    /metrics
    /actuator/metrics
    /beans
    /actuator/beans
    /configprops
    /actuator/configprops

**一般来讲，知道 spring boot 应用的相关接口和传参信息并不能算是漏洞**；

但是可以检查暴露的接口是否存在未授权访问、越权或者其他业务型漏洞。
