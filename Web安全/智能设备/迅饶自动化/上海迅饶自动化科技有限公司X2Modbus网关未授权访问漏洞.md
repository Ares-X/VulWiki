---
source: "wy876 漏洞文库"
id: "vw-457e4fa220699b100fad6301"
entity_id: "ve-457e4fa220699b100fad6301"
schema_version: "1"
title: "上海迅饶自动化科技有限公司X2Modbus网关未授权访问漏洞"
product: "SunFull迅饶X2Modbus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "部分部署需伪造username=admin；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96/%E4%B8%8A%E6%B5%B7%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8X2Modbus%E7%BD%91%E5%85%B3%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gls8bg23feb5hiu7"
source_status: "recorded"
previous_fofa_unverified: "server="
fofa: "server=\"SunFull-Webs\" || icon_hash=\"-1384370370\""
---

# 上海迅饶自动化科技有限公司X2Modbus网关未授权访问漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SunFull迅饶X2Modbus
- 本文讨论：index.html及username Cookie信任
- 版本、权限与配置前提：部分部署需伪造username=admin；版本未知
- 资料类型：前端访问绕过线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 80%后台权限无功能清单或统计依据
- 显示管理首页不自动证明后端操作授权绕过；部分鉴权说法无版本区分
- FOFA字段残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 后端权限对照和部署差异待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
X2Modbus是上海迅饶自动化科技有限公司开发的一款功能很强大的协议转换网关， 这里的X代表各家不同的通信协议， 2是To的谐音表示转换， Modbus就是最终支持的标准协议是Modbus协议。用户可以根据现场设备的通信协议进行配置，转成标准的Modbus协议。在PC端仿真运行无误后，上传到硬件协议转换网关。上海迅饶自动化科技有限公司X2Modbus网关未授权访问漏洞，<font style="color:rgba(0, 0, 0, 0.9);">无需登录，直接访问后台管理首页即可获得80%的后台管理权限</font>

# 二、影响版本
+ X2Modbus

# 三、资产测绘
+ fofa`server="SunFull-Webs" || icon_hash="-1384370370"`
+ 特征


# 四、漏洞复现
<font style="color:rgba(0, 0, 0, 0.9);">若是复现不成功，说明增加了部分鉴权，可以在cookie增加username=admin的项也可直接绕过登录界面。</font>

```java
/index.html
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gls8bg23feb5hiu7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
