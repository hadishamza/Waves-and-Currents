//remember <script src="../../services/DragDropManager.js"></script>
// fix selectors

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev){
	ev.dataTransfer.setData("element", ev.currentTarget.id);
	console.log("drag");
}

function drop(ev){
	ev.preventDefault();
	console.log("drop");
	var data = ev.dataTransfer.getData("element");
	console.log(data);
	if(data){
		var beerData = $("#"+data).data("beer"); // gather beer data through data-tag
		var el = $("<li class='list-group-item'><div class='listContent'></div>Amount: <input type='number' min='1' value='1' style='width:50px'></li>"); // create list element
		el.data("beer", beerData);
		var listContent = $(el[0].children[0]);
		var inputContent = $(el[0].children[1])
		listContent.text(beerData.name + " - " + beerData.price + "kr"); // add text to list content
		inputContent.attr("max", beerData.count); // To make sure that you cannot order more beers than the amount in inventory
		$(".list-group").append(el); // append list element
	}

}