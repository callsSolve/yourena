引用计数算法

根据引用增加/减少；会有循环引用无法回收的问题



可达性分析算法

通过一系列"GC Roots" 的根对象作为起始节点集，从这些节点开始，根据引用关系向下搜索，搜索过程所走过的路径称为”引用链“，如果某个对象到GC Roots 之间没有任何引用链相连，则证明其不再被使用。

GC Roots 包括：

- 虚拟机栈中引用的对象（即栈帧中本地变量表），如参数、局部变量、临时变量
- 方法区中类静态属性引用的对象，譬如Java 类的引用类型静态变量
- 在Native 方法栈中JNI 引用的对象
- java 虚拟机内部的引用，如基本类型对应Class对象，一些常驻的异常对象（NPE, OOM），系统类加载器
- 被同步锁（synchronized）持有的对象
- 反映Java 虚拟机内部情况的JMXBean、JVMZTI 中注册的回调、本地代码缓存等

还有一些临时性的情况，比如分代收集和局部回收



这里有个引用的概念：

- 强引用

    即代码中普遍存在的引用赋值

- 软引用 Software

    在系统将要发生内存溢出异常前，会把这些对象列进回收范围中进行第二次回收。

- 弱引用 Weakware

    只能生存到下一次垃圾收集发生为止

- 虚引用 PhantomReference

    用来在对象被回收器回收时接受系统通知



**堆中回收**：

在可达性分析后发现对象不可达，会标记一次对象；

然后查看对象finalize 方法有重写且没被虚拟机调用过（因此只能被调用一次），此时会将对象放置在F-Queue 队列中，由虚拟机自动建立、低调度优先级的Finalizer 线程去执行他们的finalize 方法（不保证方法运行结束）。所以可以在finalize 中重新绑定引用链，如果成功，则会脱离即将面临的第二次标记

接着收集器对F-Queue 中的对象进行第二次小规模的标记

> 作者建议避免使用，尽量忘记finalize方法



**方法区的垃圾收集**

主要是两部分：废弃的常量和不在使用的类型。

常量相对简单，无引用即可。

而判断不使用的类需要满足三个条件：

- 类所有实例都被回收，即不存在该类以及任何派生子类的实例
- 加载该类的类加载器已经被回收，除非OSGi\JSP 等精心设计的可替换类加载器场景，否则很难达成
- 该类的 java.lang.Class 对象没有被任何地方引用，也无法被反射访问

同时虚拟机参数配置为进行类型回收。
