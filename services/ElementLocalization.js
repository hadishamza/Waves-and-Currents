// Localization for elements where we have to get them after creation (for example buttons)

var allButtons = document.querySelectorAll('input[type=button]');

for(i = 0; i < allButtons.length; i++){
	var id = allButtons[i].id;
	allButtons[i].setAttribute('value',localizedString(id));
}
