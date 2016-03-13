/**
 * Created by Jinghan on 8/2/16.
 */

function logInAndRegisterCurrentUser(userName, password) {

    logIn(userName, password, function(success, response) {
        if (success) {
            currentUser = response;
            if (response instanceof Administrator) {
                sessionStorage.usertype = "Admin";
                window.location = "/Waves-and-Currents/views/admin/main.html";
            } else {
                sessionStorage.usertype = "Customer";
                window.location = "/Waves-and-Currents/views/customer/main.html";
            }
        } else {
            $('#login-error-message').fadeIn();
            $('#login-error-message').delay(3500).fadeOut();
        }
    })
}

$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});