---
cve: "CVE-2026-27654"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】Nginx ngx_http_dav_module堆缓冲区溢出漏洞(CVE-2026-27654)  
e安在线
                    e安在线  e安在线   2026-04-14 02:08  
  
**漏洞描述**  
  
  
  
NGINX是一款高性能、轻量级的开源Wеb服务器与反向代理服务,广泛用于静态资源托管、负载均衡、API网关、缓存加速等场景,支持HTTP/HTTPS、WеbDAV、HTTP/3等多种协议,具备高并发、低资源占用、模块化扩展等特性是全球互联网主流的服务端基础软件,被政企、云厂商、互联网企业大量部署,其nɡх_http_dav_module为WebDAV扩展模块,提供文件COPY/MOVE/DELETE等管理能力,常用于文件服务与协同场景。  
  
  
该漏洞源于处理WebDAV协议的MOVE或COPY方法时,ngx_http_map_uri_to_path函数对Destination头部进行路径映射时出现无符号整数下溢导致堆缓冲区溢出,该漏洞影响使用dav_methods启用COPY或MOVE方法、结合前缀location（非正则表达式）和alias指令的配置场景。攻击者可利用该漏洞通过构造特殊HTTP请求实现任意文件读写、部署Webshell并最终达成远程代码执行（RCE）,或造成NGINX worker进程崩溃导致拒绝服务。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9k7aFUibBvMibyIATzxTFzdgvLgfWt7EjBj3NTf1Efo3Cj6tF3WQ38k2zibcJic4RsfmH2GtzNDsWMmVR10IxeoKGQx4wquNN40TnM/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9mlf2oGC1GcywZlrX3xX5fYOM41yibwROCgvHxFZ2WiaHVpWVFrqg2v4gua1UPPtSKoepQL1WzgicQmTRicKib0FDSicDAsIGGOeuOoo/640?wx_fmt=png&from=appmsg "")  
  
  
  
**攻击场景**  
  
  
  
攻击者需针对启用了ngx_http_dav_module模块的Nginx服务器发起攻击。  
  
  
特定配置下,当服务器配置了alias指令定义位置块,且该位置块启用了dav_methods COPY或dav_methods MOVE指令,并使用了前缀位置（非正则表达式匹配）时,攻击者可构造恶意的 HTTP请求,在Destination头部中注入特殊路径数据。  
  
  
利用该漏洞,攻击者可触发 ngx_http_map_uri_to_path函数中的无符号整数下溢,进而引发堆缓冲区溢出。  
  
  
  
**影响产品**  
  
  
  
1、 0.5.13 <= NGINX Open Source <= 0.9.7  
  
  
2、 1.0.0 <= NGINX Open Source < 1.28.3  
  
  
3、 1.29.0 <= NGINX Open Source < 1.29.7  
  
  
4、 R32 <= NGINX Plus < R32 P5  
  
  
5、 NGINX Plus R33 所有版本  
  
  
6、 NGINX Plus R34 所有版本  
  
  
7、 R35 <= NGINX Plus < R35 P2  
  
  
8、 R36 <= NGINX Plus < R36 P3  
  
  
  
**修复建议**  
  
  
  
官方已发布安全补丁,请及时更新至最新版本:  
  
NGINX Oреn Sоurсе 1.* >= 1.28.3  
  
NGＩNX Oреn Sоurсе 1.29.* >= 1.29.7  
  
NGINX Pluѕ R32 >= R32 P5  
  
NGINX Pluѕ R35 >= R35 P2  
  
NGINX Pluѕ R36 >= R36 P3  
  
  
**下载地址：**  
  
****  
https://my.f5.com/manage/s/article/K000160382  
  
  
**缓解方案：**  
  
****  
1.若业务无需WеbＤAV,立即移除dаv_mеthоｄs指令或完全禁用nɡх_ http_dav_module模块（推荐 dav_methods PUT DELETE MKCOL;）  
  
  
2.临时将 alias指令替换为root指令,或避免 alias与DAV方法组合使用  
  
  
**建议措施：**  
  
****  
立即升级补丁（首选）:  
  
将 NGINX Open Source 升级至 1.28.3 及以上或 1.29.7 及以上版本。  
  
  
将 NGINX Plus 升级至对应修复版本：R32 >= P5, R35 >= P2, R36 >= P3。（注意：R33 和 R34 所有版本均受影响，必须升级）。  
  
  
下载地址请参考官方知识库文章：https://my.f5.com/manage/s/article/K000160382  
  
  
  
  
**临时缓解方案（若无立即升级条件）**  
  
  
  
禁用 WebDAV 功能：如果业务不需要文件管理功能，立即移除配置文件中的 dav_methods 指令，或直接禁用 ngx_http_dav_module 模块。推荐配置为仅保留必要的 PUT DELETE MKCOL 方法，避免使用 COPY 和 MOVE。  
  
  
修改配置结构：检查并调整 Nginx 配置，避免在同一 location 块中同时使用 alias 指令和 dav_methods 指令。可将 alias 替换为 root 指令，或重构 URL 路径结构，确保不再满足漏洞触发的四个必要条件（启用模块、alias 指令、dav_methods COPY/MOVE、前缀位置）。  
  
  
**加强监控与检测：**  
  
  
在 WAF 或入侵检测系统（IDS）中部署针对 WebDAV 协议异常流量的规则，重点监控包含超长 Destination 头部的 MOVE 和 COPY 请求。  
  
  
监控 Nginx 进程日志，关注是否有大量 worker 进程异常重启或崩溃的情况。  
  
  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9ks2S7YyVjibxoRBdKNkibAPl33wDVo30yIaIm2B4nGIsNdQzbibjficu6atyOaF6qh5R9LX0YuHPJ1cLlmPv3ngNG4jOTvqxnq0nk/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9nw9cWKLSibwrNDOFWnWtbwI2CawRsT0GwgeeA4gtmv7tFp5fhlPRRRsRVQIUfrkO7pic6TMGtdHlSDX7QhmiatTflAib89e66DynM/640?wx_fmt=png&from=appmsg "")  
  
  
声明：除发布的文章无法追溯到作者并获得授权外，我们均会注明作者和文章来源。如涉及版权问题请及时联系我们，我们会在第一时间删改，谢谢！文章来源：飓风网络安全  
  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Hxdb7gjfn9n1evibupM123E2cpa8rrfBSvc1TMeNxribicRC5HicLicRRUSQPbs6GfAAqCzPaqfpzrpUD2CWMmQ4fhg4XXsZqJ9HssTibwW2Diagts/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9lD9c78ysCo8jZQrDOcQHLLy938yAEvUxQvFU0TRrCJnHB82YZupRL6fSINN1PylpRIZx7ORXZE1ddbHuL2XWaITYHpHKBaExs/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Hxdb7gjfn9mOawKjYKibkuN2icwlEXhZzZmj3s7CJe1TPd2HkJQ0S6h3cYeViaxiciamQTvh6anjDnUzia5kqUz815GFycuU7d4o8xQJic42hWyiaB0/640?wx_fmt=png&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
