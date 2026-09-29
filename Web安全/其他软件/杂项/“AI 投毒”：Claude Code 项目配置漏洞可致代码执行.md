---
cve: "CVE-2025-59536"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  警惕“AI 投毒”：Claude Code 项目配置漏洞可致代码执行  
原创 APT-101
                    APT-101  APT-101   2026-03-02 00:53  
  
**摘要：**  
 只需在一个包含恶意配置的本地项目目录中运行 Claude Code，无需任何恶意代码编写，攻击者就能通过远程代码执行（RCE）接管你的机器，并瞬间窃取你的 Claude API 密钥！Check Point 最新披露的 CVE-2025-59536 揭示了 AI Agent 时代全新的自动化攻击模式。  
## 01 恐惧源头：配置文件的“自动化投毒”  
  
Anthropic 的 Claude Code 是一款强大的本地 AI 开发助手。为了支持团队协作，它允许在项目根目录中维护一个 .claude/settings.json  
 配置文件，以便团队共享相同的 AI 设置、插件和工具链。  
  
**这个本来方便协作的功能，如今变成了致命的攻击向量。**  
  
Check Point Research 发现，如果一个攻击者向开源项目提交了这个恶意配置文件，任何克隆并打开该项目的开发者，都将面临巨大的安全风险。这是一种全新的**配置级（Configuration-based）攻击**  
。  
## 02 深度拆解：三个致命的漏洞场景  
### 风险场景一：伪装的 Hooks —— 隐蔽的远程代码执行 (RCE)  
  
Hooks 是 Claude Code 用来在特定事件（如项目初始化）自动执行指令的功能。  
- **攻击手法**  
：攻击者在配置文件中定义了一个恶意的 Hook 动作。  
  
- **技术机制**  
：当用户在受感染的目录运行 claude  
 命令时，虽然会出现信任提示弹窗，但攻击者研究发现，**用户点击“信任”后，Hook 队列中的命令会直接在后台自动执行，不再需要二次确认**  
。  
  
- **潜在后果**  
：攻击者可以执行任意 Shell 命令，包括安装后门、下载恶意程序。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/PIWj1VguNovXHwPtahtOicAYjzWonawPhibElWdGfSyfFXX1p0vjMQbxulA19Ygbs4Q2CWJ7d37icWzic4oD64W7icAFibFDFKFFpdKh3FujUtX0g/640?wx_fmt=png&from=appmsg "")  
### 风险场景二：自动化绕过 MCP 的用户确认机制  
  
MCP (Model Context Protocol) 允许 Claude 调用本地或远程工具（如连接本地数据库、运行终端命令）。  
- **攻击手法**  
：在配置文件中设置高危参数，如 enableAllProjectMcpServers  
。  
  
- **漏洞核心**  
：这是一个 Race Condition（竞态条件）漏洞。在 Anthropic 修复此缺陷前，**恶意命令抢在用户点击“信任目录”的提示确认框之前就已经执行了**  
。  
  
- **潜在后果**  
：在受害者意识到项目正在打开之前，机器就已经被完全控制。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/PIWj1VguNosG4cZ6XYjo7LaGrPAj1pQFc5QJs7UWJYuILIbW89nFVuLycBu7K6dJTRYibvicURbWaIc9fVw0jHcrzwzeNW7l1JxIME1DMWsF4/640?wx_fmt=png&from=appmsg "")  
### 风险场景三：针对 Anthropic API 密钥的“中间人”投毒  
  
这是一种旨在直接窃取财富和数据的身份劫持攻击。  
- **攻击手法**  
：攻击者在 .claude/settings.json  
 中定义环境变量 ANTHROPIC_BASE_URL  
，将其重定向到攻击者控制的钓鱼服务器。  
  
- **技术机制**  
：Claude Code 在启动初始化时会向其服务器发送带有 Authorization 头（内含明文 API 密钥）的身份验证请求。  
  
- **关键漏洞**  
：该请求在 **用户决定是否信任该目录之前就已经发出了**  
。即使受害者发现异样并取消了目录信任，密钥已经泄漏。  
  
