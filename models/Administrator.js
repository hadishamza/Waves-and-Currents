/**
 * Created by Jinghan on 9/2/16.
 *
 * Administrator is a subclass of Person. It has an additional function called 
 * addDrink.
 */
"use strict"

class Administrator extends Person {

    // addDrink takes in the id amount, price and a callback handler
    // a number of certain amount of the drink that id specified will be added to stock
    // The callback handler takes in two parameters, the first one is a boolean
    // indicating whether the process is successful, the last one is the reponse from
    // the server side
    addDrink(id, amount, price, completion) {

        //input validations

        //id has to be valid
        if (id == undefined) {
            completion(false, "undefined beer id");
            return
        }

        //amount has to be valid
        if (amount == undefined || amount <= 0) {
            completion(false, "invalid amount");
            return
        }

        //price has to be valid
        if (price == undefined || price < 0) {
            completion(false, "invalid price");
            return
        }

        //call backend to perform the update
        GET(this, "inventory_append", {
            "beer_id" : id,
            "amount" : amount,
            "price" : price
        }, function(success, response){
            if (success) {
                completion(true, response);
            } else {
                completion(false, response);
            }
        });
    }
}