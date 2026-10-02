---
source: "hatch 补库批 20260928"
product: "PHP Screw/源码恢复"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "（一）Php screw加密与破解工具（php-screw-brute）"
prerequisites: "来源所述条件，未列明部分仍待核：未锁工具或扩展版本，要求多个文件同一密钥"
side_effects: "未执行；本文需注意的操作影响：后处理脚本可丢失未解密原件；遍历ext==.php即os.remove，没有检查对应plain存在和解密成功；备份不等于删除安全"
source_status: "unknown"
id: "vw-a2e2fb86314ebc6165a5ef63"
entity_id: "ve-a2e2fb86314ebc6165a5ef63"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未锁工具或扩展版本，要求多个文件同一密钥

代码与实验材料：仅外部爆破工具与后处理脚本，所有.php直接删除，即便没有解密成功plain对应文件

来源证据范围：StudyCat文章及镜像仓库，需归原作者

- **操作与副作用边界（1）**：后处理脚本可丢失未解密原件；依据：遍历ext==.php即os.remove，没有检查对应plain存在和解密成功；备份不等于删除安全。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：用法截图丢失；依据：使用方法只剩/media/rId23.png)残串，硬编码/root/Download/demo。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# （一）Php screw加密与破解工具（php-screw-brute）

> 项目地址

    https://github.com/ianxtianxt/php-screw-brute

> 此脚本可以恢复/爆破php screw使用的密钥。PHP
> Screw使用压缩文件的长度来确定（硬编码）密钥的起始索引。PHP
> Screw的工作原理是首先使用ZLIB（级别1）压缩PHP文件，然后按位取反，再与密钥进行异或。
> 因为ZLIB具有固定的头部并且不同文件的起始索引不同，所以可以恢复密钥的一部分，
> 其余字节可以爆破。 通常，你拥有的文件越多，恢复密钥的速度就越快。
> 当然，所有文件都必须使用相同的PHP Screw密钥进行加密。
> 如果你拥有的文件足够多，则可直接恢复密钥而不需要爆破。

下图是php文件经过php
screw加密后的一个样子，通过开头的"PM9SCREW"字符串得知使用了php
screw进行加密。Phpscrew加密与破解工具(php-screw-brute)/media/rId21.png)

### 使用方法

下图是使用方法，解密成功后，会在相同目录下生成以".plain"为后缀的同名文件。比如待解密的文件是"index.php"，则解密成功后生成"index.php.plain"文件。Phpscrew加密与破解工具(php-screw-brute)/media/rId23.png)

> 写了一个python脚本，用于筛选解密成功的php文件。

    #!/usr/bin/python
    # -*- coding: UTF-8 -*-
     
    import os
    import shutil
     
    def main():
        src = '/root/Download/demo'
        dst = src + '_backup'
        shutil.copytree(src,dst)    #备份
         
        for root,dirs,files in os.walk(src):
            for name in files:
                basename, ext = os.path.splitext(name)
                oldname = os.path.join(root,name)
                newname = os.path.join(root,basename)
                if ext == '.php':
                    os.remove(oldname)  #删除原来的加密的PHP文件
                if ext == '.plain':
                    os.rename(oldname,newname)  #重命名解密成功的文件 filename.php.plain => filename.php
         
        print('Good job')
     
    if __name__ == '__main__':
        main()

参考链接
--------

> https://www.cnblogs.com/StudyCat/p/11268399.html
