/**
 * Created by Jinghan on 9/2/16.
 */
"use strict"

class Person {
    constructor(firstName, lastName, id, userName, password) {
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }

    getInventoryList(completion) {
        GET(this, "inventory_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"]);
            } else {
                completion(false, response);
            }
        });
    }

    getDrinkData(beer, completion) {
        if (beer.id == undefined) {
            completion(false, "undefined beer id");
            return
        }

        GET(this, "beer_data_get", {
            "beer_id" : beer.id
        }, function(success, response){
            if (success) {
                completion(true, response["payload"][0]);
            } else {
                completion(false, response);
            }
        });
    }
}