```c++
[&count](int x){count += {x % 13 == 0}}
```



函数谓词

在c++11，函数指针和函数符 可以使用匿名函数定义(lambda)

函数指针会阻止编译器内联（传统上函数地址意味着非内联函数），而函数符和lambda一般不会阻止



使用 [] 来替代函数名，不需要声明返回类型，用return 来推断，没有就是void

```c++
[](int x){return x % 3 == 0}; //如果只有一条返回语句，自动类型推断（类似decltype）
[](double x) -> double{int y = x; return x - y;} //如果多条语句，需要使用返回类型后置

//命名以复用
auto mod3 = [](int x){return x % 3 == 0}; //这里mod3 的类型，随编译器实现而异
mod3(2); //和函数一样调用
```

上面其实就是个匿名函数，但是下面会让你知道比函数要深一层

```c++
//传递变量
int count;
...
[&count](int x){count += x % 13 == 0;}; //按引用传递count
[count] //按值传递
[=] //所有作用域内的动态变量
[&] //所有...
```

