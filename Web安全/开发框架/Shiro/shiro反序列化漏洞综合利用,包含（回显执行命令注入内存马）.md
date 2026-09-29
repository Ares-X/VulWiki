---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  shiro反序列化漏洞综合利用,包含（回显执行命令注入内存马）  
SummerSec
                    SummerSec  W小哥   2026-01-16 03:34  
  
# ShiroAttack2  
  
   
### 一款针对Shiro550漏洞进行快速漏洞利用  
  
   
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZibygDrxFDFMbFfWw838siaQKOLL9sJ7tVTZlyiaOJ2nZ8SktLLU1bV2zg/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZSf3dXcQKX5TleJDkxYdaxglXKdgwVEpbuyg6Pk2qvuhvA11phibN2yg/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZvzvaDL2fl0O9QPfMnzGdictl8ibgW6jI8sRXm9qV1wthcY31MPM3eMsA/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZBN2PJ7TufYtGrZXy5iaNGJByccfFRtOAEpFMWYZ8y0xcXUUot10u6Wg/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZNjrZywjqBNcN1e1ej15BIvROWhTib8bkgeL4YsPl1LmLWeooorQ14gA/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZLUU3PPztllBpkSh7fHyMgnhmyj9vemOVO3c6euMG6TYe738G9g67vA/640?wx_fmt=png "")  
  
   
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZICp477SkfkhsdRK2IHpjuljQSJeaLSv5agXSIbDnlucsib6uyZH2tww/640?wx_fmt=png "")  
  
## 前言  
  
   
  
关于该工具更新内容介绍后续会更新到博客下面  
https://shiro.sumsec.me/  
## 工具特点  
  
   
  
·  
  
javafx  
  
·  
  
处理没有第三方依赖的情况  
  
·  
  
支持多版本CommonsBeanutils的gadget  
  
·  
  
支持内存马  
  
·  
  
采用直接回显执行命令  
  
·  
  
添加了更多的CommonsBeanutils版本gadget  
  
·  
  
支持修改rememberMe关键词  
  
·  
  
支持直接爆破利用gadget和key  
  
·  
  
支持代理  
  
·  
  
添加修改shirokey功能（使用内存马的方式）**可能导致业务异常**  
  
·  
  
支持内存马小马  
  
·  
  
添加DFS算法回显（AllECHO）  
  
·  
  
支持自定义请求头，格式：abc:123&&&test:123  
## FAQ 常见问题见  
  
   
  
FAQ  
## 使用方法  
  
   
  
直接使用shiro_attack-{version}-SNAPSHOT-all.jar第三版  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZM5GnmkNz775sicdGMibHwgTXntqYknTaWg6mawqIBRvweDDZ1yjDjJ3A/640?wx_fmt=png "")  
  
  
在jar的当前目录下创建一个data文件夹，里面创建一个shiro_keys.txt文件，文件内容是shiro_key。lib目前是CommonsBeanutils依赖的版本。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/y5xFHTW9iaNVXdSSIxtLUaV00jTO3GerZibLQhiaDicHBHe8aj02AQcTgWe2QoTsdUUN9zZUU6Mkr2YEJzibBfKibQ8Q/640?wx_fmt=png "")  
  
  
关注公众号回复“  
20260116  
”获取工具地址  
。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
