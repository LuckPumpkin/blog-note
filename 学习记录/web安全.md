# web安全
常见的攻击方式
* sql注入
* xss
* CSRF
* 点击劫持
* 中间人攻击

1、sql注入(比较简单的攻击)
> 后台人员用用户输入的数据来组装sql查询语句的时候不做防范

sql语句增加过滤分组

2、xss(跨站脚本攻击)
> 通过代码注入的方式

防御
* 字符转义

& 替换为：&	
< 替换为：&lt;	
> 替换为：&gt;	
” 替换为："	
‘ 替换为：&#x27;	
/ 替换为：&#x2f;

> 链接中如果存在 javacript: 开头的协议，点击链接时浏览器会执行后面的代码 (src属性)
所以光转义没有用，需要对url协议进行白名单控制,只允许http, https, mailto等安全协议
但是富文本不能用这么粗暴的方式转换,这时候应该用白名单进行过滤标签/属性。

* CSP , Content Security Policy
本质也是设置白名单

防御：
>设置 HTTP Header 中的 Content-Security-Policy
设置 meta 标签的方式 

3、CSRF 跨站请求伪造( Cross Site Request Forgery)
借用用户的身份或权限偷偷的完成某些操作
借助了 cookie 的特性

eg:
我们登录了某个 http://tao.com 购物网站之后，cookie 就会有登录过的标记了。
此时请求http://tao.com/pay?id=123&money=1000， 是会带着 cookie 的，server 端就知道已经登录了。
如果在http://tao.com去请求其他域名的 API ,  例如http://tx.com/api时，是不会带 cookie 的，这是浏览器同源策略的限制。
但是此时在其他域名的页面中，请求http://tao.com/pay?id=123&money=1000，就会带着tao.com的 cookie 。

防御：
加入各层级权限验证；
涉及现金交易，要输入密码或者扫码验证；
敏感接口要使用post请求而不是get请求。


4、点击劫持
在操作按钮上加一层透明的iframe

防御：
* 使用Http头防御
通过配置 nginx 发送 X-Frame-Options 响应头，这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。 这样浏览器就会阻止嵌入网页的渲染。
响应头可选值： Deny 不允许通过iframe展示，sameorigin 相同域名下通过iframe展示，allow-from：指定的iframe中展示。

* javascript防御
判断顶层视口的域名是不是和本页的域名一致，不一致自动跳转到本站对的网页。

5、中间人攻击

防御：
确保当前你所访问的网站使用了HTTPS
如果你是一个网站管理员，你应当执行HSTS协议
不要在公共Wi-Fi上发送敏感数据
如果你的网站使用了SSL，确保你禁用了不安全的SSL/TLS协议。
不要点击恶意链接或电子邮件。
