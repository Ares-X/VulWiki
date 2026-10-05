---
source: "MrWQ/vulnerability-paper"
title: "漏洞分析 【原创】Nacos 历史 + 最新漏洞详细分析 (附利用方法)"
product: "Nacos Server认证及nacos-client Yaml解析"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2021-29441"
referenced_identifiers: "CVE-2021-3156; CVE-2021-4206"
identifier_role: "primary"
cve: "CVE-2021-29441"
prerequisites: "逐节明确auth.enabled/默认密钥SecretKey012345678901234567890123456789012345678901234567890123456789选项；客户端链须控制订阅配置且触发Yaml变更监听"
source_url: "https://mp.weixin.qq.com/s/thlRGXwJPevB0wvMN5koFQ"
source_status: "recorded"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-a43ed5148dcf596507dac307"
entity_id: "ve-a43ed5148dcf596507dac307"
schema_version: "1"
---

# 漏洞分析 【原创】Nacos 历史 + 最新漏洞详细分析 (附利用方法)

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：逐节明确auth.enabled/默认密钥SecretKey012345678901234567890123456789012345678901234567890123456789选项；客户端链须控制订阅配置且触发Yaml变更监听
- 证据范围：提供正反认证对照和JWT secret先base64解码的重要细节，比登录响应替换文章可靠；核心证据截图未视检

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 小标题Nacos<2.2.0却实验2.2.0，版本边界不一致
- serverIdentity正确共享值是一种服务认证，风险在默认/可知值，不是任意设置两参数即漏洞
- 无完整修复版本/CVE映射及官方链接
- 多数载荷/调用栈仅图片，不能称文字完整复现；JDWP仅隔离实验使用
- 尾部跨题推荐CVE应排除

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/thlRGXwJPevB0wvMN5koFQ)

**0x01 Nacos < 2.2.0 默认 jwt 密钥未授权访问**

****部署 Nacos****

**部署**

通过代理下载 nacos-server-2.2.0 传到服务器：

![](../../.resource/remote/2abfa1fc4f0db9fc97d323d6e605373e8329b9852e8524d3ee350400bf5cd0fd.png)

解压后进入 bin 目录启动

bash startup.sh -m standalone

![](../../.resource/remote/2fad7f39d97447365dc779e580c0d5b82f1618191d1347c37c306ad0f12a50a9.png)

浏览器访问：

![](../../.resource/remote/41fffab6bc00c9a5c9f6d92ae319c6dc725930c493a79d9c118cd1a4f8bd54c2.png)

**开启鉴权**

修改 nacos.core.auth.enabled=true

![](../../.resource/remote/3370f6cc3eec1d8ed264987fbaa5b422216bff0852cb7e2d571c53f84f5b0d71.png)

****漏洞利用****

使用默认密钥生成 token 查看用户：  

![](../../.resource/remote/4734dee335c1f119f51833e3cd4b17a40316e1cea721ad90704b1321fe8f9338.png)

使用默认密钥生成的 token 创建用户：

![](../../.resource/remote/a0ded4df2aa406e00fd058d6a7be5e2175da89522b0dbb8904b4672e09ffc567.png)

![](../../.resource/remote/6c145f5673e1b6317826f4e1aab4b70d6f46c3fae995c1845e13adea7e68ebc1.png)

如果不添加 jwt 则提示 403：

![](../../.resource/remote/0630c6147b4ca10b1ecd510b04775de9d6ed53206ade38af4814d44d1a55c398.png)

##### ****漏洞分析****

##### **寻找密钥**

Nacos 是 springboot 写的项目，可以通过 application.properties 查看项目配置文件。

默认密钥：

```
SecretKey012345678901234567890123456789012345678901234567890123456789

```

![](../../.resource/remote/f96209699cc06d76a6dbd420b78ca56c3c97168b2074b610085c38e72ea90306.png)

官方说明也在 application.properties 这个文件中，如果没有手工配置，那默认就是：

```
SecretKey012345678901234567890123456789012345678901234567890123456789

```

![](../../.resource/remote/5177bf57532b154b3bba922bc328d0a25a349b1753f7c1fa358db4901f3ac82f.png)

