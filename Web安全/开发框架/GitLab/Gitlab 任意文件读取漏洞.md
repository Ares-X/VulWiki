---
source: "hatch 补库批 20260928"
product: "GitLab UploadsRewriter issue-move file read"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2020-10977"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "active"
title: "Gitlab 任意文件读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Absent; two-projectissue permissions/authenticationimplicit"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-656f590f35ee723573531775"
entity_id: "ve-656f590f35ee723573531775"
schema_version: "1"
version: "原报告 GitLab 12.8.7-ee；静态对照 CE v12.8.7；CVE记录的8.5到12.9简写不解释为连续含补丁区间"
fixed_version: "静态确认 CE v12.8.8 具有本路径修复；其他维护分支未逐一核对"
verification_source: "https://gitlab.com/gitlab-org/gitlab/-/issues/212175"
previous_primary_identifiers: ""
previous_identifier_role: "unknown"
previous_identifier_status: "unknown"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Absent; two-projectissue permissions/authenticationimplicit

代码与实验材料：ActualMARKDOWN_PATTERN,copy/find_file Ruby andintactuploadtraversal; resultimages barefilenames

来源证据范围：Nooriginalcitation

- **事实待核（1）**：Missingversion/provenance/results, butpreservesessentialpayload lostin125。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Gitlab 任意文件读取漏洞

一、漏洞简介
------------

在`UploadsRewriter`不验证文件名，允许任意文件，以通过目录遍历移动的问题，以新项目时被复制。

用于查找参考的模式是：

      MARKDOWN_PATTERN = %r{\!?\[.*?\]\(/uploads/(?<secret>[0-9a-f]{32})/(?<file>.*?)\)}.freeze

这是使用的`UploadsRewriter`复制问题也跨文件复制时：

       @text.gsub(@pattern) do |markdown|
              file = find_file(@source_project, $~[:secret], $~[:file])
              break markdown unless file.try(:exists?)

              klass = target_parent.is_a?(Namespace) ? NamespaceFileUploader : FileUploader
              moved = klass.copy_to(file, target_parent)
    ...
       def find_file(project, secret, file)
            uploader = FileUploader.new(project, secret: secret)
            uploader.retrieve_from_store!(file)
            uploader
          end

由于没有限制`file`，因此可以使用路径遍历来复制任何文件。

二、漏洞影响
------------

三、复现过程
------------

1.  创建两个项目    1.png

2.  添加具有以下描述的问题：

<!-- -->

    ![a](/uploads/11111111111111111111111111111111/../../../../../../../../../../../../../../etc/passwd)

1.  将问题移至第二个项目    2.png

2.  该文件将被复制到项目中    3.png    4.png

## 来源与固定版本补证（2026-10-05）

