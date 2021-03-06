类的虚方法实现方式，通常是使用 指向 函数指针数组 的指针。



```c++
ClassType * pClass = new ClassType;
pClass -> field = (*pClass).field;
```



类名首字母大写

关键字class 



头文件类声明中，可以使用方法原型，也可以把定义直接写好

定义在类声明中的函数自动成为内联函数；或者在外部定义，用inline 关键字即可（因为inline 需要在每个使用的文件中定义，一般外部定义也写在 类定义的头文件中）；两种方法等同

privte、默认，外部无法访问

public、外部访问

protected、子类访问

>c++ 中的结构，实际上也被拓展成一种“类”，只是默认为public



这里添加了一个类作用域，成员方法的定义需要使用解析运算符标示：

```c++
void Stock::updata()//防止和其他类的成员函数重名
```



每个对象的内部变量和类成员在存储时都是独立的，但是方法是公用的。



类初始化就赋值比后来赋值好，因为后者一定会产生临时变量。而前者不一定（看编译器实现）

c++ 11 支持列表初始化

```c++
//新奇的构造
ClassSample sample = 32; //如果是单参
```



```c++
//承诺不修改内部对象的方法
void f() const; 
void ClassSample::f() const; //这里的const 表示 const ClassSample * this;
```



this指针，是在调用成员函数时，被隐式传入的。

所以如果有c++ 语句被转换成c 语句，你会看到方法多了个指针参数



```c++
class Sample{
  const int Months = 12; //声明被使用时
  double costs[Months]; //错误
  //但是如下声明可以
  enum{Months = 12}; //单纯替换
  static const int Months = 12; //c++98只支持整数或枚举，c++11 则没有限制
}
//这里解释的有点模糊
//个人感觉是，const int Months = 12；是类的变量，而他不是静态的，故而只有在类创建的时候，才会真正的赋值为12（或者有修改的话，会是其他值）；而costs 声明的时候就使用了这个Months，这样在实际分配的时候，不能确定Months 还是12，即出现了冲突。
```



```c++
class Lsj{
    //可以使用 delete 来禁止编译器使用某个方法
    Lsj(const Lsj &) = delete;  //比private 的方式更加直观，不易操作错误
    void do(int);
    void double(int) = delete; //如此更加明确
}
```



静态成员函数：`static`

类中可以嵌套类，结构，枚举



![image-20191031224416124](image-20191031224416124.png)

#### 类内成员初始化

```c++
//可以使用等号或大括号初始化，但是不能使用圆括号
class S{
  int m1 = 10;
  double m2{22.2};
}
```



#### 对象数组

对象数组显式初始化的时候，首先一定会被默认初始化，之后使用显式初始化的临时变量 赋值。



#### 资源

《The Design and Evolution of C++》