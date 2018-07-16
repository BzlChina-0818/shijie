// 判断本地是否存在用户信息
if(localStorage.getItem('userCell')){
	console.log("进缓存")
//	$(".packet").addClass("active");
//	$(".code").removeClass("active");
//	$.ajax({
//		type: 'POST',
//		url: apiUrl + '/api/share/webuser/getUser?mobile=' + localStorage.getItem("userCell") + '&dcode=ZMKM',
//		async: false, // 是否同步，false为异步加载
//		dataType: "jsonp", // 设置返回数据类型jsonp      
//		jsonp: "callback",
//		contentType: "application/x-www-form-urlencoded; charset=utf-8",
//		success: function(data) {
//			if(data.code == 0) {
//				localStorage.setItem('userCell', localStorage.getItem("userCell"));
//				localStorage.setItem("uerInfo", JSON.stringify(data.data));
//				window.location.href = "index2.html"
//			} else {
//				alert(data.msg)
//			}
//		}
//	})
}