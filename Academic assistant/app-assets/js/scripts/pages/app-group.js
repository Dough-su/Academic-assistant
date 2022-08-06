function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}
window.onload = function () {
    fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        const hitokoto = document.getElementById('hitokoto')
        hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
}
function remove(){
    $(".delete.danger-link").on('click', function () {
        countx--;
      });
}
var countx = 0;
document.querySelector("#book-shelves > div:nth-child(1)").addEventListener("click", function () {
    sleep(500).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "paper",userid:document.cookie.split("=")[0]},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'" > <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td>  <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="    margin-top: -30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].papername+'">'+data[i].papername+'</p>     </div> </td>    <td class="doc-jurnal"><p title="'+data[i].Publicationname+'">'+data[i].Publicationname+'</p></td>    <td class="doc-jurnal-lever"><p title="'+data[i].Indexsearch+'">'+data[i].Indexsearch+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Startingtime+'">'+data[i].Startingtime+'</p></td><td><p title="'+data[i].Impactfactor+'">'+data[i].Impactfactor+'</p></td>                       </tr>')
                }
            }
        })
        remove()
        countx++
    })
})
document.querySelector("#book-shelves > div:nth-child(2)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "govresearch",userid:document.cookie.split("=")[0]},
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="0"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td>  <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="margin-top :-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].Subjectname+'">'+data[i].Subjectname+'</p>   </div> </td>    <td class="doc-source"><p title="'+data[i].Fundname+'">'+data[i].Fundname+'</p></td>    <td><p title="'+data[i].Subjectlevel+'">'+data[i].Subjectlevel+'</p></td>    <td><p title="'+data[i].subjectstatus+'">'+data[i].subjectstatus+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Startingtime.split(' ')[0]+'">'+data[i].Startingtime.split(' ')[0]+'</p></td>    <td class="doc-my-rank"><p title="'+data[i].ranking+'">'+data[i].ranking+'</p></td>    <td><p title="'+data[i].Receiptofexpenses+'">'+data[i].Receiptofexpenses+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
document.querySelector("#book-shelves > div:nth-child(3)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "software", userid:document.cookie.split("=")[0] },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="0"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td>  <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="margin-top :-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].Copyrightname+'">'+data[i].Copyrightname+'</p>    </div> </td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Developmentcompletiontime+'">'+data[i].Developmentcompletiontime+'</p></td>    <td><p title="'+data[i].Copyrighttype+'">'+data[i].Copyrighttype+'</p></td>    <td><p title="'+data[i].copyrightowner+'">'+data[i].copyrightowner+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*专利*/
document.querySelector("#book-shelves > div:nth-child(4)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "patent", userid:document.cookie.split("=")[0] },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+(i)+'" draggable="false" style=""> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].patentname+'">'+data[i].patentname+'</p>   </div> </td>    <td><p title="'+data[i].Patenttype+'">'+data[i].Patenttype+'</p></td>    <td class="doc-number"><p title="'+data[i].Patentnumber+'">'+data[i].Patentnumber+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Authorizationannouncementdate.split(' ')[0]+'">'+data[i].Authorizationannouncementdate.split(' ')[0]+'</p></td>    <td><p title="'+data[i].Applicationnumber+'">'+data[i].Applicationnumber+'</p></td>    <td><p title="'+data[i].Patentstatus+'">'+data[i].Patentstatus+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*个人获奖*/
document.querySelector("#book-shelves > div:nth-child(5)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: {meth: "award", userid:document.cookie.split("=")[0]  },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+(i)+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].Honoraryname+'">' + data[i].Honoraryname + '</p>    </div> </td>    <td><p title="'+data[i].Awards+'">'+data[i].Awards+'</p></td>    <td><p title="'+data[i].level+'">'+data[i].level+'</p></td>    <td><p title="'+data[i].Grantingunit+'">'+data[i].Grantingunit+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].winningtime.split(' ')[0]+'">'+data[i].winningtime.split(' ')[0]+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*学生获奖*/
document.querySelector("#book-shelves > div:nth-child(6)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: {meth: "stuaward", userid:document.cookie.split("=")[0]  },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">' + (i + 1) + '</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].gamename+'">'+data[i].gamename+'</p>   </div> </td>    <td><p title="'+data[i].Awards+'">'+data[i].Awards+'</p></td>    <td><p title="'+data[i].level+'">'+data[i].level+'</p></td>    <td class="doc-school"><p title="'+data[i].Grantingunit+'">'+data[i].Grantingunit+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].winningtime+'">'+data[i].winningtime+'</p></td>    <td><p title="'+data[i].Awardwinningstudents+'">'+data[i].Awardwinningstudents+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*著作*/
document.querySelector("#book-shelves > div:nth-child(7)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "book", userid:document.cookie.split("=")[0] },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'" draggable="false" style=""> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">' + (i + 1) + '</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].bookname+'">'+data[i].bookname+'</p>   </div> </td>    <td><p title="'+data[i].publishinghouse+'">'+data[i].publishinghouse+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Publisheddate+'">'+data[i].Publisheddate+'</p></td>    <td><p title="'+data[i].Publicationnumber+'">'+data[i].Publicationnumber+'</p></td>    <td><p title="'+data[i].wordcount+'">'+data[i].wordcount+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*横向课题*/
document.querySelector("#book-shelves > div:nth-child(8)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "research", userid:document.cookie.split("=")[0] },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">' + (i + 1) + '</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].Subjectname+'">'+data[i].Subjectname+'</p>   </div> </td>    <td class="doc-source"><p title="'+data[i].contractsource+'">'+data[i].contractsource+'</p></td>    <td><p title="'+data[i].Receiptofexpenses+'">'+data[i].Receiptofexpenses+'</p></td>    <td><p title="'+data[i].subjectstatus+'">'+data[i].subjectstatus+'</p></td>    <td class="'+data[i].Startingtime.split(' ')[0]+'"><p>'+data[i].Startingtime+'</p></td>    <td class="doc-my-rank"><p title="'+data[i].ranking+'">'+data[i].ranking+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*新闻报道*/
document.querySelector("#book-shelves > div:nth-child(9)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "report", userid:document.cookie.split("=")[0]},
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">' + (i + 1) + '</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].news+'">'+data[i].news+'</p>   </div> </td>    <td><p title="'+data[i].medialevel+'">'+data[i].medialevel+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].reportingtime.split(' ')[0]+'">'+data[i].reportingtime.split(' ')[0]+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*档案材料*/
document.querySelector("#book-shelves > div:nth-child(10)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: { meth: "certificate", userid:document.cookie.split("=")[0] },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">' + (i + 1) + '</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].filetitle+'">'+data[i].filetitle+'</p>   </div> </td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Gettime+'">'+data[i].Gettime+'</p></td>    <td><p title="'+data[i].Certificatetype+'">'+data[i].Certificatetype+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
/*其他*/
document.querySelector("#book-shelves > div:nth-child(11)").addEventListener("click", function () {
    sleep(100).then(() => {
        $.ajax({
            url: "../ashx/getdata.ashx",
            type: "get",
            dataType: "json",
            data: {meth: "others", userid:document.cookie.split("=")[0]  },
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    $("#book > div.outer-sortable > div:nth-child(" + countx + ") > div > div.search-panel > div > table > tbody").append('<tr data-id="'+data[i].paperid+'" class="drag-item checked" data-index="'+i+'"> <td> <a href="#" class="choose" draggable="false"> <span class="iconfont icon-srcm-i-checkbox-unse"> </span> <!--  <span class="iconfont icon-srcm-i-checkbox-sele"> </span> <input type="checkbox" checked>  --> </a> </td> <td> <span class="number">'+(i+1)+'</span> <div class="operation" style="margin-top:-30px;">  <a href="#" class="btn btn-primary modify" target="_blank" draggable="false">编辑</a>  <span class="btn btn-primary op-move-up"><span class="srcm-i-up"></span>上移</span> <span class="btn btn-primary op-move-down"><span class="srcm-i-down"></span>下移</span> </div> </td>   <td class="doc-title">  <div class="title-wrap"> <p title="'+data[i].Achievementname+'" zh="">'+data[i].Achievementname+'</p>   </div> </td>    <td class="doc-my-rank"><p title="'+data[i].ranking+'">'+data[i].ranking+'</p></td>    <td class="doc-jurnal-puttime"><p title="'+data[i].Gettime+'">'+data[i].Gettime+'</p></td>   </tr>')
                }
            }
        })
        remove()
        countx++;
    })
})
document.querySelector("#submit").addEventListener("click", function () {
    var url="/html/app-export.html"
    for(var x=1;x<=countx;x++)
   for(var i=1;i<=document.querySelector("#book > div.outer-sortable > div:nth-child("+x+") > div > div.search-panel > div > table > tbody").children.length;i++)
   if(x==1&&i==1)
    url+='?id='+$("#book > div.outer-sortable > div > div > div.search-panel > div > table > tbody > tr:nth-child("+i+")").attr("data-id")
    else
    url+='&id='+$("#book > div.outer-sortable > div > div > div.search-panel > div > table > tbody > tr:nth-child("+i+")").attr("data-id")
    console.log(url)
    window.open(url)
})
