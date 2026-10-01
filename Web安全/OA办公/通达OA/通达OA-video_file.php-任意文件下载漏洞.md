---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oa-Download%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.yaml"
version: "来源标注 V2017；其他版本范围未披露"
---

# 通达OA video_file.php 任意文件下载漏洞

## 漏洞描述

通达 OA 的 `/general/mytable/intel_view/video_file.php` 接口被公开 PoC 列为路径遍历下载入口。请求通过 `MEDIA_DIR` 与 `MEDIA_NAME` 指向应用数据库配置文件，若服务端未限制解析后的路径边界，可能泄露服务器可读文件。

## 影响范围

来源标注 V2017；其他版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /general/mytable/intel_view/video_file.php?MEDIA_DIR=../../../inc/&MEDIA_NAME=oa_config.php HTTP/1.1
Host: example.invalid
```

来源要求 200 状态码和 `MYSQL_DB`。应核对响应确为配置文件内容，排除登录页、错误页及仅包含变量名的模板。该请求未附带 Cookie，但不能据此推断所有部署均无需认证。本文仅核对公开源码，未读取目标配置或进行本地复现。

## 修复建议

向通达获取适用更新。对下载接口执行身份与文件权限检查，并在路径规范化后限制访问目录，禁止上级目录跳转。

## 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oa-Download%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.yaml)
