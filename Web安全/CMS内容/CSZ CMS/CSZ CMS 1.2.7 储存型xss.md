---
source: "hatch 补库批 20260928"
product: "CSZ CMS"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CSZ CMS 1.2.7 储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：1.2.7; active user sends PM; recipient pm_sendmail=1; email_logs=1; admin visits dashboard"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a751c8d90e337d48f5c4d7b7"
entity_id: "ve-a751c8d90e337d48f5c4d7b7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.2.7; active user sends PM; recipient pm_sendmail=1; email_logs=1; admin visits dashboard

- **适用与权限边界（1）**：Intro 'unauthorized user' conflicts with created active user and session-dependent PM code。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：Critical configuration prerequisites visible in source omitted from walkthrough。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：Bare alert(1) is not sufficient HTML-context XSS payload as printed; exact payload lost with images。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：DB insert incorrectly located in system/core/Input.php; SQL escaping confused with XSS protection。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（5）**：Numbered screenshot placeholders missing rendered content。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CSZ CMS 1.2.7 储存型xss

一、漏洞简介
------------

拥有访问私有消息的未授权用户可以向管理面板嵌入Javascript代码。

二、漏洞影响
------------

CSZ CMS 1.2.7

三、复现过程
------------

### 漏洞分析

查看数据库中的email\_logs可知，将访问的user-agent存储到了数据库中1.png

我们首先观察路由，漏洞点在/member/insertpm页面，查看控制器，找到cszcms/controllers/Member.php

2.png找到insertpm方法：

3.png关注点在下半部分：

\$this-\>input-\>post即是调用的system/core/Input.php的post方法：

4.png当\$xss\_clean的参数设置为true，则会进行xss过滤，这也是为什么发送信息处并没有出现xss

继续看，\$this-\>Csz\_auth\_model-\>send\_pm方法位于cszcms/models/Csz\_auth\_model.php中的send\_pm():

    /**
         * Send multiple Private Messages
         * Send multiple private messages to another users
         * 
         * @param array $receiver_ids Array of User ids of private message receiver 
         * @param string $title Title/subject
         * @param string $message Message
         * @param int $sender_id User id of private message sender
         * @param string $re_message Reply the original message
         * 
         * @return array/bool Array with User ID's as key and TRUE or a specific error message OR FALSE if sender doesn't exist
         */
        public function send_pm($receiver_ids, $title, $message, $sender_id = '', $re_message = '') {
            if (!$sender_id) {
                $sender_id = $this->session->userdata('user_admin_id');
            }
            if ($sender_id && (!$this->is_useractive($sender_id))) {
                return FALSE;
            }else{
                if ($receiver_ids && is_numeric($receiver_ids) && $sender_id != $receiver_ids) {
                    if($re_message){ 
                        $message = '{[' . str_replace("\r\n" . "\r\n", "\r\n", $re_message) . "]} " . "\r\n" . "\r\n" . $message;
                    }
                    $data = array(
                        'sender_id' => $sender_id,
                        'receiver_id' => $receiver_ids,
                        'title' => $title,
                        'message' => $message,
                        'date_sent' => date('Y-m-d H:i:s')
                    );
                    $this->db->insert('user_pms', $data);
                    $sender_user = $this->Csz_admin_model->getUser($sender_id);
                    $receive_user = $this->Csz_admin_model->getUser($receiver_ids);
                    if($receive_user->pm_sendmail == '1'){
                        $config = $this->Csz_model->load_config();
                        $message_html = 'Dear ' . $receive_user->name . ',<br><br>' . $message . '<br><br>Best Regards,<br>'.$sender_user->name;
                        @$this->Csz_model->sendEmail($receive_user->email, '[PM] ' . $title . ' ('.$config->site_name.')', $message_html, $sender_user->email, $sender_user->name);
                    }
                    return TRUE;
                }else{
                    return FALSE;
                }
            }
        }