###### **设置远程调试**

在 JAVA_OPT 中添加调试参数：

```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005

```

![](../../.resource/remote/cbda4430280ad8a0ac2c7e2688a532b0f8287b0dbdf62eaf56058f3e254705b3.png)

在 idea 中添加调试设置：

![](../../.resource/remote/6c282869ccd30f622601a76c839f88888d5fe3c5cba7cd01f32b6c93fa5428a0.png)

###### **鉴权 filter 配置**

通过下断点在 jwt 认证的地方，然后通过调用栈查找 Filter，把断点下到 JwtTokenManager 的 validateToken 方法上：

![](../../.resource/remote/fc32c9bc2e603a11837193cb0f27d6d7dbc2e8e0ae73e8b89713f430a8d9458d.png)

通过栈找到 Filter 为 com.alibaba.nacos.core.auth.AuthFilter

![](../../.resource/remote/e2532340316075c593d252207628cf302050c6181439a0babf5be4db8f27bff8.png)

通过 com.alibaba.nacos.core.auth.AuthFilter 查找 springboot 的配置类为 com.alibaba.nacos.core.auth.AuthConfig：

![](../../.resource/remote/60cc71d1aa554e51f7ededce4d0a5d0eb3474944737b1f086cc1aa5499b7502a.png)

###### **鉴权过程**

进入 com.alibaba.nacos.core.auth.AuthFilter 首先读取配置文件中的鉴权开关是否为 false（这是再配置文件中设置的 nacos.core.auth.enabled 配置项），为 false 则直接进入下一个 filter，也就不需要鉴权：

![](../../.resource/remote/701bc7e828cafdf0022f43bc90e5bfa042cf598dbe6dfe0ecbc16f07fea61a63.png)

接着会检查是否配置了 userAgentAuthWhite 配置项（这是再配置文件中设置的 nacos.core.auth.enable.userAgentAuthWhite 配置项），在 nacos2.2.0 中默认为 false：

![](../../.resource/remote/4297d13f9eafac7df701f245812a5adf3b5a2f63c8f371dda93b66275fc15ef0.png)

接下来会检查配置文件中是否设置了

```
nacos.core.auth.server.identity.key和nacos.core.auth.server.identity.value

```

如果配置了这两个参数，则去判断在 header 中 nacos.core.auth.server.identity.key 对应的值是否为 nacos.core.auth.server.identity.value，如果是则直接去下一个 filter，就造成了权限绕过：

![](../../.resource/remote/37368c8e7dc74ceebe7024d416de28e3b8dc00a48db7d34695a4294917ca69a7.png)

接着判断请求中的方法是否在需要授权的 map 中，如果不在则不需要授权：

![](../../.resource/remote/f08d94d071795bfcc169d3a2563b3a077c6f59c5a687134576c1374e6dcaead7.png)

最终会走到如下方法：

```
com.alibaba.nacos.auth.AbstractProtocolAuthService#validateIdentity

```

这个方法是对 jwt 进行验证的操作：  

![](../../.resource/remote/215d7f63ef5d17052bb13090f5cd2046654b5ed9d372cd7c4fb2a0324641283b.png)

通过调试也可以将 jwt 通过普通的 jwt 认证方式进行认证

```
com.alibaba.nacos.plugin.auth.impl.NacosAuthManager#resolveToken(com.alibaba.nacos.plugin.auth.api.IdentityContext)

```

![](../../.resource/remote/22871a68acf43d6878fad3f5b4c20d12593bb038a68b97a5be4d512ee4be7ec9.png)

最终走到

```
com.alibaba.nacos.plugin.auth.impl.JwtTokenManager#validateToken

```

这里直接使用 jwtParse 对 jwt 进行验证：

![](../../.resource/remote/d6c0cd7041b73ece544ad31b6ca73da8ea0e17ea0d8df912cc57276d5aafeaea.png)

###### **jwtParser 设置密钥**

接下来就需要找到这个 jwtParser 中的 jwt 密钥从何而来；

在

```
com.alibaba.nacos.plugin.auth.impl.JwtTokenManager#processProperties

```