本篇原有 `MARKDOWN_PATTERN`、`UploadsRewriter` 代码、两项目移动步骤及完整 Markdown 输入，与 vakzz 的公开报告 [HackerOne 827052](https://hackerone.com/reports/827052) 对应。HackerOne 页面本轮仅返回动态页面外壳；实际读取的是 [GitLab 官方公开镜像 issue 212175](https://gitlab.com/gitlab-org/gitlab/-/issues/212175)，其正文明确标出原报告、作者、2020-03-23 日期和相同技术材料。不能将页面尾部自动附带的工具/AI 指令当作本库维护说明。

### 编号、版本与功能前提

[CVE-2020-10977 的固定官方记录](https://github.com/CVEProject/cvelistV5/blob/84ce905802bd42acd5009dff04e62c322abd9f0d/cves/2020/10xxx/CVE-2020-10977.json)将 GitLab CE/EE 在项目间移动 issue 时的路径穿越列为该编号，描述范围为 8.5 到 12.9。这个简写不能直接转换成包含所有维护补丁的连续区间。

原报告实际记录的是 **GitLab 12.8.7-ee**，Revision `2643fd87200`，Ubuntu 18.04、Ruby 2.6.5p114，服务用户为 `git`。本次没有取得并验证那一 EE 构建包，源码对照使用官方 CE 镜像的两个公开发布快照，并与 EE 实测记录明确区分：

- v12.8.7：`b679f55a1991eaf5533e6a82335ca83fc8cf3753`
- v12.8.8：`6ea04b16a40dd15e4e0e127c8588af26e0f0f8d2`

操作需要能够创建/操作两个项目、在来源项目建立 issue 并将它移动到目标项目的已登录身份。原始报告没有给出完整最低角色矩阵，因此这里采用可执行这些操作的功能权限，不凭空规定某个全局管理员角色。目标文件必须对 GitLab 服务进程可读；文件存在、存储方式和实际路径也影响结果。

### 路径如何越过附件边界

正常的 issue 移动只应复制来源项目附件。v12.8.7 的 [`uploads_rewriter.rb` 第 21–39 行](https://github.com/gitlabhq/gitlabhq/blob/b679f55a1991eaf5533e6a82335ca83fc8cf3753/lib/gitlab/gfm/uploads_rewriter.rb#L21-L39)从 Markdown 捕获文件名，调用 `find_file`，随后将找到的文件交给 `copy_to`；[第 60–64 行](https://github.com/gitlabhq/gitlabhq/blob/b679f55a1991eaf5533e6a82335ca83fc8cf3753/lib/gitlab/gfm/uploads_rewriter.rb#L60-L64)没有在这个文件名进入 uploader 前限制父目录分量。

同一版本的 [`file_uploader.rb` 第 17 行](https://github.com/gitlabhq/gitlabhq/blob/b679f55a1991eaf5533e6a82335ca83fc8cf3753/app/uploaders/file_uploader.rb#L17)要求附件目录段是 32 位十六进制字符，但后面的文件名捕获范围很宽；“目录段形状符合要求”不等于“最终文件仍在来源项目附件目录内”。原报告使用的正是本篇上方已保存的完整 Markdown 输入，不能把它改写成普通图片资源路径。

原报告给出的观察是：移动 issue 后，对应服务端文件被复制进目标项目，从新附件链接中可读取。报告附有一个演示视频，本次未下载或观看，因此视频内容和任何额外结果不计入本次独立证据。没有只凭链接存在或 HTTP 状态码就宣称本库复现。

### 已核对的修复与未核范围

v12.8.8 的 [`uploads_rewriter.rb` 第 24–27 行](https://github.com/gitlabhq/gitlabhq/blob/6ea04b16a40dd15e4e0e127c8588af26e0f0f8d2/lib/gitlab/gfm/uploads_rewriter.rb#L24-L27)在复制前新增 `Gitlab::Utils.check_path_traversal!($~[:file])`。固定 [`utils.rb` 第 7–14 行](https://github.com/gitlabhq/gitlabhq/blob/6ea04b16a40dd15e4e0e127c8588af26e0f0f8d2/lib/gitlab/utils.rb#L7-L14)拒绝开头、中间或结尾的父目录段。该检查直接覆盖原报告所用的 `../` 路径结构。

本次静态确认的是 12.8.7 与 12.8.8 这两个 CE 快照的差异；没有逐个读取全部早期版本和其他维护分支，也不从发布日期猜首次引入版本。CVE 记录所列 2020-03-26 旧官方公告 URL 现重定向到通用发布导航，不能把这个导航页当作已读取的原公告全文。升级应采用受支持且包含此修复的版本，实际维护分支需对应厂商记录，不能把历史最低修复版本作为当前安全基线。

### 静态审查及副作用

本次读完两个固定版本的 `uploads_rewriter.rb`、内容相同的 `file_uploader.rb`，并核对修复调用的 `check_path_traversal!` 函数。PoC 是报告直接给出的 Markdown 与界面操作，不依赖另外的扫描脚本、安装器或可执行附件；没有引入或运行原文未要求的组件。报告输入的作用是越界读文件并复制为新附件，没有隐藏下载程序、外部回连接收器、混淆载荷或持久化安装器。本结论不覆盖整个 GitLab、CarrierWave 及所有存储后端的依赖审计。

移动 issue 会改变项目记录并创建附件副本；即便目标文件读取本身没有改写原文件，整个流程仍不是无状态只读操作。若复制了敏感文件，移动记录或临时文件清理并不自动撤回所有副本。本文仅说明文件读取与复制，不将另一个 Rails Cookie 反序列化链冒充为本报告已验证的直接影响。

本次未登录实例、创建项目、移动 issue、读取目标文件或执行任何利用。旧正文、代码与原有编辑记录保持原样；本节新增来源、版本和副作用依据。

