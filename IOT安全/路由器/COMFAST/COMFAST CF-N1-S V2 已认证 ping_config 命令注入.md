---
schema_version: "1"
id: "VW-20261019-MRXN-015"
title: "COMFAST CF-N1-S V2 已认证 ping_config 命令注入"
product: "COMFAST CF-N1-S V2"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "V2.6.0.1"
prerequisites: "登录取得COMFAST_SESSIONID；仿真需补sysinfo与首次引导状态"
side_effects: "反连192.168.0.4:9999、创建删除/tmp/f、写pinglog；仿真改rc.local、UCI、网络、防火墙并终止服务"
source: "常乐；PoC致谢bashis"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/534"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "COMFAST CF-N1-S-V2.6.0.1 路由器模拟与漏洞原理"
review_date: "2026-10-19"
---

# COMFAST CF-N1-S V2 已认证 ping_config 命令注入

## 输入流及实验条件

常乐的2026-04-07研究对应 `CF-N1-S-V2.6.0.1.bin`。`/usr/bin/webmgnt` 使用FastCGI；`/cgi-bin/mbox-config?method=SET&section=ping_config` 的 JSON `destination` 经 `sub_442E34` 拼入 ping 命令，再进入system。原文明确必须先登录，不是免认证漏洞。PoC致谢bashis，本次不据此宣称首次发现或猜配CVE。

来源先尝试用户态模拟，遇到sysinfo缺失、段错误和会话被首次引导流程清除，再补板型文件、启动ubusd/nginx/webmgnt并调整UCI状态。后续使用FirmAE通用MIPS大端环境，不是精确板级仿真。其自检通过`POST + method=GET`确认会话与FastCGI链路；普通GET失败不能直接证明漏洞或服务不存在。

## 公开示例与静态风险

原HTTP例目标 `127.0.0.1:8080`，Cookie `COMFAST_SESSIONID=0a000202-52550a000202-327b23c6`，反连到`192.168.0.4:9999`，实验登录为`admin/admin`。请求头将Content-Type写成`appliation/json`并固定Content-Length为114；保留为来源缺陷，不静默修报文。

完整可见启动脚本包含挂载宿主proc/sys/dev、修改配置、killall服务及rc.local持久启动改变；还有从实验主机`192.168.0.4:8000/s.tar.gz`获取文件系统的明示wget步骤。反连及FIFO清理是公开载荷行为，未见无关隐蔽外传或混淆。外部FirmAE、镜像、内核和一键脚本未递归审计，未安装运行。尚无已核的精确修复公告。

## 来源与审阅

- 作者：常乐；PoC致谢bashis；[完整原文](https://www.iotsec-zone.com/article/534)
- 汇编来源Mr-xn/Penetration_Testing_POC，固定提交`f33600e512f2ff654ec335102daf23b8a5218d24`，路径`iot/COMFAST CF-N1-S-V2.6.0.1 路由器模拟与漏洞原理.md`
- 原文授权范围未明确，本篇独立中文综合，不整篇转载代码图片；来源实验结果不升级为本库复现。未执行PoC、安装依赖、请求示例目标或修改设备。
- 属本周汇编新增的历史研究，不是本周新披露；未知构建/认证及具体缺口已明确记录。
