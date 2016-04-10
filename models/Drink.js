/**
 * Created by Jinghan on 8/2/16.
 *
 * Drink is an entity containting 5 attributes: name, altName, price, count and id
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