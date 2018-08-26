### 1.2018年8月13日题目
观察下面的规律，写一个函数`accum`
```
accum("abcd");    // "A-Bb-Ccc-Dddd"
accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt");    // "C-Ww-Aaa-Tttt"
```

### 2.2018年8月14日题目
写一个函数求数组的最大值和最小值
```
highAndLow("1 2 3 4 5"); // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"
```

```js
function highAndLow(numbers){ 
    numbers = numbers.split(' ‘)
    return `${Math.max(...numbers)} ${Math.min(...numbers)}`
 }
```

### 3. 2018年8月15日题目
写一个函数判断字符串中x的数量和o的数量是否相等（忽略大小写）：
```
XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // 没有x也没有o，所有相等，都为0
XO("zzoo") => false
```

```js
// 答案1
function XO(str) {
  str = str.toLowerCase().split('')
  return str.filter(x => x === 'x').length === str.filter(x => x === 'o').length
}

// 答案2
function XO(str) {
    return (str.match(/x/ig) || []).length === (str.match(/o/ig) || []).length;
}
```

### 4.2018年8月16日
写一个函数判断一个数字是不是某个整数的平方。
```js
is_square (-1) # => false
is_square   0 # => true
is_square   3 # => false
is_square   4 # => true
is_square  25 # => true
is_square  26 # => false
```

```js
// 答案1
function isSquare(n) {
  return Math.sqrt(n) % 1 === 0
}

// 答案2
function isSquare(n) {
  return Number.isInteger(Math.sqrt(n)
}

// 答案3
function isSquare(n){
  const s = Math.sqrt(n)
  return s === (s | 0)
  // return s === ( ~~s )
}
```

### 5. 2018年8月17日
写一个函数，将字符串除了最后的四位，其他都变成#
```js
maskify("4556364607935616") == "############5616"
maskify(     "64607935616") ==      "#######5616"
maskify(               "1") ==                "1"
maskify(                "") ==                 ""

// "What was the name of your first pet?"
maskify("Skippy")                                   == "##ippy"
maskify("Nananananananananananananananana Batman!") == "####################################man!"
```

```js
function maskify(cc) {
  return cc.slice(0, -4).replace(/./g, '#') + cc.slice(-4)
}
```

### 6. 2018年8月18日
下面三角形的数列：

```
             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29
...
```

写一个函数，给定行的序号，然后求和：

```
rowSumOddNumbers(1) // 1
rowSumOddNumbers(2) // 3+5=8
rowSumOddNumbers(3) // 7+9+11=27
rowSumOddNumbers(42) // 74088
```

```js
function rowSumOddNumbers(n) {
  return n*n*n
}
```

### 7. 2018年8月19日
将数字的每一位求平方，然后组合成新的数字（注意：请返回一个数字）

```
squareDigits(9119) // 811181
```

```js
function squareDigits(num){
  return +num.toString().split('').map(i => i*i).join('')
}
```

### 8. 2018年8月20日
写一个函数`solution`，求比一个数字n小的所有3和5的整数倍数和。 

比如10，比它小的3、5整数倍数有： 3,5,6,9， 所以和为23。
比如16， 比它小的3，5整数倍数有： 3,5,6,9,10,12,15，所以和为60（15只计算1次）

示例
```
solution(10) // 23
solution(16) // 60
```
注意，如果输入负数，返回0

### 9. 2018年8月21日
写一个二分查找函数`bsearch`，和之前学习的二分查找函数有一定的变化。

```
function bsearch(A, x) {
  /// TODO
}

```
A是一个已排序的数组，x是目标值。

1. 如果找到目标值，返回目标值在数组中的序号。 
2. 如果没有找到目标值，返回目标值应该被插入的位置


比如数组: A=3,5,7,13,22,25

```
bsearch(A,5) // 1
bsearch(A,13) // 3
bsearch(A,4) // 1
bsearch(-1) // 0
bsearch(-10000) // 0
bsearch(30) // 6
```

写好后请在201808/20180821目录 下面建一个 姓名.md 的文件,请注意代码一定要用反引号包裹一下。

```js
function bsearch(A, x){
  let l = 0,
      r = A.length - 1,
      guess
      
  while(l<=r) {
    guess = Math.floor( (l + r) / 2 )
    if(A[guess] === x) return guess
    if(A[guess] > x) {
      if(guess === 0 || A[guess - 1] < x) {
        return guess
      }
      r = guess - 1
    } else {
      if(guess === A.length - 1 || A[guess + 1] > x) {
        return guess + 1
      }
      l = guess + 1
    }
  }
}
```
