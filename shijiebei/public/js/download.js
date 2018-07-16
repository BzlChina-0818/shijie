


// 复制链接
var btn = document.getElementsByClassName('btn')[0];
btn.addEventListener('click',function (){
	var iptText = document.getElementsByClassName('ipt')[0];
	var current = document.activeElement;
	iptText.focus();
	iptText.setSelectionRange(0,iptText.value.length);
	document.execCommand('copy',true);
	current.focus();
	$("body").append("<div class='alert_div'><span>已复制</span></div>");
	$(".alert_div").show().delay(1500).fadeOut(1000);
})
