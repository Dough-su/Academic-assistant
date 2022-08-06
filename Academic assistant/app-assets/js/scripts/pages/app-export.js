//获取多个url参数
function getUrlVal(para) {
	var search = location.search; //页面URL的查询部分字符串
	var arrPara = new Array(); //参数数组。数组单项为包含参数名和参数值的字符串，如“para=value”
	var arrVal = new Array(); //参数值数组。用于存储查找到的参数值

	if (search != "") {
		var index = 0;
		search = search.substr(1); //去除开头的“?”
		arrPara = search.split("&");

		for (i in arrPara) {
			var paraPre = para + "="; //参数前缀。即参数名+“=”，如“para=”
			if (arrPara[i].indexOf(paraPre) == 0 && paraPre.length < arrPara[i].length) {
				arrVal[index] = decodeURI(arrPara[i].substr(paraPre.length)); //顺带URI解码避免出现乱码
				index++;
			}
		}
	}

	if (arrVal.length == 1) {
		return arrVal[0];
	} else if (arrVal.length == 0) {
		return null;
	} else {
		return arrVal;

	}
}
//对iframe截图
function screenshot() {
	//对页面截图
	html2canvas($("#iframe")[0].contentWindow.document.querySelector("#theme > div > div.body-wrap > div.theme-wrap > div")).then(canvas => {
		$("#pageNum1").remove();
		canvas.id = "pageNum1";

		//设置canvas在浏览中宽高

		canvas.style.transform = "scale(0.66)";
		//设置canvas的margin-left为百分之20
		canvas.style.marginLeft = "20%";
		canvas.style.display = "block";
		$(".swiper-wrapper").prepend(canvas);
		$("#pageNum1").css('width', '');
		$("#pageNum1").css('height', '');
		$("#iframe")[0].contentWindow.document.querySelector("#theme > div > div.head > div > a").click()
		document.querySelector("#iframe").src = "";
		document.querySelector("#content > div.iframe-masking").style.display = "none";

	});
}
//pdf开始加载
function loadpdf() {
	var pdfs = getUrlVal("id")
	$(".preview-section").css('height', '588px');
	$(".swiper-wrapper").css('height', '588px');

	var pdfname;
	for (var n = -1; n < pdfs.length; n++) {
		if (n == -1) pdfname = "../upload/title.pdf"
		else pdfname = "../upload/"+pdfs[n] + ".pdf"
		pdfjsLib.getDocument(pdfname).then(function (pdf) { //调用pdf.js获取文件
			if (pdf) {
				totalPages += pdf.numPages; //获取pdf文件总页数
				$("#total_page").text(totalPages);
				$(".show-page").innerText = ""
				//$(".swiper-wrapper").prepend('<div class="cover-wrap" id="pageNum1" style="transform: scale(0.66);margin-left: 20%;"> <div class="cover" id="cover" style="opacity: 1;">  <div class="list-item drag" data-type="item" style="     transform: translate3d(0px, 0px, 0px); user-select: none; top: 572.501px; cursor: move; touch-action: pan-x;">   <span class="s-move iconfont icon-srcm-i-move" data-original-title="" title=""></span> <div class="" data-type="item" data-font="黑体" style="font-family: &quot;Heiti SC&quot;, 微软雅黑;"><a class="s-close-item el-icon-subtraction icon-srcm-i-remove iconfont" data-original-title="" title=""></a> <input type="text" class="list" value="插入条目项" style="width: 60.6061px; letter-spacing: 12px;">：<input type="text" class="underline" style="width: 208px;">  </div><div class="" data-type="item" data-font="黑体" style="font-family: &quot;Heiti SC&quot;, 微软雅黑;"><a class="s-close-item el-icon-subtraction icon-srcm-i-remove iconfont" data-original-title="" title=""></a> <input type="text" class="list" value="插入条目项" style="width: 60.6061px; letter-spacing: 4px;">：<input type="text" class="underline" style="width: 208px;">  </div></div> <div class="drag single-item" data-type="h1" data-font="黑体" style="padding-bottom: 342px;font-family: &quot;Heiti SC&quot;, 微软雅黑; transform: translate3d(0px, 0px, 0px); user-select: none; top: 176.802px; cursor: move; touch-action: pan-x;"> <input type="text" class="h1" value="插入一级标题">  <a class="s-close el-icon-subtraction icon-srcm-i-remove iconfont" data-original-title="" title=""></a><span class="s-move el-icon-move icon-srcm-i-move iconfont" data-original-title="" title=""></span></div></div> </div>')
				//遍历动态创建canvas
				for (var i = flag, x = 1; i <= totalPages; i++, flag++, x++) {
					var canvas = document.createElement('canvas');
					canvas.id = "pageNum" + i;
					// if(i==1) 
					// $(".swiper-wrapper").append('<div class="swiper-slide swiper-slide-active" style="width: 866px; margin-right: 30px;"><div class="page" style="transform: scale(0.66);"></div></div>')
					// else
					$(".swiper-wrapper").prepend(canvas)
					var context = canvas.getContext('2d');
					renderImg(pdf, x, context);
					//将除了第一页的其他页面隐藏
					if (i != 1) {
						$("#pageNum" + i).css('display', 'none');
					}
				}

			}
		});
	}

}
function showhide() {

	if (currentPages == 1) {
		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(1)").show();
		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(2)").hide();

	}
	if (currentPages == 2) {
		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(1)").hide()

		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(2)").show()
	}
	if (currentPages > 2) {
		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(1)").hide();
		$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(2)").hide()
	}
}

