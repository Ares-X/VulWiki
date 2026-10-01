# VulWiki

> 中文漏洞知识库：按产品、CVE 和指纹，快速查找漏洞原理与公开复现资料。

[![在线 Wiki](https://img.shields.io/badge/Online-Wiki-3f9e62)](https://ares-x.com/wiki/) [![Markdown](https://img.shields.io/badge/Format-Markdown-49505a)](#本地阅读与检索) [![最近提交](https://img.shields.io/github/last-commit/Ares-X/VulWiki/master?label=updated&color=3f9e62)](https://github.com/Ares-X/VulWiki/commits/master/)

**[在线阅读](https://ares-x.com/wiki/) · [产品索引](INDEX.md) · [CVE 索引](INDEX-CVE.md) · [指纹索引](INDEX-FOFA.md) · [反馈与纠错](https://github.com/Ares-X/VulWiki/issues)**

## 简介

VulWiki 整理 Web 应用、中间件、网络设备与系统漏洞的中文分析和复现资料。文章以本地 Markdown 保存，可以直接在 GitHub 阅读、克隆到本地检索，也可以通过在线 Wiki 按分类浏览和搜索。

**收录标准**：描述清楚漏洞原理或影响，并提供复现步骤、PoC、EXP 或验证方法；篇幅长短不是门槛。纯预警、无利用细节的条目不收。历史批量导入内容仍在按此标准复核，收录不代表已在本地验证可利用。

## 快速查询

| 想查什么 | GitHub 入口 | 在线入口 |
|---|---|---|
| 产品、组件与分类 | [产品索引](INDEX.md) | [按产品浏览](https://ares-x.com/wiki/#/./VulWiki/INDEX) |
| CVE 编号与年份 | [CVE 索引](INDEX-CVE.md) | [按 CVE 查询](https://ares-x.com/wiki/#/./VulWiki/INDEX-CVE) |
| 网络测绘指纹 | [指纹索引](INDEX-FOFA.md) | [按指纹查询](https://ares-x.com/wiki/#/./VulWiki/INDEX-FOFA) |

在线 Wiki 支持分类逐级展开，默认搜索标题、产品、CVE、版本和指纹；需要搜索正文时切换到“全文”，首次使用会按需加载正文索引。按 `Ctrl / Cmd + K` 可聚焦搜索。

CVE 索引与文章的主 CVE 字段仍有待校正项，正文引用的历史 CVE 不等于该文章的主漏洞。指纹使用前也需核对测绘平台、语法和适用范围。

## 内容范围

以下为 **2026-10-01 文件快照**，统计三大正文目录中的 Markdown，包含产品内 README，不包含根目录概览和查询索引。文件数不等于独立漏洞数或已验证漏洞数。

| 分类 | 内容 Markdown | 主要内容 |
|---|---:|---|
| Web安全 | 5157 | Web 应用、中间件、开发框架、网络与安全设备等 |
| 系统安全 | 215 | Windows / Linux 系统漏洞与提权分析 |
| IOT安全 | 224 | 摄像头、路由器、工控与其他设备 |
| 合计 | **5596** | 站点侧栏数量随构建从文件生成 |

## 本地阅读与检索

仓库内容是普通 Markdown，可用熟悉的编辑器阅读。下载最新内容：

```sh
git clone --depth 1 https://github.com/Ares-X/VulWiki.git
cd VulWiki
```

已安装 [ripgrep](https://github.com/BurntSushi/ripgrep) 时，可以按编号或产品搜索正文：

```sh
rg -n -i --glob '*.md' 'CVE-2024-41107' Web安全 系统安全 IOT安全
rg -l -i --glob '*.md' 'CloudStack' Web安全 系统安全 IOT安全
```

在线版采用 Docsify 渲染，页面外壳、侧栏和搜索数据由博客的 Hexo 项目构建。本仓库保存内容；仅克隆本仓库即可阅读 Markdown，完整的在线界面由博客发布流程生成。

## 目录结构

<details>
<summary>展开查看主要分类</summary>

```text
Web安全/
├── OA办公/          # 致远/泛微/通达/蓝凌/万户/金和…
├── ERP企业/         # 用友/金蝶/SAP/浪潮/明源…
├── CMS内容/         # WordPress/Discuz/DedeCMS…
├── 中间件/          # WebLogic/Tomcat/Nginx/Solr…
├── 开发框架/        # Spring/Struts2/Fastjson/Shiro…
├── 网络设备/        # Cisco/华为/华三/锐捷/Fortinet…
├── 商业软件/        # 商城/CRM/工单/进销存…
├── AI应用/          # Langflow/Ollama/ComfyUI/vLLM…
├── 桌面软件/        # WinRAR/WPS/浏览器/阅读器…
├── 安全设备/        # WAF/堡垒机/EDR/杀毒…
├── 云平台/          # VMware/K8s/Docker/OSS…
├── 服务器软件/      # Exim/Samba/SSH/Zabbix…
├── 数据库/          # MySQL/Oracle/Redis/达梦…
├── 智能设备/        # 海康/大华/摄像机/DVR/NVR…
├── 邮件系统/        # Exchange/ zimbra/ postfix…
├── 运维面板/        # 宝塔/1panel/nginxWebUI…
└── 其他软件/        # 未归类的待人工细分
系统安全/  # Windows/Linux提权
IOT安全/   # 摄像头/路由器/工控
```

</details>

## 如何添加新的文章

欢迎通过 [Pull Request](https://github.com/Ares-X/VulWiki/pulls) 补充文章、修复排版与链接；发现编号、版本或来源错误可提交 [Issue](https://github.com/Ares-X/VulWiki/issues/new)。

1. 先按产品、漏洞编号与原文标题搜索，避免重复收录；找到对应分类与产品目录，没有时再新建，勿用文章标题截断片段作为产品名称。
2. Markdown 文件名即漏洞标题。正文应说明漏洞原理或影响、受影响版本与前提、复现步骤或验证方法，并保留参考来源。网络测绘指纹按实际情况提供，不适用时省略。
3. 图片存放在当前 Markdown 同级的 `.resource/文章名/media/`，正文使用相对路径引用；代码块注明语言，文件名使用单个 `.md` 后缀。
4. 文首按需填写简单字符串 frontmatter：`cve`、`version`、`fofa`、`source`。未知字段可省略，主 CVE 不要从正文首次提及的历史编号机械抽取。
5. 同步更新相关 `INDEX*.md` 与子索引，按时间倒序补充 [Change Log](#change-log)。分类侧栏和 JSON 搜索数据由站点构建自动生成，Markdown 查询索引目前仍需维护。
6. 提交前检查 Markdown 渲染、图片与相对链接，并注明来源核对和复现情况；引用公开 PoC 与本地复现通过应分别说明。

## 引用来源（致谢）

本库在 2026-09 进行了集中补档，以下项目与社区是主要公开来源。历史导入内容仍在复核来源、重复条目和排版，引用内容版权归原作者所有：

| 来源 | 说明 |
|---|---|
| [零组攻防实验室 (0-sec)](https://wiki.0-sec.org) | 本库初始血源 |
| [wy876 漏洞文库](https://github.com/wy876/POC)（备份镜像 [DMW11525708/wiki](https://github.com/DMW11525708/wiki)、[cvi-Qing/poc](https://github.com/cvi-Qing/poc)） | 国产 1day POC 文库，2023-2025 主力来源 |
| [SourByte05/Vulnerability-Wiki-PoC](https://github.com/SourByte05/Vulnerability-Wiki-PoC) | 2024-至今高价值资产 1day 复现归档 |
| [Threekiii/Vulnerability-Wiki](https://github.com/Threekiii/Vulnerability-Wiki) & [Threekiii/Awesome-POC](https://github.com/Threekiii/Awesome-POC) | 中文漏洞知识库 + PoC 知识库（含乌云/0sec 归档） |
| [BaizeSec/bylibrary 白阁文库](https://github.com/BaizeSec/bylibrary) | 白泽Sec 漏洞 POC/EXP 文库 |
| [Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC) | 渗透测试 POC/EXP 汇总 |
| [MrWQ/vulnerability-paper](https://github.com/MrWQ/vulnerability-paper) | 漏洞分析文章合集（重点漏洞补齐来源） |
| [lal0ne/vulnerability](https://github.com/lal0ne/vulnerability) | 公开 POC 整理（边界设备 0day/1day） |
| [Vulhub](https://github.com/vulhub/vulhub) | 部分 docker 复现环境参考 |
| 先知社区 / 跳跳糖 / Seebug / 安全客 / Y4er Blog 等 | 部分文章原始出处，文内缺失的来源仍待补齐 |

每篇应通过 `source` 字段或文末 `> 来源：` 脚注保留逐篇原始出处；只写补库批次不能替代来源，历史缺失项待补齐。引用内容仅作学习研究用途，严禁非法使用。

## Change Log

* 2026-10-01 更新 GitHub 首页、在线 Wiki 与三类查询入口，明确内容统计口径和贡献流程；在线版已上线分类按需展开、关键词检索及按需全文搜索。

<details>
<summary>查看历史导入记录</summary>

以下保留当时的批次记录，累计数量、覆盖率与漏洞表述不作为本次质量复核结论；当前文件数量见上方快照。

* 2026-09-27 第四波收录 +2208 篇：gelusus/wxvl 公众号漏洞文库定向收割（CVE 复现文 2051 + 国产 1day 无 CVE 精选 157，覆盖 2022-04→2026-09，重点漏洞覆盖 48→58/63）
* 2026-09-27 标准放宽+第三波收录 +866 篇：短篇但描述清楚+有利用方式的复活 190 篇；MrWQ/vulnerability-paper 中文复现文章 676 篇（总量 3011 → 3874）
* 2026-09-27 重点漏洞补全：ProxyShell/vCenter/PrintNightmare/Zyxel/PaperCut/Citrix/Ivanti×3/XZ后门/regreSSHion/SAP/SharePoint 等历年 A 级漏洞 12 篇（含利用方式与 PoC 链接）
* 2026-09-27 结构重构：组件目录字母分片、frontmatter 索引、INDEX 重建、坏目录清洗 197 个、大小写归并 17 组、修复历史断链图片引用 1500+、fastjson 2026 双 0day（CVE-2026-16723 / CVE-2026-44034）入库
* 2026-09-27 批量补档 +2028 篇（来源见上表），总量 988 → 3000
* 2021-03 沿用历史记录见 git log

</details>

## 维护方向

- 复核历史文章的主 CVE、影响版本、来源和收录质量，合并重复内容。
- 修复 Markdown 排版、失效图片与链接，完善产品分类。
- 自动重建 Markdown 查询索引；增量收录公开资料时保留人工审核与来源核对。
