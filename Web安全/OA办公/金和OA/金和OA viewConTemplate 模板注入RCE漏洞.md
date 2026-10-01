---
source: "https://cn-sec.com/archives/2835659.html"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA viewConTemplate 模板注入RCE漏洞

## 漏洞描述

HackingWiki漏洞感知的公开分析由 CN-SEC 转载，记录金和 OA JC6 的 viewConTemplate 将请求参数 code 写入临时模板并交给 FreeMarker 渲染。文中给出调用 Execute 类的请求及命令输出截图。该问题依赖模板解析及其可用类和权限，不能套用到所有部署。

## 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及认证前提未知。来源是 2024-06-10 的署名分析转载：原始出处为微信公众号 HackingWiki漏洞感知，文章题为《金和OA JC6 FreeMarker模板注入漏洞简析》。原公众号链接本次不可读取，正文依据可读取的 CN-SEC 转载核对；转载不构成第二份独立验证。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下仅定位接口，不是完整验证请求。完整表单表达式见所引公开分析，本文不另行生成模板执行载荷。

```http
POST /jc6/platform/portalwb/portalwb-con-template!viewConTemplate.action HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

## 判定与证据边界

原文请求体包含 moduId=1、uuid=1，以及承载模板表达式的 code；公开分析以命令结果回显为证据。普通页面可达、模板被保存或响应状态为 200 都不证明代码执行。原新增文使用 GET 与 template 参数，与分析不符，已删除。完整请求和代码分析见转载正文；本次未执行模板表达式。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。避免将不可信输入作为模板执行，限制模板可访问的类与对象，并对模板维护接口实施身份和权限检查。

## 参考来源

- [HackingWiki漏洞感知署名分析（CN-SEC 转载）](https://cn-sec.com/archives/2835659.html)
