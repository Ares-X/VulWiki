# wxvl 第16篇 CVE-2026-49176 BOF：不作为新漏洞收录

2026-11-02读取该篇全文；它是10月27日介绍既有777erp/CVE-2026-49176_BOF工具的短文，非本周新漏洞披露。

固定仓库最新head为e724810b1c0f0da6ede8c5f85d2c80ee331aba53，提交日期2026-07-29T06:59:21Z。完整tree13项、truncated=false，11文件；README完整读取。README明确其与DavidCarliez/CVE-2026-49176_LPE_POC同根因，不同的是BOF投递和取得SYSTEM后的进程启动。

当前master104c9204的`Web安全/其他软件/杂项/CVE-2026-49176 深度解析：Windows WalletService 本地提权链.md`第5.6节已经描述同一7月29日的BOF封装、Documents重定向、服务触发及交互式SYSTEM命令；参考区直接包含同一777erp仓库与原始DavidCarliez研究。新转载没有提供比这两条原始来源更多的研究或版本资料。因此按来源链去重，不因同CVE单独判重，不删除既有文章。

静态审阅范围仅短文、完整仓库路径/文件类型与README、现有对应章节及参考链接，不声称11个源码文件全部审核。该候选不拟收录新代码，未继续构建/执行/安装或反向修改现有文章。README声明改变Documents、文件/数据库写入、令牌访问与临时服务，stage目录不自动删除；这些不是只读检测，也不据此判断作者恶意。

来源：https://github.com/777erp/CVE-2026-49176_BOF/tree/e724810b1c0f0da6ede8c5f85d2c80ee331aba53
