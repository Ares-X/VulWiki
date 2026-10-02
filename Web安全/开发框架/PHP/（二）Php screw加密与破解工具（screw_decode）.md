---
source: "hatch 补库批 20260928"
product: "PHP Screw/已知密钥解码"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "（二）Php screw加密与破解工具（screw_decode）"
prerequisites: "来源所述条件，未列明部分仍待核：未锁screw_decode/扩展版本或发行版依赖"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-bed3121160a17c1968a27d69"
entity_id: "ve-bed3121160a17c1968a27d69"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未锁screw_decode/扩展版本或发行版依赖

代码与实验材料：clone/make/sudo decode，但缺cd目录；以sudo保证chdir与写权限无必要

来源证据范围：镜像仓库及StudyCat原文

- **适用与权限边界（1）**：无必要地要求高权限运行外部解码器；依据：sudo仅因chdir和创建文件，普通用户拥有目标目录即可，不应默认root。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：构建依赖与步骤不完整；依据：clone后直接make无cd，php-devel/zlibc-devel依发行版未明确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# （二）Php screw加密与破解工具（screw\_decode）

> 项目地址

    https://github.com/ianxtianxt/screw_decode

> 项目介绍

    前提需要有加密之后的文件，和加密的扩展库php_screw.so 打开screwdecode.c找到PM9SCREW,PM9SCREW_LEN和pm9screw_mycryptkey，3个可能被使用者修改，需要用IDA去查找然后替换掉。 pm9screw_mycryptkey是至关重要的，拿不到就解密不了。别的两个可以暴力尝试解决,其实就是读取掉头部n个字节尝试解密。

> 安装与使用方法

    安装：

    git clone https://github.com/ianxtianxt/screw_decode.git

    make

    如果以上出错，就看报错然后google,一个是依赖php-devel，一个是依赖zlibc-devel

    使用：

    sudo ./decode path

    说明: 结果保存在同目录，文件名字为原文件名字后面追加.decode, sudo 权限保证可以有chdir和创建文件权限。

参考链接
--------

> https://www.cnblogs.com/StudyCat/p/11268399.html
