---
source: "hatch 补库批 20260928"
product: "GitLab UploadsRewriter issue-move file read"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Gitlab 任意文件读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Absent; two-projectissue permissions/authenticationimplicit"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-656f590f35ee723573531775"
entity_id: "ve-656f590f35ee723573531775"
schema_version: "1"
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
