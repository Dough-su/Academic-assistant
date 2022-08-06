/*=========================================================================================
	File Name: auth-two-steps.js
	Description: Two Steps verification.
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

var inputContainer = document.querySelector('.auth-input-wrapper');
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
window.onload = function () {
  document.querySelector("#login").onclick = function () {
    var code="";
    for(var i=1;i<=6;i++){
      code+=$("body > div.app-content.content > div.content-wrapper > div.content-body > div > div > div.d-flex.col-lg-4.align-items-center.auth-bg.px-2.p-lg-5 > div > form > div > input:nth-child("+i+")").val()
    }
    console.log(code);
    $.ajax({
      type: "POST",
      url: "../ashx/userinfo.ashx",
      data: {
        useremail:getCookie("useremail"),
        code:code,
        meth:"auth"
      },
      success: function(data) {
        if(data!="验证码错误"){
          setCookie("userid",data,7);
          window.location.href="app-paper.html";
        }
        else
        toastr['error'](data, '错误!', {
          closeButton: true,
          tapToDismiss: false,
      });
      },
      err: function(data) {
        toastr['success']("网络错误", '错误!', {
          closeButton: true,
          tapToDismiss: false,
      });
      }
    })
  }
}
function resend(){
  $.ajax({
    type: "POST",
    url: "../ashx/userinfo.ashx",
    data: {
      useremail:getCookie("useremail"),
      userpwd:getCookie("userpwd"),
      meth:"login"
    },
    success: function(data) {
      if(data=="已发送验证码到您的邮箱，请查收")
       window.location.href="auth-two-steps.html";
      toastr['error'](data, '错误!', {
        closeButton: true,
        tapToDismiss: false,
    });
    },
    err: function(data) {
      toastr['success']("网络错误", '错误!', {
        closeButton: true,
        tapToDismiss: false,
    });
    }


  })
}
// Get focus on next element after max-length reach
inputContainer.onkeyup = function (e) {
  var target = e.srcElement;
  var maxLength = parseInt(target.attributes['maxlength'].value, 10);
  var currentLength = target.value.length;

  if (e.keyCode === 8) {
    if (currentLength === 0) {
      var next = target;
      while ((next = next.previousElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == 'input') {
          next.focus();
          break;
        }
      }
    }
  } else {
    if (currentLength >= maxLength) {
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == 'input') {
          next.focus();
          break;
        }
      }
    }
  }
};

//  Two Steps Verification
const numeralMask = document.querySelectorAll('.numeral-mask');

// Verification masking
if (numeralMask.length) {
  numeralMask.forEach(e => {
    new Cleave(e, {
      numeral: true
    });
  });
}
