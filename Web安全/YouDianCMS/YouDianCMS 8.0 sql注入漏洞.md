YouDianCMS 8.0 sql注入漏洞
==========================

一、漏洞简介
------------

二、漏洞影响
------------

YouDianCMS 8.0

三、复现过程
------------

### 漏洞分析

需要先登录此漏洞。页面可以注册。

<http://localhost/youdiancms/index.php/public/reg/l/cn>

在这里登录

漏洞位置位于index.php/member/customer/index搜索栏

未筛选搜索的关键字，导致sql注入漏洞

/App/Lib/Action/Member/CustomerAction.class.php：

    function saveModify(){
        header("Content-Type:text/html; charset=utf-8");
        $this->_checkPost( $_POST );
        unset( $_POST['InviterID'], $_POST['IsEnable']);
        $m = D('Admin/Member');
        $inviterID = $m->where("MemberID={$_POST['MemberID']}")->getField('InviterID');
        //检查当前MemberID是否自己的客户
        if( $inviterID == session('MemberID')){
            if( $m->create() ){
                if($m->save() === false){
                    $this->ajaxReturn(null, '修改失败!' , 0);
                }else{
                    $this->ajaxReturn(null, '修改成功!' , 1);
                }
            }else{
                $this->ajaxReturn(null, $m->getError() , 0);
            }
        }else{
            $this->ajaxReturn(null, '数据异常' , 0);
        }
    }

漏洞点在:

        $inviterID = $m->where("MemberID={$_POST['MemberID']}")->getField('InviterID');

上述代码直接将POST带入进了where子查询。

### 复现

POC：

    URL：http://www.0-sec.org/index.php/Member/Customer/saveModify
    POST：MemberName=xxxxx&MemberID=[SQL]

四、参考链接
------------

> <https://blog.csdn.net/qq_36093477/article/details/98035255>
>
> <http://www.f4ckweb.top/index.php/archives/45/>
