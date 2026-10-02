---
source: "hatch 补库批 20260928"
title: "PHPYun 安装锁路径错误允许重装"
product: "PHPYun"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "部分4.2/4.3/4.5；以PHP5分析，PHP7未证"
prerequisites: "安装端点匿名声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/PhpYun/Phpyun%20v4.2%EF%BC%88%E9%83%A8%E5%88%86%EF%BC%89%204.3%204.5%20%E7%B3%BB%E7%BB%9F%E9%87%8D%E8%A3%85%E6%BC%8F%E6%B4%9E.md"
id: "vw-b475e037b22d1280c1f55106"
entity_id: "ve-b475e037b22d1280c1f55106"
schema_version: "1"
---

# PHPYun 安装锁路径错误允许重装

## 条目说明

- 对象与具体问题：PHPYun；安装锁路径错误允许重装
- 版本、配置及部署条件：部分4.2/4.3/4.5；以PHP5分析，PHP7未证
- 认证与权限前提：安装端点匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 创建data/phpyun.lock与检查install/data/phpyun.lock差异清晰，但关键源代码仅图片
- 多处图片指向5.0.1/3.1其他文章资源且尾巴重复路径，需核图内容不能当缺图
- 4.2最终版/4.2111等版本描述含混，保留已测构建号而非全部范围
- 重装覆盖数据副作用需警示；简介空白

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

经测试该漏洞影响从4.3到 4.5
所有版本，4.2部分版本受影响，4.2最终版本不受影响。具体情况请自行测试。

三、复现过程
------------

#### 漏洞分析

看到install 文件夹里的index.php，这里分php5,php7两种情况进行调用安装。

以php5为例。

文件 根目录/install/php5/install.php 代码中：

先判断了是否存在lock文件，存在即退出安装。

![](./.resource/Phpyunv5.0.1后台getshell/media/rId25.png)4.34.5系统重装漏洞/media/rId25.png)

其中S\_ROOT这个常量是在前面index.php文件中定义的。

![](./.resource/Phpyunv5.0.1后台getshell/media/rId26.png)4.34.5系统重装漏洞/media/rId26.png)

取得是当前文件的绝对路径。拼接起来，检测的lock文件位置应该是
根目录/install/data/phpyun.lock。

这里没什么问题。

按照正常安装走完，看到最后一步

![](./.resource/Phpyunv3.1xml注入漏洞/media/rId27.png)4.34.5系统重装漏洞/media/rId27.png)

创建lock文件，这里用的是相对路径。install.php是被index.php
用require的模式调用的。

取得路径应该是 根目录/install/，按照上图的路径创造的lock文件应该是放至于
根目录/data/phpyun.lock。

**创建的lock文件路径是 根目录/data/phpyun.lock，检测的路径却是
根目录/install/data/phpyun.lock**

那么一个重装的安全隐患就埋下了。

当用户安装完成之后，是可以被无限重装的，因为这个路径错误问题。

以本地phpyun4.3 已经安装完成系统为例，是可以被重装的。

![](./.resource/Phpyunv5.0.1后台getshell/media/rId28.png)4.34.5系统重装漏洞/media/rId28.png)

最新版phpyun 4.5这里的代码和4.3是一样的。

![](./.resource/Phpyunv5.0.1后台getshell/media/rId29.png)4.34.5系统重装漏洞/media/rId29.png)

phpyun 4.2 版本处理逻辑不一样，这个版本不受影响。

![](./.resource/Phpyunv4.2部分4.34.5系统重装漏洞/media/rId30.png)4.34.5系统重装漏洞/media/rId30.png)

![](./.resource/Phpyunv4.2部分4.34.5系统重装漏洞/media/rId31.png)4.34.5系统重装漏洞/media/rId31.png)

**经测试phpyun 4.2某些版本依旧是受影响的。**

#### 版本测试

网上一些系统：

##### 官方测试站，版本phpyun 4.2111：

![](./.resource/Phpyunv4.2部分4.34.5系统重装漏洞/media/rId34.png)4.34.5系统重装漏洞/media/rId34.png)

##### 某招聘网，版本phpyun 4.3

![](./.resource/Phpyunv4.2部分4.34.5系统重装漏洞/media/rId36.png)4.34.5系统重装漏洞/media/rId36.png)

参考链接
--------

> <https://www.cnblogs.com/r00tuser/p/8533517.html>
