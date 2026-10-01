# VulWiki

> 中文漏洞知识库 · 实战导向 · 漏洞原理与复现资料

**收录标准**：描述清楚漏洞原理/影响 + 提供利用方式（复现步骤/POC/EXP/验证方法）即收录；篇幅长短不是门槛。纯预警、无利用细节的条目不收。

[![articles](https://img.shields.io/badge/内容Markdown-5596-blue)](INDEX.md) [![last](https://img.shields.io/badge/更新-持续-green)](#change-log)

## 简介

VulWiki 以收录有**完整漏洞信息和复现/利用方式**的中文漏洞文章为目标。纯漏洞预警、无利用细节的条目不符合收录标准；历史批量导入内容正在按此标准复核，目录中的条目不代表已验证可利用。

- 2026-10-01 文件快照：**5596 个内容 Markdown**，Web安全 5157 / 系统安全 215 / IOT安全 224；含产品内 README，不含根目录概览与查询索引。站点侧栏数量随构建从文件生成。
- CVE 查询见年份索引；正文提及的历史 CVE、主 CVE 字段和已验证漏洞不是同一统计口径。部分主 CVE 字段仍待校正。
- 完整条目应含：漏洞描述 / 影响版本及前提 / 复现步骤或验证方法 / 参考来源；网络测绘指纹按实际情况提供，不适用时不应填充占位内容。
- 多数文章带 YAML frontmatter（`cve` / `version` / `fofa`），可 grep 精确定位

## 快速检索（三索引）

- [INDEX.md](INDEX.md) — 按漏洞类型→组件浏览（OA办公/ERP/中间件/CMS…17产品类型）
- [INDEX-CVE.md](INDEX-CVE.md) — 按 CVE 年份定位
- [INDEX-FOFA.md](INDEX-FOFA.md) — 按网络测绘指纹反查漏洞；使用前核对语法、测绘平台和适用范围
- 命令行：`grep -r 'cve: "CVE-2024-21887"'` / `grep -r 'fofa' --include='*.md' -l`

## 目录结构

```
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

## 如何添加新的文章

1. 找到对应分类与产品目录（没有就新建；勿用文章标题截断片段作为产品名称）
2. Markdown 文件名即漏洞标题；正文含：漏洞描述、影响版本、网络测绘、复现/POC、参考
3. 图片存放在当前 Markdown 同级 `.resource/文章名去括号/media/`，正文相对路径引用
4. 文首加 frontmatter（cve / version / fofa / source），按时间倒序在 Change Log 添加记录

## 引用来源（致谢）

本库在 2026-09 大规模补档，以下外部项目/社区的内容经筛选、去重、格式统一后收录，版权归原作者所有：

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
| 先知社区 / 跳跳糖 / Seebug / 安全客 / Y4er Blog 等 | 部分文章原始出处（文内已逐篇标注） |

每篇应通过 `source` 字段或文末 `> 来源：` 脚注保留逐篇原始出处；只写补库批次不能替代来源，历史缺失项待补齐。引用内容仅作学习研究用途，严禁非法使用。

## Change Log

* 2026-09-27 第四波收录 +2208 篇：gelusus/wxvl 公众号漏洞文库定向收割（CVE 复现文 2051 + 国产 1day 无 CVE 精选 157，覆盖 2022-04→2026-09，重点漏洞覆盖 48→58/63）
* 2026-09-27 标准放宽+第三波收录 +866 篇：短篇但描述清楚+有利用方式的复活 190 篇；MrWQ/vulnerability-paper 中文复现文章 676 篇（总量 3011 → 3874）
* 2026-09-27 重点漏洞补全：ProxyShell/vCenter/PrintNightmare/Zyxel/PaperCut/Citrix/Ivanti×3/XZ后门/regreSSHion/SAP/SharePoint 等历年 A 级漏洞 12 篇（含利用方式与 PoC 链接）
* 2026-09-27 结构重构：组件目录字母分片、frontmatter 索引、INDEX 重建、坏目录清洗 197 个、大小写归并 17 组、修复历史断链图片引用 1500+、fastjson 2026 双 0day（CVE-2026-16723 / CVE-2026-44034）入库
* 2026-09-27 批量补档 +2028 篇（来源见上表），总量 988 → 3000
* 2021-03 沿用历史记录见 git log

## To-do

- [ ] GitHub Actions 自动构建部署在线版
- [ ] 按月增量：新 CVE 复现文章自动采集入库
