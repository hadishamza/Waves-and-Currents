/**
 * Created by Jinghan on 8/2/16.
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
                completion(true, response);
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
                completion(true, response);
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
        GET(this, "iou_get", undefined, function(success, response){
            if (success) {
                completion(true, response["payload"][0]["assets"]);
            } else {
                completion(false, response);
            }
        });
    }


    // buy certain amount of certain drink
    // completion is a function accept one boolean to indicate
    // whether the operation is successful

    buyDrink(drinkID, amount, completion) {
        //TODO: call backend service to complete the buy drink action, need to append both purchase and payment
        completion(true);
    }
}