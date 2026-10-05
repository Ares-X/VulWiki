---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Nginxwebui后台命令执行审计"
product: "nginxWebUI"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Authenticated backend; tested3.9.8;3.9.9 applicability inferred not tested; filesystem/service permissions"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8e26e18cb9099ad2c606f2ae"
entity_id: "ve-8e26e18cb9099ad2c606f2ae"
schema_version: "1"
---

# Nginxwebui后台命令执行审计

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Authenticated backend; tested3.9.8;3.9.9 applicability inferred not tested; filesystem/service permissions
- 证据范围：Five distinct audit paths, mostly source/request/result screenshots; retain independent research

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Do not elevate speculative3.9.9 applicability to confirmed affected range
- All relevant code and requests mostly image-only; extract text before canonical reuse
- Command execution mislabeled 'code execution' merely because Runtime.exec is used
- Text says $(IFS), later${IFS}; distinguish typo and actual tested input
- SSH login via writable authorized_keys depends SSH settings/service UID; not automatic universal root
- Remediation list is concatenated, typo-heavy and relies on blacklist snippets; prefer vendor patch/validated canonical path containment
- No CVE/fixed build/commit mapping; separate intended admin functionality from privilege boundary failure

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

uname  黑伞安全   2024-04-03 17:56  
  
本文首发先知：https://xz.aliyun.com/t/14227  
## 前言  
  
半年前，审计过一次这套代码，那时候想着后台有命令执行的功能点，就没关注rce，审计了一些别的水洞。这次hookdd没事，说审计了一个rce，说一起看看，所以这次就只看rce，最后就有个以下几个洞。本次使用的3.9.8版本，但是刚刚更新了3.9.9，不过看描述，并没有修复一下几个点，应该都可以使用。  
#### 0x01 zip自解压  
  
com.cym.controller.adminPage.MainController#upload  
  
![](../../.resource/remote/f37837b8f2e86c1178702aee6a5aefba7bb1d66da5bc2e755a661182245893cf.png "")  
  
功能比较简单，可以看见把tmpdir+'/'+文件名拼接，然后保存进去，没有限制后缀，其实限制不限制都能r掉。其中FileUtil.getTmpDir()会获取系统的临时目录，mac系统为  
  
![](../../.resource/remote/55942db51ad99ce3172ddeac6331bd869eec3cc8bee96eabd642c44e6033d00e.png "")  
  
ubuntu系统的临时目录为/tmp。  
  
对应的前端功能点  
  
![](../../.resource/remote/79d13155871b52acfa5d00056d650e7cfd7370040b50dfea75612061c9ba2149.png "")  
  
前端这里是限制了zip上传，但是我们看后端是没有判断的，直接会把上传的文件放到临时目录。  
  
![](../../.resource/remote/d1a6481a3cc508587404d6ded1baf89e5da599e115e1d120227ed3d74a12340b.png "")  
  
当我们选择好目录时，他会调用com.cym.controller.adminPage.WwwController#addOver进行处理  
  
![](../../.resource/remote/0c7cdda45fb8b1aba5a2f9f7d31a2880c18d51e3cfb9442805ed0fca0a468cc9.png "")  
  
可以看到，我们能控制解压目录，以及需要解压的文件，最后调用zip进行解压。那么其实很简单了，TmpDir()我们知道，文件名知道，我们只需要上传一个ssh密钥到.ssh目录下就可以了。  
#### 复现  
  
先选择要上传的zip文件  
  
![](../../.resource/remote/d691e9f4b9977e49a9a66722fccbf4b6379e1c4862d655fa32861e3d4885a57c.png "")  
  
![](../../.resource/remote/e21917622673272f148ac1f5179cf74e27cfba1d8e815ca7b1d09a1f9d82cfaa.png "")  
  
可以看到以及上传到tmp目录，这是macos的，ubuntu在/tmp下  
  
![](../../.resource/remote/7ea36b476c1a4c38ac2abcb0859ab8b7ccc5e02f6ca265a6fe95d117910d47da.png "")  
  
选择好ssh目录。  
  
![](../../.resource/remote/b2efd8d97e7a3b2aa164d636c7b7a412b9a31091c6b86afd32ae295615380001.png "")  
  
对应数据包。  
  
![](../../.resource/remote/dd1c9937bd6ba54579153c86e1d65ce1676b3268a4f97ecb3a710c958aaee469.png "")  
  
最后直接调用zip解压到ssh目录  
  
![](../../.resource/remote/3cab0d22dd806b92ccb3097d257b6c87838a9eb9735357c70e27b09c612f32c5.png "")  
  
成功解压到ssh  
  
最后也是使用公钥直接登录  
### 0x02 zip目录穿越  
  
