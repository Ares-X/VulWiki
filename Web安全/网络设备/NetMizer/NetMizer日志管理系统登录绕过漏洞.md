---
source: "wy876 漏洞文库"
id: "vw-52e06884779daafbc6a59031"
entity_id: "ve-52e06884779daafbc6a59031"
schema_version: "1"
title: "NetMizer 日志管理系统登录绕过漏洞"
product: "NetMizer日志管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未列版本；要求拦截请求但未提供请求"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NetMizer/NetMizer%E6%97%A5%E5%BF%97%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E7%99%BB%E5%BD%95%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hgzz1oo7add2wvv4"
source_status: "recorded"
---

# NetMizer 日志管理系统登录绕过漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NetMizer日志管理系统
- 本文讨论：main.html前端登录限制绕过候选
- 版本、权限与配置前提：未列版本；要求拦截请求但未提供请求
- 资料类型：登录绕过不完整步骤；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- “Drop掉下面对请求包”之后缺失被拦请求，步骤不可复核
- 仅后台页面访问主张，未验证受限业务API权限，不能据此确认服务器认证绕过

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际认证绕过或仅前端路由可访问待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
NetMizer 日志管理系统存在登录绕过漏洞，通过限制某个请求包的发送获取后台权限

### 二、影响版本
<font style="color:#000000;">NetMizer</font>

### 三、资产测绘
```plain
title="NetMizer 日志管理系统"
```


### 四、漏洞复现
访问页面 main.html 并抓取请求包

```plain
/main.html
```

, Drop掉下面对请求包


直接进入后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hgzz1oo7add2wvv4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
