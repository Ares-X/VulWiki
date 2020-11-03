# VulWiki


> 基于零组公开漏洞库

## 如何添加新的文章

```
先检查本地仓库是否为最新版本
找到对应分类或新建分类,新建Markdown文件，文件名为漏洞标题
Markdown文件内添加漏洞详情 
图片保存到当前Markdown文件路径下的`.resource/文件名/mdeia/` 目录，Markdown插入时使用相对路径
按时间倒序在Change Log中添加修改的内容
```

![image.png](https://i.loli.net/2020/10/15/MF94bHBscvjU85t.png)



# Online Version

[VulWiki](https://ares-x.com/wiki) 



# Change Log



* 2020-10-28 添加s2-059,CVE-2020-14882 weblogic 未授权命令执行，（CVE-2020-14825）Weblogic反序列化漏洞

* 2020-10-21 添加RuoYi CMS 任意文件读取漏洞

* 2020-10-20 添加护网中的漏洞,CVE-2020-10189 Zoho ManageEngine反序列化RCE,Fastjson Payload汇总，修复%20造成的侧栏折叠问题

# To-do

- [x] 在线版本 

# Web安全

- [x] 添加护网中的漏洞

### 系统安全

**Windows本地提权漏洞**

- [ ] （CVE-2016-0099）【MS16-32】 windows 本地提权漏洞
- [ ] （CVE-2016-3225）【MS16-075】 JuicyPotato windows 本地提权漏洞
- [ ] （CVE-2019-0803）Win32K组件提权
- [ ] （CVE-2020-0787）Windows 本地提权漏洞
- [ ] （CVE-2020-1054）Windows 本地提权漏洞



**Linux**

- [ ] （CVE-2015-1328）Ubuntu Linux内核本地提权漏洞
- [ ] （CVE-2016-5195）脏牛Linux 本地提权
- [ ] （CVE-2017-7494）Linux Samba 远程代码执行
- [ ] （CVE-2017-16995）Ubuntu 内核提权
- [ ] （CVE-2019-13272）Linux 本地提权漏洞
- [ ] （CVE-2019-14287）sudo提权漏洞

**IOT安全**

- [ ]  Cisco

- [x] （CVE-2019-1663）Cisco 堆栈缓冲区溢出漏洞

- [ ] （CVE-2020-3452）Cisco ASA/FTD 任意文件读取漏洞

  - [ ]  Hikvision

- [ ] （CVE-2017-7921）Hikvision IP Camera Access Bypass

  - [ ]  Hisilicon

- [ ] （CVE-2020-24214）Buffer%20overflow: definite DoS and potential RCE

- [ ] （CVE-2020-24215）HiSilicon Backdoor password

- [ ] （CVE-2020-24216）RTSP 未授权访问

- [ ] （CVE-2020-24217）任意文件上传漏洞

- [ ] （CVE-2020-24218）root access via telnet

- [ ] （CVE-2020-24219）任意文件读取漏洞

  - [ ]  TP-Link

- [x] （CVE-2017-16957）TP-Link 命令注入漏洞

- [x] （CVE-2020-9374）TP-Link TL-WR849N 远程命令执行漏洞

  - [ ]  ZTE

- [ ] （CVE-2020-6871）ZTE R5300G4、R8500G4和R5500G4 未授权访问漏洞

  

- [ ] 默认设备密码
