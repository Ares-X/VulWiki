---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md"
---

# 泛微OA users.data 敏感信息泄漏漏洞

## 漏洞描述

公开资料记录泛微 E-Cology 的 `/messager/users.data` 可暴露用户数据。响应中的编码不构成访问控制；解码后若包含不应向当前调用者公开的人员记录，即造成信息泄漏。

## 影响范围与前提

产品：泛微 E-Cology；具体受影响版本与修复范围未知。公开复现资料描述可直接下载，但仍需核对实际部署的认证状态和数据可见权限。

## 公开验证资料

```http
GET /messager/users.data HTTP/1.1
Host: oa.example.com
```

公开资料要求先作 Base64 解码，再按 GBK 解释文本。应根据实际响应结构提取待解码数据，不假定所有版本使用固定 XML 包装。只有解码后可识别出真实、非公开的用户记录，才能确认泄漏；HTTP 200、非空响应或 XML 标签均不足以判断。解码工作可离线进行，无需把数据发送至外部解码服务。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20users.data%20%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md)
- [公开资料 2](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc11.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
