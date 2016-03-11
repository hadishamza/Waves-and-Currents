function setStyleSheet(sheet) {
    $("#stylesheet").attr("href",sheet);
    sessionStorage.setItem("stylesheet", sheet);
}

function initate() {
    $("#defaultStyle").click(function(){
    	setStyleSheet("Waves-and-Currents/views/assets/css/default.css");
    }) 

    $("#altStyle").click(function(){
    	setStyleSheet("Waves-and-Currents/views/assets/css/alternative.css");
    }) 

    if(sessionStorage.getItem('stylesheet')){
    	$("#stylesheet").attr("href",sessionStorage.getItem('stylesheet'));
	}
}

window.onload = initate;