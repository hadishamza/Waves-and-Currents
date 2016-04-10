// DragDropManager provides services including drag and drop and the accociated undo and redo.

//remember <script src="../../services/DragDropManager.js"></script>
// fix selectors

//The two stack: undo stack and redo stack
var stateStack = [];
var stateStackRedo = [];

// MARK Drag & Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev){
	ev.dataTransfer.setData("element", ev.currentTarget.id);
}

function drop(ev){
	ev.preventDefault();
	var data = ev.dataTransfer.getData("element");
	if(data){
		var beerData = $("#"+data).data("beer"); // gather beer data through data-tag

		var currentState =  stateStack.pop();
		stateStack.push(cloneObject(currentState));
		if (currentState == undefined) {
			currentState = [];
		}

		var containsDrink = false;
		for (var i = 0; i < currentState.length; i++) {
			var entry = currentState[i];
			if (entry["drink"]["id"] === beerData.id) {
				entry.amount++;
				containsDrink = true;
			}
		}

		if (!containsDrink) {
			currentState.push({"drink":beerData, "amount":1});
		}

		//update currentState to undo stack
		stateStack.push(currentState);
		//clear redo stack whenever the current state is changed
		stateStackRedo = [];
	}
}


// MARK: undo & redo

// This is a utility function which deep clone an javascript object
function cloneObject(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	var temp = obj.constructor(); // give temp the original obj's constructor
	for (var key in obj) {
		temp[key] = cloneObject(obj[key]);
	}

	return temp;
}

//undo current state
function undo() {
	if (stateStack.length > 0) {
		// TODO: Find better ways to update view when undo the user-manually-input amount
		// 1. This is a 'hack' currently. The bound view won't update until the array becomes empty.
		// Therefore, to make it work, I empty the array first then put in meaningful data
		// There is a 10 ms timeout because the view is updated every 5ms
		// 2. When user manually input some amount, the observing method is 'oninput' of the text field
		// instead of 'ng-change'. This is because ng-change will create a dead loop: ng-change calls for
		// model update, then model update leads to the value update in the view, then the value update
		// calls for ng-change again.
		var backup = stateStack;
		stateStack = [];
		setTimeout(function(){
			stateStack = backup;
			var state = stateStack.pop();
			stateStackRedo.push(state);
		}, 10);
	}
}

//redo current state
function redo() {
	if (stateStackRedo.length > 0) {
		var state = stateStackRedo.pop();
		stateStack.push(state);
	}
}

//remove all current contents in tray
function clearTray() {
	stateStack.push([]);
}

//remove certain drink from current tray
function removeDrinkFromTray(id) {
	if(id){
		var currentState =  stateStack.pop();
		stateStack.push(cloneObject(currentState));

		currentState = currentState.filter(function(entry){
			return entry.drink.id !== id;
		});

		stateStack.push(currentState);
		stateStackRedo = [];
	}
}

//update the amount for a certain drink in current tray
function updateDrinkAmount(element) {
	var drink = JSON.parse(element.dataset.drink);
	updateAmountForDrink(drink.id, element.value);
}

function updateAmountForDrink(id, newAmount) {
	if(id && newAmount){
		var currentState =  cloneObject(stateStack[stateStack.length - 1]);
		var containsDrink = false;
		for (var i = 0; i < currentState.length; i++) {
			var entry = currentState[i];
			if (entry["drink"]["id"] === id) {
				if (entry.amount == newAmount) {
					return;
				}
				entry.amount = newAmount;
				containsDrink = true;
			}
		}

		stateStack.push(currentState);
		stateStackRedo = [];
	}
}