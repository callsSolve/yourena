c中只有4种 -- 整型，浮点型，指针，聚合类型（数组和结构等）

K&R 允许隐式声明变量（只做了解，不要用）

没有初始化的变量，值是不可预料的；所有变量和地址的相关性，是编译器处理的。

[整形](./integer.md)

[浮点型](./float.md)

[指针](./pointer.md)

[字符串](./string.md)

[枚举](./enum.md)

[结构和联合](./struct-union.md)

[数组](./array.md)

[指针数组方法](./pointer-array-func.md)

其他所有的类型都是从这4中类型组合派生来的

### 布尔

c没有布尔类型

* 0是假，任何非零値都为真
* 所有空\(NUL，0, '\0' \)为条件判断的false，否则为true