中通过  

```
this.jwtParser = Jwts.parserBuilder().setSigningKey(this.secretKey).build();

```

来设置密钥：

![](../../.resource/remote/6ef6873089287a2f747afa72c828f1d072c46351c26f29813f4753b47b472001.png)

然后 this.secretKey 是从配置文件中读取 nacos.core.auth.plugin.nacos.token.secret.key 之后进行 base64 解码之后作为密钥：

![](../../.resource/remote/d998af662e4cf656d1ede5f9ecc08e56ec3c930e35f9b19001de7076dda503af.png)

**0x02 Nacos2.2.0 权限绕过**

##### ****漏洞利用****

Header 中添加 serverIdentity: security 能直接绕过身份验证查看用户列表：

![](../../.resource/remote/567275a997019f05652a947f66d487b216d53c47f5243540d15f5b19f3bb177b.png)

如果没有或者不对应则返回 403：

![](../../.resource/remote/c4b861f2e07efdf40dde0defe8604d3c4e1f2181f3f903852e9b91bc5eb2c737.png)

##### ****漏洞分析****

根据前面的分析判断是否开启鉴权开关和是否开启 userAgentAuthWhite，然后是对配置文件是否配置了

```
nacos.core.auth.server.identity.key和nacos.core.auth.server.identity.value

```

如果配置了则判断 header 里面的 serverIdentity 是否为配置文件中的 security：  

![](../../.resource/remote/3f6742568d2517ec83720cc92a0fceaf75758895efd9c7d6bb0780972d15efe6.png)

如果是则进入下一个 filter，就不需要对 jwt 进行鉴权

![](../../.resource/remote/07f08dd7ed4f86cb9542d07e519be0708a3be449dc78841ecbf8e58d061e245a.png)

**0x03 Nacos 默认配置未授权访问漏洞**

##### ****漏洞利用****

直接访问

```
http://10.10.84.207:8848/nacos/v1/auth/users?pageNo=1&pageSize=9&search=accurate&accessToken=

```

能够直接查看用户列表，不需要添加任何身份标识:

![](../../.resource/remote/09d5eae76246a05739c6e16031c443328f97532961a75665b850b4d49a050f88.png)

![](../../.resource/remote/2412bcdb37356a0128db00400a6b4b2f9e0200f0c79c19cf9e4bc3ea13a4abef.png)

##### ****漏洞分析****

再配置文件中 nacos.core.auth.enabled 的值默认为 false，也就是不需要进行身份验证:

![](../../.resource/remote/09628e9babac3a55aa8cc3d636c89e7b5e9c952b134efb39800ba3f3e8faba49.png)

在代码中就是 com.alibaba.nacos.core.auth.AuthFilter#doFilter 中的第一个判断，如果取值为 false 则直接进入下一个 filter，就不需要身份验证:

![](../../.resource/remote/fda4f53f18f9d0b4ce98d944641166a354f1c6ccfacb4a64902928c233800db3.png)

this.authConfigs.isAuthEnabled() 不论是在配置文件中还是在注释中都为 flase，不需要进行身份验证:

![](../../.resource/remote/b914363e9eb3d3df1dfda178a7727c1d6f36a24750912e52869b66e7fe9ca03b.png)

**0x04 Nacos1.x.x 版本 User-Agent 权限绕过**

##### ****漏洞复现****

从 GitHub 下载 1.3.2 版本，并修改系统授权选项为 true：

![](../../.resource/remote/5826ec919f87e7b5e60b217cbcfc2b68f3957e8ad76c02fdd397677f492abad7.png)

设置远程调试参数：

![](../../.resource/remote/85c75f4f6f617dfe28ccb6760db7d6d70686e7d9b4b28b4a206ce3ac9ccddcc6.png)

使用 curl 命令进行复现：

```shell
curl 'http://10.10.84.207:8848/nacos/v1/auth/users?pageNo=1&pageSize=9&accessToken=' -H 'User-Agent: Nacos-Server'

```

![](../../.resource/remote/95e9ad6c10f04699120779d725cece187195c288bf2826ee4f4e8171a3b1dc72.png)

##### ****漏洞分析****

