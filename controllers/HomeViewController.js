/**
 * Created by Jinghan on 8/2/16.
 */

function logInAndRegisterCurrentUser(userName, password) {

    logIn(userName, password, function(success, response) {
        if (success) {
            currentUser = response;
            if (response instanceof Administrator) {
                window.location = "../admin/main.html";
            } else {
                window.location = "../customer/main.html";
            }
        }
    })
}

$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});