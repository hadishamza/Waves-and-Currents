/**
 * Created by Jinghan on 8/2/16.
 */
"use strict"

class Drink {
    constructor(object) {
        this.name = object["namn"];
        this.altName = object["namn2"];
        this.price = object["price"];
        this.count = object["count"];
        this.id = object["beer_id"];
    }

    customerSpecificPrice(customer) {
        return this.price
    }
}