      function logoutClient(data) {
          $.ajax({
              url: "/logout",
              type: "GET",
              success: function (data) {
                  console.log("logged a boy out");
                  window.location = data.redirect;
              },
              dataType: "json"
          });
          return false;
      }

      function doUserDisplay() {
          console.log("doin it");
          $.ajax({
              url: "/userinfo",
              type: "GET",
              success: function (data) {
                  console.log("success");
                  if (!data) {
                      alert("YOU ARE NOT LOGGED IN -.-");
                      window.location = "/";
                  } else {
                      console.log(data.username);
                      $("#userDisplay").html(data.username);
                  }
              },
              dataType: "json"
          });
          return false;
      }

      function successChange(data) {
          if (!data)
              alert("ERROR");
      }

      $(document).ready(
          function () {
              console.log("im in doc.ready");
              doUserDisplay();
              $("form").submit(
                  function (event) {

                      if ($("#fileStuff").val() == "") {
                          alert("NO IMAGE");
                          return false;
                      }

                      $.post("/upload", {}, successChange);


                  });
              $("#logout").click(logoutClient);
          });
