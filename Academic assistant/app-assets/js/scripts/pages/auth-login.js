/*=========================================================================================
  File Name: auth-login.js
  Description: Auth login js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
window.onload = function() {
  document.querySelector("#login").onclick = function() {
    $.ajax({
      type: "POST",
      url: "../ashx/userinfo.ashx",
      data: {
        useremail:$("#login-email").val(),
        userpwd:$("#login-password").val(),
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
    setCookie("useremail", $("#login-email").val(), 1);
    setCookie("userpwd", $("#login-password").val(), 1);
  }
}
$(function () {
  'use strict';

  var pageLoginForm = $('.auth-login-form');

  // jQuery Validation
  // --------------------------------------------------------------------
  if (pageLoginForm.length) {
    pageLoginForm.validate({
      rules: {
        'login-email': {
          required: true,
          email: true
        },
        'login-password': {
          required: true
        }
      }
    });
  }
});
