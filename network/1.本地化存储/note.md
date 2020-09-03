[toc]
# 本地化存储

## cookie

- 为什么有cookie?
  - http是上下文无关协议，即无状态协议

- cookie特点
  1. cookie不可跨域
  2. cookie存储在浏览器中
  3. cookie有数量和大小的限制
     - 数量在50个左右，大小在4kb左右
  4. cookie的存储时间非常灵活
  5. cookie不光可以服务器设置，客户端也可以设置

- document.cookie
  - 可读可写
  - 在http协议下打开才能看到cookie

- cookie属性
  1. name cookie的名字，唯一性
  2. value cookie的值
  3. domain 设置cookie在哪个域下是有效的
  4. path 设置cookie的路径
  5. expires 诞生于http1.0，cookie的过期时间，是绝对时间
  6. max-age 诞生于http1.1，cookie的有效时间，单位为秒，是相对时间
    - -1，表示该cookie是临时的，退出浏览器就没有了
    - 0，表示要删除该cookie
    - 正数，表示cookie的有效期（生命周期）
  7. HttpOnly 前端无法获取有这个标记的cookie
  8. Secure 设置cookie只能通过https协议传输
  9. SameSite 设置cookie在跨域请求的时候不能被发送.


## localstorage

- 
  - Web Storage 做本地化存储
  - cookie的存储空间是4kb左右，web storage是5mb左右,chrome能存10mb左右
  - 不需要在http下存储，协议不限
  - localstorage没有时间限制，不会过期，需要手动删除
  - 应用：搜索历史的存储，购物车功能，游戏的本地存储数据等等

- 
  - localStorage本地存储；sessionStorage会话存储，有时间限制，浏览器关了就没了
  - localStorage以字符串形式存储，如果获取的时候希望得到对象，可用JSON的方法

- storage事件
```js
window.addEventListener('storage', function (e) {
  e.key // 修改的是哪个localStorage（名字key）
  e.newValue // 修改后的是数据
  e.oldValue // 修改前的数据
  e.storageArea // storage对象
  e.url // 返回操作的那个页面的url
})
```