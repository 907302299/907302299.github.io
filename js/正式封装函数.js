//1.input text的focus和blur:
function textFocusBlur(obj,str){
	obj.onfocus=function(){
		if(obj.value===str){
			 obj.value='';
		}
	}
	obj.onblur=function(){
		if(obj.value===''){
			obj.value=str;
		}
	}
}

//2.get对象当前的style:
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
	//return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

//3.清除空白node：
function cleanWhitespace(element){
	for(var i=0;i<element.childNodes.length;i++){
		var node=element.childNodes[i];
		if(node.nodeType===3&&!/\S/.test(node.nodeValue)){
			node.parentNode.removeChild(node);
		}
	}
}

//4.匀速运动框架（单一版）：
function doMove(obj,attr,dir,target,endFn){
	dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var cur=parseInt(getStyle(obj,attr))+dir;
		if(cur>target&&dir>0||cur<target&&dir<0){
			cur=target;
		}
		obj.style[attr]=cur+'px';
		if(cur===target){
			clearInterval(obj.timer);
			endFn&&endFn();
		}
	},30)
}
//5.匀速运动框架（完美版）：
function doMove2(obj,json,dir,endFn){
	dir=parseInt(getStyle(obj,attr))<json[attr]?dir:-dir;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){
			var cur=parseInt(getStyle(obj,attr))+dir;
			if(cur>json[attr]&&dir>0||cur<json[attr]&&dir<0){
				cur=json[attr];
			}
			
			if(cur!=json[attr]){    //如果还有没达到target的，则bstop就是false
				bStop=false;
			}
			obj.style[attr]=cur+'px';
		}
		if(bStop){                       //如果bstop为true，则说明所有的都达到了目标位置
			clearInterval(obj.timer);
			endFn&&endFn();
		}
	},30)
}
//6.缓冲运动框架（单一版）（包括透明度）：
function doBufferMove(obj,attr,target,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var cur=0;
		if(attr=='opacity'){
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		}else {
			cur=parseInt(getStyle(obj,attr));
		}
		var speed=(target-cur)/10;
		//保证SPEED不会是绝对值小于1的小数：
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur===target){
			clearInterval(obj.timer);
			fnEnd&&fnEnd();
		}else {
			if(attr=='opacity'){
				obj.style.opacity=(cur+speed)/100;
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			}else {
				obj.style[attr]=cur+speed+'px';
			}
		}
	},30)
}
//7.完美缓冲运动框架（完美版）（不像上面的狂街每次只能执行一个运动，这个可以多个运动一起执行）：
function doBufferMove2(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;    //假设所有的值都已经到达target。
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else {
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/10;
			//保证SPEED不会是绝对值小于1的小数：
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr]){         //如果还有没达到target的，则bstop就是false
				bStop=false;
			}
			
			if(attr=='opacity'){
				obj.style.opacity=(cur+speed)/100;
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			}else {
				obj.style[attr]=cur+speed+'px';
			}
		}
		if(bStop){                       //如果bstop为true，则说明所有的都达到了目标位置
			clearInterval(obj.timer);
			fnEnd&&fnEnd();
		}
	},30)
}
//8.获得鼠标移动的绝对位置:
function getPos(ev){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	return {x:ev.clientX+scrollLeft, y:ev.clientY+scrollTop}
}
//9.判断是用attachEvent还是用addEventListener:
function myAddEvent(obj,ev,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+ev,fn);
	}else {
		obj.addEventListener(ev,fn,false);
	}
}