上面那种方法，其实只能打一次，因为在zip解压的时候会在数据库查询，钥匙已经同目录穿过，会抛出异常。  
  
![](../../.resource/remote/0fc829781cd49c28bb53a4de59670fc7088dc43ed41cf2b9c89a6cd623e2ff54.png "")  
  
com.cym.controller.adminPage.WwwController#addOver  
  
![](../../.resource/remote/b96ffd25b06cceb583de027b1defb5f0e0bba1b65dc7d2e9da4ce0199e5bc65b.png "")  
  
![](../../.resource/remote/f012ed05a47e12f25d39c3f58ae3a58f691cd624fb91ca37eadc18a5963313ca.png "")  
  
![](../../.resource/remote/e6483c9ac3cb3ee6c838674baa5273ac76e1aec52c739bb2945e6673087d496e.png "")  
  
这里可以清楚得看到，会在sql里面查询上传目录是否存在，存在就抛出异常。这里有两种解决办法，第一种就是传入ssh的id，使其能正常修改目录的文件内容  
  
![](../../.resource/remote/dcbe0dd17092682c68944ea76d7234208b4cc6237c0c508048cc5763cf9e8780.png "")  
  
id可以直接f12获得，  
  
![](../../.resource/remote/0f02f5bab3e5477802b3979c47ac67d08e8e8701806df0246a41f9a86f19c5f0.png "")  
  
填入后就可以正常穿  
  
![](../../.resource/remote/a44f8fb56e20e96b703dcd0581ae4957a9dc42dc1d138eea7997b34242935814.png "")  
  
第二种就比较暴力cn.hutool.core.util.ZipUtil#unzip(java.util.zip.ZipFile, java.io.File, long)  
  
![](../../.resource/remote/529cc953971eb8bcae468f5ace541bf5208c9a360c7d10d1d0a6d826d6646a2e.png "")  
  
zipentry没有对../过滤。zip解压时是没有对zip目录穿越进行过滤的，所以可以利用zip目录穿越来传文件，dir保证是没有使用过的就行。  
#### 复现  
  
上传zip_slip.zip  
  
![](../../.resource/remote/b4c20a680dbb4e244d89e384b4a9d50fdd02e47e8597302fbaee0aa2d3631d67.png "")  
  
![](../../.resource/remote/b30727582947667c7b4d74fc9785b4f437d4eb3e45f8202367a6478e07e2683a.png "")  
  
得到路径  
  
![](../../.resource/remote/b4c9df4537798f04721c88342909cbb687be40fb22e80cc45de69d892bc88cc5.png "")  
  
上传时显示路径重复，这时我们dir任意写一个本地存在的目录，确保数据库没有就行。  
  
![](../../.resource/remote/240ba81e9cc9d6617e616d7249d6e3f12f9888ef773daa068dd8520db80fb56b.png "")  
  
最后成功上传。  
  
![](../../.resource/remote/4eb20609f18c5d97eb80cfe9a093ef01fc84d83b87995d9b8bc1747fb9fab6c1.png "")  
  
![](../../.resource/remote/96b6729eff6b75c5a76644065f7e53fec2724145e97aabb66faf836dc786f79a.png "")  
  
数据库里面的状态。  
### 0x03 runcmd绕过造成命令执行  
  
com.cym.controller.adminPage.ConfController#runCmd  
  
![](../../.resource/remote/dd858dd141f0b9a2ab50fe90564f011ff7a4171faf42a3d80864e861828db129.png "")  
  
可以看到穿进来的cmd先进行过滤，在进行拼接执行。com.cym.controller.adminPage.ConfController#isAvailableCmd  
  
![](../../.resource/remote/d27569ddb9c83b87c2f44c063b60a039ba107b171e096d3a4fabc8b52ab91045.png "")  
  
![](../../.resource/remote/ddddc120a612837d6fcf1f67f4aa3377ecaa0f0ed7c3eb98cb2e6021301e8594.png "")  
  
可以先读取nginxPath、nginxExe、nginxDir三个值，首先判断在不在case里面，不在就进入if，主要就是判断cmd和settingService.get("nginxExe") + " -c " + settingService.get("nginxPath") + dir是不是想等，不想等就不执行，想等就执行com.cym.controller.adminPage.ConfController#saveCmd  
  
![](../../.resource/remote/3ab164da3a75eaf31df7c8331f9518959feb9214dbd785976d20651b4eab402d.png "")  
  
而刚好这三个值我们可自由控制。  
  
![](../../.resource/remote/a8c68d5d3692ed174eee59499c225e7a37133264ac76b5506528c24004b17e0f.png "")  
  
它会对传值进行过滤，其实看看很好绕过。linux用$(IFS)代替空格就行，win用powershell.exe(calc) 就行  
#### 复现  
  
