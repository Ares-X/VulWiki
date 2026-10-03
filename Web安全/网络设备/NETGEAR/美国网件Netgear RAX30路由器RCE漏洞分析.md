---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-97ebc6f4958a90e832411b3f"
entity_id: "ve-97ebc6f4958a90e832411b3f"
schema_version: "1"
title: "美国网件Netgear RAX30路由器RCE漏洞分析"
product: "NETGEAR RAX30"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2022-47208; CVE-2022-47209"
referenced_identifiers: ""
prerequisites: "测试1.0.7.70，称1.0.9.90修复；同网段User-Agent路径、支持账户路径、启动时WAN DNS/DHCP路径条件不同"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NETGEAR/%E7%BE%8E%E5%9B%BD%E7%BD%91%E4%BB%B6Netgear%20RAX30%E8%B7%AF%E7%94%B1%E5%99%A8RCE%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

> 来源补回（2026-10-03）：本轮 4 处缺损按 [同题公开来源](https://www.ctfiot.com/103003.html) 的对应文字补入；这只确认文本对应，不是本库的复现结果。 其中 `$1$redacted` 是该来源已有字面占位符，未推测替换；它不表示本轮做了脱敏。

#  美国网件Netgear RAX30路由器RCE漏洞分析   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NETGEAR RAX30
- 本文讨论：CVE-2022-47208、CVE-2022-47209及pucfu JSON命令注入链
- 版本、权限与配置前提：测试1.0.7.70，称1.0.9.90修复；同网段User-Agent路径、支持账户路径、启动时WAN DNS/DHCP路径条件不同
- 资料类型：多路径RCE研究转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 多处空代码块，关键反编译及补丁内容仅截图；固件链接格式损坏
- HTTPS云端地址被DNS劫持后如何通过证书校验未交代，DNS控制本身不足证明HTTPS响应可替换
- 缺原始研究/PSIRT精确来源，混写多个漏洞边界

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 核验版本、CVE映射、证书验证行为及独立pucfu漏洞编号
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 B2eFly  山石网科安全技术研究院   2023-03-09 10:28  
  
‍  
## ‍Netgear RAX30 漏洞分析  
  
2022年**Pwn2Own**比赛前一天，Netgear官方修复了RAX30设备多个高危漏洞。  
  
**设备品牌:** Netgear  
  
**设备型号:** RAX30  
  
原归档固件链接残片：

```text
固件版本:  [RAX30 1.0.7.70](  
Nighthawk RAX30 | WiFi 6 Router | NETGEAR Support  
)
```

固件版本标签：RAX30 1.0.7.70。补充 [NETGEAR RAX30 官方产品支持页](https://www.netgear.com/support/product/RAX30.aspx)。

> 原归档未保存此产品页的原始 URL。补充链接仅指型号支持页，不单独确认前述 1.0.7.70 固件版本号。  
##   
  
**0****1**  
  
  
**漏洞概述‍**  
  
- **CVE-2022-47208**  
  
默认情况下运行的“puhttpsniff”服务由于用户输入不当导致容易受到命令注入的影响。与路由器位于同一网段上的用户可无需身份验证即可在设备上执行任意命令。  
- **CVE-2022-47209**  
  
默认情况下，设备上有四个用户帐户。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgE96l3c6N1BhxlO04Bmtuscu1REJfWWvvXOyic09gBNaGNRDPUtJSN5yQ/640?wx_fmt=png "")  
  
admin -> 常规用户，通常为web服务和其他服务  
  
support->后台技术支持后门账户  
- 未查到CVE号  
  
默认情况下运行的/bin/pucfu程序在boot过程中将会尝试连接Netgear域名并获得JSON响应数据。使用DHCP服务器去控制DNS服务器给路由器WAN口分配地址。通过控制DNS 查询响应报文触发命令注入。  
  
  
**0****2‍**  
  
  
**漏洞分析**  
### 2.1 CVE-2022-47208  
  
查看命令注入危险函数，发现获取User-Agent参数没有进行过滤，导致命令注入。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEflUFpatgVN8TBYaxlJLwahaphtbJRogyRjicic4wWVH0iaPCwiba4zzOJQ/640?wx_fmt=png "")  
### 漏洞利用条件  
  
伪造User-Agent  
### 漏洞原理  
  
Web服务在获取客户端请求包中User-Agent数据字段未能有效筛选危险字符导致设备任意命令执行。  
### 2.2 CVE-2022-47209  
  
