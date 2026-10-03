---
source: "wy876 漏洞文库"
title: "Nacos Derby 远程命令执行漏洞(QVD-2024-26473)"
product: "Nacos2.3.2 Derby运维API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "QVD-2024-26473"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "Derby而非MySQL；未鉴权或具备有效admin；JAR下载可达"
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-33361c4590925005a36b29a7"
entity_id: "ve-33361c4590925005a36b29a7"
schema_version: "1"
previous_fofa_unverified: "app.name="
fofa: "icon_hash=\"13942501\""
---

# Nacos Derby 远程命令执行漏洞(QVD-2024-26473)

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Derby而非MySQL；未鉴权或具备有效admin；JAR下载可达
- 证据范围：三个附件未取回，正文仅启动说明；条件比16完整但登录账号权限未具体化

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据cnvd放QVD错误，fofa字段错抽Hunter app.name=残缺
- 附件server.py却要求运行service.py
- 可登录不代表有Derby管理员权限
- 应与厂商关于运维接口配置争议关联，不能当所有2.3.2无条件RCE

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# <font style="color:rgb(51, 51, 51);">一、漏洞简介</font>
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在远程命令执行漏洞</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos 2.3.2</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa `icon_hash="13942501"`
+ 特征


# 四、漏洞复现
前置条件：

```plain
1、需要naocs没有做鉴权，或者能登录后台获取凭证
2、需要使用的是derby数据库，如果是mysql就不行
```

准备3个文件

[exploit.py](https://www.yuque.com/attachments/yuque/0/2024/txt/29512878/1730102385434-bed3e0d1-f9aa-4fb0-97bf-58e02f1536a0.txt)[server.py](https://www.yuque.com/attachments/yuque/0/2024/txt/29512878/1730102385723-5c0ce8e6-955e-45d3-8edd-930373ebf091.txt)[config.py](https://www.yuque.com/attachments/yuque/0/2024/txt/29512878/1730102385874-06c45712-f176-431c-8a7e-aee74aa7a07e.txt)

1、修改config.py内容，host为自己的ip地址，port为自己电脑没有被占用的端口

```plain
server_host = '192.168.40.110'
server_port = 9999
```

2、然后直接运行命令python service.py 启动web服务，记住安装flask和requests的py模块


3、启动成功后，再运行python exploit.py，输入目标nacos地址即可执行命令


ping dnslog测试


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dr4623v0c8wevsk2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
