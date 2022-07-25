//解析id
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
//渲染生成图片
function renderImg(pdfFile, pageNumber, canvasContext) {
    var scale = 1.5; //设置缩放比例，越大生成图片越清晰

    pdfFile.getPage(pageNumber).then(function (page) { //逐页解析PDF

        var newcanvas = canvasContext.canvas;
        var viewport = page.getViewport(scale); // 页面缩放比例


        // //设置cnvas真实宽高
         newcanvas.width = page.getViewport(scale).width;
          newcanvas.height = page.getViewport(scale).height;


        var renderContext = {
            canvasContext: canvasContext,
            viewport: viewport
        };

        page.render(renderContext); //渲染生成


    });

    return;
};
window.onload = function () {
    $(".btn.btn-primary.w-100.mb-75").click(function () {
        var jsPDF = window.jspdf.jsPDF; //引入jsPDF插件
        var doc = new jsPDF('p', 'mm', 'a4');
        //计算imglist子元素个数
    
        for (var i = 1; i <= $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div.col-xl-9.col-md-8.col-12 > div").children().length; i++) {
        //保存canvas到pdf
            var canvas = document.getElementById("pageNum" + i);
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 290);
            if(i<$("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div.col-xl-9.col-md-8.col-12 > div").children().length)
            doc.addPage();
        }
        doc.save(getUrlParam("id")+'.pdf');
    })
    $("#share").click(function () {
         //获取完整的url
        var url = window.location.href;
        //将url复制到剪切板
        navigator.clipboard.writeText(url)
        .then(() => {
            toastr['success']('👋 分享给您的朋友吧！', '链接已复制到剪切板', {
                closeButton: true,
                tapToDismiss: false,
                progressBar: true,
            });
    })
        .catch(err => {
            toastr['error']('😢 分享失败，请手动复制地址栏的链接', '链接复制失败', {
                closeButton: true,
                tapToDismiss: false,
                progressBar: true,
            });
    })
                //提示成功

    })
        var pdfs = getUrlParam("id")
        var pdfname;
        pdfname = "../upload/" + pdfs + ".pdf"
        pdfjsLib.getDocument(pdfname).then(function (pdf) { //调用pdf.js获取文件
            if (pdf) {
                //遍历动态创建canvas
                for (var i = 1, x = 1; i <= pdf.numPages; i++, x++) {
                    var canvas = document.createElement('canvas');
                    canvas.id = "pageNum" + i;
                    $(".card.invoice-preview-card").append(canvas)
                    var context = canvas.getContext('2d');
                    renderImg(pdf, x, context);
                }
                }
                })
                
    
}
