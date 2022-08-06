//解析id
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
var id = "../upload/" + getUrlParam('id') + ".pdf";
var paperid = getUrlParam('id');
//加载pdf时的加载动画
function loadaction() {
    $("#picture_wrap").block({
        message:
            '<div class="d-flex justify-content-center align-items-center"><p class="me-50 mb-0">正在加载...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        css: {
            backgroundColor: 'transparent',
            color: '#fff',
            border: '0'
        },
        overlayCSS: {
            opacity: 0.5
        },
        timeout: 3000,
        onUnblock: function () {
            $("#picture_wrap").block({
                message: '<p class="mb-0">马上就好...</p>',
                timeout: 1500,
                css: {
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '0'
                },
                overlayCSS: {
                    opacity: 0.25
                },
                onUnblock: function () {
                    $("#picture_wrap").block({
                        message: '<div class="p-1 bg-success">加载成功</div>',
                        timeout: 500,
                        css: {
                            backgroundColor: 'transparent',
                            color: '#fff',
                            border: '0'
                        },
                        overlayCSS: {
                            opacity: 0.25
                        }
                    });
                }
            });
        }
    });
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
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                const hitokoto = document.getElementById('hitokoto')
                hitokoto.innerText = data.hitokoto
            })
            .catch(console.error)
    if (id != "../upload/null.pdf") {
        $(".no-pic").css("display", "none");
        $(".pic.row").css("display", "block");
        loadaction();

        var pdfs = getUrlParam("id")
        var pdfname;
        pdfname = "../upload/" + pdfs + ".pdf"
        pdfjsLib.getDocument(pdfname).then(function (pdf) { //调用pdf.js获取文件
            if (pdf) {
                //遍历动态创建canvas
                for (var i = 1, x = 1; i <= pdf.numPages; i++, x++) {
                    var canvas = document.createElement('canvas');
                    canvas.id = "pageNum" + i;
                    $(".no-pic").prepend(canvas)
                    var context = canvas.getContext('2d');
                    renderImg(pdf, x, context);
                }
                //延时执行函数
                setTimeout(function () {
                    for (var i = 1; i <= pdf.numPages; i++) {
                        $("#pageNum" + i + "")[0].toBlob(function (blobObj) {
                            let imgSrc = window.URL.createObjectURL(blobObj)
                            $("#imglist").append('<li class="result current" data-id="" data-name="' + imgSrc + '"> <div class="upload-img-show"> <img src="' + imgSrc + '" width="height="></div> <a href="#" class="remove-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="移除"><span class="iconfont icon-srcm-i-remove"></span></a> <a href="#" class="mark active" data-toggle="tooltip" data-placement="top" title="" data-original-title="点亮星星表示您将此页标为精华，在[生成材料]时如果选择“精华材料”，则仅显示标为精华的页面。"><i class="iconfont icon-srcm-i-star"></i></a> <div class="mask-block"> <div class="actions"> <p>拖动排序</p> </div> </div> </li>')

                        })

                    }
                    setTimeout(function () {
                        //点击一下方便显示出来
                        document.querySelector("#imglist > li:nth-child(1)").click()
                    }, 1000)
                }, 4500);//防止加载不全


            }
        });


        $.ajax({
            type: "get",
            url: "../ashx/bianji.ashx",
            data: { "meth": "patent", userid: document.cookie.split("=")[0], "paperid": paperid },
            dataType: "json",
            success: function (data) {
                console.log(data);
                    //开始填充元素
                    $("input[name='title']").val(data[0].patentname)
                    $("input[value='"+data[0].Patenttype+"']").attr("checked",true)
                    $("input[value='"+data[0].Patentstatus+"']").attr("checked",true)
                    $("input[name='number']").val(data[0].Patentnumber)
                    $("input[name='right_owner']").val(data[0].Patentee)
                    $("input[name='apply_number']").val(data[0].Applicationnumber)
                    $("select[name='my_rank']").val(data[0].ranking)     
                    $("textarea[name='description']").val(data[0].Remarks)
                    $("input[class='mtr-input years']").val(data[0].Authorizationannouncementdate.split(" ")[0].split("/")[0])
                    $("input[class='mtr-input months']").val(data[0].Authorizationannouncementdate.split(" ")[0].split("/")[1])
                    $("input[class='mtr-input dates']").val(data[0].Authorizationannouncementdate.split(" ")[0].split("/")[2])
                    $("#mtr-datepicker-1-input-years > div.mtr-content > input").val(data[0].Patentfilingdate.split(" ")[0].split("/")[0])
                    $("#mtr-datepicker-1-input-months > div.mtr-content > input").val(data[0].Patentfilingdate.split(" ")[0].split("/")[1])
                    $("#mtr-datepicker-1-input-dates > div.mtr-content > input").val(data[0].Patentfilingdate.split(" ")[0].split("/")[2])



                
                toastr['success']('文章已加载。🍾', '成功!', {
                    closeButton: true,
                    tapToDismiss: false,
                });

            },
            error: function (data) {

                toastr['error']('网络错误或文章不存在，请稍后再试。', '错误!', {
                    closeButton: true,
                    tapToDismiss: false,
                });
            }

        });
    }


    $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div.col-xl-9.col-md-8.col-12 > div.col-xl-3.col-md-4.col-12 > div > div > button.btn.btn-primary.w-100.mb-75.waves-effect.waves-float.waves-light").click(function () {
        uploadpdf(0);

    });
    $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div.col-xl-9.col-md-8.col-12 > div.col-xl-3.col-md-4.col-12 > div > div > button.btn.btn-outline-primary.w-100.mb-75.waves-effect").click(function () {
        uploadpdf(1);
    })
}
function uploadpdf(draft) {
    var jsPDF = window.jspdf.jsPDF; //引入jsPDF插件
    var doc = new jsPDF('p', 'mm', 'a4');
    //计算imglist子元素个数

    for (var i = 1; i <= $("#imglist").children().length; i++) {
        console.log($("#imglist").children().length+""+i);
        doc.addImage($("#imglist > li:nth-child(" + i + ")").attr("data-name"), 'JPEG', 0, 0, 210, 297);
        if(i<$("#imglist").children().length)
        doc.addPage();
    }
    var timestamp = new Date().getTime();
    if (id != "../upload/null.pdf")
    timestamp= getUrlParam('id')
    let pdf = doc.output('blob');

    let formData = new FormData()
    console.log(formData);
     formData.append("file", pdf);
    formData.append("meth", "uppdf");
    formData.append("timestamp", timestamp);
    formData.append("savepath", "../upload/");

    $.ajax({
        url: "../ashx/upload.ashx",  //后台接收地址
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
                uploaddetail(timestamp,draft);
        },
        error: function (data) {
            toastr['error']('网络错误，请稍后再试。', '错误!', {
                closeButton: true,
                tapToDismiss: false,
            });
        }
    });
}
function uploaddetail(timestamp,draft) {
        var patent = {
           meth: "patent",
           userid:document.cookie.split("=")[0],
           paperid:timestamp,
           patentname:$("input[name='title']").val(),
           Patenttype:$("input[name='typeid']:checked").val(),
           Patentstatus:$("input[name='status']:checked").val(),
           Patentnumber:$("input[name='number']").val(),
           Patentee:$("input[name='right_owner']").val(),
           Authorizationannouncementdate:$("input[class='mtr-input years']").val()+"-"+$("#mtr-datepicker-0-input-months > div.mtr-content > input").val()+"-"+$("input[class='mtr-input dates']").val(),
           Applicationnumber:$("input[name='apply_number']").val(),
           Patentfilingdate:$("#mtr-datepicker-1-input-years > div.mtr-content > input").val()+"-"+$("#mtr-datepicker-1-input-months > div.mtr-content > input").val()+"-"+$("#mtr-datepicker-1-input-dates > div.mtr-content > input").val(),
           ranking:$("select[name='my_rank']").val(),
           Remarks:$("textarea[name='description']").val(),
           draft:draft
        }
        if (id != "../upload/null.pdf") {
            patent.meth="patentupdate";
    }
                console.log(patent);
        $.ajax({
            url: "../ashx/upload.ashx",
            type: "get",
            dataType: "json",
            data: patent,
            success: function (data) {
                console.log(data)
                toastr['success']('👋 现在可以去首页查看啦！', '论文上传成功', {
                    closeButton: true,
                    tapToDismiss: false,
                    progressBar: true,
                });
            },
            err: function (err) {
            }
        })
}

