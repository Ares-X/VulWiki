---
schema_version: "1"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
identifier_status: "active"
source_status: "recorded"
discovered_at: "2026-11-02"
reviewed_at: "2026-11-02"
id: "VW-20261102-IMGPROXY-ICO"
title: "imgproxy ICO 小缓冲区重建 BMP 头越界（GHSA-494m-4556-wf5p）"
product: "imgproxy ICO loader"
primary_identifiers: "GHSA-494m-4556-wf5p"
referenced_identifiers: "GHSA-hff9-5pqw-6w9f"
source: "imgproxy / DarthSim；haileyok"
source_url: "https://github.com/imgproxy/imgproxy/security/advisories/GHSA-494m-4556-wf5p"
version: "维护者公告>=3.3.0、<=4.0.16；公开样本测试v4.0.15"
fixed_version: ">=4.0.17"
prerequisites: "受影响ICO loader实际处理攻击者提供的畸形ICO；公告使用允许本地图片的v4.0.15实验入口，不代表所有部署必须启用本地文件来源"
side_effects: "生成器写本地图片；触发请求可破坏堆并中止worker、返回错误及影响服务可用性"
disclosed_at: "2026-10-06"
database_published_at: "2026-10-30"
fixed_release_date: "2026-09-30"
---

# imgproxy ICO 小缓冲区重建 BMP 头越界（GHSA-494m-4556-wf5p）

[维护者公告](https://github.com/imgproxy/imgproxy/security/advisories/GHSA-494m-4556-wf5p) 提供 23 字节 ICO 的完整 Python 生成器、SHA256、请求与正常图片对照。畸形图片声明的内容过短，重建 BMP 头时仍访问固定字段，可能破坏相邻堆块并中止 worker。示例使用 v4.0.15 并显式开启本地图片来源；这是材料的测试入口，不能由此声称线上必须开启本地文件才受影响，也不能把它当作任意文件读取漏洞。

公告声明影响 >=3.3.0、<=4.0.16，修复 >=4.0.17；已展示影响为 worker 崩溃，不写成已验证 RCE。该条不能与修复于 4.0.16 的 GHSA-hff9-5pqw-6w9f 整数溢出混为一谈。

[补丁 39fd9e844a8a46084161502e993d5a3c16ccf28d](https://github.com/imgproxy/imgproxy/commit/39fd9e844a8a46084161502e993d5a3c16ccf28d) 把最小长度校验从包含外加文件头的 full_data_size 改为真实图像 data_size，并补回归测试。此差异也说明单独使用 1 字节样本不能证明所有后续旧版本的剩余边界都相同。[4.0.17 发布](https://github.com/imgproxy/imgproxy/releases/tag/v4.0.17) 日期为 2026-09-30，原公告为 10 月 6 日，GitHub Reviewed 于 10 月 30 日入库；这是近期检索补漏，不是新发现的 10 月底零日。

已读完整公告生成器与请求、固定补丁和 vips/icoload.c。生成器仅使用 Python struct/hashlib 并写本地图片，无安装脚本、远程下载、工作流或额外依赖；请求会使目标 worker 崩溃，不能当无副作用探测。没有执行生成器或请求，也未运行仓库构建。上游源码 Apache-2.0，公告未另见整篇许可，采用原创综述并链接原始材料。

