XDCMS 3.0 后台友情链接sql注入
=============================

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 3.0

三、复现过程
------------

![](./.resource/XDCMS3.0后台友情链接sql注入/media/rId24.jpg)

友链title和url部分过滤函数成功防御了XSS，但对SQL过滤不全，关键代码如下：

    system/modules/link/admin.php
    public function addsave(){
        $title=safe_html($_POST['title']);
        $url=safe_html($_POST['url']);
        if(empty($title)||empty($url)){
            showmsg(C('material_not_complete'),'-1');
        }
        $this->mysql->db_insert('link',"`title`='".$title."',`url`='".$url."',`inputtime`='".datetime()."',`is_lock`=0");
        showmsg(C('add_success'),'index.php?m=link&c=admin');
    }
    safe_html()
    function safe_html($str){
        if(empty($str)){return;}
        $str=preg_replace('/select|insert | update | and | in | on | left | joins | delete |\%|\=|\/\*|\*|\.\.\/|\.\/| union | from | where | group | into |load_file
    |outfile/','',$str);
        return htmlspecialchars($str);
    }

经检测，后台多处存在与上面原理相同SQL注入，不再一一记录。
