---
schema_version: "1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
source_status: "recorded"
id: "VW-20261003-BREADTH-04"
title: "Argo CD repo-server构建选项与Helm网络边界公开验证（GHSA-47m3-95c7-g2g8）"
product: "Argo CD；Argo CD Helm chart"
primary_identifiers: "GHSA-47m3-95c7-g2g8"
referenced_identifiers: ""
identifier_status: "active"
version: "Helm chart <10.0.0 的默认网络策略问题；原研究代码分析使用 Argo CD v2.13.3"
fixed_version: "Helm chart 10.0.0 默认启用 global.networkPolicy.create；不等同于 repo-server 认证代码修复"
prerequisites: "可访问内部 repo-server gRPC；进一步 Redis 链需要 Redis 网络访问和凭据，并依赖同步条件；不能概括为公网任意用户直接攻陷集群"
side_effects: "公开仓库载荷读取并外传 REDIS_PASSWORD；另一脚本把环境变量写至 /tmp/pwned；Redis阶段改缓存、可能部署高权限Pod；本文未执行"
source: "Hugo Vincent / Synacktiv；hugo-syn/pwn；argoproj Helm 安全公告与模板"
source_url: "https://www.synacktiv.com/en/publications/caught-in-the-octopus-trap-unauthenticated-rce-in-argo-cd-with-codeql"
---

# Argo CD repo-server构建选项与Helm网络边界公开验证

本篇区分内部接口的信任前提、代码执行演示和 Helm 打包修复。2026-10-03 阅读原文、五文件载荷仓库与固定 chart 文件；未构建客户端、执行载荷、访问 gRPC/Redis、启动容器或部署清单。公开 `argo-cdown` 自动化工具未找到，不能宣称已审读该工具。

## 漏洞边界

Synacktiv 的 Hugo Vincent 于 2026-07-01 发表研究：外部 API 限制与内部 repo-server gRPC 并非同一个信任边界。直接访问内部 `GenerateManifest` 可提交构建配置，利用 Kustomize 的 Helm 命令选项执行仓库内脚本。后续 Redis 缓存更改是另一个有附加前提的阶段，不是仅访问 Web UI 即得到整个集群权限。[原文及内联 ManifestRequest](https://www.synacktiv.com/en/publications/caught-in-the-octopus-trap-unauthenticated-rce-in-argo-cd-with-codeql)

Helm 维护者 [GHSA-47m3-95c7-g2g8](https://github.com/argoproj/argo-helm/security/advisories/GHSA-47m3-95c7-g2g8) 2026-06-29 公告将影响对象限定为 `<10.0.0` 的 Argo CD Helm package，修复版本为 `10.0.0`，重点是恢复默认网络限制。不要将 chart 版本 10.0.0 写成 Argo CD 应用版本，也不要把原文“unauthenticated”省略成不需要集群内网络落点。

## 公开材料可验证什么

原文给出 gRPC 请求对象、仓库内容与输出，并链接 [hugo-syn/pwn](https://github.com/hugo-syn/pwn/tree/22d0a4784e28ece8634a8f799c2c454379f170aa)。本次固定完整五文件树：README、`kustomization.yaml`、`exfil.sh`、`exfil.pl`、`pwn.sh`。没有依赖安装脚本、工作流或二进制。

- [kustomization.yaml](https://github.com/hugo-syn/pwn/blob/22d0a4784e28ece8634a8f799c2c454379f170aa/kustomization.yaml) 声明名为 `pwn`、版本 `0.0.1` 的 Helm chart，触发相应生成器路径
- [exfil.sh](https://github.com/hugo-syn/pwn/blob/22d0a4784e28ece8634a8f799c2c454379f170aa/exfil.sh) 调用 `perl exfil.pl`
- [exfil.pl](https://github.com/hugo-syn/pwn/blob/22d0a4784e28ece8634a8f799c2c454379f170aa/exfil.pl) 用 `IO::Socket::INET` 连接 `192.168.108.61:4444`，读取并发送 `REDIS_PASSWORD`。原文内联示例则是 `127.0.0.1:4444`；两种原值均保留，不能默认为同一环境
- [pwn.sh](https://github.com/hugo-syn/pwn/blob/22d0a4784e28ece8634a8f799c2c454379f170aa/pwn.sh) 将 `pwned` 写入 `/tmp/pwned`，随后把 `env` 输出追加进去。它也不是单纯屏幕回显，文件可能含敏感运行环境

研究中的 `BuildOptions` 使用 `--enable-helm --helm-command ./exfil.sh`。原文摘要列表另有 `--help-command` 拼写，不能据此改掉准确调用处的 `--helm-command`。内联 Go 片段是请求对象构造示例，不含完整客户端工程；需自行具备匹配 protobuf/gRPC 客户端环境。本篇不将它包装成可直接运行的一键 EXP。

## 结果解释与验证设计

上述 Perl 示例发送的是一个环境变量，不是交互式反向 shell；仅看到监听端收到字符串不能证明任意后续交互。另有固定文件写入载荷可提供不同的效果证据，但也带来敏感数据落盘和清理要求。

研究的 Redis 阶段需要额外访问缓存，并修改 manifest 与 git-ref 数据；自动应用又与 Auto Sync/手动同步及集群 RBAC 相关。授权实验必须把“内部接口可达”“脚本效果”“Redis可访问”“清单被应用”和“实际容器权限”分别记录。本文没有把缓存可改等同于必然获得宿主机 root，也不推荐把有凭据外传的载荷当作安全检测器。

## 修复与部署核验

固定 [chart 10.0.0 values.yaml](https://github.com/argoproj/argo-helm/blob/0f245abdcdec84b576fc14a25bb793a9282e2262/charts/argo-cd/values.yaml) 中 `global.networkPolicy.create: true`；对应 [repo-server networkpolicy.yaml](https://github.com/argoproj/argo-helm/blob/0f245abdcdec84b576fc14a25bb793a9282e2262/charts/argo-cd/templates/argocd-repo-server/networkpolicy.yaml) 在全局或组件开关为真时生成 Ingress 策略，将 repo-server 端口来源约束到指定 Argo 组件选择器。

维护者特别提醒：长期复制旧 values 文件的部署，升级后仍须检查全局开关。应检查最终渲染/安装的 NetworkPolicy、实际命名空间与选择器，并验证所用网络插件确实执行策略；仅存在 YAML 文件不能证明网络已隔离。

公开安全公告修复的是 chart 默认配置。本次其“Related CVE”链接返回 404，未由此制造 CVE 编号，也未把无法读取的另一公告当成代码已修复证据。完整 gRPC 客户端、Argo CD 全部依赖、Kustomize/Perl 运行时以及集群实际策略均未审计。

## 来源与保真

上述仓库完整五文件已静态阅读，存在明确的凭据外传和环境落盘功能，与原研究利用目的相符；不能仅凭这些功能断言作者恶意，也不能忽略其风险。未找到根级许可声明，故保留固定链接并原创归纳，没有复制完整研究或整套利用代码。
