---
source: "wy876 漏洞文库"
title: "MinIO存在默认口令漏洞"
product: "MinIO/MinIO Console"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "部署仍使用minioadmin测试/默认凭据且Console可达"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-308bc1c819e6b3471749b382"
entity_id: "ve-308bc1c819e6b3471749b382"
schema_version: "1"
---

# MinIO存在默认口令漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：部署仍使用minioadmin测试/默认凭据且Console可达
- 证据范围：只有一行账号密码，非独立CVE，无实际复现证据。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本写MinIO-Console只是组件名
- 缺测试版本、启动凭据配置、鉴权结果和修复步骤
- 不能由FOFA指纹推所有MinIO都用此口令

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
MinIO是基于GNU Affero通用公共许可证v3.0发布的高性能对象存储。兼容Amazon S3云存储服务的API。使用MinIO为机器学习、分析和应用程序数据工作负载构建高性能基础设施。MinIO存在默认口令漏洞

# 二、影响版本
+ MinIO-Console

# 三、资产测绘
+ fofa`app="MinIO-Console"`


# 四、漏洞复现
```plain
minioadmin/minioadmin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vmaf89lengzpaw3e>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
