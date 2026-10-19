---
schema_version: "1"
id: "VW-20261019-TOMCAT-REWRITE"
archive_commit: "6e3874f20aff29ccc12492825f65ad5f31937168"
title: "Tomcat RewriteValve 非收敛规则导致工作线程占用"
product: "Apache Tomcat"
version: "公开实验固定为 11.0.27；其他分支范围未确认"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "管理员启用 Host 或 Context RewriteValve，且配置可被请求匹配的非收敛规则；默认配置未启用该 Valve"
side_effects: "匹配请求可能持续占用 HTTP 工作线程；可能影响可用性"
source: "Abraxas Labs；Apache Tomcat 修复提交"
source_url: "https://github.com/abraxas/tomcat-rewrite-ns-loop/tree/6e3874f20aff29ccc12492825f65ad5f31937168"
source_status: "recorded"
---

# Tomcat RewriteValve 非收敛规则导致工作线程占用

## 范围与触发

Abraxas Labs 于 2026-10-12 发布针对 Tomcat 11.0.27 的实验。需要显式启用 RewriteValve 并存在匹配规则，不能写成默认部署均受影响。该资料没有为此问题分配 CVE；邻近的 CVE-2026-65927 不是同一项结论。

旧解析器将部分以 N 开头的标志按 next 处理，因此从 httpd 搬来的 NS、NV 可能意外进入重写循环。替换值为连字符时 URL 不改变，匹配规则不断重新处理。公开实验使用的配置如下：

```text
RewriteRule ^/loop$ - [NS]
RewriteRule ^/next$ - [N]
RewriteRule ^/skip$ - [S=-1]
RewriteRule ^/ok$ - [L]
RewriteRule ^/safe$ - [L,NS]
```

在该特定配置下，公开客户端对 `/loop`、`/next`、`/skip` 发出 GET，以超时作为线程占用证据；`/ok`、`/safe` 和并行正常请求是对照。单请求占用一个线程与整个线程池耗尽应区分，后者是作者推断，并非实验已经证明服务整体停止。这里没有代码执行或文件读取证据。

## 修正与静态审阅

Apache 提交 [2da9fddb](https://github.com/apache/tomcat/commit/2da9fddb3acdc2d3d55cf3a7826c9541faad400e) 增加重写轮数上限并拒绝负 skip；[8992dbdd](https://github.com/apache/tomcat/commit/8992dbdd46f397905f378a2eb68c6ef15785911e) 改为严格匹配标志。本次未确认发布版本边界，不把开发分支提交等同于已发布补丁。

已静态阅读固定提交的入口、lab/poc.py、run.sh、Dockerfile、Compose 和配置。脚本会拉取镜像、构建容器、发起回环请求，并执行 docker compose down -v 清理；不应视为无副作用检查器。未发现这些已读文本中的凭据收集或外传逻辑，但基础镜像不是摘要固定，不能据此保证供应链安全。未执行任何代码或请求。

仓库标注 AGPL-3.0，脚本另有使用声明；本文为独立中文整理，不复制其完整实现。固定代码入口：[lab/poc.py](https://github.com/abraxas/tomcat-rewrite-ns-loop/blob/6e3874f20aff29ccc12492825f65ad5f31937168/lab/poc.py)。
