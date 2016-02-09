/**
 * Created by Jinghan on 8/2/16.
 */
import "Person.js"

class Customer extends Person {


    // get the history purchase of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an array of the purchased record if so

    getPurchases(completion) {
        //TODO: call backend service to get purchase array, then call the completion callback
        var purchaseArray;
        completion(true, purchaseArray);
    }


    // get the history payment of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an array of the purchased record if so

    getPayments(completion) {
        //TODO: call backend service to get purchase array, then call the completion callback
        var paymentArray;
        completion(true, paymentArray);
    }


    // get the current credit of this user
    // completion is a function accepting an boolean to indicate
    // whether the operation is successful and
    // an integer for the credit if so

    getCredit(completion) {
        //TODO: call backend service to get credit, then call the completion callback
        var credit;
        completion(true, credit);
    }


    // buy certain amount of certain drink
    // completion is a function accept one boolean to indicate
    // whether the operation is successful

    buyDrink(drinkID, amount, completion) {
        //TODO: call backend service to complete the buy drink action, need to append both purchase and payment
        completion(true);
    }
}