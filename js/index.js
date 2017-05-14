window.onload=function(){
	var oNav=document.getElementById("nav");
	var navLi=oNav.getElementsByTagName("li");
//	缓冲运动：
function doBufferMove(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var cur=0;
		if(attr=='opacity'){
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		}else {
			cur=parseInt(getStyle(obj,attr));
		}
		var speed=(target-cur)/20;
		//保证SPEED不会是绝对值小于1的小数：
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur===target){
			clearInterval(obj.timer);
		}else {
			if(attr=='opacity'){
				obj.style.opacity=(cur+speed)/100;
				obj.style.filter='alpha(opacity :'+(cur+speed)+')';
			}else {
				obj.style[attr]=cur+speed+'px';
			}
			
		}
	},30)
}
//get对象当前的style:
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
	//return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}



//	导航点击：
	for(var i=0;i<navLi.length;i++){
		navLi[i].onclick=function(){
			for(var i=0;i<navLi.length;i++){
				navLi[i].className='';
			}
			this.className='active';
		}
	}
//	banner图片切换：
	var arr1=['#abd3fe','#fbeb95','lightblue','lightcoral','#48cfae','palevioletred'];
	var oPic=document.getElementById("pic");
	var oSea=document.getElementById("search-wrap");
	var oPicBan=document.getElementById("banner");
	var pics=oPicBan.getElementsByTagName("img");
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var picUl=oPicBan.getElementsByTagName("ul")[0];
	var dotLi=picUl.getElementsByTagName("li");
	var num=0;
	var timer=null;
	pics[num].style.opacity=1;
	timer=setInterval(go,5000);
	function go(){
		for(var i=0;i<pics.length;i++){
			doBufferMove(pics[i],'opacity',0);
			dotLi[i].className='';
		}
		num++;
		num%=pics.length;
		doBufferMove(pics[num],'opacity',100);
		dotLi[num].className='active2';
		oPic.style.background=arr1[num];
	}
	next.onclick=function(){
		go();
	}
	prev.onclick=function(){
		for(var i=0;i<pics.length;i++){
			doBufferMove(pics[i],'opacity',0);
			dotLi[i].className='';
		}
		num--;
		if(num==-1){
			num=pics.length-1;
		}
		doBufferMove(pics[num],'opacity',100);
		dotLi[num].className='active2';
		oPic.style.background=arr1[num];
	}
	oPicBan.onmouseover=function(){
		clearInterval(timer);
		prev.style.display='block';
		next.style.display='block';
	}
	oPicBan.onmouseout=function(){
		clearInterval(timer);
		timer=setInterval(go,5000);
		prev.style.display='none';
		next.style.display='none';
	}
	for(var i=0;i<dotLi.length;i++){
		dotLi[i].index=i;
		dotLi[i].onclick=function(){
			for(var i=0;i<pics.length;i++){
				doBufferMove(pics[i],'opacity',0);
				dotLi[i].className='';
			}
			num=this.index;
			this.className='active2';
			doBufferMove(pics[num],'opacity',100);
			oPic.style.background=arr1[num];
		}
	}
	
//	美剧切换：
var conR=document.getElementById("con-r");
var mjLi=conR.getElementsByTagName("li");

for(var i=0;i<mjLi.length;i++){
	mjLi[i].onmouseover=function(){
		for(var i=0;i<mjLi.length;i++){
			mjLi[i].className='';
		}
		this.className='active3';
	}
	
}
//视频鼠标移入:
var conL=document.getElementById("con-l");
var vidLi=conL.getElementsByTagName("li");
var vidDiv=conL.getElementsByTagName("div");
for(var i=0;i<vidLi.length;i++){
	vidLi[i].index=i;
	vidLi[i].onmouseover=function(){
		for(var i=0;i<vidLi.length;i++){
			vidDiv[i].style.display='none';
		}
		vidDiv[this.index].style.display='block';
	}
	vidLi[i].onmouseout=function(){
		for(var i=0;i<vidLi.length;i++){
			vidDiv[i].style.display='none';
		}
	}
}

//音乐播放器：
var oPlay=document.getElementById("play-btn");
var oPause=document.getElementById("pause-btn");
var song1=document.getElementById("music1")
var oShort=document.getElementById("short");
var oLong=document.getElementById("long");
var oStick=document.getElementById("vol-stick");
song1.volume=0.5;
oPlay.onclick=function(){
	song1.play();
	oPlay.style.opacity=0.5;
	oPause.style.opacity=0.8;
}
oPause.onclick=function(){
	song1.pause();
	oPlay.style.opacity=0.8;
	oPause.style.opacity=0.5;
}
if(song1.pause()){
	alert('1')
}
var disX=0;
oShort.onmousedown=function(ev){
	var oEvent=ev||event;
	disX=oEvent.clientX-oShort.offsetLeft;

	document.onmousemove=function(ev){
		var oEvent=ev||event;
		var l=oEvent.clientX-disX;
		if(l<0){
			l=0;
		}else if(l>oLong.offsetWidth-oShort.offsetWidth){
			l=oLong.offsetWidth-oShort.offsetWidth;
		}
		oShort.style.left=l+'px';
		oStick.style.width=l+10+'px';
		song1.volume=l/100;
	}
	
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
	return false; //解决火狐上第二次拖动有重影的BUG，貌似现在版本的火狐已经解决
}

	
	
}
