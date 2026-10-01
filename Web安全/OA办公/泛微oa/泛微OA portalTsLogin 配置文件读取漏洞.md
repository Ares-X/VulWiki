---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/oa%E6%B3%9B%E5%BE%AE0day%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml"
---

# 泛微OA portalTsLogin 配置文件读取漏洞

## 漏洞描述

公开模板记录泛微 E-Cology 的 `getE9DevelopAllNameValue2` 接口可通过 `fileName` 中的相对路径读取产品配置。示例路径解码后包含 `portaldev_/../weaver.properties`，可能暴露数据库连接配置。

## 影响范围与前提

产品：泛微 E-Cology；受影响版本、披露日期与厂商修复状态未知。没有足够时效性证据将其称为“0day”。公开请求未携带凭证，但具体部署认证状态仍需核对。

## 公开验证资料

```http
GET /api/portalTsLogin/utils/getE9DevelopAllNameValue2?fileName=portaldev_%2f%2e%2e%2fweaver%2eproperties HTTP/1.1
Host: oa.example.com
```

应核对返回数据是否来自目标配置文件，是否存在具有实际值的 `ecology.password`、`ecology.charset`、`ecology.maxidletime` 等相关键。仅键名、空值、错误提示或 HTTP 200 不足以确认敏感配置泄露。该资料没有验证 `WEB-INF/web.xml` 或其他任意路径，本文不扩展读取范围。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/oa%E6%B3%9B%E5%BE%AE0day%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
