---
source: "wy876 漏洞文库"
title: "Nacos存在 Hessian反序列化漏洞"
product: "Nacos JRaft Hessian服务"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CNVD-2023-45001"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "7848/Raft服务可达、受影响Nacos/JRaft版本及可用gadget"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-a0afe5a95da4c51a4adfdccc"
entity_id: "ve-a0afe5a95da4c51a4adfdccc"
schema_version: "1"
previous_fofa_unverified: "app.name="
fofa: "icon_hash=\"13942501\""
version: "本补充静态核对官方Nacos2.2.2；工具声明Nacos2.x<=2.2.2不等于逐版本验证"
fixed_version: "2.2.3，限官方发布说明所述JRaft Hessian反序列化问题；不评价其他漏洞"
verification_source: "https://github.com/alibaba/nacos/releases/tag/2.2.3; https://github.com/alibaba/nacos/commit/6080b01ce6e3a62392e85187f5e62dbbf40a992c; https://github.com/c0olw/NacosRce/tree/353111239df2f17ce82f9a992c62afd05548dc3e"
---

# Nacos存在 Hessian反序列化漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：7848/Raft服务可达、受影响Nacos/JRaft版本及可用gadget
- 证据范围：历史材料只有 JAR 调用；后文补充已核对固定公开源码与官方修复，但没有证明历史 ZIP/JAR 与该源码对应，也没有运行工具验证结果。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 公开源码、官方 2.2.3 修复与 2.2.2 产品调用已在补充中核对；作者所述全部旧版本的兼容性、历史附件身份和原 CNVD 编号对应关系仍未补齐。
- FOFA 完整表达式已恢复；原残缺字段保留于 `previous_fofa_unverified`，不再作为当前字段缺口。
- 源码表明内存马方式会写入文件并注册 Filter，不能标为纯检测；产品重启后的状态及完整清理链仍未验证。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# <font style="color:rgb(51, 51, 51);">一、漏洞简介</font>
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在 Hessian反序列化漏洞</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa `icon_hash="13942501"`
+ 特征


# 四、漏洞复现
[NacosRce_jar.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29512878/1730102385394-3297bb1d-0432-46be-b3dd-d879623eb40a.zip)

执行命令

```plain
java -jar NacosRce.jar http://127.0.0.1:8848/nacos 7848 "whoami"
```


打入内存马

