> 好像是从系统的角度说的，比如System.call(object-, method);

面向对象程序由 对象 组成。对象包含数据（数据也是实例）和方法（操作），客户端会对某个对象发起某个方法的请求，来改变对象的内部数据。（这是数据改变的唯一源头）

方法名、参数、返回值构成了方法 -- 即方法签名(signature)

方法数大于等于1的集合，被称为接口(interface)。

接口可以包含其他接口作为子集。前者是超类型(supertype)，后者是(subtype)，关系是继承

类型(type)是用来标识特定接口的一个名字。如果一个对象支持接口A 所定义的所有方法，那么我们就说这个对象具有A 类型。一个对象可以有许多类型，并且不同的对象可以共享同一个类型。

> 不同对象对相同接口中的方法的实现可以不同

客户端发起方法请求时，对象的不同引起方法实现不同的情况，叫做动态绑定(dynamic binding)。（有点宽泛）。而也因此，方法请求在运行时可以替换不同的对象。这种替换性叫做多态(polymorphism)



对象的实现是由它的类(class)决定，类决定了对象的内部数据和表示，也定义了对象支持的方法。

对象通过实例化类来进行创建，此对象被称为该类的实例。实例化类的时候才给对象的内部数据分配存储空间，并将方法和数据关联。对象的许多类似实例是由实例化同一个类来创建的。

新的类可以由已存在的类通过类继承(class inheritance)来定义。当子类( s u b c l a s s )继承父类(parent class)时，子类包含了父类定义的所有数据和操作。子类的实例对象包含所有子类和父类定义的数据，且它们能完成子类和父类定义的所有操作。

类能够重写(override)父类定义的操作

抽象类(abstract class)的主要目的是为它的子类定义公共接口。

混入类(mixin class)是给其他类提供可选择的接口或功能的类。它与抽象类一样不能实例化，混入类要求多继承



注意这里类型和类的概念。c++ 的类即指定对象的类型又指定对象的类（实现）。而有些语言如Smalltalk 不声明变量的类型，因此是在请求方法的时候，检查方法的接收方（即对象）是否实现了该方法，而不是检查类。

理解类继承和接口继承 (或子类型化)之间的差别也十分重要。类继承根据一个对象的实现定义了另一个对象的实现。简而言之，它是代码和表示的共享机制。然而，接口继承 (或子类型化)描述了一个对象什么时候能被用来替代另一个对象



聚合(aggregation)意味着一个对象拥有另一个对象或对另一个对象负责。聚合意味着聚合对象具有相同的生命周期不长于其所有者

相识(acquaintance)意味着一个对象仅仅知道另一个对象。有时相识也被称为“关联”或“引用”关系。相识的对象可能请求彼此的操作，但是它们不为对方的生命周期负责。相识是一种比聚合要弱的关系，它只标识了对象间较松散的耦合关系。



在单分派语言中，到底由哪一种操作将来实现一个请求取决于两个方面：该请求的名和接收者的类型。

双分派意味着得到执行的操作决定于请求的种类和 两个 接收者的类型。



设计时需要考虑的因素：封装、粒度、依赖关系、灵活性、性能、演化、复用