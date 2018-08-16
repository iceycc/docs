
// function c() {
//     var con = 0
//     return function (num) {
//         ++con
//         // console.log(num + "")
//         var strArr = (num + "").split("")
//         var sum = 1;
//         for (var i = 0; i < strArr.length; i++) {
//             sum *= strArr[i]
//         }
//         console.log(con, sum)
//         if ((sum + "").length === 1) {
//             return con
//         } else {
//             return arguments.callee(sum)
//         }
//     }
// }
// let r = c()

// console.log(r(39)) // 3
// console.log(r(25)) // 5

function r(num) {
    var con = 0
    var flag = false
    function p(num){
        if((num + "").length ===1){
            flag = true
            return num
        }
        ++con
        var strArr = (num + "").split("")
        var sum = 1;
        for (var i = 0; i < strArr.length; i++) {
            sum *= strArr[i]
        }
        return p(sum)
    }
    p(num)
    if(flag){
        return con
    }
}


console.log(r(39)) // 3
console.log(r(25)) // 2
console.log(r(4)) // 0
console.log(r(999)) // 44



// function c2(){
//     this.a = 0
// }
// c2.prototype.add = function(){
//     var con = this.a
//     return function(num) {
//         ++con 
//         // console.log(num + "")
//         var strArr = (num + "").split("")
//         var sum = 1;
//         for (var i = 0; i < strArr.length; i++) {
//             sum *= strArr[i]
//         }
//         console.log(con,sum)
//         if ((sum + "").length === 1) {
//             return con
//         } else {
//             return arguments.callee(sum)
//         }
//     }
// }


// let r =(new c2()).add()

// console.log(r(39)) // 3
// console.log(r(25)) // 5



// 写一个函数判断字符串中x的数量和o的数量是否相等（忽略大小写）：
// XO("ooxx") => true
// XO("xooxx") => false
// XO("ooxXm") => true
// XO("zpzpzpp") => true // 没有x也没有o，所有相等，都为0
// XO("zzoo") => false


function XO(str){
    let obj = {}
    let arr = str.split('')
    console.log(arr)
    for(let i=0;i<arr.length;i++){
         
    }
}

XO('xxxxcccc')