const MyPromise = (function () {
  // Promise的状态
  const PENDING = "pending",
        FULFILLED = "fulfilled",
        REJECTED = "rejected",

        PromiseStatus = Symbol("PromiseStatus"), // Promise的当前状态
        PromiseValue = Symbol("PromiseValue"),
        changePromiseStatus = Symbol("changePromiseStatus"),
        setHandle = Symbol("setHandle"),
        linkPromise = Symbol("linkPromise"),

        thenables = Symbol("thenables"),
        catchables = Symbol("catchables");

  return class {

    constructor(executor) {
      this[PromiseStatus] = PENDING;
      this[PromiseValue] = undefined;
      // 后续处理函数的任务队列
      this[thenables] = [];
      this[catchables] = [];

      const resolve = data => {
        this[changePromiseStatus](FULFILLED, data, this[thenables]);
      };
      const reject = error => {
        this[changePromiseStatus](REJECTED, error, this[catchables]);
      }
      // 未捕获的错误由trycatch捕获并进入rejected状态
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }

    }


    /**
     * 
     * @param {*} thenable then的第一个后续处理
     * @param {*} catchable then的第二个后续处理
     */
    then(thenable, catchable) {
      // this[setHandle](FULFILLED, thenable, this[thenables]);
      // this.catch(catchable);
      return this[linkPromise](thenable, catchable)
    }
    catch(catchable) {
      // this[setHandle](REJECTED, catchable, this[catchables]);
      return this[linkPromise](undefined, catchable)

    }
    /**
     * 无论Promise处于什么状态，都将finalable添加到thenables和catchables中
     * @param {} finalble 
     */
    finally(finalble) {
      return this[linkPromise](finalble, finalble)
    }


    /**
     * 
     * @param {*} state 更新的状态
     * @param {*} value 更新的数据值
     */
    [changePromiseStatus](state, value, queue) {
      if (this[PromiseStatus] !== PENDING) return; // 状态一旦改变，就不能再改变
      this[PromiseStatus] = state;
      this[PromiseValue] = value;
      // 执行任务队列中的后续处理函数
      queue.forEach(handler => handler(value));
    }


    /**
     * 如果settled则立即执行后续处理函数，否则将后续处理函数添加至微队列任务中
     * @param {*} state 执行后续处理函数时Promise的状态
     * @param {*} handle 执行的后续处理函数
     * @param {*} queue 后续处理函数的任务队列
     */
    [setHandle](state, handle, queue) {
      if (typeof handle !== 'function') return;
      if (this[PromiseStatus] === state) {
        // 用定时器模拟thenable微队列时，如果后续处理函数返回的是Promise对象，
        // 则finally会先于该函数执行，因为定时器是宏事件，优先级低于宏事件
        // setTimeout(() => {
        //   handle(this[PromiseValue])
        // }, 0);
        // 这里用MutationObserver来模拟Promise的微队列，虽然MutationObserver是用来监听dom树变化的，不过也只能这样了~
        new MutationObserver(handle(this[PromiseValue]))
      } else {
        queue.push(handle);
      }
    }


    /**
     * Promise串联实现
     * @param {*} thenable 
     * @param {*} catchable 
     */
    [linkPromise](thenable, catchable) {
      function exec(handler, data, resolve, reject) {
        try {
          const result = handler(data); // 得到当前Promise的处理结果
          if (result instanceof MyPromise) { // 如果返回的是一个Promise对象，则单独处理一下
            result.then(res => {
              resolve(res);
            }, err => {
              reject(err);
            })
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      return new MyPromise((resolve, reject) => {
        this[setHandle](FULFILLED, data => {
          if (typeof thenable !== 'function') {
            resolve(data);
            return;
          }
          exec(thenable, data, resolve, reject);
        }, this[thenables]);

        this[setHandle](REJECTED, err => {
          if (typeof catchable !== 'function') {
            reject(err);
            return;
          }
          exec(catchable, err, resolve, reject);
        }, this[catchables]);
      })
    }


    static all(proms) {
      let i = 0;
      return new MyPromise((resolve, reject) => {
        proms.forEach(prom => {
          prom.then(res => {
            if (++i === proms.length) {
              resolve(proms)
            }
          }, err => {
            reject(err)
          })
        })
      })
    }


    static race(proms) {
      return new Promise((resolve, reject) => {
        proms.forEach(prom => {
          prom.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
      });
    }


    static resolve(data) {
      if (data instanceof MyPromise) {
        return data;
      } else {
        return new MyPromise(resolve => {
          resolve(data);
        })
      }
    }

    
    static reject(err) {
      return new MyPromise((resolve, reject) => {
        reject(err);
      })
    }

  }
}());