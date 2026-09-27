# 孚盟云AjaxMethod.ashx SQL注入漏洞

# 一、漏洞简介
孚盟与阿里强强联手将最受青睐的经典C系列产品打造成全新的孚盟云产品，让用户可以用云模式实现信息化管理，让用户的异地办公更加流畅，大大降低中小企业在信息化上成本，用最小的投入享受大型企业级别的信息化服务，使中小企业在网络硬件环境、内部贸易过程管理与快速通关形成一套完整解决方案。

# 二、影响版本
+ 孚盟云CRM

# 三、资产测绘
+ hunter`app.name="孚盟云 CRM"`
+ 登录页面


# 四、漏洞复现
```plain
/Ajax/AjaxMethod.ashx?action=getEmpByname&Name=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xubb5blcky307d56>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
