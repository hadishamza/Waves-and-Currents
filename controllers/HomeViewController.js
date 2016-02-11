/**
 * Created by Jinghan on 8/2/16.
 */

function logInAndRegisterCurrentUser(userName, password) {
    logIn(userName, password, function(success, response) {
        if (success) {
            currentUser = response;
            if (response instanceof Administrator) {
                console.log("Welcome, Admin");
            } else {
                console.log("Welcome, Customer");
            }
        }
    })
}