进入 com.alibaba.nacos.core.auth.AuthFilter#doFilter 的第一个 if 语句是判断当前是否开启鉴权：

![](../../.resource/remote/4766b7c7a739e2e46d938c9109efa50f50d16620aa3d9e8125c4c0acd9894be3.png)

首先通过系统配置读取 nacos.core.auth.enabled 设置的值，如果没有找到则通过配置文件读取该配置：

![](../../.resource/remote/71e16ad82008224d29789aad713dc59e5d076ed106fa83630bf25eaeaed4d194.png)

接下来读取 header 中的 User-Agent 值，如果 User-Agent 为 Nacos-Server 则直接进入下一个 filter 造成了权限绕过：

![](../../.resource/remote/954b5925cd51aac6109498b61739b9e5a0b5f112bc1d5fb4d20e71a79aa04b22.png)

**0x05 Nacos-client<1.4.2yaml 反序列化**

##### ****漏洞复现****

选择使用单独的 nacos-client 1.4.1

![](../../.resource/remote/9c3163da8c88dd9691e90899f65d902500208b65ace491315012d5777e9e079f.png)

客户端连接服务端，使用官方的示例：

![](../../.resource/remote/72473a92dbd53021254a3b9d0ab06f493f6fcd8c9f3e3fc1037df981cc19af12.png)

将 yaml 配置修改为 yamlpayload：

![](../../.resource/remote/15155ab293d92513cada99d28bd3048b45c39e4e83ab5d886633541be34682dc.png)

然后在客户端就能够执行命令：

![](../../.resource/remote/748d0f95e33d509ddda83b4c71a2a661d969cf46b75733eb5a3faaefbf3fbaad.png)

##### ****漏洞分析****

在

```
com.alibaba.nacos.client.config.impl.CacheData#safeNotifyListener

```

一直监听服务端的配置改变，当发生改变时会进入

```
com.alibaba.nacos.client.config.impl.ConfigChangeHandler#parseChangeData

```

![](../../.resource/remote/41dd04e4dbf9c329b5feef6e54e18c2ce1c5663c5feaaea67b44021e9eef6b96.png)

在

```
com.alibaba.nacos.client.config.impl.ConfigChangeHandler#parseChangeData

```

会根据配置文件类型进入不同的处理方法里面，这里进入 yaml 的处理方法，其中 newContent 和 oldContent 分别为配置内容：  

![](../../.resource/remote/59f78025f8d0d7beb21ee961176d3283824d5a8299667926a6f29b70043d5566.png)

进到

```
com.alibaba.nacos.client.config.impl.YmlChangeParser#doParse

```

不论是新改的配置，还是原来的配置都会经过 (new Yaml()).load() 方法，最终造成命令执行漏洞：

![](../../.resource/remote/59b023a77224c76222c54fa881aca5165790069602f80957b120143044d574c6.png)

END

往期回顾

  

