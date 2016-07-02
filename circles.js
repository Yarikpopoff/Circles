localStorage.userBackgroundColor = $('.big-circle').css('background-color');
$('input[name="user-name"]').val('');

$('.cell').on('click', clickChoiceСolor);

function clickChoiceСolor(event) {
	// debugger;
	var bigCircle = $('.big-circle');
	if (event.target.className.includes('circles')) {
		var userBackgroundColor = $(event.target).css('background-color');
		localStorage.userBackgroundColor = userBackgroundColor;
		var userColor = $(event.target).css('color');
		bigCircle.css('background-color', userBackgroundColor)
			.css('color', userColor);
	}
}

$('input[name="user-name"]').change(inputName);

function inputName(event) {
	var userNameElem = $('input[name="user-name"]');
	var userName = userNameElem.val();
	localStorage.userName = userName;
	if (userName.length <= 8 && userName.length !== 0) {
		userNameElem.css('border-color', 'inherit');
		$('.big-circle').text(userName);
		$('.submit').attr('href', 'secondpage.html'); // разобраться с queryString
	} else {
		userNameElem.css('border-color', 'red');
		$('.submit').attr('href', '#');
	}
}

