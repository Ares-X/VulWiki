---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "公开资料标注 8.0；完整范围未知"
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-getsqldata-sqli.yaml"
---

# 泛微E-Cology getSqlData接口SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的 `getSqlData` 接口接收 `sql` 参数。公开资料展示 SQL Server 表达式被执行并返回结果，可用于确认 SQL 输入控制；在受影响部署中，进一步的数据访问范围受数据库账号权限限制。

## 影响范围与前提

公开复现资料标注 E-Cology 8.0；完整受影响版本与补丁范围未知。以下验证语法适用于 SQL Server。公开请求未带认证信息，但具体部署的权限要求仍需核对。

## 公开验证资料

使用 ProjectDiscovery 模板中的常量摘要计算验证，避免读取用户密码：

```http
GET /Api/portal/elementEcodeAddon/getSqlData?sql=select%20substring(sys.fn_sqlvarbasetostr(hashbytes('MD5','999999999')),3,32) HTTP/1.1
Host: oa.example.com
```

有效结果应包含常量 `999999999` 的 MD5 值 `c8c605999f3d8352d7bb792cf3fdb25b`，并确认来自查询结果，而非请求反射或错误页。上游另有空 `sql` 加通用状态字段的匹配分支；该分支不能独立证明 SQL 注入。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-getsqldata-sqli.yaml)
- [公开资料 2](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20getSqlData%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md)
- [公开资料 3](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-getdatasql.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
