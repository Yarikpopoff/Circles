function Position(name, color, step) {
	this.step = step;
	this.top = 0;
	this.left = 0;
	this.name = name;
	this.color = color;
	this.fieldHeight = $(window).height(); 
	this.fieldWidth = $('.field').width() - 100;
	this.keyCode = {
		37: 'ArrowLeft',
		38: 'ArrowUp',
		39: 'ArrowRight',
		40: 'ArrowDown'
	}
}

Position.prototype.init = function() {
	$('.field').css('height', this.fieldHeight);
	$('.name').text(this.name);
	$('.test-circle').css('top',this.top)
		.css('left', this.left)
		.css('background-color',this.color);
	$('.name').css('top', this.top)
		.css('left', 45 + this.left);

}

Position.prototype.ArrowUp = function() {
	if (this.top > 0) {
		this.top = this.top - this.step;
		if (this.top < 0) this.top = 0;
	}
}

Position.prototype.ArrowDown = function() {
	if (this.top < this.fieldHeight - 40 - this.step - 1) {
		this.top = this.top + this.step;
		if (this.top > this.fieldHeight) this.top = this.fieldHeight - 40 - this.step - 1;
	}
}

Position.prototype.ArrowLeft = function() {
	if (this.left > 0) {
		this.left = this.left - this.step;
		if (this.left < 0) this.left = 0;
	}
}

Position.prototype.ArrowRight = function() {
	if (this.left < this.fieldWidth) {
		this.left = this.left + this.step;
		if (this.left > this.fieldWidth) this.left = this.fieldWidth;
	}
}

Position.prototype.Move = function(event) {
	// debugger;
	this[this.keyCode[event.which]]();
	$('.test-circle').css('top', this.top)
		.css('left', this.left)
		.css('background-color', this.color);
	$('.name').css('top', this.top)
		.css('left', 45 + this.left);
}

var textCircle = new Position(localStorage.userName, localStorage.userBackgroundColor, 5);
textCircle.init();

$('body').keydown(textCircle.Move.bind(textCircle));
