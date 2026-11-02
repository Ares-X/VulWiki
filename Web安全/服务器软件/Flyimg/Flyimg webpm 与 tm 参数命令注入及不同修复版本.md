---
schema_version: "1"
id: "VW-20261102-0101"
title: "Flyimg webpm 与 tm 参数命令注入：两个不同修复版本"
product: "Flyimg"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "公开研究环境为 1.12.2；本次固定官方 tag 1.12.2 核对，不据此推定所有旧分支"
fixed_version: "webpm：1.12.3；tm 与文件路径 shell 引用：1.12.11"
prerequisites: "可访问 /upload/ 路由并控制选项；未启用请求签名或能构造合法签名；相应图像/视频处理分支可达；webpm 分支还要求 cwebp 可执行"
side_effects: "启动服务端 shell 子进程、生成临时文件及日志；来源 webpm 示例另向工作目录写入标记文件；不是只读检查"
source: "YNsec安全实验室；gelusus/wxvl 归档；Flyimg 官方源码与发布记录"
source_status: "recorded"
source_url: "https://github.com/gelusus/wxvl/blob/0ca04cb9e2986ac80a58dfd004051d9eeebeb025/doc/2026-10/%E3%80%90%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%E3%80%91flyimg%201.12.2%20%E7%9A%84%E4%B8%A4%E4%B8%AARCE.md"
archive_commit: "0ca04cb9e2986ac80a58dfd004051d9eeebeb025"
---

# Flyimg webpm 与 tm 参数命令注入：两个不同修复版本

## 来源与时间

YNsec安全实验室的《flyimg 1.12.2 的两个RCE》归档标注发表于 **2026-10-23 09:10**，该时区未注明。它提供了请求和来源实验记录，本篇作原创中文核对整理，不整篇转载或翻译。发现并核对日期为 **2026-11-02**；不能将此日期当首次披露。归档页没有声明文章转载许可。

官方 `1.12.2` 对应固定提交 `830d2de34cbebf4ffc0ead33a4382a3d0e3b853d`，`composer.json` 版本与文章相符。没有把来源内部编号 VE-0001 / VE-0005 当成 CVE；本次未建立可引用的 CVE/GHSA 对应。

## 两个输入到命令行的路径

- **webpm**：`OptionsBag::parseOptions()` 将 URL 选项映射为 `webp-method`；旧 `ImageProcessor::calculateQuality()` 将该字符串直接拼到 `-define webp:method=` 后。要求输出为 WebP，且 `/usr/bin/cwebp` 可执行。输出路径虽然用了 `escapeshellarg()`，不能保护前面的选项值。
- **tm**：`InputImage` 把 data URI 等来源保存为临时文件，以 MIME 判定视频分支。`VideoProcessor::generateVideoSourceImage()` 只去掉时间值里的点和冒号，将其加入输出文件名。旧 `Command::addArgument()` 只引用第二个参数，单独传入的输出路径没有 shell 引用，最终由 `Processor::execute()` 的字符串 `proc_open()` 执行。

默认配置的 `security_key`、`security_iv` 为空。开启签名后，`SecurityHandler::checkSecurityHash()` 会先校验输入；不能将默认匿名入口泛化到所有部署。域名白名单也不能替代命令参数校验。

## 公开的具体触发材料

以下是上述归档中的视频路径请求，保留作者使用的文档地址与原始参数；它不是需要访问的外部目标：

```http
GET /upload/tm_%3Bid,w_100,h_100,c_1/data:video/mp4;base64,AAAAFGZ0eXBtcDQyAAAAAG1wNDI= HTTP/1.1
Host: 192.0.2.70:8080
```

来源报告该请求返回 500，错误输出含 `sh: /usr/bin/ffmpeg: No such file or directory` 和 `id: invalid option -- 'h'`。这里的证据是被注入程序自己的错误输出，不是“任意 500 等于成功”。后面的 ffmpeg 参数会成为被注入命令的参数，所以请求不保证得到正常的 `id` 输出。

来源还给出了 webpm 的反引号输入及标记文件结果。其图片 URL 是作者已有占位描述；本篇不补造图片来源。该分支的具体请求可在原始归档直接核对。

**来源推论的边界：** 原文称同一 tm 请求还能经 `ImageMetaInfo` 再执行一次。固定源码中 `Processor::execute()` 在子进程非零退出时立即抛出异常；不能仅凭这份 500 记录断言后续识别分支也到达。两处未引用路径的静态问题与“一次请求执行两次”的运行结果应分开。

## 修复对应关系

1. **webpm 已在 1.12.3 修复（2026-07-27）**：提交 `6e75b63080818ca501d4768fb95274a67448921b` 将值转整数、限定为 0–6，并对拼接值作 shell 引用。它不是 10 月首次修复，也不能据此声称 tm 同时修复。
2. **tm 与多处文件路径引用在 1.12.11 修复（2026-10-28）**：提交 `f9ee323e3b458d51b88e46676f9ff3367cbb0c05` 校验时间格式、引用视频输出路径及图像识别路径，并增加回归测试。来源 10 月 23 日的概括需结合这个后续发布记录。
3. 1.12.12 的发布说明是 cwebp 的 PNG 管道兼容修复，不将其另记为这两个问题的首次修复。部署还应确认实际镜像/代码版本，而不只看外部标签。

不把关闭签名、域名限制或降低服务账户权限写成已安装补丁。来源示例可能启动命令、创建缓存和日志，其他写标记变体还会改变工作目录。

## 静态反投毒核查边界

固定官方 1.12.2 的请求处理链、两个命令构造分支、Dockerfile、清理及 benchmark 脚本、Composer 清单/锁文件、五个工作流已经按相关范围核对。未发现这些已审文本中有与资料验证无关的凭据外传或混淆下载执行逻辑；这不是整个供应链的安全认证。

Dockerfile 会安装 Composer 依赖、修改目录权限并配置清理任务；`cleanup-tmp.sh` 会写 cron 并删除超过一小时的临时文件，属于产品维护行为但并非无副作用。benchmark 会下载测试图片、启动容器和发请求；工作流包含包安装、Docker 发布、CodeCov 上传和 SSH 部署，使用外部可变 action 引用。基础镜像二进制、传递依赖源码、所有测试图片与外部 action 实现不在本次审计范围，不建议把整套项目作为“已认证安全的检测器”运行。

## 参考来源

- [YNsec 研究的固定归档](https://github.com/gelusus/wxvl/blob/0ca04cb9e2986ac80a58dfd004051d9eeebeb025/doc/2026-10/%E3%80%90%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%E3%80%91flyimg%201.12.2%20%E7%9A%84%E4%B8%A4%E4%B8%AARCE.md)
- [Flyimg 1.12.2 固定源码](https://github.com/flyimg/flyimg/tree/830d2de34cbebf4ffc0ead33a4382a3d0e3b853d)
- [webpm 修复差异](https://github.com/flyimg/flyimg/commit/6e75b63080818ca501d4768fb95274a67448921b)
- [1.12.3 发布记录](https://github.com/flyimg/flyimg/releases/tag/1.12.3)
- [tm 与路径修复差异](https://github.com/flyimg/flyimg/commit/f9ee323e3b458d51b88e46676f9ff3367cbb0c05)
- [1.12.11 发布记录](https://github.com/flyimg/flyimg/releases/tag/1.12.11)

Flyimg 源码声明 AGPL-3.0；本篇以原创说明和链接为主，不分发整套源码或归档全文。

