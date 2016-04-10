/**
 * Created by Jinghan on 8/2/16.
 *
 * BackendManager provides the services which is used to interact with backend.
 */

var baseURL = "http://pub.jamaica-inn.net/fpdb/api.php"
var currentUser;


// The traditional ajax get.
function GET(person, action, data, completion) {

    if (action == undefined) {
        completion(false, "undefined action");
        return
    }

    if (data == undefined) {
        data = {}
    }

    data["action"] = action;
    data["username"] = person.userName;
    data["password"] = person.password;

    $.ajax({
        url: baseURL,
        type: "get",
        data: data,
        success: function(response) {
            completion(true, response);
        }, error: function(message) {
            completion(false, message);
        }
    });
}

// Login to the session
function logIn(userName, password, completion) {
    // a little hack here, use 'payments_get_all' we can check whether
    // the password is correct as well as the role of the logged in user
    var tempPerson = new Person(undefined, undefined, undefined, userName, password);

    GET(tempPerson, "payments_get_all", undefined, function(success, response){
        if (success) {
            var type = response["type"];
            if (type === "payments_get_all") {
                var administrator = new Administrator(undefined, undefined, undefined, userName, password);
                completion(true, administrator);
            } else {
                var errorCode = response["payload"][0]["code"];
                if (errorCode == 2) {
                    completion(false, "Incorrect Password");
                } else if (errorCode == 3) {
                    var customer = new Customer(undefined, undefined, undefined, userName, password);
                    completion(true, customer);
                } else {
                    completion(false, response);
                }
            }
        } else {
            completion(false, response);
        }
    });
}