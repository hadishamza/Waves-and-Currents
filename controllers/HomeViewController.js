/**
 * Created by Jinghan on 8/2/16.
 */

logInAndReigsterCurrentUser("ervtod", "ervtod")

function logInAndReigsterCurrentUser(userName, password) {
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