---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Nginxwebui后台命令执行审计   
uname  黑伞安全   2024-04-03 17:56  
  
本文首发先知：https://xz.aliyun.com/t/14227  
## 前言  
  
半年前，审计过一次这套代码，那时候想着后台有命令执行的功能点，就没关注rce，审计了一些别的水洞。这次hookdd没事，说审计了一个rce，说一起看看，所以这次就只看rce，最后就有个以下几个洞。本次使用的3.9.8版本，但是刚刚更新了3.9.9，不过看描述，并没有修复一下几个点，应该都可以使用。  
#### 0x01 zip自解压  
  
com.cym.controller.adminPage.MainController#upload  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLOFaVECzJTM6wcbyJRoKTWOz7jAiaaPNzypvrPdQfdQYjB3OJjeia2SOg/640?wx_fmt=png&from=appmsg "")  
  
功能比较简单，可以看见把tmpdir+'/'+文件名拼接，然后保存进去，没有限制后缀，其实限制不限制都能r掉。其中FileUtil.getTmpDir()会获取系统的临时目录，mac系统为  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLfwWBOYrQ9EFQBGvvibkaEfoYJRShObeK0o83tY5xQMAn07ic1AHZJ9Aw/640?wx_fmt=png&from=appmsg "")  
  
ubuntu系统的临时目录为/tmp。  
  
对应的前端功能点  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLqTl7jYFSW9NUFKFScDU4G8Ix55lEhHz2ZnY6IaCowKuibDLv5uADZKA/640?wx_fmt=png&from=appmsg "")  
  
前端这里是限制了zip上传，但是我们看后端是没有判断的，直接会把上传的文件放到临时目录。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLq60AYHZrCYJy5NVRLBT7896v1Trkd20ibErtQgHszicIrTczgrqWjKAA/640?wx_fmt=png&from=appmsg "")  
  
当我们选择好目录时，他会调用com.cym.controller.adminPage.WwwController#addOver进行处理  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLOZXnm8A8zxaicenvVr4IZSH6QuVicfFicz8OC7SPUQchVQSuES1gq4MiaA/640?wx_fmt=png&from=appmsg "")  
  
可以看到，我们能控制解压目录，以及需要解压的文件，最后调用zip进行解压。那么其实很简单了，TmpDir()我们知道，文件名知道，我们只需要上传一个ssh密钥到.ssh目录下就可以了。  
#### 复现  
  
先选择要上传的zip文件  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLQltqsIFG71t2f08qJ4q7RsoMGhic2XC5EcsribWfGDWebc8iaJxFZaicIw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLdRKLyIZtwm4ZRGy84ia6x8KHcSIjGRInQibBicJicuTAgZibC9dTOZzSCQw/640?wx_fmt=png&from=appmsg "")  
  
可以看到以及上传到tmp目录，这是macos的，ubuntu在/tmp下  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLyh1JSlT21HYLq11ugSY6gyylMhVic0GwoLvrkSicib6c50pIHblPcVZmg/640?wx_fmt=png&from=appmsg "")  
  
选择好ssh目录。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLfxsGorbqcZpohYrVMVdwsZdhuQicSebwBQKiaHMXCrJTVR30y7qCBdmw/640?wx_fmt=png&from=appmsg "")  
  
对应数据包。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLdVk1t85lVNPDCickh20wdOLqd3FIiaia4IZozWDyCSh95qUrg5IfFFwKg/640?wx_fmt=png&from=appmsg "")  
  
最后直接调用zip解压到ssh目录  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLJfy9LqRgbUAzT7icqMIiaP90hWkRzwGSbce7NqMABNCP6TUCIn6t1nXg/640?wx_fmt=png&from=appmsg "")  
  
成功解压到ssh  
  
最后也是使用公钥直接登录  
### 0x02 zip目录穿越  
  
上面那种方法，其实只能打一次，因为在zip解压的时候会在数据库查询，钥匙已经同目录穿过，会抛出异常。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLwDMPzpuoP7MiaPicfGZerU1kkQDnmic4DOxBnLqanBibXFus2UrcpSzX2g/640?wx_fmt=png&from=appmsg "")  
  
com.cym.controller.adminPage.WwwController#addOver  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL0RAn0QTZzlo1PIWIIOa1rlE3bCniadPg2aAbD584G7iaJLssib7ILYvZw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLxjzNkVvicI064LNqpIAqV7QiaPcnsibiaBpo3WPbLKzxFPMLgJexUPopKA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLK84YBXXA60o4pwjuk06244MVxic5tt5MAuCZhMCN03A8HYLO5ht1GQw/640?wx_fmt=png&from=appmsg "")  
  
