---
source: "wy876 漏洞文库"
id: "vw-6e73904ab8e5f95f81ce67e7"
entity_id: "ve-6e73904ab8e5f95f81ce67e7"
schema_version: "1"
title: "海康威视流媒体管理服务器 user.xml 账号密码泄漏漏洞"
product: "Hikvision流媒体管理服务器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无鉴权声明，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%E6%B5%81%E5%AA%92%E4%BD%93%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8user.xml%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xz0uizp3x0yzr3kl"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"流媒体管理服务器\"&&web.body=\"杭州海康威视系统技术有限公司 版权所有\""
---

# 海康威视流媒体管理服务器 user.xml 账号密码泄漏漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision流媒体管理服务器
- 本文讨论：config/user.xml未授权配置读取
- 版本、权限与配置前提：无鉴权声明，版本未知
- 资料类型：凭据文件泄露线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Base64编码误称加密
- 无XML样本/字段或登录过程，声称成功只能作为作者报告不能独立验证
- 与downdb/showFile是不同根因，元数据截断
- 已落实的文本修订：“base64加密”改为“base64编码”；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 凭据格式、匿名可读和固件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
HIKVISION 流媒体管理服务器配置文件未做鉴权，攻击者通过漏洞可以获取网站账号密码

# 二、影响版本
+ HIKVISION 流媒体管理服务器

# 三、资产测绘
+ hunter：`web.body="流媒体管理服务器"&&web.body="杭州海康威视系统技术有限公司 版权所有"`


+ 登录页面


# 四、漏洞复现
```plain
  /config/user.xml
```


账号密码为base64编码

测试登录，登录成功


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xz0uizp3x0yzr3kl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
