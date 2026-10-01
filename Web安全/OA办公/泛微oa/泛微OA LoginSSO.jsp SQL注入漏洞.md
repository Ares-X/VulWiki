---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "公开资料标注 8.0；完整范围未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CNVD-2021-33202.md"
---

# 泛微OA LoginSSO.jsp SQL注入漏洞

## 漏洞描述

公开资料记录泛微 E-Cology `LoginSSO.jsp` 的 `id` 参数存在 SQL 注入，并展示通过 `/upgrade/detail.jsp/login/LoginSSO.jsp` 路径访问的请求。风险是调用者可以改变数据库查询并读取受数据库账号权限限制的数据。

## 影响范围与前提

公开复现资料标注 E-Cology 8.0，并关联 CNVD-2021-33202；完整受影响范围、厂商修复版本及当前部署认证条件未知。CNVD 编号来自公开复现资料，本文未另行核验登记正文。

## 公开验证资料

完整公开请求包含对账号表的查询，见下方固定提交的原文；这里仅给出路由入口片段，不把正常 `id=1` 当作注入验证：

```http
GET /upgrade/detail.jsp/login/LoginSSO.jsp?id=1 HTTP/1.1
Host: oa.example.com
```

原文的注入请求已将 SQL 关键字之间的空格编码为 `%20`。复制原始 HTTP 请求时不能把未编码空格放进 request-target。OA-EXPTOOL 的 `<code>` 加 HTTP 200 匹配只能作为初筛；确认仍需实际查询结果和正常输入的对照，不能从 HTML 标签推出注入成功。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CNVD-2021-33202.md)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/E-Cology%20LoginSSO.jsp%20SQL%E6%B3%A8%E5%85%A5.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
