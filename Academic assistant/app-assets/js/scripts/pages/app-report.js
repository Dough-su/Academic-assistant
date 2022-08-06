// 这里是论文页面的js

window.onload = function () {
    loadinfo(1);

    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            const hitokoto = document.getElementById('hitokoto')
            hitokoto.innerText = data.hitokoto
        })
        .catch(console.error)
  
  }
  function delfile(paperid){
    Swal.fire({
      title: '确定删除吗?',
      text: "文件将被移至回收站!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '确定删除!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "get",
          url: "/ashx/delete.ashx",
          data: {
            tabname:"report",
            meth: "torecycle",
            paperid:paperid,
            userid:document.cookie.split("=")[0]
          },
          success: function (data) {
            if(data){
              Swal.fire({
                icon: 'success',
                title: '已删除!',
                text: '您的文件已被删除!',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              loadinfo(1);
            }else{
              toastr['error']('删除失败！', '', {
                  closeButton: true,
                  tapToDismiss: false,
                  progressBar: true,
              });
            }
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: '已取消',
          text: '您的文件未被删除:)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });

  }
  
  function clipboard(paperid) {
  var url=window.location.host+"/html/app-preview.html?id="+paperid;
  //将url复制到剪贴板
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
  }
  function loadinfo(page) {
   
    $.ajax({
      url: "../ashx/getdata.ashx",
      type: "POST",
      data: { meth: "report", userid: document.cookie.split("=")[0] },
      success: function (data) {
        
        console.log(data);
        $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div > table > thead").empty().append('<tr><th>新闻信息</th><th>媒体级别</th><th class="text-truncate">报道时间</th><th>状态</th><th class="cell-fit">操作</th></tr>');
        $(".d-flex.justify-content-between.mx-2.row").remove()
        for (var i = (page - 1) * 10; i < page * 10&&i<data.length; i++)
        if(data[i].draft=="0")
          $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div > table > thead").append('<tr class="odd"><td class=" control" tabindex="0" style="display: none;"></td><td><div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar bg-light-success me-50"><div class="avatar-content">'+data[i].news.substring(0,2)+'</div></div></div><div class="d-flex flex-column"><h6 class="user-name text-truncate mb-0">' + data[i].news + '</h6><small class="text-truncate text-muted">' + data[i].medianame + '</small></div></div></td><td><span class="d-none">6666</span>' + data[i].medialevel + '</td><td><span class="d-none">20190509</span>' + data[i].reportingtime.split(' ')[0] + '</td><td><span class="badge rounded-pill badge-light-success" text-capitalized="">完成</span></td><td><div class="d-flex align-items-center col-actions"><a class="me-1" onclick="clipboard('+data[i].paperid+')" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="分享" aria-label="分享"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send font-medium-2 text-body"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a><a class="me-25" href="app-preview.html?id='+data[i].paperid+'" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="预览" aria-label="预览"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye font-medium-2 text-body"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a><div class="dropdown"><a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical font-medium-2 text-body"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a><div class="dropdown-menu dropdown-menu-end" style=""><a href="../upload/'+data[i].paperid+'.pdf" download="'+data[i].paperid+'.pdf" class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download font-small-4 me-50"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>下载</a><a href="app-edit-report.html?id='+data[i].paperid+'"  class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit font-small-4 me-50"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>编辑</a><a onclick=delfile('+data[i].paperid+') class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash font-small-4 me-50"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>删除</a></div></div></div></td></tr>');
        else
                $("body > div.app-content.content > div.content-wrapper.container-xxl.p-0 > div.content-body > section > div > div > table > thead").append('<tr class="odd"><td class=" control" tabindex="0" style="display: none;"></td><td><div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar bg-light-success me-50"><div class="avatar-content">'+data[i].news.substring(0,2)+'</div></div></div><div class="d-flex flex-column"><h6 class="user-name text-truncate mb-0">' + data[i].news + '</h6><small class="text-truncate text-muted">' + data[i].medianame + '</small></div></div></td><td><span class="d-none">6666</span>' + data[i].medialevel + '</td><td><span class="d-none">20190509</span>' + data[i].reportingtime.split(' ')[0] + '</td><td><span class="badge rounded-pill badge-light-warning" text-capitalized="">草稿</span></td><td><div class="d-flex align-items-center col-actions"><a class="me-1" onclick="clipboard('+data[i].paperid+')"  data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="分享" aria-label="分享"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send font-medium-2 text-body"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a><a class="me-25" href="app-preview.html?id='+data[i].paperid+'" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="预览" aria-label="预览"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye font-medium-2 text-body"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a><div class="dropdown"><a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical font-medium-2 text-body"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a><div class="dropdown-menu dropdown-menu-end" style=""><a href="../upload/'+data[i].paperid+'.pdf" download="'+data[i].paperid+'.pdf" class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download font-small-4 me-50"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>下载</a><a href="app-edit-report.html?id='+data[i].paperid+'" class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit font-small-4 me-50"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>编辑</a><a onclick=delfile('+data[i].paperid+') class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash font-small-4 me-50"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>删除</a></div></div></div></td></tr>');
        $(".card-datatable.table-responsive").append('<div class="d-flex justify-content-between mx-2 row" style="margin-top:10px;"><div class="col-sm-12 col-md-6" "></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"></ul></div></div></div>')
        //填充按钮
        if(page>1)
        $(".pagination").append('<li class="paginate_button page-item previous " id="DataTables_Table_0_previous"><a onclick="loadinfo('+(page-1)+')" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link">&nbsp;</a></li>')
        else
        $(".pagination").append('<li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link">&nbsp;</a></li>')
  
        for (var x = 1; x <= Math.ceil(data.length/10); x++){
         if(x==page)
         {
          $(".pagination").append('<li class="paginate_button page-item active"><a  aria-controls="DataTables_Table_0" data-dt-idx="'+x+'" tabindex="0" class="page-link">'+x+'</a></li>')
         }
         else
          $(".pagination").append('<li class="paginate_button page-item "><a onclick="loadinfo('+x+')" aria-controls="DataTables_Table_0" data-dt-idx="'+x+'" tabindex="0" class="page-link">'+x+'</a></li>')
  
        }
        if(page<Math.ceil(data.length/10))
        $(".pagination").append('<li class="paginate_button page-item next" id="DataTables_Table_0_next"><a onclick="loadinfo('+(page+1)+')" aria-controls="DataTables_Table_0" data-dt-idx="6" tabindex="0" class="page-link">&nbsp;</a></li>')
        else
        $(".pagination").append('<li class="paginate_button page-item next" id="DataTables_Table_0_next disabled"><a aria-controls="DataTables_Table_0" data-dt-idx="6" tabindex="0" class="page-link">&nbsp;</a></li>')
        toastr['success']('第'+page+'页文章已加载。🍾', '成功!', {
          closeButton: true,
          tapToDismiss: false,
        });
      },
      error: function (data) {
        toastr['error']('网络错误，请稍后再试。', '错误!', {
          closeButton: true,
          tapToDismiss: false,
        });
      }
  
  
  
    })
  }
  
  
  
  