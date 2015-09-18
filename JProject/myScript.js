/**
 * Created by testt on 2015/1/27.
 */
document.write("<h1>This is a heading</h1>");
document.write("<p>This is a paragraph</p>");

//文档初始化完成
/**$(document).ready(function(){

})*/

$(function(){

})

//隐藏当前的HTML元素
$(this).hide();
//隐藏id=“test”的元素
$("#test").hide();
//隐藏所有<p>元素
$("p").hide();
//隐藏所有class="test"的元素
$(".test").hide();

//获得内容
$("#test").text();
$("#test").html();
$("#test").val();

//获取属性
$("#test").attr("href");

//添加新的HTML内容
$("p").append("Some appended test.");

//删除元素/内容

//删除被选元素（及其子元素）
$("#div1").remove();
//删除被选元素子元素
$("div1").empty();
//过滤被删除的元素
$("p").remove(".italic");

//返回CSS属性
$("p").css("background-color");
//设置多个CSS属性
$("p").css({"background-color":"yellow", "font-size":"200%"});

x = {a:"a", b:"b", c:"c"}
object = Array.prototype.shift.call(x);
console.log("info:"+object+":"+x+"  length"+x.length);


//工厂模式(没有解决对象识别的问题)
function createPerson(name, age, job)
{
    var o = new object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    }

    return o;
}

//构造函数模式(没有解决共用方法问题)
function Person(name, age, job)
{
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName()
{
    alert(this.name);
}

//原型模式
function Person()
{
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function(){
        alert(this.name);
    }
}

//组合（构造函数和原型模式)
function Person(name, age, job)
{
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}

//原型链
function SuperType()
{
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
}

function SubType(){
    this.subproperty = false;
}

//继承了
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
    return this.subproperty;
}

//借用构造函数
function SuperType(){
    this.colors = ["red", "blue", "green"];
}

function SubType(){
    SuperType.call(this, params);
}

//组合继承
function SuperType(name)
{
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
}

function SubType(name, age){
    //继承属性
    SuperType.call(this, name);

    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
    alert(this.age);
}

function inheritPrototype(subType, superType)
{
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
}

function SubType(name, age){
    SuperType.call(this, name);

    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
    alert(this.age);
}



