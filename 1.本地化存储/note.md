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
  9. SameSite 设置cookie在跨域请求的时候不能被发送