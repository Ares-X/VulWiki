---
schema_version: "1"
id: "VW-20261003-ytdlnis-intent-argument"
title: "YTDLnis Intent COMMAND 参数注入与 Python 运行时文件写入"
product: "YTDLnis"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "Sonar 声称 1.8.4 及以前受影响；本文静态对照补丁父提交 74438bb97272fb0fa5706ca97a14b72f52133a5b"
fixed_version: "1.8.4.1-beta（2025-06-10 发布）；修复提交 2433b3768ce6da6202d0ca110af61ec4ae0bf971"
prerequisites: "Android 安装受影响应用并完成运行时初始化；浏览器允许用户点击 Intent 链接并交给 ShareActivity；命中所用 Python 库路径；文件访问后果受已授予权限约束"
side_effects: "后台媒体下载、临时配置写入、覆盖 Python 标准库、后续进程执行；可能损坏应用、读写应用可访问文件及泄露保存的服务 Cookie"
source: "Sonar 漏洞研究；deniscerri/YTDLnis 官方源码、补丁及 release"
source_status: "recorded"
source_url: "https://www.sonarsource.com/blog/ytdlnis-argument-injection-rce/"
verification_source: "https://github.com/deniscerri/ytdlnis/commit/2433b3768ce6da6202d0ca110af61ec4ae0bf971"
---

# YTDLnis Intent 参数注入与运行时文件写入

## 核对与缺口

2026-10-03 核对 Sonar 原文的搜索可读正文、官方 release、补丁及其父提交源码。未安装 APK、下载依赖、调用 Intent 或运行 yt-dlp。原文公开的组合链接含 `"...payload..."`，该占位符不是本库新增，不能把它当成完整 RCE 载荷，也不推测补全。本文可用于数据流及修复审查，不代表已复现。

## 版本与权限

Sonar 声称 1.8.4 及以前受影响；官方 [1.8.4.1-beta release](https://github.com/deniscerri/ytdlnis/releases/tag/v1.8.4.1-beta) 于 2025-06-10 发布，明确说明因安全问题移除 Intent `COMMAND`。披露在 2026 年出现，不应把漏洞修复时间也改成 2026 年。

在补丁父提交，`app/build.gradle` 的 `minSdk` 为 24，应用依赖 `io.github.junkfood02.youtubedl-android:library:0.17.4`、`ffmpeg:0.17.2`、`aria2c:0.17.2`。[Manifest](https://github.com/deniscerri/ytdlnis/blob/74438bb97272fb0fa5706ca97a14b72f52133a5b/app/src/main/AndroidManifest.xml) 将 ShareActivity 导出，接受浏览器 VIEW 和媒体类型，并声明网络与外部存储权限。声明权限不等于设备已授予权限；成功执行代码仍在应用身份及实际授权范围内，不能写成 Android root 或任意其他应用私有目录均可读取。

## 数据流与公开证据

- [ShareActivity.kt](https://github.com/deniscerri/ytdlnis/blob/74438bb97272fb0fa5706ca97a14b72f52133a5b/app/src/main/java/com/deniscerri/ytdl/receiver/ShareActivity.kt)：读取外部 `BACKGROUND`、`COMMAND`。后台路径把后者拼入 `downloadItem.extraCommands` 后排队，不要求它来自应用内部可信界面。
- [YTDLPUtil.kt](https://github.com/deniscerri/ytdlnis/blob/74438bb97272fb0fa5706ca97a14b72f52133a5b/app/src/main/java/com/deniscerri/ytdl/util/extractors/YTDLPUtil.kt)：1386—1404 行把附加参数加入请求，创建缓存目录与配置文件，再把路径作为 `--config-locations` 传入。这是参数/配置注入，不必依赖 shell 元字符。
- [DownloadWorker.kt](https://github.com/deniscerri/ytdlnis/blob/74438bb97272fb0fa5706ca97a14b72f52133a5b/app/src/main/java/com/deniscerri/ytdl/work/DownloadWorker.kt)：随后调用 `YoutubeDL.getInstance().execute(...)`。落盘配置并没有消除外部输入的控制力。

Sonar 公开组合 Intent 如下，所有路径、大小写、转义和占位符保持原值。该文字资料含实际公网媒体地址；本库未访问它：

```text
intent://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4#Intent;scheme=https;package=com.deniscerri.ytdl;type=video/mp4;B.BACKGROUND=true;S.COMMAND=--print-to-file%20foobar%20/data/data/com.deniscerri.ytdl/no_backup/youtubedl-android/packages/python/usr/lib/python3.11/contextlib.py%20--output-na-placeholder%20"...payload...";end;
```

原作者利用 yt-dlp 的输出文件选项控制写入内容，目标是应用内部解包的 Python 标准库；后续再次启动 Python 时才转成执行。公开材料支持这一机制与作者声称的结果，不公开最后的 Python 载荷。[Sonar 原始研究](https://www.sonarsource.com/blog/ytdlnis-argument-injection-rce/)

## 静态安全审查与验证设计

示例不是只读检查：触发后可能立即下载媒体、创建配置、覆盖 `contextlib.py` 并影响后续任务。独立验证前需记录 APK、Python 与 yt-dlp 实际版本，确认沙箱内目标文件可写；不要把路径中的 `python3.11` 推广为所有版本。构建依赖清单只作静态阅读，没有安装、执行或证明其依赖树安全。

授权实验应使用可回滚的测试设备和测试数据，分别观察“外部 extra 进入下载项”“生成配置”“目标文件变化”“后续进程执行”四个阶段；仅看到文件变化不足以证明代码执行。修复版的关键对照是相同 Intent 不再把外部 `COMMAND` 传入下载项。测试完成应还原应用运行时与配置；曾使用真实登录数据则还需处理可能暴露的会话，不能只删除下载文件。

## 补丁与缓解

[2433b3768ce6da6202d0ca110af61ec4ae0bf971](https://github.com/deniscerri/ytdlnis/commit/2433b3768ce6da6202d0ca110af61ec4ae0bf971) 于 2025-05-24 删除读取 `COMMAND` 及向下载项传递它的代码。此处修复的是不可信跨应用入口，不代表 yt-dlp 本身必须禁止全部高级选项。优先升级包含补丁的版本；回归测试需涵盖自动化工作流，官方 release 已提示旧 `COMMAND` 自动化方式受影响。

## 来源

- [Sonar：Argument injection in YTDLnis via Android intent](https://www.sonarsource.com/blog/ytdlnis-argument-injection-rce/)：原始公开链、版本主张、披露时间线；署名 Paul Gerste 的索引信息尚未由本次原页头部独立复核
- [官方补丁](https://github.com/deniscerri/ytdlnis/commit/2433b3768ce6da6202d0ca110af61ec4ae0bf971)与[官方 release](https://github.com/deniscerri/ytdlnis/releases/tag/v1.8.4.1-beta)：支持实际代码变更、修复版本及发布时间
- 本文为原创中文综述；未给未经核实的 CVE 编号，未查看演示图片像素
