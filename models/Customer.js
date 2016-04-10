/**
 * Created by Jinghan on 8/2/16.
 *
 * Customer is a subclass of Person.
 * It has several additional methods: getPurchases, getPayments, getCredits, getAccountInfo and
 * buyDrink.
 */
"use strict"

class Customer extends Person {


    // get the history purchase of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an array of the purchased record if so

    getPurchases(completion) {
        GET(this, "purchases_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"]);
            } else {
                completion(false, response);
            }
        });
    }


    // get the history payment of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an array of the purchased record if so

    getPayments(completion) {
        GET(this, "payments_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"]);
            } else {
                completion(false, response);
            }
        });
    }


    // get the current credit of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an integer for the credit if so

    getCredit(completion) {
        getAccountInfo(function(success, response){
            if (success) {
                completion(true, response["payload"][0]["assets"]);
            } else {
                completion(false, response);
            }
        });
    }

    //get the account info of this user, including first name, last name, id and asset.
    getAccountInfo(completion) {
        GET(this, "iou_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"][0]);
            } else {
                completion(false, response);
            }
        });
    }


    // buy certain amount of certain drink
    // completion is a function accept one boolean to indicate
    // whether the operation is successful

    buyDrink(beer, completion) {
        if (beer.id == undefined) {
            completion(false, "undefined beer id");
            return
        }

        if (beer.customerSpecificPrice(this) == undefined) {
            completion(false, "undefined beer price");
            return
        }

        GET(this, "purchases_append", {
            "beer_id" : beer.id
        }, function(success, response){
            if (success) {
                GET(this, "payments_append", {
                    "amount" : beer.customerSpecificPrice(this)
                }, function(success, response){
                    if (success) {
                        completion(true);
                    } else {
                        completion(false, response);
                    }
                });
            } else {
                completion(false, response);
            }
        });
    }
}