var currentPages //声明一个当前页码及总页数变量
var scale = 2; //设置缩放比例，越大生成图片越清晰
var pdfviewport; //声明一个pdf页面视口,用来存储pdf宽高
var flag = 1;
var totalPages = 0;
var jsPDF = window.jspdf.jsPDF; //引入jsPDF插件
var doc = new jsPDF('p', 'mm', 'a4');
var state;//控制点击的是插入空白页还是插入图片/pdf

window.onload = function () {
	$(".section.next-step").empty()
	$(".section.next-step").append('<button id="topdf"   type="button" style="      width: 101px;  color: #fff;background-color: #00b38a;border-color: #00b38a;">导出pdf</button>')
	$(".bottom-button").empty()
	$(".bottom-button").append('<span class="cancel-insert">取消插入</span> <button id="submit" type="button" class="btn btn-primary pull-right" data-loading-text="处理中..."> 确定 </button> ')
	$("#content > div.container > div.operation-section > div.section-group > div.section.edit-section.cover-active > div > div.cover-catalogue-oparate > a:nth-child(2)").removeClass("edit-catalog").addClass("edit-cover")
	$("#content > div.container > div.operation-section > div.section-group > div:nth-child(1)").remove()
	showhide()
	$(".insert-page").click(function () {
		state = 0;
	})
	$(".insert-other").click(function () {
		state = 1;

	})


	$(".btn.btn-primary").click(function () {
		var text = $(this).text();

		console.log(text)
		if (state == 1 && text == $("#submit").text()) {
			// if(document.querySelector("#content > div.masking.insert-img.cur-blank-page > div > div.insert-header > span.page-title"))
			//遍历image-list hover中的所有blob,并插入到canvas
			for (var i = 0; i < $(".image-list").children().length; i++) {
				//canvas.id = "pageNum" + (flag);
				for (var x = (currentPages + 1 + i); x <= totalPages; x++) {
					$("#pageNum" + x).attr("id", "pageNum" + (x + 1));
					//alert("改变"+x+"为"+(x+1))
				}
				$("#pageNum" + (currentPages)).before('<div id="pageNum' + (currentPages + i + 1) + '" style="width: 364.069px; height: 515px; left: 148.665px; top: 0px;"><img src="' + $("#imglist > li:nth-child(" + (i + 1) + ")").attr("data-name") + '" style="width: 364.069px; height: 515px; margin-left: 0px; margin-top: 0px; transform: none;"></div>')
				$("pageNum" + (currentPages + i + 1)).append = '<img src="" style="width: 364.069px; height: 515px; margin-left: 0px; margin-top: 0px; transform: none;">'
				$("#EBOOK > div > div.swiper-wrapper > div.pageNum" + (currentPages + i + 1) + "").css('display', 'none')
				$("#pageNum" + (currentPages + i + 1)).attr('style', 'display: none; transform: scale(0.66); margin-left: 20%; width: 400px; height: 800px;');

				flag++;
				totalPages++;
			}
			$("#total_page").text(totalPages);
			$(".masking.insert-img").css('display', 'none');
			$("#progress").remove();
			//将除了当前页之外的所有页面的样式改为隐藏
			for (var i = 1; i <= totalPages; i++) {
				if (i != currentPages) {
					$("#pageNum" + i).css('display', 'none');

				}
				else {
					$("#pageNum" + i).css('display', 'block');
				}
			}
		}
		else if (state == 0) {
			//对页面截图
			html2canvas(document.querySelector("#picture > div.page-picture > div.col-sm-10.current-pic.pull-right > div > div > div")).then(canvas => {
				canvas.id = "pageNum" + (currentPages + 1);
				//设置canvas在浏览中宽高

				canvas.style.transform = "scale(0.66)";
				//设置canvas的margin-left为百分之20
				canvas.style.marginLeft = "20%";
				canvas.style.display = "block";
				$("#pageNum" + currentPages).before(canvas);
				$("#pageNum" + (currentPages + 1)).css('width', '');
				$("#pageNum1" + (currentPages + 1)).css('height', '');
				//将后面的页面的id加1
				for (var x = (currentPages + 1); x <= totalPages; x++) {
					$("#pageNum" + x).attr("id", "pageNum" + (x + 1));
				}
				//将除了当前页面的其他页面隐藏
				for (var i = 1; i <= totalPages; i++) {
					if (i != currentPages + 1)
						$("#pageNum" + i).css('display', 'none');
				}
				flag++;
				totalPages++;
				currentPages++
				$("#current_page").text("" + (currentPages));

				$("#total_page").text(totalPages);
				$(".cancel-insert").click()


			});
		}
	})
	$(".swiper-wrapper").empty()//清空swiper-wrapper
	//让swiper禁止滑动
	$(".swiper-container").css("swiper-no-swiping", "none");

	//导出pdf
	$("#topdf").click(function () {



		var zip = new JSZip(); //创建一个JSZip实例
		var images = zip.folder("images"); //创建一个文件夹用来存放图片
		var pdfindex = 0; //记录pdf页码
		//遍历canvas，将其生成图片放进文件夹images中
		// $("canvas").each(function (index, ele) {
		for (var index = 0, i = 0; index <= totalPages; index++) {
			var canvas = $("canvas#pageNum" + (index + 1))[0];

			if (canvas) {

				//将图片放进文件夹images中
				//参数1为图片名称，参数2为图片数据（格式为base64，需去除base64前缀 data:image/png;base64）
				images.file("photo-" + (index + 1) + ".png", splitBase64(canvas.toDataURL("image/png", 1.0)), {
					base64: true
				});

				//将图片存到pdf

				doc.addImage(canvas.toDataURL("image/png", 1.0), 'JPEG', 0, 0, 200, 280);
				doc.text(105, 285, "" + (pdfindex++) + "");
			}
			else {
				if (i < $("#EBOOK > div > div.swiper-wrapper > div > img").length)
					if ($("#EBOOK > div > div.swiper-wrapper > div > img")[i].src != undefined) {
						//进度条自增
						//将blob插入到pdf
						doc.addImage($("#EBOOK > div > div.swiper-wrapper > div > img")[i++].src, 'JPEG', 0, 0, 200, 280);

						doc.text(105, 285, "" + (pdfindex++) + "");


					}





				// })
				//遍历image-list hover中的所有blob,并插入到pdf
				// for (var i = 0; i < $(".image-list").children().length; i++) {
				// 	alert(1)
				// 	//如果图片不存在，则跳过
				// 	if ($("#EBOOK > div > div.swiper-wrapper > div > img")[i].src != undefined) {
				// 		alert(2)
				// 		//进度条自增
				// 		//将blob插入到pdf
				// 		doc.addImage($("#EBOOK > div > div.swiper-wrapper > div > img")[i].src, 'JPEG',0, 0, 200, 280);
				// 		doc.text(105, 285, ""+(pdfindex++)+"");


				// 		doc.addPage();


				// 	}

				// }
			}
			if (index < totalPages)
				doc.addPage();
		}
		//保存pdf
		doc.save("test.pdf");

		//截取base64前缀
		function splitBase64(dataurl) {
			var arr = dataurl.split(',')
			return arr[1]
		}

	});

	//下一页按钮
	$(".swiper-button-next").click(function () {
		if (!currentPages || currentPages >= totalPages) {
			return;
		}
		$(".swiper-wrapper").attr('style', 'height: 588px;');


		nowpage = currentPages;
		currentPages++;
		showhide();
		$("#current_page").text("" + currentPages);

		var nextcanvas = document.getElementById("pageNum" + currentPages);
		var currentcanvas = document.getElementById("pageNum" + nowpage);
		currentcanvas.style.display = "none";
		nextcanvas.style.display = "block";


	})
	//上一页按钮
	$(".swiper-button-prev").click(function () {
		if (!currentPages || currentPages <= 1) {
			return;
		}

		nowpage = currentPages;
		currentPages--;
		showhide();

		$("#current_page").text("" + currentPages);
		$(".swiper-wrapper").attr('style', 'height: 588px;');


		var prevcanvas = document.getElementById("pageNum" + currentPages);
		var currentcanvas = document.getElementById("pageNum" + nowpage);
		currentcanvas.style.display = "none";
		prevcanvas.style.display = "block";
	})


	$("#imgloading").css('display', 'block');
	currentPages = 1; //重置当前页数
	loadpdf()


}


//渲染生成图片
function renderImg(pdfFile, pageNumber, canvasContext) {
	pdfFile.getPage(pageNumber).then(function (page) { //逐页解析PDF
		var viewport = page.getViewport(scale); // 页面缩放比例
		var newcanvas = canvasContext.canvas;
		pdfviewport = viewport;


		//设置canvas真实宽高
		newcanvas.width = viewport.width;
		newcanvas.height = viewport.height;

		//设置canvas在浏览中宽高
		// newcanvas.style.width = "100%";
		// newcanvas.style.height = "100%";
		newcanvas.style.transform = "scale(0.66)";
		//设置canvas的margin-left为百分之20
		newcanvas.style.marginLeft = "20%";

		//默认显示第一页，其他页隐藏
		if (pageNumber != 1) {
			newcanvas.style.display = "none";
		}

		var renderContext = {
			canvasContext: canvasContext,
			viewport: viewport
		};

		page.render(renderContext); //渲染生成
	});

	$("#imgloading").css('display', 'none');

	return;
};