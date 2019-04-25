# js的涉及模式


## 1、什么是面向对象
把客观对象抽象成属性数据和对数据的相关操作，把内部细节和不想关的信息隐藏起来，把同一个类型的客观对象的属性数据和操作绑定在一起，封装成类，并且允许分成不同层次进行抽象，通过继承实现属性和操作的共享
- 面向对象的分析 OOA
- 面向对象的设计 OOD
- 面向对象的编程 OOP
  
### 概念
- 类、对象（实例）
- 父类时公共的
````javascript
class Animal{
    constructor(name) {
        this.name=name;
    }
    eat() {
        console.log(`${this.name} eat`)
    }
}
let animal=new Person('动物');
animal.eat(); 
````
### 继承
- 子类继承父类
- 继承可以把公共方法抽离出来，提高复用，减少冗余

````javascript
class Animal{
    constructor(name) {
        this.name=name;
    }
    eat() {
        console.log(`${this.name} eat`)
    }
    speak() {

    }
}
let animal=new Animal('动物');
animal.eat();

class Dog extends Animal{
    constructor(name,age) {
        super(name);
        this.age=age;
    }
    speak() {
        console.log(`${this.name} is barking!`);
    }
}
let dog=new Dog('🐶',5);
dog.eat();
dog.bark();
````

### 封装
- 把数据封装起来
- 减少耦合，不该外部访问的不要让外部访问
- 利于数据的接口权限管理
- ES6 目前不支持，一般认为_开头的都会私有的，不要使用
实现
- public:公有修饰符，可以在类内或者类外使用public修饰的属性或者行为，默认修饰符
- protected:受保护的修饰符，可以本类和子类中使用protected修饰的属性和行为
- private : 私有修饰符，只可以在类内使用private修饰的属性和行为

````typescript
class Animal {
    public name;
    protected age;
    private weight;
    constructor(name,age,weight) {
        this.name=name;
        this.age=age;
        this.weight=weight;
    }
}
class Person extends Animal {
    private money;
    constructor(name,age,weight,money) {
        super(name,age,weight);
        this.money=money;
    }
    getName() {
        console.log(this.name);
    }
    getAge() {
        console.log(this.age);
    }
    getWeight() {
        console.log(this.weight);
    }
}
let p=new Person('zfpx',9,100,100);
console.log(p.name);
console.log(p.age);
console.log(p.weight);
````
webpack打包ts
````javascript
module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
````

### 多态
- 同一接口可以不同实现
- 保持子类的开发性和灵活性
- 面向接口编程

## 2、设计原则

## 3、SOLID五大涉及原则