这里可以清楚得看到，会在sql里面查询上传目录是否存在，存在就抛出异常。这里有两种解决办法，第一种就是传入ssh的id，使其能正常修改目录的文件内容  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLe9wFHibLECVPR1OFria99R6rTB0nb3INRdic59LsktNTWGibNLdStooprQ/640?wx_fmt=png&from=appmsg "")  
  
id可以直接f12获得，  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL9uflMOt62TCJzccNRhbWuPulfQvQjvInq0sXW80aPcYJ3iajuJ8Ct5w/640?wx_fmt=png&from=appmsg "")  
  
填入后就可以正常穿  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLibDxkQVlVenSaFOCWqzD895W3Jat6b6neWLb8miafvic0gS1uZ1gtfXaw/640?wx_fmt=png&from=appmsg "")  
  
第二种就比较暴力cn.hutool.core.util.ZipUtil#unzip(java.util.zip.ZipFile, java.io.File, long)  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLchblrvUJf6cDicFvpV6NwQ65pd2UhzJt3Diasz6lj7mj0JumricXtGS5g/640?wx_fmt=png&from=appmsg "")  
  
zipentry没有对../过滤。zip解压时是没有对zip目录穿越进行过滤的，所以可以利用zip目录穿越来传文件，dir保证是没有使用过的就行。  
#### 复现  
  
上传zip_slip.zip  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLMsoc0Igpq7oAqEicO7hHmE6PNN7hsUVsficDgmYic9PllfDSUjGtAEO0Q/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLOjEMwwQpEZUvDO0vCDaibEic8dBudoTEhc0GhXLY2xVGxVbLey5KiaWjg/640?wx_fmt=png&from=appmsg "")  
  
得到路径  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLyfQUm6icbHkNeq9TACA0tNSv7RfQibVBKEAxIxOcQiad4CbMAtaOSnibvA/640?wx_fmt=png&from=appmsg "")  
  
上传时显示路径重复，这时我们dir任意写一个本地存在的目录，确保数据库没有就行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLQOYTRg5aSsY9giaVcnFjrYoORnXVzPzs7IQSibqJhLrX5cAHqA94Gp1w/640?wx_fmt=png&from=appmsg "")  
  
最后成功上传。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLb7ewOSTYqia2c1YibW2tn3Ky0Sgsibce1ORX3S6NlTUqyWYxZhscLILtQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL0RJsRQRoVTxCZNOmArfcOrh9p8icuHsrSnEiaiaVew6leIYmAOf93Ab1A/640?wx_fmt=png&from=appmsg "")  
  
数据库里面的状态。  
### 0x03 runcmd绕过造成命令执行  
  
com.cym.controller.adminPage.ConfController#runCmd  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLNk5Bs0mUWjfyiaaib8QC2RdJRp9U7ib3ssC9natcMPpub0iclicjGvPJu8w/640?wx_fmt=png&from=appmsg "")  
  
可以看到穿进来的cmd先进行过滤，在进行拼接执行。com.cym.controller.adminPage.ConfController#isAvailableCmd  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLkdEa4KhE4iaVTUdpyicIeaOlmFypry5OiaMckrgAOiamshp468mSh45bUg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLTTW2aaupHqWZlLn1oNLbUY2tARpJx3qJ1M2vxOQTz2v7VpicGpWC9bw/640?wx_fmt=png&from=appmsg "")  
  
可以先读取nginxPath、nginxExe、nginxDir三个值，首先判断在不在case里面，不在就进入if，主要就是判断cmd和settingService.get("nginxExe") + " -c " + settingService.get("nginxPath") + dir是不是想等，不想等就不执行，想等就执行com.cym.controller.adminPage.ConfController#saveCmd  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL7zwGjwPEadAKh6BZDN3HHTBcpoibb3fQwNMAYdDLRTAsHtf581LNz8A/640?wx_fmt=png&from=appmsg "")  
  
而刚好这三个值我们可自由控制。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL8xuqt1TxG7OJAf4gQQwKa14BR7fRiclUjCYQZ8VlMd3oltpkAWCKicfA/640?wx_fmt=png&from=appmsg "")  
  
它会对传值进行过滤，其实看看很好绕过。linux用$(IFS)代替空格就行，win用powershell.exe(calc) 就行  
#### 复现  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLaV0CluaIcKKic4rr2z82J5axWj4pSatP6A43fm1zubicwgkWkTsYp0Iw/640?wx_fmt=png&from=appmsg "")  
  
先修改两个值  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLhAC7ImlZKicBIic4PvjYhOal2VAfQV8paILocIrm2ALjbUc5FWuyIu9w/640?wx_fmt=png&from=appmsg "")  
  
