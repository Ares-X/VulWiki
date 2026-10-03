---
source: "wy876 漏洞文库"
id: "vw-4ef56879aaa25f177cd8da53"
entity_id: "ve-4ef56879aaa25f177cd8da53"
schema_version: "1"
title: "浙江宇视媒体服务器-user-信息泄露漏洞"
product: "Uniview宇视转码/媒体服务器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "认证/型号/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E6%B5%99%E6%B1%9F%E5%AE%87%E8%A7%86%E5%AA%92%E4%BD%93%E6%9C%8D%E5%8A%A1%E5%99%A8-user-%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fmgc1li99c5o7pm4"
source_status: "recorded"
previous_fofa_unverified: "body="
fofa: "body=\"images/a_fill_login_right_a.gif\""
---

# 浙江宇视媒体服务器-user-信息泄露漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Uniview宇视转码/媒体服务器
- 本文讨论：user.table用户资料泄露
- 版本、权限与配置前提：认证/型号/版本未知
- 资料类型：凭据摘要泄露线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- MD5不是解密；示例Admin_123只是某次破解结果，不能推广固定通用密码
- 无user.table内容/摘要原文/会话说明，正文标题媒体与转码产品关系需明确
- FOFA元数据截断
- 已落实的文本修订：“使用MD5解密，密码为Admin_123”改为“原文报告某次候选密码比对得到 Admin_123；MD5 不是可逆加密，该样例不代表设备的固定通用密码”；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 文件内容、匿名访问及账号格式待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
浙江宇视科技有限公司创立于2011年，是一家全球公共安全和智能交通的解决方案提供商。

浙江宇视科技有限公司转码服务器配置管理系统存在密码漏洞，攻击者可利用该漏洞登录后台。

### 二、影响版本
宇视转码服务器

### 三、资产测绘
fofa: body="images/a_fill_login_right_a.gif" 

hunter: app.name=="Uniview 宇视媒体服务器"  

界面


### 四、漏洞复现
```plain
/user.table
```

原文报告某次候选密码比对得到 Admin_123；MD5 不是可逆加密，该样例不代表设备的固定通用密码

后台界面


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fmgc1li99c5o7pm4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
