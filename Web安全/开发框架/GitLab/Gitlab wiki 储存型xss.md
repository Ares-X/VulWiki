Gitlab wiki 储存型xss
=====================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

-   1、登录到GitLab。

-   2、打开有权编辑Wiki页面的'Project'。

-   3、打开Wiki页面。

-   4、点击'New page'。

-   5、用'javascript:'填写'Page slug'表单。

-   6、点击'Createpage'。

-   7、填写每个表格：

```{=html}
<!-- -->
```
    Title: javascript:

    Format:Markdown

    Content: [XSS](.alert(1);)

![](./.resource/Gitlabwiki储存型xss/media/rId24.png)
