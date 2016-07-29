var userBackgroundColor = $('.big-circle').css('background-color');
localStorage.userBackgroundColor = userBackgroundColor;
$('input[name="user-name"]').val(' ');
var userName = $('input[name="user-name"]').val();
localStorage.userName = userName;

$('.cell').on('click', clickChoiceСolor);

function clickChoiceСolor(event) {
	var bigCircle = $('.big-circle');
	if (event.target.className.includes('circles')) {
		userBackgroundColor = $(event.target).css('background-color');
		var userColor = $(event.target).css('color');
		localStorage.userBackgroundColor = userBackgroundColor;
		bigCircle.css('background-color', userBackgroundColor)
			.css('color', userColor);

	}
}

$('input[name="user-name"]').change(inputName);

function inputName(event) {
	var userNameElem = $('input[name="user-name"]');
	userName = userNameElem.val();
	localStorage.userName = userName;
	if (userName.length <= 8 && userName.length !== 0) {
		userNameElem.css('border-color', 'inherit');
		$('.big-circle').text(userName);
		
		// $.get('/' + userName + '/' + userBackgroundColor);

		$('.submit').attr('href', 'secondpage.html');
	} else {
		userNameElem.css('border-color', 'red');
		$('.submit').attr('href', '#');
	}
}