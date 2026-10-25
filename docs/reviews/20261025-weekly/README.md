# 2026-10-19 至 2026-10-25 漏洞资料整理

本轮基于 `master` 的 `79d461e7b8a04047dae0127136ee86168cc9eff0`，在独立分支 `codex/weekly-vulns-2026-10-25` 维护。范围为本次指定热点及直接相关一手材料，截止核对日 2026-10-25；不是对全部漏洞源或全网 PoC 的穷尽覆盖。周内新披露、旧漏洞的新利用进展、历史条目复核分别记录。

已阅读根 `AGENTS.md`、`CONTRIBUTING.md`、`docs/CONTENT-SCHEMA.md`、模板和 `docs/REVIEW-WORKFLOW.md`。仓库树只有根 AGENTS，无仓库内 `.agents/skills` 或 `.codex` 规则；另检查本机 `.agents/skills` 的 orchestration/orca-cli 发现说明，它们面向 Orca 运行态管理，本次文档维护不调用。按本次用户指定的 PoC/EXP 准入范围处理，没有以仓库允许的纯 analysis/advisory 扩大主库。

## 主库变更与去重

在三个正文根目录及来源投影中按完整 CVE、产品与标题检查。已有 CVE-2026-99999 主入口，补充证据边界；其他本轮录入编号未发现既有主入口。没有删除或重命名来源、原图、历史入口和用户修改，没有改变质量基线、维护规则或发布流程。

| 处置 | 主体 | 时间与证据边界 |
| --- | --- | --- |
| 新增一篇合并链资料 | PHP CVE-2026-109618 / 109619 | 10-21 原厂披露；固定 EXP 更新 10-23；当前官方 ini/150 worker 作者实验与旧 8M 路线分开 |
| 新增 | PHP CVE-2026-115560 | 10-23 新通告、10-24 PoC 提交；特殊 handler 切换、人工 LabGadget 和待常规修复分别说明 |
| 新增 | Node Brotli CVE-2026-111497 | 10-21 公告、PoC 快照 10-25；Express JSON 解码、固定二进制和实验条件下作者 RCE/24.22.1 负对照 |
| 新增旧漏洞本周进展 | Plex2Shell 四项链 | 9 月升级提醒、10-16 公开 PoC、10-18 仓库创建、10-19 在野更新、10-21 源码提交分别记录 |
| 更新已有条目 | PwnEscape CVE-2026-99999 | 10-17 TAP primitive 为旧资料；真实服务披露与自有 KVM 完整链不混同，不重复建档 |

所有新稿使用严格 v1 字段、`text-reviewed`、`source-claimed`、`active`，未标记为本库 reproduced。只保留原始公开值与固定来源，不复制许可不明的完整 PoC。无新增图片引用，未把来源徽章/GIF/截图当作已查看像素或动态证据。

## 固定输入与实际阅读范围

以下固定提交的元数据和相应文本已直接读取；递归源码树枚举不等于逐文件审计。外部网页与源码只作为资料，未执行任何外部安装脚本、PoC、扫描器、载荷，也未访问示例目标。

