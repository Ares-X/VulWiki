---
schema_version: "1"
id: "VW-20261012-libheif-mixed-depth"
title: "libheif unci 混合色度位深堆越界写（GHSA-x8r2-mggj-j6wr）"
product: "libheif"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "GHSA-x8r2-mggj-j6wr"
identifier_status: "active"
version: ">=1.18.0 且 <=1.23.2"
fixed_version: "1.23.3"
prerequisites: "构建启用 WITH_UNCOMPRESSED_CODEC，应用解码不可信 unci 图像；WordPress 上传通常要求 upload_files 权限"
side_effects: "解码导致堆损坏和进程终止；特定部署可能进一步出现文件泄露或代码执行"
source_status: "recorded"
source_url: "https://github.com/strukturag/libheif/security/advisories/GHSA-x8r2-mggj-j6wr"
---

# libheif unci 混合色度位深堆越界写

[厂商公告](https://github.com/strukturag/libheif/security/advisories/GHSA-x8r2-mggj-j6wr)于 2026-09-01 发布，修复版本为 1.23.3；这是历史补录。2026-10-05 的 [Fortbridge 文章](https://fortbridge.co.uk/research/wordpress-libheif-rce/)是后续 WordPress 利用链分析，不能把它当作本缺陷首次披露。

混合交错解码器为 Cb、Cr 分别分配缓冲区，却曾复用首个色度分量的写入宽度。厂商的 Y8/Cb16/Cr8 样本可使较小平面发生越界写；等位深样本作为负对照。该路径不依赖其他图像编解码器。[固定补丁](https://github.com/strukturag/libheif/commit/9d3cd91d7b1c8c68deef6d06057ab956bcb0dfb9)为两个平面分别保存宽度与步长，并增加逐像素校验的回归测试。

[公开附件](https://github.com/user-attachments/files/31562904/submission-artifacts.zip)包含最小 Python 生成器、原始种子、正负样本和日志。生成器只用标准库读取指定种子、修改图像字段并写入指定输出，可能覆盖已有输出文件；没有联网、子进程、安装器或 workflow。附件 SHA-256：ed55a71e2fed70a6f0de71e705e18aba4ce1916bc63e175d6b1a55331517a3ea。

本次静态范围为完整生成器、附件清单与验证说明、完整修复 diff；没有运行或解码样本，也未审计全部库构建依赖。公告中的 WordPress 最终阶段依赖精确库布局、运行时地址和工作进程连续性；最小附件没有包含该武器化载荷。Fortbridge 的更大利用仓库未完成逐文件审计，本文不准入其一键链条，也不把 HTTP 503 当作 RCE 证明。公告未分配 CVE；摘要不沿用二手编号。本文原创归纳，链接完整材料而不复制未知许可代码。
