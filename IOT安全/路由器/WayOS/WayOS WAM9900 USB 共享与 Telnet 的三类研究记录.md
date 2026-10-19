---
schema_version: "1"
id: "vw-mrxn-20261019-189"
title: "WayOS WAM9900 USB 共享与 Telnet 的三类研究记录"
product: "WayOS WAM9900；WAM/SDV 系列为作者外推范围"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "来源声称 21.10.09 及以前；未给各型号逐构建证据"
prerequisites: "Telnet 须启用且可达；USB 注入需管理登录并开启共享；CSRF 删除需已认证用户交互"
side_effects: "配置写入、文件下载/执行、反向连接及 USB 文件删除；Telnet 登录可带来管理权限"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/144"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/%E7%BB%B4%E7%9B%9Fwayos%E5%A4%9A%E6%AC%BE%E8%B7%AF%E7%94%B1%E7%BD%91%E5%85%B3%E8%AE%BE%E5%A4%87%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E.md"
---

# WayOS WAM9900 USB 共享与 Telnet 的三类研究记录

来源分别记录三类问题。其一是在 WAM9900 模拟固件中发现启动的 Telnet，并以 root/admin 登录；作者同时明确不是所有网关默认启动 Telnet。该主张不能扩展为全系列匿名后门。

其二是 USB 共享设置的 hname 输入，作者从 jhttd/jhttd_s 的用户参数追踪到 system 命令，并公开管理界面操作与命令替换内容。步骤需要登录并启用 USB 存储共享，命令包括下载到 /tmp/re、改执行权限和反连。HTTP 端点主要在截图，本文只整理已公开的手工路径，不补造完整请求。

其三是 usb_upload.htm 删除功能：作者先记录未认证删除失败，再让认证用户访问 CSRF 页面而删除文件。未认证页面可达不等于匿名删除，也不能据此宣称没有用户交互。完整 CSRF 表单未在文本公开，因此这部分只是来源风险记录而非即用 PoC。

全文检索未发现 WAM9900、usb_upload.htm 或该 USB 参数实体的既有文章；不代表新披露。作者称提交 CNVD，但未提供编号，本文不编造。各型号影响范围、现代浏览器条件和修复版本仍未确立。


## 逐项静态审计

- 只有管理界面步骤及命令内容以文字公开，HTTP/CSRF 完整请求主要在未审图中；本文未补造请求端点或表单。
- 原作者明确匿名删除失败；CSRF需认证用户访问，不能误标匿名任意文件删除。
- root/admin 登录只对来源启用 Telnet 的样本成立；不泛化所有型号、历史或最新固件。

## 核验、风险与来源

配置写入、文件下载/执行、反向连接及 USB 文件删除；Telnet 登录可带来管理权限。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：splash，https://www.iotsec-zone.com/article/144；发布时间线索：unknown。本次仓库收录时间不等于新漏洞披露时间

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/%E7%BB%B4%E7%9B%9Fwayos%E5%A4%9A%E6%AC%BE%E8%B7%AF%E7%94%B1%E7%BD%91%E5%85%B3%E8%AE%BE%E5%A4%87%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E.md
