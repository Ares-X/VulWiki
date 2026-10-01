---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-servletimagefield-skeyvalue-sqli.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-时空KSOA\""
---

# 用友 时空KSOA servletimagefield sKeyvalue SQL注入漏洞

## 漏洞描述

用友时空 KSOA 的 `/servlet/imagefield` 接口通过 `sKeyvalue` 等参数组织查询。公开 PoC 在 `sKeyvalue` 中使用联合查询回显固定字符串的 MD5，用于识别 SQL 注入；数据库数据的可访问范围仍取决于应用账户权限。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /servlet/imagefield?key=readimage&sImgname=password&sTablename=bbs_admin&sKeyname=id&sKeyvalue=-1'+union+select+sys.fn_varbintohexstr(hashbytes('md5','test'))--+ HTTP/1.1
Host: example.invalid
```

原始 afrog 模板检查 200 状态码及响应中的 `0x098f6bc`。人工核对应确认该值来自查询结果而非请求反射或错误页；完整 MD5 为 `098f6bcd4621d373cade4e832627b4f6`。此请求只计算常量，不需要读取真实用户数据。本文仅核对公开源码，未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-servletimagefield-skeyvalue-sqli.yaml)

## 网络测绘

```text
app="用友-时空KSOA"
```
