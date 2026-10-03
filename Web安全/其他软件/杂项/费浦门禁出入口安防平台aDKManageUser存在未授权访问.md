---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "费浦门禁出入口安防平台aDKManageUser存在未授权访问"
product: "费浦ADKFP门禁平台"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "影响只产品无版本；缺修复和登录验证前提"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E8%B4%B9%E6%B5%A6%E9%97%A8%E7%A6%81%E5%87%BA%E5%85%A5%E5%8F%A3%E5%AE%89%E9%98%B2%E5%B9%B3%E5%8F%B0aDKManageUser%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa: "body=\"/adkfp/getCode\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ox6ro65l6vgz2hl5"
id: "vw-0d666ce432ee7abaea0c9757"
entity_id: "ve-0d666ce432ee7abaea0c9757"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 费浦门禁出入口安防平台aDKManageUser存在未授权访问

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：费浦ADKFP门禁平台
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：影响只产品无版本；缺修复和登录验证前提
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. FOFA body=截断
2. 仅路径无请求/响应，账号密码是明文还是hash及真实未授权未展示
3. 影响只产品无版本
4. 长企业功能介绍应缩短
5. 缺修复和登录验证前提

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/ox6ro65l6vgz2hl5>

### 归档技术正文

# 一、漏洞简介
ADKFP门禁出入口综合安防管理平台，企业出入口系统采用两级运营管理方式，即“集中控制，分散管理”的方式实现企业管理中心和各企业合作运营的管理模式。 企业出入口系统的所有功能，都是以功能模块的形式提供。模块化的好处是能适应用户的需求，系统可任意搭配，互相配合，能够组合式适应用户需要，与用户的管理模式紧密结合。系统覆盖基础平台、身份信息平台、设备管理、门禁管理、考勤管理、访客管理、车辆门禁、电子门锁管理、移动端管理，智能办公模块包含智能迎宾、会议签到、布控抓拍、报警信息推送等多个应用子系统，所有子系统可实现信息共享，统一服务于整个企业出入口平台。 ADKFP门禁出入口综合安防管理平台存在接口未授权访问，可通过访问接口获取系统账号及密码，进而登录系统后台进行下一步渗透。

# 二、影响版本
+ ADKFP门禁出入口综合安防管理平台

# 三、资产测绘
+ fofa`body="/adkfp/getCode"`
+ 特征


# 四、漏洞复现
```plain
/aDKManageUser/selectCll_2?roleId=2&page=1&limit=10
```


使用泄漏的账号密码登陆系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ox6ro65l6vgz2hl5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
