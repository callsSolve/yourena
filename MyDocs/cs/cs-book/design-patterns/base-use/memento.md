在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。
这样以后就可将该对象恢复到原先保存的状态。

必须定义两个接口：一个允许客户保持和复制的接口，和一个只有原对象才能使用的用来储存和提取状态的接口。

![image-20200228200802237](image-20200228200802237.png)



提供备忘录对象能保证内部状态的封装性

