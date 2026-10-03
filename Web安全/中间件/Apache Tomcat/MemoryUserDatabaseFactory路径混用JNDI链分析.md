---
schema_version: "1"
id: "VW-20261003-NATIVE-04"
title: "MemoryUserDatabaseFactory 路径混用的 JNDI 文件写入与 JSP 链"
product: "Apache Tomcat Catalina MemoryUserDatabaseFactory；Apache Velocity FileUtil"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
version: "原 PoC 使用 tomcat-catalina-9.0.24.jar、Velocity 1.7 与混合 Tomcat 10.0.23 辅助库；不代表所有版本适用"
fixed_version: "Tomcat 9.0.63 禁用 BeanFactory forceString，可阻断原示例的建目录步骤；MemoryUserDatabaseFactory 链不存在本次确认的统一修复范围"
prerequisites: "已有可控 JNDI lookup 与可用本地 ObjectFactory；原链需两次调用、旧版 BeanFactory/Velocity 建目录、可写工作及目标目录、RMI/HTTP 可达、目标 JSP/EL 执行"
side_effects: "开放 RMI 与 HTTP 监听、创建目录、请求远程 XML、写入及重命名 JSP 和 .new/.old 文件；触发 JSP 后执行命令"
source: "Source Incite 原研究；Apache Tomcat 官方源码和变更日志"
source_status: "recorded"
source_url: "https://srcincite.io/blog/2024/07/21/jndi-injection-rce-via-path-manipulation-in-memoryuserdatabasefactory.html"
verification_source: "https://tomcat.apache.org/tomcat-9.0-doc/changelog.html"
---

# JNDI 路径混用链的适用条件

本文记录已有 JNDI 注入入口之后的利用链，不是一项“所有 Tomcat 默认远程可利用”的新漏洞公告。2026-10-03 已静态读原文 Java/Python PoC、依赖说明及 Tomcat 9.0.24、9.0.63 相关源码；没有启动 RMI/HTTP 服务或运行 payload。JDK 版本、安全过滤器、混合依赖兼容性及目标 JSP 配置仍需隔离验证。

## 原理

`MemoryUserDatabaseFactory` 从 Reference 读取 `pathname` 和 `readonly`，执行 `open()`，非只读时再执行 `save()`。公开源码中，加载阶段可以通过配置资源解析器取得 URL 内容，保存阶段却把同一个字符串当作本地 File 路径，并以父目录存在、为目录且可写作为检查条件。

因此，若攻击者能先建立 URL 字符串在本地对应的目录，再使父目录跳转落到可写位置，就可能把远程用户数据库内容保存为本地文件。保存过程包含 `.new` 临时文件、原文件备份/重命名及 `.old` 清理，不是只读解析。写入数据仍受 XML 序列化约束；作者借 JSP 的 EL 表达式完成后续执行。

## 公开 PoC 和必要链条

[Source Incite 原文的 Proof of Concept](https://srcincite.io/blog/2024/07/21/jndi-injection-rce-via-path-manipulation-in-memoryuserdatabasefactory.html) 给出 Java `ObjectFactoryServer` 和 Python HTTP 响应器，前者在 RMI 1099 绑定两个对象：先通过 BeanFactory 与 Velocity 的 FileUtil.mkdir 建目录，再通过 MemoryUserDatabaseFactory 下载并保存内容。后者在 `0.0.0.0:1337` 监听，并为指定 JSP 路径返回含 EL 的 XML。两次 lookup 的原始示例为：

```java
new InitialContext().lookup("rmi://127.0.0.1:1099/Dir");
new InitialContext().lookup("rmi://127.0.0.1:1099/Rce");
```

这两行不是完整攻击入口。被测应用必须已允许攻击者到达 JNDI 查找，能使用相关本地工厂，且后续 JSP 路径可写、可访问并启用执行。原文的回环地址要求各服务位于同一主机/相应网络命名空间；不能直接据此推断远程部署可达。`some/path/to` 是原作者已有占位路径，不应替其猜测实际安装位置。

原文列出的依赖为 tomcat-catalina-9.0.24.jar、tomcat-juli-10.0.23.jar、tomcat-util-10.0.23.jar、tomcat-util-scan-10.0.23.jar、velocity-1.7.jar。目标字符串中出现的 `apache-tomcat-9.0.65` 只是写入路径，不能当成 JNDI 客户端加载了 9.0.65 Catalina 的证据。

## 必须修正的版本判断

原文认为依赖版本可能无关，但[Tomcat 官方 9.0.63 变更日志](https://tomcat.apache.org/tomcat-9.0-doc/changelog.html) 明确记录 2022-05-16 的安全加固：禁用 BeanFactory 的 forceString。对照 [9.0.24 BeanFactory](https://github.com/apache/tomcat/blob/6158eb84d9a15565787eda7e37f3e2f220a34a54/java/org/apache/naming/factory/BeanFactory.java) 与 [9.0.63 BeanFactory](https://github.com/apache/tomcat/blob/538ed3896852b3608561ba6f3d0bc8890ae15de1/java/org/apache/naming/factory/BeanFactory.java)，后者对该参数告警并跳过，已不能按原样把属性映射到 mkdir。

所以原 PoC 的建目录步骤依赖旧行为；仅替换目标安装路径不能消除依赖约束。如果另有已建立目录或不同建目录原语，只能重新评估后半链，不能把 9.0.63 当作所有 MemoryUserDatabaseFactory 路径问题的通用修复结论。

## 验证边界与风险

完整来源提供可手工组装的 PoC，未给出锁定环境、依赖校验和或一键构建工程。`com.sun.jndi.rmi.registry` 的使用还受 JDK 模块可访问性影响。不能在未运行的情况下声称可直接编译成功。

将来若有隔离测试授权，应分开记录目录是否建立、HTTP 请求是否发生、写入及重命名结果、JSP 是否真正执行，并以禁止外部查找、新版 BeanFactory、不可写目录和不执行 JSP 的配置作对照。执行可能启动命令、留下 JSP、改变同名文件及产生网络日志，必须先有快照和恢复计划。本次没有安装依赖、创建监听器、写入应用目录或触发 JSP。

## 修复与来源

首先修复可控 JNDI 入口、限制外部资源和工厂可达性；升级旧版 Catalina 可移除本例 forceString 建目录路径；限制服务写入 Web 执行目录可切断后续执行，但不是对所有文件写入风险的修补。

[Source Incite，2024-07-21](https://srcincite.io/blog/2024/07/21/jndi-injection-rce-via-path-manipulation-in-memoryuserdatabasefactory.html) 支持原链、两次调用和依赖声明；[Tomcat 9.0.24 MemoryUserDatabaseFactory](https://github.com/apache/tomcat/blob/6158eb84d9a15565787eda7e37f3e2f220a34a54/java/org/apache/catalina/users/MemoryUserDatabaseFactory.java) 与 [MemoryUserDatabase](https://github.com/apache/tomcat/blob/6158eb84d9a15565787eda7e37f3e2f220a34a54/java/org/apache/catalina/users/MemoryUserDatabase.java) 支持加载/保存流程。本文为原创中文分析，只短引原示例，未全文转载。
