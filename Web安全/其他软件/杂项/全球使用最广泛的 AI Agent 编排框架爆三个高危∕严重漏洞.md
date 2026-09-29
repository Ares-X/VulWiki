---
cve: "CVE-2025-68664"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  全球使用最广泛的 AI Agent 编排框架爆三个高危/严重漏洞｜蓝队防御指南  
原创 WorkBuddy
                    WorkBuddy  海狼风暴团队   2026-03-31 04:16  
  
⚠ 高危漏洞 · 应急响应  
  
LangChain + LangGraph  
  
三连漏洞蓝队防御指南  
  
CVE-2025-68664  
CVSS 9.3  
  
CVE-2026-34070  
CVSS 7.5  
  
CVE-2025-67644  
CVSS 7.3  
  
事件摘要  
  
2026年3月27日，Cyera Research 发布"LangDrained"协同披露报告，揭示 LangChain 和 LangGraph 中存在三个高危/严重级别安全漏洞：CVE-2025-68664（反序列化注入，CVSS 9.3）、CVE-2026-34070（路径遍历，CVSS 7.5）、CVE-2025-67644（SQL注入，CVSS 7.3）。攻击者可借助这三条独立路径，窃取文件系统数据、环境变量密钥及完整数据库对话记录。鉴于 LangChain 月均下载量超过 3000 万次，影响面极广，蓝队需立即响应。  
  
CVE-2025-68664  
CVSS 9.3 严重  
  
**漏洞类型：**  
反序列化注入  
**受影响组件：**  
langchain-core  
**修复版本：**  
≥ 0.3.81 / ≥ 1.2.5  
  
CVE-2026-34070  
CVSS 7.5 高危  
  
**漏洞类型：**  
路径遍历  
**受影响组件：**  
langchain-core  
**修复版本：**  
≥ 1.2.22  
  
CVE-2025-67644  
CVSS 7.3 高危  
  
**漏洞类型：**  
SQL注入  
**受影响组件：**  
langgraph-checkpoint-sqlite  
**修复版本：**  
≥ 3.0.1  
  
01  
  
漏洞全景：三条攻击路径  
  
LangChain 是全球使用最广泛的 AI Agent 编排框架（月均下载量 3000 万+），LangGraph 是其有状态多智能体工作流扩展。此次 Cyera Research 披露的"LangDrained"事件，发现了三个相互独立却可串联的漏洞，全面覆盖了 AI 应用的文件系统、运行时密钥和数据库三大核心资产。  
  
CVE-2025-68664：反序列化注入（最高危）  
  
LangChain 的dumps()/dumpd()序列化函数在处理用户输入字典时，未对保留键"lc"进行转义过滤。攻击者通过提示注入（Prompt Injection）让 LLM 在additional_kwargs/response_metadata中返回恶意结构，即可触发反序列化逻辑，窃取环境变量（API密钥、云凭据等）。  
  
🔗 攻击链（CVE-2025-68664）  
  
① 提示注入构造恶意lc键  
  
→  
② LLM 输出污染序列化数据  
  
→  
③ astream_events() 触发反序列化  
  
→  
④ 环境变量泄露 / RCE  
  
恶意 Payload 示例（已脱敏）  
  
# 攻击者注入 additional_kwargs 污染 LLM 输出  
  
{  
  
    
"additional_kwargs"  
: {  
  
      
"lc"  
: 1,  
  
      
"type"  
:  
"secret"  
,  
  
      
"id"  
: [  
"OPENAI_API_KEY"  
]     
# 目标：任意环境变量  
  
  }  
  
}  
  
  
# 当应用调用以下 API 时触发反序列化并泄露密钥  
  
async for  
event  
in  
chain.  
astream_events  
(...):  
  
    process(event)     
# ← 此处触发，OPENAI_API_KEY 已外泄  
  
CVE-2026-34070：路径遍历  
  
LangChain 的load_prompt_from_config()在加载外部提示模板文件（JSON/YAML/TXT）时，未对template_path/examples字段中的路径参数进行校验。攻击者可构造../../../路径遍历序列，直接读取服务器文件系统上的任意敏感文件。  
  
# 攻击者通过 API / 配置界面提交恶意提示模板  
  
{  
  
    
"input_variables"  
: [  
"query"  
],  
  
    
"template_path"  
:  
"../../../.docker/config.json"  
  
}  
  
  
# 目标敏感文件（示例）  
  
../../../etc/passwd  
  
../../../home/user/.aws/credentials  
  
../../../app/.env  
  
~/.kube/config  
  
CVE-2025-67644：LangGraph SQLite SQL注入  
  
LangGraph 的 SQLite 检查点（Checkpointer）在构造查询时，直接拼接元数据过滤键（key）至 SQL 语句，未进行参数化处理。攻击者通过向检查点搜索功能注入恶意过滤键，可绕过访问控制，获取全部用户的对话历史、工作流状态及业务敏感数据。  
  
