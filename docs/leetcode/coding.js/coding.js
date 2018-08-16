
// // 1
// console.log("abc".repeat(2))

// let a = {}
// console.log((a & 1))
// if(a){
//     console.log(a)
// }
// console.log(Boolean(a))


// function highAndAlow(arr){
    

// } 

// highAndAlow(1)

// // 
// console.log(typeof 2)

var arr = [3,4,5,61,2,3,0]

function paixun(arr){
    for(var j=1;j<arr.length;j++){
        let key = arr[j]
        let i = j -1
        while(i>=0 && arr[i]>key){
            arr[i+1] = arr [i]
            i = i-1
        }
        arr[i+1] = key
    }
}
// 1
paixun(arr)
console.log(arr)
// 从第二个开始循环 存储该项
// 取该项前一项进行比较大小 如何前一项大于该项互换位置

