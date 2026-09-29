---
cve: "CVE-2023-41599"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  根据POC分析代码   
 赤弋安全团队   2025-02-17 00:00  
  
POC：  
```
https://github.com/wy876/POC/blob/main/JFinalCMS/JFinalCMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E(CVE-2023-41599).md
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9ydNZfgkO7zibyspicXhAML4nicBk4q3vFewFfSoiaVryDlibPWvdF3f59HA/640?wx_fmt=png&from=appmsg "")  
  
根据 POC 找到相对应的接口。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9SKN9EysicuOJk1WSENWfqpPokVX9WHbmWJ8mBpEuslkHJJHEdS9Wz9Q/640?wx_fmt=png&from=appmsg "")  
  
找到接口之后，点击进入相对应的 java 文件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9e0oRheFF6Dh16TDrFVfRyQC5HaO8jESaibxQXnGib43r6DA9v1YsSDwg/640?wx_fmt=png&from=appmsg "")  
  
这里 file() 方法也被拼接接口，应该是系统自己封装的方法，接着我们点击进入getPara  
。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9ARJc3sgoAiblT4WF6PXatDBcjz8bc84bAribhygOgk6dE8xKQficpq1ibA/640?wx_fmt=png&from=appmsg "")  
  
很明显，这里就是使用了request.getParameter  
，获取了当前参数fileKey  
。  
  
接下来就是分析 renderFile  
函数，点击进去，然后定位代码位置。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9XTQClrGticBNx7en3QgNm4azJVL275POCL8IOxJ4wFveuHDx78cmdVQ/640?wx_fmt=png&from=appmsg "")  
  
很明显是自己封装的方法，我们直接网上搜索，查看它的文档。  
```
https://jfinal.com/doc/3-8
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9R1naz9yduS7ePJp1Xy0oPP6a3IhSFFZicYzZsMQicELicibUjVnOroyrKQ/640?wx_fmt=png&from=appmsg "")  
  
可以看出，此方法就是用于下载文件的。  
  
接下来分析getWebRootPath()  
方法。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9WXV6p9nUIzJnw2mEvs8oqgpszXfFdWuORbH8wwziceI7zcJYbkqKd9Q/640?wx_fmt=png&from=appmsg "")  
  
这里显示，如果根路径为空，就让路径等于detectWebRootPath()  
。  
  
继续点击去detectWebRootPath()  
方法。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9ha41lstialcVzCII2XZzGtgtbYzib0VWVD17Gfpb28fQP20VyusJRlgQ/640?wx_fmt=png&from=appmsg "")  
  
此方法就是用来识别 web 根路径。  
  
接下来，打上断点，进行调试。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9FkkyIcmkLYTp7rTVgJSgiapZUytSlOMwDCkxqnW5KLn3Cf1BGmbd8fg/640?wx_fmt=png&from=appmsg "")  
  
fileKey=/../1.txt  
，继续下一个断点，进入 File()方法。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs95h9sec2pia1F4uu3ZcF54hQaKic6uaRJoLjw81hhpLz1vHGTyAGRztibg/640?wx_fmt=png&from=appmsg "")  
  
调试得到根路径。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9icaC93N3zjzn3zXodxeHg9ICrdNUwJk1BGlE5meIiabaBmQfKyicYacaQ/640?wx_fmt=png&from=appmsg "")  
  
成功读取到文件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Tb6OwBlojE9l8genYQbiasb6yV5QdXZs9691BAyJWvMaTv7abIGNun4NaYiaLLiayjGicf372ZRZsZygNn88mjRmdA/640?wx_fmt=png&from=appmsg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
