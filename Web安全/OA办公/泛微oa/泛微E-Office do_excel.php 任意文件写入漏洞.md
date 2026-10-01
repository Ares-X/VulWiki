---
source: "TD0U/WeaverScan"
---

# 泛微E-Office do_excel.php 任意文件写入漏洞

## 漏洞描述

泛微 E-Office 的 `/general/charge/charge_list/do_excel.php` 接口存在任意文件写入漏洞。攻击者无需登录，通过构造请求可将任意内容写入服务器上的 `excel.php` 文件，直接获取 Webshell。

## 漏洞影响

```
泛微 E-Office
```

## 网络测绘

```
app="泛微-EOffice"
```

## 漏洞复现

向 `/general/charge/charge_list/do_excel.php` 发送精心构造的请求，服务器会将攻击者控制的内容写入同目录下的 `excel.php` 文件。写入成功后，直接访问：

```
GET /general/charge/charge_list/excel.php?cmd=whoami HTTP/1.1
```

即可执行系统命令，获取服务器控制权限。

参考 PoC（Go，来源 TD0U/WeaverScan）：

```go
func DoExcel(target string) {
    url := target + "/general/charge/charge_list/do_excel.php"
    // 构造请求将 webshell 写入 excel.php，再访问 excel.php 执行命令
}
```
