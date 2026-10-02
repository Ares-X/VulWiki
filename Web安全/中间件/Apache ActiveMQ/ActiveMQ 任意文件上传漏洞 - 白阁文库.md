---
source: "MrWQ/vulnerability-paper"
title: "ActiveMQ 任意文件上传漏洞 - 白阁文库"
product: "Apache ActiveMQ Fileserver"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2016-3088"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2016-3088"
prerequisites: "旧Fileserver启用，可写目的路径；访问admin/api下JSP另需管理凭据"
source_url: "https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/"
source_status: "recorded"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-39927c0d676eb000b05c69a6"
entity_id: "ve-39927c0d676eb000b05c69a6"
schema_version: "1"
---

# ActiveMQ 任意文件上传漏洞 - 白阁文库

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：旧Fileserver启用，可写目的路径；访问admin/api下JSP另需管理凭据
- 证据范围：作者明确成功请求未截获、再次500，不能以500证明写入；有实验失败记录应保存

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 范围5.x至5.14.0与5.14移除Fileserver自相矛盾
- 192.168.1771.37非法IP
- MOVE段重复两遍、关键请求均在图片，正文缺载荷/路径
- 可关联完整85而不把失败描述伪装成独立成功证明

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.bylibrary.cn](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/)

> 白阁文库是白泽 Sec 团队维护的一个漏洞 POC 和 EXP 披露以及漏洞复现的开源项目，欢迎各位白帽子访问白阁文库并提出宝贵建议。

[](https://github.com/BaizeSec/bylibrary/blob/main/docs/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md "编辑此页")

#### ActiveMQ 任意文件上传漏洞 [¶](#activemq "Permanent link")

该漏洞出现在 fileserver 应用中，ActiveMQ 中的 fileserver 服务允许用户通过 HTTP PUT 方法上传文件到指定目录。Fileserver 支持写入文件 (不解析 jsp), 但是支持移动文件(Move) 我们可以将 jsp 的文件 PUT 到 Fileserver 下, 然后再通过 Move 指令移动到可执行目录下访问

使用 vulhub 一键搭建，靶机 kali：192.168.1771.37

环境搭建成功，浏览器访问：[http://IP:8161](http://ip:8161/)

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/1.png)

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/2.png)

登录 admin 账号：默认账号 admin/admin，抓包进行修改，使用 PUT 方法上传文件。ActiveMQ Web 控制台分为三个应用程序：其中 admin，api 和 fileserver，其中 admin 是管理员页面，api 是界面，fileserver 是用于存储文件的界面；admin 和 api 需要先登录才能使用，fileserver 不需要登录。

上传 jsp 文件（系统不稳定，有时成功有时失败），

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/3.png)

```shell
docker-compose up -d
```

使用 MOVE 方法移动文件，成功的包没截上，再次上传是 500 回显，文件已经上传成功，访问地址，成功解析 jsp

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/4.png)

使用 MOVE 方法移动文件，成功的包没截上，再次上传是 500 回显，文件已经上传成功，访问地址，成功解析 jsp

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/5.png)

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/6.png)

漏洞影响版本：Apache ActiveMQ 5.x ~ 5.14.0

1、ActiveMQ Fileserver 的功能在 5.14.0 及其以后的版本中已被移除。建议用户升级至 5.14.0 及其以后版本。

2、通过移除 `conf\jetty.xml` 的以下配置来禁用 ActiveMQ Fileserver 功能

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/ActiveMQ/ActiveMQ%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E/7.png)

* * *

最后更新: 2021-03-24

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