![](../../.resource/remote/5cc41824128a662eb8164779b93c1784b2b29018eef6bbec35fe9a96ab8709f4.png "")  
  
先修改两个值  
  
![](../../.resource/remote/1dd069895a098f9ab88b9394817866d921e8b033db55e29907460d8ed0619f77.png "")  
  
成功执行  
  
![](../../.resource/remote/a082df8a63391ad62e9dbc7a6f3f0f142d8760f1c40a3ca45d74d6ebf9040d41.png "")  
  
可以执行。  
  
![](../../.resource/remote/e24e743233d401abc7b75e80816cc13e061cb9c86865c731f2b70ae9385a60f3.png "")  
  
由于有过滤，所以我们可以把reserveshell写进文件，在用bash来执行就好。利用前面分析得，上传点自动缓存到tem目录，ubuntu为/tmp目录.。强烈建议不要用macos这傻逼每个shell环境里面var/folders/ln/sjz_zm513ng125ngw6c2b_lm0000gn都不一样。  
  
![](../../.resource/remote/fb0804e05c0be162cdd76c9d0067169305c89b6b3504c5323af0372712079223.png "")  
  
换ubuntu后，成功rce  
  
![](../../.resource/remote/aef039cd460d4a1f342bfa0cb8719a1620869ad1ccdb182898a19c7264f8d914.png "")  
### 0x04 reload 代码执行  
  
com.cym.controller.adminPage.ConfController#reload  
  
![](../../.resource/remote/a24221322ce61778756a9b4cac8d4e567b200ecba284e3b3eae642a17decca33.png "")  
  
没什么好说的，全可控，没有过滤。然后拼接，进行执行。cn.hutool.core.util.RuntimeUtil#exec(java.lang.String...)  
  
![](../../.resource/remote/fcff0ecdc3b8a8d909f0f3c274a717fa837a4d770b3ec5bbf704065e3574ed00.png "")  
  
最后会调用到这里，和上面不同，这里是代码执行  
#### 复现  
  
生成java格式代码执行  
  
![](../../.resource/remote/181091a594bbf3a20980055e37e2b2bf1c9c0b01e4b7b46c5aa06f5eab626c22.png "")  
  
![](../../.resource/remote/cbe47de63019a41fc7c744fd78ddf1ccf2edb35726b7c95516b4d73cf9a58c14.png "")  
  
![](../../.resource/remote/362f3a33582b264473d77e5d2d127be7a385df539eef7cc28cafdb0992257214.png "")  
  
![](../../.resource/remote/aa26feacb03658516a64ebd1820e04a950e104657e8fb850af5cf6ff8a0c0195.png "")  
  
成功获取shell  
### 0x05 check 代码执行  
  
com.cym.controller.adminPage.ConfController#check  
  
![](../../.resource/remote/17daa6c3dd4643d372cd2130218dc9ab327b394e5e4bc656f3939c021a6f8b2a.png "")  
  
同理，全可控，且没过滤最后会走到execforstr(),然后造成代码执行  
  
![](../../.resource/remote/a765829fd37f24901916312454c0caaa618c5c9dc740ff0d5e2d196669810094.png "")  
  
我们只需要对nginxExe赋值就行，json保持默认，其余不填即可  
#### 复现  
  
![](../../.resource/remote/9d298873440d5f26c67956ea3be11288e1583663d96d1e776ec19f7bee97e089.png "")  
  
生成java反弹payload  
  
![](../../.resource/remote/e25f955d9de77abfea697812bec757ceeb8bd02cc14bb6b5e7f493b82de173bb.png "")  
  
成功rce  
#### 修复建议  
  
1.过于linux空字符，如${IFS}等2.转义命令中的所有shell元字符，shell元字符包括 #&;`,|*?~<>^()[]{}$\。3.不使用时禁用相应命令，bash，sh，dash等直接创建shell的命令。4.检查 Zip 压缩包中使用 ZipEntry.getName() 获取的文件名中是否包含 ../ 或者 ..。5.严格判断输入，nginxpath、nginxeExe，nginxdir，其中path和dir应检查是否为目录，nginxExe可开启白名单，活着直接写死。6.文件上传建议采取后端校验，存储到tem目录时建议检查../以及文件后缀名。7.zip解压目录建议用户不可控，直接写死  
  
  
如果你是一个长期主义者，欢迎加入我的知识星球,我们一起冲，一起学。每日都会更新，精细化运营，微信识别二维码付费即可加入，如不满意，72 小时内可在 App 内无条件自助退款。  
  
![](../../.resource/remote/e9af98a61c2d7e6b918ba0cbb5fafb80c420fd03fc0b1329ed9d105d4c01f109.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
