/**
 * Created by Jinghan on 8/2/16.
 */

var baseURL = ""

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
        url: "http://pub.jamaica-inn.net/fpdb/api.php",
        type: "get",
        data: data,
        success: function(response) {
            completion(true, response);
        }, error: function(message) {
            completion(false, message);
        }
    });
}