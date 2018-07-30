## promise是什么？简单分析promise原理 {docsify-ignore-all}
### 预备知识
* 回调函数
* 高级函数
* 发布-订阅模式
* promise A+ 规范
  
### promise是什么，能干什么
* 解决回调地狱
* 解决多个回调函数同步结果
### promise的三种状态
* 等待态 pending
* 成功态 resolved
* 失败态 rejected
### promise的特点
* 1.executor 默认时new的时候就自动执行
* 2.每个promise的实例 都有then方法 
* 3.then方法中有两个参数 分别是成功的回调和失败的回调
* 4.then方法是异步的(微任务) // 微任务先于宏任务执行
* 5.同一个promise的实例可以then多次,成功时回调用所有的成功方法，失败时会调用所有的失败方法
* 6.new Promise中可以支持异步行为
* 7.如果发现错误就会走入失败态
* 
### 简单实现 待完善

````javascript
    // 1 定义Promise构造函数
    //   executor(resolve,reject)
    function myPromise(executor){
        // 1 定义各种私有的变量：成功和失败的数据已经回调函数 
        let self = this;
        self.value = undefined;
        self.reason = undefined;
        self.status = 'pending';
        self.onResolvedCallBack = [];// 成功时的回调
        self.onRejectedCallBack = [];// 失败时的回调
        // 成功时 将成功需要处理的的数据保存下来，将状态改为 resolved
        function resolve(value){
            self.value = value;
            self.status = 'resolved';
            // 以此执行 .then加入的成功回调
            self.onResolvedCallBack.forEach(fn => fn(value))
        };
        // 失败时 将失败的原因保存下来， 状态=》 reject
        function reject(reason){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallBack.forEach(fn=> fn(reason))
        };
        try{
            executor(resolve,reject)
        }catch{ // 没有传人executor函数时默认都进入 reject失败回调
            reject()
        }
    }
    myPromise.prototype.then = function(onResolve,onReject){
        let self = this
        if('resolved' == self.status){
            onResolve(self.value)
        }
        // 
        if('rejected' == self.status){
            onReject(self.reason)
        }
        if('padding' == self.status){
        // todo：padding状态需要将回调函数进行保存

        }
    }

    module.exports = myPromise
````




