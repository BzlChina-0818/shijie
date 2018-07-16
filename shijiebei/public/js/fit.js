
var init = function(doc, win) {
	var docEl = doc.documentElement,
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;

			if(clientWidth <= 414) {
				docEl.style.fontSize = '100px';
			}else {
				docEl.style.fontSize = 100 * (1390 / 1024) + 'px';
			}
		};

	if(!doc.addEventListener) return;
	win.addEventListener('resize', recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
};

init(document, window);





//var init = function(doc, win) {
//	var docEl = doc.documentElement,
//		recalc = function() {
//			var clientWidth = docEl.clientWidth;
//			if(!clientWidth) return;
//			if(clientWidth <= 1024) {
//				docEl.style.fontSize = '100px';
//			} else if(clientWidth >= 1024 && clientWidth <= 1390) {
//				docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px';
//			} else {
//				docEl.style.fontSize = 100 * (1390 / 1024) + 'px';
//			}
//		};
//	if(!doc.addEventListener) return;
//	win.addEventListener('resize', recalc, false);
//	doc.addEventListener('DOMContentLoaded', recalc, false);
//};
//init(document, window);



// (function (doc, win) { 
// 	var docEl = doc.documentElement, 
// 	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', 
// 	recalc = function () { 
// 		var clientWidth = docEl.clientWidth; 
// 		if (!clientWidth) return; 
// 		if(clientWidth>=640){ 
// 			docEl.style.fontSize = '100px'; 
// 		}else{ 
// 			docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'; 
// 		} 
// 	}; 
// 	if (!doc.addEventListener) return;
// 	 win.addEventListener(resizeEvt, recalc, false); 
// 	 doc.addEventListener('DOMContentLoaded', recalc, false); 
// })(document, window);