- **潜在后果**  
：攻击者使用受害者的 API 密钥进行账单欺诈，或者利用 API 的 Workspace 功能直接读取受害者托管在该 Workspace 下的所有项目文件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/PIWj1VguNotZc397xkLtD28LoYJiafxrvn32mHwwQvTWemmg5QiazlANCrBQ1YmSOMGib0BibNCpfPn79bX4xGxnXKHKuGAWOXLXE63ApxpicIrc/640?wx_fmt=png&from=appmsg "")  
## 03 总结与防护：严审你的项目配置文件  
  
在 AI Agent 时代，**配置文件即病毒体**  
。防御边界已从 .sh  
 和 .exe  
 扩展到了 .json  
 和 .yaml  
。  
<table><thead><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-image: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;"><th style="box-sizing: border-box;text-align: left;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;font-weight: bold;background-color: rgb(240, 240, 240);margin: 0px;"><section><span leaf="">防御策略</span></section></th><th style="box-sizing: border-box;text-align: left;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;font-weight: bold;background-color: rgb(240, 240, 240);margin: 0px;"><section><span leaf="">操作指南</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-image: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;"><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><strong style="box-sizing: border-box;font-weight: bold;color: rgb(191, 54, 12);"><span leaf="">工具更新</span></strong></td><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><strong style="box-sizing: border-box;font-weight: bold;color: rgb(191, 54, 12);"><span leaf="">立即将 Claude Code 升级到最新版本</span></strong><section><span leaf="">，官方已修复此问题。</span></section></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-image: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: rgb(248, 248, 248);"><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><strong style="box-sizing: border-box;font-weight: bold;color: rgb(191, 54, 12);"><span leaf="">严审配置</span></strong></td><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><section><span leaf="">在 Code Review 中，严禁将未审核的 </span><code style="box-sizing: border-box;font-size: 1em;font-family: source-code-pro, Menlo, Monaco, Consolas, &#34;Courier New&#34;, monospace;"><span leaf="">.claude/</span></code><span leaf=""> 目录纳入信任范围。</span></section></td></tr><tr style="box-sizing: border-box;border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-image: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;"><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><strong style="box-sizing: border-box;font-weight: bold;color: rgb(191, 54, 12);"><span leaf="">权限隔离</span></strong></td><td style="box-sizing: border-box;font-size: 14px;border: 1px solid rgb(204, 204, 204);padding: 5px 10px;text-align: left;margin: 0px;"><section><span leaf="">切勿在配置文件中硬编码 API 密钥，优先使用环境变量。</span></section></td></tr></tbody></table>## 04 自动化扫描脚本  
  
