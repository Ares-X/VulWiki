---
schema_version: "1"
id: "VW-20261019-XXL"
title: "XXL-JOB 任务操作与日志接口的对象级权限检查分析"
product: "XXL-JOB"
identifier_status: "unknown"
version: "固定提交 685c903aaeec9544339902501402d4a242c5f562；删除接口来源声称至3.1.1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
prerequisites: "已登录普通账号及有效任务/日志 ID，接口可达"
side_effects: "读取日志、启停或删除任务、终止执行及删除关联日志"
source: "原作者公开请求/源码与项目或 CNA 记录"
source_url: "https://github.com/xuxueli/xxl-job/issues/3773"
source_status: "recorded"
---

# XXL-JOB 任务操作与日志接口的对象级权限检查分析

## 范围与待核事项
本文依据 wxvl 2026-10-13 归档、上游公开 issue、固定源码与补丁整理。需要已登录普通账号及有效任务/日志 ID，不能称为完全未认证访问。上游 issue 3773 对删除接口声称影响至 3.1.1；其他接口的全部发行版本边界未逐版本建立。3.2.0 发布说明明确记载任务操作和日志管理 IDOR 修复，但不能仅凭一句发布说明确定所有日志接口永久完成修复。

## 技术证据
固定源码 685c903aaeec9544339902501402d4a242c5f562 的 JobLogController 中，`logDetailCat(logId, fromLineNum)` 从日志 ID 加载记录后，直接以其 executorAddress 向执行器取日志，未执行本方法的 JobGroup 检查。`logKill(id)` 从日志记录取得任务，检查任务及触发状态后调用执行器 kill，同样未做该对象的组权限检查。

对于 jobinfo 的 remove、start、stop，公开补丁 739d6a2483ce8f6c2a824098fbddb0f90087fba6 把登录用户从 Controller 传到 Service，并在服务实现载入任务后通过 hasPermission 检查其 JobGroup，说明缺口是对象授权而非登录机制不存在。

来源所展示请求形式为 `/xxl-job-admin/joblog/logDetailCat?logId=1225&fromLineNum=1`，以及带 id 参数的 `/joblog/logKill`、`/jobinfo/remove`、`/jobinfo/start`、`/jobinfo/stop`。归档中的 HTTP 头有粘连，本文不将它修造成声称来自原文的可直接复制报文。公开 issue 3773 独立给出了 POST `/xxl-job-admin/jobinfo/remove`、表单 `id=5` 及已登录会话示例，作者声称数据库记录被删除；本库没有复现或逐图检查，不能升级为本库验证结论。

## 补丁状态的重要区别
PR 3792 是已关闭且未合并的提交提案，它的三个修改文件只涉及 remove、start、stop；不能称为官方已合并修复，也不覆盖 logDetailCat 与 logKill。项目所有者在 issue 3773 于 2025-08-23 表示已优化代码、随下一版本发布；后续 3.2.0 发布说明记载 IDOR 修复。3.4.2 又记载 RollingLog 权限完善，说明日志修复范围需独立审视。

## 副作用与去重
日志读取可能暴露业务日志，终止及启停接口改变任务运行状态，删除接口还会删任务及关联日志，均不能作为无害只读检测。维护仅静态读码和对照来源，不运行请求或构建产品，无安装依赖。

完整索引和正文检索发现已有 CVE-2022-43183 文章也使用 logDetailCat，但其核心是可控 executorAddress 导致 SSRF 与执行器 token 泄露，当前固定源码是 logId 对象授权问题，两者不能仅凭端点相同合并。本稿不借用该 CVE，保留独立分析。

## 来源
- 固定 JobLogController：https://github.com/xuxueli/xxl-job/blob/685c903aaeec9544339902501402d4a242c5f562/xxl-job-admin/src/main/java/com/xxl/job/admin/controller/JobLogController.java
- 提案补丁：https://github.com/xuxueli/xxl-job/commit/739d6a2483ce8f6c2a824098fbddb0f90087fba6
- PR 状态：https://github.com/xuxueli/xxl-job/pull/3792
- 原报告：https://github.com/xuxueli/xxl-job/issues/3773
- 维护者说明：https://github.com/xuxueli/xxl-job/issues/3773#issuecomment-3217312938
- 发行说明：https://github.com/xuxueli/xxl-job/releases/tag/3.2.0
- 后续日志权限说明：https://github.com/xuxueli/xxl-job/releases/tag/3.4.2
- 归档：gelusus/wxvl，59b51e8d9a3ffe28c04f535e457a178c89288f0d，doc/2026-10/XXL-JOB 越权漏洞分析.md

中文原创综述；待核为逐接口发行边界，而非“未复现”。

## 静态审阅范围
已读归档全部五个 HTTP 请求及三个 Java 示例：请求均指向来源给定的本地示例 Host，包含已登录 Cookie，没有另藏第三方回连；示例任务分别演示循环/中断、业务日志和时间输出，其中订单示意代码明确含支付调用与状态更新，不能执行。已读固定提交的完整 JobLogController、完整三个文件补丁、根 pom.xml、xxl-job-admin/pom.xml 和唯一工作流 `.github/workflows/maven.yml`。根 POM 是 3.1.2-SNAPSHOT、Java17，发布 profile 有源码/Javadoc 打包、GPG 签名及 Maven Central 发布插件；admin 模块使用 Spring Boot、MyBatis、MySQL 等依赖并做 repackage。工作流使用 checkout@v4、setup-java@v4 后执行 mvn package，动作以标签引用而非 SHA。树中未见 gitmodules。这是与本分析对应的静态入口检查，不是所有 Maven 传递依赖、执行器、历史提交或二进制的全面审计；没有下载依赖或启动工作流。本文只有中文机制归纳和固定源链接，不分发可执行工具包。
