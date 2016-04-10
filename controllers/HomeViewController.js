/**
 * Created by Jinghan on 8/2/16.
 *
 * This controller controls the login page
 */

function logInAndRegisterCurrentUser(userName, password) {

    logIn(userName, password, function(success, response) {
        if (success) {
            currentUser = response;
            // If currentUser is admin, we direct him/her to admin page, otherwise to user page
            if (response instanceof Administrator) {
                sessionStorage.usertype = "Admin";
                window.location = "/Waves-and-Currents/views/admin/main.html";
            } else {
                sessionStorage.usertype = "Customer";
                window.location = "/Waves-and-Currents/views/customer/main.html";
            }
        } else {
            // Log in is not successful, we shown the error messages
            $('#login-error-message').fadeIn();
            $('#login-error-message').delay(3500).fadeOut();
        }
    })
}

$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});