# 正常查询  
  
filter = {  
"user_id"  
:  
"alice"  
}  
  
  
# 恶意过滤键（key注入）  
  
filter = {  
"user_id') OR '1'='1"  
:  
"dummy"  
}  
  
  
# 拼接后的 SQL（可 Dump 全库对话）  
  
SELECT  
*  
FROM  
checkpoints  
  
WHERE  
metadata->>  
'user_id') OR '1'='1'  
=  
'dummy'  
  
02  
  
影响范围评估  
  
以下人群和场景受此次漏洞影响，蓝队需结合自身情况快速评估暴露面：  
  
AI Agent / Chatbot 应用  
🔴 严重  
  
受影响包：  
langchain-core < 0.3.81  
触发条件：使用 astream_events()  
  
提示模板动态加载  
🟡 高危  
  
受影响包：  
langchain-core < 1.2.22  
触发条件：用户可控 template_path  
  
多轮对话 / 工作流持久化  
🟡 高危  
  
受影响包：  
langgraph-checkpoint-sqlite < 3.0.1  
触发条件：元数据过滤开放给用户  
  
云原生 AI 平台（K8s/ECS）  
🔴 严重  
  
受影响包：  
全部受影响版本  
触发条件：环境变量挂载密钥  
  
⚠️ 高危风险警示  
  
CVE-2025-68664 具备"提示注入→密钥泄露"的完整攻击链，不需要任何代码层漏洞配合，仅需向 LLM 发送精心构造的提示词即可触发。这意味着即使应用代码本身无漏洞，只要依赖了受影响版本的 langchain-core，就处于被动攻击面中。云环境中通过环境变量注入的 OPENAI_API_KEY、AWS_SECRET_KEY 等关键凭据面临直接泄露风险。  
  
03  
  
蓝队应急响应 Checklist  
  
按优先级分级执行，P0 为立即处理（1小时内），P1 为当天完成，P2 为本周内完成。  
  
P0 · 立即执行（1小时内）  
  
🔴 紧急升级 · 版本核查  
  
☐ 检查 langchain-core 版本：确认是否低于 0.3.81 或 1.2.5  
☐ 检查 langgraph-checkpoint-sqlite 版本：确认是否低于 3.0.1  
☐ 执行紧急升级（见下方命令）  
☐ 升级完成后重启所有 AI 服务实例  
  
# ① 快速版本检查  
  
pip show langchain-core | grep Version  
  
pip show langgraph-checkpoint-sqlite | grep Version  
  
  
# ② 一键批量升级（生产环境请先在测试环境验证）  
  
pip install --upgrade \  
  
  langchain-core>=1.2.22 \  
  
  langgraph-checkpoint-sqlite>=3.0.1 \  
  
  langchain-community>=0.0.28  
  
  
# ③ 验证升级结果  
  
pip list | grep -E "langchain|langgraph"  
  
P1 · 当天完成（安全加固）  
  
🟡 配置加固 · 代码审计  
  
☐**禁用 secrets_from_env**  
：新版本已默认关闭，确认配置未显式开启  
☐**审查 load_prompt_from_config() 调用点**  
：确保 template_path 参数不来自用户输入  
☐**审查 LangGraph 检查点元数据过滤逻辑**  
：避免过滤键直接由用户提供  
☐**轮换所有环境变量密钥**  
（OPENAI_API_KEY / AWS / GCP / 数据库密码）  
☐**排查访问日志**  
：检查是否存在异常的 astream_events() 调用或文件读取行为  
  
代码加固示例  
  
# ✅ 防御 CVE-2025-68664 - 升级后默认安全，无需额外配置  
  
# 但如果使用 loads() 反序列化，显式限制允许的对象类型  
  
from  
langchain_core.load  
import  
loads  
  
  
safe_obj = loads(  
  
    data,  
  
    secrets_map={},                
# 不允许读取任何密钥  
  
    valid_namespaces=[  
"langchain_openai"  
,  
"langchain_core"  
]    
# 白名单  
  
)  
  
  
# ✅ 防御 CVE-2026-34070 - 路径白名单校验  
  
import  
os  
  
from  
pathlib  
import  
Path  
  
  
def  
safe_load_prompt(template_path: str, base_dir: str =  
"/app/prompts"  
):  
  
    resolved = Path(base_dir).resolve() / template_path  
  
      
if  
not  
str(resolved).startswith(str(Path(base_dir).resolve())):  
  
          
raise  
PermissionError  
(  
f"路径越界访问被拦截: {template_path}"  
)  
  
      
return  
load_prompt_from_config(str(resolved))  
  
  
# ✅ 防御 CVE-2025-67644 - 元数据键白名单  
  