成功执行  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLqzYlTUdzSibhL7ybzqDhbmx0icTePLE8c4WljSsB3YsWAGxZsIqiccIoA/640?wx_fmt=png&from=appmsg "")  
  
可以执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLbBNPueUDHjwC4ylIAwTgibib0LUQib2kHJicZShS5ia182vHjUodPOze9Pw/640?wx_fmt=png&from=appmsg "")  
  
由于有过滤，所以我们可以把reserveshell写进文件，在用bash来执行就好。利用前面分析得，上传点自动缓存到tem目录，ubuntu为/tmp目录.。强烈建议不要用macos这傻逼每个shell环境里面var/folders/ln/sjz_zm513ng125ngw6c2b_lm0000gn都不一样。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLvm7mqAgIQz5dbDicD0XGonHv1DxzNoO6WOJrK8oZoyjyP48ZQcBHxAw/640?wx_fmt=png&from=appmsg "")  
  
换ubuntu后，成功rce  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLd2vWdjmFPXsaUQR3Qb6ibLGHdddKibuXv0lMeaibLXRicfwIM8NSeOUxmA/640?wx_fmt=png&from=appmsg "")  
### 0x04 reload 代码执行  
  
com.cym.controller.adminPage.ConfController#reload  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLz3Ta3tR1LAib7AqTic3Ezib47kkMrlyTADAPUkjDW2h7WqpQq9ibo5UEqQ/640?wx_fmt=png&from=appmsg "")  
  
没什么好说的，全可控，没有过滤。然后拼接，进行执行。cn.hutool.core.util.RuntimeUtil#exec(java.lang.String...)  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLM75hickXuRLJecPDwrNGuSSgDZPwt1L4o5BGSh65AJ0f1I41cia0ohSg/640?wx_fmt=png&from=appmsg "")  
  
最后会调用到这里，和上面不同，这里是代码执行  
#### 复现  
  
生成java格式代码执行  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLolMBKkfhotP9joUJjibqSNV5hicsAVfYwibFjwbSAcQAq4E0e47ibnQnOg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLNfvSwyTMDvLPrCdjuKiafASYmde27KpbWP680ibDnRibTdv8KWjP1FYDg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL8KdKtlibiaPsrIibiaRPhbo4O42peQmFtcFKMoqjKL5dfYWnFlkQ8ibzwMQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLL9DwF3WGnAGNjvgFWRPGPMWL3icht8teWNB8RjtD67LxYGp00iakZIaQ/640?wx_fmt=png&from=appmsg "")  
  
成功获取shell  
### 0x05 check 代码执行  
  
com.cym.controller.adminPage.ConfController#check  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLAcnxdSdaFktdqgWVohcu1JnbSjob0zSDfpHAibuHtr0WJdsYVdtNlRA/640?wx_fmt=png&from=appmsg "")  
  
同理，全可控，且没过滤最后会走到execforstr(),然后造成代码执行  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLKIGoicIAM63Zc8Mazhc1lNv2Gr77ERjX8ibTUiavyTibRBibSLpoDxxiaWWA/640?wx_fmt=png&from=appmsg "")  
  
我们只需要对nginxExe赋值就行，json保持默认，其余不填即可  
#### 复现  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLyoV0QBI53CLn9Xx8IBut73LOZFJic2g2ojVTxjQrYqUUKKHKe3TlYNg/640?wx_fmt=png&from=appmsg "")  
  
生成java反弹payload  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLL0muIyvU1rkmO0l52JQbbsMeRAJISicymmMGhDJWUUnMOoHCslASVMEA/640?wx_fmt=png&from=appmsg "")  
  
成功rce  
#### 修复建议  
  
1.过于linux空字符，如${IFS}等2.转义命令中的所有shell元字符，shell元字符包括 #&;`,|*?~<>^()[]{}$\。3.不使用时禁用相应命令，bash，sh，dash等直接创建shell的命令。4.检查 Zip 压缩包中使用 ZipEntry.getName() 获取的文件名中是否包含 ../ 或者 ..。5.严格判断输入，nginxpath、nginxeExe，nginxdir，其中path和dir应检查是否为目录，nginxExe可开启白名单，活着直接写死。6.文件上传建议采取后端校验，存储到tem目录时建议检查../以及文件后缀名。7.zip解压目录建议用户不可控，直接写死  
  
  
如果你是一个长期主义者，欢迎加入我的知识星球,我们一起冲，一起学。每日都会更新，精细化运营，微信识别二维码付费即可加入，如不满意，72 小时内可在 App 内无条件自助退款。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ZS0VQrDMfGoa1Yh6UHSvgToDQcqx7RLLnJIWwnw3z5JvaexDaclyMwMial9BMOBqkJESSKALIQHIL6T2xTV9GKw/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
