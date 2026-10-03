---
schema_version: "1"
id: "VW-20261003-NATIVE-02"
title: "CFITSIO 扩展文件名的复制、SSRF 与外传原语及 4.7.0 加固"
product: "CFITSIO Extended Filename Syntax"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
version: "公开实验固定 CFITSIO 4.6.3（386e719ccc5e30ca497ec2df57c4ef1de5adbc3f）；不同下游入口与后续版本不能直接外推"
fixed_version: "4.7.0 已加入对应复制限制及 HTTP CR/LF 检查；并不等于禁用全部 EFS 或 SSRF 面"
prerequisites: "应用将不可信字符串送入 EFS API；文件权限、编译启用的网络驱动及出网路径满足；root 外传另受 stdin/凭据与原始数据长度影响"
side_effects: "复制或创建文件、请求内网或外网、root 协议传输文件及凭据；Docker 构建联网安装与编译；挂载目录承受写入，root.py 默认监听所有接口"
source: "Adrian Denkiewicz / Doyensec；HEASARC 官方源码与发布信息"
source_status: "recorded"
source_url: "https://blog.doyensec.com/2026/05/19/cfitsio-weaponized-filenames.html"
verification_source: "https://github.com/doyensec/cfitsio-efs-playground/tree/5f3870bf298f254f4237fba798601ac5bf35d17d"
---

# CFITSIO 扩展文件名的安全边界

2026-10-03 已静态阅读公开实验、构建文件和上游版本源码，未构建镜像、运行辅助程序或联系示例地址。本文记录四种具体原语与后续加固，不将其合称为通用 RCE。当前缺口是各下游应用及构建选项的实测覆盖。

## 原理与版本

CFITSIO 的 EFS 接口会解释协议、输出副本、原始数据格式和过滤子句，文件名并非总是字面路径。[官方语法文档](https://heasarc.gsfc.nasa.gov/docs/software/fitsio/filters.html) 明确列出网络文件、原始数组和过滤功能。攻击入口是下游应用把攻击者控制的字符串交给这些接口，不是任何上传 FITS 文件都自动满足条件。

[Doyensec 公告](https://www.doyensec.com/resources/Doyensec_Advisory_CFITSIO_Q12026.pdf) 的评估对象为 4.6.3；公开实验提交为 `5f3870bf298f254f4237fba798601ac5bf35d17d`。其 `fits-sample-opener.c` 默认实际调用 `fits_open_file`，再查询图像维度和尺寸；README 的 `fits_open_image` 表述与代码不符，应以代码为准。`--secure` 分支改用 `fits_open_diskfile`。

## 公开 PoC 对应的能力

1. 输出副本子句可在 FITS 校验失败前复制非 FITS 文件；输入可读、输出目录可写仍是必要条件
2. HTTP(S)/FTP(S) 驱动可产生请求，并把响应落到指定输出路径；网络访问与落盘应分别观察
3. 旧版裸 HTTP 请求组装将文件名内容带入请求行，换行可改变请求头；不能把该实现结论直接套到 libcurl TLS 路径
4. `root://` 输出配合原始字节转图像子句可传出文件片段；样例请求的是前 500 字节，文件不足该长度可能失败。交互 stdin 可能等待凭据，作者演示依赖非交互条件

具体参数、接收器和预期输出见[固定实验 README](https://github.com/doyensec/cfitsio-efs-playground/blob/5f3870bf298f254f4237fba798601ac5bf35d17d/README.md)。其中复制样例原样如下，属于历史 4.6.3 资料，并未执行：

```sh
docker run --rm -v "$(pwd)":/workspace cfitsio:4.6.3 \
  fits-sample-opener '/etc/passwd(/workspace/foo)'
```

## 构建与副作用审查

- [Dockerfile](https://github.com/doyensec/cfitsio-efs-playground/blob/5f3870bf298f254f4237fba798601ac5bf35d17d/Dockerfile) 使用 Ubuntu 22.04，经 apt 安装编译工具、zlib、libcurl 等，再下载上游源码、configure/make/install。基础镜像、apt 包及下载内容未用摘要锁定；复现性不能仅靠镜像标签保证
- [辅助程序](https://github.com/doyensec/cfitsio-efs-playground/blob/5f3870bf298f254f4237fba798601ac5bf35d17d/fits-sample-opener.c) 没有独立 shell 执行逻辑，但 READONLY 参数不保证 EFS 无落盘或网络副作用
- [root.py](https://github.com/doyensec/cfitsio-efs-playground/blob/5f3870bf298f254f4237fba798601ac5bf35d17d/root.py) 只依赖 Python 标准库，默认绑定 `0.0.0.0:1094`，接收一个连接，缓存并打印传入内容，也打印用户名及密码字节；它不是只记录连接的无数据监听器
- `--rm` 只处理容器生命周期，不能恢复宿主挂载目录；`--network=host` 扩大可达范围。恢复应覆盖输出文件、日志、镜像和监听进程；本次未执行这些操作

## 2026-10-03 修复核对

不能沿用五月公告中的 Open 状态作为当前全部结论。[HEASARC 发布页](https://heasarc.gsfc.nasa.gov/docs/software/fitsio/fitsio.html) 已发布 4.7.0，并建议升级。固定提交 `d6d27653740864a0483e74cff23c53e34e1dceee` 的静态证据为：

- [drvrnet.c](https://github.com/HEASARC/cfitsio/blob/d6d27653740864a0483e74cff23c53e34e1dceee/drvrnet.c)：`http_open_network` 在连接前拒绝 CR/LF；多个网络复制分支增加 FITS 内容检查
- [cfileio.c](https://github.com/HEASARC/cfitsio/blob/d6d27653740864a0483e74cff23c53e34e1dceee/cfileio.c)：输出副本路径加入规范化和 `/etc/`、`/var/` 检查，并拒绝 rawfile 到 root 的复制组合
- [drvrfile.c](https://github.com/HEASARC/cfitsio/blob/d6d27653740864a0483e74cff23c53e34e1dceee/drvrfile.c)：本地复制也检查输入格式。多项复制限制受 `CFITSIO_DISABLE_COPY_RESTRICT` 环境变量影响，应核对实际服务环境

上述限制可追溯至[2026-06-11 的补丁 69b6f033c64e4926711c0fced342e7a4f67ad091](https://github.com/HEASARC/cfitsio/commit/69b6f033c64e4926711c0fced342e7a4f67ad091)，已进入 4.7.0；4.6.4 的对应 HTTP 源码尚无该 CR/LF 检查。补丁发布之前的五月文稿不能代表十月的修复状态。

以上是源码可见的加固，不是本库成功/失败实验。网络驱动仍存在，所以“升级即彻底无 SSRF”也不成立。只处理字面文件名的应用宜使用 `fits_open_diskfile`，同时约束文件根目录、进程权限和出网范围。

## 来源

[Adrian Denkiewicz，2026-05-19 原研究](https://blog.doyensec.com/2026/05/19/cfitsio-weaponized-filenames.html) 支持攻击面和历史演示；公告提供实验和缓解说明，仓库提供可静态核对的完整材料；上游固定源码支持后续版本修正。本文为中文分析与链接汇编，不复制整篇原文或声称本地复现。
