# 2026-10-26 社区与研究来源覆盖

只读来源审阅；窗口保守重叠2026-10-18至检查时刻2026-10-26约00:31 UTC。未执行PoC、扫描器、安装或载荷；未修改仓库，未脱敏。先读当前AGENTS.md（blob8c2fb1ab4dc6e4f004c1a110aa2debe697bbce96）、CONTRIBUTING.md（747a92b0780da6d69815d57fc5dae2d5143b3f97）、docs/CONTENT-SCHEMA.md（62f743c6d919242b8a55d64cdc26f89eaef50531）及docs/reviews/20261019-weekly/README.md（df031101a7b0532d27b855cae44a6cf0b2b6d10d）。主分支检索指向dcf0607b87f46653d43aa0420de577f440d5aaae。根目录CONTENT-SCHEMA.md最初404，随后按AGENTS指定正确docs路径读取，不作为来源失败。

| 必查来源 | 本轮实际范围、增量与限制 | 纠错/撤回 |
|---|---|---|
| https://wiki.0-sec.org/ | exact首页返回tool not accessible；没有正文覆盖，不能称无更新。Oct19同样访问失败。 | 未能检查 |
| https://xz.aliyun.com/ | 重定向/news，索引可读但不含发布日期。热门四候选92977 smol-toml、92968 ONLYOFFICE、92923 glibc、92916 Go idna；92977 Cache miss，后三篇仅挑战内容，非技术正文。未执行挑战或绕过；RSS点击Internal Error。不能凭标题录入。 | 未能检查正文；不能称撤回 |
| https://tttang.com/ | exact首页Timeout fetching（400）；正文未覆盖。补充公开搜索仅旧用户页结果，无可靠窗口增量。不是Oct19历史502的继续沿用，当前实际是timeout。 | 未能检查 |
| https://paper.seebug.org/ | exact首页tool not accessible；补充公开检索没有可靠窗口结果。没有完成正文覆盖。 | 未能检查 |
| https://www.anquanke.com/ | 首页最新可见10月22日；完整阅读316272（10/22金融机构事件）、316257（10/20 LiteLLM）、316251和316248（10/19 AI事件）。前三个事件稿与316248未提供本任务所需具体漏洞触发材料，不作新增漏洞正文。10/19冷柜条目点击Internal Error，未读正文。额外热门316025为8/27 Redis旧新闻，不算窗口新增。 | LiteLLM版本概括需纠正，见独立补充；未见明确撤回，但不保证所有旧文静默变化已覆盖 |
| https://y4er.com/ | 当日可见首页最新2023-10-26，与Oct19可见日期相同；RSS点击Internal Error。不能证明所有旧文无静默修订。 | 未检测到公开撤回；未全读历史 |
| https://portswigger.net/research | 当日可读研究索引，最新2026-10-06，与Oct19相同；RSS点击Internal Error。未全量重读旧文。 | 未检测到索引撤回，静默修订未核全 |
| https://labs.watchtowr.com/ | 当日可读原研究索引，最新2026-10-09 PaperCut，与Oct19相同；不是搜索新闻替代。未全量重读旧文。 | 未检测到索引撤回，静默修订未核全 |
| 公开X/Twitter | https://x.com/watchtowrcyber 和 https://x.com/PortSwiggerRes 均403。公开搜索按账户与10/18—10/27日期、PoC等查询，没有可核对的当周帖子；只作为线索途径，绝不宣称全量feed或无更新。 | 无法全量核对删帖/撤回 |

先知候选精确地址：
- https://xz.aliyun.com/news/92977
- https://xz.aliyun.com/news/92968
- https://xz.aliyun.com/news/92923
- https://xz.aliyun.com/news/92916

安全客正文地址：
- https://www.anquanke.com/post/id/316272
- https://www.anquanke.com/post/id/316257
- https://www.anquanke.com/post/id/316251
- https://www.anquanke.com/post/id/316248
- https://www.anquanke.com/post/id/316025

## 处置与可用证据

1. LiteLLM 59823：现库数字检索只出现无关哈希；全库复核已补充当前全文精确检索确认缺失。可新增原创整理，草稿CVE-2026-59823-draft.md。原文10/13不在本周首发窗口，但10/20社区稿使历史漏项进入本轮。具体请求原图已下载并用view_image实际查看，非凭文件名推测。图片原字节未编辑，15435字节、570×340、SHA256369e47acf17da21cd509d03654aaf498e0bb4137149cbcc6d6e707a8e85feaed。
2. LiteLLM 35029：已有两篇历史新闻稿，不制造重复实体；CVE-2026-35029-appendix.md供追加证据和修复版本边界，历史原文保持。
3. 原作者页面归属Check Point Research，未显示可确定的个人署名；不虚构个人作者。页面all rights reserved；草稿原创归纳，不批量复制正文/代码。软件固定LICENSE为非enterprise MIT，不能以此宣称CPR图文同属MIT。
4. 厂商59823公告8/26、1.83.9版本4/17、补丁提交4/16分别记录；CVE API https://cveawg.mitre.org/api/cve/CVE-2026-59823 本次tool not accessible，未以此声称直接读到CNA原JSON。GitHub Advisory Database显示NVD 9/16，但精确CVE发布时间仍建议后续使用原CNA记录补核。
5. 原作者请求与原文已静态阅读，展示内容未见与PoC目的无关的外传、破坏、混淆和持久化。SSRF出网/凭据回传及35029配置修改/远程模块执行属于明确副作用。没有绑定的独立PoC仓库，故没有可声称完成的独立安装/依赖/工作流审计；LiteLLM整个产品仓库、依赖、容器与二进制未审计，不作安全背书。

## 固定代码与核对范围

- 补丁：https://github.com/BerriAI/litellm/commit/47214be317f45a2d2ac08258362e0481411eb427 （committer2026-04-16T01:38:12Z）。API列6文件；全文级获取不等于全部代码审计，本轮只审阅auth_utils.py相关补丁/函数与补丁前route_llm_request.py全文。
- 修复文件blob64766bbaaddc315b680da8e3ec03b0e986c7e98c；is_request_body_safe增加user_config，同时保留显式客户端授权例外。没有把修复说成无条件拒绝。
- 补丁前路由固定parent93faf321df159b1ef65a98cc29a70958a96d184a，文件blobf1590b16c24e83557f839cfcb2797367b5b5415c。原研究1.77.7的行号与该提交并非完全同一源码版本，不强行对应行号。
- LICENSE blob3bfef5bae9b48c334acf426d5b7f21bc1913aab9，固定同一修复提交读取。

本表对每个必查来源分别保留失败、增量、纠错与撤回边界；不推进“全部来源成功检查”检查点。