```plain
java -jar NacosRce.jar http://127.0.0.1:8848/nacos 7848 memshell
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ziymxgvn5011of96>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）

## 补充：固定 NacosRce 源码、版本与实际副作用

本节补充 FrameVul #344 指向的 [c0olw/NacosRce](https://github.com/c0olw/NacosRce)，固定提交为 `353111239df2f17ce82f9a992c62afd05548dc3e`。前文的命令和 Yuque ZIP 链接保持原样；本次没有下载该 ZIP，也没有证明附件内 JAR 与这里的源码逐字节对应。公开源码可供检查，不等于所有同名二进制均已经过检查。

### 版本、端口与产品调用对应

本次读取的产品源码为 Nacos 官方 `2.2.2` 标签指向的提交 `d2e16a3e420a23dce1801de95ef9a4b3f91b3e89`：

- [`SerializeFactory.java`](https://github.com/alibaba/nacos/blob/d2e16a3e420a23dce1801de95ef9a4b3f91b3e89/consistency/src/main/java/com/alibaba/nacos/consistency/SerializeFactory.java#L31-L48)将默认序列化器设为 Hessian。
- [`ServiceMetadataProcessor.onApply`](https://github.com/alibaba/nacos/blob/d2e16a3e420a23dce1801de95ef9a4b3f91b3e89/naming/src/main/java/com/alibaba/nacos/naming/core/v2/metadata/ServiceMetadataProcessor.java#L64-L111)会先反序列化 `WriteRequest.data`，再处理操作类型。其组名常量 [`Constants.SERVICE_METADATA`](https://github.com/alibaba/nacos/blob/d2e16a3e420a23dce1801de95ef9a4b3f91b3e89/naming/src/main/java/com/alibaba/nacos/naming/constants/Constants.java#L28)为 `naming_service_metadata`，与固定工具第144行写入的值一致。
- [`HessianSerializer` 第38–75行](https://github.com/alibaba/nacos/blob/d2e16a3e420a23dce1801de95ef9a4b3f91b3e89/consistency/src/main/java/com/alibaba/nacos/consistency/serialize/HessianSerializer.java#L38-L75)使用普通 `SerializerFactory`，调用 `Hessian2Input.readObject()`；带 `Class` 或 `Type` 参数的入口仍直接委托给通用反序列化，没有用该参数先限制读取对象。

[Nacos 官方 2.2.3 发布说明](https://github.com/alibaba/nacos/releases/tag/2.2.3)明确将这次修复对应到 JRaft 请求中的 Hessian 反序列化 RCE，并说明默认受影响通信端口为7848。它是集群间 Raft 通信端口，不是普通客户端请求入口；只看 Web 控制台端口或登录页面不能判断此问题的可达性。

固定工具声明适用于 `Nacos 2.x <= 2.2.2`，并要求 JDK1.8。这是工具作者的兼容性声明；本次产品代码具体核对到2.2.2，不据此声称已经核验所有旧分支。工具还依赖对应 Java 内部类、Spring/Tomcat 类以及服务文件权限。其三个基本参数分别为 Web URL、JRaft端口和操作/命令；Web URL用于前后探测，实际序列化请求发往从该URL主机部分和所给JRaft端口组合的地址。实现没有提交应用登录凭据，实际网络访问控制仍会限制这条连接路径。

### 公开入口的实际顺序

前文的两条完整调用形式已有公开来源。以下解释固定实现做了什么，不是本库运行记录：

1. [`NacosRce.main` 第60–97行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/nacostools/rce/NacosRce.java#L60-L97)首先调用 `isWebShell()`。[`ConnectShell` 第46–56行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/alibaba/nacos/consistency/entity/ConnectShell.java#L46-L56)通过实际的 `echo` 命令和返回字符串比较进行检查，不是无命令副作用的端口探测。
2. 若检查未命中，主程序构造两部分对象：写入 XSL 与随后加载该 XSL。[`HessianPayload` 第88–122行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/alibaba/nacos/consistency/entity/HessianPayload.java#L88-L122)的Linux默认路径为 `/tmp/nacos_data_temp`，Windows分支的Java字符串字面量为 `"C:\\Windows\\Temp\\nacos_data_temp"`。写入内容包含由已读 `NacosFilterShellPlus` 类生成的字节数据，随后经XSL类定义调用加载；不是纯粹的内存只读检查。
3. [`sendPayload` 第121–147行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/nacostools/rce/NacosRce.java#L121-L147)使用JRaft客户端，固定选择 `naming_service_metadata` 组，将Hessian字节放入 `WriteRequest.data` 并发送。没有新增或改写来源载荷。
4. [`NacosFilterShellPlus` 第35–77行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/alibaba/nacos/consistency/entity/NacosFilterShellPlus.java#L35-L77)的静态初始化会寻找Tomcat上下文并注册覆盖 `/*` 的Filter。其后包含命令执行和动态加载请求字节为类的分支。这是明确的运行状态修改，不能把 `memshell` 模式表述为“只验证而不改变目标”。
5. 注入后再次进行命令回显检查；若用户指定的不是 `memshell`，还会继续执行所给命令。已有Filter命中时也可直接进入命令阶段。操作没有交互式授权提示，也没有对应的文件/Filter清理实现。

原README称重启后仍可存活。本次确认了临时XSL写入、JRaft请求和运行时Filter注册，但没有验证产品重启、日志重放或完整清理链，不能将这句来源主张写成已验证结果。

### 构建、依赖与静态审查边界

本次完整读取固定树中的10份Java文件、1份pom.xml和2份Manifest，共13份文本。README另行全文读取；图片和Yuque二进制附件未作为成功证据。

- [`pom.xml`](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/pom.xml)声明Maven依赖版本，并将入口设为 `com.nacostools.rce.NacosRce`。它用assembly插件打包依赖，未发现该固定树另有安装下载脚本或工作流。没有执行构建、安装或导入源码。
- POM的版本为 `0.4-SNAPSHOT`，入口帮助文本显示工具v0.5；这两个来源值保持不变，不能据显示版本认证某个JAR构建。
- [资源Manifest](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/resources/META-INF/MANIFEST.MF)列出的类路径同时包含Hessian4.0.63与3.3.6等JAR名。依赖名称和版本声明不是依赖字节审计或可重现构建证明；本次未下载这些库或外部二进制，也未递归审计第三方实现。
- [`ConnectShell` 第18–32行](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/alibaba/nacos/consistency/entity/ConnectShell.java#L18-L32)设置进程默认HTTPS证书和主机名验证器；[`MyX509TrustManager`](https://github.com/c0olw/NacosRce/blob/353111239df2f17ce82f9a992c62afd05548dc3e/src/main/java/com/alibaba/nacos/consistency/entity/MyX509TrustManager.java)不拒绝证书。这个全局副作用不能省略，也不作为关闭校验的推荐。
- HTTP请求的目标来自命令行URL；`https://www.google.com/` 在所读实现中是请求头比较值，不是由该字符串发起的外传地址。没有因URL样子相似就将它当作真实网络回连。
- 所读源文件中动态类生成、编码、XSL执行和Filter注册均是声明的利用流程；未发现另藏的第三方接收站点、无关下载器或删除命令。这个否定结论只覆盖已读13份文本，不覆盖运行后用户命令、动态提交的类字节、依赖包、附件JAR或整个Nacos产品。

### 修复与维护

官方2.2.3说明建议升级，并对暂不能升级的旧部署限制来自集群外部的JRaft端口访问。这个网络边界缓解不能替代对已发生状态改变的调查。

[固定修复提交6080b01ce6e3a62392e85187f5e62dbbf40a992c](https://github.com/alibaba/nacos/commit/6080b01ce6e3a62392e85187f5e62dbbf40a992c)将Hessian工厂替换为带白名单的 `NacosHessianSerializerFactory`，加入类型检查和相关异常处理。本次读取了差异与新增工厂全文，没有运行单元测试或反序列化任何数据；官方的发行修复声明与这里的静态差异证据分别记录。

若曾使用这类工具，应把临时文件、运行时Filter、日志及可能的持久化状态纳入维护处置；不能只看到命令成功或失败便宣称环境已恢复。本次未取得足以给出通用自动清理步骤的证据，因此不编造删除或数据库操作命令。

本补充不新增CVE，不改变前文原有CNVD标识或历史来源身份；原标识的独立编号映射没有在本轮补齐，不把来源留存当成新的编号认证。
