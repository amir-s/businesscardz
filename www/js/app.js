var k = "";
$(function() {
  ionic.Platform.ready(function () {
    $("#lg").click(function () {

      navigator.googleConnectPlugin.googleLogin(
        function (obj) {
          k = JSON.stringify(obj);
          alert(JSON.stringify(obj)); // do something useful instead of alerting
        },
        function (msg) {
          alert('error: ' + msg);
        });


    });

  })
});