---
schema_version: "1"
id: "VW-20261003-CH-onlyoffice-savefile"
title: "ONLYOFFICE savefile 路径穿越与 docbuilder 利用条件分析"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
source_status: "recorded"
product: "ONLYOFFICE DocumentServer"
record_type: "analysis"
primary_identifiers: ""
referenced_identifiers: "CVE-2021-3199"
identifier_status: "unknown"
version: "中文研究测试 DocumentServer 5.4.2.46；完整引入范围未核实"
fixed_version: "DocumentServer 5.6.2 的官方变更记录修复 savefile 参数路径穿越（Bug 46037）"
prerequisites: "savefile 路由可达；所分析配置关闭 browser JWT 校验；本地文件存储；服务用户对目标路径有写权限；执行链另需 docbuilder 路由与文件执行条件"
side_effects: "覆盖文件；示例可改写 docbuilder、删除 server.js、写入命令路由并重启服务；业务中断与持久化风险；需快照/备份恢复"
source: "干杯Security / 长亭百川云；ONLYOFFICE 上游源代码与变更记录；moehw 的相邻 CVE 对照"
source_url: "https://rivers.chaitin.cn/blog/cq958510lnechd2450h0"
---

# ONLYOFFICE savefile 路径穿越与 docbuilder 利用条件分析

## 先分清两条路径

2026-10-03 对照中文文章与固定版本源码。文章首先尝试 CVE-2021-3199 的 `uploadImageFile` 方案，报告失败，再分析 `savefile` 的 `outputpath`。两个入口的认证及数据格式不同，不能因文章引用了 CVE-2021-3199 就给 `savefile` 自动套用该编号；本文仅将它列为参考编号。官方变更把 `savefile` 修复单列为 Bug 46037。

未部署容器、执行 PoC、请求示例主机或安装依赖。作者称 5.4.2.46 环境取得写文件和命令结果，本库没有复现；文章截图没有完成像素核验。

## 固定源码与根因