[技术分享 | JS 断点调试教学](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484445&idx=1&sn=78da18444b38922f842c57f0046e64c8&chksm=c07b405ff70cc9497576d4b86ae2264f4280d3f13610028ae26a4ecf245ef45375c4de61f981&scene=21#wechat_redirect)

[技术分享 | 搜索框之 % 的妙用](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485114&idx=1&sn=7ea2f21ec5c61cd5af8f4f2a272b11f9&chksm=c07b42f8f70ccbeebf1a599203bc5b87e8216acb39f94ab11ead9ab54184791510d1c6d1e245&scene=21#wechat_redirect)

[实战 | 对某授权学校的常规渗透](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247483787&idx=1&sn=d8d511ab73c62fecbca898f4c41e546c&chksm=c07b45c9f70cccdfdae606543a576984c7cf43ebaf8422df8e3fd586655b882e29fe60a8bccd&scene=21#wechat_redirect)

[实战 | 一次另类的 mssql 渗透之路](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485090&idx=1&sn=aaee13ec3f68afd30b64c60fb74de8b8&chksm=c07b42e0f70ccbf68c4931c370e336637a7a6e13a9a42cefd97d07409384586d0b234c813a88&scene=21#wechat_redirect)

[实战 | 一次没有逗号的 MSSQL 注入](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485185&idx=1&sn=895ee6b7610b6f32be7086b527666cc1&chksm=c07b4343f70cca55a24236018deda9cfad47cc9ad950b79c488d4fc3d2460e341fd24a8f7157&scene=21#wechat_redirect)

[技术分享 | ChatGPT 渗透教学（一）](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484977&idx=1&sn=994176944e557202f1171a352446be2c&chksm=c07b4273f70ccb65dae772bb96c9942c59c6f021f995acf2591b763fa9d563dbea4014986039&scene=21#wechat_redirect)

[实战 | host 碰撞之边界突破 getshell](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247483859&idx=1&sn=905977c98c278ce23058b4b2c2cec951&chksm=c07b4591f70ccc8786c41af1b2bed0f777aaa57fe7407b4d9615eebbbb3c86579e2f987b5fc8&scene=21#wechat_redirect)

[技术分享 | web 站点登录框的常规突破](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484696&idx=1&sn=ef36957bd0e4b00cf5e341a7a74d06a3&chksm=c07b415af70cc84c5e30113fd4e7edf350401725856ef37345c955bf73f2f4e62dd74c71cc8c&scene=21#wechat_redirect)

[权限提升 | DirtyPipe - 脏管道内核提权](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485165&idx=1&sn=81c53eac841e98823bf577dca8abcf8a&chksm=c07b42aff70ccbb965d66235a8c489488ce947f3eff2f8463f9a93bf6cdec326ec963b9cc57d&scene=21#wechat_redirect)

[免杀 | 初学者的 mimikatz 免杀制作教程](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484585&idx=1&sn=7551abe6ec57ec41615b6f3d5bdbbed3&chksm=c07b40ebf70cc9fd79a0f0c23c682d5c4f9fd9dae638584ff75fd61d9867b4b212101cd14c73&scene=21#wechat_redirect)

[技术分享 | 另类的 XSS 攻击之新型 XSS 载体](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484841&idx=1&sn=b26dabac5e770bbd7b1331fda1a55fbd&chksm=c07b41ebf70cc8fda9501464c3401eb9920424354f1d47a15c4ca06f45876fcc76727296129d&scene=21#wechat_redirect)

[安全工具 | xray windows 1.9x 版通杀补丁](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247483680&idx=1&sn=533ec7a01f23b787140c4ed5d8b3d096&chksm=c07b4562f70ccc74dd692b604e7913a5d403e9e4dee2e7836e101b9023d1c36c959e21f506a2&scene=21#wechat_redirect)

[安全工具 | 新型目录碰撞工具 DirCollision](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247483860&idx=1&sn=feeeb8a332cbd808378b529c7a4461cb&chksm=c07b4596f70ccc80f5b1a477e43c2068745c9c2add75e7864b213db59b878f6e7b1dd33fd20f&scene=21#wechat_redirect)

[技术分享 | web 登录框密码加密的突破小秘密](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484638&idx=1&sn=432a65116ced1190672f7691f14c4d87&chksm=c07b409cf70cc98aacdfc49dae64bb1b5768a2346b915f7b4e75e1dcdb32d1b0d56066641180&scene=21#wechat_redirect)  

[权限维持 | Windows 快捷方式权限维持与后门](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485200&idx=1&sn=f8b01f78def1a3504833965f2283fcd2&chksm=c07b4352f70cca4435c25e2f1423e0c6c3589f5cd2fc5883ad25cb9b4da7e584e4bd45930f4f&scene=21#wechat_redirect)

[技术分享 | ChatGPT 在红蓝队中的利用姿势 (二)](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485015&idx=1&sn=c9489f4dd9e5bbba2d127584b394dbde&chksm=c07b4215f70ccb037f0b9f77eb2844734496ba25b3dff6af885bb8086c1f2bfee1ef4af3afcb&scene=21#wechat_redirect)

[实用工具 | ChatGPT 大师 V1.0 免注册中文复刻版](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485120&idx=1&sn=71bdb30ccc08c1a90e3a3c5596199294&chksm=c07b4282f70ccb9481f5bce72199305e8b50a9b4894bec4c491f846274d6cf5ba02f64734abb&scene=21#wechat_redirect)

[技术分享 | spring-security 三种情况下的认证绕过](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485128&idx=1&sn=00ec04aefba51abcc5ff787499079722&chksm=c07b428af70ccb9c8375268d00d5fa307ce10943f050bb501566937f0398a1bbbcbc207510c8&scene=21#wechat_redirect)  

[技术分享 | 另类的 SSRF 漏洞的挖掘与利用，绝对另类哦！](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484749&idx=1&sn=b6e183851754e7dfbfe4c2cc829cfa63&chksm=c07b410ff70cc819841b0694e143543d9dc0e4c9ab1b186c53e0ee307898a74008e2fb11ddad&scene=21#wechat_redirect)

[文档干货 | 密码测评相关概念及国标文档和行标文档分享](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247483976&idx=1&sn=f50c2b4183bf61c6b4298a28ecc6e8d7&chksm=c07b460af70ccf1cb82b212b1c25c4dcc50ed384141e3b3b46034440b15739b1caad77d7b28e&scene=21#wechat_redirect)

[实用工具 | ChatGPT Tools，无需登录网址即可直接使用](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485055&idx=1&sn=84e8e30c086c478638d0bf1695e6d71c&chksm=c07b423df70ccb2b63fef9d51cd7906f8002688a6a2631ce17064a8eb880714ec1932cca9f3f&scene=21#wechat_redirect)

[权限提升 | Linux 本地提权 sudo(CVE-2021-3156) 漏洞复现](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485201&idx=1&sn=8144629d1685f4d6519b8a7bacdbd4b9&chksm=c07b4353f70cca45f13ea4a03a0636738904c4f57139767a4df016ae20f6f4ed975e8ef6feac&scene=21#wechat_redirect)

[技术分享 | 如何利用 HTTP 头部注入漏洞赚取 12500 美元的赏金](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484888&idx=1&sn=6f13af6bdccc6083418ea37c8f3fb3f4&chksm=c07b419af70cc88c432e687979ac95ac9061c545a2221ec2f22d4574618dc7ac8c0a419f6fa0&scene=21#wechat_redirect)

[技术分享 | Windows 文件 / 文件夹隐藏技巧，无需借助三方软件](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485035&idx=1&sn=b0a75ee79d31949d7d1665e846fb35c9&chksm=c07b4229f70ccb3f5c5828bebf8152dde198481c413c5dc7a8a98a88406ae45e92d12a2aaaf0&scene=21#wechat_redirect)

[技术分享 | 利用子域接管漏洞赚取 2000 美金，子域接管漏洞讲解！](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247485141&idx=1&sn=56fc9882f11d11ae475a6957c75d4dc2&chksm=c07b4297f70ccb81210552f43294630210381c03b8434abb10c8f7c3d91c82ef1d03bba4ebd5&scene=21#wechat_redirect)  

[漏洞分析 | (CVE-2021-4206)QEMU QXL 整数溢出导致堆溢出漏洞](http://mp.weixin.qq.com/s?__biz=Mzg5Njg5ODM0OQ==&mid=2247484793&idx=1&sn=1e812cd70aac173e002b2d739c3c9f6c&chksm=c07b413bf70cc82d1ec68780d7c08de6baeaad84b81a2d52fa28a1d186556275e53361f3394e&scene=21#wechat_redirect)

<table><tbody><tr><td width="558" valign="top"><h1 data-selectable-paragraph="" id="sr-toc-0"><strong>免责声明：</strong>文章中涉及的程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由读者承担全部法律及连带责任，文章作者和本公众号不承担任何法律及连带责任，望周知！！！</h1></td></tr></tbody></table>

点赞是鼓励 在看是认同 分享是传递知识

**看完点个** **“在看”** **![](../../.resource/remote/eeafab41bae8306776aac50b5ff39f33935ad86ca0e52fa481508d7df8f94f21.gif) 分享给更多人![](../../.resource/remote/2632adf453e3f9063edcd8d072d74644bc8c7fc253d869eba3313b6f8eb5252b.gif)**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
