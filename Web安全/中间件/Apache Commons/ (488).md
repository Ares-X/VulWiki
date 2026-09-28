---
cve: "CVE-2025-48734"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】Apache Commons BeanUtils远程代码执行漏洞CVE-2025-48734   
cexlife  飓风网络安全   2025-05-29 10:46  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02WXsAEm4ML4PkDerdShNCh00iaIia5W5yjFdLnxEIpAOvzef2HHEo3I76AjZ04G4mGqsdpZyw5qyNA/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
在Apache Commons框架中,检测到存在不当访问控制漏洞于1.9.2版本引入了一个专门的BeanIntrospector类,其设计初衷是用于防范攻击者借助Java枚举对象的声明类属性获取类加载器的访问权限,然而,需要注意的是该保护机制在默认情况下并未启用。在当前版本中PropertyUtilsBean（以及由其衍生的BeanUtilsBean）默认禁止对声明类级别的属性进行访问操作。在1.11.0和2.0.0-M2版本中,成功解决了在不受控制的情况下访问枚举属性时可能引发的安全隐患,具体而言如果使用Commons BeanUtils的应用程序将来自外部源的属性路径直接传递给PropertyUtilsBean的getProperty()方法,攻击者便有可能通过所有Java“枚举”对象均具备的“declaredClass”属性来访问枚举的类加载器,一旦攻击者获取了对枚举“declaredClass”的访问权限,便能够进一步访问类加载器进而执行任意代码。同样,PropertyUtilsBean.getNestedProperty()方法也存在类似的安全风险。自1.11.0和2.0.0-M2版本起,一个特殊的BeanIntrospector发挥作用它能够抑制“declaredClass”属性,值得一提的是此新的BeanIntrospector在默认状态下处于启用状态,不过用户可根据实际需求选择禁用,以恢复旧有的行为模式,关于具体的操作细节,可查阅用户指南的2.5节以及相关单元测试文档。经确认此问题对ApacheCommons BeanUtils的特定版本用户产生影响,具体涉及1.x版本中低于1.11.0的版本以及2.x版本中低于2.0.0-M2的版本,对于使用commons-beanutils:commons-beanutils   
  
受影响产品或系统:  
  
2.0.0-M1 <= Apache Commons BeanUtils 2.x <= 2.0.0-M2  
  
1.0 <= Apache Commons BeanUtils 1.x <= 1.11.0  
  
修复建议:  
  
经确认.此问题对Apache Commons BeanUtils 的特定版本用户产生影响,具体涉及1.x版本中低于1.11.0的版本,以及2.x版本中低于2.0.0-M2的版本,对于使用commons-beanutils:commons-beanutils 1.x构件的用户强烈建议升级至1.11.0版本,该版本已针对此问题进行了有效修复,而对于使用org.apache.commons:commons-beanutils2 2.x构件的用户建议升级至2.0.0-M2版本,此版本同样已成功修复该安全问题  
  
补丁信息:  
  
补丁名称:Apache Commons BeanUtils  
  
补丁链接:https://github.com/apache/commons-beanutils  
  
参考链接:  
  
https://github.com/apache/commons-beanutils/commit/bd20740da25b69552ddef8523beec0837297eaf9  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
