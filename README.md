# VulWiki

> 中文漏洞知识库 · 实战导向 · 全部条目含漏洞信息与复现/利用方式

**收录标准**：描述清楚漏洞原理/影响 + 提供利用方式（复现步骤/POC/EXP/验证方法）即收录；篇幅长短不是门槛。纯预警、无利用细节的条目不收。

[![articles](https://img.shields.io/badge/文章-6082-blue)](INDEX.md) [![last](https://img.shields.io/badge/更新-持续-green)](#change-log)

## 简介

VulWiki 收录有**完整漏洞信息和复现/利用方式**的中文漏洞文章。纯漏洞预警、无利用细节的条目一律不入库。

- 总量 **6082 篇**：Web安全 5740 / IOT安全 253 / 系统安全 89
- 覆盖 CVE ~950 条（2021:102 2022:50 2023:57 2024:66 2025:44 2026:17）
- 每篇含：漏洞描述 / 影响版本 / 网络测绘(FOFA) / 复现步骤或 POC / 参考链接
- 多数文章带 YAML frontmatter（`cve` / `version` / `fofa`），可 grep 精确定位

## 目录结构

```
Web安全/          # Web应用、中间件、框架、组件漏洞
  字母F/Fastjson/ # 组件目录按首字母分片，浏览不卡
  字母Y/用友/
  中文/泛微oa/
IOT安全/          # 网络设备、摄像头、路由器、工控（46 类厂商）
系统安全/         # 系统提权、容器逃逸、后门利用
INDEX.md          # 全库索引（分类 → 组件 → 文章）
```

查找方式：**INDEX.md 目录导航** / **grep CVE 号** / **grep FOFA 指纹**（frontmatter 已索引）。

## 如何添加新的文章

1. 找到对应分类与组件目录（没有就新建，放入对应字母分片）
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

每篇文末的 `> 来源：` 脚注保留原始出处；引用内容仅作学习研究用途，严禁非法使用。

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
