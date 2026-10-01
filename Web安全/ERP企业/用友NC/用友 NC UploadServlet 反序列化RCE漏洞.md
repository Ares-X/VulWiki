---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nc-uploadservlet-rce.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-NC\""
---

# 用友 NC UploadServlet 反序列化RCE漏洞

## 漏洞描述

公开 afrog PoC 将用友 NC 的 `/servlet/~ic/nc.document.pub.fileSystem.servlet.UploadServlet` 列为 Java 反序列化代码执行入口。请求向接口提交特定的序列化字节流，并用计算结果回显判断执行路径。风险受目标依赖、接口可达性及部署配置影响；来源没有给出完整的受影响版本清单。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

完整的序列化数据、请求与匹配表达式均保存在文末固定提交的 YAML 中。关键字段为 `set.rb`、`rules.r0`、`rules.r1`；不能把任意 Commons-Collections 数据替换进去并期待相同回显。

原始模板通过请求头 `X-T0KEN-INF0` 传入算术表达式，再检查**响应头**包含 `X-T0KEN` 和预期结果的 Base64 值。返回 200、接口可达或出现 Java 异常均不足以确认代码执行。模板还列出 `~baseapp` 路径，但 r2 的 `method` 被误拼成 `mehtod`；该分支不能视为已验证可运行，本条目不将它等同于前述 `~ic` 分支。本文仅静态核对公开源码，未发送序列化数据、执行命令或进行本地复现。

## 修复建议

向用友获取针对当前版本的修复。限制相关 Servlet 的外部访问，避免对不可信请求直接反序列化，并依据厂商方案限制可反序列化类型及更新受影响组件。

## 参考链接

- [相关分析：FileReceiveServlet 与 UploadServlet 的反序列化及回显机制](%E7%94%A8%E5%8F%8B-NC-FileReceiveServlet-%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96RCE%E6%BC%8F%E6%B4%9E.md)；本文补充具体 `~ic` 路由、固定版本验证模板及其限制。

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nc-uploadservlet-rce.yaml)

## 网络测绘

```text
app="用友-NC"
```
