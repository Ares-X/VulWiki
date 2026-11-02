# wxvl 第二波：最近提交日完整连续批次

2026-11-02，固定 wxvl 归档提交 0ca04cb9e2986ac80a58dfd004051d9eeebeb025。

原覆盖 452 篇，既读 41 篇；411 篇旧未读中 1 篇已在本轮 206 篇读过，因此真正待读 410 篇。本次按最近触及提交时间倒序、同时间完整路径倒序，完成第 1–10 篇，覆盖最新提交日 2026-10-25 的全部未读条目；还剩 400 篇，没有声称全读。文章署名日期可能是 10 月 24 日，提交触及时间不是披露日期。逐篇判读见 coverage-1-10.json。

本次合格新收录 0。Nextcloud CVE-2026-110447 与现主文去重；Brotli 与 PR37 主文去重；PHP2Shell 相关文章是加固工具/检测规则，不是新增 CVE-2026-115560。所有图片未查看，不以图片标题推测触发内容。原始 body 完整保留，样式去除的辅助 view 不用于复制代码或发布；原始围栏另行完整读取。没有执行任何来源代码、下载安装依赖或请求演示目标。

## hypnguyen1209 实现：不计 RCE，不作为可靠 OOB 检测

来源 https://github.com/hypnguyen1209/CVE-2026-111497/tree/9e17fab6690c0cf026bb7e45fb7e09a97a0295f1 ，固定提交时间 2026-10-22T08:53:44Z。递归树非截断，六文件全部阅读：Dockerfile、README、app/package.json、app/server.js、docker-compose.yml、exploit/poc.py。完整来源字节和提交/tree 响应见 hyp-evidence.json。

PoC 仅 Python 标准库，用四份 22/23 字节数据向指定主机 /api/ingest 发 POST。没有 ROP、命令、回连或内存读写结果验证。代码将任意 HTTP 200，或 HTTP 500 且 error 不等于 ERR__ERROR_FORMAT_BLOCK_SWITCH，计为漏洞；这不足以证明具体越界写，更不是 RCE。所有连接失败、404 等无信号分支均不增加 vuln，最终会打印 PATCHED，构成明确误判边界。README 以其他解码错误证明已 OOB 的推论没有内存证据支持。

源码未见与实验无关的凭据采集、隐藏外传/下载/持久化；不是安全认证。目标可由参数指定，实验应用绑定 0.0.0.0，compose 发布 9000:3000 并 restart unless-stopped；npm install 未锁完整依赖，浮动 node:22.23.3-slim 镜像、^5.1.0 Express，未审镜像/依赖源；错误输出被 Dockerfile 重定向。无单独 LICENSE，故只链接，不复制发布源码。必要副作用是畸形解码和可能服务异常，不能称为只读检测。

如父任务希望在现有 Brotli 主文补充一条纠误，可原创写：该固定实现仅比较 HTTP/解码错误码，缺少 RCE 链和足够 OOB 证据；网络无信号也可能输出 PATCHED，不得据其标题或终端标签增计 EXP 或宣布已修复。此为证据边界补充，不建议另建漏洞文章。
