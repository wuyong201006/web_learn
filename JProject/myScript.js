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

x = {}
Array.prototype.shift.call(x);
console.info(Array.prototype.shift+""+ x.length);