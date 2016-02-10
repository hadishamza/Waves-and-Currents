/**
 * Created by Jinghan on 9/2/16.
 */
"use strict"

class Administrator extends Person {
    addDrink(id, amount, price, completion) {
        if (id == undefined) {
            completion(false, "undefined beer id");
            return
        }

        if (amount == undefined || amount <= 0) {
            completion(false, "invalid amount");
            return
        }

        if (price == undefined || price < 0) {
            completion(false, "invalid price");
            return
        }

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