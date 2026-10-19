---
schema_version: "1"
id: "vw-mrxn-20261019-166"
title: "H3C Magic R100 ajaxmsg 超长输入的拒绝服务记录"
product: "H3C Magic R100"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "来源样本 R100V100R005.bin；原文 <=MagciR100V200R00 拼写/边界未核"
prerequisites: "/AJAX/ajaxget 可达；来源声称该入口无需认证"
side_effects: "Web 服务重启、整机不可用；作者称断电恢复，无效时可能要重置并丢失配置"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/122"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/%E6%96%B0%E5%8D%8E%E4%B8%89magicR100%E5%AD%98%E5%9C%A8DOS%E6%94%BB%E5%87%BB%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90.md"
---

# H3C Magic R100 ajaxmsg 超长输入的拒绝服务记录

ReStr0 在 2022 年研究中记录 POST /AJAX/ajaxget 与 ajaxmsg 参数。正常 aspGetGroup(Wan1BasicState) 返回状态字段，作者随后改用超过十万字符 a，声称服务或设备崩溃。这里已有公开具体操作步骤，不能因为维护者没有复现就当作未处理。

但原始完整报文的 body 写的是“ajaxmsg=此处省略”，且不同长度的现象分别为 Web 服务重启与整机崩溃。因此不能称现有报文是可原样发送的完整 PoC，也不凭 Content-Length=78430 生成省略的正文。没有崩溃栈或汇编，不能将作者的“溢出”猜测升级为确定内存破坏机理。

现有两篇同产品文档实际讨论读取凭据及管理密码/Wi-Fi 密码复用后开放 Telnet，关键读取函数仍未公开；与本篇超长 ajaxmsg DoS 不同。相同端点不构成自动去重，更不能用原作者失败的 RCE 尝试证明直接 RCE。厂商固定版本与 V200R00 边界未确立，保留来源所述的恢复方式和不确定性。


## 逐项静态审计

- 原 body 只有 ajaxmsg=此处省略，Content-Length=78430 不是实际保存的请求字节数；不生成缺失内容。
- 10万以上字符与几十万字符描述的是不同不稳定现象；无法仅由状态/截图判定栈溢出。
- 源文字明确 RCE 参数不可控的失败尝试；不把同产品旧 RCE 标题用作本条影响升级证据。

## 核验、风险与来源

Web 服务重启、整机不可用；作者称断电恢复，无效时可能要重置并丢失配置。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：ReStr0，https://www.iotsec-zone.com/article/122；发布时间线索：2022-03-31实验日志。本次仓库收录时间不等于新漏洞披露时间

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/%E6%96%B0%E5%8D%8E%E4%B8%89magicR100%E5%AD%98%E5%9C%A8DOS%E6%94%BB%E5%87%BB%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90.md
