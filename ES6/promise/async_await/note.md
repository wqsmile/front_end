# async await

- 简化Promise api的使用，并非替代Promise

## async
- 简化在函数的返回值中对Promise的创建
- 被修饰函数的返回结果一定是一个Promise

## await
- 如果await的表达式不是Promise，则会将其使用Promise.resolve包装后按照规则运行