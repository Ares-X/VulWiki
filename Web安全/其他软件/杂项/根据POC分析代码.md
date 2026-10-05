---
cve: "CVE-2023-41599"
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "primary"
primary_identifiers: "CVE-2023-41599"
referenced_identifiers: ""
identifier_status: "unknown"
title: "根据POC分析代码"
product: "JFinalCMS41599"
record_type: "analysis"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "缺版本权限/修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%A0%B9%E6%8D%AEPOC%E5%88%86%E6%9E%90%E4%BB%A3%E7%A0%81.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-25da45347296dc635f908d02"
entity_id: "ve-25da45347296dc635f908d02"
schema_version: "1"
previous_identifier_role: "unknown"
previous_primary_identifiers: ""
---

# 根据POC分析代码

## 编号角色补核（2026-10-04）

本次只确认编号在本文主题中的主编号／引用角色；版本、修复、截图及其他技术主张仍按下方具体待核说明阅读。旧字段和归档正文保持原值，较早的角色待核说明保留为历史记录。

核对依据：[CNA 记录](https://cveawg.mitre.org/api/cve/CVE-2023-41599)。这些记录支持编号／产品对应关系或编号状态，不替代本篇原始出处。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：JFinalCMS41599
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：缺版本权限/修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题泛化不可检索
2. getPara/renderFile等JFinal框架方法误称自己封装需核类归属
3. 主要源码请求响应全为截图，正文只有fileKey路径无完整接口
4. 缺版本权限/修复
5. 保留wy876对应PoC及官方JFinal方法文档，不能把应用路径校验缺陷归框架下载功能本身

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 赤弋安全团队   2025-02-17 00:00  
  
POC：  
```
https://github.com/wy876/POC/blob/main/JFinalCMS/JFinalCMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E(CVE-2023-41599).md
```  
  
![](../../.resource/remote/4be6f4002f0b6b7acc4d6329a52719a2358c0ffae768b19d4c64fa3ca4183695.png "")  
  
根据 POC 找到相对应的接口。  
  
![](../../.resource/remote/ea4db10c332b629827eeedfe12e57ebdf0b97340bf850044188f8fef7759ebff.png "")  
  
找到接口之后，点击进入相对应的 java 文件。  
  
![](../../.resource/remote/1559fe12671e1be7278f148365c4ade102549cab90420bf2cbd9b03c8f1e72ce.png "")  
  
这里 file() 方法也被拼接接口，应该是系统自己封装的方法，接着我们点击进入getPara  
。  
  
![](../../.resource/remote/78b49dd0219f61b5b15aab1d98e74439b17c9b3f365d49807b62ac006290be4e.png "")  
  
很明显，这里就是使用了request.getParameter  
，获取了当前参数fileKey  
。  
  
接下来就是分析 renderFile  
函数，点击进去，然后定位代码位置。  
  
![](../../.resource/remote/104681e620cfff81e37f8eea9034966c19dc3f9ac63daab1b68e908bbb33396b.png "")  
  
很明显是自己封装的方法，我们直接网上搜索，查看它的文档。  
```
https://jfinal.com/doc/3-8
```  
  
![](../../.resource/remote/799c236ab92add3fbfa0ee5e6c00519854e22d122e6938b9d119c9cdb272c551.png "")  
  
可以看出，此方法就是用于下载文件的。  
  
接下来分析getWebRootPath()  
方法。  
  
![](../../.resource/remote/7ad1d6b659b489cb1470aa717d5436224db4f66a087af4fb696f109276a0022c.png "")  
  
这里显示，如果根路径为空，就让路径等于detectWebRootPath()  
。  
  
继续点击去detectWebRootPath()  
方法。  
  
![](../../.resource/remote/9aec93c079b2d42a9af33bd607cd3a3f424779979f30f718332c475b458f07fc.png "")  
  
此方法就是用来识别 web 根路径。  
  
接下来，打上断点，进行调试。  
  
![](../../.resource/remote/38653df537139f1e0e02a646e61ffe7ce49d759fc4878da293051a74ae1fd60a.png "")  
  
fileKey=/../1.txt  
，继续下一个断点，进入 File()方法。  
  
![](../../.resource/remote/6bb0b7a1b35bc41ca83c9a8c6b783a9b81e62bf3efe46de61697e79328ad5a99.png "")  
  
调试得到根路径。  
  
![](../../.resource/remote/8839c4123de07ae9ff4e20b0e183042c6bec672a977df1cfaf5378ca70a8366f.png "")  
  
成功读取到文件。  
  
![](../../.resource/remote/76987505f23fe683eda4189c9dc0b1cbee72a900f10bfe99b022e0fe22ece199.png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