| 来源 | 固定提交 | 本轮阅读范围 |
| --- | --- | --- |
| [9bie/php2shell-bypass-aslr-exp](https://github.com/9bie/php2shell-bypass-aslr-exp/tree/d6f888ebd3f0e188bb662e16f23747afdf35e42f) | `d6f888ebd3f0e188bb662e16f23747afdf35e42f`（10-23） | README、run_pure.sh、official_workers 文本日志；exploit.py 入口、profile 与链阶段静态片段，未审全部 helper |
| [googlesky/CVE-2026-115560](https://github.com/googlesky/CVE-2026-115560/tree/450adfa033d7764b43327ff8071b418a4c695225) | `450adfa033d7764b43327ff8071b418a4c695225`（10-24） | README 全文、lab/src/index.php 全文；PoC 其余文件未逐行审计 |
| [dimasma0305/CVE-2026-111497-POC](https://github.com/dimasma0305/CVE-2026-111497-POC/tree/452151d4945c3f5d9b58d9d25792d0d8aef4ab16) | `452151d4945c3f5d9b58d9d25792d0d8aef4ab16`（10-25） | README 的概述、环境与 Express 等路线；Express server.js 全文及 blackbox RCE 文本日志全文；未全审所有 profile、录屏与 defender 包 |
| [code-zm/plex2shell](https://github.com/code-zm/plex2shell/tree/448a5923336512ae1dcff5269407845d01e55d26) | `448a5923336512ae1dcff5269407845d01e55d26`（10-21） | README 全文、plex2shell.py token/转码/落盘/触发/清理关键阶段；未全审 C payload 与检测资料 |
| [PeronGH/CVE-2026-99999](https://github.com/PeronGH/CVE-2026-99999/tree/b9ebe258f01036c55c5f3722de950bb978b31856) | `b9ebe258f01036c55c5f3722de950bb978b31856`（10-17） | 本轮 README 与提交日期；既有 10-19 全文六文件审阅记录保留，未冒称本轮重审全部源码 |
| [googlesky/CVE-2026-110264](https://github.com/googlesky/CVE-2026-110264/tree/cc7e6a9193bccffebd28e2a1c2278541e3d8e1af) | `cc7e6a9193bccffebd28e2a1c2278541e3d8e1af`（10-24） | README 与 reports/lab-evidence-19.3.1.md；未运行或把 timeout 当作 RCE |
| [CaterMaoZi/CVE-2026-111497-POC](https://github.com/CaterMaoZi/CVE-2026-111497-POC/tree/ac6c4e3431271f539f32d881713f2066ef9a7a96) | `ac6c4e3431271f539f32d881713f2066ef9a7a96` | README 对照，无 native crash 的自述与 bomb 限制；不将其全网无 PoC 说法当作当前事实 |

PHP、Node、Plex、GitLab、Ruby、PWN.AI、Arista、LiteLLM、Oracle/ops.java、Cisco、Fortinet、Drupal 的下列一手网页均直接读取正文。没有对原站图片、外链全部附件或所有历史修订作全面审计。机器扫描覆盖全库文档不等于人工全文复核全库。本轮五篇变更正文与最终 diff 另作文字复核；独立维护者审阅由 draft PR 保留。

## 本轮不进入主库的资料

以下排除是本次具体材料的对应性/范围判断，不声称全网不存在 PoC，也不因本库未独立复现而拒收。

| 资料 | 一手事实与排除理由 |
| --- | --- |
| GitLab CVE-2026-110264 / Ruby Onigmo | [GitLab 10-21 公告](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) 确认未认证 RCE 风险及修复 19.5.1 / 19.4.3 / 19.3.6 / 19.2.9 / 19.1.9 / 19.0.10 / 18.11.13；[Ruby 10-23 公告](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) 对应 4.0.9 / 3.4.12 / 3.3.13。所读 googlesky 实验只有渲染耗时/Timeout，20000 repeats 的未跨阈值对照也慢，无 native crash 或执行命令证据；502/OOM 不能补足。暂不认作本 CVE 可靠检测或 RCE PoC，不把 CVE-2026-97229 的利用能力移植过来。 |
| CaterMaoZi Brotli bomb | 上述固定 README 自述未找到 native crash，行为矩阵不能区分补丁；正常解压放大不证明 111497 越界写。作为 Node 条目的对照限制保留，未另建重复主条目。 |
| Arista VeloCloud CVE-2026-114625 | [10-22 SA-0199](https://www.arista.com/en/support/advisories-notices/security-advisory/24838-security-advisory-0199) 确认在野、有效认证会话且最低 Enterprise Read Only 角色；修复 5.2.3.18 / 6.1.3.10 / 6.4.2.12。本轮没有核实公开 PoC，不写成未认证 RCE。 |
| LiteLLM 1.107.0 供应链事件 | [10-21 事件记录](https://docs.litellm.ai/blog/security-incident-oct-21-2026) 与 [10-23 最终调查](https://docs.litellm.ai/blog/security-incident-oct-21-2026-attack-chain)：投毒涉及 PyPI/镜像分发产物，官方源码 tag 不含恶意文件；早期调查假设被最终报告更正。本轮不作为普通 CVE/PoC 条目收录，不下载或运行恶意包。 |
| eMudhra / Oracle CVE-2026-91403、114820 | [ops.java 10-24 更新](https://ops.java/emudhra) 与 [Oracle 114820 10-24 公告](https://www.oracle.com/security-alerts/alert-cve-2026-114820.html) 支持 CA 信任移除与 Java 更新，不支持 WebLogic RCE。91403 未在本轮两页中独立完成编号对应核验，保留为待核线索；无经核实的本轮 PoC，不建错误产品条目。 |
| Cisco UC 批量加固 | [10-21 官方公告](https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-voice-hardening-twgbH9e3.html) 按 CWE 分组多项修补，15SU5 等版本；本轮未核实公开 PoC，不能把整组概括成一个通用未认证 RCE。 |
| Fortinet 批量加固 | [10-21 官方说明](https://www.fortinet.com/blog/ciso-collective/fortinet-releases-security-hardening-release-for-multiple-products) 给出升级矩阵，详细公告预定 11-10。本轮不推测具体 CVE、端点、PoC 或各项利用能力。 |
| Drupal Ffmpeg Image Toolkit CVE-2026-114523 | [10-21 SA-CONTRIB-2026-220](https://www.drupal.org/sa-contrib-2026-220)：模块 <1.0.3，攻击者需能上传图片，文件名传递到 ffmpeg CLI 时过滤不足；本轮未核实公开 PoC，不把模块漏洞扩展成默认 Drupal core 未认证 RCE。 |

检查结果、稀疏检出范围与最终提交/CI 另记 `checks.md`。这些待核材料保留在维护记录和 PR 说明，不生成主 CVE 索引入口。
