---
cve: "CVE-2024-45219"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】Apache CloudStack 模板验证绕过漏洞CVE-2024-45219   
cexlife  飓风网络安全   2024-10-17 21:06  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02gFk1NXySJyibl7HCOlKYCeJkiaUNu01ibKy2yNrpbCRvzUibBBL0KWcaNicuqSm0icRolXrU1mYkcmtHQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述：**Apache CloudStack是开源的基础设施即服务云计算软件,支持包括 KVM在内的多种虚拟化技术,受影响版本中，由于缺少对上传和注册的 KVM 兼容模板和存储卷的验证,在启用配额功能的情况下,攻击者可以通过上传或注册恶意模板或卷,部署恶意实例,或将上传的卷附加至现有KVM 实例上,从而利用该漏洞访问宿主机的文件系统,修复版本中,通过引入对QCOW2文件的严格验证机制防止外部文件引用以修复漏洞。**影响范围：**  
  
cloudstack   
 生态：linux  
  
仓库类型  
unmanaged  
受影响的版本  
[4.19.0.0, 4.19.1.2)  
最小修复版本  
4.19.1.2  
  
仓库类型  
unmanaged  
受影响的版本  
[4.0.0, 4.18.2.4)  
最小修复版本  
4.18.2.4  
  
**参考链接:**https://lists.apache.org/thread/ktsfjcnj22x4kg49ctock3d9tq7jnvlohttps://cloudstack.apache.org/blog/security-release-advisory-4.18.2.4-4.19.1.2/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