[ONLYOFFICE/server 提交 39bee65d](https://github.com/ONLYOFFICE/server/tree/39bee65d06c3d4f7fab18a7d1ffc52c7f2dea90a)对应 `v5.4.2.46`。此次读取了：

- `DocService/sources/server.js`：注册 `POST /savefile/:docid`
- `DocService/sources/canvasservice.js`：`saveFile` 解析查询参数 `cmd`，调用 `addRandomKeyTaskCmd`，再把 `getSaveKey()`、`getOutputPath()` 拼成存储路径，内容取 `req.body`
- `Common/sources/storage-fs.js`：本地存储通过 `path.join` 构造路径并写文件；该路径没有目录边界校验
- `Common/config/default.json`：此标签默认 `services.CoAuthoring.token.enable.browser` 为 `false`
- `FileConverter/sources/converter.js`：文档生成分支选择配置中的 docbuilder 程序并调用 `spawnAsync`

随机化 `savekey` 不能抵消另一段可控路径中的上级目录分量。开启 browser token 校验后代码进入 JWT 判断；不能沿用关闭校验时的无 token 请求来判断安全与否。其他存储后端、反向代理限制和部署权限也会改变效果。

## 原文验证入口及结果区分

原作者的文件写入测试使用以下请求目标，原 Host 为 `10.37.129.2:9000`，正文为花括号示例，意图写入 `/tmp/111.txt`：

```text
/savefile/1?cmd={"id":1,"outputpath":"../../../../../../../../tmp/111.txt"}
```

这保留了原文 URI，而非宣称完整可发送的 HTTP 报文。原文展示的请求存在静态 Content-Length、抓取换行及后续数据长度不对应问题；使用时应回到原页面核对，不能把网页排版直接当作原始网络字节。判断成功应在授权实验的服务侧核对文件路径、内容和账户权限，并与正常路径及修复版本对照；单凭 HTTP 状态码不足。

原文的后续执行链覆盖 `/var/www/onlyoffice/documentserver/server/FileConverter/bin/docbuilder`，由 `/docbuilder` 触发，然后改写 `DocService/sources/server.js` 并重启。已读源码中 `/docbuilder` 还有 `utils.checkClientIp`；“能写文件”不等于任意部署都能完成该执行链。

## 副作用与静态防投毒核验

原文不是无害探针。它包含删除原 `server.js`、用 Base64 内容写回文件、增加 `/runExec.json` 路由、使用 `supervisorctl` 重启的步骤。已将原 Base64 字符串仅作数据解码并阅读，未加载/执行；解码文件为 9416 字节，SHA-256 `516b75880f98c405b934242c91fc007b4aad237d105f8c0e69794717a5715a2c`。新增路由取 `username` 查询/请求头值并交给 shell，属于持续命令入口。该行为与原作者描述相符，仍具有明显持久化和业务中断风险。

原文还用 `--privileged=true` 启动旧容器，扩大宿主机风险；这不是源码证明的漏洞必要条件。静态核验未审计镜像、npm 传递依赖或安装钩子，也未证明镜像供应链安全。

授权实验必须使用可整体恢复的隔离环境；预先记录服务文件哈希、备份 docbuilder 与 server.js，事后恢复二者、移除新增路由及测试文件，并验证文档转换功能恢复。仅删除 `/tmp/111.txt` 不能清理完整链条。

## CVE 对照与修复

[moehw 固定 PoC](https://github.com/moehw/poc_exploits/blob/641a5cacf1eed0e87ad0c06746345cddcac3d812/CVE-2021-3199/poc_uploadImageFile.py)及同目录说明用于区别 CVE-2021-3199：它走 `/upload/...`、构造 JWT 和 `ENCRYPTED;` 数据，后续覆盖可执行文件并回连。已读完整脚本（SHA-256 `0b0d086fb8ce3cd8c3242d0b2b54daf4b3a541772840270fbc844555ded61ef9`）；依赖 requests 与 PyJWT，源码含旧版 `.decode('utf-8')` 调用而未锁版本，不能承诺当前依赖可直接运行。这不是本条 `savefile` 的 EXP。

[DocumentServer 固定 CHANGELOG](https://github.com/ONLYOFFICE/DocumentServer/blob/f580eb58439432310943ece02c9730c6a21365e7/CHANGELOG.md#562)将 Bug 46037 列在 5.6.2；5.6.3 才列 image upload 的 CVE-2021-3199。维护时应升级至受支持且包含后续安全更新的版本；5.6.2 是历史修复落点，不是 2026 年推荐版本。限制路由、启用合适认证与最小文件权限只能作补充防护。

## 来源

- [干杯Security 原文的百川云转载](https://rivers.chaitin.cn/blog/cq958510lnechd2450h0)：站内日期 2024-07-13；失败尝试、5.4.2.46 请求和后续执行链
- [固定 canvasservice.js](https://github.com/ONLYOFFICE/server/blob/39bee65d06c3d4f7fab18a7d1ffc52c7f2dea90a/DocService/sources/canvasservice.js)：数据流与 JWT 分支
- [固定 storage-fs.js](https://github.com/ONLYOFFICE/server/blob/39bee65d06c3d4f7fab18a7d1ffc52c7f2dea90a/Common/sources/storage-fs.js)：本地路径拼接与写入
- [固定 CHANGELOG](https://github.com/ONLYOFFICE/DocumentServer/blob/f580eb58439432310943ece02c9730c6a21365e7/CHANGELOG.md)：两个问题的不同修复版本

转载页提供的原始公众号链接（本次未独立读取，原始发布日期待核）：<https://mp.weixin.qq.com/s?__biz=Mzk0MDM3NjcxMg==&mid=2247483740&idx=1&sn=56f93770972dc6fcce3147d0bd3d62d2&chksm=c2e3d6bbf5945fadc4f8e7295d3487598d607c44cbf18562fffd45c73536e54301b895a047fd&scene=58&subscene=0#rd>
