---
cve: "CVE-2026-40519"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞速递】Nginx Proxy Manager远程代码执行漏洞（CVE-2026-40519）  
原创 sw0rd1ight
                    sw0rd1ight  剑指安全   2026-06-22 16:23  
  
# 漏洞简介  
  
由于程序backend/setup.js文件的setupCertbotPlugins () 函数未对用户可控的 dns_provider_credentials参数进行安全过滤与转义，具有certificates:manage权限的攻击者可通过dns_provider_credentials字段中写入恶意载荷，当后端重启后实现任意命令执行。  
  
Nginx Proxy Manager 是基于 Nginx 打造的可视化反向代理管理工具，支持可视化配置转发规则、访问限制、SSL 证书部署与自定义 Nginx 参数，主流以 Docker 容器快速部署。内置 Certbot 证书工具，可自动申请、续签免费 SSL 证书，常被个人、小微企业用于内网服务、网站项目的公网代理发布。  
  
受影响版本：  
  
2.9.14 <= Nginx Proxy Manager <= 2.15.1  
  
漏洞防护：  
  
目前官方暂未发布更新修复此漏洞，请受影响的用户关注新版本动态并及时更新，下载链接：https://github.com/NginxProxyManager/nginx-proxy-manager/releases  
  
PoC公开：https://github.com/NginxProxyManager/nginx-proxy-manager/issues/5478  
  
参考链接：  
  
https://nvd.nist.gov/vuln/detail/CVE-2026-40519  
# 漏洞要点分析  
  
其实是很简单的漏洞，开发者其实知道写的这个功能可能会存在命令注入，所以自己也有做了一些防范和过滤，只不过有心无力，连续两次replaceAll只是表面看起来有效，实际就是个绣花枕头  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LZBR0aDZ77ibRvPjNEHAEX022lYBkYrZuqs5e4lIjf0avqVejGToWoEPhKZwa8LviaZficUDu2Uia3rfFaPMXOtntPt6kbU9ouwr0r4mcmUxrdk/640?wx_fmt=png&from=appmsg "")  
  
让大模型画了一个原理图  
  
![](https://mmbiz.qpic.cn/mmbiz_png/LZBR0aDZ77icAiaTRJOEGJNWLv1jbx3CAQaevVYicknSdKt5ekcfhMvZyB4Rx1LbSF9Tc4YJuZD6Ifz3e1icN6QQOxxFMHrEIepGuGlBDmZVjhM/640?wx_fmt=png&from=appmsg "")  
  
ps： 现阶段的开发者或多或少有点安全意识，但是看到过滤什么的不要就直接放弃，尝试去进行绕过就能有新的发现  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
