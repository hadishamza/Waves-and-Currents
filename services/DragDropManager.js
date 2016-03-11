//remember <script src="../../services/DragDropManager.js"></script>
// fix selectors
var stateStack = [];
var stateStackRedo = [];

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

		var appElement = document.querySelector('[ng-app=mainApp]');
		var $scope = angular.element(appElement).scope();


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

		stateStack.push(currentState);
		stateStackRedo = [];
	}

}

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

function undo() {
	if (stateStack.length > 0) {
		var state = stateStack.pop();
		stateStackRedo.push(state);
	}
}

function redo() {
	if (stateStackRedo.length > 0) {
		var state = stateStackRedo.pop();
		stateStack.push(state);
	}
}