       function createClicked() {
           $.ajax({
               url: "/signup",
               type: "POST",
               data: {
                   username: $("#newusername").val(),
                   password: $("#newpassword").val(),
                   passwordconfirm: $("#passwordconfirm").val()
               },
               success: function (data) {
                   if (!data)
                       alert("BAD LOGIN");
                   else
                       window.location = data.redirect;
               },
               dataType: "json"
           });
           return false;
       }

       function loginClicked() {
           $.ajax({
               url: "/login",
               type: "POST",
               data: {
                   username: $("#username").val(),
                   password: $("#password").val()
               },
               success: function (data) {
                   if (!data)
                       alert("BAD LOGIN");
                   else
                       window.location = data.redirect;
               },
               dataType: "json"
           });
           return false;
       }

       $(document).ready(function () {
           $("#password").keydown(function (event) {
               if (event.which === 13) {
                   loginClicked();
                   event.preventDefault();
                   return false;
               }
           });

           $("#passwordconfirm").keydown(function (event) {
               if (event.which === 13) {
                   createClicked();
                   event.preventDefault();
                   return false;
               }
           });

           $("#createButton").click(createClicked);
           $("#loginButton").click(loginClicked);
           if (window.location == "http://localhost:3000/session") {
               console.log("the sesion is " + window.location);
               $.ajax({
                   url: "/checksession",
                   type: "GET",
                   success: function (data) {
                       if (data)
                           window.location = data.redirect;
                       else
                           alert("HECK");
                   },
                   dataType: "json"
               });
           }

       });
