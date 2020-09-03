[toc]

# Promise

## Promise 基本特点

- Promise 不能消除回调，只是让回调变得可控
- unsettled 阶段一定是同步执行
- thenable 和 catchable 一定会先加入微任务队列中，再执行
- 未捕获的错误会先自动推向 reject 状态，执行 catchable 后再报错

## Promise 串联

- thenable 和 catchable 执行完毕后都会返回一个全新的 promise 对象

```js
const pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve(1);
  }, 3000);
});
const newPro = pro.then((data) => {
  setTimeout(() => {
    console.log(2);
  }, 2000);
  return data * 3;
});
console.log(newPro); // pending
newPro.then((data) => console.log(data, newPro)); // 3, fulfilled
```
