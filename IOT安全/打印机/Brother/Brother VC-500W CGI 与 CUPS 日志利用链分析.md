---
schema_version: "1"
id: "VW-20261019-MRXN-012"
title: "Brother VC-500W CGI 与 CUPS 日志利用链分析"
product: "Brother VC-500W"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "unknown；正文报告CUPS 1.6.1与BusyBox 1.19.4，不能替代固件版号"
prerequisites: "能访问设备Web与CUPS631；postdata无认证是来源代码分析结论"
side_effects: "改管理员密码、读取配置、写启动脚本、修改文件权限，可能无法启动并需UART恢复"
source: "Domi（sdomi）；IOTsec-Zone译转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/472"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "Brother VC-500W 打印机"
review_date: "2026-10-19"
referenced_identifiers: "CVE-2012-5519"
---

# Brother VC-500W CGI 与 CUPS 日志利用链分析

## 可定位的技术主体

IOTsec-Zone 译转载研究以 Brother VC-500W 为对象。来源对 `/cgi-bin/certmgr/generate_request` 的 CSR 字段，尤其 `L`，记录命令替换进入生成逻辑；通过下载 `generated.csr` 并解析查看输出。另一条链在 `/cgi-bin/postdata`：解析 POST 参数后，`passwordStr` 分支直接写密码配置，来源认为后端未校验会话。公开改密例值为 `uwu`，配置 XML 展示值为 `meow`，它们是不同示例，不能相互替换。

CUPS 部分将 PageLog 指向文件取回内容，并尝试通过 ErrorLog 向 `/etc/init.d/S91zink` 追加启动 sshd 的内容。作者记录了失败、重启后无法启动、拆机 UART 恢复，最终发现日志操作改变 init 文件权限。所谓“文件读取”并非无副作用；未截断文件也不等于安全。

## 证据与许可限制

归档提到该 CUPS 方法常被误归于 CVE-2012-5519，因此该编号仅作背景。固件确切版号、厂商修复范围未核实，不能泛化至所有 Brother 产品。找到的原作者页面为 https://sdomi.pl/weblog/20-pwning-a-labelmaker/ ，但本次读取不可用；主要技术依据是完整译转载归档，原作者Domi由[Linus Groh的同期亲历文章](https://linus.dev/posts/kiesel-devlog-9/)明确署名并链接；因此作者身份已定位，尚未读到的是原站正文，二者不能混为一项缺口。

CUPS curl脚本含断行、控制字符与缺失then，不能声称可直接执行。可见代码有明示命令执行、文件获取、改密和启动持久化，无证据支持把这些称为只读；未见另藏无关下载或混淆加载器。zinkpwn、固件CDN和外部工具未递归审计或运行，公开原有`[snip]`占位不补写。

## 来源与审阅

- 作者：Domi（sdomi）；IOTsec-Zone译转载；[完整原文](https://www.iotsec-zone.com/article/472)
- 汇编来源Mr-xn/Penetration_Testing_POC，固定提交`f33600e512f2ff654ec335102daf23b8a5218d24`，路径`iot/Brother VC-500W 打印机.md`
- 原文授权范围未明确，本篇独立中文综合，不整篇转载代码图片；来源实验结果不升级为本库复现。未执行PoC、安装依赖、请求示例目标或修改设备。
- 属本周汇编新增的历史研究，不是本周新披露；未知构建/认证及具体缺口已明确记录。
- [CNA CVE-2012-5519](https://www.cve.org/CVERecord?id=CVE-2012-5519)
