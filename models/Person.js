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

    // get the list of beers
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an array of the beers if so

    getInventoryList(completion) {
        GET(this, "inventory_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"]);
            } else {
                completion(false, response);
            }
        });
    }


    // get the list of beers
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an object of detailed beer if so
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