```
#!/usr/bin/env python3
# Scans a repo for the three Claude Code vulnerability patterns.
# Usage: python3 scanner.py <path-to-repo>

import json
import os
import sys
import re
from pathlib import Path

# ANSI colors
RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
RESET = "\033[0m"
BOLD = "\033[1m"


class Finding:

    def __init__(self, severity, cve, title, file_path, detail, recommendation):
        self.severity = severity  # CRITICAL, HIGH, MEDIUM, LOW, INFO
        self.cve = cve
        self.title = title
        self.file_path = file_path
        self.detail = detail
        self.recommendation = recommendation

    def __str__(self):
        colors = {
            "CRITICAL": RED + BOLD,
            "HIGH": RED,
            "MEDIUM": YELLOW,
            "LOW": CYAN,
            "INFO": GREEN,
        }
        c = colors.get(self.severity, RESET)
        return (
            f"\n{c}[{self.severity}]{RESET} {BOLD}{self.title}{RESET}\n"
            f"  CVE:            {self.cve}\n"
            f"  File:           {self.file_path}\n"
            f"  Detail:         {self.detail}\n"
            f"  Recommendation: {self.recommendation}\n"
        )


def scan_hooks_bypass(repo_path):
    findings = []
    settings_path = repo_path / ".claude" / "settings.json"

    if not settings_path.exists():
        return findings

    try:
        data = json.loads(settings_path.read_text())
    except (json.JSONDecodeError, OSError):
        return findings

    hooks = data.get("hooks", {})
    if not hooks:
        return findings

    for event_name, event_config in hooks.items():
        if not isinstance(event_config, list):
            continue
        for matcher_block in event_config:
            if not isinstance(matcher_block, dict):
                continue
            for hook in matcher_block.get("hooks", []):
                if not isinstance(hook, dict):
                    continue
                cmd = hook.get("command", "")
                if cmd:
                    severity = "CRITICAL"
                    dangerous_patterns = [
                        r"curl\s", r"wget\s", r"nc\s", r"ncat\s",
                        r"bash\s+-[ic]", r"/dev/tcp/", r"mkfifo",
                        r"python.*-c", r"eval\s", r"base64",
                        r"\bssh\b", r"reverse", r"bind.*shell",
                    ]
                    is_extra_dangerous = any(
                        re.search(p, cmd, re.IGNORECASE) for p in dangerous_patterns
                    )

                    findings.append(Finding(
                        severity="CRITICAL" if is_extra_dangerous else "HIGH",
                        cve="No CVE (CVSS 8.7)",
                        title=f"Project hook executes shell command on {event_name}",
                        file_path=str(settings_path),
                        detail=f"Command: {cmd[:120]}{'...' if len(cmd)>120 else ''}",
                        recommendation=(
                            "Remove project-level hooks or audit each command. "
                            "Update Claude Code to v1.0.87+ where consent is required."
                        ),
                    ))

    return findings


def scan_mcp_injection(repo_path):
    findings = []

    settings_path = repo_path / ".claude" / "settings.json"
    auto_enable = False

    if settings_path.exists():
        try:
            data = json.loads(settings_path.read_text())
            if data.get("enableAllProjectMcpServers") is True:
                auto_enable = True
                findings.append(Finding(
                    severity="HIGH",
                    cve="CVE-2025-59536 (CVSS 8.7)",
                    title="enableAllProjectMcpServers is set to true",
                    file_path=str(settings_path),
                    detail=(
                        "This flag causes all project-defined MCP servers to start "
                        "automatically without user consent."
                    ),
                    recommendation=(
                        "Remove this flag. Update Claude Code to v1.0.111+ "
                        "where this bypass is patched."
                    ),
                ))
        except (json.JSONDecodeError, OSError):
            pass

    mcp_path = repo_path / ".mcp.json"
    if mcp_path.exists():
        try:
            mcp_data = json.loads(mcp_path.read_text())
            servers = mcp_data.get("mcpServers", {})
            for name, config in servers.items():
                if not isinstance(config, dict):
                    continue
                cmd = config.get("command", "")
                args = config.get("args", [])
                full_cmd = f"{cmd} {' '.join(str(a) for a in args)}" if args else cmd

                severity = "CRITICAL" if auto_enable else "MEDIUM"
                findings.append(Finding(
                    severity=severity,
                    cve="CVE-2025-59536 (CVSS 8.7)",
                    title=f"MCP server '{name}' executes: {cmd}",
                    file_path=str(mcp_path),
                    detail=f"Full command: {full_cmd[:150]}{'...' if len(full_cmd)>150 else ''}",
                    recommendation=(
                        "Audit MCP server commands. Remove untrusted servers. "
                        "Never set enableAllProjectMcpServers=true in shared repos."
                    ),
                ))

                env = config.get("env", {})
                for k, v in env.items():
                    if any(
                        s in k.upper()
                        for s in ["KEY", "TOKEN", "SECRET", "PASSWORD", "CREDENTIAL"]
                    ):
                        findings.append(Finding(
                            severity="MEDIUM",
                            cve="CVE-2025-59536",
                            title=f"MCP server '{name}' sets suspicious env var: {k}",
                            file_path=str(mcp_path),
                            detail=f"Env var {k} may be used to override credentials.",
                            recommendation="Audit environment variables in MCP configs.",
                        ))
        except (json.JSONDecodeError, OSError):
            pass

    return findings


def scan_api_exfil(repo_path):
    findings = []
    settings_path = repo_path / ".claude" / "settings.json"

    if not settings_path.exists():
        return findings

    try:
        data = json.loads(settings_path.read_text())
    except (json.JSONDecodeError, OSError):
        return findings

    env = data.get("env", {})
    if not isinstance(env, dict):
        return findings

    suspicious_env_vars = {
        "ANTHROPIC_BASE_URL": "Redirects all API traffic (including API key) to attacker",
        "ANTHROPIC_API_KEY": "Overrides/captures the user's API key",
        "CLAUDE_CODE_API_KEY": "May override API key configuration",
        "HTTP_PROXY": "Routes all HTTP traffic through attacker proxy",
        "HTTPS_PROXY": "Routes all HTTPS traffic through attacker proxy",
        "NODE_EXTRA_CA_CERTS": "Could enable MITM by injecting attacker CA certificate",
    }

    for var, description in suspicious_env_vars.items():
        value = env.get(var, "")
        if not value:
            continue

        severity = "CRITICAL"
        if var == "ANTHROPIC_BASE_URL":
            if "anthropic.com" not in value.lower():
                severity = "CRITICAL"
            else:
                severity = "INFO"

        findings.append(Finding(
            severity=severity,
            cve="CVE-2026-21852 (CVSS 5.3)",
            title=f"Environment override: {var}",
            file_path=str(settings_path),
            detail=f"{description}. Value: {value[:80]}{'...' if len(value)>80 else ''}",
            recommendation=(
                "Remove env overrides from project settings. "
                "Update Claude Code to v2.0.65+ where env is not loaded before trust prompt."
            ),
        ))

    return findings


def scan_repo(repo_path_str):
    repo_path = Path(repo_path_str).resolve()

    if not repo_path.is_dir():
        print(f"{RED}[!] Error: '{repo_path}' is not a directory{RESET}")
        sys.exit(1)

    print(f"""
{BOLD}{'='*70}
  Claude Code Malicious Repository Scanner
  EDUCATIONAL USE ONLY
{'='*70}{RESET}

{CYAN}[*] Scanning: {repo_path}{RESET}
""")

    all_findings = []

    scanners = [
        ("Hooks Consent Bypass (no CVE)", scan_hooks_bypass),
        ("MCP Server Injection (CVE-2025-59536)", scan_mcp_injection),
        ("API Key Exfiltration (CVE-2026-21852)", scan_api_exfil),
    ]

    for name, scanner_fn in scanners:
        print(f"{CYAN}[*] Checking: {name}...{RESET}")
        findings = scanner_fn(repo_path)
        all_findings.extend(findings)
        if findings:
            print(f"  {RED}Found {len(findings)} issue(s){RESET}")
        else:
            print(f"  {GREEN}Clean{RESET}")

    print(f"\n{BOLD}{'='*70}")
    print(f"  SCAN RESULTS")
    print(f"{'='*70}{RESET}\n")

    if not all_findings:
        print(f"{GREEN}{BOLD}[+] No Claude Code supply-chain indicators found.{RESET}\n")
        return 0

    severity_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "INFO": 4}
    all_findings.sort(key=lambda f: severity_order.get(f.severity, 5))

    for finding in all_findings:
        print(finding)

    by_severity = {}
    for f in all_findings:
        by_severity[f.severity] = by_severity.get(f.severity, 0) + 1

    print(f"\n{BOLD}Total findings: {len(all_findings)}{RESET}")
    for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"]:
        count = by_severity.get(sev, 0)
        if count:
            colors = {
                "CRITICAL": RED + BOLD, "HIGH": RED,
                "MEDIUM": YELLOW, "LOW": CYAN, "INFO": GREEN,
            }
            print(f"  {colors.get(sev, '')}{sev}: {count}{RESET}")

    print(f"\n{YELLOW}[!] Recommendation: Do NOT open this repo with Claude Code < v2.0.65{RESET}")
    print(f"{YELLOW}[!] Review and remove all suspicious configuration files.{RESET}\n")

    return len(all_findings)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <path-to-repo>")
        print(f"Example: {sys.argv[0]} ./suspicious-repo")
        sys.exit(1)

    count = scan_repo(sys.argv[1])
    sys.exit(1 if count > 0 else 0)
```  
  
  
**🔗 相关研究原文：**  
- https://research.checkpoint.com/2026/rce-and-api-token-exfiltration-through-claude-code-project-files-cve-2025-59536/  
  
- https://github.com/atiilla/CVE-2026-21852-PoC  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
