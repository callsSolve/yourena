**对象的创建**

虚拟机遇到一条字节码new指令，首先去检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并检查这个符号引用代表的类是否已被加载、解析和初始化过。如果没有，先执行类加载过程。

类加载检查通过后，已确定其内存大小，然后虚拟机为其分配对象。分配对象根据规整情况分为两种，一种是所有被使用过的内存放在一边，未使用过的内存放在另一边，中间用一个指针标识分界点，分配时移动指针即可 -- 指针碰撞；另一种是交错内存，需要维护一个列表，记录内存块的未使用部分，分配时找到足够的空间并更新列表 -- 空闲列表。

规整性由垃圾收集器是否有空间压缩整理（compact）的能力决定

分配时也可能存在线程安全问题，一种解决方式是使用CAS 配上失败重试；另外一种是每个线程在java堆中预先分配一小块内存，称为本地线程分配缓冲（Thread Local Allocation Buffer, TLAB），缓冲区使用结束后才需要同步锁定。

共享内存分配/TLAB 中分配时，虚拟机会对内存空间进行零值初始化（不包括对象头）。所以java代码中不用赋初始值

然后虚拟机对对象头进行必要的设置，如对象是属于哪个类的实例、如何才能找到类的元数据信息、对象的哈希码（实际上在调用Object::hashCode 时才计算）、GC分代年龄。

此时对象已经诞生。对应java 程序的话，Class文件的`<init>()` 构造函数还没有执行。需要new 的下一条指令进行对象初始化。



**对象的内存布局**

hotSpot 中，对象在堆内存中的布局可以划分为三个部分：对象头、实例数据、对齐填充

对象头部分包括两类信息。第一类是用于存储对象自身的运行时数据，官方称为Mark Word；第二类是指向对象类型元数据的指针。

实例数据则是真正存储的有效信息，即代码中定义的各种类型的字段内容。存储顺序会受虚拟机分配策略和字段定义顺序的影响。总体是相同宽度的字段总是被分配到一起存放，同时父类的变量在子类之前，子类的较窄变量可以插入父类变量。

对其填充，不一定有，hotspot 的自动内存管理系统要求对象起始地址必须是8字节的整数倍。



**对象的访问定位**

虚拟机规范没有定义引用类型应该以什么方式定位、访问堆中对象的具体位置

所以实现上具体有两种方式：

- 句柄

    有点类似间接指针，需要额外的堆空间分配，但是在对象移动时（垃圾收集）不会改动外部引用

- 直接指针

    更快速，是hotspot 中的主要方式。


