# leetcode {docsify-ignore-all}

[leetcode](https://leetcode.com/)

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

### 3.2018年8月15日题目
写一个函数判断字符串中x的数量和o的数量是否相等（忽略大小写）：
XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // 没有x也没有o，所有相等，都为0
XO("zzoo") => false