ALLOWED_FILTER_KEYS = {  
"user_id"  
,  
"session_id"  
,  
"thread_id"  
}  
  
  
def  
safe_search_checkpoints(filters: dict):  
  
      
for  
key  
in  
filters:  
  
          
if  
key  
not in  
ALLOWED_FILTER_KEYS:  
  
              
raise  
ValueError  
(  
f"非法过滤键: {key}"  
)  
  
      
return  
checkpointer.list(config, filter=filters)  
  
P2 · 本周内完成（纵深防御）  
  
🟢 长期加固 · 纵深防御  
  
☐ 部署提示注入检测中间件（拦截含 "lc" 键结构的 LLM 响应）  
☐ 将密钥迁移至 Vault / AWS Secrets Manager，避免通过环境变量直接暴露  
☐ 启用 AI 应用网络出口白名单（阻断外联数据渗漏）  
☐ 将 LangChain/LangGraph 依赖纳入 SCA（软件成分分析）持续扫描  
☐ 对数据库 Checkpointer 启用行级访问控制（RLS），限制跨用户数据访问  
☐ 建立 AI 框架安全公告订阅机制（GitHub Security Advisories）  
  
04  
  
版本修复对照表 & 升级路径  
  
langchain-core  
  
受影响：  
< 0.3.81（0.x 分支）  
安全版本：  
≥ 0.3.81  
修复漏洞：  
CVE-2025-68664  
  
langchain-core  
  
受影响：  
< 1.2.5（1.x 分支）  
安全版本：  
≥ 1.2.5  
修复漏洞：  
CVE-2025-68664  
  
langchain-core  
  
受影响：  
< 1.2.22  
安全版本：  
≥ 1.2.22  
修复漏洞：  
CVE-2026-34070  
  
langgraph-checkpoint-sqlite  
  
受影响：  
< 3.0.1  
安全版本：  
≥ 3.0.1  
修复漏洞：  
CVE-2025-67644  
  
langchain-community  
  
受影响：  
< 0.0.28  
安全版本：  
≥ 0.0.28  
修复漏洞：  
CVE-2025-2828（SSRF）  
  
langgraph-checkpoint  
  
受影响：  
< 3.0  
安全版本：  
≥ 3.0  
修复漏洞：  
CVE-2025-64439（RCE）  
  
* CVE-2025-64439（LangGraph JsonPlusSerializer RCE，CVSS 7.4/8.5）系 2025年11月单独披露，langgraph-checkpoint ≥ 3.0 已同步修复。  
  
05  
  
AI 框架安全：趋势研判  
  
LangDrained 事件揭示了 AI 编排框架安全的三个系统性隐患，值得蓝队长期关注：  
  
① 提示注入 × 反序列化 = 新型复合攻击链  
  
CVE-2025-68664 开创了"提示注入提权至主机密钥"的攻击范式。传统安全工具无法检测此类攻击——它发生在 LLM 的输出语义层，而非网络层或代码层。这要求 AI 安全检测必须理解模型输出的语义结构。  
  
② AI 中间件的攻击面等同于基础设施  
  
LangChain 月均下载量超 3000 万，已成为 AI 应用的隐式基础设施。与 Log4Shell 类似，一个框架级漏洞可横向影响数以万计的依赖应用。AI 框架需要与操作系统、数据库同等级别的安全治理体系。  
  
③ 检查点持久化 = 新型数据库攻击面  
  
LangGraph 的多轮对话检查点机制存储了用户的完整对话上下文，价值等同于用户数据库。CVE-2025-67644 表明，检查点存储层必须按照数据库安全标准进行防护（参数化查询、行级访问控制、审计日志）。  
  
06  
  
参考链接  
  
原始报告  
Cyera Research · LangDrained: 3 Paths to Your Data  
  
https://www.cyera.com/research/langdrained-3-paths-to-your-data-through-the-worlds-most-popular-ai-framework  
  
CVE-2025-68664  
LangChain Deserialization Injection — NVD  
  
https://nvd.nist.gov/vuln/detail/CVE-2025-68664  
  
CVE-2026-34070  
LangChain Path Traversal — NVD  
  
https://nvd.nist.gov/vuln/detail/CVE-2026-34070  
  
CVE-2025-67644  
LangGraph SQLite SQL Injection — NVD  
  
https://nvd.nist.gov/vuln/detail/CVE-2025-67644  
  
修复公告  
langchain-ai/langchain · GitHub Security Advisories  
  
https://github.com/langchain-ai/langchain/security/advisories  
  
修复公告  
langchain-ai/langgraph · GitHub Security Advisories  
  
https://github.com/langchain-ai/langgraph/security/advisories  
  
延伸阅读  
The Hacker News · LangChain/LangGraph Flaws Expose Files and Keys  
  
https://thehackernews.com/2026/03/langchain-langgraph-flaws-expose-files.html  
  
—— 技术分享，实战为本 ——  
  
海狼风暴团队将持续深耕新疆网络安全社区  
  
与行业爱好者交流互进，共同推动地域网络安全水平发展  
  
Hacking Group 0991B（海狼风暴团队）  
  
关注我们，技术路上不迷路  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
