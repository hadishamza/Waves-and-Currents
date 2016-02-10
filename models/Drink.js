/**
 * Created by Jinghan on 8/2/16.
 */
"use strict"

class Drink {
    constructor(type, id, name, altName, price, discountPrice, count) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.altName = altName;
        this.price = price;
        this.discountPrice = discountPrice;
        this.count = count;
    }

    customerSpecificPrice(customer) {
        return this.price
    }
}