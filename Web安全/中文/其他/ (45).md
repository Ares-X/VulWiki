---
cve: "CVE-2024-11958"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞分析】LlamaIndex SQL2RCE漏洞分析(CVE-2024-11958)  
原创 whoami0002  SecurityPaper   2026-01-12 09:38  
  
### 文章首发于先知社区：https://xz.aliyun.com/news/91091  
  
  
### 前言  
  
LlamaIndex 是领先的框架，可用于使用LLM和工作流在您的数据上构建 LLM 驱动的代理。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/iazag5vDeG2cY95B3vpO1ciaTQcG6NY09oCEK1DtBewdHGCWeGJ0xQj3G3qB13K9LaA6gaSkRTudQfbIuM51artA/640?wx_fmt=png&from=appmsg "")  
  
### 漏洞概述  
  
run-llama/llama_index 仓库中的 duckdb_retriever 组件存在 SQL 注入漏洞。该漏洞源于未使用预处理语句构建 SQL 查询，攻击者可利用此漏洞注入任意 SQL 代码。通过安装 shellfs 扩展并执行恶意命令，攻击者可以实现远程代码执行 (RCE)。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/iazag5vDeG2cY95B3vpO1ciaTQcG6NY09ozFyWBv0eOIFobkVqZVJghStcPnxZ0OBFaStz7OiacL9lgCRP31Wias2w/640?wx_fmt=png&from=appmsg "")  
  
### 漏洞分析/复现  
#### 补丁分析  
  
https://github.com/run-llama/llama_index/commit/35bd221e948e40458052d30c6ef2779bc965b6d0  
  
查看补丁，核心文件  
  
llama-index-integrations/retrievers/llama-index-retrievers-duckdb-retriever/llama_index/retrievers/duckdb_retriever/base.py  
  
![](https://mmbiz.qpic.cn/mmbiz_png/iazag5vDeG2cY95B3vpO1ciaTQcG6NY09oiaM2xMv9yzLIlzGz32I4n41AVA4UM5aCytcW3zibJL68ZMxMiaeuwbvMQ/640?wx_fmt=png&from=appmsg "")  
  
  
漏洞代码query_result = conn.execute(sql).fetchall() 直接执行拼接的SQL  
```
```  
  
修复后的代码,使用？占位符，query_result = conn.execute(sql, [query]).fetchall() 作为参数进行传递  
```
```  
#### 环境搭建  
  
安装相关依赖 pip install -r requirements.txt  
```
```  
  
构建测试环境  
  
web服务器  
```
```  
```
```  
  
启用web.py  
  
![](https://mmbiz.qpic.cn/mmbiz_png/iazag5vDeG2cY95B3vpO1ciaTQcG6NY09oAKHxhiaIJrZwJ6DVdbdcyuDibY6icgyJnDc14vxIMr9yHrmjTWVobI4YA/640?wx_fmt=png&from=appmsg "")  
  
#### shellfs扩展  
  
什么是shellfs？  
  
<font style="color:rgb(221, 17, 68);background-color:rgba(27, 31, 35, 0.05);">shellfs</font>  
扩展为 DuckDB 提供了使用 Unix 管道进行输入和输出的能力。  
  
通过在文件名后附加管道字符   
<font style="color:rgb(221, 17, 68);background-color:rgba(27, 31, 35, 0.05);">|</font>  
，DuckDB 会将其视为一系列要执行的命令，并捕获输出。相反，如果你在文件名前加上   
<font style="color:rgb(221, 17, 68);background-color:rgba(27, 31, 35, 0.05);">|</font>  
，DuckDB 会将其视为输出管道。  
#### 漏洞复现  
  
于是可以构建如下POC  
```
```  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/iazag5vDeG2cY95B3vpO1ciaTQcG6NY09ox8ian4ZZsvy1h0kfiacIVEGgMrRGKYyvALHPerQbJv7F7bfZA1BPJ1Ow/640?wx_fmt=png&from=appmsg "")  
### 参考链接  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-11958  
  
https://duckdb.org/community_extensions/extensions/shellfs  
  
https://github.com/run-llama/llama_index  
  
https://www.modb.pro/db/1814130920039919616  
### 免责声明  
  
本漏洞分析报告仅用于安全研究和防御目的。请勿将此信息用于任何非法活动。未授权测试他人系统属于违法行为，后果由使用者承担。  
#### 扫描二维码加入知识星球获取更多内容：  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/iazag5vDeG2eaxibeBNfPejSVIBK5HheVWVVbt63jOoa2qt4rP1yeWqL0fm2f26zNQTR0mDaKoDgjYyelLJPweIw/640?wx_fmt=jpeg "")  
  
[【已复现】jsPDF 本地文件包含/路径遍历 (CVE-2025-68428)](https://mp.weixin.qq.com/s?__biz=MzkwMDA5OTc0Mg==&mid=2247484240&idx=1&sn=4e68a176481fe4826c59368bd1af1e00&scene=21#wechat_redirect)  
  
  
[【已复现】MongoDB 未授权内存泄露漏洞（CVE-2025-14847）](https://mp.weixin.qq.com/s?__biz=MzkwMDA5OTc0Mg==&mid=2247484007&idx=1&sn=a4c572b1bf5d2bcd3c3f5e04a1ed6662&scene=21#wechat_redirect)  
  
  
[【已复现】CVE-2025-68613 n8n 表达式注入导致远程代码执行（RCE CVSS 10.0）](https://mp.weixin.qq.com/s?__biz=MzkwMDA5OTc0Mg==&mid=2247483810&idx=1&sn=29cb5155260cf55fd515d5e281230f61&scene=21#wechat_redirect)  
  
  
[已复现 帆软export/excel SQL注入漏洞](https://mp.weixin.qq.com/s?__biz=MzkwMDA5OTc0Mg==&mid=2247483752&idx=1&sn=fea1d3bd14c76ba3c5bb1eb40d0b07a2&scene=21#wechat_redirect)  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
