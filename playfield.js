function Position(name, color, step) {
	this.step = step;
	this.top = 0;
	this.left = 0;
	this.name = name;
	this.color = color;
	this.maxTop = $(window).height() - 100;
	this.maxLeft = $('.field').width() - 100;
}

Position.prototype.init = function() {
	$('.field').css('height', this.maxTop);
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
	if (this.top < this.maxTop) {
		this.top = this.top + this.step;
		if (this.top > this.maxTop) this.top = this.maxTop;
	}
}

Position.prototype.ArrowLeft = function() {
	if (this.left > 0) {
		this.left = this.left - this.step;
		if (this.left < 0) this.left = 0;
	}
}

Position.prototype.ArrowRight = function() {
	if (this.left < this.maxLeft) {
		this.left = this.left + this.step;
		if (this.left > this.maxLeft) this.left = this.maxLeft;
	}
}

var textCircle = new Position(localStorage.userName, localStorage.userBackgroundColor, 10);
textCircle.init();

$('body').keydown(circleMove);

function circleMove(event) {
	textCircle[event.key]();
	$('.test-circle').css('top', textCircle.top)
		.css('left', textCircle.left)
		.css('background-color', textCircle.color);
	$('.name').css('top', textCircle.top)
		.css('left', 45 + textCircle.left);
}