调用了@\$this-\>Csz\_model-\>sendEmail方法，位于cszcms/models/Csz\_model.php，我们继续跟进：

    public function sendEmail($to_email, $subject, $message, $from_email, $from_name = '', $bcc = '', $reply_to = '', $alt_message = '', $attach_file = array(), $save_log = TRUE) {
            $this->load->library('email');
            $load_conf = $this->load_config();
            $protocal = $load_conf->email_protocal;
            if (!$protocal) {
                $protocal = 'mail';
            }
            $config = array();
            $config['useragent'] = $this->Csz_admin_model->cszGenerateMeta();
            $config['protocol'] = $protocal;  /* mail, sendmail, smtp */
            if ($protocal == 'smtp') {
                $config['smtp_host'] = $load_conf->smtp_host;
                $config['smtp_user'] = $load_conf->smtp_user;
                $config['smtp_pass'] = $load_conf->smtp_pass;
                $config['smtp_port'] = $load_conf->smtp_port;
            } else if ($protocal == 'sendmail' && $load_conf->sendmail_path) {
                $config['mailpath'] = $load_conf->sendmail_path;
            }
            $config['mailtype'] = 'html';
            $config['charset'] = 'utf-8';
            $config['wordwrap'] = TRUE;
            $this->email->initialize($config);
            $this->email->set_newline("\r\n");
            $this->email->from($from_email, $from_name); // change it to yours
            $this->email->to($to_email); // change it to yours
            $this->email->subject($subject);
            $this->email->message($message);
            if ($bcc) {
                $this->email->bcc($bcc);
            }
            if($reply_to){
                $this->email->reply_to($reply_to);
            }
            if ($alt_message) {
                $this->email->set_alt_message($alt_message);
            }
            if (is_array($attach_file) && !empty($attach_file)) {
                foreach ($attach_file as $value) {
                    $this->email->attach($value, 'attachment');
                }
            }
            if ($this->email->send()) {
                $result = 'success';
            } else {
                $result = $this->email->print_debugger(FALSE);
            }
            if($save_log === TRUE && $load_conf->email_logs == 1){
                $data = array(
                    'to_email' => $to_email,
                    'from_email' => $from_email,
                    'from_name' => $from_name,
                    'subject' => $subject,
                    'message' => $message,
                    'email_result' => $result,
                );
                $this->db->set('user_agent', $this->input->user_agent(), TRUE);
                $this->db->set('ip_address', $this->input->ip_address(), TRUE);
                $this->db->set('timestamp_create', $this->timeNow(), TRUE);
                $this->db->insert('email_logs', $data);
                $this->db->cache_delete_all();
                unset($data);
            }
            unset($to_email, $subject, $message, $from_email, $from_name, $bcc, $reply_to, $alt_message, $attach_file, $save_log, $config, $load_conf, $protocal);
            return $result;
        }

关键就在于后面的数据库操作：

    $this->db->set('user_agent', $this->input->user_agent(), TRUE);
            $this->db->set('ip_address', $this->input->ip_address(), TRUE);
            $this->db->set('timestamp_create', $this->timeNow(), TRUE);
            $this->db->insert('email_logs', $data);
            $this->db->cache_delete_all();

\$this-\>db-\>set方法位于：system/database/DB\_query\_builder.php：

    /**
     * The "set" function.
     *
     * Allows key/value pairs to be set for inserting or updating
     *
     * @param   mixed
     * @param   string
     * @param   bool
     * @return  CI_DB_query_builder
     */
    public function set($key, $value = '', $escape = NULL)
    {
        $key = $this->_object_to_array($key);

        if ( ! is_array($key))
        {
            $key = array($key => $value);
        }

        is_bool($escape) OR $escape = $this->_protect_identifiers;

        foreach ($key as $k => $v)
        {
            $this->qb_set[$this->protect_identifiers($k, FALSE, $escape)] = ($escape)
                ? $this->escape($v) : $v;
        }

        return $this;
    }

简单理解即为插入或更新值作初始化

继续，\$this-\>input-\>user\_agent()位于：system/core/Input.php，其具体实现如下：

    /**
     * Fetch User Agent string
     *
     * @return  string|null User Agent string or NULL if it doesn't exist
     */
    public function user_agent($xss_clean = NULL)
    {
        return $this->_fetch_from_array($_SERVER, 'HTTP_USER_AGENT', $xss_clean);
    }

这里的xss过滤操作默认是null，也就是没有过滤

这就是问题所在，我们即可以通过篡改user\_agent的值实现xss，往下看，`$this->db->insert('email_logs', $data)`即向emali\_logs表插入数据，`$this->db->insert`实现如下（system/core/Input.php）：

    /**
         * Insert
         *
         * Compiles an insert string and runs the query
         *
         * @param   string  the table to insert data into
         * @param   array   an associative array of insert values
         * @param   bool    $escape Whether to escape values and identifiers
         * @return  bool    TRUE on success, FALSE on failure
         */
        public function insert($table = '', $set = NULL, $escape = NULL)
        {
            if ($set !== NULL)
            {
                $this->set($set, '', $escape);
            }

            if ($this->_validate_insert($table) === FALSE)
            {
                return FALSE;
            }

            $sql = $this->_insert(
                $this->protect_identifiers(
                    $this->qb_from[0], TRUE, $escape, FALSE
                ),
                array_keys($this->qb_set),
                array_values($this->qb_set)
            );

            $this->_reset_write();
            return $this->query($sql);
        }

依然没有任何过滤

然而，关于为什么登入后台即会弹窗，搜索一番后发现，开发者直接将其echo出来（cszcms/views/admin/home.php）：

5.png

6.png

### 漏洞复现

新建一个用户1.png

点击inbox发送私信，选定管理员用户

2.png修改User-Agent为`alert(1)`3.png

管理员登陆后台即触发xss4.png

参考链接
--------

> https://xz.aliyun.com/t/7730\#toc-6