硬编码  
```
admin:$1$redacted:0:0:Administrator:/:/bin/sh
support:$1$QkcawmV.$VU4maCah6eHihce5l4YCP0:0:0:Technical Support:/:/bin/sh
user:$1$9RZrTDt7$UAaEbCkq.Qa4u0QwXpzln/:0:0:Normal User:/:/bin/sh
nobody:$1$OWpQjger$j7CFLUn8yoD8agVf6x5gA0:0:0:nobody for ftp:/:/bin/sh

```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgErmqCHJXrc47icKWicibLHAQAXdrRQeWgvMaTibbP0TscoemgGotwGN9pow/640?wx_fmt=png "")  
  
### 2.3 pucfu 引发的命令注入  
#### 漏洞原理  
  
pucfu在启动过程中会向域名https://devcom.up.netgear.com/的netgear官网获取一个json数据，该数据最终北SetFileValue函数接卸，该函数存在命令执行漏洞，如果获取得到的json数据可以伪造的话，就会执行任意命令。  
‍  
#### 漏洞触发  
  
/bin/pucfu->/usr/lib/fwcheck.so(get_check_fw)->fw_check_api->curl_post  
  
/lib/libpu_util.so(SetFileValue)->pegaPopen->libc.so(execve)  
```
graph LR
A[pucfu] -->B(fwcheck.so) -->C(fw_check_api) -->D(curl_post) -->E(libpu_tuil.so) -->F(SetFileValue) -->G(pegaPopen) -->H(libc.so) -->J(execve)

```  
#### 2.3.1 pucfu  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgE7smmBJn4f1yCHOTT5yZ4IPfapm63m8s6ybbs3ogFaZHa2YtpttkkkQ/640?wx_fmt=png "")  
  
将获取得到的json数据存储到v29变量中，最后将v29数据传递给SetFileValue函数。  
#### 2.3.2 get_check_fw  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEaEoNyOlq6u7mmYWnNPibT4NXIaOO2LRSXB1qW0cXuibM5vSBMLwU2sRA/640?wx_fmt=png "")  
  
从D2数据库中获取UpBaseURL,调用Netgear API 将从服务器端获取的数据进行保存。  
#### 2.3.3 fw_check_api  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEKVSynEc946q0IXnmAFLVLGoZEIT57AFJV48iatfZAUMaNMOhCxfss7A/640?wx_fmt=png "")  
  
最终pucfu bufferA获取到的数据就是url对应的数据内容，strcpy(bufferB,bufferA)  
#### 2.3.4 SetFileValue  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgErxzHelV5TMfehwnEhx1DmXUab3VF2ibvW2FafAkuLdNu83FstmsTpWg/640?wx_fmt=png "")  
  
判断是否有'/'  
```
SetFileValue("/tmp/fw/cfu_url_cache", "lastURL", bufferB); #lastURL 可控
sed -i 's|^lastURL=.*|lastURL=/'可控数据;# /'/tmp/fw/cfu_url_cache
sed -i 's|^lastURL=.*|lastURL=|'可控数据;# |'/tmp/fw/cfu_url_cache

```  
  
pegaPopen  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEmczuBZOgLL9F7Yz8PotnZjfBxoo0NWMiaq0zWSmdmbELoiax8lAZbVAA/640?wx_fmt=png "")  
  
构造数据，实现命令执行  
```
"url":"';reboot#"
```  
#### 漏洞利用条件  
  
运行DHCP和DNS服务端劫持路由器原来指向的域名，然后通过伪造响应来实现任意命令执行。  
  
  
**0****3‍**  
  
  
**漏洞修复**  
  
**固件版本:**  
1.0.9.90  
### 3.1 puhttpsniff 漏洞修复  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEa6libU2crWKQbeTfRcjWAeLxYU1q18IRz8za9AGN8IFVtO82HptxibhQ/640?wx_fmt=png "")  
  
使用带参数的调用而不是直接命令调用。  
### 3.2 pucfu漏洞修复  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Gw8FuwXLJnQ1YfRNHzjcvTzwY8IVLMgEQ3uia53PDe4GVlibttRB57RkhXLEKNA1DQbnPpaLthv2kxNEGPjicgeBg/640?wx_fmt=png "")  
  
使用带参数的调用而不是直接命令调用。  
  
  
**0****4‍**  
  
  
**总结‍**  
  
此次Netgear RAX30设备漏洞，主要还是开发者没能处理好数据是否可控、是否存在危险字符。Netgear官方在Pwn2own比赛前一天修复漏洞，对参赛选手来说也是一种考验。  
  
固件下载地址：https://www.netgear.com/support/product/RAX30#download  
  
  
‍  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
